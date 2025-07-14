// 名称: 国际节假日查询
// 描述: 查询全球主要贸易国家的节假日安排，便于外贸业务安排
// 路径: seedtool/app/tools/holiday-query/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-14

'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Globe } from 'lucide-react'
import { getHolidaysByCountry, getCountryList, Holiday } from '@/lib/tools/holiday-query'

export default function HolidayQueryPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  
  const countries = getCountryList()
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i - 2)
  
  const holidays = useMemo(() => {
    if (!selectedCountry) return []
    return getHolidaysByCountry(selectedCountry, selectedYear)
  }, [selectedCountry, selectedYear])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    }).format(date)
  }

  const getDaysFromNow = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const holiday = new Date(date)
    holiday.setHours(0, 0, 0, 0)
    const diffTime = holiday.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getHolidayStatus = (date: Date) => {
    const daysFromNow = getDaysFromNow(date)
    if (daysFromNow < 0) return { text: '已过', color: 'secondary' }
    if (daysFromNow === 0) return { text: '今天', color: 'destructive' }
    if (daysFromNow <= 7) return { text: `${daysFromNow}天后`, color: 'destructive' }
    if (daysFromNow <= 30) return { text: `${daysFromNow}天后`, color: 'warning' }
    return { text: `${daysFromNow}天后`, color: 'default' }
  }

  // 热门外贸国家（2行显示）
  const popularCountries = [
    { code: 'US', name: '美国' },
    { code: 'CN', name: '中国' },
    { code: 'JP', name: '日本' },
    { code: 'DE', name: '德国' },
    { code: 'GB', name: '英国' },
    { code: 'FR', name: '法国' },
    { code: 'IT', name: '意大利' },
    { code: 'CA', name: '加拿大' },
    { code: 'AU', name: '澳大利亚' },
    { code: 'KR', name: '韩国' },
    { code: 'BR', name: '巴西' },
    { code: 'IN', name: '印度' }
  ]

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            国际节假日查询
          </CardTitle>
          <CardDescription>
            查询全球主要贸易国家的节假日安排，合理规划外贸业务时间
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 热门国家快速选择 */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">热门外贸国家：</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {popularCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    selectedCountry === country.code
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-accent border-border'
                  }`}
                >
                  {country.name}
                </button>
              ))}
            </div>
          </div>

          {/* 选择器区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                选择国家/地区
              </label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择国家或地区" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部国家</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        {country.name}
                        {country.nameEn && (
                          <span className="text-muted-foreground text-xs">
                            ({country.nameEn})
                          </span>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4" />
                选择年份
              </label>
              <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 节假日列表 */}
          {selectedCountry && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {countries.find(c => c.code === selectedCountry)?.name} {selectedYear}年节假日
                </h3>
                <Badge variant="outline">
                  共 {holidays.length} 个节假日
                </Badge>
              </div>

              {holidays.length > 0 ? (
                <div className="grid gap-3">
                  {holidays.map((holiday, index) => {
                    const status = getHolidayStatus(holiday.date)
                    return (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{holiday.name}</h4>
                                {holiday.nameEn && (
                                  <span className="text-sm text-muted-foreground">
                                    {holiday.nameEn}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(holiday.date)}
                              </p>
                              {holiday.description && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  {holiday.description}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge variant={status.color as any}>
                                {status.text}
                              </Badge>
                              {holiday.type && (
                                <Badge variant="outline" className="text-xs">
                                  {holiday.type}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    暂无节假日数据
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* 提示信息 */}
          {!selectedCountry && (
            <Card className="bg-muted/50">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  请选择国家查看对应的节假日安排
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  💡 提示：了解客户所在国家的节假日，有助于合理安排发货和沟通时间
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
