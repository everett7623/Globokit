// 名称: 全球国家信息查询
// 描述: 查询全球国家和地区的详细信息，支持搜索和筛选
// 路径: seedtool/app/tools/global-country-info/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-25

'use client'

import { useState, useEffect, useMemo, FC, ReactElement } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CopyButton } from '@/components/tools/copy-button'
import { COUNTRY_DATA, getFlagEmoji, getTimeDifference, getContinents, CountryInfo } from '@/lib/tools/global-country-info'
import { Search, Globe, Star, StarOff, Info, Clock, Phone, Code, Globe2, Landmark, DollarSign } from 'lucide-react'

// 辅助组件：信息行
interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string | ReactElement;
  hasCopy?: boolean;
}

const InfoRow: FC<InfoRowProps> = ({ icon: Icon, label, value, hasCopy = false }) => (
  <div className="flex items-center justify-between py-1">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </div>
    <div className="flex items-center gap-2 font-medium text-sm">
      {typeof value === 'string' ? <span>{value}</span> : value}
      {hasCopy && typeof value === 'string' && <CopyButton text={value} className="h-8 w-8" />}
    </div>
  </div>
);

// 主页面组件
export default function GlobalCountryInfoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [continentFilter, setContinentFilter] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const savedFavorites = localStorage.getItem('countryFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
    setIsMounted(true)
  }, [])

  const filteredCountries = useMemo(() => {
    return COUNTRY_DATA
      .filter(country => {
        const term = searchTerm.toLowerCase()
        const matchesSearch =
          country.name_cn.toLowerCase().includes(term) ||
          country.name_en.toLowerCase().includes(term) ||
          country.iso2.toLowerCase().includes(term) ||
          country.iso3.toLowerCase().includes(term) ||
          country.dial_code.includes(term)
        const matchesContinent = continentFilter === 'all' || country.continent_cn === continentFilter
        return matchesSearch && matchesContinent
      })
      .sort((a, b) => {
        const aIsFav = favorites.includes(a.iso2)
        const bIsFav = favorites.includes(b.iso2)
        if (aIsFav && !bIsFav) return -1
        if (!aIsFav && bIsFav) return 1
        return a.name_en.localeCompare(b.name_en)
      })
  }, [searchTerm, continentFilter, favorites])

  const toggleFavorite = (iso2: string) => {
    const newFavorites = favorites.includes(iso2) ? favorites.filter(f => f !== iso2) : [...favorites, iso2]
    setFavorites(newFavorites)
    localStorage.setItem('countryFavorites', JSON.stringify(newFavorites))
  }

  if (!isMounted) {
    return null
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球国家信息查询</h1>
        <p className="text-muted-foreground">快速查找世界各国的区号、代码、时差等关键信息</p>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search"
                type="text"
                placeholder="搜索国家..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={continentFilter} onValueChange={setContinentFilter}>
              <SelectTrigger><SelectValue placeholder="筛选大洲" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有大洲</SelectItem>
                {getContinents().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6 max-h-[800px] overflow-y-auto p-1">
            {filteredCountries.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCountries.map((country) => {
                  const timeDiff = getTimeDifference(country.timezone);
                  const timeDiffDisplay = `UTC${timeDiff >= 0 ? '+' : ''}${timeDiff}`;
                  return (
                    <Card key={country.iso2} className={`transition-all hover:shadow-lg ${favorites.includes(country.iso2) ? 'ring-2 ring-yellow-400' : ''}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <span className="text-2xl">{getFlagEmoji(country.iso2)}</span>
                              {country.name_cn}
                            </CardTitle>
                            <CardDescription>{country.name_en}</CardDescription>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(country.iso2)}>
                            {favorites.includes(country.iso2)
                              ? <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              : <StarOff className="h-5 w-5" />}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <InfoRow icon={Globe2} label="大洲" value={country.continent_cn} />
                        <InfoRow icon={Landmark} label="首都" value={country.capital_cn} />
                        <InfoRow icon={Phone} label="国际区号" value={country.dial_code} hasCopy />
                        <InfoRow icon={Code} label="国家代码" value={`${country.iso2} / ${country.iso3}`} hasCopy />
                        <InfoRow icon={Clock} label="时差 (vs 本地)" value={timeDiffDisplay} />
                        <InfoRow icon={DollarSign} label="货币" value={`${country.currency_name_cn} (${country.currency_code})`} />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">未找到匹配的国家信息</p>
                <p className="text-xs text-muted-foreground mt-1">请尝试更换搜索关键词或筛选条件</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />使用说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击信息旁的复制按钮，可以快速复制代码或区号。</p>
          <p>• 点击卡片右上角的 <StarOff className="h-4 w-4 inline-block mx-1" /> 星标收藏常用国家，收藏后将优先显示。</p>
          <p>• “时差”是与您当前设备所在时区的小时差，便于您快速估算时间。</p>
          <p>• 数据仅供参考，进行重要业务时请以官方信息为准。</p>
        </CardContent>
      </Card>
    </>
  );
}
