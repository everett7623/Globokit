// 名称: 快递专线比价结果
// 描述: 展示常用泡重口径、货代报价方式、计费依据和费用排名
// 路径: Globokit/app/tools/express-channel-comparison/express-comparison-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-24

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, CircleDollarSign, Info, Package, Plane, Scale, Timer, Trophy } from 'lucide-react'
import { calculateAirFreight } from '@/lib/tools/air-freight-calculator'
import {
  EXPRESS_PRICING_MODE_LABELS,
  EXPRESS_SERVICE_LABELS,
  EXPRESS_TRADE_TERM_LABELS,
  type ExpressChannelResult,
} from '@/lib/tools/express-channel-comparison'
import { formatNumber, money, toNumber, type ShipmentForm } from './express-comparison-page-data'

export function ExpressWeightSummary({ shipment }: { shipment: ShipmentForm }) {
  const weightRows = [
    { label: '商业快递', divisor: 5000, icon: Package },
    { label: '空运', divisor: 6000, icon: Plane },
    { label: '经济专线', divisor: 7000, icon: Box },
  ].map((item) => ({ ...item, result: calculateWeight(shipment, item.divisor) }))
  const actualWeight = weightRows[0].result.actualWeightKg

  return <div className="grid gap-4 md:grid-cols-4">
    <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Scale className="h-4 w-4" />总实重</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{formatNumber(actualWeight)} kg</div><p className="text-xs text-muted-foreground">毛重 × 箱数</p></CardContent></Card>
    {weightRows.map((row) => { const Icon = row.icon; const volumetric = row.result.billingBasis === 'volumetric'; return <Card key={row.divisor}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Icon className="h-4 w-4" />{row.label} /{row.divisor}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{formatNumber(row.result.volumetricWeightKg)} kg</div><p className="text-xs text-muted-foreground">{volumetric ? '体积重大于实重' : '体积重未超过实重'}</p></CardContent></Card> })}
  </div>
}

export function ExpressComparisonStats({ results }: { results: ExpressChannelResult[] }) {
  if (!results.length) return null
  const cheapest = results.find((row) => row.costRank === 1)
  const fastest = results.find((row) => row.speedRank === 1)
  const cards = [
    { label: '最低成本', value: cheapest?.name ?? '-', caption: money.format(cheapest?.totalCostCny ?? 0), icon: Trophy },
    { label: '最快渠道', value: fastest?.name ?? '-', caption: `${fastest?.transitDaysMin ?? 0}-${fastest?.transitDaysMax ?? 0} 天`, icon: Timer },
    { label: '有效报价', value: `${results.length} 个`, caption: '仅统计已填写价格的渠道', icon: CircleDollarSign },
  ]
  return <div className="grid gap-4 md:grid-cols-3">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Icon className="h-4 w-4" />{card.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{card.value}</div><p className="text-xs text-muted-foreground">{card.caption}</p></CardContent></Card> })}</div>
}

export function ExpressComparisonResults({ results }: { results: ExpressChannelResult[] }) {
  if (!results.length) return <Alert><Info className="h-4 w-4" /><AlertDescription>填写至少一个货代报价后显示计费口径和对比结果。</AlertDescription></Alert>
  return <div className="grid gap-4 lg:grid-cols-3">{[...results].sort((a, b) => a.costRank - b.costRank).map((row) => <ResultCard key={row.id} row={row} />)}</div>
}

function ResultCard({ row }: { row: ExpressChannelResult }) {
  const volumetric = row.billingBasis === 'volumetric'
  const pricingDetail = row.pricingMode === 'per-kg'
    ? `${money.format(row.quoteAmountCny)}/kg × ${formatNumber(row.chargeableWeightKg)} kg`
    : row.pricingMode === 'all-in' ? '货代给出最终整票价格' : '整票基础价另加录入附加费'
  const ddpNote = row.tradeTerm === 'DDP'
    ? 'DDP 报价按包税到门理解，仍需确认偏远、查验、退件和超规格等例外。'
    : `${EXPRESS_TRADE_TERM_LABELS[row.tradeTerm]}不包含进口税费，请勿与 DDP 总价直接视为同一范围。`

  return <Card className={row.costRank === 1 ? 'border-emerald-300' : ''}>
    <CardHeader>
      <CardTitle className="flex items-start justify-between gap-3"><span className="min-w-0 break-words">{row.name}</span><Badge variant={row.costRank === 1 ? 'default' : 'secondary'} className="shrink-0">成本第 {row.costRank}</Badge></CardTitle>
      <CardDescription>{EXPRESS_SERVICE_LABELS[row.serviceType]} · {EXPRESS_TRADE_TERM_LABELS[row.tradeTerm]} · {row.transitDaysMin}-{row.transitDaysMax} 天</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div><p className="text-sm text-muted-foreground">费用合计</p><p className="text-3xl font-bold">{money.format(row.totalCostCny)}</p></div>
      <div className="flex flex-wrap gap-2"><Badge variant={volumetric ? 'destructive' : 'secondary'}>{volumetric ? '按体积重计费' : '按实重计费'}</Badge><Badge variant="outline">{EXPRESS_PRICING_MODE_LABELS[row.pricingMode]}</Badge><Badge variant="outline">/{formatNumber(row.divisor, 0)}</Badge></div>
      <div className="space-y-2 rounded-md border p-3 text-sm">
        <ResultRow label="总实重" value={`${formatNumber(row.actualWeightKg)} kg`} />
        <ResultRow label="总体积重" value={`${formatNumber(row.volumetricWeightKg)} kg`} />
        <ResultRow label="计费重量" value={`${formatNumber(row.chargeableWeightKg)} kg`} strong />
        <ResultRow label="折合单价" value={`${money.format(row.perKgCny)}/kg`} />
        <ResultRow label="每箱费用" value={money.format(row.perPackageCny)} />
      </div>
      <div className="rounded-md bg-muted/50 p-3"><p className="text-xs font-medium text-foreground">货代报价口径</p><p className="mt-1 text-sm text-muted-foreground">{pricingDetail}</p></div>
      <p className="text-xs leading-5 text-muted-foreground">{ddpNote}</p>
    </CardContent>
  </Card>
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">{label}</span><span className={strong ? 'font-semibold' : 'font-medium'}>{value}</span></div>
}

function calculateWeight(shipment: ShipmentForm, divisor: number) {
  return calculateAirFreight({
    lengthCm: toNumber(shipment.lengthCm), widthCm: toNumber(shipment.widthCm), heightCm: toNumber(shipment.heightCm),
    grossWeightKg: toNumber(shipment.grossWeightKg), netWeightKg: toNumber(shipment.netWeightKg), quantity: toNumber(shipment.packageCount),
    divisor, ratePerKg: 0, minCharge: 0, fuelSurchargePercent: 0, handlingFee: 0,
  })
}
