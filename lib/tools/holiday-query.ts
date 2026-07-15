// 名称: 节假日数据查询函数
// 描述: 提供各国公共节假日的查询与日期计算逻辑
// 路径: Globokit/lib/tools/holiday-query.ts
// 作者: everettlabs
// 更新时间: 2026-07-06

import { COUNTRY_DATA, getFlagEmoji } from './global-country-info'
import { generatedHolidays2026, generatedHolidays2027 } from './holiday-query-generated'
import countryOverridesData from './data/holiday-country-overrides.json'
import observanceData from './data/holiday-observances.json'
import holidays2025Data from './data/holidays-2025.json'
import curatedHolidays2026Data from './data/holidays-curated-2026.json'

export interface Country {
  name: string
  flag: string
  timezone: string
  currency: string
  region: string
}

export interface Holiday {
  date: string
  name: string
  localName?: string
  nameCN?: string
  type: 'public' | 'regional' | 'observance' | 'international'
  impact: 'high' | 'medium' | 'low'
  description?: string
}

export interface UpcomingHoliday extends Holiday {
  country: string
  flag: string
  daysUntil: number
}

export const SUPPORTED_HOLIDAY_YEARS = [2025, 2026, 2027] as const

function mergeHolidayRecords(
  generated: Record<string, Holiday[]>,
  curated: Record<string, Holiday[]> = {}
): Record<string, Holiday[]> {
  return {
    ...generated,
    ...curated,
  }
}

// 手工维护的贸易国家/地区数据（按业务地区分组）
const CURATED_COUNTRIES = countryOverridesData as unknown as Record<string, Country>

const COUNTRY_DATA_BY_ISO2 = new Map(COUNTRY_DATA.map((country) => [country.iso2, country]))

function getHolidayRegion(continent: string): string {
  const regionMap: Record<string, string> = {
    '亚洲': '亚洲',
    '欧洲': '欧洲',
    '欧洲/亚洲': '中东',
    '北美洲': '北美',
    '南美洲': '南美',
    '非洲': '非洲',
    '大洋洲': '大洋洲',
  }

  return regionMap[continent] || '其他'
}

function buildCountryDirectory(): Record<string, Country> {
  const directory: Record<string, Country> = {}

  for (const country of COUNTRY_DATA) {
    directory[country.iso2] = {
      name: country.name_cn,
      flag: getFlagEmoji(country.iso2),
      timezone: country.timezone,
      currency: country.currency_code,
      region: getHolidayRegion(country.continent_cn),
    }
  }

  for (const [code, country] of Object.entries(CURATED_COUNTRIES)) {
    const countryInfo = COUNTRY_DATA_BY_ISO2.get(code)
    directory[code] = {
      ...country,
      flag: countryInfo ? getFlagEmoji(code) : country.flag,
      timezone: countryInfo?.timezone || country.timezone,
      currency: countryInfo?.currency_code || country.currency,
      region: country.region,
    }
  }

  return Object.fromEntries(
    Object.entries(directory).sort(([, a], [, b]) => {
      const regionCompare = a.region.localeCompare(b.region, 'zh-CN')
      if (regionCompare !== 0) return regionCompare
      return a.name.localeCompare(b.name, 'zh-CN')
    })
  )
}

// 完整国家/地区目录：详细节假日来自下方数据，国家基础信息来自全局国家库补齐。
export const countries: Record<string, Country> = buildCountryDirectory()

// 国际热门节假日（全球性节日）
export const internationalHolidays = observanceData.internationalHolidays as unknown as Holiday[]

// 宗教节日（2025年具体日期）
export const religiousHolidays2025 = observanceData.religiousHolidays2025 as unknown as Holiday[]

// 节假日对外贸的影响说明
export const impactDescriptions = observanceData.impactDescriptions as Record<Holiday['impact'], string>

