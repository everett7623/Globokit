/**
 * 名称: YAML 与 JSON 互转函数
 * 描述: 解析 YAML 块结构或 JSON 文本，双向输出规范化 JSON / YAML，支持缩进、引号风格与往返一致性校验
 * 路径: Globokit/lib/tools/yaml-json-converter.ts
 * 作者: everettlabs
 * 更新时间: 2026-09-18
 */

export type YamlJsonMode = 'yaml-to-json' | 'json-to-yaml'
export type ScalarStyle = 'auto' | 'single' | 'double'
export type JsonIndent = 2 | 4 | 0

export interface ConvertOptions {
  mode: YamlJsonMode
  indent: 2 | 4
  jsonIndent: JsonIndent
  quoteStyle: ScalarStyle
  sortKeys: boolean
}

export interface ConvertStats {
  /** 顶层节点数量 */
  topLevelCount: number
  /** 统计到的标量节点总数 */
  scalarCount: number
  /** 输出行数 */
  outputLines: number
  /** 解析到的最大嵌套深度（顶层容器为 1，纯标量为 0） */
  maxDepth: number
}

export interface ConvertResult {
  ok: boolean
  output: string
  error?: string
  /** 出错行号，从 1 开始；仅解析失败时给出 */
  errorLine?: number
  stats: ConvertStats
  /** 往返一致性校验是否通过 */
  roundTripOk: boolean
}

export const DEFAULT_CONVERT_OPTIONS: ConvertOptions = {
  mode: 'yaml-to-json',
  indent: 2,
  jsonIndent: 2,
  quoteStyle: 'auto',
  sortKeys: false,
}

const EMPTY_STATS: ConvertStats = {
  topLevelCount: 0,
  scalarCount: 0,
  outputLines: 0,
  maxDepth: 0,
}

class YamlParseError extends Error {
  line: number

  constructor(message: string, line: number) {
    super(message)
    this.name = 'YamlParseError'
    this.line = line
  }
}

interface LineToken {
  indent: number
  text: string
  line: number
}

interface YamlNode {
  kind: 'map' | 'seq'
  indent: number
  value: Record<string, unknown> | unknown[]
}

const TRUE_TOKENS = new Set(['true', 'True', 'TRUE', 'yes', 'Yes', 'YES', 'on', 'On', 'ON'])
const FALSE_TOKENS = new Set(['false', 'False', 'FALSE', 'no', 'No', 'NO', 'off', 'Off', 'OFF'])
const NULL_TOKENS = new Set(['null', 'Null', 'NULL', '~', ''])
const BLOCK_INDICATORS = new Set(['|', '|-', '|+', '>', '>-', '>+'])
const SCALAR_NUMBER = /^[+-]?(?:0|[1-9][0-9]*)(?:[.][0-9]+)?(?:[eE][+-]?[0-9]+)?$/
const LEADING_ZERO_NUMBER = /^[+-]?0[0-9]+$/
const RESERVED_FIRST_CHARS = new Set(['-', '?', ':', ',', '[', ']', '{', '}', '#', '&', '*', '!', '|', '>', "'", '"', '%', '@', '`'])

/** 去掉一行末尾的注释；引号以内的 # 原样保留 */
function stripComment(input: string): string {
  let quote: "'" | '"' | null = null
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i]
    if (quote) {
      if (char === quote) {
        if (quote === "'" && input[i + 1] === "'") {
          i += 1
          continue
        }
        quote = null
      }
      continue
    }
    if (char === "'" || char === '"') {
      quote = char
      continue
    }
    if (char === '#' && (i === 0 || /[  \t]/.test(input[i - 1]))) {
      return input.slice(0, i)
    }
  }
  return input
}

