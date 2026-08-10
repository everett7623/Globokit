// 名称: 供应商报价对比
// 描述: 对比供应商税价、MOQ、次品预留、费用、首付和交期
// 路径: Globokit/app/tools/supplier-quote-comparison/page.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

'use client'

import { useMemo, useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { compareSupplierQuotes, MAX_SUPPLIER_QUOTES, MIN_SUPPLIER_QUOTES, type SupplierQuoteCurrency, type SupplierQuoteTaxMode } from '@/lib/tools/supplier-quote-comparison'
import { SupplierQuoteForm } from './supplier-quote-form'
import { buildSupplierQuoteSummary, createAdditionalSupplier, createInitialForm, toInputs, type SupplierCommonField, type SupplierComparisonFormState, type SupplierNumericField } from './supplier-quote-page-data'
import { SupplierQuoteResults, SupplierQuoteStats } from './supplier-quote-results'

export default function SupplierQuoteComparisonPage() {
  const [form, setForm] = useState<SupplierComparisonFormState>(createInitialForm)
  const calculation = useMemo(() => {
    try {
      return { result: compareSupplierQuotes(toInputs(form)), error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '供应商报价无法比较，请检查输入' }
    }
  }, [form])
  const summaryText = calculation.result ? buildSupplierQuoteSummary(calculation.result) : ''
  const reset = () => setForm(createInitialForm())
  const updateSupplier = (id: string, values: Record<string, string>) => setForm((current) => ({ ...current, suppliers: current.suppliers.map((supplier) => supplier.id === id ? { ...supplier, ...values } : supplier) }))
  const addSupplier = () => setForm((current) => current.suppliers.length >= MAX_SUPPLIER_QUOTES ? current : { ...current, suppliers: [...current.suppliers, createAdditionalSupplier(current.suppliers)] })
  const removeSupplier = (id: string) => setForm((current) => current.suppliers.length <= MIN_SUPPLIER_QUOTES ? current : { ...current, suppliers: current.suppliers.filter((supplier) => supplier.id !== id) })

  return <MobileFriendlyWrapper><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">供应商报价对比</h1><p className="text-muted-foreground">统一含税口径、采购数量和附加费用，比较真实现金成本、首付占用与交期。</p></div>{calculation.error && <EnhancedAlert type="error" title="计算错误" message={calculation.error} action={{ label: '重置', onClick: reset }} className="mb-6" />}{calculation.result && <SupplierQuoteStats result={calculation.result} />}<div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]"><SupplierQuoteForm form={form} summaryText={summaryText} onCommonFieldChange={(field: SupplierCommonField, value) => setForm((current) => ({ ...current, [field]: value }))} onCurrencyChange={(currency: SupplierQuoteCurrency) => setForm((current) => ({ ...current, currency }))} onSupplierNameChange={(id, value) => updateSupplier(id, { name: value })} onSupplierTaxModeChange={(id, value: SupplierQuoteTaxMode) => updateSupplier(id, { taxMode: value })} onSupplierFieldChange={(id, field: SupplierNumericField, value) => updateSupplier(id, { [field]: value })} onPreset={(values) => setForm({ ...values, suppliers: values.suppliers.map((supplier) => ({ ...supplier })) })} onAddSupplier={addSupplier} onRemoveSupplier={removeSupplier} onReset={reset} />{calculation.result ? <SupplierQuoteResults result={calculation.result} /> : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看供应商排名</div>}</div></MobileFriendlyWrapper>
}
