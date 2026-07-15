// 名称: 进口成本结果
// 描述: 展示到岸成本概览、成本拆分与销售口径
// 路径: Globokit/app/tools/import-landed-cost-calculator/import-cost-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import type { ComponentType } from 'react'
import { Calculator, DollarSign, Package, Percent, ReceiptText, Ship, TrendingUp, Truck, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ImportCurrency, ImportLandedCostResult } from '@/lib/tools/import-landed-cost-calculator'
import { formatCny, formatNumber, formatPercent } from './import-cost-page-data'

export function ImportCostStats({ result }: { result: ImportLandedCostResult }) {
  const cards: Array<{ label: string; value: string; caption: string; icon: ComponentType<{ className?: string }>; tone?: string }> = [
    { label: '到岸总成本', value: formatCny(result.totalLandedCostCny), caption: 'CIF + 税费 + 本地费用', icon: Wallet },
    { label: '每件到岸成本', value: formatCny(result.unitLandedCostCny), caption: `${result.quantity} 件平均分摊`, icon: Package },
    { label: '税费合计', value: formatCny(result.totalTaxCny), caption: `关税 ${formatCny(result.dutyCny)} · 增值税 ${formatCny(result.vatCny)}`, icon: ReceiptText },
    { label: '销售毛利率', value: formatPercent(result.grossMarginPercent), caption: `预估毛利 ${formatCny(result.grossProfitCny)}`, icon: TrendingUp, tone: result.grossProfitCny >= 0 ? 'text-emerald-600' : 'text-red-600' },
  ]
  return <div className="grid gap-4 md:grid-cols-4">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{card.label}</CardTitle></CardHeader><CardContent><div className={cn('text-2xl font-bold', card.tone)}>{card.value}</div><p className="text-xs text-muted-foreground">{card.caption}</p></CardContent></Card> })}</div>
}

export function ImportCostResults({ result, currency }: { result: ImportLandedCostResult; currency: ImportCurrency }) {
  const maxCost = Math.max(...result.costBreakdown.map((row) => row.value), 1)
  return <div className="space-y-6">
    <Card>
      <CardHeader><CardTitle className="flex items-center justify-between gap-3"><span>成本拆分</span><Badge variant="secondary">{currency}</Badge></CardTitle><CardDescription>CIF {formatCny(result.cifCny)} · 本地费用 {formatCny(result.localCostCny)}</CardDescription></CardHeader>
      <CardContent className="space-y-4">{result.costBreakdown.map((row) => <div key={row.key} className="space-y-1"><div className="flex items-center justify-between gap-3 text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-medium">{formatCny(row.value)}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn('h-full rounded-full', row.key === 'goods' ? 'bg-emerald-500' : row.key === 'vat' ? 'bg-amber-500' : 'bg-slate-500')} style={{ width: `${Math.max(3, Math.min(100, row.value / maxCost * 100))}%` }} /></div><p className="text-right text-[11px] text-muted-foreground">{formatPercent(row.sharePercent)}</p></div>)}<div className="rounded-md border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-300/20 dark:bg-emerald-300/10"><div className="flex items-center justify-between gap-4"><span className="text-sm font-medium text-emerald-800 dark:text-emerald-100">到岸总成本</span><span className="text-2xl font-bold text-emerald-900 dark:text-white">{formatCny(result.totalLandedCostCny)}</span></div></div></CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Ship className="h-5 w-5" />到岸口径</CardTitle><CardDescription>用于进口报价、销售定价和订单利润预估</CardDescription></CardHeader>
      <CardContent className="space-y-3"><ResultRow label="CIF 折算" value={formatCny(result.cifCny)} icon={DollarSign} /><ResultRow label="增值税计税基数" value={formatCny(result.vatBaseCny)} icon={ReceiptText} /><ResultRow label="清关本地费用" value={formatCny(result.localCostCny)} icon={Truck} /><ResultRow label="每件到岸成本" value={formatCny(result.unitLandedCostCny)} icon={Package} /><ResultRow label="销售加价率" value={formatPercent(result.markupPercent)} icon={Percent} /><ResultRow label="销售收入" value={formatCny(result.salesRevenueCny)} icon={Wallet} /><ResultRow label="进口数量" value={`${formatNumber(result.quantity, 0)} 件`} icon={Calculator} /></CardContent>
    </Card>
  </div>
}

function ResultRow({ label, value, icon: Icon }: { label: string; value: string; icon: ComponentType<{ className?: string }> }) { return <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm"><span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</span><span className="text-right font-medium">{value}</span></div> }
