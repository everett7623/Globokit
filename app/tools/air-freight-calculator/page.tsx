// 名称: 空运/快递计费重计算器
// 描述: 根据外箱尺寸、毛重、净重、泡重系数和运价估算空运快递计费重量与费用
// 路径: Globokit/app/tools/air-freight-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useMemo, useState } from 'react'
import { AirFreightForm } from './air-freight-form'
import { INITIAL_FORM, formatMoney, formatNumber, toNumber, type DivisorChoice, type FormState, type NumericField } from './air-freight-page-data'
import { AirFreightResults, AirFreightStats } from './air-freight-results'
import { AIR_FREIGHT_DIVISORS, calculateAirFreight } from '@/lib/tools/air-freight-calculator'

export default function AirFreightCalculatorPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [copied, setCopied] = useState(false)
  const inputs = useMemo(() => ({
    lengthCm: toNumber(form.lengthCm), widthCm: toNumber(form.widthCm), heightCm: toNumber(form.heightCm), grossWeightKg: toNumber(form.grossWeightKg),
    netWeightKg: toNumber(form.netWeightKg), quantity: toNumber(form.quantity), divisor: toNumber(form.divisor), ratePerKg: toNumber(form.ratePerKg),
    minCharge: toNumber(form.minCharge), fuelSurchargePercent: toNumber(form.fuelSurchargePercent), handlingFee: toNumber(form.handlingFee),
  }), [form])
  const result = useMemo(() => calculateAirFreight(inputs), [inputs])
  const volumetric = result.billingBasis === 'volumetric'
  const divisorNote = form.divisorChoice === 'custom' ? '自定义泡重口径' : AIR_FREIGHT_DIVISORS[form.divisorChoice].note

  const updateField = (field: NumericField, value: string) => setForm((current) => ({ ...current, [field]: value, ...(field === 'divisor' ? { divisorChoice: 'custom' as DivisorChoice } : {}) }))
  const updateDivisorChoice = (choice: DivisorChoice) => setForm((current) => ({ ...current, divisorChoice: choice, ...(choice === 'custom' ? {} : { divisor: String(AIR_FREIGHT_DIVISORS[choice].value) }) }))
  const copySummary = async () => {
    const summary = [
      '空运/快递计费重测算', `箱规：${form.lengthCm} x ${form.widthCm} x ${form.heightCm} cm`, `单箱毛重：${form.grossWeightKg} kg`, `单箱净重：${form.netWeightKg} kg`, `箱数：${form.quantity} 箱`, `泡重系数：${form.divisor}`,
      `单箱体积：${result.cartonCbm} CBM`, `总体积：${result.totalCbm} CBM`, `总毛重：${formatNumber(result.actualWeightKg, 2)} kg`, `总净重：${formatNumber(result.netWeightKg, 2)} kg`, `总体积重：${formatNumber(result.volumetricWeightKg, 2)} kg`,
      `计费重量：${formatNumber(result.chargeableWeightKg, 2)} kg`, `计费依据：${volumetric ? '体积重' : '毛重'}`, `基础运费：${formatMoney(result.baseFreight)}`, `燃油附加：${formatMoney(result.fuelSurcharge)}`, `操作费：${formatMoney(result.handlingFee)}`, `费用合计：${formatMoney(result.totalCharge)}`, `单箱费用：${formatMoney(result.unitCharge)}`,
    ].join('\n')
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return <><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">空运/快递计费重计算器</h1><p className="text-muted-foreground">按箱规、毛重、净重、泡重系数和运价估算空运快递计费重量、抛重差与费用</p></div><AirFreightStats result={result} /><div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"><AirFreightForm form={form} copied={copied} divisorNote={divisorNote} onFieldChange={updateField} onDivisorChoice={updateDivisorChoice} onPreset={(values) => setForm((current) => ({ ...current, ...values }))} onCopy={copySummary} onReset={() => setForm(INITIAL_FORM)} /><AirFreightResults result={result} /></div></>
}
