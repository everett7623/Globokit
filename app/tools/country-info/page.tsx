// 名称: 全球国家信息查询
// 描述: 查询全球各国的基本信息、通讯代码、时区时差等
// 路径: seedtool/app/tools/country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-24

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { 
  Copy, 
  Check, 
  Search, 
  Globe, 
  Star, 
  StarOff,
  Phone,
  Clock,
  DollarSign,
  Info,
  MapPin,
  Download
} from 'lucide-react'
import { 
  COUNTRIES, 
  CONTINENTS, 
  searchCountries, 
  filterByContinent, 
  getTimeDifference,
  getCurrentTime,
  getBusinessEtiquette,
  formatCountryInfo,
  type Country 
} from '@/lib/tools/country-info'

export default function CountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('all')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // 从localStorage加载收藏
  useEffect(() => {
    const saved = localStorage.getItem('countryFavorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // 复制功能
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  // 切换收藏
  const toggleFavorite = (countryCode: string) => {
    const newFavorites = favorites.includes(countryCode)
      ? favorites.filter(f => f !== countryCode)
      : [...favorites, countryCode]
    
    setFavorites(newFavorites)
    localStorage.setItem('countryFavorites', JSON.stringify(newFavorites))
  }

  // 过滤国家
  const getFilteredCountries = () => {
    let countries = selectedContinent === 'all' ? COUNTRIES : filterByContinent(selectedContinent)
    
    if (searchTerm) {
      countries = searchCountries(searchTerm)
    }
    
    if (selectedContinent === 'favorites') {
      countries = countries.filter(c => favorites.includes(c.iso2))
    }
    
    return countries
  }

  const filteredCountries = getFilteredCountries()

  // 导出数据
  const exportData = () => {
    const data = filteredCountries.map(country => ({
      '国家': country.name,
      '英文名': country.nameEn,
      '首都': country.capital,
      '国家代码': `${country.iso2}/${country.iso3}`,
      '电话区号': country.phoneCode,
      '域名': country.domain,
      '时区': country.timezone,
      '货币': `${country.currency} - ${country.currencyName}`
    }))
    
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `countries_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1>
        <p className="text-muted-foreground">
          查询全球各国的基本信息、通讯代码、时区时差等外贸必备信息
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              国家总数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{COUNTRIES.length}</div>
            <p className="text-xs text-muted-foreground">个国家和地区</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              覆盖大洲
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(CONTINENTS).length - 1}</div>
            <p className="text-xs text-muted-foreground">个大洲</p>
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
            <div className="text-2xl font-bold">{favorites.length}</div>
            <p className="text-xs text-muted-foreground">个常用国家</p>
          </CardContent>
        </Card>
      </div>

      {/* 主功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>国家信息查询</CardTitle>
          <CardDescription>
            支持搜索国家名称、首都、代码、电话区号等信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 筛选和搜索 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>大洲筛选</Label>
              <Tabs value={selectedContinent} onValueChange={setSelectedContinent}>
                <TabsList className="flex-wrap h-auto">
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="favorites">
                    收藏 {favorites.length > 0 && `(${favorites.length})`}
                  </TabsTrigger>
                  {Object.entries(CONTINENTS).map(([key, name]) => (
                    key !== 'antarctica' && (
                      <TabsTrigger key={key} value={key}>{name}</TabsTrigger>
                    )
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">搜索国家</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="搜索国家名称、首都、代码、电话区号..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={exportData}
                  disabled={filteredCountries.length === 0}
                >
                  <Download className="h-4 w-4 mr-1" />
                  导出
                </Button>
              </div>
            </div>
          </div>

          {/* 国家列表 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto">
            {filteredCountries.map((country) => (
              <Card 
                key={country.iso2}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  favorites.includes(country.iso2) ? 'ring-2 ring-yellow-400' : ''
                } ${selectedCountry?.iso2 === country.iso2 ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedCountry(country)}
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
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(country.iso2)
                          }}
                        >
                          {favorites.includes(country.iso2) ? (
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
                    <Badge variant="outline">{country.iso2}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{country.phoneCode}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <span>{country.domain}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{country.timezone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span>{country.currency}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {selectedContinent === 'favorites' && favorites.length === 0 
                  ? '还没有收藏任何国家'
                  : '没有找到匹配的国家'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 详细信息面板 */}
      {selectedCountry && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-3xl">{getFlagEmoji(selectedCountry.iso2)}</span>
                {selectedCountry.name} - {selectedCountry.nameEn}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(formatCountryInfo(selectedCountry), 'country-info')}
              >
                {copiedText === 'country-info' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    复制全部
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {/* 基本信息 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">基本信息</h3>
                <div className="space-y-2">
                  <InfoRow label="首都" value={`${selectedCountry.capital} (${selectedCountry.capitalEn})`} />
                  <InfoRow label="大洲" value={CONTINENTS[selectedCountry.continent as keyof typeof CONTINENTS]} />
                  <InfoRow label="国家代码" value={`${selectedCountry.iso2} / ${selectedCountry.iso3}`} />
                  <InfoRow label="官方语言" value={selectedCountry.languages.join('、')} />
                </div>
              </div>

              {/* 通讯信息 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">通讯信息</h3>
                <div className="space-y-2">
                  <InfoRow 
                    label="电话区号" 
                    value={selectedCountry.phoneCode}
                    onCopy={() => copyToClipboard(selectedCountry.phoneCode, 'phone')}
                    copied={copiedText === 'phone'}
                  />
                  <InfoRow 
                    label="域名后缀" 
                    value={selectedCountry.domain}
                    onCopy={() => copyToClipboard(selectedCountry.domain, 'domain')}
                    copied={copiedText === 'domain'}
                  />
                  <InfoRow label="时区" value={selectedCountry.timezone} />
                  <InfoRow 
                    label="与北京时差" 
                    value={getTimeDifference(selectedCountry.timezone)}
                  />
                  <InfoRow 
                    label="当地时间" 
                    value={getCurrentTime(selectedCountry.timezone)}
                    highlight
                  />
                </div>
              </div>

              {/* 经济信息 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">经济信息</h3>
                <div className="space-y-2">
                  <InfoRow label="货币" value={`${selectedCountry.currencyName} (${selectedCountry.currency})`} />
                  {selectedCountry.tradePorts && (
                    <InfoRow label="主要港口" value={selectedCountry.tradePorts.join('、')} />
                  )}
                  {selectedCountry.businessHours && (
                    <InfoRow label="工作时间" value={selectedCountry.businessHours} />
                  )}
                </div>
              </div>

              {/* 商务礼仪 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">商务礼仪</h3>
                <ul className="space-y-1 text-sm">
                  {getBusinessEtiquette(selectedCountry.iso2).map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedCountry.holidays && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">主要节假日：</span>
                  {selectedCountry.holidays.join('、')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 使用说明 */}
      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 支持搜索国家中英文名称、首都、国家代码、电话区号等</p>
          <p>• 点击国家卡片查看详细信息，包括时差、货币、商务礼仪等</p>
          <p>• 收藏常用国家方便快速查找</p>
          <p>• 支持按大洲筛选和批量导出数据</p>
          <p>• 时差以北京时间（UTC+8）为基准计算</p>
          <p>• 商务礼仪信息仅供参考，实际情况可能因地区而异</p>
        </CardContent>
      </Card>
    </>
  )
}

// 信息行组件
function InfoRow({ 
  label, 
  value, 
  onCopy, 
  copied,
  highlight 
}: { 
  label: string
  value: string
  onCopy?: () => void
  copied?: boolean
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}：</span>
      <div className="flex items-center gap-1">
        <span className={`text-sm font-medium ${highlight ? 'text-primary' : ''}`}>
          {value}
        </span>
        {onCopy && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onCopy}
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        )}
      </div>
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
