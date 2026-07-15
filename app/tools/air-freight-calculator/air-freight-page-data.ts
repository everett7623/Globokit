// 名称: 空运计费页面数据
// 描述: 定义表单、泡重选项、预设及格式化函数
// 路径: Globokit/app/tools/air-freight-calculator/air-freight-page-data.ts
// 作者: wwj
// 更新时间: 2026-07-15

import { AIR_FREIGHT_DIVISORS, DEFAULT_AIR_FREIGHT_INPUTS, type AirFreightMode } from '@/lib/tools/air-freight-calculator'

export type NumericField = 'lengthCm' | 'widthCm' | 'heightCm' | 'grossWeightKg' | 'netWeightKg' | 'quantity' | 'divisor' | 'ratePerKg' | 'minCharge' | 'fuelSurchargePercent' | 'handlingFee'
export type DivisorChoice = AirFreightMode | 'custom'
export type FormState = Record<NumericField, string> & { divisorChoice: DivisorChoice }

export const INITIAL_FORM: FormState = {
  lengthCm: String(DEFAULT_AIR_FREIGHT_INPUTS.lengthCm), widthCm: String(DEFAULT_AIR_FREIGHT_INPUTS.widthCm), heightCm: String(DEFAULT_AIR_FREIGHT_INPUTS.heightCm),
  grossWeightKg: String(DEFAULT_AIR_FREIGHT_INPUTS.grossWeightKg), netWeightKg: String(DEFAULT_AIR_FREIGHT_INPUTS.netWeightKg), quantity: String(DEFAULT_AIR_FREIGHT_INPUTS.quantity),
  divisor: String(DEFAULT_AIR_FREIGHT_INPUTS.divisor), ratePerKg: String(DEFAULT_AIR_FREIGHT_INPUTS.ratePerKg), minCharge: String(DEFAULT_AIR_FREIGHT_INPUTS.minCharge),
  fuelSurchargePercent: String(DEFAULT_AIR_FREIGHT_INPUTS.fuelSurchargePercent), handlingFee: String(DEFAULT_AIR_FREIGHT_INPUTS.handlingFee), divisorChoice: 'express',
}

export const AIR_PRESETS: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '快递小票', values: INITIAL_FORM },
  { label: '轻抛货', values: { lengthCm: '60', widthCm: '45', heightCm: '40', grossWeightKg: '6.5', netWeightKg: '5.8', quantity: '18', divisorChoice: 'express', divisor: String(AIR_FREIGHT_DIVISORS.express.value), ratePerKg: '38', fuelSurchargePercent: '14', handlingFee: '120' } },
  { label: '普货空运', values: { lengthCm: '50', widthCm: '40', heightCm: '35', grossWeightKg: '18', netWeightKg: '16.5', quantity: '30', divisorChoice: 'air', divisor: String(AIR_FREIGHT_DIVISORS.air.value), ratePerKg: '25', fuelSurchargePercent: '0', handlingFee: '300' } },
  { label: '专线经济', values: { lengthCm: '42', widthCm: '32', heightCm: '28', grossWeightKg: '7.8', netWeightKg: '7', quantity: '60', divisorChoice: 'economy', divisor: String(AIR_FREIGHT_DIVISORS.economy.value), ratePerKg: '18', minCharge: '980', fuelSurchargePercent: '6', handlingFee: '150' } },
]

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value)
}
