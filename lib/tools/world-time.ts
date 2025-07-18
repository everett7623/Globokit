// 名称: 世界时间工具函数
// 描述: 处理时区转换和时间格式化的核心逻辑
// 路径: seedtool/lib/tools/world-time.ts
// 作者: Jensfrank
// 更新时间: 2025-07-18

/**
 * 格式化时间显示
 * @param date Date对象
 * @returns 格式化的时间字符串 (HH:MM:SS)
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * 获取时区偏移量
 * @param timezone 时区标识符
 * @returns UTC偏移量字符串 (例如: +08:00)
 */
export function getTimeZoneOffset(timezone: string): string {
  const now = new Date()
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
  const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
  
  const diff = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60)
  const hours = Math.floor(Math.abs(diff))
  const minutes = Math.floor((Math.abs(diff) - hours) * 60)
  
  const sign = diff >= 0 ? '+' : '-'
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

/**
 * 判断是否为工作时间
 * @param date 当地时间的Date对象
 * @returns 是否在工作时间内 (周一至周五 9:00-18:00)
 */
export function isBusinessHours(date: Date): boolean {
  const day = date.getDay()
  const hour = date.getHours()
  
  // 周一至周五 (1-5)
  if (day >= 1 && day <= 5) {
    // 9:00 - 18:00
    return hour >= 9 && hour < 18
  }
  
  return false
}

/**
 * 计算两个时区之间的时差
 * @param timezone1 第一个时区
 * @param timezone2 第二个时区
 * @returns 时差（小时）
 */
export function getTimeDifference(timezone1: string, timezone2: string): number {
  const now = new Date()
  const date1 = new Date(now.toLocaleString('en-US', { timeZone: timezone1 }))
  const date2 = new Date(now.toLocaleString('en-US', { timeZone: timezone2 }))
  
  return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60)
}

/**
 * 获取时区的标准名称
 * @param timezone 时区标识符
 * @returns 时区的标准名称
 */
export function getTimeZoneName(timezone: string): string {
  const formatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: timezone,
    timeZoneName: 'long'
  })
  
  const parts = formatter.formatToParts(new Date())
  const timeZoneName = parts.find(part => part.type === 'timeZoneName')
  
  return timeZoneName?.value || timezone
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
  
  // 检查每个小时
  for (let hour = 0; hour < 24; hour++) {
    let score = 0
    let validForAll = true
    
    for (const timezone of timezones) {
      const now = new Date()
      now.setHours(hour, 0, 0, 0)
      
      const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
      const localHour = localTime.getHours()
      
      // 评分规则
      if (localHour >= 9 && localHour < 12) {
        score += 3 // 上午最佳
      } else if (localHour >= 14 && localHour < 17) {
        score += 2 // 下午次佳
      } else if (localHour >= 8 && localHour < 9) {
        score += 1 // 早上可接受
      } else if (localHour >= 17 && localHour < 19) {
        score += 1 // 傍晚可接受
      } else if (localHour < 7 || localHour >= 22) {
        validForAll = false // 太早或太晚
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
  
  // 按评分排序
  return meetingTimes.sort((a, b) => b.score - a.score).slice(0, 3)
}

/**
 * 转换时间到指定时区
 * @param date 原始日期时间
 * @param fromTimezone 原时区
 * @param toTimezone 目标时区
 * @returns 转换后的日期时间
 */
export function convertTimeZone(
  date: Date,
  fromTimezone: string,
  toTimezone: string
): Date {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: fromTimezone }))
  return new Date(utcDate.toLocaleString('en-US', { timeZone: toTimezone }))
}
