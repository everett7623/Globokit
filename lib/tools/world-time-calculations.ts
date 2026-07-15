// 名称: 世界时间计算辅助函数
// 描述: 处理时区偏移、会议时间与下一个工作时间
// 路径: Globokit/lib/tools/world-time-calculations.ts
// 作者: wwj
// 更新时间: 2026-07-15

/**
 * 获取时区偏移量（使用 Intl.DateTimeFormat 精确计算，支持DST和亚小时精度）
 * @param timezone 时区标识符
 * @returns UTC偏移量字符串 (例如: +08:00, +05:30, +05:45)，无效时区返回空字符串
 */
export function getTimeZoneOffset(timezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'longOffset'
    })
    const parts = formatter.formatToParts(new Date())
    const tzPart = parts.find(p => p.type === 'timeZoneName')
    if (!tzPart) return ''

    const value = tzPart.value
    if (value === 'GMT') return '+00:00'

    const match = value.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/)
    if (!match) return '+00:00'

    const sign = match[1]
    const hours = match[2].padStart(2, '0')
    const minutes = (match[3] || '00').padStart(2, '0')

    return `${sign}${hours}:${minutes}`
  } catch {
    return ''
  }
}

/**
 * 计算两个时区之间的时差（使用 Intl.DateTimeFormat 精确计算，0.25小时精度）
 * @param timezone1 第一个时区
 * @param timezone2 第二个时区
 * @returns 时差（小时），0.25精度（15分钟粒度）
 */
export function getTimeDifference(timezone1: string, timezone2: string): number {
  const offset1 = getTimeZoneOffset(timezone1)
  const offset2 = getTimeZoneOffset(timezone2)

  if (!offset1 || !offset2) return 0

  const parseOffset = (offset: string): number => {
    const sign = offset[0] === '+' ? 1 : -1
    const [hours, minutes] = offset.slice(1).split(':').map(Number)
    return sign * (hours + minutes / 60)
  }

  const diff = parseOffset(offset1) - parseOffset(offset2)
  return Math.round(diff * 4) / 4
}

/**
 * 获取最佳会议时间
 * @param timezones 参与者所在的时区列表
 * @returns 建议的会议时间段
 */
export function getBestMeetingTime(timezones: string[]): {
  start: number
  end: number
  score: number
}[] {
  const meetingTimes: { start: number; end: number; score: number }[] = []

  for (let hour = 0; hour < 24; hour++) {
    let score = 0
    let validForAll = true

    for (const timezone of timezones) {
      const now = new Date()
      now.setHours(hour, 0, 0, 0)

      const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
      const localHour = localTime.getHours()

      if (localHour >= 9 && localHour < 12) {
        score += 3
      } else if (localHour >= 14 && localHour < 17) {
        score += 2
      } else if (localHour >= 8 && localHour < 9) {
        score += 1
      } else if (localHour >= 17 && localHour < 19) {
        score += 1
      } else if (localHour < 7 || localHour >= 22) {
        validForAll = false
        break
      }
    }

    if (validForAll && score > 0) {
      meetingTimes.push({
        start: hour,
        end: (hour + 1) % 24,
        score: score / timezones.length
      })
    }
  }

  return meetingTimes.sort((a, b) => b.score - a.score).slice(0, 3)
}

/**
 * 获取下一个工作时间
 * @param timezone 时区
 * @returns 下一个工作时间的描述
 */
export function getNextBusinessHours(timezone: string): string {
  const now = new Date()
  const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))

  const hour = localTime.getHours()
  const day = localTime.getDay()

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
    return '当前为工作时间'
  }

  if (day >= 1 && day <= 5) {
    if (hour < 9) {
      return `今天 9:00 开始工作`
    } else {
      return `明天 9:00 开始工作`
    }
  }

  let daysUntilMonday = day === 0 ? 1 : 8 - day
  return `${daysUntilMonday}天后（周一）9:00 开始工作`
}
