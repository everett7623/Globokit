// 名称: 外贸交期计算器交互容器
// 描述: 管理交期表单状态、计算结果与摘要复制
// 路径: Globokit/app/tools/delivery-date-calculator/delivery-date-tool.tsx
// 作者: everettlabs
// 更新时间: 2026-07-21

'use client'

import { useMemo, useState } from 'react'
import { useClientDate } from '@/lib/client-hooks'
import { DeliveryDateForm } from './delivery-date-form'
import { createInitialDeliveryForm, toStageDays, type DayField } from './delivery-date-page-data'
import { DeliveryDateResults } from './delivery-date-results'
import { calculateDeliveryDate, formatDeliveryDateEnglish, getDateKeyInTimeZone, type DeliveryDayMode } from '@/lib/tools/delivery-date-calculator'

export function DeliveryDateTool({ defaultStartDate }: { defaultStartDate: string }) {
  const [form, setForm] = useState(() => createInitialDeliveryForm(defaultStartDate))
  const clientDate = useClientDate()

  // 客户端挂载前以服务端日期占位，挂载后派生为浏览器当天，不产生 effect 级联
  const effectiveForm = useMemo(() => {
    if (!clientDate || form.startDate !== defaultStartDate) return form
    const today = getDateKeyInTimeZone(clientDate)
    return today === defaultStartDate ? form : { ...form, startDate: today }
  }, [clientDate, form, defaultStartDate])

  const calculation = useMemo(() => calculateDeliveryDate({
    startDate: effectiveForm.startDate,
    productionDays: toStageDays(effectiveForm.productionDays),
    transitDays: toStageDays(effectiveForm.transitDays),
    bufferDays: toStageDays(effectiveForm.bufferDays),
    dayMode: effectiveForm.dayMode,
    excludeHolidays: effectiveForm.excludeHolidays,
    countryCode: effectiveForm.countryCode,
  }), [effectiveForm])

  const updateDayField = (field: DayField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const copySummary = () => {
    if (!calculation.result) return ''
    const result = calculation.result
    const milestoneLabels = { production: 'Production Complete', transit: 'Transit Complete', delivery: 'Estimated Delivery' } as const
    const lines = ['Delivery Lead Time Estimate', `Start Date: ${formatDeliveryDateEnglish(result.startDate)}`, `Lead Time: Production ${effectiveForm.productionDays} days + Transit ${effectiveForm.transitDays} days + Buffer ${effectiveForm.bufferDays} days`, `Calculation Basis: ${effectiveForm.dayMode === 'business' ? 'Business days' : 'Calendar days'}`, ...result.milestones.map((milestone) => `${milestoneLabels[milestone.key]}: ${formatDeliveryDateEnglish(milestone.date)} (+${milestone.days} days)`), `Weekend Days Excluded: ${result.weekendDaysSkipped}`, `Public Holidays Excluded: ${result.holidayDaysSkipped}`]
    return lines.join('\n')
  }

  return <><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">外贸交期计算器</h1><p className="text-muted-foreground">按生产、运输和缓冲周期推算交付日期，支持自然日、工作日与国家公共假日口径</p></div><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_460px]"><DeliveryDateForm form={effectiveForm} copyText={copySummary()} canCopy={Boolean(calculation.result)} onStartDate={(startDate) => setForm((current) => ({ ...current, startDate }))} onDayField={updateDayField} onMode={(dayMode: DeliveryDayMode) => setForm((current) => ({ ...current, dayMode }))} onHolidayToggle={() => setForm((current) => ({ ...current, excludeHolidays: !current.excludeHolidays }))} onCountry={(countryCode) => setForm((current) => ({ ...current, countryCode }))} onPreset={(values) => setForm((current) => ({ ...current, ...values }))} onReset={() => setForm(createInitialDeliveryForm(getDateKeyInTimeZone(new Date())))} /><DeliveryDateResults calculation={calculation} /></div></>
}