/** 找到顶层键值分隔符的位置：冒号之后必须是空白或行尾 */
function findKeySeparator(text: string): number {
  let quote: "'" | '"' | null = null
  let depth = 0
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    if (quote) {
      if (char === quote) {
        if (quote === "'" && text[i + 1] === "'") {
          i += 1
          continue
        }
        quote = null
      }
      continue
    }
    if (char === "'" || char === '"') {
      quote = char
      continue
    }
    if (char === '[' || char === '{') depth += 1
    if (char === ']' || char === '}') depth -= 1
    if (char === ':' && depth === 0) {
      const next = text[i + 1]
      if (next === undefined || next === ' ' || next === '\t') return i
    }
  }
  return -1
}

function unescapeDoubleQuoted(text: string): string {
  let out = ''
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    if (char !== '\\') {
      out += char
      continue
    }
    const next = text[i + 1]
    i += 1
    switch (next) {
      case 'n':
        out += '\n'
        break
      case 't':
        out += '\t'
        break
      case 'r':
        out += '\r'
        break
      case '0':
        out += '\0'
        break
      case '"':
        out += '"'
        break
      case '\\':
        out += '\\'
        break
      case '/':
        out += '/'
        break
      case 'u': {
        const hex = text.slice(i + 1, i + 5)
        if (/^[0-9a-fA-F]{4}$/.test(hex)) {
          out += String.fromCharCode(parseInt(hex, 16))
          i += 4
        } else {
          out += 'u'
        }
        break
      }
      default:
        out += next === undefined ? '\\' : next
        break
    }
  }
  return out
}
/** 解析流式集合 [...] 与 {...}，元素为标量或嵌套流式集合 */
function parseFlowCollection(text: string, line: number): unknown {
  const trimmed = text.trim()
  const parseValue = (raw: string): unknown => {
    const value = raw.trim()
    if (value.startsWith('[') || value.startsWith('{')) return parseFlowCollection(value, line)
    return parseScalar(value, line)
  }

  if (trimmed.startsWith('[')) {
    if (!trimmed.endsWith(']')) throw new YamlParseError('流式序列缺少结尾的 ]', line)
    const inner = trimmed.slice(1, -1).trim()
    if (inner === '') return []
    return splitFlowItems(inner).map(parseValue)
  }

  if (!trimmed.endsWith('}')) throw new YamlParseError('流式映射缺少结尾的 }', line)
  const inner = trimmed.slice(1, -1).trim()
  if (inner === '') return {}
  const result: Record<string, unknown> = {}
  for (const item of splitFlowItems(inner)) {
    const separator = findKeySeparator(item)
    if (separator < 0) throw new YamlParseError('流式映射项缺少冒号分隔符', line)
    const { key } = parseKeyValue(item.slice(0, separator), line)
    result[key] = parseValue(item.slice(separator + 1))
  }
  return result
}

/** 按顶层逗号切分流式集合内容，忽略嵌套集合与引号内的逗号 */
function splitFlowItems(inner: string): string[] {
  const items: string[] = []
  let buffer = ''
  let quote: "'" | '"' | null = null
  let depth = 0
  for (let i = 0; i < inner.length; i += 1) {
    const char = inner[i]
    if (quote) {
      buffer += char
      if (char === quote) {
        if (quote === "'" && inner[i + 1] === "'") {
          buffer += inner[i + 1]
          i += 1
          continue
        }
        quote = null
      }
      continue
    }
    if (char === "'" || char === '"') {
      quote = char
      buffer += char
      continue
    }
    if (char === '[' || char === '{') depth += 1
    if (char === ']' || char === '}') depth -= 1
    if (char === ',' && depth === 0) {
      items.push(buffer)
      buffer = ''
      continue
    }
    buffer += char
  }
  items.push(buffer)
  return items.filter((item) => item.trim() !== '')
}

