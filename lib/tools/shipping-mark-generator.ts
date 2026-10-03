// 名称: 外贸唛头生成逻辑
// 描述: 生成主唛文本与逐箱标签
// 路径: Globokit/lib/tools/shipping-mark-generator.ts

export type CartonNumberStyle = 'range' | 'each' | 'none'
export interface ShippingMarkInput { consigneeMark: string; orderNo: string; destinationPort: string; cartonCount: number; cartonNumberStyle: CartonNumberStyle; startCartonNo: number; extraLines: string[]; showMadeIn: boolean; showGrossWeight: boolean; grossWeightKg: number; showDimensions: boolean; dimensionsCm: string }
export interface CartonLabel { cartonNo: number; lines: string[] }
function clean(value: string): string { return value.trim().replace(/\s+/g, ' ') }
export function buildMarkLines(input: ShippingMarkInput): string[] {
  if (input.cartonCount < 1 || input.cartonCount > 10000) throw new Error('箱数需在 1–10000 之间')
  const lines = [clean(input.consigneeMark), clean(input.orderNo), clean(input.destinationPort)]
  if (input.cartonNumberStyle === 'range') lines.push(`CARTON NO. ${input.startCartonNo}-${input.startCartonNo + input.cartonCount - 1}`)
  if (input.showMadeIn) lines.push('MADE IN CHINA')
  if (input.showGrossWeight) { if (input.grossWeightKg <= 0) throw new Error('请输入有效毛重'); lines.push(`G.W.: ${input.grossWeightKg.toFixed(2)} KGS`) }
  if (input.showDimensions) { if (!clean(input.dimensionsCm)) throw new Error('请输入外箱尺寸'); lines.push(`MEAS.: ${clean(input.dimensionsCm)} CM`) }
  return [...lines.filter(Boolean), ...input.extraLines.map(clean).filter(Boolean)]
}
export function buildMarkText(input: ShippingMarkInput): string { return buildMarkLines(input).join('\n') }
export function buildCartonLabels(input: ShippingMarkInput, limit = 5): CartonLabel[] { const base = buildMarkLines({ ...input, cartonNumberStyle: 'none' }); return Array.from({ length: Math.min(input.cartonCount, limit) }, (_, i) => { const cartonNo = input.startCartonNo + i; const number = input.cartonNumberStyle === 'each' ? `CARTON NO. ${cartonNo} OF ${input.cartonCount}` : input.cartonNumberStyle === 'range' ? `CARTON NO. ${input.startCartonNo}-${input.startCartonNo + input.cartonCount - 1}` : ''; return { cartonNo, lines: number ? [...base, number] : base } }) }
