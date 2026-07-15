// 名称: 外贸报价利润计算器
// 描述: 根据采购成本、费用、汇率、佣金和目标利润率计算外贸报价
// 路径: Globokit/app/tools/quote-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useMemo, useState } from 'react'
import { QuoteForm } from './quote-form'
import { INITIAL_FORM, buildSummary, toNumber, type FormState, type NumericField, type QuoteCurrency } from './quote-page-data'
import { QuoteResults, QuoteStats } from './quote-results'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { calculateQuote, type QuoteInputs, type QuoteMode, type QuoteTerm } from '@/lib/tools/quote-calculator'

export default function QuoteCalculatorPage() {
  const [mode, setMode] = useState<QuoteMode>('target-margin')
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [copied, setCopied] = useState(false)
  const formatter = useMemo(() => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: form.currency, maximumFractionDigits: 2 }), [form.currency])
  const inputs = useMemo<QuoteInputs>(() => ({
    quoteTerm: form.quoteTerm, unitCostCny: toNumber(form.unitCostCny), quantity: toNumber(form.quantity), domesticFeeCny: toNumber(form.domesticFeeCny), exportFeeCny: toNumber(form.exportFeeCny),
    internationalFreightCny: toNumber(form.internationalFreightCny), insuranceFeeCny: toNumber(form.insuranceFeeCny), destinationFeeCny: toNumber(form.destinationFeeCny), importDutyTaxCny: toNumber(form.importDutyTaxCny),
    exchangeRate: toNumber(form.exchangeRate), targetMarginPercent: toNumber(form.targetMarginPercent), sellingPriceForeign: toNumber(form.sellingPriceForeign), commissionPercent: toNumber(form.commissionPercent), paymentFeePercent: toNumber(form.paymentFeePercent), rebatePercent: toNumber(form.rebatePercent), vatPercent: toNumber(form.vatPercent),
  }), [form])
  const calculation = useMemo(() => { try { return { result: calculateQuote(inputs, mode), error: '' } } catch (error) { return { result: null, error: error instanceof Error ? error.message : '报价参数无法计算，请检查输入' } } }, [inputs, mode])
  const formatForeign = (value: number) => formatter.format(value)
  const copySummary = async () => {
    if (!calculation.result) return
    await navigator.clipboard.writeText(buildSummary(calculation.result, form.currency, formatForeign)); setCopied(true); window.setTimeout(() => setCopied(false), 1800)
  }
  const reset = () => { setMode('target-margin'); setForm(INITIAL_FORM) }
  const updateField = (field: NumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))

  return <><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">外贸报价利润计算器</h1><p className="text-muted-foreground">结合采购成本、运费、汇率、佣金和目标利润率，按 EXW/FCA/FOB/CFR/CIF/DDP 等条款测算报价区间。</p></div>{calculation.error && <Alert variant="destructive" className="mb-6"><AlertDescription>{calculation.error}</AlertDescription></Alert>}{calculation.result && <QuoteStats result={calculation.result} formatForeign={formatForeign} />}<div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]"><QuoteForm form={form} mode={mode} missingCostLabels={calculation.result?.missingCostLabels ?? []} onFieldChange={updateField} onModeChange={setMode} onTermChange={(quoteTerm: QuoteTerm) => setForm((current) => ({ ...current, quoteTerm }))} onCurrencyChange={(currency: QuoteCurrency, exchangeRate: string) => setForm((current) => ({ ...current, currency, exchangeRate }))} onPreset={(values, nextMode) => { setMode(nextMode); setForm((current) => ({ ...current, ...values })) }} onReset={reset} /><QuoteResults result={calculation.result} mode={mode} currency={form.currency} copied={copied} formatForeign={formatForeign} onCopy={copySummary} /></div></>
}
