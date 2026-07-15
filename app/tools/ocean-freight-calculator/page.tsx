// 名称: 海运费用拆分计算器
// 描述: 按海运费、港杂、报关、保险和目的港费用测算海运成本摊销
// 路径: Globokit/app/tools/ocean-freight-calculator/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useMemo, useState } from 'react'
import { OceanFreightForm } from './ocean-freight-form'
import { INITIAL_FORM, formatCny, formatNumber, toNumber, type FormState, type NumericField } from './ocean-freight-page-data'
import { OceanFreightResults, OceanFreightStats } from './ocean-freight-results'
import { calculateOceanFreight, type OceanFreightInputs, type OceanFreightMode } from '@/lib/tools/ocean-freight-calculator'

export default function OceanFreightCalculatorPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [copied, setCopied] = useState(false)
  const inputs = useMemo<OceanFreightInputs>(() => ({
    mode: form.mode, quantity: toNumber(form.quantity), totalCbm: toNumber(form.totalCbm), totalWeightKg: toNumber(form.totalWeightKg),
    containerCount: toNumber(form.containerCount), minChargeableCbm: toNumber(form.minChargeableCbm), oceanFreightForeign: toNumber(form.oceanFreightForeign),
    destinationChargeForeign: toNumber(form.destinationChargeForeign), exchangeRate: toNumber(form.exchangeRate), originChargesCny: toNumber(form.originChargesCny),
    truckingFeeCny: toNumber(form.truckingFeeCny), customsFeeCny: toNumber(form.customsFeeCny), documentFeeCny: toNumber(form.documentFeeCny),
    cargoValueCny: toNumber(form.cargoValueCny), insuranceRatePercent: toNumber(form.insuranceRatePercent),
  }), [form])
  const result = useMemo(() => calculateOceanFreight(inputs), [inputs])

  const copySummary = async () => {
    const summary = [
      '海运费用拆分测算', `运输方式：${result.modeLabel}`, `数量：${result.quantity} 件`, `计费体积：${formatNumber(result.chargeableCbm, 3)} CBM`,
      `总毛重：${formatNumber(toNumber(form.totalWeightKg), 2)} kg`, `海运费：${formatCny(result.freightCny)}`, `目的港费用：${formatCny(result.destinationChargeCny)}`,
      `起运端费用：${formatCny(result.originSubtotalCny)}`, `保险费：${formatCny(result.insuranceFeeCny)}`, `总费用：${formatCny(result.totalCostCny)}`,
      `每CBM：${formatCny(result.perCbmCny)}`, `每件摊费：${formatCny(result.perCartonCny)}`,
    ].join('\n')
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const updateField = (field: NumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))

  return (
    <>
      <div className="mb-8"><h1 className="mb-2 text-3xl font-bold">海运费用拆分计算器</h1><p className="text-muted-foreground">汇总海运费、起运港杂费、拖车、报关、保险和目的港费用，快速折算每件、每 CBM 与每柜成本。</p></div>
      <OceanFreightStats result={result} form={form} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
        <OceanFreightForm form={form} copied={copied} onFieldChange={updateField} onModeChange={(mode: OceanFreightMode) => setForm((current) => ({ ...current, mode }))} onPreset={(values) => setForm((current) => ({ ...current, ...values }))} onCopy={copySummary} onReset={() => setForm(INITIAL_FORM)} />
        <OceanFreightResults result={result} form={form} />
      </div>
    </>
  )
}
