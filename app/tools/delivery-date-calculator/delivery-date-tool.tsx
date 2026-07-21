// 名称: 外贸交期计算器交互容器
// 描述: 管理交期表单状态、计算结果与摘要复制
// 路径: Globokit/app/tools/delivery-date-calculator/delivery-date-tool.tsx
// 作者: everettlabs
// 更新时间: 2026-07-21

'use client'

import { useEffect, useMemo, useState } from 'react'
import { DeliveryDateForm } from './delivery-date-form'
import { createInitialDeliveryForm, toStageDays, type DayField } from './delivery-date-page-data'
import { DeliveryDateResults } from './delivery-date-results'
import { calculateDeliveryDate, formatDeliveryDateEnglish, getDateKeyInTimeZone, type DeliveryDayMode } from '@/lib/tools/delivery-date-calculator'

export function DeliveryDateTool({ defaultStartDate }: { defaultStartDate: string }) {
  const [form, setForm] = useState(() => createInitialDeliveryForm(defaultStartDate))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const today = getDateKeyInTimeZone(new Date())
    setForm((current) => current.startDate === defaultStartDate ? { ...current, startDate: today } : current)
  }, [defaultStartDate])

  const calculation = useMemo(() => calculateDeliveryDate({
    startDate: form.startDate,
    productionDays: toStageDays(form.productionDays),
    transitDays: toStageDays(form.transitDays),
    bufferDays: toStageDays(form.bufferDays),
    dayMode: form.dayMode,
    excludeHolidays: form.excludeHolidays,
    countryCode: form.countryCode,
  }), [form])

  const updateDayField = (field: DayField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const copySummary = async () => {
    if (!calculation.result) return
    const result = calculation.result
    const milestoneLabels = { production: 'Production Complete', transit: 'Transit Complete', delivery: 'Estimated Delivery' } as const
    const lines = ['Delivery Lead Time Estimate', `Start Date: ${formatDeliveryDateEnglish(result.startDate)}`, `Calculation Basis: ${form.dayMode === 'business' ? 'Business days' : 'Calendar days'}`, ...result.milestones.map((milestone) => `${milestoneLabels[milestone.key]}: ${formatDeliveryDateEnglish(milestone.date)} (+${milestone.days} days)`), `Weekend Days Excluded: ${result.weekendDaysSkipped}`, `Public Holidays Excluded: ${result.holidayDaysSkipped}`]
    await navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return <><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">外贸交期计算器</h1><p className="text-muted-foreground">按生产、运输和缓冲周期推算交付日期，支持自然日、工作日与国家公共假日口径</p></div><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_460px]"><DeliveryDateForm form={form} copied={copied} canCopy={Boolean(calculation.result)} onStartDate={(startDate) => setForm((current) => ({ ...current, startDate }))} onDayField={updateDayField} onMode={(dayMode: DeliveryDayMode) => setForm((current) => ({ ...current, dayMode }))} onHolidayToggle={() => setForm((current) => ({ ...current, excludeHolidays: !current.excludeHolidays }))} onCountry={(countryCode) => setForm((current) => ({ ...current, countryCode }))} onCopy={copySummary} onReset={() => setForm(createInitialDeliveryForm(getDateKeyInTimeZone(new Date())))} /><DeliveryDateResults calculation={calculation} /></div></>
}