/** 解析标量：引号字符串、流式集合、布尔/空值与数字按 YAML 1.1 常用约定识别 */
function parseScalar(raw: string, line: number): unknown {
  const value = raw.trim()
  if (value === '') return null

  if (value.startsWith('"')) {
    if (!value.endsWith('"') || value.length < 2) throw new YamlParseError('双引号字符串未闭合', line)
    return unescapeDoubleQuoted(value.slice(1, -1))
  }

  if (value.startsWith("'")) {
    if (!value.endsWith("'") || value.length < 2) throw new YamlParseError('单引号字符串未闭合', line)
    return value.slice(1, -1).split("''").join("'")
  }

  if (value.startsWith('[') || value.startsWith('{')) return parseFlowCollection(value, line)

  if (value.startsWith('*')) return { $ref: value.slice(1) }
  if (value.startsWith('&')) {
    const separator = value.indexOf(' ')
    return separator < 0 ? null : parseScalar(value.slice(separator + 1), line)
  }
  if (value.startsWith('!')) {
    const separator = value.indexOf(' ')
    return separator < 0 ? null : parseScalar(value.slice(separator + 1), line)
  }

  if (NULL_TOKENS.has(value)) return null
  if (TRUE_TOKENS.has(value)) return true
  if (FALSE_TOKENS.has(value)) return false

  if (SCALAR_NUMBER.test(value)) {
    const numeric = Number(value)
    if (Number.isFinite(numeric)) return numeric
  }

  return value
}

/** 解析映射键，返回键名与是否带引号 */
function parseKeyValue(rawKey: string, line: number): { key: string; quoted: boolean } {
  const value = rawKey.trim()
  if (value === '') throw new YamlParseError('映射缺少键名', line)
  if (value.startsWith('"')) {
    if (!value.endsWith('"') || value.length < 2) throw new YamlParseError('映射键的双引号未闭合', line)
    return { key: unescapeDoubleQuoted(value.slice(1, -1)), quoted: true }
  }
  if (value.startsWith("'")) {
    if (!value.endsWith("'") || value.length < 2) throw new YamlParseError('映射键的单引号未闭合', line)
    return { key: value.slice(1, -1).split("''").join("'"), quoted: true }
  }
  if (/[[\]{}]/.test(value)) throw new YamlParseError('映射键含有流式集合字符，请加引号', line)
  return { key: value, quoted: false }
}
/** 把原始文本拆成「缩进 + 正文」的 token，跳过空行、整行注释与文档标记 */
export function tokenize(source: string): LineToken[] {
  const tokens: LineToken[] = []
  const lines = source.split(String.fromCharCode(13)).join('').split(String.fromCharCode(10))
  lines.forEach((raw, index) => {
    if (/^[ ]*\t/.test(raw)) throw new YamlParseError('YAML 不允许使用制表符缩进', index + 1)
    const withoutComment = stripComment(raw)
    if (withoutComment.trim() === '') return
    const marker = withoutComment.trim()
    if (marker === '---' || marker === '...') return
    if (marker.startsWith('%')) throw new YamlParseError('不支持 YAML 指令（%TAG / %YAML）', index + 1)
    const text = withoutComment.trimEnd()
    const indent = text.length - text.trimStart().length
    if (indent > 0 && text.trimStart().startsWith('#')) return
    tokens.push({ indent, text: text.trimStart(), line: index + 1 })
  })
  return tokens
}

/**
 * 把原始文本切分为「缩进 + 内容」的多行记录，并预先把块标量（| 与 >）折叠成单值。
 * 只保留有内容的行，行号用于错误定位。
 */
interface SourceLine {
  indent: number
  text: string
  /** 该行是块标量头部时，指向 blocks 中已折叠好的内容 */
  blockIndex: number
}

