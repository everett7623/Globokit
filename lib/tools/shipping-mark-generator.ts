// 名称: 外贸唛头生成逻辑
// 描述: 按收货人代号、订单号、目的港与箱号风格生成标准唛头文本与逐箱标签
// 路径: Globokit/lib/tools/shipping-mark-generator.ts
// 作者: everettlabs
// 更新时间: 2026-09-30

export type CartonNumberStyle = 'range' | 'each' | 'none'

export interface ShippingMarkInput {
  consigneeMark: string
  orderNo: string
  destinationPort: string
  cartonCount: number
  cartonNumberStyle: CartonNumberStyle
  startCartonNo: number
  extraLines: string[]
  showMadeIn: boolean
  showGrossWeight: boolean
  grossWeightKg: number
  showDimensions: boolean
  dimensionsCm: string
}

export interface CartonLabel {
  cartonNo: number
  lines: string[]
}

export const MAX_CARTON_COUNT = 9999

function requirePositiveInt(value: number, label: string, max: number): number {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 1 || value > max) {
    throw new Error(`${label}必须是 1 到 ${max} 之间的整数`)
  }
  return value
}

export function normalizeShippingMark(input: ShippingMarkInput): ShippingMarkInput {
  const cartonCount = requirePositiveInt(input.cartonCount, '总箱数', MAX_CARTON_COUNT)
  const startCartonNo = requirePositiveInt(input.startCartonNo, '起始箱号', MAX_CARTON_COUNT)
  if (startCartonNo + cartonCount - 1 > MAX_CARTON_COUNT) {
    throw new Error(`起始箱号加总箱数超出 ${MAX_CARTON_COUNT}，请调整起始箱号`)
  }
  const grossWeightKg = Number.isFinite(input.grossWeightKg) ? Math.max(input.grossWeightKg, 0) : 0
  if (input.showGrossWeight && grossWeightKg === 0) {
    throw new Error('勾选毛重后必须填写大于 0 的毛重（KG）')
  }

  return {
    ...input,
    consigneeMark: input.consigneeMark.trim(),
    orderNo: input.orderNo.trim(),
    destinationPort: input.destinationPort.trim(),
    cartonCount,
    startCartonNo,
    extraLines: input.extraLines.map((line) => line.replace(/\s+$/,'')).filter((line) => line.trim().length > 0),
    grossWeightKg,
    dimensionsCm: input.dimensionsCm.trim(),
  }
}

function buildCartonNoLine(style: CartonNumberStyle, cartonNo: number | null, cartonCount: number): string | null {
  if (style === 'none' || cartonNo === null) return null
  if (style === 'each') return `CARTON NO. ${cartonNo} OF ${cartonCount}`
  return `CARTON NO. ${cartonNo}`
}

function buildCoreLines(input: ShippingMarkInput, cartonNo: number | null): string[] {
  const lines: string[] = []
  if (input.consigneeMark) lines.push(input.consigneeMark.toUpperCase())
  if (input.orderNo) lines.push(`ORDER NO. ${input.orderNo.toUpperCase()}`)
  if (input.destinationPort) lines.push(input.destinationPort.toUpperCase())
  const cartonLine = buildCartonNoLine(input.cartonNumberStyle, cartonNo, input.cartonCount)
  if (cartonLine) lines.push(cartonLine)
  if (input.showGrossWeight && input.grossWeightKg > 0) {
    lines.push(`G.W. ${input.grossWeightKg.toFixed(1)} KGS`)
  }
  if (input.showDimensions && input.dimensionsCm) {
    lines.push(`${input.dimensionsCm.toUpperCase()} CM`)
  }
  if (input.showMadeIn) lines.push('MADE IN CHINA')
  return lines
}

export function buildMarkLines(input: ShippingMarkInput): string[] {
  const normalized = normalizeShippingMark(input)
  const core = buildCoreLines(normalized, null)
  let cartonLine: string | null = null
  if (normalized.cartonNumberStyle === 'each') {
    cartonLine = `CARTON NO. ${normalized.startCartonNo} OF ${normalized.cartonCount}`
  } else if (normalized.cartonNumberStyle === 'range') {
    const endNo = normalized.startCartonNo + normalized.cartonCount - 1
    cartonLine = endNo === normalized.startCartonNo
      ? `CARTON NO. ${normalized.startCartonNo}`
      : `CARTON NO. ${normalized.startCartonNo}-${endNo}`
  }
  if (cartonLine) {
    const insertIndex = core.findIndex((line) => line.startsWith('CARTON NO.') || line.startsWith('G.W.') || line.startsWith('MADE IN'))
    core.splice(insertIndex === -1 ? core.length : insertIndex, 0, cartonLine)
  }
  return [...core, ...normalized.extraLines]
}

export function buildMarkText(input: ShippingMarkInput): string {
  return buildMarkLines(input).join('\n')
}

export function buildCartonLabels(input: ShippingMarkInput, maxPreview: number): CartonLabel[] {
  const normalized = normalizeShippingMark(input)
  const limit = Math.min(normalized.cartonCount, Math.max(maxPreview, 0))
  const labels: CartonLabel[] = []
  for (let index = 0; index < limit; index += 1) {
    const cartonNo = normalized.startCartonNo + index
    labels.push({ cartonNo, lines: [...buildCoreLines(normalized, cartonNo), ...normalized.extraLines] })
  }
  return labels
}
