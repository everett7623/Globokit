// 名称: 交期计算结果
// 描述: 展示预计交付日期、阶段里程碑和排除日期明细
// 路径: Globokit/app/tools/delivery-date-calculator/delivery-date-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-21

import { CalendarCheck2, CalendarOff, Factory, PackageCheck, Ship } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDeliveryDate, type DeliveryDateCalculation, type DeliveryMilestone } from '@/lib/tools/delivery-date-calculator'

export function DeliveryDateResults({ calculation }: { calculation: DeliveryDateCalculation }) {
  if (!calculation.result) return <Alert variant="destructive"><AlertDescription>{calculation.error}</AlertDescription></Alert>
  const result = calculation.result
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center justify-between gap-3"><span>预计交付日期</span><Badge variant="secondary">{result.elapsedDays} 个自然日后</Badge></CardTitle><CardDescription>计划天数 {result.plannedDays} 天 · 起始日 {formatDeliveryDate(result.startDate)}</CardDescription></CardHeader>
        <CardContent><div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-5 dark:border-cyan-300/20 dark:bg-cyan-300/10"><p className="text-sm text-emerald-800 dark:text-cyan-100">最终里程碑</p><p className="mt-2 text-2xl font-bold text-emerald-950 dark:text-white">{formatDeliveryDate(result.deliveryDate)}</p><p className="mt-2 font-mono text-sm text-emerald-700 dark:text-cyan-200">{result.deliveryDate}</p></div></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>阶段里程碑</CardTitle><CardDescription>每个阶段从上一个里程碑的次日开始计算</CardDescription></CardHeader>
        <CardContent className="space-y-3">{result.milestones.map((milestone) => <MilestoneRow key={milestone.key} milestone={milestone} />)}</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>排除日期</CardTitle><CardDescription>工作日模式下未计入计划天数的日期</CardDescription></CardHeader>
        <CardContent className="space-y-4"><div className="grid grid-cols-2 gap-3"><Metric label="周末" value={`${result.weekendDaysSkipped} 天`} /><Metric label="公共假日" value={`${result.holidayDaysSkipped} 天`} /></div>{!result.holidayCoverageComplete && <Alert><CalendarOff className="h-4 w-4" /><AlertDescription>预计日期跨出当前节假日数据覆盖范围，未覆盖年份仅排除周末，请结合当地官方日历复核。</AlertDescription></Alert>}{result.skippedHolidays.length > 0 && <div className="space-y-2">{result.skippedHolidays.slice(0, 8).map((holiday) => <div key={holiday.date} className="flex items-center justify-between gap-3 rounded-md bg-muted/50 px-3 py-2 text-sm"><span>{holiday.nameCN || holiday.localName || holiday.name}</span><span className="font-mono text-muted-foreground">{holiday.date}</span></div>)}{result.skippedHolidays.length > 8 && <p className="text-xs text-muted-foreground">另有 {result.skippedHolidays.length - 8} 个公共假日未展开。</p>}</div>}</CardContent>
      </Card>
    </div>
  )
}

function MilestoneRow({ milestone }: { milestone: DeliveryMilestone }) {
  const Icon = milestone.key === 'production' ? Factory : milestone.key === 'transit' ? Ship : PackageCheck
  return <div className="flex items-center justify-between gap-4 rounded-md border p-3"><span className="flex items-center gap-2 text-sm"><Icon className="h-4 w-4 text-muted-foreground" />{milestone.label}<Badge variant="outline">+{milestone.days} 天</Badge></span><span className="text-right text-sm font-medium">{formatDeliveryDate(milestone.date)}</span></div>
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-muted/50 p-3"><p className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarCheck2 className="h-3.5 w-3.5" />{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>
}
