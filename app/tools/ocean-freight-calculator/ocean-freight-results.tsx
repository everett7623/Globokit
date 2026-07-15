// 名称: 海运费用结果
// 描述: 展示概览、费用拆分和摊销口径
// 路径: Globokit/app/tools/ocean-freight-calculator/ocean-freight-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import type { ComponentType } from 'react'
import { Boxes, Calculator, Container, FileText, Package, ShieldCheck, Ship, Truck, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { calculateOceanFreight } from '@/lib/tools/ocean-freight-calculator'
import { formatCny, formatNumber, toNumber, type FormState } from './ocean-freight-page-data'

type OceanResult = ReturnType<typeof calculateOceanFreight>

export function OceanFreightStats({ result, form }: { result: OceanResult; form: FormState }) {
  const cards: Array<{ label: string; value: string; caption: string; icon: ComponentType<{ className?: string }> }> = [
    { label: '费用合计', value: formatCny(result.totalCostCny), caption: `${result.modeLabel} 全链路估算`, icon: Wallet },
    { label: '每 CBM 成本', value: formatCny(result.perCbmCny), caption: `计费 ${formatNumber(result.chargeableCbm, 3)} CBM`, icon: Boxes },
    { label: '每件摊费', value: formatCny(result.perCartonCny), caption: `${result.quantity} 件平均分摊`, icon: Package },
    { label: form.mode === 'fcl' ? '每柜费用' : '每公斤费用', value: form.mode === 'fcl' ? formatCny(result.perContainerCny) : formatCny(result.perKgCny), caption: form.mode === 'fcl' ? `${form.containerCount || '1'} 柜分摊` : `${formatNumber(result.weightTon, 3)} 吨毛重`, icon: form.mode === 'fcl' ? Container : Truck },
  ]
  return <div className="grid gap-4 md:grid-cols-4">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{card.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{card.value}</div><p className="text-xs text-muted-foreground">{card.caption}</p></CardContent></Card> })}</div>
}

export function OceanFreightResults({ result, form }: { result: OceanResult; form: FormState }) {
  const maxCost = Math.max(...result.costBreakdown.map((row) => row.value), 1)
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center justify-between gap-3"><span>费用拆分</span><Badge variant="secondary">{result.modeLabel}</Badge></CardTitle><CardDescription>起运端 {formatCny(result.originSubtotalCny)} · 目的港 {formatCny(result.destinationChargeCny)}</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {result.costBreakdown.map((row) => <div key={row.key} className="space-y-1"><div className="flex items-center justify-between gap-3 text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-medium">{formatCny(row.value)}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn('h-full rounded-full', row.key === 'freight' ? 'bg-cyan-500' : 'bg-slate-500')} style={{ width: `${Math.max(4, Math.min(100, row.value / maxCost * 100))}%` }} /></div></div>)}
          <div className="rounded-md border border-cyan-200 bg-cyan-50/80 p-4 dark:border-cyan-300/20 dark:bg-cyan-300/10"><div className="flex items-center justify-between gap-4"><span className="text-sm font-medium text-cyan-800 dark:text-cyan-100">总费用</span><span className="text-2xl font-bold text-cyan-900 dark:text-white">{formatCny(result.totalCostCny)}</span></div></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Ship className="h-5 w-5" />摊销口径</CardTitle><CardDescription>用于报价、利润核算和多批次费用对比</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <ResultRow label="计费体积" value={`${formatNumber(result.chargeableCbm, 3)} CBM`} icon={Boxes} />
          <ResultRow label="毛重吨位" value={`${formatNumber(result.weightTon, 3)} 吨`} icon={Truck} />
          <ResultRow label="每公斤费用" value={formatCny(result.perKgCny)} icon={Package} />
          <ResultRow label="每件摊费" value={formatCny(result.perCartonCny)} icon={Calculator} />
          <ResultRow label="保险费用" value={formatCny(result.insuranceFeeCny)} icon={ShieldCheck} />
          <ResultRow label="文件与操作" value={formatCny(toNumber(form.documentFeeCny))} icon={FileText} />
        </CardContent>
      </Card>
    </div>
  )
}

function ResultRow({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ className?: string }> }) {
  return <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</span><span className="text-right font-medium">{value}</span></div>
}
