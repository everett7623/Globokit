// 名称: 国际节假日查询
// 描述: 查询全球主要贸易国家的节假日安排，便于外贸业务安排
// 路径: Globokit/app/tools/holiday-query/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Globe, AlertCircle, Info, MapPin, TrendingUp, Clock, Plane, DollarSign, Mail } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  countries, 
  internationalHolidays,
  religiousHolidays2025,
  getCountryHolidays, 
  getUpcomingHolidays,
  filterHolidaysByMonth,
  getHolidayTypeName,
  getImpactLevelName,
  impactDescriptions,
  getCountriesByRegion,
  generateHolidayData
} from '@/lib/tools/holiday-query'

export default function HolidayQueryPage() {
  const currentYear = new Date().getFullYear()
  const [selectedCountry, setSelectedCountry] = useState<string>('US')
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString())
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  
  const countryInfo = countries[selectedCountry]
  const countryHolidays = getCountryHolidays(selectedCountry, parseInt(selectedYear))
  
  // 按月份筛选
  const filteredHolidays = selectedMonth === 'all' 
    ? countryHolidays 
    : filterHolidaysByMonth(countryHolidays, parseInt(selectedMonth))
  
  // 获取即将到来的节假日
  const upcomingHolidays = getUpcomingHolidays(30)
  
  // 按地区分组的国家
  const countriesByRegion = getCountriesByRegion()
  
  // 获取筛选后的国家列表
  const getFilteredCountries = () => {
    if (selectedRegion === 'all') {
      return Object.entries(countries)
    }
    return Object.entries(countries).filter(([_, country]) => country.region === selectedRegion)
  }

  // 热门外贸国家
  const hotCountries = ['US', 'UK', 'DE', 'JP', 'FR', 'IN', 'AU', 'CA', 'KR', 'BR', 'AE', 'SG']

  // 统计数据
  const totalCountries = Object.keys(countries).length
  const totalHolidaysThisYear = Object.keys(countries).reduce((sum, code) => {
    return sum + getCountryHolidays(code, currentYear).length
  }, 0)
  const upcomingCount = upcomingHolidays.filter(h => h.daysUntil <= 7).length

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">国际节假日查询</h1>
        <p className="text-muted-foreground">
          查询全球100+主要贸易国家的节假日安排，合理规划外贸业务
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              覆盖国家
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCountries}+</div>
            <p className="text-xs text-muted-foreground">个国家/地区</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              年度节假日
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHolidaysThisYear}</div>
            <p className="text-xs text-muted-foreground">{currentYear}年总计</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              即将到来
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground">7天内节假日</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              影响分级
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">级影响评估</p>
          </CardContent>
        </Card>
      </div>

      {/* 主功能区 */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="country" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="country">按国家查询</TabsTrigger>
              <TabsTrigger value="upcoming">即将到来</TabsTrigger>
              <TabsTrigger value="international">国际节日</TabsTrigger>
              <TabsTrigger value="religious">宗教节日</TabsTrigger>
              <TabsTrigger value="calendar">年历视图</TabsTrigger>
            </TabsList>
            
            <TabsContent value="country" className="space-y-4">
              {/* 查询条件 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="region">地区筛选</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger id="region">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部地区</SelectItem>
                      <SelectItem value="北美">北美</SelectItem>
                      <SelectItem value="西欧">西欧</SelectItem>
                      <SelectItem value="北欧">北欧</SelectItem>
                      <SelectItem value="南欧">南欧</SelectItem>
                      <SelectItem value="东欧">东欧</SelectItem>
                      <SelectItem value="独联体">独联体</SelectItem>
                      <SelectItem value="东亚">东亚</SelectItem>
                      <SelectItem value="东南亚">东南亚</SelectItem>
                      <SelectItem value="南亚">南亚</SelectItem>
                      <SelectItem value="中东">中东</SelectItem>
                      <SelectItem value="大洋洲">大洋洲</SelectItem>
                      <SelectItem value="南美">南美</SelectItem>
                      <SelectItem value="中美洲">中美洲</SelectItem>
                      <SelectItem value="加勒比">加勒比</SelectItem>
                      <SelectItem value="非洲">非洲</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="country">选择国家/地区</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger id="country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {/* 热门国家/地区 */}
                      <SelectItem value="divider-hot" disabled>
                        <span className="flex items-center gap-2 font-semibold text-orange-600">
                          <TrendingUp className="h-3.5 w-3.5" />
                          热门国家
                        </span>
                      </SelectItem>
                      {hotCountries.map(code => {
                        const country = countries[code]
                        if (!country) return null
                        return (
                          <SelectItem key={code} value={code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                              <Badge variant="outline" className="text-xs ml-auto">热门</Badge>
                            </span>
                          </SelectItem>
                        )
                      })}
                      
                      <SelectItem value="divider-all" disabled>
                        <span className="font-semibold">所有国家/地区</span>
                      </SelectItem>
                      {getFilteredCountries().map(([code, country]) => (
                        <SelectItem key={code} value={code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                            <span className="text-xs text-muted-foreground ml-auto">{country.region}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="year">年份</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025年</SelectItem>
                      <SelectItem value="2026">2026年（预测）</SelectItem>
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
              {countryInfo && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{countryInfo.flag}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{countryInfo.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            <MapPin className="inline h-3 w-3 mr-1" />
                            {countryInfo.region} | 时区: {countryInfo.timezone} | 货币: {countryInfo.currency}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {filteredHolidays.length} 个节假日
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* 年份提示 */}
              {selectedYear === '2026' && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    2026年节假日为预测数据，实际日期以各国官方公布为准
                  </AlertDescription>
                </Alert>
              )}
              
              {/* 节假日列表 */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredHolidays.length > 0 ? (
                  filteredHolidays.map((holiday, index) => {
                    const date = new Date(holiday.date)
                    const weekday = date.toLocaleDateString('zh-CN', { weekday: 'long' })
                    
                    return (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">
                                  {holiday.name}
                                  {(holiday.nameCN || holiday.localName) && (
                                    <span className="text-sm text-muted-foreground ml-2">
                                      ({holiday.nameCN || holiday.localName})
                                    </span>
                                  )}
                                </h4>
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
                  })
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      该国家在{selectedYear}年{selectedMonth !== 'all' ? `${selectedMonth}月` : ''}暂无节假日数据
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              <Alert className="bg-orange-50 border-orange-200">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  未来30天内全球即将到来的重要节假日，请提前安排订单和物流
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {upcomingHolidays.slice(0, 20).map((holiday, index) => (
                  <Card key={index} className={holiday.daysUntil <= 7 ? 'border-orange-200' : ''}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{holiday.flag}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {holiday.name}
                              {(holiday.nameCN || holiday.localName) && (
                                <span className="text-sm text-muted-foreground ml-2">
                                  ({holiday.nameCN || holiday.localName})
                                </span>
                              )}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {holiday.country} • {new Date(holiday.date).toLocaleDateString('zh-CN')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge 
                            variant={holiday.daysUntil <= 7 ? "destructive" : "outline"} 
                            className="text-sm"
                          >
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
            
            <TabsContent value="international" className="space-y-4">
              <Alert>
                <Globe className="h-4 w-4" />
                <AlertDescription>
                  全球性节日和纪念日，影响多个国家的商业活动
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {internationalHolidays.map((holiday, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        <span>{holiday.name}</span>
                        <Badge variant={holiday.impact === 'high' ? 'destructive' : holiday.impact === 'medium' ? 'default' : 'secondary'}>
                          {getImpactLevelName(holiday.impact)}影响
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {holiday.nameCN || holiday.localName} • {holiday.date}
                      </p>
                      <p className="text-xs">{holiday.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="religious" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  主要宗教节日对相关国家和地区的商业活动有重要影响。
                  注意：伊斯兰历和部分宗教历法日期可能有1-2天偏差。
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {/* 伊斯兰教节日 */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-600" />
                    伊斯兰教节日
                    <Badge variant="outline">影响中东、东南亚、南亚、北非</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {religiousHolidays2025
                      .filter(h => h.description?.includes('伊斯兰教'))
                      .map((holiday, index) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{holiday.name}</h4>
                                <Badge variant={holiday.impact === 'high' ? 'destructive' : 'default'}>
                                  {getImpactLevelName(holiday.impact)}影响
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {holiday.nameCN || holiday.localName} • {new Date(holiday.date).toLocaleDateString('zh-CN')}
                              </p>
                              <p className="text-xs">{holiday.description}</p>
                              {holiday.name.includes('Ramadan') && (
                                <Alert className="mt-2">
                                  <AlertCircle className="h-3 w-3" />
                                  <AlertDescription className="text-xs">
                                    斋月期间，穆斯林国家工作时间缩短，商务活动减少
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
                
                {/* 基督教节日 */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    基督教节日
                    <Badge variant="outline">影响欧美、拉美、非洲</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {religiousHolidays2025
                      .filter(h => h.description?.includes('基督教'))
                      .map((holiday, index) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{holiday.name}</h4>
                                <Badge variant={holiday.impact === 'high' ? 'destructive' : 'default'}>
                                  {getImpactLevelName(holiday.impact)}影响
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {holiday.nameCN || holiday.localName} • {new Date(holiday.date).toLocaleDateString('zh-CN')}
                              </p>
                              <p className="text-xs">{holiday.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
                
                {/* 印度教节日 */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-orange-600" />
                    印度教节日
                    <Badge variant="outline">影响印度、尼泊尔、斯里兰卡</Badge>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {religiousHolidays2025
                      .filter(h => h.description?.includes('印度教'))
                      .map((holiday, index) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{holiday.name}</h4>
                                <Badge variant={holiday.impact === 'high' ? 'destructive' : 'default'}>
                                  {getImpactLevelName(holiday.impact)}影响
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {holiday.nameCN || holiday.localName} • {new Date(holiday.date).toLocaleDateString('zh-CN')}
                              </p>
                              <p className="text-xs">{holiday.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
                
                {/* 其他宗教节日 */}
                <div>
                  <h3 className="font-semibold mb-3">其他宗教节日</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {religiousHolidays2025
                      .filter(h => 
                        !h.description?.includes('伊斯兰教') && 
                        !h.description?.includes('基督教') && 
                        !h.description?.includes('印度教')
                      )
                      .map((holiday, index) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{holiday.name}</h4>
                                <Badge variant={holiday.impact === 'high' ? 'destructive' : 'default'}>
                                  {getImpactLevelName(holiday.impact)}影响
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {holiday.nameCN || holiday.localName} • {new Date(holiday.date).toLocaleDateString('zh-CN')}
                              </p>
                              <p className="text-xs">{holiday.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="calendar" className="space-y-4">
              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  {countryInfo?.name || '国家'} {selectedYear}年节假日分布图，点击月份查看详情
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'].map((month, index) => {
                  const monthHolidays = filterHolidaysByMonth(countryHolidays, index + 1)
                  const hasHighImpact = monthHolidays.some(h => h.impact === 'high')
                  
                  return (
                    <Card 
                      key={month} 
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        monthHolidays.length > 0 ? 'border-primary' : ''
                      } ${hasHighImpact ? 'border-red-500' : ''}`}
                      onClick={() => setSelectedMonth((index + 1).toString())}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center justify-between">
                          {month}
                          {monthHolidays.length > 0 && (
                            <Badge 
                              variant={hasHighImpact ? "destructive" : "outline"} 
                              className="text-xs"
                            >
                              {monthHolidays.length}
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {monthHolidays.length > 0 ? (
                          <div className="space-y-1">
                            {monthHolidays.slice(0, 3).map((h, i) => (
                              <div key={i} className="text-xs">
                                <span className="font-medium">{new Date(h.date).getDate()}日</span>
                                <p className="text-muted-foreground truncate">{h.name}</p>
                              </div>
                            ))}
                            {monthHolidays.length > 3 && (
                              <p className="text-xs text-muted-foreground">
                                +{monthHolidays.length - 3} 更多...
                              </p>
                            )}
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
        </CardContent>
      </Card>
      
      {/* 外贸影响提示 */}
      <div className="grid gap-4 mt-6 md:grid-cols-4">
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4" />
              邮件回复
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>• 节前1-2天回复变慢</p>
            <p>• 长假期间基本无回复</p>
            <p>• 节后2-3天逐步恢复</p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Plane className="h-4 w-4" />
              物流影响
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>• 海运：节前爆仓涨价</p>
            <p>• 空运：假期停飞减班</p>
            <p>• 清关：延迟3-7天</p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              付款提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>• 银行假期暂停转账</p>
            <p>• 节前催收账款</p>
            <p>• 预留充足时间</p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              重要提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>• 圣诞节：欧美停工2周</p>
            <p>• 斋月：中东效率降低</p>
            <p>• 春节：东亚停工2周</p>
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card className="mt-4 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">功能特点</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 覆盖全球100+主要贸易国家和地区</li>
                <li>• 包含公共假期、银行假期、宗教节日</li>
                <li>• 提供节假日对商业活动的影响评级</li>
                <li>• 支持按地区、国家、月份筛选查看</li>
                <li>• 实时提醒即将到来的重要节假日</li>
                <li>• 年历视图直观展示节假日分布</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">影响等级说明</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">高影响</Badge>
                  <span className="text-muted-foreground">大部分企业停工，银行关闭</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">中影响</Badge>
                  <span className="text-muted-foreground">部分企业放假，效率降低</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">低影响</Badge>
                  <span className="text-muted-foreground">正常工作，个别行业受影响</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
