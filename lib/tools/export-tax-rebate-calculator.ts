export type PurchaseTaxMode = 'tax-inclusive' | 'tax-exclusive'

export interface ExportTaxRebateInputs {
  purchaseTaxMode: PurchaseTaxMode
  purchaseAmountCny: number
  vatRatePercent: number
  rebateRatePercent: number
  fobAmountForeign: number
  exchangeRate: number
  domesticFreightCny: number
  customsAndPortFeeCny: number
  agencyFeeCny: number
  otherCostCny: number
}

export interface ExportTaxRebateResult {
  purchaseExclusiveCny: number
  inputVatCny: number
  purchaseCashOutflowCny: number
  fobRevenueCny: number
  estimatedRebateCny: number
  nonRefundableTaxCostCny: number
  exportExpenseCny: number
  totalIncomeCny: number
  totalCostCny: number
  profitBeforeTaxCny: number
  profitMarginPercent: number
  rebateSharePercent: number
}

export const DEFAULT_EXPORT_TAX_REBATE_INPUTS: ExportTaxRebateInputs = {
  purchaseTaxMode: 'tax-inclusive',
  purchaseAmountCny: 113000,
  vatRatePercent: 13,
  rebateRatePercent: 13,
  fobAmountForeign: 18500,
  exchangeRate: 7.2,
  domesticFreightCny: 1800,
  customsAndPortFeeCny: 1200,
  agencyFeeCny: 500,
  otherCostCny: 0,
}

const safe = (value: number) => Number.isFinite(value) && value > 0 ? value : 0
const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100

export function calculateExportTaxRebate(inputs: ExportTaxRebateInputs): ExportTaxRebateResult {
  const vatRate = Math.min(100, safe(inputs.vatRatePercent)) / 100
  const rebateRate = Math.min(vatRate, Math.min(100, safe(inputs.rebateRatePercent)) / 100)
  const purchaseAmount = safe(inputs.purchaseAmountCny)
  const purchaseExclusiveCny = inputs.purchaseTaxMode === 'tax-exclusive'
    ? purchaseAmount
    : purchaseAmount / (1 + vatRate)
  const inputVatCny = purchaseExclusiveCny * vatRate
  const purchaseCashOutflowCny = purchaseExclusiveCny + inputVatCny
  const fobRevenueCny = safe(inputs.fobAmountForeign) * safe(inputs.exchangeRate)
  const estimatedRebateCny = purchaseExclusiveCny * rebateRate
  const nonRefundableTaxCostCny = purchaseExclusiveCny * Math.max(0, vatRate - rebateRate)
  const exportExpenseCny = safe(inputs.domesticFreightCny) + safe(inputs.customsAndPortFeeCny)
    + safe(inputs.agencyFeeCny) + safe(inputs.otherCostCny)
  const totalIncomeCny = fobRevenueCny + estimatedRebateCny
  const totalCostCny = purchaseCashOutflowCny + exportExpenseCny
  const profitBeforeTaxCny = totalIncomeCny - totalCostCny

  return {
    purchaseExclusiveCny: round(purchaseExclusiveCny),
    inputVatCny: round(inputVatCny),
    purchaseCashOutflowCny: round(purchaseCashOutflowCny),
    fobRevenueCny: round(fobRevenueCny),
    estimatedRebateCny: round(estimatedRebateCny),
    nonRefundableTaxCostCny: round(nonRefundableTaxCostCny),
    exportExpenseCny: round(exportExpenseCny),
    totalIncomeCny: round(totalIncomeCny),
    totalCostCny: round(totalCostCny),
    profitBeforeTaxCny: round(profitBeforeTaxCny),
    profitMarginPercent: totalIncomeCny > 0 ? profitBeforeTaxCny / totalIncomeCny * 100 : 0,
    rebateSharePercent: totalIncomeCny > 0 ? estimatedRebateCny / totalIncomeCny * 100 : 0,
  }
}
