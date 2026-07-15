// 名称: 世界时间页面数据
// 描述: 构建城市实时时间并提供页面辅助函数
// 路径: Globokit/app/tools/world-time/world-time-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import { formatTime, getTimeZoneOffset, isBusinessHours, WORLD_CITIES } from '@/lib/tools/world-time'

export interface CityTime {
  name: string
  nameEn: string
  timezone: string
  country: string
  countryCode: string
  currentTime: string
  date: string
  offset: string
  isBusinessHours: boolean
}

export function parseOffsetValue(offset: string): number {
  const match = offset.match(/^([+-])(\d{2}):(\d{2})$/)
  if (!match) return 0
  const sign = match[1] === '+' ? 1 : -1
  return sign * (Number(match[2]) + Number(match[3]) / 60)
}

export function readStoredStringArray(key: string): string[] {
  try {
    const saved = localStorage.getItem(key)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    localStorage.removeItem(key)
    return []
  }
}

export function buildCityTimes(now: Date, timeFormat: '12' | '24'): CityTime[] {
  return WORLD_CITIES.flatMap((city) => {
    try {
      const cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.timezone }))
      return [{
        ...city,
        currentTime: timeFormat === '24' ? formatTime(cityTime) : cityTime.toLocaleTimeString('en-US', {
          timeZone: city.timezone,
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        date: cityTime.toLocaleDateString('zh-CN', {
          timeZone: city.timezone,
          month: 'long',
          day: 'numeric',
          weekday: 'short',
        }),
        offset: getTimeZoneOffset(city.timezone),
        isBusinessHours: isBusinessHours(cityTime),
      }]
    } catch {
      return []
    }
  })
}

export function getUpcomingWorkingCities(cityTimes: CityTime[]) {
  return cityTimes.filter((city) => {
    if (city.isBusinessHours) return false
    const cityTime = new Date(new Date().toLocaleString('en-US', { timeZone: city.timezone }))
    const hour = cityTime.getHours()
    const day = cityTime.getDay()
    return day >= 1 && day <= 5 && hour >= 7 && hour < 9
  })
}

export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode.toUpperCase().split('').map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
