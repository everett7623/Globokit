// 名称: 全球国家信息查询
// 描述: 查询全球国家和地区的详细信息，支持搜索和筛选
// 路径: seedtool/app/tools/global-country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-25

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
  getCurrencies,
  getLanguages,
  formatPopulation,
  formatArea
} from '@/lib/tools/global-country-info'
import { 
  Search, Globe, Star, StarOff, Download, Filter, ChevronUp, ChevronDown,
  Phone, Globe2, Clock, DollarSign, MapPin, Hash, Users, Square,
  Languages, Zap, Calendar, Ship, Briefcase, Info, Car, Plug, X
} from 'lucide-react'

type SortField = 'name' | 'continent' | 'timezone' | 'population' | 'area' | 'none'
type SortOrder = 'asc' | 'desc'
type ViewMode = 'table' | 'detail'

export default function GlobalCountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [continentFilter, setContinentFilter] = useState('all')
  const [languageFilter, setLanguageFilter] = useState('all')
  const [currencyFilter, setCurrencyFilter] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>('none')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const currencies = useMemo(() => getCurrencies(), [])
  const languages = useMemo(() => getLanguages(), [])

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
        country.capital_en.toLowerCase().includes(term) ||
        country.currency_code.toLowerCase().includes(term) ||
        country.language_cn.some(lang => lang.toLowerCase().includes(term))
      
      const matchesContinent = continentFilter === 'all' || country.continent_cn === continentFilter
      const matchesLanguage = languageFilter === 'all' || country.language_cn.includes(languageFilter)
      const matchesCurrency = currencyFilter === 'all' || country.currency_code === currencyFilter
      const matchesFavorites = !showOnlyFavorites || favorites.includes(country.iso2)
      
      return matchesSearch && matchesContinent && matchesLanguage && matchesCurrency && matchesFavorites
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
        case 'population':
          comparison = a.population - b.population
          break
        case 'area':
          comparison = a.area_km2 - b.area_km2
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [searchTerm, continentFilter, languageFilter, currencyFilter, favorites, sortField, sortOrder, showOnlyFavorites])

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
      '驱车方向', '电源插头', '电压'
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
      country.voltage
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

  const resetFilters = () => {
    setSearchTerm('')
    setContinentFilter('all')
    setLanguageFilter('all')
    setCurrencyFilter('all')
    setShowOnlyFavorites(false)
    setSortField('none')
    setSortOrder('asc')
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-3 w-3" /> : 
      <ChevronDown className="h-3 w-3" />
  }

  const selectedCountryData = selectedCountry 
    ? COUNTRY_DATA.find(c => c.iso2 === selectedCountry)
    : null

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1>
        <p className="text-muted-foreground">
          查询全球 {COUNTRY_DATA.length} 个国家和地区的详细信息，包括区号、货币、语言、外贸相关信息等
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>搜索和筛选</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-2" />
                重置筛选
              </Button>
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                导出数据
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="筛选语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有语言</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="筛选货币" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有货币</SelectItem>
                {currencies.map(({ code, name }) => (
                  <SelectItem key={code} value={code}>{name} ({code})</SelectItem>
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
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>共找到 {filteredAndSortedCountries.length} 个国家/地区</span>
              {favorites.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  已收藏 {favorites.length} 个
                </Badge>
              )}
            </div>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
              <TabsList>
                <TabsTrigger value="table">列表视图</TabsTrigger>
                <TabsTrigger value="detail">详情视图</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {viewMode === 'table' ? (
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
                    <th className="text-left p-4 font-medium hidden 2xl:table-cell">官方语言</th>
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
                          <td className="p-4 hidden 2xl:table-cell">
                            <div className="text-sm">
                              {country.language_cn.slice(0, 2).join(', ')}
                              {country.language_cn.length > 2 && '...'}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleFavorite(country.iso2)}
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
                                onClick={() => {
                                  setSelectedCountry(country.iso2)
                                  setViewMode('detail')
                                }}
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 xl:hidden"
                                onClick={() => toggleRowExpansion(country.iso2)}
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
                          <tr className="xl:hidden">
                            <td colSpan={8} className="p-4 bg-muted/30">
                              <div className="grid gap-3 text-sm md:grid-cols-2">
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
                       