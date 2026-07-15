// 名称: 进口到岸成本计算逻辑
// 描述: 按货值、运费、保险、关税、进口增值税和本地费用测算进口到岸总成本与单件成本
// 路径: Globokit/lib/tools/import-landed-cost-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-07-08

export type ImportCurrency = 'USD' | 'EUR' | 'GBP' | 'CNY'

export interface ImportLandedCostInputs {
  quantity: number
  unitPriceForeign: number
  exchangeRate: number
  internationalFreightForeign: number
  insuranceForeign: number
  otherForeignCost: number
  dutyRatePercent: number
  vatRatePercent: number
  customsFeeCny: number
  portChargeCny: number
  domesticFreightCny: number
  otherLocalCostCny: number
  targetSellingPriceCny: number
}

export interface ImportLandedCostRow {
  key: string
  label: string
  value: number
  sharePercent: number
}

export interface ImportLandedCostResult {
  quantity: number
  goodsValueForeign: number
  foreignCostTotal: number
  goodsValueCny: number
  internationalFreightCny: number
  insuranceCny: number
  otherForeignCostCny: number
  cifCny: number
  dutyCny: number
  vatBaseCny: number
  vatCny: number
  totalTaxCny: number
  localCostCny: number
  totalLandedCostCny: number
  unitLandedCostCny: number
  targetSellingPriceCny: number
  salesRevenueCny: number
  grossProfitCny: number
  grossMarginPercent: number
  markupPercent: number
  costBreakdown: ImportLandedCostRow[]
}

export const DEFAULT_IMPORT_LANDED_COST_INPUTS: ImportLandedCostInputs = {
  quantity: 1000,
  unitPriceForeign: 12,
  exchangeRate: 7.2,
  internationalFreightForeign: 850,
  insuranceForeign: 80,
  otherForeignCost: 0,
  dutyRatePercent: 5,
  vatRatePercent: 13,
  customsFeeCny: 450,
  portChargeCny: 1200,
  domesticFreightCny: 900,
  otherLocalCostCny: 0,
  targetSellingPriceCny: 118,
}

function safePositiveNumber(value: number, fallback = 1) {
  return Number.isFinite(value) && value > 0 ? value : fallback
}

function safeNonNegativeNumber(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

function rate(percent: number) {
  return safeNonNegativeNumber(percent) / 100
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export function calculateImportLandedCost(inputs: ImportLandedCostInputs): ImportLandedCostResult {
  const quantity = Math.max(1, Math.floor(safePositiveNumber(inputs.quantity, 1)))
  const exchangeRate = safePositiveNumber(inputs.exchangeRate, 1)
  const unitPriceForeign = safeNonNegativeNumber(inputs.unitPriceForeign)
  const internationalFreightForeign = safeNonNegativeNumber(inputs.internationalFreightForeign)
  const insuranceForeign = safeNonNegativeNumber(inputs.insuranceForeign)
  const otherForeignCost = safeNonNegativeNumber(inputs.otherForeignCost)
  const customsFeeCny = safeNonNegativeNumber(inputs.customsFeeCny)
  const portChargeCny = safeNonNegativeNumber(inputs.portChargeCny)
  const domesticFreightCny = safeNonNegativeNumber(inputs.domesticFreightCny)
  const otherLocalCostCny = safeNonNegativeNumber(inputs.otherLocalCostCny)
  const targetSellingPriceCny = safeNonNegativeNumber(inputs.targetSellingPriceCny)

  const goodsValueForeign = unitPriceForeign * quantity
  const foreignCostTotal = goodsValueForeign + internationalFreightForeign + insuranceForeign + otherForeignCost
  const goodsValueCny = goodsValueForeign * exchangeRate
  const internationalFreightCny = internationalFreightForeign * exchangeRate
  const insuranceCny = insuranceForeign * exchangeRate
  const otherForeignCostCny = otherForeignCost * exchangeRate
  const cifCny = foreignCostTotal * exchangeRate
  const dutyCny = cifCny * rate(inputs.dutyRatePercent)
  const vatBaseCny = cifCny + dutyCny
  const vatCny = vatBaseCny * rate(inputs.vatRatePercent)
  const totalTaxCny = dutyCny + vatCny
  const localCostCny = customsFeeCny + portChargeCny + domesticFreightCny + otherLocalCostCny
  const totalLandedCostCny = cifCny + totalTaxCny + localCostCny
  const unitLandedCostCny = totalLandedCostCny / quantity
  const salesRevenueCny = targetSellingPriceCny * quantity
  const grossProfitCny = salesRevenueCny - totalLandedCostCny
  const grossMarginPercent = salesRevenueCny > 0 ? grossProfitCny / salesRevenueCny * 100 : 0
  const markupPercent = totalLandedCostCny > 0 ? grossProfitCny / totalLandedCostCny * 100 : 0

  const costBreakdownSource = [
    { key: 'goods', label: '货值折算', value: goodsValueCny },
    { key: 'freight', label: '国际运费', value: internationalFreightCny },
    { key: 'insurance', label: '保险费用', value: insuranceCny },
    { key: 'otherForeign', label: '其他外币费用', value: otherForeignCostCny },
    { key: 'duty', label: '进口关税', value: dutyCny },
    { key: 'vat', label: '进口增值税', value: vatCny },
    { key: 'local', label: '清关与本地费用', value: localCostCny },
  ]

  const costBreakdown = costBreakdownSource.map((row) => ({
    ...row,
    value: round(row.value),
    sharePercent: totalLandedCostCny > 0 ? row.value / totalLandedCostCny * 100 : 0,
  }))

  return {
    quantity,
    goodsValueForeign: round(goodsValueForeign),
    foreignCostTotal: round(foreignCostTotal),
    goodsValueCny: round(goodsValueCny),
    internationalFreightCny: round(internationalFreightCny),
    insuranceCny: round(insuranceCny),
    otherForeignCostCny: round(otherForeignCostCny),
    cifCny: round(cifCny),
    dutyCny: round(dutyCny),
    vatBaseCny: round(vatBaseCny),
    vatCny: round(vatCny),
    totalTaxCny: round(totalTaxCny),
    localCostCny: round(localCostCny),
    totalLandedCostCny: round(totalLandedCostCny),
    unitLandedCostCny: round(unitLandedCostCny),
    targetSellingPriceCny: round(targetSellingPriceCny),
    salesRevenueCny: round(salesRevenueCny),
    grossProfitCny: round(grossProfitCny),
    grossMarginPercent,
    markupPercent,
    costBreakdown,
  }
}
