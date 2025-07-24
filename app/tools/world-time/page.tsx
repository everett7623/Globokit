// 名称: 世界时间
// 描述: 查看全球主要贸易城市的实时时间，便于外贸业务时间安排
// 路径: seedtool/app/tools/world-time/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-24

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Search, Globe, Star, StarOff, Calculator, Info } from 'lucide-react'
import { formatTime, getTimeZoneOffset, isBusinessHours, getTimeDifference, WORLD_CITIES } from '@/lib/tools/world-time'
import { Label } from '@/components/ui/label'

interface CityTime {
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

export default function WorldTimePage() {
  const [cityTimes, setCityTimes] = useState<CityTime[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [quickFilter, setQuickFilter] = useState<string>('')
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('24')

  // 从localStorage加载收藏
  useEffect(() => {
    const saved = localStorage.getItem('worldTimeFavorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // 更新时间
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      setCurrentDateTime(now)
      
      const times = WORLD_CITIES.map(city => {
        const cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.timezone }))
        const offset = getTimeZoneOffset(city.timezone)
        
        return {
          ...city,
          currentTime: timeFormat === '24' 
            ? formatTime(cityTime) 
            : cityTime.toLocaleTimeString('en-US', { 
                timeZone: city.timezone,
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
          date: cityTime.toLocaleDateString('zh-CN', {
            timeZone: city.timezone,
            month: 'long',
            day: 'numeric',
            weekday: 'short'
          }),
          offset,
          isBusinessHours: isBusinessHours(cityTime)
        }
      })
      
      setCityTimes(times)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [timeFormat])

  // 切换收藏
  const toggleFavorite = (cityName: string) => {
    const newFavorites = favorites.includes(cityName)
      ? favorites.filter(f => f !== cityName)
      : [...favorites, cityName]
    
    setFavorites(newFavorites)
    localStorage.setItem('worldTimeFavorites', JSON.stringify(newFavorites))
  }

  // 过滤城市
  const filteredCities = cityTimes.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    
    // 标签页过滤
    if (activeTab === 'favorites' && !favorites.includes(city.name)) {
      return false
    }
    
    // 快捷过滤
    if (quickFilter === 'working' && !city.isBusinessHours) {
      return false
    }
    if (quickFilter === 'asia' && !['CN', 'HK', 'TW', 'JP', 'KR', 'SG', 'MY', 'TH', 'ID', 'PH', 'VN', 'IN', 'BD', 'PK'].includes(city.countryCode)) {
      return false
    }
    if (quickFilter === 'europe' && !['GB', 'FR', 'DE', 'NL', 'BE', 'ES', 'IT', 'CH', 'AT', 'PL', 'CZ', 'HU', 'SE', 'DK', 'NO', 'FI', 'RU', 'UA', 'GR', 'PT', 'IE', 'TR'].includes(city.countryCode)) {
      return false
    }
    if (quickFilter === 'americas' && !['US', 'CA', 'MX', 'BR', 'AR', 'CL', 'PE', 'CO', 'VE', 'EC', 'PA'].includes(city.countryCode)) {
      return false
    }
    
    return matchesSearch
  })

  // 按时区分组
  const groupedCities = filteredCities.reduce((acc, city) => {
    const offset = city.offset
    if (!acc[offset]) {
      acc[offset] = []
    }
    acc[offset].push(city)
    return acc
  }, {} as Record<string, CityTime[]>)

  // 获取本地时区
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const localOffset = getTimeZoneOffset(localTimezone)

  // 获取即将进入工作时间的城市（未来2小时内）
  const getUpcomingWorkingCities = () => {
    return cityTimes.filter(city => {
      if (city.isBusinessHours) return false
      
      const now = new Date()
      const cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.timezone }))
      const hour = cityTime.getHours()
      const day = cityTime.getDay()
      
      // 工作日且在7-9点之间
      return day >= 1 && day <= 5 && hour >= 7 && hour < 9
    })
  }

  const upcomingWorkingCities = getUpcomingWorkingCities()

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">世界时间</h1>
        <p className="text-muted-foreground">
          查看全球主要贸易城市的实时时间，便于安排国际业务
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              工作时间城市
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cityTimes.filter(c => c.isBusinessHours).length}</div>
            <p className="text-xs text-muted-foreground">个城市正在工作</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              即将开始工作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingWorkingCities.length}</div>
            <p className="text-xs text-muted-foreground">个城市（2小时内）</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              已收藏城市
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.length}</div>
            <p className="text-xs text-muted-foreground">个常用城市</p>
          </CardContent>
        </Card>
      </div>

      {/* 当前本地时间 */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            本地时间
            <Badge variant="outline" className="ml-2">{localTimezone}</Badge>
            <Badge variant="secondary">UTC{localOffset}</Badge>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Label>时间格式：</Label>
              <Button
                variant={timeFormat === '12' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFormat('12')}
              >
                12小时
              </Button>
              <Button
                variant={timeFormat === '24' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFormat('24')}
              >
                24小时
              </Button>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-mono font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {timeFormat === '24' 
              ? currentDateTime.toLocaleTimeString('zh-CN')
              : currentDateTime.toLocaleTimeString('en-US', { hour12: true })
            }
          </div>
          <div className="text-muted-foreground mt-1">
            {currentDateTime.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </div>
        </CardContent>
      </Card>

      {/* 主要功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>城市时间查询</CardTitle>
          <CardDescription>
            查看全球主要贸易城市的实时时间和工作状态
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 标签页和搜索框 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all">所有城市</TabsTrigger>
              <TabsTrigger value="favorites">
                收藏城市 {favorites.length > 0 && `(${favorites.length})`}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 快捷过滤按钮 */}
          <div className="space-y-2">
            <Label>快捷筛选</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={quickFilter === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQuickFilter('')}
              >
                全部显示
              </Button>
              <Button
                variant={quickFilter === 'working' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQuickFilter(quickFilter === 'working' ? '' : 'working')}
              >
                工作时间
              </Button>
              <Button
                variant={quickFilter === 'asia' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQuickFilter(quickFilter === 'asia' ? '' : 'asia')}
              >
                亚洲
              </Button>
              <Button
                variant={quickFilter === 'europe' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQuickFilter(quickFilter === 'europe' ? '' : 'europe')}
              >
                欧洲
              </Button>
              <Button
                variant={quickFilter === 'americas' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQuickFilter(quickFilter === 'americas' ? '' : 'americas')}
              >
                美洲
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search">搜索城市</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search"
                type="text"
                placeholder="搜索城市名称或国家..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 城市时间列表 */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            {Object.entries(groupedCities)
              .sort(([a], [b]) => {
                const offsetA = parseInt(a.replace(/[^\d-]/g, ''))
                const offsetB = parseInt(b.replace(/[^\d-]/g, ''))
                return offsetB - offsetA
              })
              .map(([offset, cities]) => (
                <div key={offset}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    UTC{offset}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cities.map((city) => (
                      <Card 
                        key={city.timezone} 
                        className={`overflow-hidden transition-all hover:shadow-lg ${
                          favorites.includes(city.name) ? 'ring-2 ring-yellow-400' : ''
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg flex items-center gap-2">
                                <span className="text-2xl">{getFlagEmoji(city.countryCode)}</span>
                                {city.name}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 h-6 w-6 p-0"
                                  onClick={() => toggleFavorite(city.name)}
                                >
                                  {favorites.includes(city.name) ? (
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ) : (
                                    <StarOff className="h-4 w-4" />
                                  )}
                                </Button>
                              </CardTitle>
                              <CardDescription>
                                {city.nameEn} · {city.country}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {city.isBusinessHours && (
                                <Badge variant="default" className="bg-green-500">
                                  工作时间
                                </Badge>
                              )}
                              {localTimezone !== city.timezone && (
                                <Badge variant="outline" className="text-xs">
                                  {getTimeDifference(city.timezone, localTimezone) > 0 ? '+' : ''}
                                  {getTimeDifference(city.timezone, localTimezone)}h
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-1">
                            <div className="text-2xl font-mono font-bold">
                              {city.currentTime}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {city.date}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {city.timezone}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {activeTab === 'favorites' && favorites.length === 0 
                  ? '还没有收藏任何城市，点击星标收藏常用城市'
                  : '没有找到匹配的城市'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击星标收藏常用城市，方便快速查看</p>
          <p>• 绿色"工作时间"标签表示该地区处于周一至周五 9:00-18:00</p>
          <p>• 时差标签显示与您本地时间的差异，便于安排会议</p>
          <p>• 建议避开对方的午餐时间（12:00-14:00）和下班时间</p>
          <p>• 使用快捷筛选按钮可以快速查看特定地区的城市</p>
          <p>• 支持12小时和24小时时间格式切换</p>
        </CardContent>
      </Card>
    </>
  )
}

// 获取国旗emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
