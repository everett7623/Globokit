// 名称: 外贸报价利润计算逻辑
// 描述: 根据采购成本、费用、汇率、佣金和目标利润率计算外贸报价
// 路径: Globokit/lib/tools/quote-calculator.ts
// 作者: Jensfrank
// 更新时间: 2026-07-08

export type QuoteMode = 'target-margin' | 'known-price'
export type QuoteTerm = 'EXW' | 'FCA' | 'FAS' | 'FOB' | 'CFR' | 'CIF' | 'CPT' | 'CIP' | 'DAP' | 'DPU' | 'DDP'
export type QuoteCostKey =
  | 'product'
  | 'domestic'
  | 'export'
  | 'freight'
  | 'insurance'
  | 'destination'
  | 'importTax'

export interface QuoteTermConfig {
  code: QuoteTerm
  nameCn: string
  nameEn: string
  sellerCostKeys: QuoteCostKey[]
  requiredCostKeys: QuoteCostKey[]
  rebateEligible: boolean
  note: string
}

export interface QuoteInputs {
  quoteTerm: QuoteTerm
  unitCostCny: number
  quantity: number
  domesticFeeCny: number
  exportFeeCny: number
  internationalFreightCny: number
  insuranceFeeCny: number
  destinationFeeCny: number
  importDutyTaxCny: number
  exchangeRate: number
  targetMarginPercent: number
  sellingPriceForeign: number
  commissionPercent: number
  paymentFeePercent: number
  rebatePercent: number
  vatPercent: number
}

export interface QuoteCostRow {
  key: QuoteCostKey
  label: string
  value: number
  included: boolean
}

export interface QuoteResult {
  quoteTerm: QuoteTerm
  quantity: number
  totalProductCostCny: number
  fixedCostCny: number
  excludedCostCny: number
  rebateAmountCny: number
  effectiveCostCny: number
  variableFeeCny: number
  revenueCny: number
  profitCny: number
  marginPercent: number
  markupPercent: number
  breakevenUnitPriceForeign: number
  quotedUnitPriceForeign: number
  totalQuoteForeign: number
  unitCostAfterRebateForeign: number
  costRows: QuoteCostRow[]
  missingCostLabels: string[]
}

export const QUOTE_COST_LABELS: Record<QuoteCostKey, string> = {
  product: '采购成本',
  domestic: '内陆/交货前费用',
  export: '出口报关/起运港杂',
  freight: '国际运输费',
  insurance: '运输保险费',
  destination: '目的地费用/派送',
  importTax: '进口清关税费',
}

