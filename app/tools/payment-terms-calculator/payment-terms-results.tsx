// 名称: 收款账期成本对比结果
// 描述: 展示推荐方案、利润排名与成本明细
// 路径: Globokit/app/tools/payment-terms-calculator/payment-terms-results.tsx
// 作者: everettlabs
// 更新时间: 2026-08-10

import { BadgeCheck, CalendarDays, CircleDollarSign, Info, Landmark, TrendingUp, WalletCards } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { cn } from '@/lib/utils'
import type { PaymentTermResult, PaymentTermsResult } from '@/lib/tools/payment-terms-calculator'
import { formatDays, formatMoney, formatPercent } from './payment-terms-page-data'

export function PaymentTermsStats({ result }: { result: PaymentTermsResult }) {
  const best = result.results.find((term) => term.id === result.bestTermId) ?? result.results[0]
  const stats = [
    { label: '首选方案', value: best.name, note: '按实际利润排序', icon: BadgeCheck, tone: 'text-emerald-700 dark:text-cyan-200' },
    { label: '预计实际利润', value: formatMoney(best.effectiveProfit), note: formatPercent(best.effectiveMarginPercent), icon: TrendingUp, tone: best.effectiveProfit >= 0 ? 'text-emerald-600' : 'text-red-600' },
    { label: '相对最高成本节省', value: formatMoney(result.costSavingAgainstWorst), note: '同一订单口径', icon: CircleDollarSign, tone: 'text-amber-600' },
    { label: '资金缺口', value: formatMoney(best.fundingGap), note: `${formatDays(best.weightedCollectionDays)} 加权回款`, icon: WalletCards, tone: '' },
  ]
  return <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{stat.label}</CardTitle></CardHeader><CardContent><div className={cn('break-words text-xl font-bold', stat.tone)}>{stat.value}</div><p className="mt-1 text-xs text-muted-foreground">{stat.note}</p></CardContent></Card> })}</div>
}

export function PaymentTermsResults({ result, summaryText }: { result: PaymentTermsResult; summaryText: string }) {
  const ranked = [...result.results].sort((a, b) => a.rank - b.rank)
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />方案对比</CardTitle>
              <CardDescription>扣除资金、收款和风险成本后的实际表现</CardDescription>
            </div>
            <EnhancedCopyButton text={summaryText} variant="outline" size="sm">复制</EnhancedCopyButton>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {ranked.map((term) => <TermResult key={term.id} term={term} best={term.id === result.bestTermId} />)}
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />计算口径</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          <p>资金成本按“订单总成本在订单确认日投入、尾款到账时释放”的保守口径估算。</p>
          <p>风险准备金仅对未预收的尾款计提，用于横向比较信用、拒付和汇率波动风险，不代表实际损失。</p>
          <p>L/C 银行费、平台费或中转行费率因机构而异，应以实际报价覆盖预设参数。</p>
        </CardContent>
      </Card>
    </div>
  )
}

function TermResult({ term, best }: { term: PaymentTermResult; best: boolean }) {
  const rows = [
    { label: '资金成本', value: term.fundingCost },
    { label: '收款手续费', value: term.collectionFee },
    { label: '风险准备金', value: term.riskReserve },
  ]
  return (
    <div className={cn('rounded-md border p-4', best ? 'border-emerald-300 bg-emerald-50/70 dark:border-cyan-300/30 dark:bg-cyan-300/10' : 'bg-background')}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold">{term.name}</span>
            <Badge variant={best ? 'default' : 'outline'}>{best ? '首选' : `第 ${term.rank} 名`}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">预付 {formatPercent(term.advancePercent)} · 发货后 {term.daysAfterShipment} 天 · 加权回款 {formatDays(term.weightedCollectionDays)}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-muted-foreground">预计实际利润</p>
          <p className={cn('mt-1 text-xl font-bold tabular-nums', term.effectiveProfit >= 0 ? 'text-emerald-700 dark:text-cyan-200' : 'text-red-600')}>{formatMoney(term.effectiveProfit)}</p>
          <p className="text-xs text-muted-foreground">实际利润率 {formatPercent(term.effectiveMarginPercent)}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Value label="预收金额" value={formatMoney(term.advanceAmount)} />
        <Value label="资金缺口" value={formatMoney(term.fundingGap)} />
      </div>
      <div className="mt-4 space-y-2 border-t pt-4">
        {rows.map((row) => <div key={row.label} className="flex items-center justify-between gap-4 text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-medium tabular-nums">{formatMoney(row.value)}</span></div>)}
        <div className="flex items-center justify-between gap-4 border-t pt-2 text-sm font-semibold"><span>条款总成本</span><span className="tabular-nums text-amber-700 dark:text-amber-300">{formatMoney(term.totalTermCost)}</span></div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />尾款预计在订单后第 {term.collectionDay} 天到账</div>
    </div>
  )
}

function Value({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-semibold tabular-nums">{value}</p></div>
}
