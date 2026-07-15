// 名称: 国家信息筛选控件
// 描述: 展示主要贸易国、搜索、大洲、收藏和导出控件
// 路径: Globokit/app/tools/global-country-info/country-controls.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Download, Filter, Map, Search, Star, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { COUNTRY_DATA, getContinents, getFlagEmoji, type CountryInfo } from '@/lib/tools/global-country-info'
import { MAJOR_TRADE_COUNTRIES } from './country-page-data'

export function MajorTradeCountries({ showOnlyMajorTrade, onSelect, onToggleFilter }: { showOnlyMajorTrade: boolean; onSelect: (country: CountryInfo) => void; onToggleFilter: () => void }) {
  const countries = COUNTRY_DATA.filter((country) => MAJOR_TRADE_COUNTRIES.includes(country.iso2))
  return <Card className="mb-6"><CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />主要外贸伙伴国</CardTitle><CardDescription>全球贸易额排名前20的国家和地区</CardDescription></CardHeader><CardContent><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">{countries.map((country) => <Button key={country.iso2} variant="outline" className="h-auto p-3 flex flex-col items-center gap-2 hover:shadow-md transition-shadow" onClick={() => onSelect(country)}><span className="text-2xl">{getFlagEmoji(country.iso2)}</span><span className="text-xs font-medium text-center">{country.name_cn}</span></Button>)}</div><div className="mt-4 flex justify-end"><Button variant="link" onClick={onToggleFilter} className="text-sm">{showOnlyMajorTrade ? '显示所有国家' : '仅显示主要贸易国'}</Button></div></CardContent></Card>
}

interface CountryControlsProps {
  searchTerm: string
  continentFilter: string
  showOnlyFavorites: boolean
  resultCount: number
  favoriteCount: number
  onSearch: (value: string) => void
  onContinent: (value: string) => void
  onToggleFavorites: () => void
  onExport: () => void
}

export function CountryControls(props: CountryControlsProps) {
  return <Card className="mb-6"><CardHeader><CardTitle>搜索和筛选</CardTitle></CardHeader><CardContent>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" /><Input placeholder="搜索国家、代码、区号..." value={props.searchTerm} onChange={(event) => props.onSearch(event.target.value)} className="pl-10" /></div>
      <Select value={props.continentFilter} onValueChange={props.onContinent}><SelectTrigger><SelectValue placeholder="筛选大洲" /></SelectTrigger><SelectContent><SelectItem value="all">所有大洲</SelectItem>{getContinents().map((continent) => <SelectItem key={continent} value={continent}>{continent}</SelectItem>)}<SelectItem value="跨洲国家"><span className="flex items-center gap-1"><Map className="h-3 w-3" />跨洲国家</span></SelectItem></SelectContent></Select>
      <Button variant={props.showOnlyFavorites ? 'default' : 'outline'} onClick={props.onToggleFavorites} className="w-full"><Star className={`h-4 w-4 mr-2 ${props.showOnlyFavorites ? 'fill-current' : ''}`} />{props.showOnlyFavorites ? '显示收藏' : '所有国家'}</Button>
      <Button variant="outline" onClick={props.onExport} className="w-full"><Download className="h-4 w-4 mr-2" />导出数据</Button>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Filter className="h-4 w-4" /><span>共找到 {props.resultCount} 个国家/地区</span>{props.favoriteCount > 0 && <Badge variant="secondary" className="ml-2">已收藏 {props.favoriteCount} 个</Badge>}</div>
  </CardContent></Card>
}
