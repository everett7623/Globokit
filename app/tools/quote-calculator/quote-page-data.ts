// 名称: 外贸报价页面数据
// 描述: 定义币种、表单、场景预设、摘要与格式化函数
// 路径: Globokit/app/tools/quote-calculator/quote-page-data.ts
// 作者: wwj
// 更新时间: 2026-07-15

import { DEFAULT_QUOTE_INPUTS, QUOTE_TERM_CONFIGS, type QuoteInputs, type QuoteMode, type QuoteResult, type QuoteTerm } from '@/lib/tools/quote-calculator'

export type QuoteCurrency = 'USD' | 'EUR' | 'GBP' | 'CNY'
export type NumericField = Exclude<keyof QuoteInputs, 'quoteTerm'>
export type FormState = Record<NumericField, string> & { quoteTerm: QuoteTerm; currency: QuoteCurrency }

export const CURRENCY_OPTIONS: Array<{ value: QuoteCurrency; label: string; rate: string }> = [
  { value: 'USD', label: 'USD 美元', rate: '7.2' }, { value: 'EUR', label: 'EUR 欧元', rate: '7.8' },
  { value: 'GBP', label: 'GBP 英镑', rate: '9.2' }, { value: 'CNY', label: 'CNY 人民币', rate: '1' },
]

export const INITIAL_FORM: FormState = {
  quoteTerm: DEFAULT_QUOTE_INPUTS.quoteTerm, unitCostCny: String(DEFAULT_QUOTE_INPUTS.unitCostCny), quantity: String(DEFAULT_QUOTE_INPUTS.quantity),
  domesticFeeCny: String(DEFAULT_QUOTE_INPUTS.domesticFeeCny), exportFeeCny: String(DEFAULT_QUOTE_INPUTS.exportFeeCny), internationalFreightCny: String(DEFAULT_QUOTE_INPUTS.internationalFreightCny),
  insuranceFeeCny: String(DEFAULT_QUOTE_INPUTS.insuranceFeeCny), destinationFeeCny: String(DEFAULT_QUOTE_INPUTS.destinationFeeCny), importDutyTaxCny: String(DEFAULT_QUOTE_INPUTS.importDutyTaxCny),
  exchangeRate: String(DEFAULT_QUOTE_INPUTS.exchangeRate), targetMarginPercent: String(DEFAULT_QUOTE_INPUTS.targetMarginPercent), sellingPriceForeign: String(DEFAULT_QUOTE_INPUTS.sellingPriceForeign),
  commissionPercent: String(DEFAULT_QUOTE_INPUTS.commissionPercent), paymentFeePercent: String(DEFAULT_QUOTE_INPUTS.paymentFeePercent), rebatePercent: String(DEFAULT_QUOTE_INPUTS.rebatePercent), vatPercent: String(DEFAULT_QUOTE_INPUTS.vatPercent), currency: 'USD',
}

export const SCENARIO_PRESETS: Array<{ label: string; mode: QuoteMode; values: Partial<FormState> }> = [
  { label: 'FOB 装船', mode: 'target-margin', values: { quoteTerm: 'FOB', domesticFeeCny: '300', exportFeeCny: '180', internationalFreightCny: '0', insuranceFeeCny: '0', destinationFeeCny: '0', importDutyTaxCny: '0', commissionPercent: '0', paymentFeePercent: '1', targetMarginPercent: '22' } },
  { label: 'CIF 含运费', mode: 'target-margin', values: { quoteTerm: 'CIF', domesticFeeCny: '300', exportFeeCny: '180', internationalFreightCny: '650', insuranceFeeCny: '80', destinationFeeCny: '0', importDutyTaxCny: '0', commissionPercent: '0', paymentFeePercent: '1.5', targetMarginPercent: '25' } },
  { label: 'EXW 出厂', mode: 'target-margin', values: { quoteTerm: 'EXW', domesticFeeCny: '0', exportFeeCny: '0', internationalFreightCny: '0', insuranceFeeCny: '0', destinationFeeCny: '0', importDutyTaxCny: '0', commissionPercent: '0', paymentFeePercent: '1', targetMarginPercent: '18' } },
  { label: 'DDP 到门', mode: 'target-margin', values: { quoteTerm: 'DDP', domesticFeeCny: '300', exportFeeCny: '180', internationalFreightCny: '950', insuranceFeeCny: '80', destinationFeeCny: '1200', importDutyTaxCny: '1600', commissionPercent: '0', paymentFeePercent: '2', targetMarginPercent: '28' } },
  { label: '平台订单', mode: 'known-price', values: { quoteTerm: 'DAP', commissionPercent: '5', paymentFeePercent: '2.5', sellingPriceForeign: '12', internationalFreightCny: '650', insuranceFeeCny: '0', destinationFeeCny: '500' } },
]

const CNY_FORMATTER = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 })
export const toNumber = (value: string) => { const parsed = Number.parseFloat(value); return Number.isFinite(parsed) ? parsed : 0 }
export const formatPercent = (value: number) => `${value.toFixed(1)}%`
export const formatCny = (value: number) => CNY_FORMATTER.format(value)

export function buildSummary(result: QuoteResult, currency: QuoteCurrency, formatForeign: (value: number) => string) {
  const term = QUOTE_TERM_CONFIGS[result.quoteTerm]
  return ['外贸报价利润测算', `贸易条款：${result.quoteTerm} ${term.nameCn}`, `建议/当前单价：${formatForeign(result.quotedUnitPriceForeign)}`, `盈亏平衡单价：${formatForeign(result.breakevenUnitPriceForeign)}`, `订单总额：${formatForeign(result.totalQuoteForeign)}`, `人民币收入：${formatCny(result.revenueCny)}`, `预估利润：${formatCny(result.profitCny)}`, `销售利润率：${formatPercent(result.marginPercent)}`, `报价币种：${currency}`, `计入报价成本：${formatCny(result.effectiveCostCny)}`, `未计入买方/后续费用：${formatCny(result.excludedCostCny)}`, result.missingCostLabels.length ? `需要补充：${result.missingCostLabels.join('、')}` : ''].join('\n')
}
