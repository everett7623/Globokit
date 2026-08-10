// 名称: 纸箱包装方案对比结果
// 描述: 展示成本、CBM、计费重排名和各方案明细
// 路径: Globokit/app/tools/packaging-plan-comparison/packaging-plan-results.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { BadgeCheck, Boxes, CircleDollarSign, Info, Scale } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PackagingComparisonResult, PackagingPlanResult } from '@/lib/tools/packaging-plan-comparison'
import { formatCbm, formatMoney, formatWeight } from './packaging-page-data'

export function PackagingPlanStats({ result }: { result: PackagingComparisonResult }) {
  const best = findPlan(result, result.bestCostPlanId)
  const lowestVolume = findPlan(result, result.lowestVolumePlanId)
  const lowestWeight = result.shippingMode === 'air' ? findPlan(result, result.lowestChargeableWeightPlanId) : [...result.plans].sort((a, b) => a.totalGrossWeightKg - b.totalGrossWeightKg)[0]
  const highestCost = Math.max(...result.plans.map((plan) => plan.totalLogisticsCostCny))
  const stats = [
    { label: '预计总成本最低', value: best.name, note: formatMoney(best.totalLogisticsCostCny), icon: BadgeCheck },
    { label: '总体积最低', value: lowestVolume.name, note: formatCbm(lowestVolume.totalCbm), icon: Boxes },
    { label: result.shippingMode === 'air' ? '计费重最低' : '总毛重最低', value: lowestWeight.name, note: formatWeight(result.shippingMode === 'air' ? lowestWeight.chargeableWeightKg : lowestWeight.totalGrossWeightKg), icon: Scale },
    { label: '最高可节省', value: formatMoney(highestCost - best.totalLogisticsCostCny), note: '相对当前最贵方案', icon: CircleDollarSign },
  ]
  return <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{stat.label}</CardTitle></CardHeader><CardContent><div className="break-words text-xl font-bold">{stat.value}</div><p className="mt-1 text-xs text-muted-foreground">{stat.note}</p></CardContent></Card> })}</div>
}

export function PackagingPlanResults({ result }: { result: PackagingComparisonResult }) {
  const lowestGrossPlanId = [...result.plans].sort((a, b) => a.totalGrossWeightKg - b.totalGrossWeightKg)[0].id
  return <div className="space-y-4"><div><h2 className="text-lg font-semibold">方案排名与明细</h2><p className="mt-1 text-sm text-muted-foreground">{result.shippingMode === 'air' ? '空运按实重与体积重较大者计费' : '海运成本按总 CBM 估算'}</p></div>{[...result.plans].sort((a, b) => a.costRank - b.costRank).map((plan) => <PlanResult key={plan.id} plan={plan} mode={result.shippingMode} lowestGross={plan.id === lowestGrossPlanId} />)}<Card className="bg-muted/30"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />比较口径</CardTitle></CardHeader><CardContent className="space-y-2 text-sm leading-6 text-muted-foreground"><p>箱数按产品总件数除以每箱装量向上取整，尾箱未装满的件位显示为空余容量。</p><p>空运计费重取总毛重和总体积重的较大值；海运按总 CBM 乘以用户输入的每 CBM 单价。</p><p>预计总成本为运输成本与纸箱包装成本之和，不代表货代最终账单。</p></CardContent></Card></div>
}

function PlanResult({ plan, mode, lowestGross }: { plan: PackagingPlanResult; mode: PackagingComparisonResult['shippingMode']; lowestGross: boolean }) {
  return <Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle>{plan.name}</CardTitle><CardDescription>{plan.lengthCm} × {plan.widthCm} × {plan.heightCm} cm · 每箱 {plan.unitsPerCarton} 件</CardDescription></div><div className="flex flex-wrap gap-2"><Badge>成本第 {plan.costRank}</Badge>{plan.volumeRank === 1 && <Badge variant="secondary">CBM 最低</Badge>}{mode === 'air' && plan.chargeableWeightRank === 1 && <Badge variant="secondary">计费重最低</Badge>}{mode === 'ocean' && lowestGross && <Badge variant="secondary">总毛重最低</Badge>}</div></div></CardHeader><CardContent className="space-y-4"><div><p className="text-xs text-muted-foreground">包装与运输合计</p><p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-cyan-200">{formatMoney(plan.totalLogisticsCostCny)}</p><p className="text-xs text-muted-foreground">单件 {formatMoney(plan.costPerUnitCny)}</p></div><div className="grid gap-3 sm:grid-cols-2"><Metric label="纸箱数量" value={`${plan.cartonCount} 箱`} /><Metric label="尾箱空余" value={`${plan.unusedCapacityUnits} 件位`} /><Metric label="总体积" value={formatCbm(plan.totalCbm)} /><Metric label="总毛重" value={formatWeight(plan.totalGrossWeightKg)} />{mode === 'air' ? <><Metric label="体积重" value={formatWeight(plan.totalVolumetricWeightKg)} /><Metric label="计费重" value={`${formatWeight(plan.chargeableWeightKg)}（${plan.billingBasis === 'actual' ? '实重' : '体积重'}）`} /></> : <><Metric label="单位体积装量" value={`${plan.unitsPerCbm.toLocaleString('zh-CN')} 件/CBM`} /><Metric label="装载密度" value={`${(plan.totalGrossWeightKg / plan.totalCbm).toLocaleString('zh-CN', { maximumFractionDigits: 2 })} kg/CBM`} /></>}</div><div className="grid gap-2 border-t pt-4 text-sm"><CostRow label="纸箱包装成本" value={plan.packagingCostCny} /><CostRow label="预估运输成本" value={plan.freightCostCny} /></div></CardContent></Card>
}

function findPlan(result: PackagingComparisonResult, id: string) {
  return result.plans.find((plan) => plan.id === id) ?? result.plans[0]
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words font-semibold tabular-nums">{value}</p></div>
}

function CostRow({ label, value }: { label: string; value: number }) {
  return <div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">{label}</span><span className="font-medium tabular-nums">{formatMoney(value)}</span></div>
}
