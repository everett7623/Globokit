// 名称: 空运/快递计费重计算逻辑
// 描述: 根据外箱尺寸、毛重、净重、泡重系数和运价估算空运快递计费重量与费用
// 路径: Globokit/lib/tools/air-freight-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-07-08

export type AirFreightMode = 'express' | 'air' | 'economy'

export interface AirFreightInputs {
  lengthCm: number
  widthCm: number
  heightCm: number
  grossWeightKg: number
  netWeightKg: number
  quantity: number
  divisor: number
  ratePerKg: number
  minCharge: number
  fuelSurchargePercent: number
  handlingFee: number
}

export interface AirFreightResult {
  cartonCbm: number
  totalCbm: number
  actualWeightKg: number
  netWeightKg: number
  volumetricWeightPerCartonKg: number
  volumetricWeightKg: number
  chargeableWeightKg: number
  chargeableWeightPerCartonKg: number
  weightDifferenceKg: number
  billingBasis: 'actual' | 'volumetric'
  baseFreight: number
  fuelSurcharge: number
  handlingFee: number
  totalCharge: number
  unitCharge: number
}

export const AIR_FREIGHT_DIVISORS: Record<AirFreightMode, { label: string; value: number; note: string }> = {
  express: {
    label: '快递 5000',
    value: 5000,
    note: 'DHL、FedEx、UPS 等商业快递常见口径',
  },
  air: {
    label: '空运 6000',
    value: 6000,
    note: '常见空运泡重口径，实际以货代报价为准',
  },
  economy: {
    label: '经济 7000',
    value: 7000,
    note: '部分经济渠道或专线可能使用更宽松口径',
  },
}

export const DEFAULT_AIR_FREIGHT_INPUTS: AirFreightInputs = {
  lengthCm: 43,
  widthCm: 33,
  heightCm: 22,
  grossWeightKg: 13,
  netWeightKg: 12,
  quantity: 12,
  divisor: AIR_FREIGHT_DIVISORS.express.value,
  ratePerKg: 42,
  minCharge: 0,
  fuelSurchargePercent: 12,
  handlingFee: 80,
}

function safePositiveNumber(value: number, fallback = 0) {
  return Number.isFinite(value) && value > 0 ? value : fallback
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export function calculateAirFreight(inputs: AirFreightInputs): AirFreightResult {
  const lengthCm = safePositiveNumber(inputs.lengthCm)
  const widthCm = safePositiveNumber(inputs.widthCm)
  const heightCm = safePositiveNumber(inputs.heightCm)
  const grossWeightKg = safePositiveNumber(inputs.grossWeightKg)
  const netWeightKg = safePositiveNumber(inputs.netWeightKg)
  const quantity = Math.max(1, Math.floor(safePositiveNumber(inputs.quantity, 1)))
  const divisor = Math.max(1, safePositiveNumber(inputs.divisor, AIR_FREIGHT_DIVISORS.express.value))
  const ratePerKg = safePositiveNumber(inputs.ratePerKg)
  const minCharge = safePositiveNumber(inputs.minCharge)
  const fuelSurchargePercent = safePositiveNumber(inputs.fuelSurchargePercent)
  const handlingFee = safePositiveNumber(inputs.handlingFee)

  const cartonCbm = lengthCm * widthCm * heightCm / 1_000_000
  const totalCbm = cartonCbm * quantity
  const actualWeightKg = grossWeightKg * quantity
  const totalNetWeightKg = netWeightKg * quantity
  const volumetricWeightPerCartonKg = lengthCm * widthCm * heightCm / divisor
  const volumetricWeightKg = volumetricWeightPerCartonKg * quantity
  const chargeableWeightKg = Math.max(actualWeightKg, volumetricWeightKg)
  const baseFreightBeforeMin = chargeableWeightKg * ratePerKg
  const baseFreight = Math.max(baseFreightBeforeMin, minCharge)
  const fuelSurcharge = baseFreight * fuelSurchargePercent / 100
  const totalCharge = baseFreight + fuelSurcharge + handlingFee

  return {
    cartonCbm: round(cartonCbm, 4),
    totalCbm: round(totalCbm, 3),
    actualWeightKg: round(actualWeightKg, 2),
    netWeightKg: round(totalNetWeightKg, 2),
    volumetricWeightPerCartonKg: round(volumetricWeightPerCartonKg, 2),
    volumetricWeightKg: round(volumetricWeightKg, 2),
    chargeableWeightKg: round(chargeableWeightKg, 2),
    chargeableWeightPerCartonKg: round(chargeableWeightKg / quantity, 2),
    weightDifferenceKg: round(Math.abs(volumetricWeightKg - actualWeightKg), 2),
    billingBasis: volumetricWeightKg > actualWeightKg ? 'volumetric' : 'actual',
    baseFreight: round(baseFreight, 2),
    fuelSurcharge: round(fuelSurcharge, 2),
    handlingFee: round(handlingFee, 2),
    totalCharge: round(totalCharge, 2),
    unitCharge: round(totalCharge / quantity, 2),
  }
}
