// 名称: 外贸汇率敏感性分析页面数据
// 描述: 管理表单字符串状态、币种预设与复制摘要
// 路径: Globokit/app/tools/fx-sensitivity-calculator/fx-sensitivity-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

import {
  DEFAULT_FX_SENSITIVITY_INPUTS,
  FX_CURRENCY_PRESETS,
  type FxCurrency,
  type FxSensitivityInputs,
  type FxSensitivityResult,
} from '@/lib/tools/fx-sensitivity-calculator'

export type NumericField = Exclude<keyof FxSensitivityInputs, 'currency'>

export interface FxSensitivityFormState extends Record<NumericField, string> {
  currency: FxCurrency
}

export function createInitialForm(): FxSensitivityFormState {
  return {
    currency: DEFAULT_FX_SENSITIVITY_INPUTS.currency,
    foreignAmount: String(DEFAULT_FX_SENSITIVITY_INPUTS.foreignAmount),
    costCny: String(DEFAULT_FX_SENSITIVITY_INPUTS.costCny),
    otherCostCny: String(DEFAULT_FX_SENSITIVITY_INPUTS.otherCostCny),
    settlementFeePercent: String(DEFAULT_FX_SENSITIVITY_INPUTS.settlementFeePercent),
    baseRate: String(DEFAULT_FX_SENSITIVITY_INPUTS.baseRate),
    rmbAppreciationPercent: String(DEFAULT_FX_SENSITIVITY_INPUTS.rmbAppreciationPercent),
    rmbDepreciationPercent: String(DEFAULT_FX_SENSITIVITY_INPUTS.rmbDepreciationPercent),
  }
}

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 }).format(value)
}

export function formatRate(value: number) {
  return value.toFixed(4)
}

export function formatRateUnit(currency: FxCurrency, rateUnit: number) {
  return `CNY/${rateUnit === 1 ? currency : `${rateUnit} ${currency}`}`
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}

export function buildFxSensitivitySummary(result: FxSensitivityResult) {
  const currencyLabel = FX_CURRENCY_PRESETS.find((item) => item.value === result.currency)?.label ?? result.currency
  return [
    '外贸汇率敏感性分析',
    `报价币种：${currencyLabel}`,
    `外币订单金额：${result.foreignAmount.toLocaleString('zh-CN')}`,
    `CNY 固定成本：${formatMoney(result.costCny + result.otherCostCny)}`,
    `收款手续费率：${formatPercent(result.settlementFeePercent)}`,
    `基准汇率：${formatRate(result.baseRate)} ${formatRateUnit(result.currency, result.rateUnit)}`,
    `盈亏平衡汇率：${formatRate(result.breakEvenRate)} ${formatRateUnit(result.currency, result.rateUnit)}`,
    ...result.results.map((scenario) => `${scenario.label}：${formatRate(scenario.rate)}，实际利润 ${formatMoney(scenario.profitCny)}，利润变化 ${formatMoney(scenario.profitDeltaCny)}`),
    `利润波动范围：${formatMoney(result.profitRangeCny)}`,
    '注：汇率和费用为用户输入的预算参数，不代表实时牌价或银行结算报价。',
  ].join('\n')
}
