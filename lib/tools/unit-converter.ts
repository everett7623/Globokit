// 名称: 外贸单位换算逻辑
// 描述: 提供物流常用长度、重量和体积单位的可预测换算
// 路径: Globokit/lib/tools/unit-converter.ts
// 作者: everettlabs
// 更新时间: 2026-07-21

export type UnitCategory = 'length' | 'weight' | 'volume'

export interface UnitDefinition {
  id: string
  label: string
  symbol: string
  toBase: number
}

export const UNIT_CATEGORY_LABELS: Record<UnitCategory, string> = {
  length: '长度',
  weight: '重量',
  volume: '体积',
}

export const UNIT_GROUPS: Record<UnitCategory, readonly UnitDefinition[]> = {
  length: [
    { id: 'mm', label: '毫米', symbol: 'mm', toBase: 0.001 },
    { id: 'cm', label: '厘米', symbol: 'cm', toBase: 0.01 },
    { id: 'm', label: '米', symbol: 'm', toBase: 1 },
    { id: 'in', label: '英寸', symbol: 'in', toBase: 0.0254 },
    { id: 'ft', label: '英尺', symbol: 'ft', toBase: 0.3048 },
    { id: 'yd', label: '码', symbol: 'yd', toBase: 0.9144 },
  ],
  weight: [
    { id: 'g', label: '克', symbol: 'g', toBase: 0.001 },
    { id: 'kg', label: '千克', symbol: 'kg', toBase: 1 },
    { id: 't', label: '公吨', symbol: 't', toBase: 1000 },
    { id: 'oz', label: '盎司', symbol: 'oz', toBase: 0.028349523125 },
    { id: 'lb', label: '磅', symbol: 'lb', toBase: 0.45359237 },
  ],
  volume: [
    { id: 'ml', label: '毫升', symbol: 'mL', toBase: 0.000001 },
    { id: 'l', label: '升', symbol: 'L', toBase: 0.001 },
    { id: 'cm3', label: '立方厘米', symbol: 'cm³', toBase: 0.000001 },
    { id: 'm3', label: '立方米（CBM）', symbol: 'm³', toBase: 1 },
    { id: 'in3', label: '立方英寸', symbol: 'in³', toBase: 0.000016387064 },
    { id: 'ft3', label: '立方英尺', symbol: 'ft³', toBase: 0.028316846592 },
  ],
}

export const DEFAULT_UNIT_SELECTIONS: Record<UnitCategory, { source: string; target: string; value: string }> = {
  length: { source: 'cm', target: 'in', value: '100' },
  weight: { source: 'kg', target: 'lb', value: '10' },
  volume: { source: 'm3', target: 'ft3', value: '1' },
}

export function convertUnit(category: UnitCategory, value: number, sourceId: string, targetId: string): number | null {
  if (!Number.isFinite(value) || value < 0) return null

  const units = UNIT_GROUPS[category]
  const source = units.find((unit) => unit.id === sourceId)
  const target = units.find((unit) => unit.id === targetId)
  if (!source || !target) return null

  const converted = value * source.toBase / target.toBase
  return Number.isFinite(converted) ? converted : null
}

export function formatUnitValue(value: number, maximumFractionDigits = 8) {
  const nearestInteger = Math.round(value)
  const displayValue = Math.abs(value - nearestInteger) <= Math.max(1, Math.abs(value)) * 1e-12
    ? nearestInteger
    : value

  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(displayValue)
}

export function formatUnitInput(value: number) {
  return Number(value.toPrecision(12)).toString()
}
