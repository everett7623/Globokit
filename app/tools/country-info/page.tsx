// 名称: 全球国家信息查询
// 描述: 查询世界各国的中英文名称、区号、代码、时区、域名等信息
// 路径: seedtool/app/tools/country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-24

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Globe, 
  Search, 
  Star, 
  StarOff, 
  Copy, 
  Check,
  Phone,
  Link,
  Clock,
  Coins,
  Languages,
  Anchor,
  Calendar,
  Info,
  MapPin
} from 'lucide-react'
import { 
  COUNTRIES, 
  CONTINENTS, 
  searchCountries, 
  filterCountriesByContinent, 
  getContinentOptions,
  type Country 
} from '@/lib/tools/country-info'

export default function CountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [copiedCountry, setCopiedCountry] = useState<string | null>(null)

  // 从localStorage加载收藏
  React.useEffect(() => {
    const saved = localStorage.getItem('countryInfoFavorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // 切换收藏
  const toggleFavorite = (countryName: string) => {
    const newFavorites = favorites.includes(countryName)
      ? favorites.filter(f => f !== countryName)
      : [...favorites, countryName]
    
    setFavorites(newFavorites)
    localStorage.setItem('countryInfoFavorites', JSON.stringify(newFavorites))
  }

  // 复制国家信息
  const copyCountryInfo = async (country: Country) => {
    const info = `${country.name} (${country.nameEn})
首都: ${country.capital} (${country.capitalEn})
大洲: ${CONTINENTS[country.continent]}
电话区号: ${country.phoneCode}
国家代码: ${country.iso2} / ${country.iso3}
域名: ${country.domain}
时区: ${country.timezone}
货币: ${country.currency} - ${country.currencyName}
语言: ${country.languages.join(', ')}
${country.tradePorts ? `主要港口: ${country.tradePorts.join(', ')}` : ''}
${country.businessHours ? `工作时间: ${country.businessHours}` : ''}`

    try {
      await navigator.clipboard.writeText(info)
      setCopiedCountry(country.iso2)
      setTimeout(() => setCopiedCountry(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // 过滤国家
  const filteredCountries = useMemo(() => {
    let result = COUNTRIES
    
    // 大洲过滤
    if (selectedContinent) {
      result = filterCountriesByContinent(selectedContinent)
    }
    
    // 搜索过滤
    if (searchTerm) {
      result = searchCountries(searchTerm).filter(country => 
        !selectedContinent || country.continent === selectedContinent
      )
    }
    
    // 标签页过滤
    if (activeTab === 'favorites') {
      result = result.filter(country => favorites.includes(country.name))
    }
    
    return result
  }, [searchTerm, selectedContinent, activeTab, favorites])

  // 统计数据
  const stats = {
    total: COUNTRIES.length,
    favorites: favorites.length,
    asia: COUNTRIES.filter(c => c.continent === 'asia').length,
    europe: COUNTRIES.filter(c => c.continent === 'europe').length,
    americas: COUNTRIES.filter(c => ['northAmerica', 'southAmerica'].includes(c.continent)).length,
    others: COUNTRIES.filter(c => ['africa', 'oceania'].includes(c.continent)).length
  }

  // 获取国旗emoji
  const getFlagEmoji = (iso2: string): string => {
    const codePoints = iso2
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  const continentOptions = getContinentOptions()

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1>
        <p className="text-muted-foreground">
          查询世界各国的中英文名称、区号、代码、时区、域名等信息
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              国家总数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">个国家/地区</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              已收藏
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <p className="text-xs text-muted-foreground">个常用国家</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              亚洲/欧洲
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.asia}/{stats.europe}</div>
            <p className="text-xs text-muted-foreground">个国家</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              美洲/其他
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.americas}/{stats.others}</div>
            <p className="text-xs text-muted-foreground">个国家</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>国家信息查询</CardTitle>
          <CardDescription>
            查询全球各国的基础信息、通讯代码、时区等外贸相关信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="all">所有国家</TabsTrigger>
              <TabsTrigger value="favorites">
                收藏国家 {favorites.length > 0 && `(${favorites.length})`}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 搜索和筛选 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="search">搜索国家</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="search"
                  type="text"
                  placeholder="搜索国家名称、代码、区号..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="continent">按大洲筛选</Label>
              <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                <SelectTrigger id="continent">
                  <SelectValue placeholder="选择大洲" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部大洲</SelectItem>
                  {continentOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 国家列表 */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredCountries.map((country) => {
                  const isFavorite = favorites.includes(country.name)
                  const isCopied = copiedCountry === country.iso2
                  
                  return (
                    <Card 
                      key={country.iso2} 
                      className={`overflow-hidden transition-all hover:shadow-lg ${
                        isFavorite ? 'ring-2 ring-yellow-400' : ''
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <span className="text-2xl">{getFlagEmoji(country.iso2)}</span>
                              {country.name}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-6 w-6 p-0"
                                onClick={() => toggleFavorite(country.name)}
                              >
                                {isFavorite ? (
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ) : (
                                  <StarOff className="h-4 w-4" />
                                )}
                              </Button>
                            </CardTitle>
                            <CardDescription>
                              {country.nameEn} · {country.capital}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">
                            {CONTINENTS[country.continent]}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* 基础信息 */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-medium">区号:</span> {country.phoneCode}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-medium">代码:</span> {country.iso2}/{country.iso3}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Link className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-medium">域名:</span> {country.domain}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-medium">时区:</span> {country.timezone}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Coins className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-medium">货币:</span> {country.currency}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Languages className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-medium">语言:</span> {country.languages[0]}
                          </div>
                        </div>

                        {/* 外贸信息 */}
                        {(country.tradePorts || country.businessHours) && (
                          <div className="space-y-1 text-sm border-t pt-2">
                            {country.tradePorts && (
                              <div className="flex items-start gap-1.5">
                                <Anchor className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                                <div>
                                  <span className="font-medium">主要港口:</span> 
                                  <span className="text-muted-foreground"> {country.tradePorts.slice(0, 3).join(', ')}</span>
                                </div>
                              </div>
                            )}
                            {country.businessHours && (
                              <div className="flex items-start gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                                <div>
                                  <span className="font-medium">工作时间:</span> 
                                  <span className="text-muted-foreground"> {country.businessHours}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 操作按钮 */}
                        <div className="flex justify-end pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyCountryInfo(country)}
                            className="gap-2"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-4 w-4" />
                                已复制
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                复制信息
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {activeTab === 'favorites' && favorites.length === 0 
                    ? '还没有收藏任何国家，点击星标收藏常用国家'
                    : '没有找到匹配的国家'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击星标收藏常用国家，方便快速查看</p>
          <p>• 支持搜索国家中英文名称、ISO代码、电话区号等</p>
          <p>• 可按大洲筛选查看特定地区的国家信息</p>
          <p>• 点击"复制信息"可一键复制该国家的完整信息</p>
          <p>• 工作时间仅供参考，实际请根据当地节假日调整</p>
          <p>• 主要港口信息有助于外贸物流安排</p>
        </CardContent>
      </Card>
    </>
  )
}
