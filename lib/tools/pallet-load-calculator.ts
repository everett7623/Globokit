export type PalletType = 'china' | 'euro' | 'north-america'

export interface PalletSpec {
  type: PalletType
  name: string
  lengthCm: number
  widthCm: number
  baseHeightCm: number
  tareWeightKg: number
}

export const PALLET_SPECS: Record<PalletType, PalletSpec> = {
  china: { type: 'china', name: '中国标准托盘', lengthCm: 120, widthCm: 100, baseHeightCm: 15, tareWeightKg: 25 },
  euro: { type: 'euro', name: '欧标托盘 EUR', lengthCm: 120, widthCm: 80, baseHeightCm: 14.4, tareWeightKg: 25 },
  'north-america': { type: 'north-america', name: '北美标准托盘', lengthCm: 121.9, widthCm: 101.6, baseHeightCm: 14.4, tareWeightKg: 18 },
}

export interface PalletLoadInputs {
  cartonLengthCm: number
  cartonWidthCm: number
  cartonHeightCm: number
  cartonWeightKg: number
  cartonQuantity: number
  palletType: PalletType
  maxLoadedHeightCm: number
  maxGrossWeightKg: number
}

export const DEFAULT_PALLET_LOAD_INPUTS: PalletLoadInputs = {
  cartonLengthCm: 40,
  cartonWidthCm: 30,
  cartonHeightCm: 25,
  cartonWeightKg: 8,
  cartonQuantity: 240,
  palletType: 'china',
  maxLoadedHeightCm: 180,
  maxGrossWeightKg: 1000,
}

const positive = (value: number) => Number.isFinite(value) && value > 0 ? value : 0
const whole = (value: number) => Math.floor(positive(value))
const round = (value: number, digits = 2) => Number(value.toFixed(digits))

export function calculatePalletLoad(raw: PalletLoadInputs) {
  const pallet = PALLET_SPECS[raw.palletType] ?? PALLET_SPECS.china
  const cartonLength = positive(raw.cartonLengthCm)
  const cartonWidth = positive(raw.cartonWidthCm)
  const cartonHeight = positive(raw.cartonHeightCm)
  const cartonWeight = positive(raw.cartonWeightKg)
  const quantity = whole(raw.cartonQuantity)
  const maxHeight = positive(raw.maxLoadedHeightCm)
  const maxGrossWeight = positive(raw.maxGrossWeightKg)

  const orientations = [
    { lengthCm: cartonLength, widthCm: cartonWidth, rotated: false },
    { lengthCm: cartonWidth, widthCm: cartonLength, rotated: true },
  ].map((item) => ({
    ...item,
    countLength: item.lengthCm ? Math.floor(pallet.lengthCm / item.lengthCm) : 0,
    countWidth: item.widthCm ? Math.floor(pallet.widthCm / item.widthCm) : 0,
  })).map((item) => ({ ...item, cartonsPerLayer: item.countLength * item.countWidth }))

  const bestOrientation = orientations.sort((a, b) => b.cartonsPerLayer - a.cartonsPerLayer)[0]
  const usableHeight = Math.max(0, maxHeight - pallet.baseHeightCm)
  const maxLayers = cartonHeight ? Math.floor(usableHeight / cartonHeight) : 0
  const maxByDimensions = bestOrientation.cartonsPerLayer * maxLayers
  const payloadLimit = Math.max(0, maxGrossWeight - pallet.tareWeightKg)
  const maxByWeight = cartonWeight ? Math.floor(payloadLimit / cartonWeight) : maxByDimensions
  const cartonsPerPallet = Math.min(maxByDimensions, maxByWeight)
  const requiredPallets = cartonsPerPallet ? Math.ceil(quantity / cartonsPerPallet) : 0
  const lastPalletCartons = requiredPallets ? quantity - cartonsPerPallet * (requiredPallets - 1) : 0
  const loadedHeightCm = maxLayers ? pallet.baseHeightCm + maxLayers * cartonHeight : pallet.baseHeightCm
  const cartonVolumeCbm = cartonLength * cartonWidth * cartonHeight / 1_000_000
  const palletEnvelopeCbm = pallet.lengthCm * pallet.widthCm * loadedHeightCm / 1_000_000
  const volumeUtilizationPercent = palletEnvelopeCbm && cartonsPerPallet
    ? cartonVolumeCbm * cartonsPerPallet / palletEnvelopeCbm * 100
    : 0
  const grossWeightKg = pallet.tareWeightKg + cartonsPerPallet * cartonWeight

  return {
    pallet,
    bestOrientation,
    maxLayers,
    maxByDimensions,
    maxByWeight,
    cartonsPerPallet,
    requiredPallets,
    lastPalletCartons,
    loadedHeightCm: round(loadedHeightCm, 1),
    grossWeightKg: round(grossWeightKg, 1),
    volumeUtilizationPercent: round(volumeUtilizationPercent, 1),
    limitingFactor: cartonsPerPallet === 0 ? 'dimensions' as const : maxByWeight < maxByDimensions ? 'weight' as const : 'dimensions' as const,
  }
}
