// 名称: 国家信息页面数据
// 描述: 定义贸易国家、跨洲映射、筛选排序与 CSV 导出
// 路径: Globokit/app/tools/global-country-info/country-page-data.ts
// 作者: wwj
// 更新时间: 2026-07-15

import { COUNTRY_DATA, getTimeDifference, type CountryInfo } from '@/lib/tools/global-country-info'

export type SortField = 'name' | 'continent' | 'timezone' | 'none'
export type SortOrder = 'asc' | 'desc'

export const MAJOR_TRADE_COUNTRIES = ['CN', 'US', 'DE', 'JP', 'GB', 'FR', 'IT', 'NL', 'KR', 'CA', 'IN', 'SG', 'MX', 'ES', 'BE', 'CH', 'RU', 'AU', 'BR', 'AE']

export const TRANSCONTINENTAL_COUNTRIES: Record<string, string[]> = {
  RU: ['欧洲', '亚洲'], TR: ['亚洲', '欧洲'], EG: ['非洲', '亚洲'], KZ: ['亚洲', '欧洲'],
  GE: ['亚洲', '欧洲'], AZ: ['亚洲', '欧洲'], AM: ['亚洲', '欧洲'],
}

interface FilterOptions {
  searchTerm: string
  continentFilter: string
  favorites: string[]
  sortField: SortField
  sortOrder: SortOrder
  showOnlyFavorites: boolean
  showOnlyMajorTrade: boolean
}

export function filterAndSortCountries(options: FilterOptions) {
  const filtered = COUNTRY_DATA.filter((country) => {
    const term = options.searchTerm.toLowerCase()
    const matchesSearch = country.name_cn.toLowerCase().includes(term)
      || country.name_en.toLowerCase().includes(term)
      || country.iso2.toLowerCase().includes(term)
      || country.iso3.toLowerCase().includes(term)
      || country.dial_code.includes(term)
      || country.capital_cn.toLowerCase().includes(term)
      || country.capital_en.toLowerCase().includes(term)

    let matchesContinent = false
    if (options.continentFilter === 'all') matchesContinent = true
    else if (options.continentFilter === '跨洲国家') matchesContinent = Object.prototype.hasOwnProperty.call(TRANSCONTINENTAL_COUNTRIES, country.iso2)
    else if (TRANSCONTINENTAL_COUNTRIES[country.iso2]) matchesContinent = TRANSCONTINENTAL_COUNTRIES[country.iso2].includes(options.continentFilter)
    else matchesContinent = country.continent_cn === options.continentFilter

    return matchesSearch
      && matchesContinent
      && (!options.showOnlyFavorites || options.favorites.includes(country.iso2))
      && (!options.showOnlyMajorTrade || MAJOR_TRADE_COUNTRIES.includes(country.iso2))
  })

  filtered.sort((a, b) => {
    const aIsFavorite = options.favorites.includes(a.iso2)
    const bIsFavorite = options.favorites.includes(b.iso2)
    if (aIsFavorite && !bIsFavorite) return -1
    if (!aIsFavorite && bIsFavorite) return 1
    if (options.sortField === 'none') return 0

    let comparison = 0
    if (options.sortField === 'name') comparison = a.name_cn.localeCompare(b.name_cn)
    else if (options.sortField === 'continent') comparison = a.continent_cn.localeCompare(b.continent_cn)
    else comparison = getTimeDifference(a.timezone) - getTimeDifference(b.timezone)
    return options.sortOrder === 'asc' ? comparison : -comparison
  })
  return filtered
}

export function exportCountriesCsv(countries: CountryInfo[]) {
  const headers = ['国家', 'Country', 'ISO2', 'ISO3', '区号', '首都', '大洲', '时区', '货币', '官方语言', '人口', '面积(km²)', '主要宗教', '驱车方向', '电源插头', '电压', '工作时间', '主要港口']
  const rows = countries.map((country) => [
    country.name_cn, country.name_en, country.iso2, country.iso3, country.dial_code, country.capital_cn, country.continent_cn,
    country.timezone, `${country.currency_name_cn} (${country.currency_code})`, country.language_cn.join(', '), country.population,
    country.area_km2, country.religion.join(', '), country.driving_side === 'left' ? '左侧' : '右侧', country.power_plug,
    country.voltage, country.business_hours || '', country.major_ports?.join(', ') || '',
  ])
  const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `country-info-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
}
