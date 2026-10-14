// 名称: 收款方式风险速查
// 描述: 按风险等级与业务场景筛选外贸收款方式，展示要点与防坑建议
// 路径: Globokit/app/tools/payment-risk-guide/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-12

'use client'

import { useMemo, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PAYMENT_METHODS,
  RISK_META,
  SCENARIO_META,
  getPaymentStats,
  recommendMethods,
  type PaymentRiskLevel,
  type PaymentScenario,
} from '@/lib/tools/payment-risk-guide'
import { cn } from '@/lib/utils'

const RISK_ORDER: PaymentRiskLevel[] = ['low', 'medium', 'high', 'very-high']

export default function PaymentRiskGuidePage() {
  const [riskFilter, setRiskFilter] = useState<PaymentRiskLevel | 'all'>('all')
  const [scenarioFilter, setScenarioFilter] = useState<PaymentScenario | 'all'>('all')
  const stats = getPaymentStats()

  const visibleMethods = useMemo(() => (
    PAYMENT_METHODS.filter((method) =>
      (riskFilter === 'all' || method.riskLevel === riskFilter) &&
      (scenarioFilter === 'all' || method.scenarios.includes(scenarioFilter))
    )
  ), [riskFilter, scenarioFilter])

  const recommended = scenarioFilter === 'all' ? [] : recommendMethods(scenarioFilter)
  const recommendedIds = new Set(recommended.map((method) => method.id))

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">收款方式风险速查</h1>
        <p className="text-muted-foreground">T/T、L/C、D/P、D/A、O/A 一张表看懂风险等级、资金占用与防坑要点。先按场景筛，再看测算工具算具体成本。</p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="收录方式" value={String(stats.total)} />
        <StatCard label="低风险方式" value={String(stats.lowRisk)} note="银行信用或款到发货" />
        <StatCard label="极高风险方式" value={String(stats.veryHighRisk)} note="纯赊销，需信保对冲" />
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">风险等级</span>
          <FilterButton active={riskFilter === 'all'} onClick={() => setRiskFilter('all')}>全部</FilterButton>
          {RISK_ORDER.map((level) => (
            <FilterButton key={level} active={riskFilter === level} onClick={() => setRiskFilter(level)}>
              {RISK_META[level].label}
            </FilterButton>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">业务场景</span>
          <FilterButton active={scenarioFilter === 'all'} onClick={() => setScenarioFilter('all')}>全部</FilterButton>
          {(Object.keys(SCENARIO_META) as PaymentScenario[]).map((scenario) => (
            <FilterButton key={scenario} active={scenarioFilter === scenario} onClick={() => setScenarioFilter(scenario)}>
              {SCENARIO_META[scenario]}
            </FilterButton>
          ))}
        </div>
      </div>

      {recommended.length > 0 && (
        <Card className="mb-6 border-emerald-200 bg-emerald-50/60 dark:border-cyan-300/20 dark:bg-cyan-300/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-cyan-300" />{SCENARIO_META[scenarioFilter as PaymentScenario]}优先推荐（按资金安全排序）</CardTitle>
            <CardDescription>{recommended.map((method) => method.shortName).join(' → ')}</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="space-y-4">
        {visibleMethods.map((method) => {
          const risk = RISK_META[method.riskLevel]
          return (
            <Card key={method.id} className={cn(recommendedIds.has(method.id) && 'border-emerald-300 dark:border-cyan-300/40')}>
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">{method.name}</CardTitle>
                    <CardDescription className="mt-1">{method.summary}</CardDescription>
                  </div>
                  <Badge variant="outline" className={cn('shrink-0 px-2.5 py-1 text-xs font-semibold', risk.className)}>{risk.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                  <span>到账：{method.speed}</span>
                  <span>资金安全：{'★'.repeat(method.cashFlowScore)}{'☆'.repeat(5 - method.cashFlowScore)}</span>
                  <span>费用：{method.typicalCost}</span>
                </div>
                {method.scenarios.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {method.scenarios.map((scenario) => (
                      <span key={scenario} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/4 dark:text-slate-300">适用 {SCENARIO_META[scenario]}</span>
                    ))}
                  </div>
                )}
                <ul className="space-y-1.5 border-t pt-3 text-sm leading-6 text-muted-foreground">
                  {method.tips.map((tip) => <li key={tip} className="flex items-start gap-2"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-cyan-300" />{tip}</li>)}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </MobileFriendlyWrapper>
  )
}

function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white/80 p-4 shadow-lg shadow-slate-900/4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
      <p className="text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}{note ? ` · ${note}` : ''}</p>
    </div>
  )
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
        active ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:border-cyan-300/50 dark:bg-cyan-300/10 dark:text-cyan-200' : 'border-slate-200 bg-white/80 text-slate-600 hover:border-emerald-200 dark:border-white/10 dark:bg-white/4 dark:text-slate-300'
      )}
    >
      {children}
    </button>
  )
}
