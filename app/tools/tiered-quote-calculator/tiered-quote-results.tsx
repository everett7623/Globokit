// 名称: 外贸阶梯报价结果
// 描述: 展示最低单价、固定费摊薄和各数量档位利润明细
// 路径: Globokit/app/tools/tiered-quote-calculator/tiered-quote-results.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { BadgePercent, CircleDollarSign, Info, Layers3, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { TieredQuoteResult, TieredQuoteTierResult } from '@/lib/tools/tiered-quote-calculator'
import { formatCny, formatForeign, formatPercent } from './tiered-quote-page-data'

export function TieredQuoteStats({ result }: { result: TieredQuoteResult }) {
  const best = findTier(result, result.lowestUnitPriceTierId)
  const base = findTier(result, result.baseTierId)
  const largest = findTier(result, result.largestTierId)
  const stats = [
    { label: '最低建议单价', value: formatForeign(best.quotedUnitPriceForeign, result.currency), note: `${best.label} · ${best.quantity.toLocaleString('zh-CN')} 件`, icon: CircleDollarSign },
    { label: '最大单价降幅', value: formatPercent(result.maximumPriceReductionPercent), note: `相对 ${base.label}`, icon: TrendingDown },
    { label: '固定费单件摊薄', value: formatCny(result.fixedCostDilutionCnyPerUnit), note: `${base.quantity.toLocaleString('zh-CN')} → ${largest.quantity.toLocaleString('zh-CN')} 件`, icon: Layers3 },
    { label: '目标利润率', value: formatPercent(result.targetMarginPercent), note: `佣金及收款费 ${formatPercent(result.commissionPercent + result.paymentFeePercent)}`, icon: BadgePercent },
  ]
  return <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{stat.label}</CardTitle></CardHeader><CardContent><div className="break-words text-xl font-bold">{stat.value}</div><p className="mt-1 break-words text-xs text-muted-foreground">{stat.note}</p></CardContent></Card> })}</div>
}

export function TieredQuoteResults({ result }: { result: TieredQuoteResult }) {
  return <div className="space-y-4"><div><h2 className="text-lg font-semibold">阶梯报价结果</h2><p className="mt-1 text-sm text-muted-foreground">按订购数量从低到高排列，单价已应用向上取整步长。</p></div>{[...result.tiers].sort((a, b) => a.quantity - b.quantity).map((tier) => <TierResult key={tier.id} tier={tier} result={result} />)}<Card className="bg-muted/30"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />计算口径</CardTitle></CardHeader><CardContent className="space-y-2 text-sm leading-6 text-muted-foreground"><p>建议价先覆盖采购成本与每单固定费用，再预留佣金、收款费和目标销售利润率。</p><p>报价按设定步长向上取整，因此实际利润率可能略高于目标值；设为 0 可保留未取整建议价。</p><p>阶梯降价来自固定费用摊薄与用户录入的采购成本变化，不代表供应商承诺或最终成交折扣。</p></CardContent></Card></div>
}

function TierResult({ tier, result }: { tier: TieredQuoteTierResult; result: TieredQuoteResult }) {
  const isBase = tier.id === result.baseTierId
  const isLowest = tier.id === result.lowestUnitPriceTierId
  return <Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><CardTitle className="break-words">{tier.label}</CardTitle><CardDescription>{tier.quantity.toLocaleString('zh-CN')} 件 · 采购单价 {formatCny(tier.unitCostCny)}</CardDescription></div><div className="flex flex-wrap gap-2">{isBase && <Badge variant="secondary">最小数量</Badge>}{isLowest && <Badge>单价最低</Badge>}</div></div></CardHeader><CardContent className="space-y-4"><div><p className="text-xs text-muted-foreground">建议外币单价</p><p className="mt-1 break-words text-2xl font-bold text-emerald-700 dark:text-cyan-200">{formatForeign(tier.quotedUnitPriceForeign, result.currency)}</p><p className="break-words text-xs text-muted-foreground">订单总额 {formatForeign(tier.totalQuoteForeign, result.currency)} · 较最小数量降价 {formatPercent(tier.priceReductionVsBasePercent)}</p></div><div className="grid gap-3 sm:grid-cols-2"><Metric label="盈亏平衡单价" value={formatForeign(tier.breakEvenUnitPriceForeign, result.currency)} /><Metric label="实际利润率" value={formatPercent(tier.marginPercent)} /><Metric label="单件成本含固定费" value={formatCny(tier.allocatedCostPerUnitCny)} /><Metric label="固定费摊销/件" value={formatCny(tier.fixedCostPerUnitCny)} /><Metric label="预估订单利润" value={formatCny(tier.profitCny)} /><Metric label="采购成本节省" value={formatCny(tier.purchaseSavingVsBaseCny)} /></div><div className="grid gap-2 border-t pt-4 text-sm"><CostRow label="产品采购成本" value={tier.productCostCny} /><CostRow label="每单固定费用" value={result.fixedOrderCostCny} /><CostRow label="佣金与收款费" value={tier.variableFeeCny} /></div></CardContent></Card>
}

function findTier(result: TieredQuoteResult, id: string) {
  return result.tiers.find((tier) => tier.id === id) ?? result.tiers[0]
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words font-semibold tabular-nums">{value}</p></div>
}

function CostRow({ label, value }: { label: string; value: number }) {
  return <div className="flex items-center justify-between gap-3"><span className="text-muted-foreground">{label}</span><span className="font-medium tabular-nums">{formatCny(value)}</span></div>
}
