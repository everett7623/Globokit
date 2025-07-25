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
import { COUNTRY_DATA, getFlagEmoji, getTimeDifference, getContinents } from '@/lib/tools/global-country-info'
import { 
  Search, Globe, Star, StarOff, Download, Filter, ChevronUp, ChevronDown,
  Phone, Globe2, Clock, DollarSign, MapPin, Hash
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
    const headers = ['国家', 'Country', 'ISO2', 'ISO3', '区号', '首都', '大洲', '时区', '货币']
    const rows = filteredAndSortedCountries.map(country => [
      country.name_cn,
      country.name_en,
      country.iso2,
      country.iso3,
      country.dial_code,
      country.capital_cn,
      country.continent_cn,
      country.timezone,
      `${country.currency_name_cn} (${country.currency_code})`
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
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

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1>
        <p className="text-muted-foreground">快速查找世界各国的区号、代码、时差等关键信息，支持导出和收藏功能</p>
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
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
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
                            >
                              {isFavorite ? 
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : 
                                <StarOff className="h-4 w-4" />
                              }
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 lg:hidden"
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
                                <span>{country.currency_name_cn} ({country.currency_code})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">域名:</span>
                                <span className="font-mono">{country.tld}</span>
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
          <CardTitle className="text-base">使用提示</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击表头可以对国家名称、大洲和时差进行排序</p>
          <p>• 收藏的国家会优先显示在列表顶部，并有黄色背景标识</p>
          <p>• 在移动设备上点击展开按钮查看更多详细信息</p>
          <p>• 支持导出当前筛选结果为CSV文件，方便外贸业务使用</p>
          <p>• 时差显示为相对于您当前设备时区的小时差</p>
        </CardContent>
      </Card>
    </>
  )
}
