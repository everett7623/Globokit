// 名称: 全球货币符号大全
// 描述: 查看和复制全球各国货币符号，便于外贸报价和合同编写
// 路径: seedtool/app/tools/currency-symbols/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-18

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Copy, 
  Check, 
  Search, 
  Coins, 
  Star, 
  StarOff,
  TrendingUp,
  CircleDollarSign,
  Info
} from 'lucide-react'
import { getCurrencyData, formatCurrencyExample, CURRENCY_REGIONS } from '@/lib/tools/currency-symbols'

interface Currency {
  code: string
  name: string
  nameEn: string
  symbol: string
  country: string
  countryEn: string
  region: string
  decimals: number
  popular?: boolean
  trading?: boolean
}

export default function CurrencySymbolsPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)

  // 从localStorage加载收藏
  useEffect(() => {
    const saved = localStorage.getItem('currencyFavorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
    // 加载货币数据
    setCurrencies(getCurrencyData())
  }, [])

  // 复制功能
  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // 切换收藏
  const toggleFavorite = (code: string) => {
    const newFavorites = favorites.includes(code)
      ? favorites.filter(f => f !== code)
      : [...favorites, code]
    
    setFavorites(newFavorites)
    localStorage.setItem('currencyFavorites', JSON.stringify(newFavorites))
  }

  // 过滤货币
  const filteredCurrencies = currencies.filter(currency => {
    const matchesSearch = 
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.countryEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.symbol.includes(searchTerm)

    const matchesRegion = 
      selectedRegion === 'all' || 
      (selectedRegion === 'favorites' && favorites.includes(currency.code)) ||
      currency.region === selectedRegion

    const matchesPopular = !showOnlyPopular || currency.popular

    return matchesSearch && matchesRegion && matchesPopular
  })

  // 按地区分组
  const groupedCurrencies = filteredCurrencies.reduce((acc, currency) => {
    const key = currency.region
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(currency)
    return acc
  }, {} as Record<string, Currency[]>)

  // 统计信息
  const popularCount = currencies.filter(c => c.popular).length
  const tradingCount = currencies.filter(c => c.trading).length

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球货币符号大全</h1>
        <p className="text-muted-foreground">
          查看和复制全球各国货币符号，便于外贸报价和合同编写
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4" />
              货币总数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currencies.length}</div>
            <p className="text-xs text-muted-foreground">种货币</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              主要货币
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popularCount}</div>
            <p className="text-xs text-muted-foreground">种常用</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Coins className="h-4 w-4" />
              贸易货币
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tradingCount}</div>
            <p className="text-xs text-muted-foreground">种交易</p>
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
            <p className="text-xs text-muted-foreground">种货币</p>
          </CardContent>
        </Card>
      </div>

      {/* 过滤和搜索 */}
      <div className="space-y-4 mb-6">
        {/* 地区筛选 */}
        <Tabs value={selectedRegion} onValueChange={setSelectedRegion}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="favorites">收藏</TabsTrigger>
              {Object.entries(CURRENCY_REGIONS).map(([key, name]) => (
                <TabsTrigger key={key} value={key}>{name}</TabsTrigger>
              ))}
            </TabsList>
            
            <Button
              variant={showOnlyPopular ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              仅显示主要货币
            </Button>
          </div>
        </Tabs>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="搜索货币代码、名称、符号或国家..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 货币列表 */}
      <div className="space-y-6">
        {selectedRegion === 'favorites' && favorites.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                还没有收藏任何货币，点击星标收藏常用货币
              </p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedCurrencies).map(([region, regionCurrencies]) => (
            <div key={region}>
              {selectedRegion === 'all' && (
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline">{CURRENCY_REGIONS[region] || region}</Badge>
                  <span className="text-sm text-muted-foreground">
                    ({regionCurrencies.length}种)
                  </span>
                </h3>
              )}
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {regionCurrencies.map((currency) => (
                  <Card 
                    key={currency.code}
                    className={`overflow-hidden transition-all hover:shadow-lg ${
                      favorites.includes(currency.code) ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <span className="text-3xl font-bold text-primary">
                              {currency.symbol}
                            </span>
                            <span>{currency.code}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-6 w-6 p-0"
                              onClick={() => toggleFavorite(currency.code)}
                            >
                              {favorites.includes(currency.code) ? (
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </Button>
                          </CardTitle>
                          <CardDescription>
                            {currency.name} ({currency.nameEn})
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          {currency.popular && (
                            <Badge variant="default" className="bg-blue-500">
                              常用
                            </Badge>
                          )}
                          {currency.trading && (
                            <Badge variant="default" className="bg-green-500">
                              贸易
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">国家/地区：</span>
                          <span className="font-medium">
                            {currency.country} ({currency.countryEn})
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">示例：</span>
                          <span className="font-mono">
                            {formatCurrencyExample(currency.symbol, currency.decimals)}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => copyToClipboard(currency.symbol, currency.code + '-symbol')}
                          >
                            {copiedCode === currency.code + '-symbol' ? (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                已复制
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-1" />
                                复制符号
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => copyToClipboard(currency.code, currency.code + '-code')}
                          >
                            {copiedCode === currency.code + '-code' ? (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                已复制
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-1" />
                                复制代码
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {filteredCurrencies.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">没有找到匹配的货币</p>
          </CardContent>
        </Card>
      )}

      {/* 使用提示 */}
      <Card className="mt-8 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用提示
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击"复制符号"可快速复制货币符号到剪贴板</p>
          <p>• 点击"复制代码"可复制ISO 4217标准货币代码</p>
          <p>• 蓝色"常用"标签表示国际贸易中的主要结算货币</p>
          <p>• 绿色"贸易"标签表示重要的国际贸易货币</p>
          <p>• 收藏常用货币方便快速查找和使用</p>
          <p>• 在合同中建议同时标注货币符号和代码，如：$100 USD</p>
        </CardContent>
      </Card>
    </div>
  )
}
