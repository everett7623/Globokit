// 名称: 国际节假日查询
// 描述: 查询全球主要贸易国家的节假日安排，便于外贸业务安排
// 路径: seedtool/app/tools/holiday-query/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-09

'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Globe, AlertCircle, Info, Loader2, RefreshCw } from 'lucide-react'
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
} from '@/lib/tools/holiday-query'

export default function HolidayQueryPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('US')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const currentYear = new Date().getFullYear()

  // 当选择国家或月份时获取节假日
  useEffect(() => {
    fetchHolidays()
  }, [selectedCountry, selectedMonth])

  const fetchHolidays = () => {
    try {
      setLoading(true)
      setError('')

      let allHolidays = getCountryHolidays(selectedCountry)

      if (selectedMonth !== 'all') {
        const month = parseInt(selectedMonth, 10)
        allHolidays = filterHolidaysByMonth(allHolidays, month)
      }

      setHolidays(allHolidays)
    } catch (err) {
      setError('无法加载节假日数据')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const selectedCountryInfo = countries[selectedCountry]

  // 按月份筛选（如果选择了月份，API 已经返回筛选后的数据）
  const filteredHolidays = holidays

  // 获取即将到来的节假日（简化版，只显示当前国家的）
  const upcomingHolidays = getUpcomingHolidays()
    .filter(holiday => holiday.country === selectedCountryInfo.name)
    .slice(0, 5)

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  国际节假日查询
                </CardTitle>
                <CardDescription>
                  查询全球 200+ 国家的节假日安排，合理规划外贸业务
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <Tabs defaultValue="country" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="country">按国家查询</TabsTrigger>
                  <TabsTrigger value="calendar">年历视图</TabsTrigger>
                </TabsList>

                <TabsContent value="country" className="space-y-4">
                  {/* 查询条件 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="country">选择国家/地区（支持 200+ 国家）</Label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="选择国家" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* 热门国家 */}
                          <SelectItem value="divider-popular" disabled>
                            <span className="font-semibold">热门国家</span>
                          </SelectItem>
                          {['US', 'UK', 'DE', 'JP', 'CN', 'AU', 'CA', 'FR'].map(code => {
                            const country = countries[code]
                            if (!country) return null
                            return (
                              <SelectItem key={code} value={code}>
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.name}</span>
                                </span>
                              </SelectItem>
                            )
                          })}

                          <SelectItem value="divider-all" disabled>
                            <span className="font-semibold">所有国家</span>
                          </SelectItem>
                          {Object.entries(countries).map(([code, country]) => (
                            <SelectItem key={code} value={code}>
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.name}</span>
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
                              {i + 1} 月
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* 国家信息 */}
                  {selectedCountryInfo && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{selectedCountryInfo.flag}</span>
                            <div>
                              <h3 className="font-semibold text-lg">{selectedCountryInfo.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                时区: {selectedCountryInfo.timezone} | 货币: {selectedCountryInfo.currency}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {filteredHolidays.length} 个节假日
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={fetchHolidays}
                              disabled={loading}
                            >
                              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* 节假日列表 */}
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="ml-2">加载节假日数据...</span>
                    </div>
                  ) : (
                    <>
                      {/* 即将到来的节假日提醒 */}
                      {upcomingHolidays.length > 0 && (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            <strong>提醒：</strong>
                            {selectedCountryInfo?.name} 在未来 30 天内有 {upcomingHolidays.length} 个节假日，
                            最近的是 {upcomingHolidays[0].name}（{upcomingHolidays[0].daysUntil} 天后）
                          </AlertDescription>
                        </Alert>
                      )}

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
                                      {holiday.observed && holiday.observed !== holiday.date && (
                                        <span className="ml-2">
                                          实际放假: {new Date(holiday.observed).toLocaleDateString('zh-CN')}
                                        </span>
                                      )}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant={
                                          holiday.impact === 'high' ? 'destructive' :
                                            holiday.impact === 'medium' ? 'default' : 'secondary'
                                        }
                                        className="text-xs"
                                      >
                                        {getImpactLevelName(holiday.impact)} 影响
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
                    </>
                  )}
                </TabsContent>

                <TabsContent value="calendar" className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {selectedCountryInfo?.name} {currentYear} 年节假日分布图
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'].map((month, index) => {
                      const monthHolidays = holidays.filter(h => {
                        const holidayMonth = new Date(h.date).getMonth()
                        return holidayMonth === index
                      })

                      return (
                        <Card key={month}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{month}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {monthHolidays.length > 0 ? (
                              <div className="space-y-1">
                                {monthHolidays.map((h, i) => (
                                  <div key={i} className="text-xs">
                                    <span className="font-medium">{new Date(h.date).getDate()} 日</span>
                                    <p className="text-muted-foreground truncate">{h.name}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground">无节假日</p>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/* 外贸提醒 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">📧 邮件回复</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 节前 1 - 2 天回复会变慢</li>
                    <li>• 长假期间基本无回复</li>
                    <li>• 节后 2 - 3 天逐步恢复</li>
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
                    <li>• 清关：延迟 3 - 7 天</li>
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
