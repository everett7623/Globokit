// 名称: 服务器成本对比工具页面
// 描述: 比较 2-5 台服务器的套餐价、续费价与附加成本，输出月均、持有期总成本与单位算力成本
// 路径: Globokit/app/tools/server-cost-comparison/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-18

'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, RotateCcw, Server, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { FormattedInput } from '@/components/ui/formatted-input'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { MobileButtonGroup, MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import type { ScenarioPreset } from '@/components/tools/scenario-presets'
import {
  DEFAULT_SERVER_COST_INPUTS,
  buildServerCostNote,
  calculateServerCosts,
  type ServerCostInputs,
  type ServerPlan,
} from '@/lib/tools/server-cost-comparison'

type NumericPlanField = 'promoPrice' | 'renewalPrice' | 'firstCycleDiscount' | 'monthlyAddon' | 'setupFee' | 'memoryGb' | 'vcpu' | 'diskGb'

const CYCLE_OPTIONS = [
  { value: '1', label: '月付' },
  { value: '3', label: '季付' },
  { value: '6', label: '半年付' },
  { value: '12', label: '年付' },
  { value: '24', label: '两年付' },
  { value: '36', label: '三年付' },
]

const PRESETS: readonly ScenarioPreset<Partial<ServerCostInputs>>[] = [
  {
    label: '常见 VPS 三选一',
    description: '年付活动机、月付灵活机与三年特惠机的典型组合',
    values: { exchangeRate: 7.15, holdingMonths: 24 },
  },
  {
    label: '只看一年成本',
    description: '把持有期压到 12 个月，突出首期优惠的影响',
    values: { holdingMonths: 12 },
  },
  {
    label: '长期持有',
    description: '持有 36 个月，续费价差异会明显放大',
    values: { holdingMonths: 36 },
  },
]

function buildInitialPlans(): ServerPlan[] {
  return DEFAULT_SERVER_COST_INPUTS.plans.map((plan) => ({ ...plan }))
}