function scanSource(source: string): { lines: SourceLine[]; blocks: string[] } {
  const rawLines = source.split(String.fromCharCode(13)).join('').split(String.fromCharCode(10))
  const lines: SourceLine[] = []
  const blocks: string[] = []

  for (let cursor = 0; cursor < rawLines.length; cursor += 1) {
    const raw = rawLines[cursor]
    if (/^[ ]*	/.test(raw)) {
      throw new YamlParseError('YAML 不允许使用制表符缩进', cursor + 1)
    }
    const withoutComment = stripComment(raw)
    const trimmed = withoutComment.trim()
    if (trimmed === '') continue
    if (trimmed === '---' || trimmed === '...') continue
    if (trimmed.startsWith('%')) throw new YamlParseError('不支持 YAML 指令（%TAG / %YAML）', cursor + 1)
    const text = withoutComment.trimEnd()
    const indent = text.length - text.trimStart().length
    const body = text.trimStart()
    const separator = findKeySeparator(body)
    const value = separator < 0 ? null : body.slice(separator + 1).trim()
    if (value !== null && isBlockIndicator(value)) {
      const block = readBlockLines(rawLines, cursor, indent, value)
      blocks.push(block.value)
      lines.push({ indent, text: body, blockIndex: blocks.length - 1 })
      cursor = block.lastConsumed
      continue
    }
    lines.push({ indent, text: body, blockIndex: -1 })
  }

  return { lines, blocks }
}

/** 判断取值是否为块标量指示符（| 与 > 及其修饰符） */
function isBlockIndicator(value: string): boolean {
  return value === '|' || value === '>' || /^[|>][-+0-9]*$/.test(value)
}

/** 收集块标量内容：以头部所在行的缩进为边界，保留相对缩进与块内空行 */
function readBlockLines(rawLines: string[], headerIndex: number, headerIndent: number, indicator: string): { value: string; lastConsumed: number } {
  const folded = indicator.startsWith('>')
  const chomp = indicator.includes('-') ? 'strip' : indicator.includes('+') ? 'keep' : 'clip'
  const collected: string[] = []
  let blockIndent: number | null = null
  let lastContent = -1
  let cursor = headerIndex + 1

  for (; cursor < rawLines.length; cursor += 1) {
    const raw = rawLines[cursor]
    if (raw.trim() === '') {
      collected.push('')
      continue
    }
    const indent = raw.length - raw.trimStart().length
    if (indent <= headerIndent) break
    if (blockIndent === null) blockIndent = indent
    if (indent < blockIndent) break
    collected.push(' '.repeat(indent - blockIndent) + raw.trimStart())
    lastContent = collected.length - 1
  }

  const kept = lastContent < 0 ? [] : collected.slice(0, lastContent + 1)
  let value = kept.join(String.fromCharCode(10))
  if (folded) value = value.split(String.fromCharCode(10)).map((line) => line.trim()).join(' ').trim()
  if (chomp !== 'strip' && value !== '') value += String.fromCharCode(10)
  return { value, lastConsumed: cursor - 1 }
}

/**
 * 解析 YAML 文本为普通 JavaScript 值。
 * 采用单遍扫描 + 缩进栈：每行的缩进决定它属于当前容器的兄弟还是子容器，
 * 因此不依赖复杂的前瞻逻辑即可覆盖常见配置文件结构。
 */
