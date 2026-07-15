// 名称: 进口成本页面数据
// 描述: 定义币种、表单、预设、摘要及格式化函数
// 路径: Globokit/app/tools/import-landed-cost-calculator/import-cost-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import { DEFAULT_IMPORT_LANDED_COST_INPUTS, type ImportCurrency, type ImportLandedCostInputs, type ImportLandedCostResult } from '@/lib/tools/import-landed-cost-calculator'

export type NumericField = keyof ImportLandedCostInputs
export type FormState = Record<NumericField, string> & { currency: ImportCurrency }

export const CURRENCY_OPTIONS: Array<{ value: ImportCurrency; label: string; rate: string }> = [
  { value: 'USD', label: 'USD 美元', rate: '7.2' }, { value: 'EUR', label: 'EUR 欧元', rate: '7.8' },
  { value: 'GBP', label: 'GBP 英镑', rate: '9.2' }, { value: 'CNY', label: 'CNY 人民币', rate: '1' },
]

export const INITIAL_FORM: FormState = {
  quantity: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.quantity), unitPriceForeign: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.unitPriceForeign), exchangeRate: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.exchangeRate),
  internationalFreightForeign: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.internationalFreightForeign), insuranceForeign: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.insuranceForeign), otherForeignCost: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.otherForeignCost),
  dutyRatePercent: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.dutyRatePercent), vatRatePercent: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.vatRatePercent), customsFeeCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.customsFeeCny),
  portChargeCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.portChargeCny), domesticFreightCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.domesticFreightCny), otherLocalCostCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.otherLocalCostCny),
  targetSellingPriceCny: String(DEFAULT_IMPORT_LANDED_COST_INPUTS.targetSellingPriceCny), currency: 'USD',
}

export const IMPORT_PRESETS: Array<{ label: string; values: Partial<FormState> }> = [
  { label: '常规进口', values: INITIAL_FORM },
  { label: '高税率商品', values: { currency: 'USD', quantity: '600', unitPriceForeign: '28', exchangeRate: '7.2', internationalFreightForeign: '1200', insuranceForeign: '150', otherForeignCost: '80', dutyRatePercent: '15', vatRatePercent: '13', customsFeeCny: '680', portChargeCny: '1800', domesticFreightCny: '1300', otherLocalCostCny: '300', targetSellingPriceCny: '268' } },
  { label: '人民币采购', values: { currency: 'CNY', quantity: '300', unitPriceForeign: '96', exchangeRate: '1', internationalFreightForeign: '2200', insuranceForeign: '120', otherForeignCost: '0', dutyRatePercent: '8', vatRatePercent: '13', customsFeeCny: '500', portChargeCny: '900', domesticFreightCny: '650', otherLocalCostCny: '150', targetSellingPriceCny: '148' } },
]

const CNY_FORMATTER = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 })
export const toNumber = (value: string) => { const parsed = Number.parseFloat(value); return Number.isFinite(parsed) ? parsed : 0 }
export const formatCny = (value: number) => CNY_FORMATTER.format(value)
export const formatPercent = (value: number) => `${value.toFixed(1)}%`
export const formatNumber = (value: number, digits = 2) => new Intl.NumberFormat('zh-CN', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)

export function buildSummary(result: ImportLandedCostResult, currency: ImportCurrency, formatForeign: (value: number) => string) {
  return ['进口到岸成本测算', `采购货值：${formatForeign(result.goodsValueForeign)}`, `CIF 折算：${formatCny(result.cifCny)}`, `关税：${formatCny(result.dutyCny)}`, `进口增值税：${formatCny(result.vatCny)}`, `清关与本地费用：${formatCny(result.localCostCny)}`, `到岸总成本：${formatCny(result.totalLandedCostCny)}`, `每件到岸成本：${formatCny(result.unitLandedCostCny)}`, `目标销售单价：${formatCny(result.targetSellingPriceCny)}`, `预估毛利率：${formatPercent(result.grossMarginPercent)}`, `采购币种：${currency}`].join('\n')
}
