// 名称: 世界时间筛选控件
// 描述: 展示收藏、地区、工作时间和城市搜索筛选
// 路径: Globokit/app/tools/world-time/world-time-controls.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WORLD_TIME_REGIONS } from '@/lib/tools/world-time'

interface WorldTimeControlsProps {
  activeTab: string
  favoriteCount: number
  quickFilter: string
  searchTerm: string
  onTabChange: (value: string) => void
  onQuickFilterChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export function WorldTimeControls(props: WorldTimeControlsProps) {
  return (
    <>
      <Tabs value={props.activeTab} onValueChange={props.onTabChange}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="all">所有城市</TabsTrigger>
          <TabsTrigger value="favorites">收藏城市 {props.favoriteCount > 0 && `(${props.favoriteCount})`}</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="space-y-2">
        <Label>快捷筛选</Label>
        <div className="flex flex-wrap gap-2">
          <Button variant={props.quickFilter === '' ? 'default' : 'outline'} size="sm" onClick={() => props.onQuickFilterChange('')}>全部显示</Button>
          <Button variant={props.quickFilter === 'working' ? 'default' : 'outline'} size="sm" onClick={() => props.onQuickFilterChange(props.quickFilter === 'working' ? '' : 'working')}>工作时间</Button>
          {Object.entries(WORLD_TIME_REGIONS).map(([region, label]) => <Button key={region} variant={props.quickFilter === region ? 'default' : 'outline'} size="sm" onClick={() => props.onQuickFilterChange(props.quickFilter === region ? '' : region)}>{label}</Button>)}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">搜索城市</Label>
        <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" /><Input id="search" type="text" placeholder="搜索城市名称或国家..." value={props.searchTerm} onChange={(event) => props.onSearchChange(event.target.value)} className="pl-10" /></div>
      </div>
    </>
  )
}
