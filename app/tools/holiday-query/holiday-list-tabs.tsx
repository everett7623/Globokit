// 名称: 节假日列表标签页
// 描述: 展示即将到来和国际性节日
// 路径: Globokit/app/tools/holiday-query/holiday-list-tabs.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Globe, Info, TrendingUp } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { internationalHolidays, getImpactLevelName, type UpcomingHoliday } from '@/lib/tools/holiday-query'

export function UpcomingHolidayTab({ holidays }: { holidays: UpcomingHoliday[] }) {
  return <div className="space-y-4"><Alert className="bg-orange-50 border-orange-200"><TrendingUp className="h-4 w-4 text-orange-600" /><AlertDescription className="text-orange-800">未来30天内全球即将到来的重要节假日，请提前安排订单和物流</AlertDescription></Alert><div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">{holidays.length > 0 ? holidays.slice(0, 20).map((holiday, index) => <Card key={`${holiday.country}-${holiday.date}-${index}`} className={holiday.daysUntil <= 7 ? 'border-orange-200' : ''}><CardContent className="pt-6"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-2xl">{holiday.flag}</span><div className="flex-1"><h4 className="font-semibold">{holiday.name}{(holiday.nameCN || holiday.localName) && <span className="text-sm text-muted-foreground ml-2">({holiday.nameCN || holiday.localName})</span>}</h4><p className="text-sm text-muted-foreground">{holiday.country} • {new Date(holiday.date).toLocaleDateString('zh-CN')}</p></div></div><div className="text-right space-y-1"><Badge variant={holiday.daysUntil <= 7 ? 'destructive' : 'outline'} className="text-sm">{holiday.daysUntil}天后</Badge><Badge variant={holiday.impact === 'high' ? 'destructive' : holiday.impact === 'medium' ? 'default' : 'secondary'} className="text-xs block">{getImpactLevelName(holiday.impact)}影响</Badge></div></div></CardContent></Card>) : <Alert><Info className="h-4 w-4" /><AlertDescription>未来30天暂无已收录的高影响节假日</AlertDescription></Alert>}</div></div>
}

export function InternationalHolidayTab() {
  return <div className="space-y-4"><Alert><Globe className="h-4 w-4" /><AlertDescription>全球性节日和纪念日，影响多个国家的商业活动</AlertDescription></Alert><div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">{internationalHolidays.map((holiday, index) => <Card key={index}><CardHeader className="pb-3"><CardTitle className="text-base flex items-center justify-between"><span>{holiday.name}</span><Badge variant={holiday.impact === 'high' ? 'destructive' : holiday.impact === 'medium' ? 'default' : 'secondary'}>{getImpactLevelName(holiday.impact)}影响</Badge></CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground mb-2">{holiday.nameCN || holiday.localName} • {holiday.date}</p><p className="text-xs">{holiday.description}</p></CardContent></Card>)}</div></div>
}
