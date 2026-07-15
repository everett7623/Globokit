// 名称: 海运费用页面数据
// 描述: 定义表单、预设及金额格式化函数
// 路径: Globokit/app/tools/ocean-freight-calculator/ocean-freight-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import { DEFAULT_OCEAN_FREIGHT_INPUTS, type OceanFreightInputs, type OceanFreightMode } from '@/lib/tools/ocean-freight-calculator'

export type NumericField = Exclude<keyof OceanFreightInputs, 'mode'>
export type FormState = Record<NumericField, string> & { mode: OceanFreightMode }

export const INITIAL_FORM: FormState = {
  mode: DEFAULT_OCEAN_FREIGHT_INPUTS.mode,
  quantity: String(DEFAULT_OCEAN_FREIGHT_INPUTS.quantity), totalCbm: String(DEFAULT_OCEAN_FREIGHT_INPUTS.totalCbm), totalWeightKg: String(DEFAULT_OCEAN_FREIGHT_INPUTS.totalWeightKg),
  containerCount: String(DEFAULT_OCEAN_FREIGHT_INPUTS.containerCount), minChargeableCbm: String(DEFAULT_OCEAN_FREIGHT_INPUTS.minChargeableCbm), oceanFreightForeign: String(DEFAULT_OCEAN_FREIGHT_INPUTS.oceanFreightForeign),
  destinationChargeForeign: String(DEFAULT_OCEAN_FREIGHT_INPUTS.destinationChargeForeign), exchangeRate: String(DEFAULT_OCEAN_FREIGHT_INPUTS.exchangeRate), originChargesCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.originChargesCny),
  truckingFeeCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.truckingFeeCny), customsFeeCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.customsFeeCny), documentFeeCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.documentFeeCny),
  cargoValueCny: String(DEFAULT_OCEAN_FREIGHT_INPUTS.cargoValueCny), insuranceRatePercent: String(DEFAULT_OCEAN_FREIGHT_INPUTS.insuranceRatePercent),
}

export const OCEAN_PRESETS: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '40HQ 整柜', values: INITIAL_FORM },
  { label: '20GP 重货', values: { mode: 'fcl', quantity: '780', totalCbm: '26', totalWeightKg: '21800', containerCount: '1', oceanFreightForeign: '1250', destinationChargeForeign: '280', originChargesCny: '1600', truckingFeeCny: '1450', customsFeeCny: '450', documentFeeCny: '300', cargoValueCny: '96000' } },
  { label: '拼箱小批量', values: { mode: 'lcl', quantity: '80', totalCbm: '4.5', totalWeightKg: '620', minChargeableCbm: '5', oceanFreightForeign: '420', destinationChargeForeign: '160', originChargesCny: '900', truckingFeeCny: '300', customsFeeCny: '350', documentFeeCny: '260', cargoValueCny: '28000' } },
]

const CNY_FORMATTER = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 })

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatCny(value: number) {
  return CNY_FORMATTER.format(value)
}

export function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
}
