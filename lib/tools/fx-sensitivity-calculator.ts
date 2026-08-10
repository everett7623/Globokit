// 名称: 外贸汇率敏感性分析逻辑
// 描述: 比较汇率情景对外币订单人民币收入、利润与盈亏平衡汇率的影响
// 路径: Globokit/lib/tools/fx-sensitivity-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

export type FxCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY'
export type FxScenarioId = 'rmb-appreciation' | 'base' | 'rmb-depreciation'

export interface FxSensitivityInputs {
  currency: FxCurrency
  foreignAmount: number
  costCny: number
  otherCostCny: number
  settlementFeePercent: number
  baseRate: number
  rmbAppreciationPercent: number
  rmbDepreciationPercent: number
}

export interface FxScenarioResult {
  id: FxScenarioId
  label: string
  rateChangePercent: number
  rate: number
  revenueCny: number
  settlementFeeCny: number
  totalCostCny: number
  profitCny: number
  marginPercent: number
  profitDeltaCny: number
}

export interface FxSensitivityResult {
  currency: FxCurrency
  foreignAmount: number
  costCny: number
  otherCostCny: number
  settlementFeePercent: number
  baseRate: number
  rateUnit: number
  breakEvenRate: number
  bestScenarioId: FxScenarioId
  worstScenarioId: FxScenarioId
  profitRangeCny: number
  results: FxScenarioResult[]
}

export const FX_CURRENCY_PRESETS: Array<{ value: FxCurrency; label: string; rate: number; unit: number }> = [
  { value: 'USD', label: 'USD 美元', rate: 7.2, unit: 1 },
  { value: 'EUR', label: 'EUR 欧元', rate: 7.8, unit: 1 },
  { value: 'GBP', label: 'GBP 英镑', rate: 9.1, unit: 1 },
  { value: 'JPY', label: 'JPY 日元', rate: 4.8, unit: 100 },
]

export const DEFAULT_FX_SENSITIVITY_INPUTS: FxSensitivityInputs = {
  currency: 'USD',
  foreignAmount: 10000,
  costCny: 50000,
  otherCostCny: 5000,
  settlementFeePercent: 0.3,
  baseRate: 7.2,
  rmbAppreciationPercent: 5,
  rmbDepreciationPercent: 5,
}

function requireFinite(value: number, label: string, min: number, max: number) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  }
  return value
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

function roundRate(value: number) {
  return Math.round((value + Number.EPSILON) * 1_000_000) / 1_000_000
}

export function calculateFxSensitivity(inputs: FxSensitivityInputs): FxSensitivityResult {
  const foreignAmount = requireFinite(inputs.foreignAmount, '外币订单金额', 0.01, 1_000_000_000)
  const costCny = requireFinite(inputs.costCny, '订单成本', 0, 1_000_000_000_000)
  const otherCostCny = requireFinite(inputs.otherCostCny, '其他 CNY 费用', 0, 1_000_000_000_000)
  const settlementFeePercent = requireFinite(inputs.settlementFeePercent, '收款手续费率', 0, 99.99)
  const baseRate = requireFinite(inputs.baseRate, '基准汇率', 0.000001, 100_000)
  const rmbAppreciationPercent = requireFinite(inputs.rmbAppreciationPercent, '人民币升值情景', 0, 99.99)
  const rmbDepreciationPercent = requireFinite(inputs.rmbDepreciationPercent, '人民币贬值情景', 0, 99.99)
  const feeRate = settlementFeePercent / 100
  const fixedCnyCost = costCny + otherCostCny
  const rateUnit = FX_CURRENCY_PRESETS.find((item) => item.value === inputs.currency)?.unit ?? 1
  const breakEvenRate = fixedCnyCost * rateUnit / (foreignAmount * (1 - feeRate))

  const scenarios: Array<{ id: FxScenarioId; label: string; rateChangePercent: number; rate: number }> = [
    { id: 'rmb-appreciation', label: '人民币升值', rateChangePercent: -rmbAppreciationPercent, rate: baseRate * (1 - rmbAppreciationPercent / 100) },
    { id: 'base', label: '基准汇率', rateChangePercent: 0, rate: baseRate },
    { id: 'rmb-depreciation', label: '人民币贬值', rateChangePercent: rmbDepreciationPercent, rate: baseRate * (1 + rmbDepreciationPercent / 100) },
  ]

  const calculated = scenarios.map((scenario) => {
    if (scenario.rate <= 0) throw new Error('人民币升值情景后的汇率必须大于 0')
    const revenueCny = foreignAmount / rateUnit * scenario.rate
    const settlementFeeCny = revenueCny * feeRate
    const totalCostCny = fixedCnyCost + settlementFeeCny
    const profitCny = revenueCny - totalCostCny
    return {
      ...scenario,
      rate: roundRate(scenario.rate),
      revenueCny: roundMoney(revenueCny),
      settlementFeeCny: roundMoney(settlementFeeCny),
      totalCostCny: roundMoney(totalCostCny),
      profitCny: roundMoney(profitCny),
      marginPercent: revenueCny > 0 ? profitCny / revenueCny * 100 : 0,
      profitDeltaCny: 0,
    }
  })
  const base = calculated.find((scenario) => scenario.id === 'base') ?? calculated[0]
  const results = calculated.map((scenario) => ({ ...scenario, profitDeltaCny: roundMoney(scenario.profitCny - base.profitCny) }))
  const ranking = [...results].sort((a, b) => b.profitCny - a.profitCny)

  return {
    currency: inputs.currency,
    foreignAmount: roundMoney(foreignAmount),
    costCny: roundMoney(costCny),
    otherCostCny: roundMoney(otherCostCny),
    settlementFeePercent,
    baseRate: roundRate(baseRate),
    rateUnit,
    breakEvenRate: roundRate(breakEvenRate),
    bestScenarioId: ranking[0].id,
    worstScenarioId: ranking[ranking.length - 1].id,
    profitRangeCny: roundMoney(ranking[0].profitCny - ranking[ranking.length - 1].profitCny),
    results,
  }
}
