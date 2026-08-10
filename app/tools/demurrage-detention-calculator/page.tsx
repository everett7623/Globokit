// 名称: 集装箱滞箱滞港费计算器
// 描述: 估算免费期外的码头滞港费与场外滞箱费
// 路径: Globokit/app/tools/demurrage-detention-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

'use client'

import { useMemo, useState } from 'react'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { calculateDemurrageDetention, type ChargeCurrency } from '@/lib/tools/demurrage-detention-calculator'
import { DemurrageDetentionForm } from './demurrage-detention-form'
import { buildDemurrageDetentionSummary, createInitialForm, toInputs, type DemurrageDetentionFormState, type NumericField } from './demurrage-detention-page-data'
import { DemurrageDetentionResults, DemurrageDetentionStats } from './demurrage-detention-results'

export default function DemurrageDetentionCalculatorPage() {
  const [form, setForm] = useState<DemurrageDetentionFormState>(createInitialForm)
  const calculation = useMemo(() => {
    try {
      return { result: calculateDemurrageDetention(toInputs(form)), error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '费用参数无法计算，请检查输入' }
    }
  }, [form])
  const summaryText = calculation.result ? buildDemurrageDetentionSummary(calculation.result) : ''
  const reset = () => setForm(createInitialForm())
  const updateField = (field: NumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const updateCurrency = (currency: ChargeCurrency) => setForm((current) => ({ ...current, currency }))
  const applyPreset = (values: Partial<DemurrageDetentionFormState>) => setForm((current) => ({ ...current, ...values }))

  return <MobileFriendlyWrapper>
    <div className="mb-8"><h1 className="mb-2 text-3xl font-bold">集装箱滞箱/滞港费计算器</h1><p className="text-muted-foreground">按场内、场外占用天数和船公司阶梯费率，快速估算免费期外的异常费用。</p></div>
    {calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: reset }} className="mb-6" />}
    {calculation.result && <DemurrageDetentionStats result={calculation.result} />}
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]"><DemurrageDetentionForm form={form} summaryText={summaryText} onFieldChange={updateField} onCurrencyChange={updateCurrency} onPreset={applyPreset} onReset={reset} />{calculation.result ? <DemurrageDetentionResults result={calculation.result} /> : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看滞箱与滞港费用拆分</div>}</div>
  </MobileFriendlyWrapper>
}
