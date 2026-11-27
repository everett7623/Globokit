// 名称: 国家外贸档案数据聚合工具
// 描述: 基于 171 国基础资料与 2025-2027 节假日数据，为 /country 与 /country/[code] 静态专题页提供统一查询
// 路径: Globokit/lib/country-guide.ts
// 作者: everettlabs
// 更新时间: 2026-11-27

import { COUNTRY_DATA, getFlagEmoji, getTimeDifference, type CountryInfo } from '@/lib/tools/global-country-info'
import { generateHolidayData, type Holiday } from '@/lib/tools/holiday-query'

const COUNTRY_BY_CODE = new Map(
  COUNTRY_DATA.map((country) => [country.iso2.toLowerCase(), country])
)

export function getAllCountries(): CountryInfo[] {
  return COUNTRY_DATA
}

export function getAllCountryCodes(): string[] {
  return COUNTRY_DATA.map((country) => country.iso2.toLowerCase())
}

export function getCountryByCode(code: string): CountryInfo | undefined {
  return COUNTRY_BY_CODE.get(code.trim().toLowerCase())
}

export function getCountryFlag(iso2: string): string {
  return getFlagEmoji(iso2)
}

export function getCountryHolidaysForYear(iso2: string, year: 2026 | 2027): Holiday[] {
  const data = generateHolidayData(year)
  return data[iso2.toUpperCase()] ?? []
}

export function formatBeijingTimeDiff(timezone: string): string {
  const diff = getTimeDifference(timezone, 'Asia/Shanghai')
  if (diff === 0) return '与北京时间一致'
  const hours = Number.isInteger(Math.abs(diff)) ? Math.abs(diff).toString() : Math.abs(diff).toFixed(1)
  return diff > 0 ? `比北京时间快 ${hours} 小时` : `比北京时间慢 ${hours} 小时`
}

export function getCountriesGroupedByContinent(): Array<{ continent: string; countries: CountryInfo[] }> {
  const grouped = new Map<string, CountryInfo[]>()
  for (const country of COUNTRY_DATA) {
    const list = grouped.get(country.continent_cn) ?? []
    list.push(country)
    grouped.set(country.continent_cn, list)
  }
  return Array.from(grouped.entries()).map(([continent, countries]) => ({
    continent,
    countries: [...countries].sort((a, b) => a.name_cn.localeCompare(b.name_cn, 'zh-CN')),
  }))
}

export function getRelatedCountries(current: CountryInfo, limit = 8): CountryInfo[] {
  return COUNTRY_DATA.filter(
    (item) => item.continent_cn === current.continent_cn && item.iso2 !== current.iso2
  )
    .sort((a, b) => b.population - a.population)
    .slice(0, limit)
}

export function buildCountryFaqs(country: CountryInfo): Array<{ question: string; answer: string }> {
  const diffText = formatBeijingTimeDiff(country.timezone)
  const languages = country.language_cn.join('、') || '当地官方语言'
  const ports = country.major_ports?.length ? `主要贸易港口包括 ${country.major_ports.join('、')}。` : ''

  return [
    {
      question: `${country.name_cn}（${country.name_en}）使用什么货币和国际区号？`,
      answer: `${country.name_cn}的官方货币为 ${country.currency_name_cn}（${country.currency_code}，符号 ${country.currency_symbol}），国际电话区号为 ${country.dial_code}，国家顶级域名为 ${country.tld}。`,
    },
    {
      question: `${country.name_cn}的电压和插头标准是什么？`,
      answer: `${country.name_cn}标准电压为 ${country.voltage}，常见插头类型为 ${country.power_plug}，出口机电或带电产品前请提前确认目标市场插头与认证要求。`,
    },
    {
      question: `${country.name_cn}与北京时间相差几小时？常用商务语言是什么？`,
      answer: `${country.name_cn}主要时区为 ${country.timezone}（当前${diffText}），常用语言为 ${languages}。${ports}`,
    },
  ]
}
