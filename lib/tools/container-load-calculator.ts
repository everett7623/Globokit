// 名称: 装柜/箱规计算逻辑
// 描述: 根据纸箱尺寸、重量和柜型估算装柜数量与空间利用率
// 路径: Globokit/lib/tools/container-load-calculator.ts
// 作者: Jensfrank / Codex
// 更新时间: 2026-07-06

export type ContainerType = '20GP' | '40GP' | '40HQ' | '45HQ'

export interface ContainerSpec {
  type: ContainerType
  name: string
  lengthCm: number
  widthCm: number
  heightCm: number
  volumeCbm: number
  maxPayloadKg: number
}

export interface CartonInputs {
  lengthCm: number
  widthCm: number
  heightCm: number
  grossWeightKg: number
  quantity: number
  containerType: ContainerType
}

export interface LoadingOrientation {
  lengthCm: number
  widthCm: number
  heightCm: number
  countLength: number
  countWidth: number
  countHeight: number
  cartons: number
}

export interface LoadingResult {
  container: ContainerSpec
  cartonCbm: number
  totalCbm: number
  totalWeightKg: number
  bestOrientation: LoadingOrientation
  maxByWeight: number
  maxCartonsPerContainer: number
  requiredContainers: number
  lastContainerCartons: number
  volumeUtilizationPercent: number
  weightUtilizationPercent: number
  limitingFactor: 'volume' | 'weight'
}

export const CONTAINER_SPECS: Record<ContainerType, ContainerSpec> = {
  '20GP': {
    type: '20GP',
    name: '20GP 普柜',
    lengthCm: 589,
    widthCm: 235,
    heightCm: 239,
    volumeCbm: 33.1,
    maxPayloadKg: 28200,
  },
  '40GP': {
    type: '40GP',
    name: '40GP 普柜',
    lengthCm: 1203,
    widthCm: 235,
    heightCm: 239,
    volumeCbm: 67.7,
    maxPayloadKg: 26700,
  },
  '40HQ': {
    type: '40HQ',
    name: '40HQ 高柜',
    lengthCm: 1203,
    widthCm: 235,
    heightCm: 269,
    volumeCbm: 76.3,
    maxPayloadKg: 26500,
  },
  '45HQ': {
    type: '45HQ',
    name: '45HQ 高柜',
    lengthCm: 1356,
    widthCm: 235,
    heightCm: 269,
    volumeCbm: 86,
    maxPayloadKg: 27600,
  },
}

export const DEFAULT_CARTON_INPUTS: CartonInputs = {
  lengthCm: 60,
  widthCm: 40,
  heightCm: 35,
  grossWeightKg: 12,
  quantity: 1200,
  containerType: '40HQ',
}

function safePositiveNumber(value: number, fallback = 0.01) {
  return Number.isFinite(value) && value > 0 ? value : fallback
}

function uniqueOrientations(lengthCm: number, widthCm: number, heightCm: number) {
  const dimensions = [
    [lengthCm, widthCm, heightCm],
    [lengthCm, heightCm, widthCm],
    [widthCm, lengthCm, heightCm],
    [widthCm, heightCm, lengthCm],
    [heightCm, lengthCm, widthCm],
    [heightCm, widthCm, lengthCm],
  ]

  return Array.from(new Map(dimensions.map((items) => [items.join('x'), items])).values())
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export function calculateContainerLoad(inputs: CartonInputs): LoadingResult {
  const container = CONTAINER_SPECS[inputs.containerType] || CONTAINER_SPECS['40HQ']
  const lengthCm = safePositiveNumber(inputs.lengthCm)
  const widthCm = safePositiveNumber(inputs.widthCm)
  const heightCm = safePositiveNumber(inputs.heightCm)
  const grossWeightKg = safePositiveNumber(inputs.grossWeightKg)
  const quantity = Math.max(1, Math.floor(safePositiveNumber(inputs.quantity, 1)))

  const cartonCbm = lengthCm * widthCm * heightCm / 1_000_000
  const totalCbm = cartonCbm * quantity
  const totalWeightKg = grossWeightKg * quantity

  const orientations = uniqueOrientations(lengthCm, widthCm, heightCm).map(([l, w, h]) => {
    const countLength = Math.floor(container.lengthCm / l)
    const countWidth = Math.floor(container.widthCm / w)
    const countHeight = Math.floor(container.heightCm / h)

    return {
      lengthCm: l,
      widthCm: w,
      heightCm: h,
      countLength,
      countWidth,
      countHeight,
      cartons: countLength * countWidth * countHeight,
    }
  })

  const bestOrientation = orientations.reduce<LoadingOrientation>(
    (best, current) => (current.cartons > best.cartons ? current : best),
    orientations[0]
  )

  const maxByWeight = Math.max(1, Math.floor(container.maxPayloadKg / grossWeightKg))
  const maxCartonsPerContainer = Math.max(1, Math.min(bestOrientation.cartons, maxByWeight))
  const requiredContainers = Math.ceil(quantity / maxCartonsPerContainer)
  const lastContainerCartons = quantity % maxCartonsPerContainer || maxCartonsPerContainer
  const totalContainerVolume = container.volumeCbm * requiredContainers
  const totalPayload = container.maxPayloadKg * requiredContainers

  return {
    container,
    cartonCbm: round(cartonCbm, 4),
    totalCbm: round(totalCbm),
    totalWeightKg: round(totalWeightKg),
    bestOrientation,
    maxByWeight,
    maxCartonsPerContainer,
    requiredContainers,
    lastContainerCartons,
    volumeUtilizationPercent: round(totalCbm / totalContainerVolume * 100, 1),
    weightUtilizationPercent: round(totalWeightKg / totalPayload * 100, 1),
    limitingFactor: maxByWeight < bestOrientation.cartons ? 'weight' : 'volume',
  }
}
