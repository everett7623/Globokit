// 名称: 国际节假日查询
// 描述: 查询全球主要贸易国家的节假日安排，便于外贸业务安排
// 路径: seedtool/app/tools/holiday-query/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-09

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Globe, AlertCircle, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// 类型定义
interface Country {
  name: string
  flag: string
  timezone: string
  currency: string
}

interface Holiday {
  date: string
  name: string
  type: 'public' | 'regional' | 'observance'
  impact: 'high' | 'medium' | 'low'
}

interface UpcomingHoliday extends Holiday {
  country: string
  flag: string
  daysUntil: number
}

// 国家/地区数据
const countries: Record<string, Country> = {
  US: { name: '美国', flag: '🇺🇸', timezone: 'UTC-5', currency: 'USD' },
  UK: { name: '英国', flag: '🇬🇧', timezone: 'UTC+0', currency: 'GBP' },
  DE: { name: '德国', flag: '🇩🇪', timezone: 'UTC+1', currency: 'EUR' },
  FR: { name: '法国', flag: '🇫🇷', timezone: 'UTC+1', currency: 'EUR' },
  JP: { name: '日本', flag: '🇯🇵', timezone: 'UTC+9', currency: 'JPY' },
  KR: { name: '韩国', flag: '🇰🇷', timezone: 'UTC+9', currency: 'KRW' },
  SG: { name: '新加坡', flag: '🇸🇬', timezone: 'UTC+8', currency: 'SGD' },
  AU: { name: '澳大利亚', flag: '🇦🇺', timezone: 'UTC+10', currency: 'AUD' },
  CA: { name: '加拿大', flag: '🇨🇦', timezone: 'UTC-5', currency: 'CAD' },
  BR: { name: '巴西', flag: '🇧🇷', timezone: 'UTC-3', currency: 'BRL' },
  IN: { name: '印度', flag: '🇮🇳', timezone: 'UTC+5:30', currency: 'INR' },
  AE: { name: '阿联酋', flag: '🇦🇪', timezone: 'UTC+4', currency: 'AED' }
}

