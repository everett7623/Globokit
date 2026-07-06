// 名称: 外贸报价利润计算逻辑
// 描述: 根据采购成本、费用、汇率、佣金和目标利润率计算外贸报价
// 路径: Globokit/lib/tools/quote-calculator.ts
// 作者: Jensfrank
// 更新时间: 2026-07-06

export type QuoteMode = 'target-margin' | 'known-price'

export interface QuoteInputs {
  unitCostCny: number
  quantity: number
  domesticFeeCny: number
  exportFeeCny: number
  internationalFreightCny: number
  exchangeRate: number
  targetMarginPercent: number
  sellingPriceForeign: number
  commissionPercent: number
  paymentFeePercent: number
  rebatePercent: number
  vatPercent: number
}

export interface QuoteResult {
  quantity: number
  totalProductCostCny: number
  fixedCostCny: number
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
}

export const DEFAULT_QUOTE_INPUTS: QuoteInputs = {
  unitCostCny: 48,
  quantity: 100,
  domesticFeeCny: 300,
  exportFeeCny: 180,
  internationalFreightCny: 650,
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
  const quantity = Math.max(1, Math.floor(safeNumber(inputs.quantity, 1)))
  const exchangeRate = Math.max(0.0001, safeNumber(inputs.exchangeRate, DEFAULT_QUOTE_INPUTS.exchangeRate))
  const productCost = Math.max(0, safeNumber(inputs.unitCostCny)) * quantity
  const fixedCost =
    productCost +
    Math.max(0, safeNumber(inputs.domesticFeeCny)) +
    Math.max(0, safeNumber(inputs.exportFeeCny)) +
    Math.max(0, safeNumber(inputs.internationalFreightCny))

  const vatRate = rate(inputs.vatPercent)
  const rebateAmount = vatRate >= 0
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

  return {
    quantity,
    totalProductCostCny: roundMoney(productCost),
    fixedCostCny: roundMoney(fixedCost),
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
  }
}
