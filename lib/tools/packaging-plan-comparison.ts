// 名称: 纸箱包装方案对比逻辑
// 描述: 比较不同纸箱方案的箱数、CBM、计费重、包装成本与预估运输成本
// 路径: Globokit/lib/tools/packaging-plan-comparison.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

export type PackagingShippingMode = 'air' | 'ocean'

export interface PackagingPlanInput {
  id: string
  name: string
  lengthCm: number
  widthCm: number
  heightCm: number
  unitsPerCarton: number
  grossWeightKg: number
  cartonCostCny: number
}

export interface PackagingComparisonInputs {
  totalUnits: number
  shippingMode: PackagingShippingMode
  volumetricDivisor: number
  airRateCnyPerKg: number
  oceanRateCnyPerCbm: number
  plans: PackagingPlanInput[]
}

export interface PackagingPlanResult extends PackagingPlanInput {
  cartonCount: number
  capacityUnits: number
  unusedCapacityUnits: number
  unusedCapacityPercent: number
  cartonCbm: number
  totalCbm: number
  totalGrossWeightKg: number
  totalVolumetricWeightKg: number
  chargeableWeightKg: number
  billingBasis: 'actual' | 'volumetric'
  packagingCostCny: number
  freightCostCny: number
  totalLogisticsCostCny: number
  costPerUnitCny: number
  unitsPerCbm: number
  costRank: number
  volumeRank: number
  chargeableWeightRank: number
}

export interface PackagingComparisonResult {
  totalUnits: number
  shippingMode: PackagingShippingMode
  volumetricDivisor: number
  freightRate: number
  bestCostPlanId: string
  lowestVolumePlanId: string
  lowestChargeableWeightPlanId: string
  plans: PackagingPlanResult[]
}

export const MIN_PACKAGING_PLANS = 2
export const MAX_PACKAGING_PLANS = 4

export const DEFAULT_PACKAGING_COMPARISON_INPUTS: PackagingComparisonInputs = {
  totalUnits: 1000,
  shippingMode: 'air',
  volumetricDivisor: 6000,
  airRateCnyPerKg: 32,
  oceanRateCnyPerCbm: 680,
  plans: [
    { id: 'plan-a', name: '紧凑小箱', lengthCm: 40, widthCm: 30, heightCm: 25, unitsPerCarton: 20, grossWeightKg: 12, cartonCostCny: 8 },
    { id: 'plan-b', name: '标准中箱', lengthCm: 50, widthCm: 40, heightCm: 35, unitsPerCarton: 40, grossWeightKg: 22, cartonCostCny: 12 },
    { id: 'plan-c', name: '防护大箱', lengthCm: 55, widthCm: 45, heightCm: 40, unitsPerCarton: 50, grossWeightKg: 28, cartonCostCny: 15 },
  ],
}

function requireFinite(value: number, label: string, min: number, max: number) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  }
  return value
}

