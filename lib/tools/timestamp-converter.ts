/**
 * 名称: Unix 时间戳转换函数
 * 描述: Unix 时间戳（秒/毫秒）与北京时间日期文本互转，所有显示均按 Asia/Shanghai 时区
 * 路径: Globokit/lib/tools/timestamp-converter.ts
 * 作者: everettlabs
 * 更新时间: 2026-09-16
 */

/** Asia/Shanghai 自 1991 年起固定为 UTC+8，无夏令时 */
const SHANGHAI_OFFSET_MS = 8 * 60 * 60 * 1000

export interface TimestampBreakdown {
  /** 2026-09-16 */
  date: string
  /** 14:30:05 */
  time: string
  /** 星期三 */
  weekday: string
  /** 2026-09-16T06:30:05.000Z */
  iso: string
  /** 北京时间完整文本：2026-09-16 14:30:05（星期三） */
  display: string
}

const WEEKDAY_LABELS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'] as const

function pad(value: number, length = 2): string {
  return String(value).padStart(length, '0')
}

/** 判断时间戳数值是否处于可安全表示的范围（毫秒口径 ±8.64e15 即约 ±275760 年） */
function isValidMs(ms: number): boolean {
  return Number.isFinite(ms) && Math.abs(ms) < 8.64e15
}

/**
 * 将 Unix 时间戳转为北京时间展示信息
 * @param rawTimestamp 原始输入（秒或毫秒），毫秒口径按 13 位以下补齐规则见 autodetect 参数
 */
export function timestampToBreakdown(rawTimestamp: string, unit: 'auto' | 's' | 'ms'): TimestampBreakdown | null {
  const trimmed = rawTimestamp.trim()
  if (!/^-?\d{1,16}$/.test(trimmed)) return null
  const value = Number(trimmed)
  if (!Number.isSafeInteger(value)) return null

  let ms = value
  if (unit === 's' || (unit === 'auto' && Math.abs(value) < 1e11)) ms = value * 1000
  if (!isValidMs(ms)) return null

  const local = new Date(ms + SHANGHAI_OFFSET_MS)
  const date = `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())}`
  const time = `${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}:${pad(local.getUTCSeconds())}`
  const weekday = WEEKDAY_LABELS[local.getUTCDay()]
  return {
    date,
    time,
    weekday,
    iso: new Date(ms).toISOString(),
    display: `${date} ${time}（${weekday}）`,
  }
}

/**
 * 将北京时间日期文本转为 Unix 时间戳
 * 接受 YYYY-MM-DD HH:mm[:ss] 或 YYYY-MM-DD（按 00:00:00 处理）
 */
export function parseShanghaiDateTime(input: string): { seconds: number; milliseconds: number } | null {
  const trimmed = input.trim().replace('T', ' ').replace('/', '-')
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/.exec(trimmed)
  if (!match) return null
  const [, yearText, monthText, dayText, hourText = '0', minuteText = '0', secondText = '0'] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const hour = Number(hourText)
  const minute = Number(minuteText)
  const second = Number(secondText)
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59 || second > 59) return null

  const utcMs = Date.UTC(year, month - 1, day, hour, minute, second)
  const shifted = new Date(utcMs)
  // 校验日历合法性（例如 2 月 30 日会被 Date 规整）
  if (
    shifted.getUTCFullYear() !== year ||
    shifted.getUTCMonth() !== month - 1 ||
    shifted.getUTCDate() !== day ||
    !isValidMs(utcMs)
  ) {
    return null
  }
  const ms = utcMs - SHANGHAI_OFFSET_MS
  return { seconds: Math.floor(ms / 1000), milliseconds: ms }
}

/** 当前 Unix 时间戳（秒与毫秒），用于“现在”按钮 */
export function nowTimestamps(date: Date = new Date()): { seconds: number; milliseconds: number } {
  return { seconds: Math.floor(date.getTime() / 1000), milliseconds: date.getTime() }
}
