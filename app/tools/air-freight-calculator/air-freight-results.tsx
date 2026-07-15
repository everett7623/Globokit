// 名称: 空运计费结果
// 描述: 展示计费重量、重量对比和费用拆分
// 路径: Globokit/app/tools/air-freight-calculator/air-freight-results.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import type { ComponentType } from 'react'
import { Box, Calculator, CircleDollarSign, Fuel, Package, Plane, Ruler, Scale, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { calculateAirFreight } from '@/lib/tools/air-freight-calculator'
import { formatMoney, formatNumber } from './air-freight-page-data'

type AirResult = ReturnType<typeof calculateAirFreight>

export function AirFreightStats({ result }: { result: AirResult }) {
  const volumetric = result.billingBasis === 'volumetric'
  const cards = [
    { label: '计费重量', value: `${formatNumber(result.chargeableWeightKg, 2)} kg`, caption: volumetric ? '按体积重计费' : '按毛重计费', icon: Scale },
    { label: '总体积重', value: `${formatNumber(result.volumetricWeightKg, 2)} kg`, caption: `单箱 ${formatNumber(result.volumetricWeightPerCartonKg, 2)} kg`, icon: Box },
    { label: '费用合计', value: formatMoney(result.totalCharge), caption: `基础运费 ${formatMoney(result.baseFreight)}`, icon: CircleDollarSign },
    { label: '单箱费用', value: formatMoney(result.unitCharge), caption: `${formatNumber(result.chargeableWeightPerCartonKg, 2)} kg/箱`, icon: Package },
  ]
  return <div className="grid gap-4 md:grid-cols-4">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{card.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{card.value}</div><p className="text-xs text-muted-foreground">{card.caption}</p></CardContent></Card> })}</div>
}

export function AirFreightResults({ result }: { result: AirResult }) {
  const volumetric = result.billingBasis === 'volumetric'
  return <div className="space-y-6">
    <Card>
      <CardHeader><CardTitle className="flex items-center justify-between gap-3"><span>计费结果</span><Badge variant={volumetric ? 'destructive' : 'secondary'}>{volumetric ? '体积重计费' : '毛重计费'}</Badge></CardTitle><CardDescription>抛重差 {formatNumber(result.weightDifferenceKg, 2)} kg · 总体积 {formatNumber(result.totalCbm, 3)} CBM</CardDescription></CardHeader>
      <CardContent className="space-y-5"><div className="grid gap-3">
        <ResultRow label="单箱体积" value={`${formatNumber(result.cartonCbm, 4)} CBM`} icon={Ruler} />
        <ResultRow label="总毛重" value={`${formatNumber(result.actualWeightKg, 2)} kg`} icon={Truck} />
        <ResultRow label="总净重" value={`${formatNumber(result.netWeightKg, 2)} kg`} icon={Package} />
        <ResultRow label="单箱体积重" value={`${formatNumber(result.volumetricWeightPerCartonKg, 2)} kg`} icon={Plane} />
        <ResultRow label="单箱计费重" value={`${formatNumber(result.chargeableWeightPerCartonKg, 2)} kg`} icon={Scale} />
      </div><WeightCompareBar actualWeight={result.actualWeightKg} volumetricWeight={result.volumetricWeightKg} /></CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle>费用拆分</CardTitle><CardDescription>基础运费按计费重量乘以单价，并与最低收费取高</CardDescription></CardHeader>
      <CardContent className="space-y-3"><ResultRow label="基础运费" value={formatMoney(result.baseFreight)} icon={Calculator} /><ResultRow label="燃油附加" value={formatMoney(result.fuelSurcharge)} icon={Fuel} /><ResultRow label="操作/杂费" value={formatMoney(result.handlingFee)} icon={Package} /><div className="rounded-md border border-emerald-200 bg-emerald-50/80 p-4 dark:border-cyan-300/20 dark:bg-cyan-300/10"><div className="flex items-center justify-between gap-4"><span className="text-sm font-medium text-emerald-800 dark:text-cyan-100">费用合计</span><span className="text-2xl font-bold text-emerald-900 dark:text-white">{formatMoney(result.totalCharge)}</span></div></div></CardContent>
    </Card>
  </div>
}

function ResultRow({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ className?: string }> }) {
  return <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</span><span className="text-right font-medium">{value}</span></div>
}

function WeightCompareBar({ actualWeight, volumetricWeight }: { actualWeight: number; volumetricWeight: number }) {
  const maxWeight = Math.max(actualWeight, volumetricWeight, 1)
  return <div className="space-y-3 rounded-md border border-slate-200 p-4 dark:border-white/10"><CompareItem label="总毛重" value={`${formatNumber(actualWeight, 2)} kg`} width={Math.max(4, Math.min(100, actualWeight / maxWeight * 100))} className="bg-slate-500" /><CompareItem label="总体积重" value={`${formatNumber(volumetricWeight, 2)} kg`} width={Math.max(4, Math.min(100, volumetricWeight / maxWeight * 100))} className="bg-emerald-500" /></div>
}

function CompareItem({ label, value, width, className }: { label: string; value: string; width: number; className: string }) {
  return <div><div className="mb-1 flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn('h-full rounded-full', className)} style={{ width: `${width}%` }} /></div></div>
}