export function parseYaml(source: string): unknown {
  const { lines, blocks } = scanSource(source)
  if (lines.length === 0) return null
  if (lines[0].indent > 0) throw new YamlParseError('顶层节点不应有缩进', 1)

  const rootKind: YamlNode['kind'] = sequenceText(lines[0].text) === null ? 'map' : 'seq'
  const root: YamlNode = { kind: rootKind, indent: -1, value: rootKind === 'seq' ? [] : {} }
  const stack: YamlNode[] = [root]
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    const indent = line.indent
    const itemText = sequenceText(line.text)

    // 缩进不深于当前容器时，回退到应有的层级
    while (stack.length > 1 && indent < stack[stack.length - 1].indent) stack.pop()

    const parent = stack[stack.length - 1]

    if (itemText !== null) {
      const item = itemText.trim()
      const pushChild = (child: YamlNode): void => {
        if (parent.kind === 'seq') {
          ;(parent.value as unknown[]).push(child.value)
          stack.push(child)
          return
        }
        // 根容器或映射容器承载序列项时的兜底：以数组承载
        const holder = parent.value as unknown[]
        if (!Array.isArray(holder)) {
          throw new YamlParseError('序列项出现在映射上下文中', index + 1)
        }
        holder.push(child.value)
        stack.push(child)
      }

      if (parent.kind === 'seq') {
        if (item === '') {
          ;(parent.value as unknown[]).push(null)
          index += 1
          continue
        }
        if (sequenceText(item) !== null) {
          pushChild({ kind: 'seq', indent: indent + 2, value: [] })
          index += 1
          continue
        }
        if (findKeySeparator(item) >= 0) {
          const contentOffset = itemText.length - itemText.trimStart().length
          const child: YamlNode = { kind: 'map', indent: indent + 2 + contentOffset, value: {} }
          const innerSeparator = findKeySeparator(item)
          const inlineKey = parseKeyValue(item.slice(0, innerSeparator), index + 1)
          const inlineRaw = item.slice(innerSeparator + 1).trim()
          ;(child.value as Record<string, unknown>)[inlineKey.key] =
            inlineRaw === '' ? null : parseScalar(inlineRaw, index + 1)
          ;(parent.value as unknown[]).push(child.value)
          stack.push(child)
          index += 1
          continue
        }
        ;(parent.value as unknown[]).push(parseScalar(item, index + 1))
        index += 1
        continue
      }

      throw new YamlParseError('序列项出现在映射上下文中', index + 1)
    }

    const separator = findKeySeparator(line.text)
    if (separator < 0) throw new YamlParseError('该行既不是序列项也不是映射项（缺少冒号）', index + 1)

    const { key, quoted } = parseKeyValue(line.text.slice(0, separator), index + 1)
    if (!quoted && key.length > 1 && RESERVED_FIRST_CHARS.has(key[0])) {
      throw new YamlParseError('映射键以保留字符开头，请加引号', index + 1)
    }

    const target = parent.value as Record<string, unknown>
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      throw new YamlParseError('重复的映射键 ' + key, index + 1)
    }

    const rawValue = line.text.slice(separator + 1).trim()
    if (rawValue === '') {
      const next = lines[index + 1]
      if (next && next.indent > indent) {
        const nextIsSeq = sequenceText(next.text) !== null
        const child: YamlNode = {
          kind: nextIsSeq ? 'seq' : 'map',
          indent: next.indent,
          value: nextIsSeq ? [] : {},
        }
        target[key] = child.value
        stack.push(child)
        index += 1
        continue
      }
      target[key] = null
      index += 1
      continue
    }

    if (line.blockIndex >= 0) {
      target[key] = blocks[line.blockIndex]
      index += 1
      continue
    }

    target[key] = parseScalar(rawValue, index + 1)
    index += 1
  }

  return root.value
}

function sequenceText(text: string): string | null {
  if (text === '-') return ''
  if (text.startsWith('- ')) return text.slice(2)
  return null
}

function isSequenceText(text: string): boolean {
  return sequenceText(text) !== null
}

function isSequenceToken(token: LineToken): boolean {
  return token.text === '-' || token.text.startsWith('- ')
}

/** 读取块标量（| 与 > 及其修饰符）：块边界取「头部所在行的缩进」，首行内容可与之对齐 */
function readBlockScalar(source: string, headerLine: number, tokenIndent: number, indicator: string, containerIndent: number | null = null): string {
  const folded = indicator.startsWith('>')
  const chomp = indicator.includes('-') ? 'strip' : indicator.includes('+') ? 'keep' : 'clip'
  const allLines = source.split(String.fromCharCode(13)).join('').split(String.fromCharCode(10))
  const headerText = allLines[headerLine - 1]
  // 块边界取承载容器的缩进（子内容起始列），无上层容器时退化为头部所在行缩进
  const parentIndent = containerIndent === null
    ? headerText === undefined
      ? tokenIndent
      : headerText.length - headerText.trimStart().length
    : containerIndent
  const collected: string[] = []
  let blockIndent: number | null = null
  let lastContent = -1

  for (let cursor = headerLine; cursor < allLines.length; cursor += 1) {
    const raw = allLines[cursor]
    if (raw.trim() === '') {
      collected.push('')
      continue
    }
    const indent = raw.length - raw.trimStart().length
    if (indent <= parentIndent) break
    if (blockIndent === null) blockIndent = indent
    if (indent < blockIndent) break
    collected.push(' '.repeat(indent - blockIndent) + raw.trimStart())
    lastContent = collected.length - 1
  }

  const kept = lastContent < 0 ? [] : collected.slice(0, lastContent + 1)
  let value = kept.join('\n')
  if (folded) value = value.split('\n').map((line) => line.trim()).join(' ').trim()
  if (chomp === 'strip' || value === '') return value
  return value + String.fromCharCode(10)
}

