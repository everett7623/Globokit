// 名称: 全球国家信息查询
// 描述: 查询全球国家和地区的详细信息，支持搜索和筛选
// 路径: seedtool/app/tools/global-country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-28

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CopyButton } from '@/components/tools/copy-button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  COUNTRY_DATA, 
  getFlagEmoji, 
  getTimeDifference, 
  getContinents,
  formatPopulation,
  formatArea,
  type CountryInfo
} from '@/lib/tools/global-country-info'
import { 
  Search, Globe, Star, StarOff, Download, Filter, ChevronUp, ChevronDown,
  Phone, Globe2, Clock, DollarSign, MapPin, Hash, Info, X,
  Building2, Users, Languages, Briefcase, Calendar, Ship, Zap,
  Car, Plug, Eye
} from 'lucide-react'

type SortField = 'name' | 'continent' | 'timezone' | 'none'
type SortOrder = 'asc' | 'desc'

export default function GlobalCountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [continentFilter, setContinentFilter] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>('none')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null)

  useEffect(() => {
    const savedFavorites = localStorage.getItem('countryFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = COUNTRY_DATA.filter(country => {
      const term = searchTerm.toLowerCase()
      const matchesSearch =
        country.name_cn.toLowerCase().includes(term) ||
        country.name_en.toLowerCase().includes(term) ||
        country.iso2.toLowerCase().includes(term) ||
        country.iso3.toLowerCase().includes(term) ||
        country.dial_code.includes(term) ||
        country.capital_cn.toLowerCase().includes(term) ||
        country.capital_en.toLowerCase().includes(term)
      
      const matchesContinent = continentFilter === 'all' || country.continent_cn === continentFilter
      const matchesFavorites = !showOnlyFavorites || favorites.includes(country.iso2)
      
      return matchesSearch && matchesContinent && matchesFavorites
    })

    // 排序逻辑
    filtered.sort((a, b) => {
      // 收藏始终优先
      const aIsFav = favorites.includes(a.iso2)
      const bIsFav = favorites.includes(b.iso2)
      if (aIsFav && !bIsFav) return -1
      if (!aIsFav && bIsFav) return 1

      // 其他排序
      if (sortField === 'none') return 0
      
      let comparison = 0
      switch (sortField) {
        case 'name':
          comparison = a.name_cn.localeCompare(b.name_cn)
          break
        case 'continent':
          comparison = a.continent_cn.localeCompare(b.continent_cn)
          break
        case 'timezone':
          comparison = getTimeDifference(a.timezone) - getTimeDifference(b.timezone)
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [searchTerm, continentFilter, favorites, sortField, sortOrder, showOnlyFavorites])

  const toggleFavorite = (iso2: string) => {
    const newFavorites = favorites.includes(iso2) 
      ? favorites.filter(f => f !== iso2) 
      : [...favorites, iso2]
    setFavorites(newFavorites)
    localStorage.setItem('countryFavorites', JSON.stringify(newFavorites))
  }

  const toggleRowExpansion = (iso2: string) => {
    setExpandedRows(prev => 
      prev.includes(iso2) 
        ? prev.filter(id => id !== iso2)
        : [...prev, iso2]
    )
  }

  const exportData = () => {
    const headers = [
      '国家', 'Country', 'ISO2', 'ISO3', '区号', '首都', '大洲', 
      '时区', '货币', '官方语言', '人口', '面积(km²)', '主要宗教',
      '驱车方向', '电源插头', '电压', '工作时间', '主要港口'
    ]
    const rows = filteredAndSortedCountries.map(country => [
      country.name_cn,
      country.name_en,
      country.iso2,
      country.iso3,
      country.dial_code,
      country.capital_cn,
      country.continent_cn,
      country.timezone,
      `${country.currency_name_cn} (${country.currency_code})`,
      country.language_cn.join(', '),
      country.population,
      country.area_km2,
      country.religion.join(', '),
      country.driving_side === 'left' ? '左侧' : '右侧',
      country.power_plug,
      country.voltage,
      country.business_hours || '',
      country.major_ports?.join(', ') || ''
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `country-info-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-3 w-3" /> : 
      <ChevronDown className="h-3 w-3" />
  }

  const CountryDetailModal = ({ country, onClose }: { country: CountryInfo, onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
          <CardHeader className="sticky top-0 bg-background z-10 border-b">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{getFlagEmoji(country.iso2)}</span>
                <div>
                  <CardTitle className="text-2xl">{country.name_cn}</CardTitle>
                  <CardDescription className="text-lg">{country.name_en}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(country.iso2)}
                >
                  {favorites.includes(country.iso2) ? 
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" /> : 
                    <StarOff className="h-5 w-5" />
                  }
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">基础信息</TabsTrigger>
                <TabsTrigger value="communication">通讯信息</TabsTrigger>
                <TabsTrigger value="culture">文化信息</TabsTrigger>
                <TabsTrigger value="business">商务信息</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>首都</span>
                      </div>
                      <div className="font-medium">
                        {country.capital_cn} ({country.capital_en})
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe2 className="h-4 w-4" />
                        <span>大洲</span>
                      </div>
                      <Badge>{country.continent_cn}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>人口</span>
                      </div>
                      <div className="font-medium">{formatPopulation(country.population)}</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>面积</span>
                      </div>
                      <div className="font-medium">{formatArea(country.area_km2)}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Car className="h-4 w-4" />
                        <span>驾驶方向</span>
                      </div>
                      <div className="font-medium">
                        {country.driving_side === 'left' ? '左侧行驶' : '右侧行驶'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Plug className="h-4 w-4" />
                        <span>电源标准</span>
                      </div>
                      <div className="font-medium">
                        {country.voltage} / {country.power_plug}型
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Info className="h-4 w-4" />
                        <span>宗教信仰</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {country.religion.map((rel, idx) => (
                          <Badge key={idx} variant="secondary">{rel}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="communication" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>国际电话区号</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-mono font-medium">{country.dial_code}</span>
                      <CopyButton text={country.dial_code} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Hash className="h-5 w-5 text-muted-foreground" />
                      <span>国家代码</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium">{country.iso2} / {country.iso3}</span>
                      <CopyButton text={`${country.iso2} / ${country.iso3}`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <span>顶级域名</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium">{country.tld}</span>
                      <CopyButton text={country.tld} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>时区 / 时差</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{country.timezone}</div>
                      <div className="text-sm text-muted-foreground">
                        UTC{getTimeDifference(country.timezone) >= 0 ? '+' : ''}{getTimeDifference(country.timezone)} 
                        （相对本地）
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="culture" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">货币信息</span>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">货币名称</span>
                        <span>{country.currency_name_cn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">货币代码</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{country.currency_code}</span>
                          <CopyButton text={country.currency_code} className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">货币符号</span>
                        <span className="text-xl">{country.currency_symbol}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Languages className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">语言信息</span>
                    </div>
                    <div className="space-y-2">
                      {country.language_cn.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{lang}</span>
                          <span className="text-sm text-muted-foreground">{country.language_en[index]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="business" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  {country.business_hours && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">工作时间</span>
                      </div>
                      <p>{country.business_hours}</p>
                    </div>
                  )}
                  
                  {country.major_ports && country.major_ports.length > 0 && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Ship className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">主要港口</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {country.major_ports.map((port, index) => (
                          <Badge key={index} variant="outline">{port}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {country.business_etiquette && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">商务礼仪</span>
                      </div>
                      <ul className="space-y-2">
                        {country.business_etiquette.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {country.major_holidays && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">重要节假日</span>
                      </div>
                      <div className="grid gap-2">
                        {country.major_holidays.map((holiday, index) => (
                          <div key={index} className="text-sm">{holiday}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {country.trade_notes && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">贸易注意事项</span>
                      </div>
                      <ul className="space-y-2">
                        {country.trade_notes.map((note, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-sm">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1>
        <p className="text-muted-foreground">快速查找世界各国的区号、代码、时差等关键信息，包含外贸相关的商务礼仪和贸易注意事项</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>搜索和筛选</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="搜索国家、代码、区号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={continentFilter} onValueChange={setContinentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="筛选大洲" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有大洲</SelectItem>
                {getContinents().map(continent => (
                  <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={showOnlyFavorites ? "default" : "outline"}
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className="w-full"
            >
              <Star className={`h-4 w-4 mr-2 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              {showOnlyFavorites ? '显示收藏' : '所有国家'}
            </Button>

            <Button variant="outline" onClick={exportData} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              导出数据
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>共找到 {filteredAndSortedCountries.length} 个国家/地区</span>
            {favorites.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                已收藏 {favorites.length} 个
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium hover:bg-transparent"
                      onClick={() => handleSort('name')}
                    >
                      国家/地区
                      <SortIcon field="name" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium hover:bg-transparent"
                      onClick={() => handleSort('continent')}
                    >
                      大洲
                      <SortIcon field="continent" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium">国际区号</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">国家代码</th>
                  <th className="text-left p-4 font-medium hidden xl:table-cell">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium hover:bg-transparent"
                      onClick={() => handleSort('timezone')}
                    >
                      时差
                      <SortIcon field="timezone" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-medium hidden xl:table-cell">货币</th>
                  <th className="text-center p-4 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCountries.map((country) => {
                  const timeDiff = getTimeDifference(country.timezone)
                  const timeDiffDisplay = `UTC${timeDiff >= 0 ? '+' : ''}${timeDiff}`
                  const isExpanded = expandedRows.includes(country.iso2)
                  const isFavorite = favorites.includes(country.iso2)

                  return (
                    <>
                      <tr 
                        key={country.iso2} 
                        className={`border-b transition-colors hover:bg-muted/50 ${isFavorite ? 'bg-yellow-50/50 dark:bg-yellow-900/10' : ''}`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getFlagEmoji(country.iso2)}</span>
                            <div>
                              <div className="font-medium">{country.name_cn}</div>
                              <div className="text-sm text-muted-foreground">{country.name_en}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <Badge variant="outline">{country.continent_cn}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono">{country.dial_code}</span>
                            <CopyButton text={country.dial_code} className="h-6 w-6" />
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{country.iso2} / {country.iso3}</span>
                            <CopyButton text={`${country.iso2} / ${country.iso3}`} className="h-6 w-6" />
                          </div>
                        </td>
                        <td className="p-4 hidden xl:table-cell">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{timeDiffDisplay}</span>
                          </div>
                        </td>
                        <td className="p-4 hidden xl:table-cell">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{country.currency_symbol}</span>
                            <span className="text-sm">{country.currency_code}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleFavorite(country.iso2)}
                              title="收藏"
                            >
                              {isFavorite ? 
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : 
                                <StarOff className="h-4 w-4" />
                              }
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setSelectedCountry(country)}
                              title="查看详情"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 lg:hidden"
                              onClick={() => toggleRowExpansion(country.iso2)}
                              title="展开"
                            >
                              {isExpanded ? 
                                <ChevronUp className="h-4 w-4" /> : 
                                <ChevronDown className="h-4 w-4" />
                              }
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="lg:hidden">
                          <td colSpan={7} className="p-4 bg-muted/30">
                            <div className="grid gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Globe2 className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">大洲:</span>
                                <span>{country.continent_cn}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">首都:</span>
                                <span>{country.capital_cn} ({country.capital_en})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">国家代码:</span>
                                <span className="font-mono">{country.iso2} / {country.iso3}</span>
                                <CopyButton text={`${country.iso2} / ${country.iso3}`} className="h-6 w-6" />
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">时差:</span>
                                <span className="font-mono">{timeDiffDisplay}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">货币:</span>
                                <span>{country.currency_name_cn} ({country.currency_symbol} {country.currency_code})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">域名:</span>
                                <span className="font-mono">{country.tld}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Languages className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">语言:</span>
                                <span>{country.language_cn.join(', ')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">人口:</span>
                                <span>{formatPopulation(country.population)}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
              </tbody>
            </table>

            {filteredAndSortedCountries.length === 0 && (
              <div className="text-center py-16">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">未找到匹配的国家信息</p>
                <p className="text-sm text-muted-foreground mt-1">请尝试调整搜索条件</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4" />
            使用提示
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击<Eye className="h-4 w-4 inline mx-1" />查看按钮可查看国家的详细信息，包括商务礼仪、贸易注意事项等</p>
          <p>• 点击表头可对国家名称、大洲和时差进行排序</p>
          <p>• 收藏的国家会优先显示在列表顶部，并有黄色背景标识</p>
          <p>• 支持导出当前筛选结果为CSV文件，包含所有详细信息</p>
          <p>• 时差显示为相对于您当前设备时区的小时差</p>
        </CardContent>
      </Card>

      {selectedCountry && (
        <CountryDetailModal 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </>
  )
}
