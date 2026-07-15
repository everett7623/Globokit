// 名称: 外贸报价结果
// 描述: 展示报价概览、成本结构和报价口径提示
// 路径: Globokit/app/tools/quote-calculator/quote-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Check, Copy, DollarSign, Info, Package, Percent, ReceiptText, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { QuoteMode, QuoteResult } from '@/lib/tools/quote-calculator'
import { formatCny, formatPercent, type QuoteCurrency } from './quote-page-data'

export function QuoteStats({ result, formatForeign }: { result: QuoteResult; formatForeign: (value: number) => string }) {
  const cards = [
    { label: '报价单价', value: formatForeign(result.quotedUnitPriceForeign), note: '每件商品', icon: DollarSign, tone: '' },
    { label: '销售利润率', value: formatPercent(result.marginPercent), note: '按销售额口径', icon: Percent, tone: result.marginPercent >= 0 ? 'text-emerald-600' : 'text-red-600' },
    { label: '预估利润', value: formatCny(result.profitCny), note: '扣除费用后', icon: TrendingUp, tone: result.profitCny >= 0 ? 'text-emerald-600' : 'text-red-600' },
    { label: '订单数量', value: result.quantity, note: '件 / 套', icon: Package, tone: '' },
  ]
  return <div className="mb-6 grid gap-4 md:grid-cols-4">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{card.label}</CardTitle></CardHeader><CardContent><div className={cn('text-2xl font-bold', card.tone)}>{card.value}</div><p className="text-xs text-muted-foreground">{card.note}</p></CardContent></Card> })}</div>
}

interface QuoteResultsProps { result: QuoteResult | null; mode: QuoteMode; currency: QuoteCurrency; copied: boolean; formatForeign: (value: number) => string; onCopy: () => void }

export function QuoteResults(props: QuoteResultsProps) {
  const rows = props.result?.costRows ?? []
  const included = rows.filter((row) => row.included && row.value > 0)
  const excluded = rows.filter((row) => !row.included && row.value > 0)
  const maxCost = Math.max(...rows.map((row) => Math.abs(row.value)), 1)
  const result = props.result
  return <div className="space-y-6">
    <Card>
      <CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle className="flex items-center gap-2"><ReceiptText className="h-5 w-5" />报价结果</CardTitle><CardDescription>以当前参数测算出的单价、利润和成本结构</CardDescription></div>{result && <Button variant="outline" size="sm" onClick={props.onCopy}>{props.copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}{props.copied ? '已复制' : '复制'}</Button>}</div></CardHeader>
      <CardContent>{result ? <div className="space-y-5">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4"><div className="flex items-center justify-between gap-4"><span className="text-sm font-medium text-emerald-800">{props.mode === 'target-margin' ? '建议报价单价' : '当前报价单价'}</span><Badge variant="outline" className="border-0 bg-white text-emerald-700 shadow-sm">{props.currency}</Badge></div><div className="mt-3 text-4xl font-bold text-emerald-700">{props.formatForeign(result.quotedUnitPriceForeign)}</div><p className="mt-2 text-sm text-emerald-800/80">盈亏平衡单价 {props.formatForeign(result.breakevenUnitPriceForeign)}</p></div>
        <div className="grid gap-3 sm:grid-cols-2"><ValueBox label="订单总额" value={props.formatForeign(result.totalQuoteForeign)} /><ValueBox label="人民币收入" value={formatCny(result.revenueCny)} /><ValueBox label="综合成本" value={formatCny(result.effectiveCostCny)} note={`${result.quoteTerm} 计入卖方成本`} /><ValueBox label="加价率" value={formatPercent(result.markupPercent)} /></div>
        <div className="space-y-3"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold">卖方计入成本</h3><span className="text-xs text-muted-foreground">{result.quoteTerm} 条款口径</span></div><div className="space-y-3">{included.map((row) => <CostBar key={row.key} label={row.label} value={row.value} maxCost={maxCost} />)}{result.rebateAmountCny > 0 && <CostBar label="退税抵扣" value={result.rebateAmountCny} maxCost={maxCost} rebate />}</div></div>
        <div className="rounded-lg border border-dashed p-4"><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-semibold">未计入报价的后续费用</h3><span className="text-sm font-semibold">{formatCny(result.excludedCostCny)}</span></div><div className="mt-3 space-y-2">{excluded.length ? excluded.map((row) => <div key={row.key} className="flex items-center justify-between gap-3 text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-medium">{formatCny(row.value)}</span></div>) : <p className="text-sm text-muted-foreground">当前输入中没有被买方或后续环节承担的费用。</p>}</div></div>
      </div> : <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">调整参数后查看报价测算结果</div>}</CardContent>
    </Card>
    <Card className="bg-muted/40"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />报价口径提示</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>• 销售利润率按利润除以销售额计算，适合报价时控制毛利底线。</p><p>• 退税金额按含税采购价、增值税率和退税率估算，实际申报以财务口径为准。</p><p>• CFR/CIF/CPT/CIP/DAP/DPU/DDP 等含运输或到门条款，需要先确认货代、保险、目的地或税费报价再输入。</p></CardContent></Card>
  </div>
}

function ValueBox({ label, value, note }: { label: string; value: string; note?: string }) { return <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p>{note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}</div> }
function CostBar({ label, value, maxCost, rebate = false }: { label: string; value: number; maxCost: number; rebate?: boolean }) { return <div className="space-y-1"><div className="flex items-center justify-between gap-3 text-sm"><span className="text-muted-foreground">{label}</span><span className={cn('font-medium', rebate && 'text-emerald-600')}>{rebate && '-'}{formatCny(value)}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn('h-full rounded-full', rebate ? 'bg-emerald-500' : 'bg-slate-500')} style={{ width: `${Math.max(4, Math.min(100, Math.abs(value) / maxCost * 100))}%` }} /></div></div> }