// 2025年各国节假日数据
const holidays2025: Record<string, Holiday[]> = {
  US: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-01-20', name: 'Martin Luther King Jr. Day', type: 'public', impact: 'medium' },
    { date: '2025-02-17', name: "Presidents' Day", type: 'public', impact: 'medium' },
    { date: '2025-03-31', name: 'Cesar Chavez Day', type: 'regional', impact: 'low' },
    { date: '2025-05-26', name: 'Memorial Day', type: 'public', impact: 'high' },
    { date: '2025-06-19', name: 'Juneteenth', type: 'public', impact: 'medium' },
    { date: '2025-07-04', name: 'Independence Day', type: 'public', impact: 'high' },
    { date: '2025-09-01', name: 'Labor Day', type: 'public', impact: 'high' },
    { date: '2025-10-13', name: 'Columbus Day', type: 'public', impact: 'low' },
    { date: '2025-11-11', name: 'Veterans Day', type: 'public', impact: 'medium' },
    { date: '2025-11-27', name: 'Thanksgiving Day', type: 'public', impact: 'high' },
    { date: '2025-11-28', name: 'Black Friday', type: 'observance', impact: 'high' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' }
  ],
  UK: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Easter Monday', type: 'public', impact: 'high' },
    { date: '2025-05-05', name: 'Early May Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-05-26', name: 'Spring Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-08-25', name: 'Summer Bank Holiday', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' },
    { date: '2025-12-26', name: 'Boxing Day', type: 'public', impact: 'high' }
  ],
  DE: [
    { date: '2025-01-01', name: 'Neujahr', type: 'public', impact: 'high' },
    { date: '2025-01-06', name: 'Heilige Drei Könige', type: 'regional', impact: 'low' },
    { date: '2025-04-18', name: 'Karfreitag', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Ostermontag', type: 'public', impact: 'high' },
    { date: '2025-05-01', name: 'Tag der Arbeit', type: 'public', impact: 'high' },
    { date: '2025-05-29', name: 'Christi Himmelfahrt', type: 'public', impact: 'medium' },
    { date: '2025-06-09', name: 'Pfingstmontag', type: 'public', impact: 'medium' },
    { date: '2025-10-03', name: 'Tag der Deutschen Einheit', type: 'public', impact: 'high' },
    { date: '2025-12-25', name: '1. Weihnachtstag', type: 'public', impact: 'high' },
    { date: '2025-12-26', name: '2. Weihnachtstag', type: 'public', impact: 'high' }
  ],
  FR: [
    { date: '2025-01-01', name: 'Jour de l\'an', type: 'public', impact: 'high' },
    { date: '2025-04-21', name: 'Lundi de Pâques', type: 'public', impact: 'high' },
    { date: '2025-05-01', name: 'Fête du Travail', type: 'public', impact: 'high' },
    { date: '2025-05-08', name: 'Victoire 1945', type: 'public', impact: 'medium' },
    { date: '2025-05-29', name: 'Ascension', type: 'public', impact: 'medium' },
    { date: '2025-06-09', name: 'Lundi de Pentecôte', type: 'public', impact: 'medium' },
    { date: '2025-07-14', name: 'Fête nationale', type: 'public', impact: 'high' },
    { date: '2025-08-15', name: 'Assomption', type: 'public', impact: 'medium' },
    { date: '2025-11-01', name: 'Toussaint', type: 'public', impact: 'medium' },
    { date: '2025-11-11', name: 'Armistice 1918', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: 'Noël', type: 'public', impact: 'high' }
  ],
  JP: [
    { date: '2025-01-01', name: '元日 (New Year)', type: 'public', impact: 'high' },
    { date: '2025-01-13', name: '成人の日 (Coming of Age Day)', type: 'public', impact: 'medium' },
    { date: '2025-02-11', name: '建国記念の日 (National Foundation Day)', type: 'public', impact: 'medium' },
    { date: '2025-02-23', name: '天皇誕生日 (Emperor\'s Birthday)', type: 'public', impact: 'medium' },
    { date: '2025-03-20', name: '春分の日 (Vernal Equinox)', type: 'public', impact: 'medium' },
    { date: '2025-04-29', name: '昭和の日 (Showa Day)', type: 'public', impact: 'high' },
    { date: '2025-05-03', name: '憲法記念日 (Constitution Day)', type: 'public', impact: 'high' },
    { date: '2025-05-04', name: 'みどりの日 (Greenery Day)', type: 'public', impact: 'high' },
    { date: '2025-05-05', name: 'こどもの日 (Children\'s Day)', type: 'public', impact: 'high' },
    { date: '2025-07-21', name: '海の日 (Marine Day)', type: 'public', impact: 'medium' },
    { date: '2025-08-11', name: '山の日 (Mountain Day)', type: 'public', impact: 'medium' },
    { date: '2025-09-15', name: '敬老の日 (Respect for the Aged Day)', type: 'public', impact: 'medium' },
    { date: '2025-09-23', name: '秋分の日 (Autumnal Equinox)', type: 'public', impact: 'medium' },
    { date: '2025-10-13', name: 'スポーツの日 (Sports Day)', type: 'public', impact: 'medium' },
    { date: '2025-11-03', name: '文化の日 (Culture Day)', type: 'public', impact: 'medium' },
    { date: '2025-11-23', name: '勤労感謝の日 (Labor Thanksgiving)', type: 'public', impact: 'medium' }
  ],
  KR: [
    { date: '2025-01-01', name: '신정 (New Year)', type: 'public', impact: 'high' },
    { date: '2025-01-28', name: '설날 (Lunar New Year)', type: 'public', impact: 'high' },
    { date: '2025-01-29', name: '설날 연휴', type: 'public', impact: 'high' },
    { date: '2025-01-30', name: '설날 연휴', type: 'public', impact: 'high' },
    { date: '2025-03-01', name: '삼일절 (Independence Movement Day)', type: 'public', impact: 'medium' },
    { date: '2025-05-05', name: '어린이날 (Children\'s Day)', type: 'public', impact: 'medium' },
    { date: '2025-06-06', name: '현충일 (Memorial Day)', type: 'public', impact: 'medium' },
    { date: '2025-08-15', name: '광복절 (Liberation Day)', type: 'public', impact: 'medium' },
    { date: '2025-10-03', name: '개천절 (National Foundation Day)', type: 'public', impact: 'medium' },
    { date: '2025-10-09', name: '한글날 (Hangeul Day)', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: '성탄절 (Christmas)', type: 'public', impact: 'high' }
  ],
  SG: [
    { date: '2025-01-01', name: "New Year's Day", type: 'public', impact: 'high' },
    { date: '2025-01-29', name: 'Chinese New Year', type: 'public', impact: 'high' },
    { date: '2025-01-30', name: 'Chinese New Year', type: 'public', impact: 'high' },
    { date: '2025-04-18', name: 'Good Friday', type: 'public', impact: 'medium' },
    { date: '2025-05-01', name: 'Labour Day', type: 'public', impact: 'medium' },
    { date: '2025-05-12', name: 'Vesak Day', type: 'public', impact: 'medium' },
    { date: '2025-08-09', name: 'National Day', type: 'public', impact: 'high' },
    { date: '2025-10-20', name: 'Deepavali', type: 'public', impact: 'medium' },
    { date: '2025-12-25', name: 'Christmas Day', type: 'public', impact: 'high' }
  ]
}

// 节假日对外贸的影响说明
const impactDescriptions = {
  high: '重大影响：政府机构、银行、大部分企业关闭，物流停运',
  medium: '中等影响：部分企业放假，物流可能延迟',
  low: '轻微影响：部分地区或行业放假，整体影响较小'
}

// 辅助函数
const getHolidayTypeName = (type: Holiday['type']): string => {
  const typeNames = {
    public: '法定假日',
    regional: '地区假日',
    observance: '纪念日'
  }
  return typeNames[type] || type
}

const getImpactLevelName = (impact: Holiday['impact']): string => {
  const impactNames = {
    high: '高',
    medium: '中',
    low: '低'
  }
  return impactNames[impact] || impact
}

export default function HolidayQueryPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('US')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  
  const currentYear = 2025
  const countryInfo = countries[selectedCountry]
  const countryHolidays = holidays2025[selectedCountry] || []
  
  // 按月份筛选
  const filteredHolidays = selectedMonth === 'all' 
    ? countryHolidays 
    : countryHolidays.filter(h => {
        const month = new Date(h.date).getMonth() + 1
        return month === parseInt(selectedMonth)
      })
  
  // 获取即将到来的节假日
  const getUpcomingHolidays = () => {
    const today = new Date()
    const upcoming: UpcomingHoliday[] = []
    
    Object.entries(holidays2025).forEach(([country, holidays]) => {
      holidays.forEach(holiday => {
        const holidayDate = new Date(holiday.date)
        const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysUntil > 0 && daysUntil <= 30) {
          upcoming.push({
            ...holiday,
            country: countries[country].name,
            flag: countries[country].flag,
            daysUntil
          })
        }
      })
    })
    
    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 5)
  }
  
  const upcomingHolidays = getUpcomingHolidays()

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              国际节假日查询
            </CardTitle>
            <CardDescription>
              查询全球主要贸易国家的节假日安排，合理规划外贸业务
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="country" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="country">按国家查询</TabsTrigger>
                <TabsTrigger value="upcoming">即将到来</TabsTrigger>
              </TabsList>
              
              <TabsContent value="country" className="space-y-4">
                {/* 查询条件 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">选择国家/地区</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger id="country">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(countries).map(([code, info]) => (
                          <SelectItem key={code} value={code}>
                            <span className="flex items-center gap-2">
                              <span>{info.flag}</span>
                              <span>{info.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="month">月份筛选</Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger id="month">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全年</SelectItem>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}月
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* 国家信息 */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{countryInfo.flag}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{countryInfo.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            时区: {countryInfo.timezone} | 货币: {countryInfo.currency}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {filteredHolidays.length} 个节假日
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 节假日列表 */}
                <div className="space-y-3">
                  {filteredHolidays.map((holiday, index) => {
                    const date = new Date(holiday.date)
                    const weekday = date.toLocaleDateString('zh-CN', { weekday: 'long' })
                    
                    return (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{holiday.name}</h4>
                                <Badge variant={holiday.type === 'public' ? 'default' : 'secondary'}>
                                  {getHolidayTypeName(holiday.type)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <Calendar className="inline h-3 w-3 mr-1" />
                                {date.toLocaleDateString('zh-CN')} ({weekday})
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={
                                    holiday.impact === 'high' ? 'destructive' : 
                                    holiday.impact === 'medium' ? 'default' : 'secondary'
                                  }
                                  className="text-xs"
                                >
                                  {getImpactLevelName(holiday.impact)}影响
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {impactDescriptions[holiday.impact]}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    未来30天内各国即将到来的重要节假日，请提前安排订单和物流
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  {upcomingHolidays.map((holiday, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{holiday.flag}</span>
                            <div>
                              <h4 className="font-semibold">{holiday.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {holiday.country} • {new Date(holiday.date).toLocaleDateString('zh-CN')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-1">
                              {holiday.daysUntil}天后
                            </Badge>
                            <Badge 
                              variant={
                                holiday.impact === 'high' ? 'destructive' : 
                                holiday.impact === 'medium' ? 'default' : 'secondary'
                              }
                              className="text-xs block"
                            >
                              {getImpactLevelName(holiday.impact)}影响
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* 外贸提醒 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">📧 邮件回复</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 节前1-2天回复会变慢</li>
                    <li>• 长假期间基本无回复</li>
                    <li>• 节后2-3天逐步恢复</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">🚢 物流影响</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 海运：节前爆仓涨价</li>
                    <li>• 空运：假期停飞减班</li>
                    <li>• 清关：延迟3-7天</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* 使用提示 */}
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>外贸提示：</strong>重要订单请在客户节假日前至少一周确认，
                避免因假期影响订单处理和货物运输。圣诞节、新年等重大节日需特别注意。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