function isPlainContainer(node: unknown): boolean {
  if (Array.isArray(node)) return true
  return node !== null && typeof node === 'object'
}

/** 统计标量数量、顶层节点数量与最大嵌套深度（顶层容器为 1，纯标量为 0） */
function collectStats(value: unknown): { scalarCount: number; maxDepth: number; topLevelCount: number } {
  let scalarCount = 0

  const measure = (node: unknown): number => {
    if (Array.isArray(node)) {
      if (node.length === 0) {
        scalarCount += 1
        return 0
      }
      const deepest = node.reduce((max: number, item) => Math.max(max, measure(item)), 0)
      return deepest + 1
    }
    if (node !== null && typeof node === 'object') {
      const entries = Object.entries(node as Record<string, unknown>)
      if (entries.length === 0) {
        scalarCount += 1
        return 0
      }
      const deepest = entries.reduce((max: number, entry) => Math.max(max, measure(entry[1])), 0)
      return deepest + 1
    }
    scalarCount += 1
    return 0
  }

  const maxDepth = Math.max(measure(value), isPlainContainer(value) ? 1 : 0)
  const topLevelCount = Array.isArray(value)
    ? value.length
    : isPlainContainer(value)
      ? Object.keys(value as Record<string, unknown>).length
      : value === null
        ? 0
        : 1

  return { scalarCount, maxDepth, topLevelCount }
}

function sortValue(value: unknown, sortKeys: boolean): unknown {
  if (!sortKeys) return value
  if (Array.isArray(value)) return value.map((item) => sortValue(item, sortKeys))
  if (value !== null && typeof value === 'object') {
    const sorted: Record<string, unknown> = {}
    Object.keys(value as Record<string, unknown>)
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      .forEach((key) => {
        sorted[key] = sortValue((value as Record<string, unknown>)[key], sortKeys)
      })
    return sorted
  }
  return value
}

/** 从 JSON.parse 异常中还原行列位置，输出可读的中文错误 */
function formatJsonError(error: unknown, source: string): { message: string; line?: number } {
  const raw = error instanceof Error ? error.message : String(error)
  const match = /position ([0-9]+)/.exec(raw)
  if (!match) return { message: 'JSON 解析失败：' + raw }
  const position = Number(match[1])
  const line = source.slice(0, position).split('\n').length
  const column = position - source.lastIndexOf('\n', Math.max(position - 1, 0))
  return { message: 'JSON 解析失败：' + raw + '（第 ' + line + ' 行 第 ' + column + ' 列）', line }
}

/** 判断字符串标量是否需要加引号，以及使用哪种引号风格 */
function needsQuotes(value: string, style: ScalarStyle): { quoted: boolean; style: ScalarStyle } {
  if (style === 'single') return { quoted: true, style: 'single' }
  if (style === 'double') return { quoted: true, style: 'double' }

  if (value === '') return { quoted: true, style: 'single' }
  if (NULL_TOKENS.has(value) || TRUE_TOKENS.has(value) || FALSE_TOKENS.has(value)) {
    return { quoted: true, style: 'single' }
  }
  if (SCALAR_NUMBER.test(value) || LEADING_ZERO_NUMBER.test(value)) {
    return { quoted: true, style: 'single' }
  }
  if (value !== value.trim()) return { quoted: true, style: 'single' }
  if (RESERVED_FIRST_CHARS.has(value[0])) return { quoted: true, style: 'single' }
  if (value.includes(': ') || value.includes(' #') || value.endsWith(':')) {
    return { quoted: true, style: 'single' }
  }
  if (/[\n\r\t]/.test(value)) return { quoted: true, style: 'double' }
  return { quoted: false, style }
}

