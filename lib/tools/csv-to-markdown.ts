/**
 * 名称: CSV 与 Markdown 表格互转函数
 * 描述: 解析 CSV（含引号与转义字段）生成 Markdown 表格，或将 Markdown 表格还原为 CSV
 * 路径: Globokit/lib/tools/csv-to-markdown.ts
 * 作者: everettlabs
 * 更新时间: 2026-09-16
 */

export interface ConversionResult {
  ok: boolean
  output: string
  error?: string
  rowCount: number
  columnCount: number
}

/** 解析单行 CSV 文本（含 RFC 4180 引号字段），支持 \r\n、\n 与 \r 换行 */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  let i = 0

  while (i < text.length) {
    const char = text[i]
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i += 1
        continue
      }
      field += char
      i += 1
      continue
    }
    if (char === '"') {
      inQuotes = true
      i += 1
      continue
    }
    if (char === ',') {
      row.push(field)
      field = ''
      i += 1
      continue
    }
    if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i += 1
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      i += 1
      continue
    }
    field += char
    i += 1
  }
  // 末尾无换行时收尾最后一个字段/行
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((line) => line.length > 1 || line[0]?.trim() !== '')
}

/** 转义 Markdown 表格单元格中的竖线 */
function escapeCell(value: string): string {
  return value.replace(/\|/g, '\\|')
}

/** CSV 转 Markdown 表格；空字段补空字符串，列数按表头对齐 */
export function csvToMarkdown(input: string): ConversionResult {
  const text = input.trim()
  if (!text) return { ok: false, output: '', error: '请输入 CSV 内容', rowCount: 0, columnCount: 0 }
  const rows = parseCsv(text)
  if (rows.length === 0) return { ok: false, output: '', error: '未解析到有效数据行', rowCount: 0, columnCount: 0 }

  const columnCount = Math.max(...rows.map((row) => row.length))
  const normalized = rows.map((row) => {
    const cells = row.map(escapeCell)
    while (cells.length < columnCount) cells.push('')
    return `| ${cells.join(' | ')} |`
  })
  const separator = `| ${Array.from({ length: columnCount }, () => '---').join(' | ')} |`
  return {
    ok: true,
    output: [normalized[0], separator, ...normalized.slice(1)].join('\n'),
    rowCount: rows.length - 1,
    columnCount,
  }
}

/** 拆分 Markdown 表格行为单元格数组；非表格行返回 null */
function parseTableRow(line: string): string[] | null {
  const trimmed = line.trim()
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return null
  const body = trimmed.slice(1, -1)
  const cells: string[] = []
  let field = ''
  let i = 0
  while (i < body.length) {
    const char = body[i]
    if (char === '\\' && body[i + 1] === '|') {
      field += '|'
      i += 2
      continue
    }
    if (char === '|') {
      cells.push(field.trim())
      field = ''
      i += 1
      continue
    }
    field += char
    i += 1
  }
  cells.push(field.trim())
  return cells
}

/** 判断是否为 Markdown 表头分隔行，如 | --- | --- | */
function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()))
}

/** Markdown 表格转 CSV；输出使用 CRLF 换行并按需给字段加引号 */
export function markdownToCsv(input: string): ConversionResult {
  const lines = input.split(/\r?\n/).filter((line) => line.trim() !== '')
  const tableRows = lines.map((line) => parseTableRow(line)).filter((row): row is string[] => row !== null)
  if (tableRows.length === 0) return { ok: false, output: '', error: '未识别到 Markdown 表格（行需以 | 开头并结尾）', rowCount: 0, columnCount: 0 }

  const dataRows = tableRows.filter((cells) => !isSeparatorRow(cells))
  if (dataRows.length === 0) return { ok: false, output: '', error: '表格只有分隔行，缺少数据行', rowCount: 0, columnCount: 0 }

  const columnCount = Math.max(...dataRows.map((row) => row.length))
  const quote = (value: string): string =>
    /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
  const csv = dataRows
    .map((row) => {
      const cells = [...row]
      while (cells.length < columnCount) cells.push('')
      return cells.map(quote).join(',')
    })
    .join('\r\n')
  return { ok: true, output: csv, rowCount: dataRows.length - 1, columnCount }
}
