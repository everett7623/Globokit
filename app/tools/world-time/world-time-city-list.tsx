// 名称: 世界时间城市列表
// 描述: 按 UTC 偏移展示城市时间卡片
// 路径: Globokit/app/tools/world-time/world-time-city-list.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Globe, Star, StarOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getTimeDifference } from '@/lib/tools/world-time'
import { getFlagEmoji, parseOffsetValue, type CityTime } from './world-time-page-data'

interface WorldTimeCityListProps {
  groupedCities: Record<string, CityTime[]>
  filteredCount: number
  activeTab: string
  favorites: string[]
  localTimezone: string
  onToggleFavorite: (cityName: string) => void
}

export function WorldTimeCityList(props: WorldTimeCityListProps) {
  if (props.filteredCount === 0) {
    return (
      <div className="text-center py-12">
        <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">{props.activeTab === 'favorites' && props.favorites.length === 0 ? '还没有收藏任何城市，点击星标收藏常用城市' : '没有找到匹配的城市'}</p>
      </div>
    )
  }

  return Object.entries(props.groupedCities).sort(([a], [b]) => parseOffsetValue(b) - parseOffsetValue(a)).map(([offset, cities]) => (
    <div key={offset}>
      <h3 className="text-sm font-medium text-muted-foreground mb-3">UTC{offset}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => {
          const difference = getTimeDifference(city.timezone, props.localTimezone)
          return (
            <Card key={`${city.countryCode}-${city.nameEn}`} className={`overflow-hidden transition-all hover:shadow-lg ${props.favorites.includes(city.name) ? 'ring-2 ring-yellow-400' : ''}`}>
              <CardHeader className="pb-3"><div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">{getFlagEmoji(city.countryCode)}</span>{city.name}
                    <Button variant="ghost" size="sm" className="ml-1 h-6 w-6 p-0" onClick={() => props.onToggleFavorite(city.name)}>
                      {props.favorites.includes(city.name) ? <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : <StarOff className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                  <CardDescription>{city.nameEn} · {city.country}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {city.isBusinessHours && <Badge variant="default" className="bg-green-500">工作时间</Badge>}
                  {props.localTimezone !== city.timezone && <Badge variant="outline" className="text-xs">{difference > 0 ? '+' : ''}{difference}h</Badge>}
                </div>
              </div></CardHeader>
              <CardContent><div className="space-y-1"><div className="text-2xl font-mono font-bold">{city.currentTime}</div><div className="text-sm text-muted-foreground">{city.date}</div><div className="text-xs text-muted-foreground">{city.timezone}</div></div></CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  ))
}
