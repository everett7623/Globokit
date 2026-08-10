// 名称: 外贸阶梯报价计算器
// 描述: 按不同订购数量与采购单价反算外币阶梯报价
// 路径: Globokit/app/tools/tiered-quote-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

'use client'

import { useMemo, useState } from 'react'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { calculateTieredQuote, MAX_QUOTE_TIERS, MIN_QUOTE_TIERS, type TieredQuoteCurrency } from '@/lib/tools/tiered-quote-calculator'
import { TieredQuoteForm } from './tiered-quote-form'
import { buildTieredQuoteSummary, createAdditionalTier, createInitialForm, toInputs, type QuoteCommonField, type TieredQuoteFormState, type TierNumericField } from './tiered-quote-page-data'
import { TieredQuoteResults, TieredQuoteStats } from './tiered-quote-results'

export default function TieredQuoteCalculatorPage() {
  const [form, setForm] = useState<TieredQuoteFormState>(createInitialForm)
  const calculation = useMemo(() => {
    try {
      return { result: calculateTieredQuote(toInputs(form)), error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '阶梯报价无法计算，请检查输入' }
    }
  }, [form])
  const summaryText = calculation.result ? buildTieredQuoteSummary(calculation.result) : ''
  const reset = () => setForm(createInitialForm())
  const updateCommonField = (field: QuoteCommonField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const updateTier = (id: string, values: Record<string, string>) => setForm((current) => ({ ...current, tiers: current.tiers.map((tier) => tier.id === id ? { ...tier, ...values } : tier) }))
  const updateCurrency = (currency: TieredQuoteCurrency, exchangeRate: string) => setForm((current) => ({ ...current, currency, exchangeRate }))
  const applyPreset = (values: Partial<TieredQuoteFormState>) => setForm((current) => ({ ...current, ...values, tiers: values.tiers ? values.tiers.map((tier) => ({ ...tier })) : current.tiers }))
  const addTier = () => setForm((current) => current.tiers.length >= MAX_QUOTE_TIERS ? current : { ...current, tiers: [...current.tiers, createAdditionalTier(current.tiers)] })
  const removeTier = (id: string) => setForm((current) => current.tiers.length <= MIN_QUOTE_TIERS ? current : { ...current, tiers: current.tiers.filter((tier) => tier.id !== id) })

  return <MobileFriendlyWrapper><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">外贸阶梯报价计算器</h1><p className="text-muted-foreground">按不同订购数量和采购单价，比较固定费用摊薄、目标利润和外币阶梯单价。</p></div>{calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: reset }} className="mb-6" />}{calculation.result && <TieredQuoteStats result={calculation.result} />}<div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]"><TieredQuoteForm form={form} summaryText={summaryText} onCommonFieldChange={updateCommonField} onCurrencyChange={updateCurrency} onTierLabelChange={(id, value) => updateTier(id, { label: value })} onTierFieldChange={(id, field: TierNumericField, value) => updateTier(id, { [field]: value })} onPreset={applyPreset} onAddTier={addTier} onRemoveTier={removeTier} onReset={reset} />{calculation.result ? <TieredQuoteResults result={calculation.result} /> : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看阶梯报价</div>}</div></MobileFriendlyWrapper>
}
