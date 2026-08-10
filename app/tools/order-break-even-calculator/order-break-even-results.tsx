// 名称: 外贸订单保本销量结果
// 描述: 展示保本销量、目标销量、计划利润与单件贡献明细
// 路径: Globokit/app/tools/order-break-even-calculator/order-break-even-results.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { CircleDollarSign, Gauge, Info, ShieldCheck, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { OrderBreakEvenResult } from '@/lib/tools/order-break-even-calculator'
import { formatMoney, formatPercent, formatQuantity } from './order-break-even-page-data'

export function OrderBreakEvenStats({ result }: { result: OrderBreakEvenResult }) {
  const stats = [
    { label: '保本销量', value: formatQuantity(result.breakEvenQuantity), note: `销售额 ${formatMoney(result.breakEvenSalesAmount, result.currency)}`, icon: ShieldCheck },
    { label: '目标利润销量', value: formatQuantity(result.targetProfitQuantity), note: `目标 ${formatMoney(result.targetProfit, result.currency)}`, icon: Target },
    { label: '计划订单利润', value: formatMoney(result.plannedProfit, result.currency), note: `利润率 ${formatPercent(result.plannedMarginPercent)}`, icon: CircleDollarSign },
    { label: '销量安全余量', value: formatQuantity(result.marginOfSafetyUnits), note: `相对计划销量 ${formatPercent(result.marginOfSafetyPercent)}`, icon: Gauge },
  ]
  return <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4 shrink-0" />{stat.label}</CardTitle></CardHeader><CardContent><div className="break-words text-xl font-bold">{stat.value}</div><p className="mt-1 break-words text-xs text-muted-foreground">{stat.note}</p></CardContent></Card> })}</div>
}

export function OrderBreakEvenResults({ result }: { result: OrderBreakEvenResult }) {
  const status = getStatus(result)
  const targetProgress = Math.min(100, result.targetProfitQuantity === 0 ? 100 : result.plannedQuantity / result.targetProfitQuantity * 100)
  return <div className="space-y-4"><Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle>计划订单判断</CardTitle><CardDescription>{formatQuantity(result.plannedQuantity)}的收入、成本与利润结果</CardDescription></div><Badge variant={status.variant}>{status.label}</Badge></div></CardHeader><CardContent className="space-y-6">
    <div><div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="text-muted-foreground">目标销量进度</span><span className="font-semibold tabular-nums">{formatPercent(targetProgress)}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.08]"><div className="h-full rounded-full bg-emerald-600 transition-[width] dark:bg-cyan-400" style={{ width: `${targetProgress}%` }} /></div><p className="mt-2 text-xs text-muted-foreground">{result.quantityGapToTarget > 0 ? `距离目标利润还需 ${formatQuantity(result.quantityGapToTarget)}` : '当前计划销量已覆盖目标利润'}</p></div>
    <section><h2 className="mb-3 text-sm font-semibold">单件贡献</h2><div className="grid gap-3 sm:grid-cols-2"><Metric label="销售单价" value={formatMoney(result.unitSellingPrice, result.currency)} /><Metric label="佣金、收款与损耗" value={formatMoney(result.variableFeePerUnit, result.currency)} /><Metric label="扣费后单件净收入" value={formatMoney(result.netRevenuePerUnit, result.currency)} /><Metric label="单件变动成本" value={formatMoney(result.unitVariableCost, result.currency)} /><Metric label="单件贡献毛利" value={formatMoney(result.contributionPerUnit, result.currency)} /><Metric label="贡献毛利率" value={formatPercent(result.contributionMarginPercent)} /></div></section>
    <section><h2 className="mb-3 text-sm font-semibold">销量与单价阈值</h2><div className="grid gap-2 text-sm"><ResultRow label="保本销量" value={formatQuantity(result.breakEvenQuantity)} /><ResultRow label="达到目标利润的销量" value={formatQuantity(result.targetProfitQuantity)} /><ResultRow label="计划销量下保本单价" value={formatMoney(result.breakEvenUnitPriceAtPlan, result.currency)} /><ResultRow label="计划销量下目标利润单价" value={formatMoney(result.targetUnitPriceAtPlan, result.currency)} /></div></section>
    <section><h2 className="mb-3 text-sm font-semibold">计划订单汇总</h2><div className="grid gap-2 border-t pt-4 text-sm"><ResultRow label="销售收入" value={formatMoney(result.plannedRevenue, result.currency)} /><ResultRow label="按销售额计提费用" value={formatMoney(result.plannedVariableFees, result.currency)} /><ResultRow label="变动成本" value={formatMoney(result.plannedVariableCost, result.currency)} /><ResultRow label="固定成本" value={formatMoney(result.fixedOrderCost, result.currency)} /><ResultRow label="计划利润" value={formatMoney(result.plannedProfit, result.currency)} strong /></div></section>
  </CardContent></Card><Card className="bg-muted/30"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />计算边界</CardTitle></CardHeader><CardContent className="space-y-2 text-sm leading-6 text-muted-foreground"><p>保本和目标销量均按完整件数向上取整，实际订单利润按用户输入的计划销量计算。</p><p>售后损耗预留按销售额计提，用于粗略覆盖折让、索赔或退款；确定订单后应以合同和历史数据复核。</p><p>结果不含未录入的税费、汇率波动与资金占用成本，也不替代正式财务预算。</p></CardContent></Card></div>
}

function getStatus(result: OrderBreakEvenResult): { label: string; variant: 'default' | 'secondary' | 'destructive' } {
  if (result.status === 'target-achieved') return { label: '目标利润已覆盖', variant: 'default' }
  if (result.status === 'profitable') return { label: '已保本，未达目标', variant: 'secondary' }
  return { label: '尚未保本', variant: 'destructive' }
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words font-semibold tabular-nums">{value}</p></div>
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className="flex items-start justify-between gap-3"><span className="text-muted-foreground">{label}</span><span className={`${strong ? 'font-bold text-foreground' : 'font-medium'} break-words text-right tabular-nums`}>{value}</span></div>
}
