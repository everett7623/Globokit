// 名称: 国际节假日查询
// 描述: 查询全球主要贸易国家的节假日安排，便于外贸业务安排
// 路径: Globokit/app/tools/holiday-query/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useState } from 'react'
import { HolidayCalendarTab } from './holiday-calendar-tab'
import { HolidayCountryTab } from './holiday-country-tab'
import { HolidayInfo, HolidayStats } from './holiday-info'
import { InternationalHolidayTab, UpcomingHolidayTab } from './holiday-list-tabs'
import { ReligiousHolidayTab } from './holiday-religious-tab'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { countries, filterHolidaysByMonth, generateHolidayData, getCountriesByRegion, getCountryHolidays, getUpcomingHolidays, SUPPORTED_HOLIDAY_YEARS } from '@/lib/tools/holiday-query'

export default function HolidayQueryPage() {
  const currentYear = new Date().getFullYear()
  const defaultYear = SUPPORTED_HOLIDAY_YEARS.includes(currentYear as typeof SUPPORTED_HOLIDAY_YEARS[number]) ? currentYear : SUPPORTED_HOLIDAY_YEARS[SUPPORTED_HOLIDAY_YEARS.length - 1]
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [selectedYear, setSelectedYear] = useState(defaultYear.toString())
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const year = Number.parseInt(selectedYear)
  const countryInfo = countries[selectedCountry]
  const countryHolidays = getCountryHolidays(selectedCountry, year)
  const filteredHolidays = selectedMonth === 'all' ? countryHolidays : filterHolidaysByMonth(countryHolidays, Number.parseInt(selectedMonth))
  const upcomingHolidays = getUpcomingHolidays(30)
  const countriesByRegion = getCountriesByRegion()
  const regionNames = Object.keys(countriesByRegion).sort((a, b) => a.localeCompare(b, 'zh-CN'))
  const filteredCountries = selectedRegion === 'all' ? Object.entries(countries) : Object.entries(countries).filter(([, country]) => country.region === selectedRegion)
  const yearData = generateHolidayData(year)

  return <><div className="mb-8"><h1 className="text-3xl font-bold mb-2">国际节假日查询</h1><p className="text-muted-foreground">查询全球国家目录与主要贸易国家节假日安排，合理规划外贸业务</p></div><HolidayStats totalCountries={Object.keys(countries).length} totalHolidays={Object.values(yearData).reduce((sum, holidays) => sum + holidays.length, 0)} upcomingCount={upcomingHolidays.filter((holiday) => holiday.daysUntil <= 7).length} detailedCountries={Object.values(yearData).filter((holidays) => holidays.length > 0).length} year={selectedYear} /><Card><CardContent className="pt-6"><Tabs defaultValue="country" className="space-y-4"><TabsList className="grid w-full grid-cols-5"><TabsTrigger value="country">按国家查询</TabsTrigger><TabsTrigger value="upcoming">即将到来</TabsTrigger><TabsTrigger value="international">国际节日</TabsTrigger><TabsTrigger value="religious">宗教节日</TabsTrigger><TabsTrigger value="calendar">年历视图</TabsTrigger></TabsList><TabsContent value="country"><HolidayCountryTab selectedCountry={selectedCountry} selectedYear={selectedYear} selectedMonth={selectedMonth} selectedRegion={selectedRegion} selectedYearNumber={year} countryInfo={countryInfo} countries={countries} filteredCountries={filteredCountries} filteredHolidays={filteredHolidays} regionNames={regionNames} onCountry={setSelectedCountry} onYear={setSelectedYear} onMonth={setSelectedMonth} onRegion={setSelectedRegion} /></TabsContent><TabsContent value="upcoming"><UpcomingHolidayTab holidays={upcomingHolidays} /></TabsContent><TabsContent value="international"><InternationalHolidayTab /></TabsContent><TabsContent value="religious"><ReligiousHolidayTab /></TabsContent><TabsContent value="calendar"><HolidayCalendarTab country={countryInfo} year={selectedYear} holidays={countryHolidays} onMonth={setSelectedMonth} /></TabsContent></Tabs></CardContent></Card><HolidayInfo /></>
}
