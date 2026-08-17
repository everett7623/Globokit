// 名称: 世界时间
// 描述: 查看全球主要贸易城市的实时时间，便于安排国际业务
// 路径: Globokit/app/tools/world-time/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useEffect, useState } from 'react'
import { WorldTimeCityList } from './world-time-city-list'
import { WorldTimeControls } from './world-time-controls'
import { LocalTimeCard, WorldTimeInfo, WorldTimeStats } from './world-time-dashboard'
import { buildCityTimes, getUpcomingWorkingCities, readStoredStringArray, type CityTime } from './world-time-page-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getTimeZoneOffset, getWorldTimeRegion } from '@/lib/tools/world-time'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { CardSkeleton } from '@/components/ui/loading-indicator'

export default function WorldTimePage() {
  const [cityTimes, setCityTimes] = useState<CityTime[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null)
  const [localTimezone, setLocalTimezone] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [quickFilter, setQuickFilter] = useState('')
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('24')

  useEffect(() => setFavorites(readStoredStringArray('worldTimeFavorites')), [])
  useEffect(() => {
    setLocalTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const updateTimes = () => {
      const now = new Date()
      setCurrentDateTime(now)
      setCityTimes(buildCityTimes(now, timeFormat))
    }
    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [timeFormat])

  const toggleFavorite = (cityName: string) => {
    const newFavorites = favorites.includes(cityName) ? favorites.filter((favorite) => favorite !== cityName) : [...favorites, cityName]
    setFavorites(newFavorites)
    localStorage.setItem('worldTimeFavorites', JSON.stringify(newFavorites))
  }
  const normalizedSearchTerm = searchTerm.toLowerCase()
  const filteredCities = cityTimes.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(normalizedSearchTerm) || city.nameEn.toLowerCase().includes(normalizedSearchTerm) || city.country.toLowerCase().includes(normalizedSearchTerm)
    if (activeTab === 'favorites' && !favorites.includes(city.name)) return false
    if (quickFilter === 'working' && !city.isBusinessHours) return false
    if (quickFilter && quickFilter !== 'working' && getWorldTimeRegion(city.countryCode) !== quickFilter) return false
    return matchesSearch
  })
  const groupedCities = filteredCities.reduce<Record<string, CityTime[]>>((groups, city) => {
    if (!groups[city.offset]) groups[city.offset] = []
    groups[city.offset].push(city)
    return groups
  }, {})
  return (
    <MobileFriendlyWrapper>
      <div className="mb-8"><h1 className="text-3xl font-bold mb-2">世界时间</h1><p className="text-muted-foreground">查看全球主要贸易城市和各国首都实时时间，便于安排国际业务</p></div>
      <WorldTimeStats cities={cityTimes} coveredCountries={new Set(cityTimes.map((city) => city.countryCode)).size} upcomingCount={getUpcomingWorkingCities(cityTimes).length} favoriteCount={favorites.length} />
      <LocalTimeCard currentDateTime={currentDateTime} localTimezone={localTimezone} localOffset={localTimezone ? getTimeZoneOffset(localTimezone) : null} timeFormat={timeFormat} onFormatChange={setTimeFormat} />
      <Card>
        <CardHeader><CardTitle>城市时间查询</CardTitle><CardDescription>查看全球主要贸易城市、各国首都的实时时间和工作状态</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <WorldTimeControls activeTab={activeTab} favoriteCount={favorites.length} quickFilter={quickFilter} searchTerm={searchTerm} onTabChange={setActiveTab} onQuickFilterChange={setQuickFilter} onSearchChange={setSearchTerm} />
          <div className="space-y-6 max-h-[600px] overflow-y-auto">{localTimezone ? <WorldTimeCityList groupedCities={groupedCities} filteredCount={filteredCities.length} activeTab={activeTab} favorites={favorites} localTimezone={localTimezone} onToggleFavorite={toggleFavorite} /> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-busy="true"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>}</div>
        </CardContent>
      </Card>
      <WorldTimeInfo />
    </MobileFriendlyWrapper>
  )
}
