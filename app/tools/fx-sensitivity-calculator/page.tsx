// 名称: 外贸汇率敏感性分析
// 描述: 比较汇率波动对外贸订单收入、成本、利润和盈亏平衡汇率的影响
// 路径: Globokit/app/tools/fx-sensitivity-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

'use client'

import { useMemo, useState } from 'react'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { calculateFxSensitivity, FX_CURRENCY_PRESETS, type FxSensitivityInputs } from '@/lib/tools/fx-sensitivity-calculator'
import { FxSensitivityForm } from './fx-sensitivity-form'
import { buildFxSensitivitySummary, createInitialForm, toNumber, type FxSensitivityFormState, type NumericField } from './fx-sensitivity-page-data'
import { FxSensitivityResults, FxSensitivityStats } from './fx-sensitivity-results'

export default function FxSensitivityCalculatorPage() {
  const [form, setForm] = useState<FxSensitivityFormState>(createInitialForm)
  const inputs = useMemo<FxSensitivityInputs>(() => ({
    currency: form.currency,
    foreignAmount: toNumber(form.foreignAmount),
    costCny: toNumber(form.costCny),
    otherCostCny: toNumber(form.otherCostCny),
    settlementFeePercent: toNumber(form.settlementFeePercent),
    baseRate: toNumber(form.baseRate),
    rmbAppreciationPercent: toNumber(form.rmbAppreciationPercent),
    rmbDepreciationPercent: toNumber(form.rmbDepreciationPercent),
  }), [form])
  const calculation = useMemo(() => {
    try {
      return { result: calculateFxSensitivity(inputs), error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '汇率参数无法计算，请检查输入' }
    }
  }, [inputs])
  const summaryText = calculation.result ? buildFxSensitivitySummary(calculation.result) : ''
  const reset = () => setForm(createInitialForm())
  const updateField = (field: NumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const updateCurrency = (currency: FxSensitivityFormState['currency']) => setForm((current) => ({
    ...current,
    currency,
    baseRate: String(FX_CURRENCY_PRESETS.find((item) => item.value === currency)?.rate ?? current.baseRate),
  }))

  return <MobileFriendlyWrapper>
    <div className="mb-8"><h1 className="mb-2 text-3xl font-bold">外贸汇率敏感性分析</h1><p className="text-muted-foreground">用人民币升值、基准和贬值三个情景，快速判断外币订单的利润波动和盈亏平衡汇率。</p></div>
    {calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: reset }} className="mb-6" />}
    {calculation.result && <FxSensitivityStats result={calculation.result} />}
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
      <FxSensitivityForm form={form} summaryText={summaryText} onCurrencyChange={updateCurrency} onFieldChange={updateField} onReset={reset} />
      {calculation.result ? <FxSensitivityResults result={calculation.result} /> : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看汇率情景对比</div>}
    </div>
  </MobileFriendlyWrapper>
}
