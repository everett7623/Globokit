export const BUSINESS_TIME_ZONE = 'Asia/Shanghai'

export function getDateKeyInTimeZone(date: Date, timeZone = BUSINESS_TIME_ZONE): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  if (!values.year || !values.month || !values.day) {
    throw new Error(`无法解析时区日期：${timeZone}`)
  }

  return `${values.year}-${values.month}-${values.day}`
}

export function parseCalendarDateKey(dateKey: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day, 12))

  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? date
    : null
}

export function formatCalendarDateKey(
  dateKey: string,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'zh-CN'
): string {
  const date = parseCalendarDateKey(dateKey)
  if (!date) return dateKey
  return date.toLocaleDateString(locale, { ...options, timeZone: 'UTC' })
}

export function getCalendarDayOfMonth(dateKey: string): number | null {
  const date = parseCalendarDateKey(dateKey)
  return date ? date.getUTCDate() : null
}
