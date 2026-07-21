// 名称: 交期计算页面数据
// 描述: 定义交期表单状态、默认值和数值转换
// 路径: Globokit/app/tools/delivery-date-calculator/delivery-date-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-21

import type { DeliveryDayMode } from '@/lib/tools/delivery-date-calculator'

export type DayField = 'productionDays' | 'transitDays' | 'bufferDays'
export type DeliveryDateFormState = Record<DayField, string> & {
  startDate: string
  dayMode: DeliveryDayMode
  excludeHolidays: boolean
  countryCode: string
}

export function createInitialDeliveryForm(startDate: string): DeliveryDateFormState {
  return {
    startDate,
    productionDays: '30',
    transitDays: '20',
    bufferDays: '5',
    dayMode: 'calendar',
    excludeHolidays: false,
    countryCode: 'US',
  }
}

export function toStageDays(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value)
}
