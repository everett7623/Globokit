// 名称: 装柜/箱规计算器
// 描述: 根据纸箱尺寸、毛重、数量和柜型估算装柜数量与空间利用率
// 路径: Globokit/app/tools/container-load-calculator/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useMemo, useState } from 'react'
import { ContainerLoadForm } from './container-load-form'
import { INITIAL_FORM, formatNumber, toNumber, type FormState, type NumericField } from './container-load-page-data'
import { ContainerLoadResults, ContainerLoadStats } from './container-load-results'
import { calculateContainerLoad, type ContainerType } from '@/lib/tools/container-load-calculator'

export default function ContainerLoadCalculatorPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [copied, setCopied] = useState(false)
  const inputs = useMemo(() => ({
    lengthCm: toNumber(form.lengthCm), widthCm: toNumber(form.widthCm), heightCm: toNumber(form.heightCm),
    grossWeightKg: toNumber(form.grossWeightKg), quantity: toNumber(form.quantity), containerType: form.containerType,
  }), [form])
  const result = useMemo(() => calculateContainerLoad(inputs), [inputs])
  const doesNotFit = !result.fitsContainer

  const copySummary = async () => {
    const summary = [
      '装柜/箱规测算',
      `柜型：${result.container.name}`,
      `纸箱尺寸：${form.lengthCm} x ${form.widthCm} x ${form.heightCm} cm`,
      `单箱毛重：${form.grossWeightKg} kg`,
      `总箱数：${formatNumber(Number(result.bestOrientation.cartons ? toNumber(form.quantity) : 0))}`,
      `单箱体积：${result.cartonCbm} CBM`,
      `总体积：${result.totalCbm} CBM`,
      `总毛重：${formatNumber(result.totalWeightKg, 1)} kg`,
      `单柜可装：${formatNumber(result.maxCartonsPerContainer)} 箱`,
      `预计柜数：${result.requiredContainers} 柜`,
      `末柜箱数：${formatNumber(result.lastContainerCartons)} 箱`,
      `限制因素：${doesNotFit ? '纸箱尺寸无法装入' : result.limitingFactor === 'weight' ? '重量' : '体积/摆放'}`,
    ].join('\n')
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const updateField = (field: NumericField, value: string) => setForm((current) => ({ ...current, [field]: value }))

  return (
    <>
      <div className="mb-8"><h1 className="mb-2 text-3xl font-bold">装柜/箱规计算器</h1><p className="text-muted-foreground">根据纸箱尺寸、单箱毛重和总箱数估算整柜装载数量、柜数和利用率</p></div>
      <ContainerLoadStats result={result} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <ContainerLoadForm
          form={form}
          copied={copied}
          doesNotFit={doesNotFit}
          onFieldChange={updateField}
          onContainerChange={(containerType: ContainerType) => setForm((current) => ({ ...current, containerType }))}
          onPreset={(values) => setForm((current) => ({ ...current, ...values }))}
          onCopy={copySummary}
          onReset={() => setForm(INITIAL_FORM)}
        />
        <ContainerLoadResults result={result} containerType={form.containerType} />
      </div>
    </>
  )
}
