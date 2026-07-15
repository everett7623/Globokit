// 名称: 世界时间概览
// 描述: 展示城市统计、本地时间和使用说明
// 路径: Globokit/app/tools/world-time/world-time-dashboard.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Clock, Globe, Info, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { CityTime } from './world-time-page-data'

interface WorldTimeStatsProps {
  cities: CityTime[]
  coveredCountries: number
  upcomingCount: number
  favoriteCount: number
}

export function WorldTimeStats(props: WorldTimeStatsProps) {
  const stats = [
    { label: '覆盖城市', value: props.cities.length, note: `${props.coveredCountries} 个国家/地区`, icon: Globe },
    { label: '工作时间城市', value: props.cities.filter((city) => city.isBusinessHours).length, note: '个城市正在工作', icon: Clock },
    { label: '即将开始工作', value: props.upcomingCount, note: '个城市（2小时内）', icon: Clock },
    { label: '已收藏城市', value: props.favoriteCount, note: '个常用城市', icon: Star },
  ]
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-4">{stats.map((item) => {
      const Icon = item.icon
      return <Card key={item.label}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{item.value}</div><p className="text-xs text-muted-foreground">{item.note}</p></CardContent></Card>
    })}</div>
  )
}

interface LocalTimeCardProps {
  currentDateTime: Date
  localTimezone: string
  localOffset: string
  timeFormat: '12' | '24'
  onFormatChange: (format: '12' | '24') => void
}

export function LocalTimeCard(props: LocalTimeCardProps) {
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />本地时间<Badge variant="outline" className="ml-2">{props.localTimezone}</Badge><Badge variant="secondary">UTC{props.localOffset}</Badge></CardTitle>
        <CardDescription><div className="flex items-center gap-2 mt-2">
          <Label>时间格式：</Label>
          <Button variant={props.timeFormat === '12' ? 'default' : 'outline'} size="sm" onClick={() => props.onFormatChange('12')}>12小时</Button>
          <Button variant={props.timeFormat === '24' ? 'default' : 'outline'} size="sm" onClick={() => props.onFormatChange('24')}>24小时</Button>
        </div></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-mono font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {props.timeFormat === '24' ? props.currentDateTime.toLocaleTimeString('zh-CN') : props.currentDateTime.toLocaleTimeString('en-US', { hour12: true })}
        </div>
        <div className="text-muted-foreground mt-1">{props.currentDateTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</div>
      </CardContent>
    </Card>
  )
}

export function WorldTimeInfo() {
  const items = ['点击星标收藏常用城市，方便快速查看', '绿色“工作时间”标签表示该地区处于周一至周五 9:00-18:00', '时差标签显示与您本地时间的差异，便于安排会议', '建议避开对方的午餐时间（12:00-14:00）和下班时间', '使用快捷筛选按钮可以快速查看特定地区的城市', '支持12小时和24小时时间格式切换']
  return <Card className="mt-6 bg-muted/50"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />使用说明</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground">{items.map((item) => <p key={item}>• {item}</p>)}</CardContent></Card>
}
