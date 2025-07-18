// 名称: 世界时间
// 描述: 查看全球主要贸易城市的实时时间，便于外贸业务时间安排
// 路径: seedtool/app/tools/world-time/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-18

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Clock, Search, Globe } from 'lucide-react'
import { formatTime, getTimeZoneOffset, isBusinessHours } from '@/lib/tools/world-time'

// 主要贸易城市时区配置
const WORLD_CITIES = [
  { name: '北京', nameEn: 'Beijing', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '上海', nameEn: 'Shanghai', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '香港', nameEn: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: '中国', countryCode: 'HK' },
  { name: '东京', nameEn: 'Tokyo', timezone: 'Asia/Tokyo', country: '日本', countryCode: 'JP' },
  { name: '首尔', nameEn: 'Seoul', timezone: 'Asia/Seoul', country: '韩国', countryCode: 'KR' },
  { name: '新加坡', nameEn: 'Singapore', timezone: 'Asia/Singapore', country: '新加坡', countryCode: 'SG' },
  { name: '曼谷', nameEn: 'Bangkok', timezone: 'Asia/Bangkok', country: '泰国', countryCode: 'TH' },
  { name: '新德里', nameEn: 'New Delhi', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '迪拜', nameEn: 'Dubai', timezone: 'Asia/Dubai', country: '阿联酋', countryCode: 'AE' },
  { name: '莫斯科', nameEn: 'Moscow', timezone: 'Europe/Moscow', country: '俄罗斯', countryCode: 'RU' },
  { name: '伦敦', nameEn: 'London', timezone: 'Europe/London', country: '英国', countryCode: 'GB' },
  { name: '巴黎', nameEn: 'Paris', timezone: 'Europe/Paris', country: '法国', countryCode: 'FR' },
  { name: '柏林', nameEn: 'Berlin', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '马德里', nameEn: 'Madrid', timezone: 'Europe/Madrid', country: '西班牙', countryCode: 'ES' },
  { name: '罗马', nameEn: 'Rome', timezone: 'Europe/Rome', country: '意大利', countryCode: 'IT' },
  { name: '纽约', nameEn: 'New York', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '洛杉矶', nameEn: 'Los Angeles', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '芝加哥', nameEn: 'Chicago', timezone: 'America/Chicago', country: '美国', countryCode: 'US' },
  { name: '多伦多', nameEn: 'Toronto', timezone: 'America/Toronto', country: '加拿大', countryCode: 'CA' },
  { name: '墨西哥城', nameEn: 'Mexico City', timezone: 'America/Mexico_City', country: '墨西哥', countryCode: 'MX' },
  { name: '圣保罗', nameEn: 'São Paulo', timezone: 'America/Sao_Paulo', country: '巴西', countryCode: 'BR' },
  { name: '布宜诺斯艾利斯', nameEn: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: '阿根廷', countryCode: 'AR' },
  { name: '悉尼', nameEn: 'Sydney', timezone: 'Australia/Sydney', country: '澳大利亚', countryCode: 'AU' },
  { name: '墨尔本', nameEn: 'Melbourne', timezone: 'Australia/Melbourne', country: '澳大利亚', countryCode: 'AU' }
]

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
          currentTime: formatTime(cityTime),
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
  }, [])

  // 过滤城市
  const filteredCities = cityTimes.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 按时区分组
  const groupedCities = filteredCities.reduce((acc, city) => {
    const offset = city.offset
    if (!acc[offset]) {
      acc[offset] = []
    }
    acc[offset].push(city)
    return acc
  }, {} as Record<string, CityTime[]>)

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">世界时间</h1>
        <p className="text-muted-foreground">
          查看全球主要贸易城市的实时时间，便于安排国际业务
        </p>
      </div>

      {/* 当前本地时间 */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            本地时间
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-mono font-bold">
            {currentDateTime.toLocaleTimeString('zh-CN')}
          </div>
          <div className="text-muted-foreground">
            {currentDateTime.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </div>
        </CardContent>
      </Card>

      {/* 搜索框 */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="搜索城市名称或国家..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 城市时间列表 */}
      <div className="space-y-6">
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
                  <Card key={city.timezone} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <span className="text-2xl">{getFlagEmoji(city.countryCode)}</span>
                            {city.name}
                          </CardTitle>
                          <CardDescription>
                            {city.nameEn} · {city.country}
                          </CardDescription>
                        </div>
                        {city.isBusinessHours && (
                          <Badge variant="default" className="bg-green-500">
                            工作时间
                          </Badge>
                        )}
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
          <p className="text-muted-foreground">没有找到匹配的城市</p>
        </div>
      )}
    </div>
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
