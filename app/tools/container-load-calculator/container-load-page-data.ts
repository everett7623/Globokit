// 名称: 装柜计算页面数据
// 描述: 定义表单、预设及显示格式化函数
// 路径: Globokit/app/tools/container-load-calculator/container-load-page-data.ts
// 作者: wwj
// 更新时间: 2026-07-15

import { DEFAULT_CARTON_INPUTS, type ContainerType } from '@/lib/tools/container-load-calculator'

export type NumericField = 'lengthCm' | 'widthCm' | 'heightCm' | 'grossWeightKg' | 'quantity'
export type FormState = Record<NumericField, string> & { containerType: ContainerType }

export const INITIAL_FORM: FormState = {
  lengthCm: String(DEFAULT_CARTON_INPUTS.lengthCm),
  widthCm: String(DEFAULT_CARTON_INPUTS.widthCm),
  heightCm: String(DEFAULT_CARTON_INPUTS.heightCm),
  grossWeightKg: String(DEFAULT_CARTON_INPUTS.grossWeightKg),
  quantity: String(DEFAULT_CARTON_INPUTS.quantity),
  containerType: DEFAULT_CARTON_INPUTS.containerType,
}

export const CONTAINER_PRESETS: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '常规中箱', values: INITIAL_FORM },
  { label: '小件轻货', values: { lengthCm: '35', widthCm: '25', heightCm: '20', grossWeightKg: '4', quantity: '3200', containerType: '40HQ' } },
  { label: '大箱抛货', values: { lengthCm: '80', widthCm: '55', heightCm: '45', grossWeightKg: '9', quantity: '800', containerType: '40HQ' } },
  { label: '重货保守', values: { lengthCm: '45', widthCm: '35', heightCm: '28', grossWeightKg: '28', quantity: '900', containerType: '20GP' } },
]

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}
