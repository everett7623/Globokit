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
import { 
  countries, 
  getCountryHolidays, 
  getUpcomingHolidays, 
  filterHolidaysByMonth, 
  getHolidayTypeName, 
  getImpactLevelName, 
  impactDescriptions 
} from '../lib/tools/holiday-query'

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

export default function HolidayQueryPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('US')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const currentYear = new Date().getFullYear()
  
  const countryInfo = countries[selectedCountry]
  const countryHolidays = getCountryHolidays(selectedCountry, currentYear)
  
  // 按月份筛选
  const filteredHolidays = selectedMonth === 'all' 
    ? countryHolidays 
    : filterHolidaysByMonth(countryHolidays, parseInt(selectedMonth))
  
  // 获取即将到来的节假日
  const upcomingHolidays = getUpcomingHolidays(30, currentYear)

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
