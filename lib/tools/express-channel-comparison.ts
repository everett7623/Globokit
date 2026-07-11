export interface ExpressChannelInput {
  id: string
  name: string
  baseFreightCny: number
  fuelRatePercent: number
  remoteFeeCny: number
  customsFeeCny: number
  otherFeeCny: number
  transitDays: number
}

export interface ExpressComparisonInputs {
  chargeableWeightKg: number
  packageCount: number
  channels: ExpressChannelInput[]
}

export interface ExpressChannelResult extends ExpressChannelInput {
  fuelFeeCny: number
  totalCostCny: number
  perKgCny: number
  perPackageCny: number
  costRank: number
  speedRank: number
}

const safe = (value: number) => Number.isFinite(value) && value > 0 ? value : 0
const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100

export function compareExpressChannels(inputs: ExpressComparisonInputs): ExpressChannelResult[] {
  const weight = Math.max(0.01, safe(inputs.chargeableWeightKg))
  const packages = Math.max(1, Math.floor(safe(inputs.packageCount) || 1))
  const rows = inputs.channels.map((channel) => {
    const baseFreightCny = safe(channel.baseFreightCny)
    const fuelFeeCny = baseFreightCny * safe(channel.fuelRatePercent) / 100
    const totalCostCny = baseFreightCny + fuelFeeCny + safe(channel.remoteFeeCny)
      + safe(channel.customsFeeCny) + safe(channel.otherFeeCny)
    return {
      ...channel,
      transitDays: Math.max(1, Math.ceil(safe(channel.transitDays) || 1)),
      fuelFeeCny: round(fuelFeeCny),
      totalCostCny: round(totalCostCny),
      perKgCny: round(totalCostCny / weight),
      perPackageCny: round(totalCostCny / packages),
      costRank: 0,
      speedRank: 0,
    }
  })
  const costOrder = [...rows].sort((a, b) => a.totalCostCny - b.totalCostCny)
  const speedOrder = [...rows].sort((a, b) => a.transitDays - b.transitDays)
  return rows.map((row) => ({
    ...row,
    costRank: costOrder.findIndex((item) => item.id === row.id) + 1,
    speedRank: speedOrder.findIndex((item) => item.id === row.id) + 1,
  }))
}
