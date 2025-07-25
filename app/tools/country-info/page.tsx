// 名称: 全球国家信息查询
// 描述: 查询全球主要国家的基础信息、通讯方式和外贸资讯
// 路径: seedtool/app/tools/country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-25

'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Globe, Star, StarOff, Info, Copy, Check, FileDown, BookUser, Phone, Ship } from 'lucide-react'
import { Country, ALL_COUNTRIES, getFlagEmoji } from '@/lib/tools/country-info'
import { CopyButton } from '@/components/tools/copy-button'

export default function CountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [continentFilter, setContinentFilter] = useState<string>('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // 从localStorage加载收藏，并标记组件已挂载
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('countryInfoFavorites')
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error)
      setFavorites([])
    }
    setIsMounted(true)
  }, [])
  
  // 过滤后的国家列表
  const filteredCountries = useMemo(() => {
    return ALL_COUNTRIES.filter(country => {
      const term = searchTerm.toLowerCase()
      const matchesSearch =
        country.name_zh.toLowerCase().includes(term) ||
        country.name_en.toLowerCase().includes(term) ||
        country.iso2.toLowerCase().includes(term) ||
        country.iso3.toLowerCase().includes(term) ||
        country.phone_code.includes(term) ||
        country.capital.toLowerCase().includes(term)

      const matchesContinent =
        continentFilter === 'all' || country.continent_zh === continentFilter

      return matchesSearch && matchesContinent
    })
  }, [searchTerm, continentFilter])
  
  // 收藏的国家列表
  const favoriteCountries = useMemo(() => {
    return ALL_COUNTRIES.filter(country => favorites.includes(country.iso2))
  }, [favorites])

  // 大洲列表
  const continents = useMemo(() =>
    ['all', ...Array.from(new Set(ALL_COUNTRIES.map(c => c.continent_zh)))]
  , [])

  // 切换收藏
  const toggleFavorite = (iso2: string) => {
    const newFavorites = favorites.includes(iso2)
      ? favorites.filter(f => f !== iso2)
      : [...favorites, iso2]
    
    setFavorites(newFavorites)
    if (typeof window !== 'undefined') {
      localStorage.setItem('countryInfoFavorites', JSON.stringify(newFavorites))
    }
  }
  
  // 批量导出功能 (CSV格式)
  const handleExport = () => {
    const dataToExport = favorites.length > 0 ? favoriteCountries : ALL_COUNTRIES
    const headers = ['中文名', '英文名', 'ISO2', '电话区号', '首都', '货币', '主要港口']
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(c => [
        c.name_zh,
        c.name_en,
        c.iso2,
        c.phone_code,
        c.capital,
        c.currency.code,
        `"${c.major_ports.join('; ')}"`
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-sjis;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = favorites.length > 0 ? 'favorite_countries.csv' : 'all_countries.csv'
    link.click()
  }

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1>
        <p className="text-muted-foreground">
          快速查找国家代码、区号、货币、港口等外贸业务常用信息
        </p>
      </div>

      {/* 统计与导出 */}
      <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">国家总数</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ALL_COUNTRIES.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">我的收藏</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.length}</div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">批量导出</CardTitle>
                <FileDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Button onClick={handleExport} className="w-full">
                    {favorites.length > 0 ? `导出 ${favorites.length} 个收藏国家 (CSV)` : '导出全部国家 (CSV)'}
                </Button>
            </CardContent>
        </Card>
      </div>

      {/* 主要功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>国家查询</CardTitle>
          <CardDescription>
            可通过名称、代码、区号搜索，或按大洲筛选
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">搜索国家</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search"
                type="text"
                placeholder="输入国家中英文名称 / 代码 / 电话区号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>按大洲筛选</Label>
            <div className="flex flex-wrap gap-2">
              {continents.map(continent => (
                <Button
                  key={continent}
                  variant={continentFilter === continent ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setContinentFilter(continent)}
                >
                  {continent === 'all' ? '全部' : continent}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 收藏列表 */}
      {favoriteCountries.length > 0 && (
          <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                我的收藏
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {favoriteCountries.map(country => (
                      <CountryCard key={country.iso2} country={country} isFavorite={true} onToggleFavorite={toggleFavorite} />
                  ))}
              </div>
              <Separator className="my-6" />
          </div>
      )}

      {/* 查询结果 */}
      <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">{continentFilter === 'all' ? '所有国家' : continentFilter}</h3>
          {filteredCountries.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCountries.map(country => (
                <CountryCard 
                  key={country.iso2} 
                  country={country} 
                  isFavorite={favorites.includes(country.iso2)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-12 text-muted-foreground">
                <Globe className="mx-auto h-12 w-12 mb-4" />
                <p>未找到匹配的国家信息。</p>
             </div>
          )}
      </div>
    </>
  )
}

// 国家信息卡片组件
function CountryCard({ country, isFavorite, onToggleFavorite }: { country: Country, isFavorite: boolean, onToggleFavorite: (iso2: string) => void }) {
  return (
    <Dialog>
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
                <span className="text-4xl mt-1">{getFlagEmoji(country.iso2)}</span>
                <div className="flex-1">
                    <CardTitle>{country.name_zh}</CardTitle>
                    <CardDescription>{country.name_en}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={(e) => { e.stopPropagation(); onToggleFavorite(country.iso2); }}>
                    {isFavorite 
                        ? <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" /> 
                        : <StarOff className="h-5 w-5 text-muted-foreground" />}
                </Button>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 text-sm">
                <InfoItem icon={Globe} label="首都" value={country.capital} />
                <InfoItem icon={Phone} label="区号" value={`+${country.phone_code}`} />
                <InfoItem icon={BookUser} label="代码" value={`${country.iso2} / ${country.iso3}`} />
            </CardContent>
            <CardFooter>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">查看详情</Button>
                </DialogTrigger>
            </CardFooter>
        </Card>
        <CountryDetailDialog country={country} />
    </Dialog>
  )
}

// 详情弹窗组件
function CountryDetailDialog({ country }: { country: Country }) {
    return (
        <DialogContent className="max-w-3xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                    <span className="text-4xl">{getFlagEmoji(country.iso2)}</span>
                    <div>
                        {country.name_zh}
                        <DialogDescription>{country.name_en}</DialogDescription>
                    </div>
                </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">基础信息</TabsTrigger>
                    <TabsTrigger value="communication">通讯信息</TabsTrigger>
                    <TabsTrigger value="trade">外贸相关</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="mt-4 space-y-3">
                    <DetailItem label="首都" value={country.capital} />
                    <DetailItem label="所属大洲" value={country.continent_zh} />
                    <DetailItem label="官方语言" value={country.languages.join(', ')} />
                    <DetailItem label="货币信息" value={`${country.currency.name} (${country.currency.code})`} symbol={country.currency.symbol} />
                </TabsContent>
                <TabsContent value="communication" className="mt-4 space-y-3">
                    <DetailItem label="国际电话区号" value={`+${country.phone_code}`} />
                    <DetailItem label="国家代码 (ISO)" value={`${country.iso2} / ${country.iso3}`} />
                    <DetailItem label="顶级域名后缀" value={country.tld} />
                    <DetailItem label="时区" value={country.timezones.join(', ')} />
                </TabsContent>
                <TabsContent value="trade" className="mt-4 space-y-3">
                    <DetailItem label="主要贸易港口" value={country.major_ports.join(', ')} icon={Ship}/>
                    <DetailItem label="通用工作时间" value={country.work_week} />
                    <DetailItem label="商务礼仪" value={
                        <ul className="list-disc pl-4 text-sm">
                            <li><strong>问候:</strong> {country.etiquette.greetings}</li>
                            <li><strong>会议:</strong> {country.etiquette.meetings}</li>
                            <li><strong>送礼:</strong> {country.etiquette.gifts}</li>
                        </ul>
                    } />
                     <DetailItem label="贸易注意事项" value={
                        <ul className="list-disc pl-4 text-sm">
                            {country.trade_notes.map((note, i) => <li key={i}>{note}</li>)}
                        </ul>
                    } />
                </TabsContent>
            </Tabs>
        </DialogContent>
    )
}

// Card中的信息项
const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0" />
        <span className="font-medium">{label}:</span>
        <span className="text-foreground truncate">{value}</span>
    </div>
)

// 弹窗中的详细信息项
const DetailItem = ({ label, value, symbol }: { label: string, value: string | React.ReactNode, symbol?: string }) => (
    <div className="flex items-start">
        <p className="w-28 text-muted-foreground shrink-0">{label}</p>
        <div className="flex-1 flex items-center gap-2">
            <p className="font-semibold">
                {value} {symbol && <Badge variant="secondary">{symbol}</Badge>}
            </p>
            {typeof value === 'string' && <CopyButton textToCopy={value} />}
        </div>
    </div>
)

// `copy-button.tsx` 组件可能需要微调，确保它存在于 `components/tools/` 目录下
// 如果不存在，这是一个建议的实现：
/*
// path: seedtool/components/tools/copy-button.tsx
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      onClick={handleCopy}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}
*/