export default function ServerCostComparisonPage() {
  const [exchangeRate, setExchangeRate] = useState(String(DEFAULT_SERVER_COST_INPUTS.exchangeRate))
  const [holdingMonths, setHoldingMonths] = useState(String(DEFAULT_SERVER_COST_INPUTS.holdingMonths))
  const [plans, setPlans] = useState<ServerPlan[]>(buildInitialPlans)

  const updatePlanNumber = (id: string, field: NumericPlanField, value: string) => {
    const parsed = Number.parseFloat(value)
    setPlans((current) =>
      current.map((plan) => (plan.id === id ? { ...plan, [field]: Number.isFinite(parsed) ? parsed : 0 } : plan))
    )
  }

  const updatePlanCycle = (id: string, value: string) => {
    const months = Number.parseInt(value, 10)
    setPlans((current) => current.map((plan) => (plan.id === id ? { ...plan, cycleMonths: months } : plan)))
  }

  const togglePlanFlag = (id: string, field: 'hasPanel' | 'hasBackup') => {
    setPlans((current) => current.map((plan) => (plan.id === id ? { ...plan, [field]: !plan[field] } : plan)))
  }

  const calculation = useMemo(() => {
    try {
      return {
        result: calculateServerCosts({
          priceCurrency: DEFAULT_SERVER_COST_INPUTS.priceCurrency,
          settlementCurrency: DEFAULT_SERVER_COST_INPUTS.settlementCurrency,
          exchangeRate: Number.parseFloat(exchangeRate) || 0,
          holdingMonths: Number.parseInt(holdingMonths, 10) || 0,
          plans,
        }),
        error: '',
      }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '服务器成本无法计算，请检查输入' }
    }
  }, [exchangeRate, holdingMonths, plans])

  const noteText = calculation.result ? buildServerCostNote(calculation.result) : ''
  const currency = calculation.result?.settlementCurrency ?? DEFAULT_SERVER_COST_INPUTS.settlementCurrency
  const money = (value: number) => currency + ' ' + (Math.round(value * 100) / 100).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">服务器成本对比</h1>
        <p className="text-muted-foreground">
          同时比较 2–5 台服务器的套餐价、续费价、附加费与折扣，输出首期月均、持有期总成本和单位算力性价比。
        </p>
      </div>

      <ScenarioPresets
        presets={PRESETS}
        onSelect={(values) => {
          if (values.exchangeRate !== undefined) setExchangeRate(String(values.exchangeRate))
          if (values.holdingMonths !== undefined) setHoldingMonths(String(values.holdingMonths))
        }}
      />

      {calculation.error && (
        <EnhancedAlert
          type="error"
          title="计算错误"
          message={calculation.error}
          action={{ label: '重置', onClick: () => { setExchangeRate(String(DEFAULT_SERVER_COST_INPUTS.exchangeRate)); setHoldingMonths(String(DEFAULT_SERVER_COST_INPUTS.holdingMonths)); setPlans(buildInitialPlans()) } }}
          className="mt-6"
        />
      )}

      {calculation.result?.hasPromoPricing && (
        <EnhancedAlert
          type="warning"
          title="存在续费价高于套餐价的方案"
          message="活动机续费价通常高于首期价格，长期持有请以下方的续费月均与持有期总成本为准。"
          className="mt-6"
        />
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">对比口径</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="exchangeRate">{'汇率（1 ' + DEFAULT_SERVER_COST_INPUTS.priceCurrency + ' 折算）'}</Label>
                <div className="relative">
                  <FormattedInput
                    id="exchangeRate"
                    value={exchangeRate}
                    onChange={setExchangeRate}
                    format="decimal"
                    maxDecimals={4}
                    className="h-11 font-medium"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{DEFAULT_SERVER_COST_INPUTS.settlementCurrency}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="holdingMonths">计划持有月数</Label>
                <FormattedInput
                  id="holdingMonths"
                  value={holdingMonths}
                  onChange={setHoldingMonths}
                  format="number"
                  maxDecimals={0}
                  className="h-11 font-medium"
                />
              </div>
              <div className="flex items-end">
                <MobileButtonGroup>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={plans.length >= 5}
                    onClick={() => setPlans((current) => [...current, { ...current[current.length - 1], id: 'plan-' + (current.length + 1) + '-' + Date.now(), name: '方案 ' + String.fromCharCode(65 + current.length) + ' · 自定义' }])}
                  >
                    增加方案
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={plans.length <= 2}
                    onClick={() => setPlans((current) => current.slice(0, current.length - 1))}
                  >
                    删除末位
                  </Button>
                </MobileButtonGroup>
              </div>
            </CardContent>
          </Card>

          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Server className="h-4 w-4" />
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-promo'}>套餐价</Label>
                    <FormattedInput
                      id={plan.id + '-promo'}
                      value={String(plan.promoPrice)}
                      onChange={(value) => updatePlanNumber(plan.id, 'promoPrice', value)}
                      format="decimal"
                      maxDecimals={2}
                      className="h-11 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-renewal'}>续费价</Label>
                    <FormattedInput
                      id={plan.id + '-renewal'}
                      value={String(plan.renewalPrice)}
                      onChange={(value) => updatePlanNumber(plan.id, 'renewalPrice', value)}
                      format="decimal"
                      maxDecimals={2}
                      className="h-11 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-cycle'}>计费周期</Label>
                    <Select value={String(plan.cycleMonths)} onValueChange={(value) => updatePlanCycle(plan.id, value)}>
                      <SelectTrigger id={plan.id + '-cycle'} className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CYCLE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-discount'}>首期优惠</Label>
                    <FormattedInput
                      id={plan.id + '-discount'}
                      value={String(plan.firstCycleDiscount)}
                      onChange={(value) => updatePlanNumber(plan.id, 'firstCycleDiscount', value)}
                      format="decimal"
                      maxDecimals={2}
                      className="h-11 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-addon'}>每月附加费</Label>
                    <FormattedInput
                      id={plan.id + '-addon'}
                      value={String(plan.monthlyAddon)}
                      onChange={(value) => updatePlanNumber(plan.id, 'monthlyAddon', value)}
                      format="decimal"
                      maxDecimals={2}
                      className="h-11 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-setup'}>开通费</Label>
                    <FormattedInput
                      id={plan.id + '-setup'}
                      value={String(plan.setupFee)}
                      onChange={(value) => updatePlanNumber(plan.id, 'setupFee', value)}
                      format="decimal"
                      maxDecimals={2}
                      className="h-11 font-medium"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-vcpu'}>vCPU</Label>
                    <FormattedInput
                      id={plan.id + '-vcpu'}
                      value={String(plan.vcpu)}
                      onChange={(value) => updatePlanNumber(plan.id, 'vcpu', value)}
                      format="decimal"
                      maxDecimals={1}
                      className="h-11 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-memory'}>内存</Label>
                    <div className="relative">
                      <FormattedInput
                        id={plan.id + '-memory'}
                        value={String(plan.memoryGb)}
                        onChange={(value) => updatePlanNumber(plan.id, 'memoryGb', value)}
                        format="decimal"
                        maxDecimals={1}
                        className="h-11 pr-12 font-medium"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">GB</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={plan.id + '-disk'}>磁盘</Label>
                    <div className="relative">
                      <FormattedInput
                        id={plan.id + '-disk'}
                        value={String(plan.diskGb)}
                        onChange={(value) => updatePlanNumber(plan.id, 'diskGb', value)}
                        format="decimal"
                        maxDecimals={0}
                        className="h-11 pr-12 font-medium"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">GB</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant={plan.hasPanel ? 'default' : 'outline'} aria-pressed={plan.hasPanel} onClick={() => togglePlanFlag(plan.id, 'hasPanel')}>
                    {plan.hasPanel ? '含控制面板' : '不含控制面板'}
                  </Button>
                  <Button type="button" size="sm" variant={plan.hasBackup ? 'default' : 'outline'} aria-pressed={plan.hasBackup} onClick={() => togglePlanFlag(plan.id, 'hasBackup')}>
                    {plan.hasBackup ? '含每日备份' : '不含备份'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <MobileButtonGroup>
            <EnhancedCopyButton text={noteText} disabled={!noteText}>复制对比摘要</EnhancedCopyButton>
            <Button type="button" variant="outline" onClick={() => { setExchangeRate(String(DEFAULT_SERVER_COST_INPUTS.exchangeRate)); setHoldingMonths(String(DEFAULT_SERVER_COST_INPUTS.holdingMonths)); setPlans(buildInitialPlans()) }}>
              <RotateCcw className="mr-2 h-4 w-4" />
              重置
            </Button>
          </MobileButtonGroup>
        </div>

        <Card className="lg:sticky lg:top-6 lg:self-start">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-4 w-4" />
              成本对比结果
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {calculation.result ? (
              <>
                {calculation.result.plans.map((plan) => {
                  const cheapest = plan.id === calculation.result!.cheapestByHoldingId
                  return (
                    <div
                      key={plan.id}
                      className={
                        cheapest
                          ? 'rounded-md border border-emerald-300 bg-emerald-50/70 p-4 dark:border-cyan-300/30 dark:bg-cyan-300/10'
                          : 'rounded-md border p-4'
                      }
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{plan.name}</span>
                        <Badge variant={cheapest ? 'default' : 'outline'}>{cheapest ? '持有成本最低' : '第 ' + plan.rank + ' 名'}</Badge>
                      </div>
                      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                        <div>
                          <dt className="text-muted-foreground">首期月均</dt>
                          <dd className="font-mono tabular-nums">{money(plan.firstCycleMonthlySettlement)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">续费月均</dt>
                          <dd className="font-mono tabular-nums">{money(plan.renewalMonthlySettlement)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">持有期总成本</dt>
                          <dd className="font-mono font-medium tabular-nums">{money(plan.holdingPlannedSettlement)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">三年总成本</dt>
                          <dd className="font-mono tabular-nums">{money(plan.holdingCostSettlement)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">单位算力月成本</dt>
                          <dd className="font-mono tabular-nums">{money(plan.monthlyPerComputeUnitSettlement)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">相对最低差额</dt>
                          <dd className="font-mono tabular-nums">{money(plan.extraCostSettlement)}</dd>
                        </div>
                      </dl>
                      {plan.notes.length > 0 && (
                        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                          {plan.notes.map((note) => (
                            <li key={note} className="flex items-start gap-1">
                              <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
                <div className="rounded-md bg-muted/30 p-3 text-xs text-muted-foreground">
                  <p>持有期差额：最高与最低方案相差 {money(calculation.result.maxSavingSettlement)}。</p>
                  <p className="mt-1">单位算力按 1 vCPU 折算 2GB 内存计算，仅用于横向比较配置密度，不代表真实负载能力。</p>
                </div>
              </>
            ) : (
              <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                配置至少两个方案后查看对比结果
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileFriendlyWrapper>
  )
}