// 节假日数据生成函数（支持多年份）
export function generateHolidayData(year: number): Record<string, Holiday[]> {
  if (year === 2025) {
    return holidays2025
  }
  if (year === 2026) {
    return holidays2026
  }
  if (year === 2027) {
    return holidays2027
  }
  return {}
}

// 2025年各国节假日数据
export const holidays2025 = holidays2025Data as unknown as Record<string, Holiday[]>

// 2026年手工修订数据（优先覆盖生成数据）
const curatedHolidays2026 = curatedHolidays2026Data as unknown as Record<string, Holiday[]>

export const holidays2026: Record<string, Holiday[]> = mergeHolidayRecords(generatedHolidays2026, curatedHolidays2026)

export const holidays2027: Record<string, Holiday[]> = generatedHolidays2027

// 获取特定国家的节假日
export function getCountryHolidays(countryCode: string, year: number = new Date().getFullYear()): Holiday[] {
  const yearHolidays = generateHolidayData(year)
  return yearHolidays[countryCode] || []
}

// 获取即将到来的节假日
export function getUpcomingHolidays(daysAhead: number = 30): UpcomingHoliday[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const currentYear = today.getFullYear()
  const upcoming: UpcomingHoliday[] = []
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + Math.max(0, daysAhead))
  const years = endDate.getFullYear() === currentYear ? [currentYear] : [currentYear, endDate.getFullYear()]
  const parseLocalDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
  const getDaysUntil = (date: string) => Math.round(
    (parseLocalDate(date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
  
  // 国家法定节假日
  years.forEach((year) => {
    Object.entries(generateHolidayData(year)).forEach(([countryCode, holidays]) => {
      const country = countries[countryCode]
      if (!country) return

      holidays.forEach(holiday => {
        const daysUntil = getDaysUntil(holiday.date)
        if (daysUntil > 0 && daysUntil <= daysAhead) {
          upcoming.push({ ...holiday, country: country.name, flag: country.flag, daysUntil })
        }
      })
    })
  })
  
  // 添加国际节假日
  years.forEach((year) => {
    internationalHolidays.forEach(holiday => {
      const date = `${year}-${holiday.date}`
      const daysUntil = getDaysUntil(date)
      if (daysUntil > 0 && daysUntil <= daysAhead) {
        upcoming.push({ ...holiday, date, country: '国际', flag: '🌍', daysUntil })
      }
    })
  })
  
  // 添加重要宗教节日
  if (currentYear === 2025) {
    religiousHolidays2025.forEach(holiday => {
      const daysUntil = getDaysUntil(holiday.date)
      
      if (daysUntil > 0 && daysUntil <= daysAhead && holiday.impact === 'high') {
        upcoming.push({
          ...holiday,
          country: '宗教节日',
          flag: '🙏',
          daysUntil
        })
      }
    })
  }
  
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil)
}

// 按月份筛选节假日
export function filterHolidaysByMonth(holidays: Holiday[], month: number): Holiday[] {
  return holidays.filter(holiday => {
    const holidayMonth = Number(holiday.date.split('-')[1])
    return holidayMonth === month
  })
}

// 获取节假日类型的中文名称
export function getHolidayTypeName(type: Holiday['type']): string {
  const typeNames = {
    public: '法定假日',
    regional: '地区假日',
    observance: '纪念日',
    international: '国际节日'
  }
  return typeNames[type] || type
}

// 获取影响等级的中文名称
export function getImpactLevelName(impact: Holiday['impact']): string {
  const impactNames = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return impactNames[impact] || impact
}

// 按地区分组获取国家
export function getCountriesByRegion(): Record<string, Array<{ code: string; country: Country }>> {
  const grouped: Record<string, Array<{ code: string; country: Country }>> = {}
  
  Object.entries(countries).forEach(([code, country]) => {
    if (!grouped[country.region]) {
      grouped[country.region] = []
    }
    grouped[country.region].push({ code, country })
  })

  Object.values(grouped).forEach((items) => {
    items.sort((a, b) => a.country.name.localeCompare(b.country.name, 'zh-CN'))
  })
  
  return grouped
}