function quoteScalar(value: string, style: ScalarStyle): string {
  const decision = needsQuotes(value, style)
  if (!decision.quoted) return value
  if (decision.style === 'double') {
    const escaped = value
      .split('\\').join('\\\\')
      .split('"').join('\\"')
      .split('\n').join('\\n')
      .split('\t').join('\\t')
      .split('\r').join('\\r')
    return '"' + escaped + '"'
  }
  return "'" + value.split("'").join("''") + "'"
}

function formatScalar(value: unknown, style: ScalarStyle): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : 'null'
  return quoteScalar(String(value), style)
}

function formatKey(key: string): string {
  const decision = needsQuotes(key, 'auto')
  return decision.quoted ? quoteScalar(key, 'single') : key
}

/** 行内标量：空容器写成流式占位，含换行的字符串改用转义双引号 */
function formatScalarForInline(value: unknown, style: ScalarStyle): string {
  if (isEmptyContainer(value)) return Array.isArray(value) ? '[]' : '{}'
  if (typeof value === 'string' && value.includes(String.fromCharCode(10))) {
    return quoteScalar(value, 'double')
  }
  return formatScalar(value, style)
}

function isEmptyContainer(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0
  if (value !== null && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>).length === 0
  }
  return false
}

/** 把 JavaScript 值序列化为块结构 YAML */
export function stringifyYaml(value: unknown, indentSize: 2 | 4 = 2, style: ScalarStyle = 'auto'): string {
  const unit = ' '.repeat(indentSize)
  const lines: string[] = []

  const emitBlock = (node: unknown, depth: number): void => {
    const pad = unit.repeat(depth)
    if (Array.isArray(node)) {
      node.forEach((item) => {
        if (isEmptyContainer(item)) {
          lines.push(pad + '- ' + (Array.isArray(item) ? '[]' : '{}'))
          return
        }
        if (item !== null && typeof item === 'object') {
          if (Array.isArray(item)) {
            lines.push(pad + '-')
            emitBlock(item, depth + 1)
            return
          }
          // 映射项与短横线同行，后续键与内容列对齐
          const entries = Object.entries(item as Record<string, unknown>)
          if (entries.length === 0) {
            lines.push(pad + '- {}')
            return
          }
          const [firstKey, firstValue] = entries[0]
          const rest = {} as Record<string, unknown>
          entries.slice(1).forEach(([restKey, restValue]) => {
            rest[restKey] = restValue
          })
          if (firstValue !== null && typeof firstValue === 'object' && !isEmptyContainer(firstValue)) {
            lines.push(pad + '- ' + formatKey(firstKey) + ':')
            emitBlock(firstValue, depth + 2)
          } else {
            lines.push(pad + '- ' + formatKey(firstKey) + ': ' + formatScalarForInline(firstValue, style))
          }
          if (Object.keys(rest).length > 0) emitBlock(rest, depth + 1)
          return
        }
        lines.push(pad + '- ' + formatScalar(item, style))
      })
      return
    }
    if (node !== null && typeof node === 'object') {
      Object.keys(node as Record<string, unknown>).forEach((key) => {
        const item = (node as Record<string, unknown>)[key]
        const label = pad + formatKey(key) + ':'
        if (isEmptyContainer(item)) {
          lines.push(label + ' ' + (Array.isArray(item) ? '[]' : '{}'))
          return
        }
        if (item !== null && typeof item === 'object') {
          lines.push(label)
          emitBlock(item, depth + 1)
          return
        }
        if (typeof item === 'string' && item.includes('\n')) {
          lines.push(label + ' |-')
          item.split('\n').forEach((inner) => lines.push(pad + unit + inner))
          return
        }
        lines.push(label + ' ' + formatScalar(item, style))
      })
    }
  }

  if (!isPlainContainer(value)) return formatScalar(value, style) + String.fromCharCode(10)
  if (isEmptyContainer(value)) return (Array.isArray(value) ? '[]' : '{}') + String.fromCharCode(10)
  emitBlock(value, 0)
  return lines.join('\n') + String.fromCharCode(10)
}
function deepEqual(left: unknown, right: unknown): boolean {
  if (left === right) return true
  if (typeof left === 'number' && typeof right === 'number') {
    return Number.isNaN(left) && Number.isNaN(right)
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false
    return left.every((item, position) => deepEqual(item, right[position]))
  }
  if (isPlainContainer(left) && isPlainContainer(right)) {
    const leftKeys = Object.keys(left as Record<string, unknown>)
    const rightKeys = Object.keys(right as Record<string, unknown>)
    if (leftKeys.length !== rightKeys.length) return false
    return leftKeys.every((key) =>
      Object.prototype.hasOwnProperty.call(right, key) &&
      deepEqual((left as Record<string, unknown>)[key], (right as Record<string, unknown>)[key])
    )
  }
  return false
}

