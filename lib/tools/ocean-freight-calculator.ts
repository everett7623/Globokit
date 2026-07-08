// 名称: 海运费用拆分计算逻辑
// 描述: 按海运费、本地港杂、报关、保险和目的港费用测算海运总成本与摊销成本
// 路径: Globokit/lib/tools/ocean-freight-calculator.ts
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-08

export type OceanFreightMode = 'fcl' | 'lcl'

export interface OceanFreightInputs {
  mode: OceanFreightMode
  quantity: number
  totalCbm: number
  totalWeightKg: number
  containerCount: number
  minChargeableCbm: number
  oceanFreightForeign: number
  destinationChargeForeign: number
  exchangeRate: number
  originChargesCny: number
  truckingFeeCny: number
  customsFeeCny: number
  documentFeeCny: number
  cargoValueCny: number
  insuranceRatePercent: number
}

export interface OceanFreightCostRow {
  key: string
  label: string
  value: number
}

export interface OceanFreightResult {
  modeLabel: string
  quantity: number
  chargeableCbm: number
  weightTon: number
  freightCny: number
  destinationChargeCny: number
  originSubtotalCny: number
  insuranceFeeCny: number
  totalCostCny: number
  perCbmCny: number
  perKgCny: number
  perCartonCny: number
  perContainerCny: number
  costBreakdown: OceanFreightCostRow[]
}

export const DEFAULT_OCEAN_FREIGHT_INPUTS: OceanFreightInputs = {
  mode: 'fcl',
  quantity: 1200,
  totalCbm: 62,
  totalWeightKg: 15500,
  containerCount: 1,
  minChargeableCbm: 1,
  oceanFreightForeign: 1800,
  destinationChargeForeign: 350,
  exchangeRate: 7.2,
  originChargesCny: 1850,
  truckingFeeCny: 1600,
  customsFeeCny: 450,
  documentFeeCny: 300,
  cargoValueCny: 120000,
  insuranceRatePercent: 0.15,
}

function safePositiveNumber(value: number, fallback = 1) {
  return Number.isFinite(value) && value > 0 ? value : fallback
}

function safeNonNegativeNumber(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export function calculateOceanFreight(inputs: OceanFreightInputs): OceanFreightResult {
  const mode = inputs.mode === 'lcl' ? 'lcl' : 'fcl'
  const quantity = Math.max(1, Math.floor(safePositiveNumber(inputs.quantity, 1)))
  const totalCbm = safePositiveNumber(inputs.totalCbm)
  const totalWeightKg = safePositiveNumber(inputs.totalWeightKg)
  const containerCount = Math.max(1, Math.floor(safePositiveNumber(inputs.containerCount, 1)))
  const minChargeableCbm = safePositiveNumber(inputs.minChargeableCbm, 1)
  const exchangeRate = safePositiveNumber(inputs.exchangeRate, 1)

  const freightCny = safeNonNegativeNumber(inputs.oceanFreightForeign) * exchangeRate
  const destinationChargeCny = safeNonNegativeNumber(inputs.destinationChargeForeign) * exchangeRate
  const originChargesCny = safeNonNegativeNumber(inputs.originChargesCny)
  const truckingFeeCny = safeNonNegativeNumber(inputs.truckingFeeCny)
  const customsFeeCny = safeNonNegativeNumber(inputs.customsFeeCny)
  const documentFeeCny = safeNonNegativeNumber(inputs.documentFeeCny)
  const cargoValueCny = safeNonNegativeNumber(inputs.cargoValueCny)
  const insuranceFeeCny = cargoValueCny * safeNonNegativeNumber(inputs.insuranceRatePercent) / 100
  const originSubtotalCny = originChargesCny + truckingFeeCny + customsFeeCny + documentFeeCny
  const chargeableCbm = mode === 'lcl' ? Math.max(totalCbm, minChargeableCbm) : totalCbm
  const totalCostCny = freightCny + destinationChargeCny + originSubtotalCny + insuranceFeeCny

  const costBreakdown = [
    { key: 'freight', label: '海运费', value: freightCny },
    { key: 'destination', label: '目的港费用', value: destinationChargeCny },
    { key: 'origin', label: '起运港杂费', value: originChargesCny },
    { key: 'trucking', label: '拖车/内陆运输', value: truckingFeeCny },
    { key: 'customs', label: '报关费用', value: customsFeeCny },
    { key: 'document', label: '文件/操作费', value: documentFeeCny },
    { key: 'insurance', label: '保险费', value: insuranceFeeCny },
  ]

  return {
    modeLabel: mode === 'fcl' ? '整柜 FCL' : '拼箱 LCL',
    quantity,
    chargeableCbm: round(chargeableCbm, 3),
    weightTon: round(totalWeightKg / 1000, 3),
    freightCny: round(freightCny),
    destinationChargeCny: round(destinationChargeCny),
    originSubtotalCny: round(originSubtotalCny),
    insuranceFeeCny: round(insuranceFeeCny),
    totalCostCny: round(totalCostCny),
    perCbmCny: round(totalCostCny / chargeableCbm),
    perKgCny: round(totalCostCny / totalWeightKg),
    perCartonCny: round(totalCostCny / quantity),
    perContainerCny: round(totalCostCny / containerCount),
    costBreakdown: costBreakdown.map((row) => ({
      ...row,
      value: round(row.value),
    })),
  }
}
