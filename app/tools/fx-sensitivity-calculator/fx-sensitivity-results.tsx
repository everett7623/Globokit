// 名称: 外贸汇率敏感性分析结果
// 描述: 展示盈亏平衡汇率、利润波动范围与三个汇率情景
// 路径: Globokit/app/tools/fx-sensitivity-calculator/fx-sensitivity-results.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { BadgeCheck, CircleDollarSign, Info, TrendingDown, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { FxScenarioResult, FxSensitivityResult } from '@/lib/tools/fx-sensitivity-calculator'
import { formatMoney, formatPercent, formatRate, formatRateUnit } from './fx-sensitivity-page-data'

export function FxSensitivityStats({ result }: { result: FxSensitivityResult }) {
  const base = result.results.find((scenario) => scenario.id === 'base') ?? result.results[0]
  const best = result.results.find((scenario) => scenario.id === result.bestScenarioId) ?? result.results[0]
  const stats = [
    { label: '基准实际利润', value: formatMoney(base.profitCny), note: formatPercent(base.marginPercent), icon: CircleDollarSign, tone: base.profitCny >= 0 ? 'text-emerald-600' : 'text-red-600' },
    { label: '盈亏平衡汇率', value: formatRate(result.breakEvenRate), note: formatRateUnit(result.currency, result.rateUnit), icon: BadgeCheck, tone: 'text-sky-700' },
    { label: '最佳情景', value: best.label, note: `${formatMoney(best.profitCny)} 实际利润`, icon: TrendingUp, tone: 'text-emerald-600' },
    { label: '利润波动范围', value: formatMoney(result.profitRangeCny), note: '升值到贬值情景', icon: TrendingDown, tone: 'text-amber-600' },
  ]
  return <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <Card key={stat.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{stat.label}</CardTitle></CardHeader><CardContent><div className={cn('break-words text-xl font-bold', stat.tone)}>{stat.value}</div><p className="mt-1 text-xs text-muted-foreground">{stat.note}</p></CardContent></Card> })}</div>
}

export function FxSensitivityResults({ result }: { result: FxSensitivityResult }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>汇率情景对比</CardTitle><CardDescription>每单位 {result.currency} 折算的 CNY 汇率变化，会直接影响人民币收入和订单利润。</CardDescription></CardHeader>
        <CardContent className="space-y-4">{result.results.map((scenario) => <ScenarioRow key={scenario.id} scenario={scenario} rateUnitLabel={formatRateUnit(result.currency, result.rateUnit)} best={scenario.id === result.bestScenarioId} worst={scenario.id === result.worstScenarioId} />)}</CardContent>
      </Card>
      <Card className="bg-muted/30">
        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-5 w-5" />计算口径</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground"><p>收入按外币订单金额乘以情景汇率折算为 CNY，收款手续费按折算后的人民币收入计提。</p><p>盈亏平衡汇率表示在当前成本和手续费率下，订单利润为零所需的最低汇率。</p><p>情景汇率为预算假设，不代表银行实时牌价、远期结售汇报价或实际汇兑损益。</p></CardContent>
      </Card>
    </div>
  )
}

function ScenarioRow({ scenario, rateUnitLabel, best, worst }: { scenario: FxScenarioResult; rateUnitLabel: string; best: boolean; worst: boolean }) {
  return <div className={cn('rounded-md border p-4', best && 'border-emerald-300 bg-emerald-50/70 dark:border-cyan-300/30 dark:bg-cyan-300/10', worst && 'border-rose-300 bg-rose-50/40 dark:border-rose-300/30')}>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-base font-semibold">{scenario.label}</span>{best && <Badge>最佳</Badge>}{worst && <Badge variant="destructive">最差</Badge>}</div><p className="mt-1 text-xs text-muted-foreground">{formatRate(scenario.rate)} {rateUnitLabel} · 汇率变化 {scenario.rateChangePercent > 0 ? '+' : ''}{formatPercent(scenario.rateChangePercent)}</p></div><div className="text-left sm:text-right"><p className="text-xs text-muted-foreground">实际利润</p><p className={cn('mt-1 text-xl font-bold tabular-nums', scenario.profitCny >= 0 ? 'text-emerald-700 dark:text-cyan-200' : 'text-red-600')}>{formatMoney(scenario.profitCny)}</p><p className="text-xs text-muted-foreground">利润变化 {formatMoney(scenario.profitDeltaCny)}</p></div></div>
    <div className="mt-4 grid gap-3 sm:grid-cols-3"><Value label="人民币收入" value={formatMoney(scenario.revenueCny)} /><Value label="收款手续费" value={formatMoney(scenario.settlementFeeCny)} /><Value label="成本合计" value={formatMoney(scenario.totalCostCny)} /></div>
  </div>
}

function Value({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-semibold tabular-nums">{value}</p></div>
}
