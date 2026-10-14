// 名称: 信用证远期贴现计算器
// 描述: 测算远期信用证贴现到手净额与实际年化成本，对比即期收款
// 路径: Globokit/app/tools/lc-discount-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-12

'use client'

import { useMemo, useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { Info, TrendingDown } from 'lucide-react'
import { DEFAULT_LC_DISCOUNT_INPUTS, buildLcDiscountSummary, calculateLcDiscount } from '@/lib/tools/lc-discount-calculator'
import { LcDiscountForm, type LcDiscountFormState } from './lc-discount-form'

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export default function LcDiscountCalculatorPage() {
  const [form, setForm] = useState<LcDiscountFormState>({
    faceAmount: String(DEFAULT_LC_DISCOUNT_INPUTS.faceAmount),
    currency: DEFAULT_LC_DISCOUNT_INPUTS.currency,
    tenorDays: String(DEFAULT_LC_DISCOUNT_INPUTS.tenorDays),
    discountRatePercent: String(DEFAULT_LC_DISCOUNT_INPUTS.discountRatePercent),
    acceptanceFeePercent: String(DEFAULT_LC_DISCOUNT_INPUTS.acceptanceFeePercent),
    cableFee: String(DEFAULT_LC_DISCOUNT_INPUTS.cableFee),
    sightFeePercent: String(DEFAULT_LC_DISCOUNT_INPUTS.sightFeePercent),
  })

  const calculation = useMemo(() => {
    try {
      return {
        result: calculateLcDiscount({
          faceAmount: toNumber(form.faceAmount),
          currency: form.currency,
          tenorDays: toNumber(form.tenorDays),
          discountRatePercent: toNumber(form.discountRatePercent),
          acceptanceFeePercent: toNumber(form.acceptanceFeePercent),
          cableFee: toNumber(form.cableFee),
          sightFeePercent: toNumber(form.sightFeePercent),
        }),
        error: '',
      }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '贴现测算无法计算，请检查输入' }
    }
  }, [form])

  const money = (value: number) => `${value.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${form.currency || 'USD'}`

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">信用证远期贴现计算器</h1>
        <p className="text-muted-foreground">远期信用证承兑后想提前回款？输入贴现率与费用，测算到手净额与实际年化成本，并与即期收款对比再做决定。</p>
      </div>

      {calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: () => setForm({ ...form, faceAmount: '100000', tenorDays: '90', discountRatePercent: '4.5', acceptanceFeePercent: '0.125', cableFee: '100', sightFeePercent: '0.8' }) }} className="mb-6" />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.1fr)]">
        <LcDiscountForm form={form} onChange={(patch) => setForm((current) => ({ ...current, ...patch }))} onReset={() => setForm({
          faceAmount: String(DEFAULT_LC_DISCOUNT_INPUTS.faceAmount),
          currency: DEFAULT_LC_DISCOUNT_INPUTS.currency,
          tenorDays: String(DEFAULT_LC_DISCOUNT_INPUTS.tenorDays),
          discountRatePercent: String(DEFAULT_LC_DISCOUNT_INPUTS.discountRatePercent),
          acceptanceFeePercent: String(DEFAULT_LC_DISCOUNT_INPUTS.acceptanceFeePercent),
          cableFee: String(DEFAULT_LC_DISCOUNT_INPUTS.cableFee),
          sightFeePercent: String(DEFAULT_LC_DISCOUNT_INPUTS.sightFeePercent),
        })} />

        {calculation.result ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2"><TrendingDown className="h-5 w-5" />贴现测算</CardTitle>
                    <CardDescription>面值 {money(calculation.result.faceAmount)} · 远期 {calculation.result.tenorDays} 天</CardDescription>
                  </div>
                  <EnhancedCopyButton text={buildLcDiscountSummary(calculation.result)} variant="outline" size="sm">复制</EnhancedCopyButton>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border bg-emerald-50/70 px-4 py-3 dark:border-cyan-300/20 dark:bg-cyan-300/10">
                  <p className="text-xs text-muted-foreground">到手净额</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-700 dark:text-cyan-200">{money(calculation.result.netProceeds)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">实际年化成本 {calculation.result.effectiveAnnualRatePercent}% · 成本占面值 {calculation.result.costToFacePercent}%</p>
                </div>
                <div className="space-y-2">
                  <Row label="贴现利息" value={money(calculation.result.discountInterest)} />
                  <Row label="承兑手续费" value={money(calculation.result.acceptanceFee)} />
                  <Row label="邮电/单据处理费" value={money(calculation.result.cableFee)} />
                  <div className="flex items-center justify-between gap-4 border-t pt-2 text-sm font-semibold">
                    <span>总成本</span>
                    <span className="tabular-nums text-amber-700 dark:text-amber-300">{money(calculation.result.totalCost)}</span>
                  </div>
                </div>
                {calculation.result.sightComparison.enabled && (
                  <div className="rounded-md border bg-muted/20 p-3 text-sm leading-6 text-muted-foreground">
                    <p className="font-medium text-slate-700 dark:text-slate-200">与即期收款对比</p>
                    <p className="mt-1">即期净额 {money(calculation.result.sightComparison.sightNet)}</p>
                    <p className="mt-1">{calculation.result.sightComparison.note}</p>
                  </div>
                )}
                {calculation.result.warnings.length > 0 && (
                  <div className="space-y-1.5 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200">
                    {calculation.result.warnings.map((warning) => (
                      <p key={warning} className="flex items-start gap-2"><Info className="mt-0.5 h-4 w-4 shrink-0" />{warning}</p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看贴现测算</div>
        )}
      </div>
    </MobileFriendlyWrapper>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium tabular-nums">{value}</span></div>
}
