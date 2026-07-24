import { calculateAirFreight } from './air-freight-calculator'

export type ExpressServiceType = 'express' | 'air' | 'ddp-line'
export type ExpressTradeTerm = 'DDP' | 'DAP' | 'CPT'
export type ExpressPricingMode = 'per-kg' | 'total-base' | 'all-in'

export interface ExpressShipmentInput {
  lengthCm: number
  widthCm: number
  heightCm: number
  grossWeightKg: number
  netWeightKg: number
  packageCount: number
}

export interface ExpressChannelInput {
  id: string
  name: string
  serviceType: ExpressServiceType
  tradeTerm: ExpressTradeTerm
  divisor: number
  pricingMode: ExpressPricingMode
  quoteAmountCny: number
  fuelRatePercent: number
  remoteFeeCny: number
  customsFeeCny: number
  otherFeeCny: number
  transitDaysMin: number
  transitDaysMax: number
}

export interface ExpressComparisonInputs extends ExpressShipmentInput {
  channels: ExpressChannelInput[]
}

export interface ExpressChannelResult extends ExpressChannelInput {
  actualWeightKg: number
  volumetricWeightKg: number
  chargeableWeightKg: number
  billingBasis: 'actual' | 'volumetric'
  baseFreightCny: number
  fuelFeeCny: number
  totalCostCny: number
  perKgCny: number
  perPackageCny: number
  costRank: number
  speedRank: number
}

export const EXPRESS_SERVICE_LABELS: Record<ExpressServiceType, string> = {
  express: '商业快递',
  air: '空运',
  'ddp-line': 'DDP 专线',
}

export const EXPRESS_TRADE_TERM_LABELS: Record<ExpressTradeTerm, string> = {
  DDP: 'DDP 包税到门',
  DAP: 'DAP 到门不包税',
  CPT: 'CPT 主运费',
}

export const EXPRESS_PRICING_MODE_LABELS: Record<ExpressPricingMode, string> = {
  'per-kg': '按计费重单价',
  'total-base': '整票基础价',
  'all-in': '整票一口价',
}

const safe = (value: number) => Number.isFinite(value) && value > 0 ? value : 0
const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100

export function compareExpressChannels(inputs: ExpressComparisonInputs): ExpressChannelResult[] {
  const packages = Math.max(1, Math.floor(safe(inputs.packageCount) || 1))
  const rows = inputs.channels.filter((channel) => safe(channel.quoteAmountCny) > 0).map((channel) => {
    const divisor = Math.max(1, safe(channel.divisor) || 5000)
    const weightResult = calculateAirFreight({
      lengthCm: inputs.lengthCm,
      widthCm: inputs.widthCm,
      heightCm: inputs.heightCm,
      grossWeightKg: inputs.grossWeightKg,
      netWeightKg: inputs.netWeightKg,
      quantity: packages,
      divisor,
      ratePerKg: 0,
      minCharge: 0,
      fuelSurchargePercent: 0,
      handlingFee: 0,
    })
    const quoteAmountCny = safe(channel.quoteAmountCny)
    const baseFreightCny = channel.pricingMode === 'per-kg'
      ? quoteAmountCny * weightResult.chargeableWeightKg
      : quoteAmountCny
    const hasSeparateFees = channel.pricingMode !== 'all-in'
    const fuelFeeCny = hasSeparateFees ? baseFreightCny * safe(channel.fuelRatePercent) / 100 : 0
    const extraFees = hasSeparateFees
      ? safe(channel.remoteFeeCny) + safe(channel.customsFeeCny) + safe(channel.otherFeeCny)
      : 0
    const totalCostCny = baseFreightCny + fuelFeeCny + extraFees
    const transitDayA = Math.max(1, Math.ceil(safe(channel.transitDaysMin) || 1))
    const transitDayB = Math.max(1, Math.ceil(safe(channel.transitDaysMax) || transitDayA))
    const firstTransitDay = Math.min(transitDayA, transitDayB)
    const lastTransitDay = Math.max(transitDayA, transitDayB)
    return {
      ...channel,
      divisor,
      quoteAmountCny,
      transitDaysMin: firstTransitDay,
      transitDaysMax: lastTransitDay,
      actualWeightKg: weightResult.actualWeightKg,
      volumetricWeightKg: weightResult.volumetricWeightKg,
      chargeableWeightKg: weightResult.chargeableWeightKg,
      billingBasis: weightResult.billingBasis,
      baseFreightCny: round(baseFreightCny),
      fuelFeeCny: round(fuelFeeCny),
      totalCostCny: round(totalCostCny),
      perKgCny: weightResult.chargeableWeightKg > 0 ? round(totalCostCny / weightResult.chargeableWeightKg) : 0,
      perPackageCny: round(totalCostCny / packages),
      costRank: 0,
      speedRank: 0,
    }
  })
  const costOrder = [...rows].sort((a, b) => a.totalCostCny - b.totalCostCny)
  const speedOrder = [...rows].sort((a, b) => a.transitDaysMax - b.transitDaysMax)
  return rows.map((row) => ({
    ...row,
    costRank: costOrder.findIndex((item) => item.id === row.id) + 1,
    speedRank: speedOrder.findIndex((item) => item.id === row.id) + 1,
  }))
}
