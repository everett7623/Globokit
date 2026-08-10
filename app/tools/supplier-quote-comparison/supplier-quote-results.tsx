// 名称: 供应商报价对比结果
// 描述: 展示现金成本、交期、首付排名与标准化采购明细
// 路径: Globokit/app/tools/supplier-quote-comparison/supplier-quote-results.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { BadgeCheck, Clock3, Info, TrendingDown, WalletCards } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { SupplierQuoteComparisonResult, SupplierQuoteResult } from '@/lib/tools/supplier-quote-comparison'
import { formatMoney, formatPercent, formatQuantity } from './supplier-quote-page-data'

export function SupplierQuoteStats({ result }: { result: SupplierQuoteComparisonResult }) {
  const best = findSupplier(result, result.bestCostSupplierId)
  const fastest = findSupplier(result, result.fastestSupplierId)
  const lowestDeposit = findSupplier(result, result.lowestDepositSupplierId)
  const stats = [
    { label: '现金总成本最低', value: best.name, note: formatMoney(best.totalAcquisitionCost, result.currency), icon: BadgeCheck },
    { label: '交期最快', value: fastest.name, note: `${fastest.leadTimeDays} 天`, icon: Clock3 },
    { label: '首付占用最低', value: lowestDeposit.name, note: formatMoney(lowestDeposit.depositAmount, result.currency), icon: WalletCards },
    { label: '最高可节省', value: formatMoney(result.costSpread, result.currency), note: `最低成本的 ${formatPercent(result.costSpreadPercent)}`, icon: TrendingDown },
  ]
  return <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4 shrink-0" />{stat.label}</CardTitle></CardHeader><CardContent><div className="break-words text-xl font-bold">{stat.value}</div><p className="mt-1 break-words text-xs text-muted-foreground">{stat.note}</p></CardContent></Card> })}</div>
}

export function SupplierQuoteResults({ result }: { result: SupplierQuoteComparisonResult }) {
  return <div className="space-y-4"><div><h2 className="text-lg font-semibold">供应商排名与明细</h2><p className="mt-1 text-sm text-muted-foreground">按满足 {formatQuantity(result.requiredGoodUnits)}计划合格品需求后的现金采购成本排序。</p></div>{[...result.suppliers].sort((a, b) => a.costRank - b.costRank).map((supplier) => <SupplierResult key={supplier.id} supplier={supplier} result={result} />)}<Card className="bg-muted/30"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />比较口径</CardTitle></CardHeader><CardContent className="space-y-2 text-sm leading-6 text-muted-foreground"><p>采购数量先按次品预留率反推，再与 MOQ 取较大值；合格品和剩余数量均为期望值，不是质量承诺。</p><p>含税报价拆出 VAT，未税报价加计 VAT，排名按含税货款、固定费用和国内运费的现金合计计算。</p><p>VAT 不自动抵扣或计入出口退税。成本排名也不代表质量、履约能力和供应风险的综合排名。</p></CardContent></Card></div>
}

function SupplierResult({ supplier, result }: { supplier: SupplierQuoteResult; result: SupplierQuoteComparisonResult }) {
  const isFastest = supplier.id === result.fastestSupplierId
  const isLowestDeposit = supplier.id === result.lowestDepositSupplierId
  return <Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><CardTitle className="break-words">{supplier.name}</CardTitle><CardDescription>{supplier.taxMode === 'tax-inclusive' ? '含税' : '未税'}报价 {formatMoney(supplier.quotedUnitPrice, result.currency)}/件 · VAT {formatPercent(supplier.vatRatePercent)}</CardDescription></div><div className="flex flex-wrap gap-2"><Badge>成本第 {supplier.costRank}</Badge>{isFastest && <Badge variant="secondary">交期最快</Badge>}{isLowestDeposit && <Badge variant="secondary">首付最低</Badge>}{supplier.moqConstrained && <Badge variant="destructive">MOQ 抬量</Badge>}</div></div></CardHeader><CardContent className="space-y-4"><div><p className="text-xs text-muted-foreground">现金采购总成本</p><p className="mt-1 break-words text-2xl font-bold text-emerald-700 dark:text-cyan-200">{formatMoney(supplier.totalAcquisitionCost, result.currency)}</p><p className="break-words text-xs text-muted-foreground">计划数量摊销 {formatMoney(supplier.costPerRequiredUnit, result.currency)}/件{supplier.costDifferenceFromBest > 0 ? ` · 比最低方案高 ${formatMoney(supplier.costDifferenceFromBest, result.currency)}` : ' · 当前最低成本'}</p></div><div className="grid gap-3 sm:grid-cols-2"><Metric label="实际采购数量" value={formatQuantity(supplier.purchaseQuantity)} /><Metric label="预期合格品" value={formatQuantity(supplier.expectedGoodUnits)} /><Metric label="预期剩余合格品" value={formatQuantity(supplier.surplusGoodUnits)} /><Metric label="含税现金单价" value={formatMoney(supplier.cashUnitPrice, result.currency)} /><Metric label="货款首付" value={formatMoney(supplier.depositAmount, result.currency)} /><Metric label="剩余货款" value={formatMoney(supplier.goodsBalanceAmount, result.currency)} /><Metric label="交期" value={`${supplier.leadTimeDays} 天`} /><Metric label="合格品成本/件" value={formatMoney(supplier.costPerExpectedGoodUnit, result.currency)} /></div><div className="grid gap-2 border-t pt-4 text-sm"><CostRow label="未税货款" value={supplier.preTaxGoodsAmount} currency={result.currency} /><CostRow label="VAT 税额" value={supplier.vatAmount} currency={result.currency} /><CostRow label="固定费用" value={supplier.fixedFee} currency={result.currency} /><CostRow label="国内运费" value={supplier.domesticFreight} currency={result.currency} /></div></CardContent></Card>
}

function findSupplier(result: SupplierQuoteComparisonResult, id: string) {
  return result.suppliers.find((supplier) => supplier.id === id) ?? result.suppliers[0]
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 break-words font-semibold tabular-nums">{value}</p></div>
}

function CostRow({ label, value, currency }: { label: string; value: number; currency: SupplierQuoteComparisonResult['currency'] }) {
  return <div className="flex items-start justify-between gap-3"><span className="text-muted-foreground">{label}</span><span className="break-words text-right font-medium tabular-nums">{formatMoney(value, currency)}</span></div>
}