export const QUOTE_TERM_CONFIGS: Record<QuoteTerm, QuoteTermConfig> = {
  EXW: {
    code: 'EXW',
    nameCn: '工厂交货',
    nameEn: 'Ex Works',
    sellerCostKeys: ['product'],
    requiredCostKeys: [],
    rebateEligible: false,
    note: '卖方通常只负责备货交货，出口与运输费用不计入报价。',
  },
  FCA: {
    code: 'FCA',
    nameCn: '货交承运人',
    nameEn: 'Free Carrier',
    sellerCostKeys: ['product', 'domestic', 'export'],
    requiredCostKeys: [],
    rebateEligible: true,
    note: '卖方负责出口手续并交给承运人；若买方上门提货，可将内陆费用填 0。',
  },
  FAS: {
    code: 'FAS',
    nameCn: '船边交货',
    nameEn: 'Free Alongside Ship',
    sellerCostKeys: ['product', 'domestic', 'export'],
    requiredCostKeys: [],
    rebateEligible: true,
    note: '卖方承担货到装运港船边前费用，适合散杂货和大宗海运。',
  },
  FOB: {
    code: 'FOB',
    nameCn: '船上交货',
    nameEn: 'Free On Board',
    sellerCostKeys: ['product', 'domestic', 'export'],
    requiredCostKeys: [],
    rebateEligible: true,
    note: '卖方承担出口及装船前费用，国际运费和保险通常由买方承担。',
  },
  CFR: {
    code: 'CFR',
    nameCn: '成本加运费',
    nameEn: 'Cost and Freight',
    sellerCostKeys: ['product', 'domestic', 'export', 'freight'],
    requiredCostKeys: ['freight'],
    rebateEligible: true,
    note: '卖方支付主运费至目的港；请先拿到货代运费再测算。',
  },
  CIF: {
    code: 'CIF',
    nameCn: '成本加保险费加运费',
    nameEn: 'Cost Insurance and Freight',
    sellerCostKeys: ['product', 'domestic', 'export', 'freight', 'insurance'],
    requiredCostKeys: ['freight', 'insurance'],
    rebateEligible: true,
    note: '卖方支付主运费和保险费；运费、保险费需要手动录入。',
  },
  CPT: {
    code: 'CPT',
    nameCn: '运费付至',
    nameEn: 'Carriage Paid To',
    sellerCostKeys: ['product', 'domestic', 'export', 'freight'],
    requiredCostKeys: ['freight'],
    rebateEligible: true,
    note: '卖方支付至指定目的地的运输费，但风险在起运地交承运人时转移。',
  },
  CIP: {
    code: 'CIP',
    nameCn: '运费和保险费付至',
    nameEn: 'Carriage and Insurance Paid To',
    sellerCostKeys: ['product', 'domestic', 'export', 'freight', 'insurance'],
    requiredCostKeys: ['freight', 'insurance'],
    rebateEligible: true,
    note: '卖方支付运输费和保险费；保险金额和费率仍需按实际保单录入。',
  },
  DAP: {
    code: 'DAP',
    nameCn: '目的地交货',
    nameEn: 'Delivered At Place',
    sellerCostKeys: ['product', 'domestic', 'export', 'freight', 'insurance', 'destination'],
    requiredCostKeys: ['freight', 'destination'],
    rebateEligible: true,
    note: '卖方承担到目的地交货前费用，不含进口清关税费。',
  },
  DPU: {
    code: 'DPU',
    nameCn: '目的地卸货后交货',
    nameEn: 'Delivered at Place Unloaded',
    sellerCostKeys: ['product', 'domestic', 'export', 'freight', 'insurance', 'destination'],
    requiredCostKeys: ['freight', 'destination'],
    rebateEligible: true,
    note: '卖方承担运输和目的地卸货费用，进口清关税费仍由买方承担。',
  },
  DDP: {
    code: 'DDP',
    nameCn: '完税后交货',
    nameEn: 'Delivered Duty Paid',
    sellerCostKeys: ['product', 'domestic', 'export', 'freight', 'insurance', 'destination', 'importTax'],
    requiredCostKeys: ['freight', 'destination', 'importTax'],
    rebateEligible: true,
    note: '卖方承担到门、进口清关与税费；需补齐目的地费用和进口税费后才有参考价值。',
  },
}

export const QUOTE_TERM_OPTIONS = Object.values(QUOTE_TERM_CONFIGS)

export const DEFAULT_QUOTE_INPUTS: QuoteInputs = {
  quoteTerm: 'FOB',
  unitCostCny: 48,
  quantity: 100,
  domesticFeeCny: 300,
  exportFeeCny: 180,
  internationalFreightCny: 0,
  insuranceFeeCny: 0,
  destinationFeeCny: 0,
  importDutyTaxCny: 0,
  exchangeRate: 7.2,
  targetMarginPercent: 25,
  sellingPriceForeign: 12,
  commissionPercent: 3,
  paymentFeePercent: 1.5,
  rebatePercent: 0,
  vatPercent: 13,
}

function safeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback
}

function rate(percent: number) {
  return Math.max(0, safeNumber(percent)) / 100
}

function roundMoney(value: number) {
  return Math.round((safeNumber(value) + Number.EPSILON) * 100) / 100
}

