// 名称: 世界时间页面数据
// 描述: 构建城市实时时间并提供页面辅助函数
// 路径: Globokit/app/tools/world-time/world-time-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import { getTimeZoneOffset, WORLD_CITIES } from '@/lib/tools/world-time'

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

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
  localWeekday: number
  localHour: number
}

function getCityClockParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return {
    weekday: WEEKDAY_INDEX[values.weekday] ?? -1,
    hour: Number(values.hour),
  }
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
      const clock = getCityClockParts(now, city.timezone)
      return [{
        ...city,
        currentTime: now.toLocaleTimeString(timeFormat === '24' ? 'zh-CN' : 'en-US', {
          timeZone: city.timezone,
          hour12: timeFormat === '12',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        date: now.toLocaleDateString('zh-CN', {
          timeZone: city.timezone,
          month: 'long',
          day: 'numeric',
          weekday: 'short',
        }),
        offset: getTimeZoneOffset(city.timezone),
        isBusinessHours: clock.weekday >= 1 && clock.weekday <= 5 && clock.hour >= 9 && clock.hour < 18,
        localWeekday: clock.weekday,
        localHour: clock.hour,
      }]
    } catch {
      return []
    }
  })
}

export function getUpcomingWorkingCities(cityTimes: CityTime[]) {
  return cityTimes.filter((city) => {
    if (city.isBusinessHours) return false
    return city.localWeekday >= 1 && city.localWeekday <= 5 && city.localHour >= 7 && city.localHour < 9
  })
}

export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode.toUpperCase().split('').map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
