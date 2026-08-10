// 名称: 收款账期成本对比页面数据
// 描述: 管理表单字符串状态、币种格式与复制摘要
// 路径: Globokit/app/tools/payment-terms-calculator/payment-terms-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-08-10

import {
  DEFAULT_PAYMENT_TERMS_INPUTS,
  type PaymentTermOption,
  type PaymentTermResult,
  type PaymentTermsResult,
} from '@/lib/tools/payment-terms-calculator'

export type GlobalNumericField = 'orderAmount' | 'orderCost' | 'productionDays' | 'annualFundingRatePercent'
export type TermNumericField = 'advancePercent' | 'daysAfterShipment' | 'feePercent' | 'fixedFee' | 'riskReservePercent'

export interface PaymentTermFormOption extends Omit<PaymentTermOption, TermNumericField> {
  advancePercent: string
  daysAfterShipment: string
  feePercent: string
  fixedFee: string
  riskReservePercent: string
}

export interface PaymentTermsFormState {
  orderAmount: string
  orderCost: string
  productionDays: string
  annualFundingRatePercent: string
  terms: PaymentTermFormOption[]
}

const toFormOption = (term: PaymentTermOption): PaymentTermFormOption => ({
  ...term,
  advancePercent: String(term.advancePercent),
  daysAfterShipment: String(term.daysAfterShipment),
  feePercent: String(term.feePercent),
  fixedFee: String(term.fixedFee),
  riskReservePercent: String(term.riskReservePercent),
})

export function createInitialForm(): PaymentTermsFormState {
  return {
    orderAmount: String(DEFAULT_PAYMENT_TERMS_INPUTS.orderAmount),
    orderCost: String(DEFAULT_PAYMENT_TERMS_INPUTS.orderCost),
    productionDays: String(DEFAULT_PAYMENT_TERMS_INPUTS.productionDays),
    annualFundingRatePercent: String(DEFAULT_PAYMENT_TERMS_INPUTS.annualFundingRatePercent),
    terms: DEFAULT_PAYMENT_TERMS_INPUTS.terms.map(toFormOption),
  }
}

export const toNumber = (value: string) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export const formatMoney = (value: number) => new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  maximumFractionDigits: 2,
}).format(value)

export const formatPercent = (value: number) => `${value.toFixed(1)}%`
export const formatDays = (value: number) => `${value.toFixed(value % 1 === 0 ? 0 : 1)} 天`

function summaryLine(term: PaymentTermResult) {
  return `${term.rank}. ${term.name}：实际利润 ${formatMoney(term.effectiveProfit)}，条款成本 ${formatMoney(term.totalTermCost)}，加权回款 ${formatDays(term.weightedCollectionDays)}，资金缺口 ${formatMoney(term.fundingGap)}`
}

export function buildPaymentTermsSummary(result: PaymentTermsResult) {
  const ranked = [...result.results].sort((a, b) => a.rank - b.rank)
  return [
    '外贸收款账期成本对比',
    `订单金额：${formatMoney(result.orderAmount)}`,
    `订单总成本：${formatMoney(result.orderCost)}`,
    `基础毛利：${formatMoney(result.baseGrossProfit)}（${formatPercent(result.baseGrossMarginPercent)}）`,
    ...ranked.map(summaryLine),
    `首选方案：${ranked[0].name}`,
    `相对最高成本方案节省：${formatMoney(result.costSavingAgainstWorst)}`,
    '注：资金成本按订单确认日占用全部成本的保守口径估算。',
  ].join('\n')
}