export function calculateQuote(inputs: QuoteInputs, mode: QuoteMode): QuoteResult {
  const quoteTerm = QUOTE_TERM_CONFIGS[inputs.quoteTerm] ? inputs.quoteTerm : DEFAULT_QUOTE_INPUTS.quoteTerm
  const termConfig = QUOTE_TERM_CONFIGS[quoteTerm]
  const quantity = Math.max(1, Math.floor(safeNumber(inputs.quantity, 1)))
  const exchangeRate = Math.max(0.0001, safeNumber(inputs.exchangeRate, DEFAULT_QUOTE_INPUTS.exchangeRate))
  const productCost = Math.max(0, safeNumber(inputs.unitCostCny)) * quantity
  const componentValues: Record<QuoteCostKey, number> = {
    product: productCost,
    domestic: Math.max(0, safeNumber(inputs.domesticFeeCny)),
    export: Math.max(0, safeNumber(inputs.exportFeeCny)),
    freight: Math.max(0, safeNumber(inputs.internationalFreightCny)),
    insurance: Math.max(0, safeNumber(inputs.insuranceFeeCny)),
    destination: Math.max(0, safeNumber(inputs.destinationFeeCny)),
    importTax: Math.max(0, safeNumber(inputs.importDutyTaxCny)),
  }
  const includedKeys = new Set<QuoteCostKey>(termConfig.sellerCostKeys)
  const costRows = (Object.keys(QUOTE_COST_LABELS) as QuoteCostKey[]).map((key) => ({
    key,
    label: QUOTE_COST_LABELS[key],
    value: componentValues[key],
    included: includedKeys.has(key),
  }))
  const fixedCost = costRows
    .filter((row) => row.included)
    .reduce((sum, row) => sum + row.value, 0)
  const excludedCost = costRows
    .filter((row) => !row.included)
    .reduce((sum, row) => sum + row.value, 0)

  const vatRate = rate(inputs.vatPercent)
  const rebateAmount = termConfig.rebateEligible && vatRate >= 0
    ? productCost / (1 + vatRate) * rate(inputs.rebatePercent)
    : 0
  const effectiveCost = Math.max(0, fixedCost - rebateAmount)
  const variableFeeRate = rate(inputs.commissionPercent) + rate(inputs.paymentFeePercent)
  const breakevenDenominator = 1 - variableFeeRate

  if (breakevenDenominator <= 0) {
    throw new Error('佣金和手续费合计不能达到或超过 100%')
  }

  const breakevenUnitPriceForeign = effectiveCost / breakevenDenominator / quantity / exchangeRate
  const targetMarginRate = rate(inputs.targetMarginPercent)
  const targetDenominator = 1 - variableFeeRate - targetMarginRate

  if (mode === 'target-margin' && targetDenominator <= 0) {
    throw new Error('目标利润率、佣金和手续费合计不能达到或超过 100%')
  }

  const quotedUnitPriceForeign = mode === 'target-margin'
    ? effectiveCost / targetDenominator / quantity / exchangeRate
    : Math.max(0, safeNumber(inputs.sellingPriceForeign))

  const totalQuoteForeign = quotedUnitPriceForeign * quantity
  const revenueCny = totalQuoteForeign * exchangeRate
  const variableFee = revenueCny * variableFeeRate
  const profit = revenueCny - variableFee - effectiveCost
  const marginPercent = revenueCny > 0 ? profit / revenueCny * 100 : 0
  const markupPercent = effectiveCost > 0 ? profit / effectiveCost * 100 : 0
  const missingCostLabels = termConfig.requiredCostKeys
    .filter((key) => componentValues[key] <= 0)
    .map((key) => QUOTE_COST_LABELS[key])

  return {
    quoteTerm,
    quantity,
    totalProductCostCny: roundMoney(productCost),
    fixedCostCny: roundMoney(fixedCost),
    excludedCostCny: roundMoney(excludedCost),
    rebateAmountCny: roundMoney(rebateAmount),
    effectiveCostCny: roundMoney(effectiveCost),
    variableFeeCny: roundMoney(variableFee),
    revenueCny: roundMoney(revenueCny),
    profitCny: roundMoney(profit),
    marginPercent,
    markupPercent,
    breakevenUnitPriceForeign,
    quotedUnitPriceForeign,
    totalQuoteForeign,
    unitCostAfterRebateForeign: effectiveCost / quantity / exchangeRate,
    costRows: costRows.map((row) => ({
      ...row,
      value: roundMoney(row.value),
    })),
    missingCostLabels,
  }
}