function countLines(text: string): number {
  const trimmed = text.endsWith('\n') ? text.slice(0, -1) : text
  return trimmed === '' ? 0 : trimmed.split('\n').length
}

/** 解析输入并输出另一种格式；失败时返回中文错误与出错行号 */
export function convertYamlJson(source: string, options: ConvertOptions): ConvertResult {
  const config: ConvertOptions = { ...DEFAULT_CONVERT_OPTIONS, ...options }
  const text = source.split(/\r\n?/).join('\n')
  if (text.trim() === '') {
    return { ok: false, output: '', error: '请输入需要转换的内容', stats: EMPTY_STATS, roundTripOk: false }
  }

  if (config.mode === 'json-to-yaml') {
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch (error) {
      const detail = formatJsonError(error, text)
      return {
        ok: false,
        output: '',
        error: detail.message,
        errorLine: detail.line,
        stats: EMPTY_STATS,
        roundTripOk: false,
      }
    }
    const ordinal = sortValue(parsed, config.sortKeys)
    const output = stringifyYaml(ordinal, config.indent, config.quoteStyle)
    const stats = collectStats(ordinal)
    let roundTripOk = false
    try {
      roundTripOk = deepEqual(parseYaml(output), ordinal)
    } catch {
      roundTripOk = false
    }
    return { ok: true, output, stats: { ...stats, outputLines: countLines(output) }, roundTripOk }
  }

  let parsed: unknown
  try {
    parsed = parseYaml(text)
  } catch (error) {
    if (error instanceof YamlParseError) {
      return {
        ok: false,
        output: '',
        error: 'YAML 解析失败：' + error.message,
        errorLine: error.line,
        stats: EMPTY_STATS,
        roundTripOk: false,
      }
    }
    return {
      ok: false,
      output: '',
      error: 'YAML 解析失败：' + (error instanceof Error ? error.message : String(error)),
      stats: EMPTY_STATS,
      roundTripOk: false,
    }
  }

  const ordinal = sortValue(parsed, config.sortKeys)
  const padding = config.jsonIndent === 0 ? 0 : config.jsonIndent
  const serialized = JSON.stringify(ordinal, null, padding)
  const output = typeof serialized === 'string' ? serialized + String.fromCharCode(10) : 'null' + String.fromCharCode(10)
  const stats = collectStats(ordinal)
  let roundTripOk = false
  try {
    roundTripOk = deepEqual(JSON.parse(output), ordinal)
  } catch {
    roundTripOk = false
  }
  return { ok: true, output, stats: { ...stats, outputLines: countLines(output) }, roundTripOk }
}

