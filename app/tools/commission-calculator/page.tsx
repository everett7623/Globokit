// 名称: 阶梯佣金计算器
// 描述: 按累计销售额分段计提佣金，支持回款率折算与达标奖金
// 路径: Globokit/app/tools/commission-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

'use client'

import { useMemo, useState } from 'react'
import { Percent, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { createId } from '@/lib/utils'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Label } from '@/components/ui/label'
import { buildCommissionSummary, calculateCommission, type CommissionTierInput } from '@/lib/tools/commission-calculator'

interface TierFormState {
  id: string
  upToAmount: string
  ratePercent: string
}

interface CommissionFormState {
  salesAmount: string
  collectionPercent: string
  targetBonus: string
  bonusThresholdAmount: string
  tiers: TierFormState[]
}

function createInitialForm(): CommissionFormState {
  return {
    salesAmount: '1200000',
    collectionPercent: '90',
    targetBonus: '20000',
    bonusThresholdAmount: '1000000',
    tiers: [
      { id: 'tier-1', upToAmount: '500000', ratePercent: '2' },
      { id: 'tier-2', upToAmount: '1000000', ratePercent: '3' },
      { id: 'tier-3', upToAmount: '0', ratePercent: '4' },
    ],
  }
}

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export default function CommissionCalculatorPage() {
  const [form, setForm] = useState<CommissionFormState>(createInitialForm)

  const calculation = useMemo(() => {
    try {
      const result = calculateCommission({
        salesAmount: toNumber(form.salesAmount),
        collectionPercent: toNumber(form.collectionPercent),
        targetBonus: toNumber(form.targetBonus),
        bonusThresholdAmount: toNumber(form.bonusThresholdAmount),
        tiers: form.tiers.map((tier) => ({
          id: tier.id,
          upToAmount: toNumber(tier.upToAmount),
          ratePercent: toNumber(tier.ratePercent),
        })),
      })
      return { result, error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '佣金无法计算，请检查档位配置' }
    }
  }, [form])

  const updateTier = (tierId: string, field: 'upToAmount' | 'ratePercent', value: string) => setForm((current) => ({
    ...current,
    tiers: current.tiers.map((tier) => (tier.id === tierId ? { ...tier, [field]: value } : tier)),
  }))
  const addTier = () => setForm((current) => {
    if (current.tiers.length >= 5) return current
    const lastNonZero = [...current.tiers].reverse().find((tier) => tier.upToAmount !== '0')
    return { ...current, tiers: [...current.tiers, { id: createId('tier'), upToAmount: '0', ratePercent: lastNonZero ? String(toNumber(lastNonZero.ratePercent) + 1) : '2' }] }
  })
  const removeTier = (tierId: string) => setForm((current) => {
    if (current.tiers.length <= 2) return current
    return { ...current, tiers: current.tiers.filter((tier) => tier.id !== tierId) }
  })

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">阶梯佣金计算器</h1>
        <p className="text-muted-foreground">按累计销售额分段计提佣金（超额累进），支持回款率折算与达标奖金，输出分段明细与实际到手。</p>
      </div>

      {calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: () => setForm(createInitialForm()) }} className="mb-6" />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.05fr)]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><Percent className="h-5 w-5" />业绩与档位</CardTitle>
                <CardDescription>末档上限填 0 表示不封顶；中间档上限必须逐级递增</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setForm(createInitialForm())}>
                <RefreshCw className="mr-2 h-4 w-4" />重置
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField id="salesAmount" label="累计销售额" suffix="CNY" value={form.salesAmount} onChange={(value) => setForm((current) => ({ ...current, salesAmount: value }))} />
              <NumberField id="collectionPercent" label="回款率" suffix="%" value={form.collectionPercent} onChange={(value) => setForm((current) => ({ ...current, collectionPercent: value }))} />
              <NumberField id="targetBonus" label="达标奖金（可选）" suffix="CNY" value={form.targetBonus} onChange={(value) => setForm((current) => ({ ...current, targetBonus: value }))} />
              <NumberField id="bonusThresholdAmount" label="奖金起征销售额" suffix="CNY" value={form.bonusThresholdAmount} onChange={(value) => setForm((current) => ({ ...current, bonusThresholdAmount: value }))} />
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold">佣金档位（2–5 档）</h3>
                  <p className="mt-1 text-xs text-muted-foreground">超额累进：每段销售额按本段费率单独计提</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addTier} disabled={form.tiers.length >= 5}>
                  <Plus className="mr-2 h-4 w-4" />添加档位
                </Button>
              </div>
              {form.tiers.map((tier, index) => {
                const isLast = index === form.tiers.length - 1
                return (
                  <div key={tier.id} className="grid items-end gap-3 rounded-md border bg-muted/20 p-3 sm:grid-cols-[minmax(0,1fr)_130px_44px]">
                    <NumberField
                      id={`${tier.id}-upTo`}
                      label={isLast ? '本档上限（0 = 不封顶）' : `第 ${index + 1} 档销售额上限`}
                      suffix="CNY"
                      value={tier.upToAmount}
                      onChange={(value) => updateTier(tier.id, 'upToAmount', value)}
                    />
                    <NumberField id={`${tier.id}-rate`} label="佣金费率" suffix="%" value={tier.ratePercent} onChange={(value) => updateTier(tier.id, 'ratePercent', value)} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      title="删除档位"
                      aria-label={`删除第 ${index + 1} 档`}
                      disabled={form.tiers.length <= 2}
                      onClick={() => removeTier(tier.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {calculation.result ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>佣金核算</CardTitle>
                    <CardDescription>销售额 {calculation.result.salesAmount.toLocaleString('en-US')} CNY · 回款率 {calculation.result.collectionPercent}%</CardDescription>
                  </div>
                  <EnhancedCopyButton text={buildCommissionSummary(calculation.result)} variant="outline" size="sm">复制</EnhancedCopyButton>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Stat label="佣金合计" value={`${calculation.result.totalCommission.toLocaleString('en-US')} CNY`} note={`有效费率 ${calculation.result.effectiveRatePercent}%`} highlight />
                  <Stat label="回款后实得" value={`${calculation.result.collectedCommission.toLocaleString('en-US')} CNY`} note={`未回款挂账 ${calculation.result.uncollectedCommission.toLocaleString('en-US')}`} />
                </div>
                <div className="space-y-2">
                  {calculation.result.tiers.map((tier) => (
                    <div key={tier.id} className="flex items-center justify-between gap-3 rounded-md border bg-muted/20 px-3 py-2 text-sm">
                      <span className="min-w-0 text-muted-foreground">{tier.rangeLabel}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        <Badge variant="outline" className="border-slate-200 text-[11px] text-slate-500 dark:border-white/10 dark:text-slate-300">{tier.ratePercent}%</Badge>
                        <span className="font-semibold tabular-nums">{tier.commission.toLocaleString('en-US')}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4 border-t pt-3 text-sm font-semibold">
                  <span>{calculation.result.bonusUnlocked ? `含达标奖金 ${toNumber(form.targetBonus).toLocaleString('en-US')} CNY` : '未达奖金起征线'}</span>
                  <span className="tabular-nums text-emerald-700 dark:text-cyan-200">合计发放 {calculation.result.totalPayout.toLocaleString('en-US')} CNY</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正档位配置后查看佣金核算</div>
          )}
        </div>
      </div>
    </MobileFriendlyWrapper>
  )
}

function Stat({ label, value, note, highlight = false }: { label: string; value: string; note?: string; highlight?: boolean }) {
  return (
    <div className="rounded-md border bg-muted/20 px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-lg font-bold tabular-nums ${highlight ? 'text-emerald-700 dark:text-cyan-200' : ''}`}>{value}</p>
      {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
    </div>
  )
}

function NumberField({ id, label, suffix, value, onChange }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <FormattedInput id={id} value={value} onChange={onChange} format="decimal" maxDecimals={2} className="h-11 pr-16 font-medium" />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  )
}
