// 名称: 货币查询控件
// 描述: 展示地区、主要货币与关键词筛选控件
// 路径: Globokit/app/tools/currency-symbols/currency-controls.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Search, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CURRENCY_REGIONS } from '@/lib/tools/currency-symbols'

interface CurrencyControlsProps {
  selectedRegion: string
  searchTerm: string
  favoriteCount: number
  showOnlyPopular: boolean
  onRegionChange: (value: string) => void
  onSearchChange: (value: string) => void
  onTogglePopular: () => void
}

export function CurrencyControls(props: CurrencyControlsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>地区筛选</Label>
        <Tabs value={props.selectedRegion} onValueChange={props.onRegionChange}>
          <div className="flex items-center justify-between gap-4">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="favorites">收藏 {props.favoriteCount > 0 && `(${props.favoriteCount})`}</TabsTrigger>
              {Object.entries(CURRENCY_REGIONS).map(([key, name]) => <TabsTrigger key={key} value={key}>{name}</TabsTrigger>)}
            </TabsList>
            <Button variant={props.showOnlyPopular ? 'default' : 'outline'} size="sm" onClick={props.onTogglePopular} className="shrink-0">
              <TrendingUp className="h-4 w-4 mr-1" />主要货币
            </Button>
          </div>
        </Tabs>
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">搜索货币</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input id="search" type="text" placeholder="搜索货币代码、名称、符号或国家..." value={props.searchTerm} onChange={(event) => props.onSearchChange(event.target.value)} className="pl-10" />
        </div>
      </div>
    </>
  )
}
