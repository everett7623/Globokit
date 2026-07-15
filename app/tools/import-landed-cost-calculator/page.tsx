// 名称: 进口到岸成本计算器
// 描述: 按货值、运费、保险、关税、进口增值税和本地费用测算进口到岸成本
// 路径: Globokit/app/tools/import-landed-cost-calculator/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useMemo, useState } from 'react'
import { ImportCostForm } from './import-cost-form'
import { INITIAL_FORM, buildSummary, toNumber, type FormState, type NumericField } from './import-cost-page-data'
import { ImportCostResults, ImportCostStats } from './import-cost-results'
import { calculateImportLandedCost, type ImportCurrency, type ImportLandedCostInputs } from '@/lib/tools/import-landed-cost-calculator'

export default function ImportLandedCostCalculatorPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [copied, setCopied] = useState(false)
  const foreignFormatter = useMemo(() => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: form.currency, maximumFractionDigits: 2 }), [form.currency])
  const inputs = useMemo<ImportLandedCostInputs>(() => ({
    quantity: toNumber(form.quantity), unitPriceForeign: toNumber(form.unitPriceForeign), exchangeRate: toNumber(form.exchangeRate), internationalFreightForeign: toNumber(form.internationalFreightForeign),
    insuranceForeign: toNumber(form.insuranceForeign), otherForeignCost: toNumber(form.otherForeignCost), dutyRatePercent: toNumber(form.dutyRatePercent), vatRatePercent: toNumber(form.vatRatePercent),
    customsFeeCny: toNumber(form.customsFeeCny), portChargeCny: toNumber(form.portChargeCny), domesticFreightCny: toNumber(form.domesticFreightCny), otherLocalCostCny: toNumber(form.otherLocalCostCny), targetSellingPriceCny: toNumber(form.targetSellingPriceCny),
  }), [form])
  const result = useMemo(() => calculateImportLandedCost(inputs), [inputs])
  const formatForeign = (value: number) => foreignFormatter.format(value)
  const copySummary = async () => {
    await navigator.clipboard.writeText(buildSummary(result, form.currency, formatForeign))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const updateField = (field: NumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))

  return <><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">进口到岸成本计算器</h1><p className="text-muted-foreground">按货值、国际运费、保险、关税、进口增值税和本地清关费用，快速测算进口到岸总成本与每件成本。</p></div><ImportCostStats result={result} /><div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px]"><ImportCostForm form={form} copied={copied} goodsValue={formatForeign(result.goodsValueForeign)} foreignCostTotal={formatForeign(result.foreignCostTotal)} onFieldChange={updateField} onCurrencyChange={(currency: ImportCurrency, exchangeRate: string) => setForm((current) => ({ ...current, currency, exchangeRate }))} onPreset={(values) => setForm((current) => ({ ...current, ...values }))} onCopy={copySummary} onReset={() => setForm(INITIAL_FORM)} /><ImportCostResults result={result} currency={form.currency} /></div></>
}
