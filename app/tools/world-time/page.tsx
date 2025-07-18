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
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Search, Globe, Star, StarOff, Calculator } from 'lucide-react'
import { formatTime, getTimeZoneOffset, isBusinessHours, getTimeDifference } from '@/lib/tools/world-time'

// 主要贸易城市时区配置
const WORLD_CITIES = [
  // 亚洲
  { name: '北京', nameEn: 'Beijing', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '上海', nameEn: 'Shanghai', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '广州', nameEn: 'Guangzhou', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '深圳', nameEn: 'Shenzhen', timezone: 'Asia/Shanghai', country: '中国', countryCode: 'CN' },
  { name: '香港', nameEn: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: '中国', countryCode: 'HK' },
  { name: '台北', nameEn: 'Taipei', timezone: 'Asia/Taipei', country: '中国台湾', countryCode: 'TW' },
  { name: '东京', nameEn: 'Tokyo', timezone: 'Asia/Tokyo', country: '日本', countryCode: 'JP' },
  { name: '大阪', nameEn: 'Osaka', timezone: 'Asia/Tokyo', country: '日本', countryCode: 'JP' },
  { name: '首尔', nameEn: 'Seoul', timezone: 'Asia/Seoul', country: '韩国', countryCode: 'KR' },
  { name: '新加坡', nameEn: 'Singapore', timezone: 'Asia/Singapore', country: '新加坡', countryCode: 'SG' },
  { name: '吉隆坡', nameEn: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', country: '马来西亚', countryCode: 'MY' },
  { name: '曼谷', nameEn: 'Bangkok', timezone: 'Asia/Bangkok', country: '泰国', countryCode: 'TH' },
  { name: '雅加达', nameEn: 'Jakarta', timezone: 'Asia/Jakarta', country: '印度尼西亚', countryCode: 'ID' },
  { name: '马尼拉', nameEn: 'Manila', timezone: 'Asia/Manila', country: '菲律宾', countryCode: 'PH' },
  { name: '河内', nameEn: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh', country: '越南', countryCode: 'VN' },
  { name: '胡志明市', nameEn: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh', country: '越南', countryCode: 'VN' },
  { name: '新德里', nameEn: 'New Delhi', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '孟买', nameEn: 'Mumbai', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '班加罗尔', nameEn: 'Bangalore', timezone: 'Asia/Kolkata', country: '印度', countryCode: 'IN' },
  { name: '达卡', nameEn: 'Dhaka', timezone: 'Asia/Dhaka', country: '孟加拉国', countryCode: 'BD' },
  { name: '卡拉奇', nameEn: 'Karachi', timezone: 'Asia/Karachi', country: '巴基斯坦', countryCode: 'PK' },
  
  // 中东
  { name: '迪拜', nameEn: 'Dubai', timezone: 'Asia/Dubai', country: '阿联酋', countryCode: 'AE' },
  { name: '利雅得', nameEn: 'Riyadh', timezone: 'Asia/Riyadh', country: '沙特阿拉伯', countryCode: 'SA' },
  { name: '多哈', nameEn: 'Doha', timezone: 'Asia/Qatar', country: '卡塔尔', countryCode: 'QA' },
  { name: '科威特城', nameEn: 'Kuwait City', timezone: 'Asia/Kuwait', country: '科威特', countryCode: 'KW' },
  { name: '特拉维夫', nameEn: 'Tel Aviv', timezone: 'Asia/Jerusalem', country: '以色列', countryCode: 'IL' },
  { name: '伊斯坦布尔', nameEn: 'Istanbul', timezone: 'Europe/Istanbul', country: '土耳其', countryCode: 'TR' },
  { name: '德黑兰', nameEn: 'Tehran', timezone: 'Asia/Tehran', country: '伊朗', countryCode: 'IR' },
  
  // 欧洲
  { name: '伦敦', nameEn: 'London', timezone: 'Europe/London', country: '英国', countryCode: 'GB' },
  { name: '巴黎', nameEn: 'Paris', timezone: 'Europe/Paris', country: '法国', countryCode: 'FR' },
  { name: '柏林', nameEn: 'Berlin', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '法兰克福', nameEn: 'Frankfurt', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '慕尼黑', nameEn: 'Munich', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '汉堡', nameEn: 'Hamburg', timezone: 'Europe/Berlin', country: '德国', countryCode: 'DE' },
  { name: '阿姆斯特丹', nameEn: 'Amsterdam', timezone: 'Europe/Amsterdam', country: '荷兰', countryCode: 'NL' },
  { name: '布鲁塞尔', nameEn: 'Brussels', timezone: 'Europe/Brussels', country: '比利时', countryCode: 'BE' },
  { name: '马德里', nameEn: 'Madrid', timezone: 'Europe/Madrid', country: '西班牙', countryCode: 'ES' },
  { name: '巴塞罗那', nameEn: 'Barcelona', timezone: 'Europe/Madrid', country: '西班牙', countryCode: 'ES' },
  { name: '罗马', nameEn: 'Rome', timezone: 'Europe/Rome', country: '意大利', countryCode: 'IT' },
  { name: '米兰', nameEn: 'Milan', timezone: 'Europe/Rome', country: '意大利', countryCode: 'IT' },
  { name: '苏黎世', nameEn: 'Zurich', timezone: 'Europe/Zurich', country: '瑞士', countryCode: 'CH' },
  { name: '维也纳', nameEn: 'Vienna', timezone: 'Europe/Vienna', country: '奥地利', countryCode: 'AT' },
  { name: '华沙', nameEn: 'Warsaw', timezone: 'Europe/Warsaw', country: '波兰', countryCode: 'PL' },
  { name: '布拉格', nameEn: 'Prague', timezone: 'Europe/Prague', country: '捷克', countryCode: 'CZ' },
  { name: '布达佩斯', nameEn: 'Budapest', timezone: 'Europe/Budapest', country: '匈牙利', countryCode: 'HU' },
  { name: '斯德哥尔摩', nameEn: 'Stockholm', timezone: 'Europe/Stockholm', country: '瑞典', countryCode: 'SE' },
  { name: '哥本哈根', nameEn: 'Copenhagen', timezone: 'Europe/Copenhagen', country: '丹麦', countryCode: 'DK' },
  { name: '奥斯陆', nameEn: 'Oslo', timezone: 'Europe/Oslo', country: '挪威', countryCode: 'NO' },
  { name: '赫尔辛基', nameEn: 'Helsinki', timezone: 'Europe/Helsinki', country: '芬兰', countryCode: 'FI' },
  { name: '莫斯科', nameEn: 'Moscow', timezone: 'Europe/Moscow', country: '俄罗斯', countryCode: 'RU' },
  { name: '圣彼得堡', nameEn: 'St. Petersburg', timezone: 'Europe/Moscow', country: '俄罗斯', countryCode: 'RU' },
  { name: '基辅', nameEn: 'Kyiv', timezone: 'Europe/Kiev', country: '乌克兰', countryCode: 'UA' },
  { name: '雅典', nameEn: 'Athens', timezone: 'Europe/Athens', country: '希腊', countryCode: 'GR' },
  { name: '里斯本', nameEn: 'Lisbon', timezone: 'Europe/Lisbon', country: '葡萄牙', countryCode: 'PT' },
  { name: '都柏林', nameEn: 'Dublin', timezone: 'Europe/Dublin', country: '爱尔兰', countryCode: 'IE' },
  
  // 北美
  { name: '纽约', nameEn: 'New York', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '洛杉矶', nameEn: 'Los Angeles', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '芝加哥', nameEn: 'Chicago', timezone: 'America/Chicago', country: '美国', countryCode: 'US' },
  { name: '休斯顿', nameEn: 'Houston', timezone: 'America/Chicago', country: '美国', countryCode: 'US' },
  { name: '迈阿密', nameEn: 'Miami', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '西雅图', nameEn: 'Seattle', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '旧金山', nameEn: 'San Francisco', timezone: 'America/Los_Angeles', country: '美国', countryCode: 'US' },
  { name: '波士顿', nameEn: 'Boston', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '亚特兰大', nameEn: 'Atlanta', timezone: 'America/New_York', country: '美国', countryCode: 'US' },
  { name: '达拉斯', nameEn: 'Dallas', timezone: 'America/Chicago', country: '美国', countryCode: 'US' },
  { name: '丹佛', nameEn: 'Denver', timezone: 'America/Denver', country: '美国', countryCode: 'US' },
  { name: '多伦多', nameEn: 'Toronto', timezone: 'America/Toronto', country: '加拿大', countryCode: 'CA' },
  { name: '温哥华', nameEn: 'Vancouver', timezone: 'America/Vancouver', country: '加拿大', countryCode: 'CA' },
  { name: '蒙特利尔', nameEn: 'Montreal', timezone: 'America/Toronto', country: '加拿大', countryCode: 'CA' },
  { name: '墨西哥城', nameEn: 'Mexico City', timezone: 'America/Mexico_City', country: '墨西哥', countryCode: 'MX' },
  { name: '瓜达拉哈拉', nameEn: 'Guadalajara', timezone: 'America/Mexico_City', country: '墨西哥', countryCode: 'MX' },
  
  // 中南美洲
  { name: '圣保罗', nameEn: 'São Paulo', timezone: 'America/Sao_Paulo', country: '巴西', countryCode: 'BR' },
  { name: '里约热内卢', nameEn: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', country: '巴西', countryCode: 'BR' },
  { name: '布宜诺斯艾利斯', nameEn: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: '阿根廷', countryCode: 'AR' },
  { name: '圣地亚哥', nameEn: 'Santiago', timezone: 'America/Santiago', country: '智利', countryCode: 'CL' },
  { name: '利马', nameEn: 'Lima', timezone: 'America/Lima', country: '秘鲁', countryCode: 'PE' },
  { name: '波哥大', nameEn: 'Bogotá', timezone: 'America/Bogota', country: '哥伦比亚', countryCode: 'CO' },
  { name: '加拉加斯', nameEn: 'Caracas', timezone: 'America/Caracas', country: '委内瑞拉', countryCode: 'VE' },
  { name: '基多', nameEn: 'Quito', timezone: 'America/Guayaquil', country: '厄瓜多尔', countryCode: 'EC' },
  { name: '巴拿马城', nameEn: 'Panama City', timezone: 'America/Panama', country: '巴拿马', countryCode: 'PA' },
  
  // 非洲
  { name: '开罗', nameEn: 'Cairo', timezone: 'Africa/Cairo', country: '埃及', countryCode: 'EG' },
  { name: '约翰内斯堡', nameEn: 'Johannesburg', timezone: 'Africa/Johannesburg', country: '南非', countryCode: 'ZA' },
  { name: '开普敦', nameEn: 'Cape Town', timezone: 'Africa/Johannesburg', country: '南非', countryCode: 'ZA' },
  { name: '拉各斯', nameEn: 'Lagos', timezone: 'Africa/Lagos', country: '尼日利亚', countryCode: 'NG' },
  { name: '内罗毕', nameEn: 'Nairobi', timezone: 'Africa/Nairobi', country: '肯尼亚', countryCode: 'KE' },
  { name: '卡萨布兰卡', nameEn: 'Casablanca', timezone: 'Africa/Casablanca', country: '摩洛哥', countryCode: 'MA' },
  { name: '阿尔及尔', nameEn: 'Algiers', timezone: 'Africa/Algiers', country: '阿尔及利亚', countryCode: 'DZ' },
  { name: '突尼斯', nameEn: 'Tunis', timezone: 'Africa/Tunis', country: '突尼斯', countryCode: 'TN' },
  { name: '亚的斯亚贝巴', nameEn: 'Addis Ababa', timezone: 'Africa/Addis_Ababa', country: '埃塞俄比亚', countryCode: 'ET' },
  
  // 大洋洲
  { name: '悉尼', nameEn: 'Sydney', timezone: 'Australia/Sydney', country: '澳大利亚', countryCode: 'AU' },
  { name: '墨尔本', nameEn: 'Melbourne', timezone: 'Australia/Melbourne', country: '澳大利亚', countryCode: 'AU' },
  { name: '布里斯班', nameEn: 'Brisbane', timezone: 'Australia/Brisbane', country: '澳大利亚', countryCode: 'AU' },
  { name: '珀斯', nameEn: 'Perth', timezone: 'Australia/Perth', country: '澳大利亚', countryCode: 'AU' },
  { name: '奥克兰', nameEn: 'Auckland', timezone: 'Pacific/Auckland', country: '新西兰', countryCode: 'NZ' },
  { name: '惠灵顿', nameEn: 'Wellington', timezone: 'Pacific/Auckland', country: '新西兰', countryCode: 'NZ' }
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
    if (quickFilter === 'upcoming') {
      if (city.isBusinessHours) return false
      const now = new Date()
      const cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.timezone }))
      const hour = cityTime.getHours()
      const day = cityTime.getDay()
      return day >= 1 && day <= 5 && hour >= 7 && hour < 9
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
    if (quickFilter === 'major' && !['北京', '上海', '香港', '东京', '首尔', '新加坡', '伦敦', '巴黎', '柏林', '纽约', '洛杉矶', '悉尼', '迪拜', '孟买'].includes(city.name)) {
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
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">世界时间</h1>
        <p className="text-muted-foreground">
          查看全球主要贸易城市的实时时间，便于安排国际业务
        </p>
      </div>

      {/* 当前本地时间 */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            本地时间
            <Badge variant="outline" className="ml-2">{localTimezone}</Badge>
            <Badge variant="secondary">UTC{localOffset}</Badge>
            <div className="ml-auto flex items-center gap-1 text-xs font-normal">
              <Button
                variant={timeFormat === '12' ? 'default' : 'ghost'}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setTimeFormat('12')}
              >
                12H
              </Button>
              <Button
                variant={timeFormat === '24' ? 'default' : 'ghost'}
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setTimeFormat('24')}
              >
                24H
              </Button>
            </div>
          </CardTitle>
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

      {/* 快捷信息卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        {/* 当前工作时间城市数 */}
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-green-500">
                <Clock className="h-3 w-3 text-white" />
              </div>
              正在工作时间
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {cityTimes.filter(c => c.isBusinessHours).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              个城市（共{cityTimes.length}个）
            </p>
          </CardContent>
        </Card>

        {/* 即将工作时间 */}
        <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-orange-500">
                <Clock className="h-3 w-3 text-white" />
              </div>
              即将开始工作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {upcomingWorkingCities.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              个城市（2小时内）
            </p>
          </CardContent>
        </Card>

        {/* 收藏城市 */}
        <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-purple-500">
                <Star className="h-3 w-3 text-white" />
              </div>
              已收藏城市
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {favorites.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              个常用城市
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 标签页和搜索框 */}
      <div className="mb-6 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="all">所有城市</TabsTrigger>
            <TabsTrigger value="favorites">
              收藏城市 {favorites.length > 0 && `(${favorites.length})`}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 快捷过滤按钮 */}
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
            className={quickFilter === 'working' ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            <Clock className="h-4 w-4 mr-1" />
            工作时间 ({cityTimes.filter(c => c.isBusinessHours).length})
          </Button>
          <Button
            variant={quickFilter === 'upcoming' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setQuickFilter(quickFilter === 'upcoming' ? '' : 'upcoming')}
            className={quickFilter === 'upcoming' ? 'bg-orange-500 hover:bg-orange-600' : ''}
          >
            <Clock className="h-4 w-4 mr-1" />
            即将上班 ({upcomingWorkingCities.length})
          </Button>
          <Button
            variant={quickFilter === 'major' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setQuickFilter(quickFilter === 'major' ? '' : 'major')}
          >
            <Star className="h-4 w-4 mr-1" />
            主要城市
          </Button>
          <div className="h-8 w-px bg-border" />
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

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="搜索城市名称或国家..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
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

      {/* 实用提示 */}
      <Card className="mt-8 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            实用提示
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击星标收藏常用城市，方便快速查看</p>
          <p>• 绿色"工作时间"标签表示该地区处于周一至周五 9:00-18:00</p>
          <p>• 时差标签显示与您本地时间的差异，便于安排会议</p>
          <p>• 建议避开对方的午餐时间（12:00-14:00）和下班时间</p>
          <p>• 使用快捷过滤按钮可以快速筛选特定地区或工作时间的城市</p>
        </CardContent>
      </Card>
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
