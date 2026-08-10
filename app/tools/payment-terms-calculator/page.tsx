// 名称: 外贸收款账期成本对比
// 描述: 比较不同收款条件对资金占用、风险和订单利润的影响
// 路径: Globokit/app/tools/payment-terms-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-08-10

'use client'

import { useMemo, useState } from 'react'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import {
  calculatePaymentTerms,
  createPaymentTermOption,
  type PaymentTermsInputs,
  type PaymentTermPresetId,
} from '@/lib/tools/payment-terms-calculator'
import { PaymentTermsForm } from './payment-terms-form'
import {
  buildPaymentTermsSummary,
  createInitialForm,
  toNumber,
  type GlobalNumericField,
  type TermNumericField,
} from './payment-terms-page-data'
import { PaymentTermsResults, PaymentTermsStats } from './payment-terms-results'

export default function PaymentTermsCalculatorPage() {
  const [form, setForm] = useState(createInitialForm)
  const calculation = useMemo(() => {
    const inputs: PaymentTermsInputs = {
      orderAmount: toNumber(form.orderAmount),
      orderCost: toNumber(form.orderCost),
      productionDays: toNumber(form.productionDays),
      annualFundingRatePercent: toNumber(form.annualFundingRatePercent),
      terms: form.terms.map((term) => ({
        ...term,
        advancePercent: toNumber(term.advancePercent),
        daysAfterShipment: toNumber(term.daysAfterShipment),
        feePercent: toNumber(term.feePercent),
        fixedFee: toNumber(term.fixedFee),
        riskReservePercent: toNumber(term.riskReservePercent),
      })),
    }
    try {
      return { result: calculatePaymentTerms(inputs), error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '收款方案无法计算，请检查输入' }
    }
  }, [form])

  const reset = () => setForm(createInitialForm())
  const updateGlobal = (field: GlobalNumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const updateTerm = (termId: string, field: TermNumericField, value: string) => setForm((current) => ({
    ...current,
    terms: current.terms.map((term) => term.id === termId ? { ...term, [field]: value } : term),
  }))
  const applyPreset = (termId: string, presetId: PaymentTermPresetId) => setForm((current) => ({
    ...current,
    terms: current.terms.map((term) => {
      if (term.id !== termId) return term
      const preset = createPaymentTermOption(termId, presetId)
      return {
        ...preset,
        advancePercent: String(preset.advancePercent),
        daysAfterShipment: String(preset.daysAfterShipment),
        feePercent: String(preset.feePercent),
        fixedFee: String(preset.fixedFee),
        riskReservePercent: String(preset.riskReservePercent),
      }
    }),
  }))
  const addTerm = () => setForm((current) => {
    if (current.terms.length >= 3) return current
    const usedPresets = new Set(current.terms.map((term) => term.presetId))
    const presetId = (['tt-deposit-shipment', 'lc-sight', 'oa-60'] as PaymentTermPresetId[]).find((id) => !usedPresets.has(id)) ?? 'dp-30'
    const option = createPaymentTermOption(`option-${Date.now()}`, presetId)
    return {
      ...current,
      terms: [...current.terms, {
        ...option,
        advancePercent: String(option.advancePercent),
        daysAfterShipment: String(option.daysAfterShipment),
        feePercent: String(option.feePercent),
        fixedFee: String(option.fixedFee),
        riskReservePercent: String(option.riskReservePercent),
      }],
    }
  })
  const removeTerm = (termId: string) => setForm((current) => current.terms.length <= 2
    ? current
    : { ...current, terms: current.terms.filter((term) => term.id !== termId) })

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">外贸收款账期成本对比</h1>
        <p className="text-muted-foreground">把 T/T、L/C、D/P 与 OA 的资金占用、手续费和风险折算到同一订单利润口径。</p>
      </div>

      {calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: reset }} className="mb-6" />}
      {calculation.result && calculation.result.baseGrossProfit < 0 && <EnhancedAlert type="warning" title="成本高于订单金额" message="当前订单在计入收款条款成本前已经亏损，请先核对订单金额或总成本。" className="mb-6" />}
      {calculation.result && <PaymentTermsStats result={calculation.result} />}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <PaymentTermsForm form={form} onGlobalChange={updateGlobal} onTermChange={updateTerm} onPresetChange={applyPreset} onAddTerm={addTerm} onRemoveTerm={removeTerm} onReset={reset} />
        {calculation.result
          ? <PaymentTermsResults result={calculation.result} summaryText={buildPaymentTermsSummary(calculation.result)} />
          : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看方案对比</div>}
      </div>
    </MobileFriendlyWrapper>
  )
}
