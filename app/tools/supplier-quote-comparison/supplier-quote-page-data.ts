// 名称: 供应商报价对比页面数据
// 描述: 管理表单状态、场景预设、动态供应商与复制摘要
// 路径: Globokit/app/tools/supplier-quote-comparison/supplier-quote-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

import {
  DEFAULT_SUPPLIER_QUOTE_INPUTS,
  type SupplierQuoteComparisonInputs,
  type SupplierQuoteComparisonResult,
  type SupplierQuoteCurrency,
  type SupplierQuoteInput,
  type SupplierQuoteTaxMode,
} from '@/lib/tools/supplier-quote-comparison'

export type SupplierNumericField = Exclude<keyof SupplierQuoteInput, 'id' | 'name' | 'taxMode'>
export type SupplierCommonField = Exclude<keyof SupplierQuoteComparisonInputs, 'currency' | 'suppliers'>

export interface SupplierQuoteFormState extends Record<SupplierNumericField, string> {
  id: string
  name: string
  taxMode: SupplierQuoteTaxMode
}

export interface SupplierComparisonFormState extends Record<SupplierCommonField, string> {
  currency: SupplierQuoteCurrency
  suppliers: SupplierQuoteFormState[]
}

export interface SupplierQuotePreset {
  label: string
  description: string
  values: SupplierComparisonFormState
}

const toSupplierForm = (supplier: SupplierQuoteInput): SupplierQuoteFormState => ({
  id: supplier.id,
  name: supplier.name,
  quotedUnitPrice: String(supplier.quotedUnitPrice),
  taxMode: supplier.taxMode,
  vatRatePercent: String(supplier.vatRatePercent),
  minimumOrderQuantity: String(supplier.minimumOrderQuantity),
  defectAllowancePercent: String(supplier.defectAllowancePercent),
  fixedFee: String(supplier.fixedFee),
  domesticFreight: String(supplier.domesticFreight),
  leadTimeDays: String(supplier.leadTimeDays),
  depositPercent: String(supplier.depositPercent),
})

const makeForm = (inputs: SupplierQuoteComparisonInputs): SupplierComparisonFormState => ({
  currency: inputs.currency,
  requiredGoodUnits: String(inputs.requiredGoodUnits),
  suppliers: inputs.suppliers.map(toSupplierForm),
})

const SMALL_ORDER_SUPPLIERS: SupplierQuoteInput[] = [
  { id: 'small-factory', name: '原合作工厂', quotedUnitPrice: 52, taxMode: 'tax-inclusive', vatRatePercent: 13, minimumOrderQuantity: 500, defectAllowancePercent: 1, fixedFee: 300, domesticFreight: 500, leadTimeDays: 15, depositPercent: 30 },
  { id: 'small-trader', name: '现货贸易商', quotedUnitPrice: 61, taxMode: 'tax-inclusive', vatRatePercent: 13, minimumOrderQuantity: 50, defectAllowancePercent: 0.5, fixedFee: 0, domesticFreight: 180, leadTimeDays: 3, depositPercent: 100 },
  { id: 'small-platform', name: '平台小单供应商', quotedUnitPrice: 57, taxMode: 'tax-inclusive', vatRatePercent: 13, minimumOrderQuantity: 100, defectAllowancePercent: 2, fixedFee: 0, domesticFreight: 120, leadTimeDays: 6, depositPercent: 100 },
]

export const SUPPLIER_QUOTE_PRESETS: readonly SupplierQuotePreset[] = [
  { label: '常规采购', description: '三家国内供应商含税与未税报价对比', values: makeForm(DEFAULT_SUPPLIER_QUOTE_INPUTS) },
  { label: '小批量试单', description: '比较 MOQ 对小额采购现金成本的影响', values: makeForm({ currency: 'CNY', requiredGoodUnits: 200, suppliers: SMALL_ORDER_SUPPLIERS }) },
  { label: '低价大 MOQ', description: '突出低单价与高起订量之间的成本权衡', values: makeForm({ currency: 'CNY', requiredGoodUnits: 600, suppliers: [DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers[0], { ...DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers[1], id: 'large-moq', name: '低价大货工厂', quotedUnitPrice: 39, minimumOrderQuantity: 2000 }, DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers[2]] }) },
]

export function createInitialForm() {
  return makeForm(DEFAULT_SUPPLIER_QUOTE_INPUTS)
}

export function createAdditionalSupplier(suppliers: SupplierQuoteFormState[]): SupplierQuoteFormState {
  let suffix = 1
  while (suppliers.some((supplier) => supplier.id === `custom-supplier-${suffix}`)) suffix += 1
  return { id: `custom-supplier-${suffix}`, name: `新增供应商 ${suffix}`, quotedUnitPrice: '50', taxMode: 'tax-inclusive', vatRatePercent: '13', minimumOrderQuantity: '500', defectAllowancePercent: '1', fixedFee: '0', domesticFreight: '500', leadTimeDays: '20', depositPercent: '30' }
}

const toNumber = (value: string) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function toInputs(form: SupplierComparisonFormState): SupplierQuoteComparisonInputs {
  return { currency: form.currency, requiredGoodUnits: toNumber(form.requiredGoodUnits), suppliers: form.suppliers.map((supplier) => ({ ...supplier, quotedUnitPrice: toNumber(supplier.quotedUnitPrice), vatRatePercent: toNumber(supplier.vatRatePercent), minimumOrderQuantity: toNumber(supplier.minimumOrderQuantity), defectAllowancePercent: toNumber(supplier.defectAllowancePercent), fixedFee: toNumber(supplier.fixedFee), domesticFreight: toNumber(supplier.domesticFreight), leadTimeDays: toNumber(supplier.leadTimeDays), depositPercent: toNumber(supplier.depositPercent) })) }
}

export const formatMoney = (value: number, currency: SupplierQuoteCurrency) => new Intl.NumberFormat('zh-CN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value)
export const formatQuantity = (value: number) => `${value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })} 件`
export const formatPercent = (value: number) => `${value.toFixed(1)}%`

export function buildSupplierQuoteSummary(result: SupplierQuoteComparisonResult) {
  const best = result.suppliers.find((supplier) => supplier.id === result.bestCostSupplierId) ?? result.suppliers[0]
  return ['供应商报价对比', `计划合格品：${formatQuantity(result.requiredGoodUnits)}`, ...[...result.suppliers].sort((a, b) => a.costRank - b.costRank).map((supplier) => `${supplier.name}：采购 ${formatQuantity(supplier.purchaseQuantity)}，现金总成本 ${formatMoney(supplier.totalAcquisitionCost, result.currency)}，计划数量摊销 ${formatMoney(supplier.costPerRequiredUnit, result.currency)}/件，首付 ${formatMoney(supplier.depositAmount, result.currency)}，交期 ${supplier.leadTimeDays} 天${supplier.moqConstrained ? '，受 MOQ 约束' : ''}`), `现金成本最低：${best.name}；最高可节省 ${formatMoney(result.costSpread, result.currency)}`, '注：VAT 仅拆分展示，不自动抵扣或计入出口退税；结果需结合质量、账期和履约能力决策。'].join('\n')
}
