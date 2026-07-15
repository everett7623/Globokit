// 名称: 国家详情弹层
// 描述: 展示国家详情导航、收藏和关闭操作
// 路径: Globokit/app/tools/global-country-info/country-detail-modal.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Map, Star, StarOff, X } from 'lucide-react'
import { CountryBasicTab, CountryBusinessTab, CountryCommunicationTab, CountryCultureTab } from './country-detail-tabs'
import { TRANSCONTINENTAL_COUNTRIES } from './country-page-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFlagEmoji, type CountryInfo } from '@/lib/tools/global-country-info'

export function CountryDetailModal({ country, favorites, onToggleFavorite, onClose }: { country: CountryInfo; favorites: string[]; onToggleFavorite: (iso2: string) => void; onClose: () => void }) {
  const transcontinental = Object.prototype.hasOwnProperty.call(TRANSCONTINENTAL_COUNTRIES, country.iso2)
  return <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
    <CardHeader className="sticky top-0 bg-background z-10 border-b"><div className="flex items-start justify-between"><div className="flex items-center gap-4"><span className="text-4xl">{getFlagEmoji(country.iso2)}</span><div><CardTitle className="text-2xl">{country.name_cn}</CardTitle><CardDescription className="text-lg">{country.name_en}</CardDescription>{transcontinental && <Badge variant="secondary" className="mt-1"><Map className="h-3 w-3 mr-1" />跨洲国家</Badge>}</div></div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" onClick={() => onToggleFavorite(country.iso2)}>{favorites.includes(country.iso2) ? <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" /> : <StarOff className="h-5 w-5" />}</Button><Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button></div></div></CardHeader>
    <CardContent className="p-6"><Tabs defaultValue="basic" className="w-full"><TabsList className="grid w-full grid-cols-4"><TabsTrigger value="basic">基础信息</TabsTrigger><TabsTrigger value="communication">通讯信息</TabsTrigger><TabsTrigger value="culture">文化信息</TabsTrigger><TabsTrigger value="business">商务信息</TabsTrigger></TabsList><TabsContent value="basic" className="space-y-4 mt-6"><CountryBasicTab country={country} /></TabsContent><TabsContent value="communication" className="space-y-4 mt-6"><CountryCommunicationTab country={country} /></TabsContent><TabsContent value="culture" className="space-y-4 mt-6"><CountryCultureTab country={country} /></TabsContent><TabsContent value="business" className="space-y-4 mt-6"><CountryBusinessTab country={country} /></TabsContent></Tabs></CardContent>
  </Card></div>
}
