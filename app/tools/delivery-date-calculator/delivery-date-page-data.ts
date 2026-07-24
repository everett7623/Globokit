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

export const DELIVERY_PRESETS: Array<{ label: string; description: string; values: Partial<DeliveryDateFormState> }> = [
  { label: '快递小单', description: '短生产周期、国际快递和少量缓冲时间', values: { productionDays: '7', transitDays: '7', bufferDays: '2', dayMode: 'calendar', excludeHolidays: false } },
  { label: '空运订单', description: '常规生产、空运及清关派送缓冲', values: { productionDays: '20', transitDays: '10', bufferDays: '3', dayMode: 'calendar', excludeHolidays: false } },
  { label: '海运订单', description: '常规生产、海运及船期清关缓冲', values: { productionDays: '30', transitDays: '35', bufferDays: '7', dayMode: 'calendar', excludeHolidays: false } },
  { label: '工作日承诺', description: '生产与交期按工作日计算，并排除所选国家公共假日', values: { productionDays: '20', transitDays: '5', bufferDays: '3', dayMode: 'business', excludeHolidays: true } },
]

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
