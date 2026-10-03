// 名称: 出口货物保险费计算器
// 描述: 按 FOB/CFR/CIF 口径换算 CIF 与投保金额，拆分基础险与战争险保费
// 路径: Globokit/app/tools/cargo-insurance-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

'use client'

import { useMemo, useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import {
  DEFAULT_CARGO_INSURANCE_INPUTS,
  calculateCargoInsurance,
  createInsuranceInputsFromPreset,
  type CargoInsuranceInputs,
  type InsurancePresetId,
} from '@/lib/tools/cargo-insurance-calculator'
import { CargoInsuranceForm, type InsuranceFormState, type InsuranceNumericField } from './cargo-insurance-form'
import { CargoInsuranceResult } from './cargo-insurance-result'

function createInitialForm(): InsuranceFormState {
  return {
    priceBasis: DEFAULT_CARGO_INSURANCE_INPUTS.priceBasis,
    currency: DEFAULT_CARGO_INSURANCE_INPUTS.currency,
    amount: String(DEFAULT_CARGO_INSURANCE_INPUTS.amount),
    freightAmount: String(DEFAULT_CARGO_INSURANCE_INPUTS.freightAmount),
    markupPercent: String(DEFAULT_CARGO_INSURANCE_INPUTS.markupPercent),
    premiumRatePercent: String(DEFAULT_CARGO_INSURANCE_INPUTS.premiumRatePercent),
    warRiskRatePercent: String(DEFAULT_CARGO_INSURANCE_INPUTS.warRiskRatePercent),
  }
}

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function toInputs(form: InsuranceFormState): CargoInsuranceInputs {
  return {
    priceBasis: form.priceBasis,
    amount: toNumber(form.amount),
    freightAmount: toNumber(form.freightAmount),
    markupPercent: toNumber(form.markupPercent),
    premiumRatePercent: toNumber(form.premiumRatePercent),
    warRiskRatePercent: toNumber(form.warRiskRatePercent),
    currency: form.currency,
  }
}

export default function CargoInsuranceCalculatorPage() {
  const [form, setForm] = useState<InsuranceFormState>(createInitialForm)

  const calculation = useMemo(() => {
    try {
      return { result: calculateCargoInsurance(toInputs(form)), error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '保费无法计算，请检查输入' }
    }
  }, [form])

  const summaryText = useMemo(() => {
    if (!calculation.result) return ''
    const result = calculation.result
    return [
      `${result.priceBasis} 口径：${result.basisNote}`,
      `折算 CIF 价值：${result.cifValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} ${result.currency}`,
      `投保金额（${result.insuredPercentOfCif}%）：${result.insuredAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} ${result.currency}`,
      `基础险保费：${result.basePremium.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} ${result.currency}`,
      `战争险附加保费：${result.warRiskPremium.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} ${result.currency}`,
      `合计保费：${result.totalPremium.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} ${result.currency}（占 CIF ${result.effectivePremiumRateOnCif}%）`,
    ].join('\n')
  }, [calculation])

  const updateNumeric = (field: InsuranceNumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const applyPreset = (presetId: InsurancePresetId) => setForm((current) => {
    const preset = createInsuranceInputsFromPreset(presetId, current.currency)
    return {
      priceBasis: preset.priceBasis,
      currency: preset.currency,
      amount: String(preset.amount),
      freightAmount: String(preset.freightAmount),
      markupPercent: String(preset.markupPercent),
      premiumRatePercent: String(preset.premiumRatePercent),
      warRiskRatePercent: String(preset.warRiskRatePercent),
    }
  })

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">出口货物保险费计算器</h1>
        <p className="text-muted-foreground">输入 FOB/CFR/CIF 货值、海运费与费率，自动换算 CIF 与投保金额，拆分基础险和战争险保费，附 ICC 条款速查。</p>
      </div>

      {calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: () => setForm(createInitialForm()) }} className="mb-6" />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.15fr)]">
        <CargoInsuranceForm
          form={form}
          onNumericChange={updateNumeric}
          onBasisChange={(basis) => setForm((current) => ({ ...current, priceBasis: basis }))}
          onCurrencyChange={(currency) => setForm((current) => ({ ...current, currency }))}
          onApplyPreset={applyPreset}
          onReset={() => setForm(createInitialForm())}
        />
        {calculation.result
          ? <CargoInsuranceResult result={calculation.result} summaryText={summaryText} />
          : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看保费测算</div>}
      </div>
    </MobileFriendlyWrapper>
  )
}
