// 名称: 纸箱包装方案对比页面数据
// 描述: 管理表单状态、场景预设、输入转换与复制摘要
// 路径: Globokit/app/tools/packaging-plan-comparison/packaging-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

import {
  DEFAULT_PACKAGING_COMPARISON_INPUTS,
  type PackagingComparisonInputs,
  type PackagingComparisonResult,
  type PackagingPlanInput,
  type PackagingShippingMode,
} from '@/lib/tools/packaging-plan-comparison'

export type PackagingPlanNumericField = Exclude<keyof PackagingPlanInput, 'id' | 'name'>
export type PackagingCommonField = 'totalUnits' | 'volumetricDivisor' | 'airRateCnyPerKg' | 'oceanRateCnyPerCbm'

export interface PackagingPlanFormState extends Record<PackagingPlanNumericField, string> {
  id: string
  name: string
}

export interface PackagingComparisonFormState extends Record<PackagingCommonField, string> {
  shippingMode: PackagingShippingMode
  plans: PackagingPlanFormState[]
}

export interface PackagingPreset {
  label: string
  description: string
  values: Partial<PackagingComparisonFormState>
}

const toPlanForm = (plan: PackagingPlanInput): PackagingPlanFormState => ({
  id: plan.id,
  name: plan.name,
  lengthCm: String(plan.lengthCm),
  widthCm: String(plan.widthCm),
  heightCm: String(plan.heightCm),
  unitsPerCarton: String(plan.unitsPerCarton),
  grossWeightKg: String(plan.grossWeightKg),
  cartonCostCny: String(plan.cartonCostCny),
})

const AIR_PLANS = DEFAULT_PACKAGING_COMPARISON_INPUTS.plans.map(toPlanForm)
const EXPRESS_PLANS: PackagingPlanFormState[] = [
  { id: 'express-a', name: '小箱实重方案', lengthCm: '32', widthCm: '24', heightCm: '18', unitsPerCarton: '12', grossWeightKg: '4', cartonCostCny: '5' },
  { id: 'express-b', name: '中箱平衡方案', lengthCm: '40', widthCm: '30', heightCm: '25', unitsPerCarton: '24', grossWeightKg: '6', cartonCostCny: '8' },
  { id: 'express-c', name: '大箱轻抛方案', lengthCm: '50', widthCm: '40', heightCm: '30', unitsPerCarton: '40', grossWeightKg: '9', cartonCostCny: '12' },
]
const OCEAN_PLANS: PackagingPlanFormState[] = [
  { id: 'ocean-a', name: '紧凑出口箱', lengthCm: '42', widthCm: '32', heightCm: '28', unitsPerCarton: '24', grossWeightKg: '14', cartonCostCny: '9' },
  { id: 'ocean-b', name: '标准出口箱', lengthCm: '52', widthCm: '42', heightCm: '36', unitsPerCarton: '48', grossWeightKg: '26', cartonCostCny: '13' },
  { id: 'ocean-c', name: '加固出口箱', lengthCm: '60', widthCm: '45', heightCm: '42', unitsPerCarton: '60', grossWeightKg: '32', cartonCostCny: '18' },
]

export const PACKAGING_PRESETS: readonly PackagingPreset[] = [
  { label: '空运普货', description: '6000 泡重系数与常规纸箱方案', values: { shippingMode: 'air', volumetricDivisor: '6000', airRateCnyPerKg: '32', plans: AIR_PLANS } },
  { label: '快递轻货', description: '5000 泡重系数，突出轻抛货体积重差异', values: { shippingMode: 'air', volumetricDivisor: '5000', airRateCnyPerKg: '45', plans: EXPRESS_PLANS } },
  { label: '海运外箱', description: '按 CBM 比较紧凑、标准与加固出口箱', values: { shippingMode: 'ocean', oceanRateCnyPerCbm: '680', plans: OCEAN_PLANS } },
]

export function createInitialForm(): PackagingComparisonFormState {
  const inputs = DEFAULT_PACKAGING_COMPARISON_INPUTS
  return {
    totalUnits: String(inputs.totalUnits),
    shippingMode: inputs.shippingMode,
    volumetricDivisor: String(inputs.volumetricDivisor),
    airRateCnyPerKg: String(inputs.airRateCnyPerKg),
    oceanRateCnyPerCbm: String(inputs.oceanRateCnyPerCbm),
    plans: inputs.plans.map(toPlanForm),
  }
}

export function createAdditionalPlan(plans: PackagingPlanFormState[]): PackagingPlanFormState {
  let suffix = 1
  while (plans.some((plan) => plan.id === `custom-${suffix}`)) suffix += 1
  return { id: `custom-${suffix}`, name: `自定义方案 ${suffix}`, lengthCm: '50', widthCm: '40', heightCm: '35', unitsPerCarton: '40', grossWeightKg: '22', cartonCostCny: '12' }
}

function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function toInputs(form: PackagingComparisonFormState): PackagingComparisonInputs {
  return {
    totalUnits: toNumber(form.totalUnits),
    shippingMode: form.shippingMode,
    volumetricDivisor: toNumber(form.volumetricDivisor),
    airRateCnyPerKg: toNumber(form.airRateCnyPerKg),
    oceanRateCnyPerCbm: toNumber(form.oceanRateCnyPerCbm),
    plans: form.plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      lengthCm: toNumber(plan.lengthCm),
      widthCm: toNumber(plan.widthCm),
      heightCm: toNumber(plan.heightCm),
      unitsPerCarton: toNumber(plan.unitsPerCarton),
      grossWeightKg: toNumber(plan.grossWeightKg),
      cartonCostCny: toNumber(plan.cartonCostCny),
    })),
  }
}

export const formatMoney = (value: number) => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 }).format(value)
export const formatWeight = (value: number) => `${value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })} kg`
export const formatCbm = (value: number) => `${value.toLocaleString('zh-CN', { minimumFractionDigits: 3, maximumFractionDigits: 4 })} CBM`

export function buildPackagingSummary(result: PackagingComparisonResult) {
  const best = result.plans.find((plan) => plan.id === result.bestCostPlanId) ?? result.plans[0]
  const modeLabel = result.shippingMode === 'air' ? `空运，${result.volumetricDivisor} 泡重系数` : '海运，按 CBM 计费'
  return [
    '纸箱包装方案对比',
    `产品总件数：${result.totalUnits.toLocaleString('zh-CN')}`,
    `运输口径：${modeLabel}`,
    `预估运价：${formatMoney(result.freightRate)}/${result.shippingMode === 'air' ? 'kg' : 'CBM'}`,
    ...result.plans.map((plan) => `${plan.name}：${plan.cartonCount} 箱，${formatCbm(plan.totalCbm)}，${result.shippingMode === 'air' ? `计费重 ${formatWeight(plan.chargeableWeightKg)}` : `总毛重 ${formatWeight(plan.totalGrossWeightKg)}`}，包装+运输 ${formatMoney(plan.totalLogisticsCostCny)}，单件 ${formatMoney(plan.costPerUnitCny)}`),
    `推荐方案：${best.name}（预计总成本最低）`,
    '注：费用仅按用户输入的纸箱成本和运输单价估算，不含燃油、最低收费、港杂、托盘及其他附加费。',
  ].join('\n')
}
