// 名称: JSON 格式化与转换工具逻辑
// 描述: 提供 JSON 验证、格式化、压缩及数据转换能力
// 路径: Globokit/lib/tools/json-formatter.ts
// 作者: everettlabs
// 更新时间: 2026-07-01

export interface FormatOptions {
  indent: number
  sortKeys: boolean
  removeNull: boolean
}

export interface ValidationResult {
  valid: boolean
  error?: string
  errorLine?: number
}

export function validateJSON(input: string): ValidationResult {
  try {
    JSON.parse(input)
    return { valid: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    const match = message.match(/position (\d+)/)
    const position = match ? parseInt(match[1], 10) : undefined

    return {
      valid: false,
      error: message,
      errorLine: position ? input.substring(0, position).split('\n').length : undefined,
    }
  }
}

export function formatJSON(input: string, options: FormatOptions): string {
  const parsed = JSON.parse(input)
  let result = parsed

  if (options.sortKeys) {
    result = sortKeysRecursive(result)
  }

  if (options.removeNull) {
    result = removeNullRecursive(result)
  }

  return JSON.stringify(result, null, options.indent)
}

export function minifyJSON(input: string): string {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed)
}

export function beautifyJSON(input: string, indent: number = 2): string {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed, null, indent)
}

export function jsonToCSV(input: string): string {
  const parsed = JSON.parse(input)

  if (!Array.isArray(parsed)) {
    throw new Error('输入 JSON 必须是数组')
  }

  if (parsed.length === 0) {
    return ''
  }

  if (parsed.some((row) => typeof row !== 'object' || row === null || Array.isArray(row))) {
    throw new Error('数组元素必须是对象')
  }

  const headers = Array.from(new Set(
    parsed.flatMap((row: Record<string, unknown>) => Object.keys(row))
  ))
  const headerLine = headers.map(csvEscape).join(',')

  const dataLines = parsed.map((row: Record<string, unknown>) => {
    return headers
      .map((header) => {
        const value = row[header]
        if (value === null || value === undefined) {
          return ''
        }
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
        return csvEscape(stringValue)
      })
      .join(',')
  })

  return [headerLine, ...dataLines].join('\n')
}

export function csvToJSON(csv: string): string {
  const rows = parseCSV(csv.trim())
  if (rows.length === 0 || (rows.length === 1 && rows[0].every((value) => value === ''))) {
    return '[]'
  }

  const headers = rows[0]
  const data: Record<string, string>[] = []

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i]
    const row: Record<string, string> = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    data.push(row)
  }

  return JSON.stringify(data, null, 2)
}

export function jsonToPrettyString(input: string, indent: number = 2): string {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed, null, indent)
}

function sortKeysRecursive(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(sortKeysRecursive)
  }

  const sorted: Record<string, unknown> = {}
  Object.keys(obj as Record<string, unknown>)
    .sort()
    .forEach((key) => {
      sorted[key] = sortKeysRecursive((obj as Record<string, unknown>)[key])
    })

  return sorted
}

function removeNullRecursive(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(removeNullRecursive)
  }

  const result: Record<string, unknown> = {}
  Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      result[key] = removeNullRecursive(value)
    }
  })

  return result
}

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

function parseCSV(csv: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let current = ''
  let insideQuotes = false

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i]
    const nextChar = csv[i + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (!insideQuotes && char === ',') {
      row.push(current)
      current = ''
    } else if (!insideQuotes && (char === '\n' || char === '\r')) {
      row.push(current)
      rows.push(row)
      row = []
      current = ''
      if (char === '\r' && nextChar === '\n') i++
    } else {
      current += char
    }
  }

  if (insideQuotes) throw new Error('CSV 包含未闭合的引号')
  row.push(current)
  rows.push(row)
  return rows
}