function requireInteger(value: number, label: string, min: number, max: number) {
  requireFinite(value, label, min, max)
  if (!Number.isInteger(value)) throw new Error(`${label}必须是整数`)
  return value
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function rankBy(rows: PackagingPlanResult[], value: (row: PackagingPlanResult) => number) {
  return [...rows].sort((a, b) => value(a) - value(b)).map((row) => row.id)
}

export function comparePackagingPlans(inputs: PackagingComparisonInputs): PackagingComparisonResult {
  if (inputs.shippingMode !== 'air' && inputs.shippingMode !== 'ocean') throw new Error('请选择有效的运输方式')
  const totalUnits = requireInteger(inputs.totalUnits, '产品总件数', 1, 1_000_000_000)
  const volumetricDivisor = inputs.shippingMode === 'air'
    ? requireFinite(inputs.volumetricDivisor, '体积重系数', 1, 1_000_000)
    : Number.isFinite(inputs.volumetricDivisor) && inputs.volumetricDivisor >= 1 ? inputs.volumetricDivisor : DEFAULT_PACKAGING_COMPARISON_INPUTS.volumetricDivisor
  const airRateCnyPerKg = inputs.shippingMode === 'air' ? requireFinite(inputs.airRateCnyPerKg, '空运单价', 0, 1_000_000) : 0
  const oceanRateCnyPerCbm = inputs.shippingMode === 'ocean' ? requireFinite(inputs.oceanRateCnyPerCbm, '海运单价', 0, 1_000_000) : 0
  if (inputs.plans.length < MIN_PACKAGING_PLANS || inputs.plans.length > MAX_PACKAGING_PLANS) {
    throw new Error(`包装方案必须为 ${MIN_PACKAGING_PLANS} 到 ${MAX_PACKAGING_PLANS} 个`)
  }
  const ids = new Set(inputs.plans.map((plan) => plan.id))
  if (ids.size !== inputs.plans.length) throw new Error('包装方案 ID 不能重复')

  const calculated = inputs.plans.map((plan, index): PackagingPlanResult => {
    const planLabel = `方案 ${index + 1}`
    const name = plan.name.trim()
    if (!name) throw new Error(`${planLabel}名称不能为空`)
    const lengthCm = requireFinite(plan.lengthCm, `${name}长度`, 0.01, 100_000)
    const widthCm = requireFinite(plan.widthCm, `${name}宽度`, 0.01, 100_000)
    const heightCm = requireFinite(plan.heightCm, `${name}高度`, 0.01, 100_000)
    const unitsPerCarton = requireInteger(plan.unitsPerCarton, `${name}每箱装量`, 1, 1_000_000_000)
    const grossWeightKg = requireFinite(plan.grossWeightKg, `${name}单箱毛重`, 0.01, 1_000_000)
    const cartonCostCny = requireFinite(plan.cartonCostCny, `${name}单箱包装成本`, 0, 1_000_000)
    const cartonCount = Math.ceil(totalUnits / unitsPerCarton)
    const cartonCbm = lengthCm * widthCm * heightCm / 1_000_000
    const totalCbm = cartonCbm * cartonCount
    const totalGrossWeightKg = grossWeightKg * cartonCount
    const totalVolumetricWeightKg = lengthCm * widthCm * heightCm / volumetricDivisor * cartonCount
    const chargeableWeightKg = Math.max(totalGrossWeightKg, totalVolumetricWeightKg)
    const freightCostCny = inputs.shippingMode === 'air'
      ? chargeableWeightKg * airRateCnyPerKg
      : totalCbm * oceanRateCnyPerCbm
    const packagingCostCny = cartonCostCny * cartonCount
    const totalLogisticsCostCny = freightCostCny + packagingCostCny
    const capacityUnits = cartonCount * unitsPerCarton

    return {
      ...plan,
      name,
      lengthCm,
      widthCm,
      heightCm,
      unitsPerCarton,
      grossWeightKg,
      cartonCostCny,
      cartonCount,
      capacityUnits,
      unusedCapacityUnits: capacityUnits - totalUnits,
      unusedCapacityPercent: capacityUnits > 0 ? (capacityUnits - totalUnits) / capacityUnits * 100 : 0,
      cartonCbm: round(cartonCbm, 4),
      totalCbm: round(totalCbm, 4),
      totalGrossWeightKg: round(totalGrossWeightKg),
      totalVolumetricWeightKg: round(totalVolumetricWeightKg),
      chargeableWeightKg: round(chargeableWeightKg),
      billingBasis: totalVolumetricWeightKg > totalGrossWeightKg ? 'volumetric' : 'actual',
      packagingCostCny: round(packagingCostCny),
      freightCostCny: round(freightCostCny),
      totalLogisticsCostCny: round(totalLogisticsCostCny),
      costPerUnitCny: round(totalLogisticsCostCny / totalUnits, 4),
      unitsPerCbm: round(totalUnits / totalCbm, 2),
      costRank: 0,
      volumeRank: 0,
      chargeableWeightRank: 0,
    }
  })
  const costOrder = rankBy(calculated, (plan) => plan.totalLogisticsCostCny)
  const volumeOrder = rankBy(calculated, (plan) => plan.totalCbm)
  const weightOrder = rankBy(calculated, (plan) => plan.chargeableWeightKg)
  const plans = calculated.map((plan) => ({
    ...plan,
    costRank: costOrder.indexOf(plan.id) + 1,
    volumeRank: volumeOrder.indexOf(plan.id) + 1,
    chargeableWeightRank: weightOrder.indexOf(plan.id) + 1,
  }))

  return {
    totalUnits,
    shippingMode: inputs.shippingMode,
    volumetricDivisor,
    freightRate: inputs.shippingMode === 'air' ? airRateCnyPerKg : oceanRateCnyPerCbm,
    bestCostPlanId: costOrder[0],
    lowestVolumePlanId: volumeOrder[0],
    lowestChargeableWeightPlanId: weightOrder[0],
    plans,
  }
}
