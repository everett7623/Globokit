// 名称: 外贸订单保本销量页面数据
// 描述: 管理表单状态、场景预设、格式化与复制摘要
// 路径: Globokit/app/tools/order-break-even-calculator/order-break-even-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

import {
  DEFAULT_ORDER_BREAK_EVEN_INPUTS,
  type BreakEvenCurrency,
  type OrderBreakEvenInputs,
  type OrderBreakEvenResult,
} from '@/lib/tools/order-break-even-calculator'

export type BreakEvenNumericField = Exclude<keyof OrderBreakEvenInputs, 'currency'>

export interface OrderBreakEvenFormState extends Record<BreakEvenNumericField, string> {
  currency: BreakEvenCurrency
}

export interface OrderBreakEvenPreset {
  label: string
  description: string
  values: OrderBreakEvenFormState
}

const makeForm = (inputs: OrderBreakEvenInputs): OrderBreakEvenFormState => ({
  currency: inputs.currency,
  unitSellingPrice: String(inputs.unitSellingPrice),
  unitVariableCost: String(inputs.unitVariableCost),
  fixedOrderCost: String(inputs.fixedOrderCost),
  commissionPercent: String(inputs.commissionPercent),
  paymentFeePercent: String(inputs.paymentFeePercent),
  lossAllowancePercent: String(inputs.lossAllowancePercent),
  plannedQuantity: String(inputs.plannedQuantity),
  targetProfit: String(inputs.targetProfit),
})

export const ORDER_BREAK_EVEN_PRESETS: readonly OrderBreakEvenPreset[] = [
  { label: '常规出口', description: '常规佣金与收款费下的美元订单', values: makeForm(DEFAULT_ORDER_BREAK_EVEN_INPUTS) },
  { label: '低毛利大货', description: '单件贡献较低但计划销量较大的订单', values: makeForm({ currency: 'USD', unitSellingPrice: 8.5, unitVariableCost: 7.1, fixedOrderCost: 1200, commissionPercent: 2, paymentFeePercent: 1, lossAllowancePercent: 0.5, plannedQuantity: 3000, targetProfit: 2000 }) },
  { label: '平台订单', description: '高平台佣金和售后预留场景', values: makeForm({ currency: 'USD', unitSellingPrice: 25, unitVariableCost: 12, fixedOrderCost: 500, commissionPercent: 15, paymentFeePercent: 3, lossAllowancePercent: 3, plannedQuantity: 200, targetProfit: 1000 }) },
  { label: '人民币订单', description: '以人民币核算的批量销售场景', values: makeForm({ currency: 'CNY', unitSellingPrice: 88, unitVariableCost: 55, fixedOrderCost: 5000, commissionPercent: 5, paymentFeePercent: 0.6, lossAllowancePercent: 2, plannedQuantity: 500, targetProfit: 10000 }) },
]

export function createInitialForm() {
  return makeForm(DEFAULT_ORDER_BREAK_EVEN_INPUTS)
}

const toNumber = (value: string) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function toInputs(form: OrderBreakEvenFormState): OrderBreakEvenInputs {
  return {
    currency: form.currency,
    unitSellingPrice: toNumber(form.unitSellingPrice),
    unitVariableCost: toNumber(form.unitVariableCost),
    fixedOrderCost: toNumber(form.fixedOrderCost),
    commissionPercent: toNumber(form.commissionPercent),
    paymentFeePercent: toNumber(form.paymentFeePercent),
    lossAllowancePercent: toNumber(form.lossAllowancePercent),
    plannedQuantity: toNumber(form.plannedQuantity),
    targetProfit: toNumber(form.targetProfit),
  }
}

export const formatMoney = (value: number, currency: BreakEvenCurrency) => new Intl.NumberFormat('zh-CN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value)
export const formatQuantity = (value: number) => `${value.toLocaleString('zh-CN')} 件`
export const formatPercent = (value: number) => `${value.toFixed(1)}%`

export function buildOrderBreakEvenSummary(result: OrderBreakEvenResult) {
  const statusText = result.status === 'target-achieved' ? '已达到目标利润' : result.status === 'profitable' ? '已超过保本线，尚未达到目标利润' : '尚未达到保本线'
  return [
    '外贸订单保本销量测算',
    `销售单价：${formatMoney(result.unitSellingPrice, result.currency)}/件；单件变动成本：${formatMoney(result.unitVariableCost, result.currency)}`,
    `固定成本：${formatMoney(result.fixedOrderCost, result.currency)}；成交费率合计：${formatPercent(result.totalVariableFeePercent)}`,
    `单件贡献毛利：${formatMoney(result.contributionPerUnit, result.currency)}（${formatPercent(result.contributionMarginPercent)}）`,
    `保本销量：${formatQuantity(result.breakEvenQuantity)}；目标利润销量：${formatQuantity(result.targetProfitQuantity)}`,
    `计划销量：${formatQuantity(result.plannedQuantity)}；计划利润：${formatMoney(result.plannedProfit, result.currency)}；${statusText}`,
    `计划销量下保本单价：${formatMoney(result.breakEvenUnitPriceAtPlan, result.currency)}；目标利润单价：${formatMoney(result.targetUnitPriceAtPlan, result.currency)}`,
    '注：结果为静态经营测算，不含汇率波动、税费和未录入的物流或融资成本。',
  ].join('\n')
}
