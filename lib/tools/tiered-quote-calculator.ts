// 名称: 外贸阶梯报价计算逻辑
// 描述: 按数量档位、采购单价、固定费用和目标利润率反算外币阶梯报价
// 路径: Globokit/lib/tools/tiered-quote-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

export type TieredQuoteCurrency = 'USD' | 'EUR' | 'GBP' | 'CNY'

export interface TieredQuoteTierInput {
  id: string
  label: string
  quantity: number
  unitCostCny: number
}

export interface TieredQuoteInputs {
  currency: TieredQuoteCurrency
  exchangeRate: number
  fixedOrderCostCny: number
  commissionPercent: number
  paymentFeePercent: number
  targetMarginPercent: number
  roundingIncrementForeign: number
  tiers: TieredQuoteTierInput[]
}

export interface TieredQuoteTierResult extends TieredQuoteTierInput {
  quantityRank: number
  unitPriceRank: number
  productCostCny: number
  totalCostCny: number
  fixedCostPerUnitCny: number
  allocatedCostPerUnitCny: number
  breakEvenUnitPriceForeign: number
  rawUnitPriceForeign: number
  quotedUnitPriceForeign: number
  totalQuoteForeign: number
  revenueCny: number
  variableFeeCny: number
  profitCny: number
  marginPercent: number
  priceReductionVsBasePercent: number
  purchaseSavingVsBaseCny: number
}

export interface TieredQuoteResult {
  currency: TieredQuoteCurrency
  exchangeRate: number
  fixedOrderCostCny: number
  commissionPercent: number
  paymentFeePercent: number
  targetMarginPercent: number
  roundingIncrementForeign: number
  baseTierId: string
  largestTierId: string
  lowestUnitPriceTierId: string
  maximumPriceReductionPercent: number
  fixedCostDilutionCnyPerUnit: number
  tiers: TieredQuoteTierResult[]
}

export const MIN_QUOTE_TIERS = 2
export const MAX_QUOTE_TIERS = 5

export const TIERED_QUOTE_CURRENCY_OPTIONS: Array<{ value: TieredQuoteCurrency; label: string; rate: number }> = [
  { value: 'USD', label: 'USD 美元', rate: 7.2 },
  { value: 'EUR', label: 'EUR 欧元', rate: 7.8 },
  { value: 'GBP', label: 'GBP 英镑', rate: 9.2 },
  { value: 'CNY', label: 'CNY 人民币', rate: 1 },
]

export const DEFAULT_TIERED_QUOTE_INPUTS: TieredQuoteInputs = {
  currency: 'USD',
  exchangeRate: 7.2,
  fixedOrderCostCny: 800,
  commissionPercent: 3,
  paymentFeePercent: 1.5,
  targetMarginPercent: 25,
  roundingIncrementForeign: 0.05,
  tiers: [
    { id: 'tier-100', label: '试单价', quantity: 100, unitCostCny: 50 },
    { id: 'tier-500', label: '小批量价', quantity: 500, unitCostCny: 47 },
    { id: 'tier-1000', label: '批量价', quantity: 1000, unitCostCny: 45 },
    { id: 'tier-5000', label: '大货价', quantity: 5000, unitCostCny: 42 },
  ],
}

function requireFinite(value: number, label: string, min: number, max: number) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  }
  return value
}

function requireInteger(value: number, label: string, min: number, max: number) {
  requireFinite(value, label, min, max)
  if (!Number.isInteger(value)) throw new Error(`${label}必须是整数`)
  return value
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function roundUp(value: number, increment: number) {
  if (increment === 0) return round(value, 6)
  return round(Math.ceil(value / increment - 1e-10) * increment, 6)
}

export function calculateTieredQuote(inputs: TieredQuoteInputs): TieredQuoteResult {
  if (!TIERED_QUOTE_CURRENCY_OPTIONS.some((option) => option.value === inputs.currency)) throw new Error('请选择有效的报价币种')
  const exchangeRate = requireFinite(inputs.exchangeRate, '结算汇率', 0.000001, 100_000)
  const fixedOrderCostCny = requireFinite(inputs.fixedOrderCostCny, '每单固定费用', 0, 1_000_000_000_000)
  const commissionPercent = requireFinite(inputs.commissionPercent, '佣金率', 0, 99.99)
  const paymentFeePercent = requireFinite(inputs.paymentFeePercent, '收款费率', 0, 99.99)
  const targetMarginPercent = requireFinite(inputs.targetMarginPercent, '目标利润率', 0, 99.99)
  const roundingIncrementForeign = requireFinite(inputs.roundingIncrementForeign, '报价取整步长', 0, 1_000_000)
  if (inputs.tiers.length < MIN_QUOTE_TIERS || inputs.tiers.length > MAX_QUOTE_TIERS) {
    throw new Error(`数量档位必须为 ${MIN_QUOTE_TIERS} 到 ${MAX_QUOTE_TIERS} 个`)
  }
  if (new Set(inputs.tiers.map((tier) => tier.id)).size !== inputs.tiers.length) throw new Error('数量档位 ID 不能重复')
  const variableFeeRate = (commissionPercent + paymentFeePercent) / 100
  const targetMarginRate = targetMarginPercent / 100
  const quoteDenominator = 1 - variableFeeRate - targetMarginRate
  const breakEvenDenominator = 1 - variableFeeRate
  if (quoteDenominator <= 0) throw new Error('目标利润率、佣金率和收款费率合计必须小于 100%')

  const normalized = inputs.tiers.map((tier, index) => {
    const label = tier.label.trim()
    if (!label) throw new Error(`档位 ${index + 1} 名称不能为空`)
    return {
      ...tier,
      label,
      quantity: requireInteger(tier.quantity, `${label}数量`, 1, 1_000_000_000),
      unitCostCny: requireFinite(tier.unitCostCny, `${label}采购单价`, 0.000001, 1_000_000_000),
    }
  })
  if (new Set(normalized.map((tier) => tier.quantity)).size !== normalized.length) throw new Error('数量档位不能重复')
  const quantityOrder = [...normalized].sort((a, b) => a.quantity - b.quantity)
  const baseTier = quantityOrder[0]
  const largestTier = quantityOrder[quantityOrder.length - 1]

  const calculated = normalized.map((tier): TieredQuoteTierResult => {
    const productCostCny = tier.unitCostCny * tier.quantity
    const totalCostCny = productCostCny + fixedOrderCostCny
    const rawUnitPriceForeign = totalCostCny / quoteDenominator / tier.quantity / exchangeRate
    const quotedUnitPriceForeign = roundUp(rawUnitPriceForeign, roundingIncrementForeign)
    const totalQuoteForeign = quotedUnitPriceForeign * tier.quantity
    const revenueCny = totalQuoteForeign * exchangeRate
    const variableFeeCny = revenueCny * variableFeeRate
    const profitCny = revenueCny - variableFeeCny - totalCostCny
    return {
      ...tier,
      quantityRank: quantityOrder.findIndex((item) => item.id === tier.id) + 1,
      unitPriceRank: 0,
      productCostCny: round(productCostCny),
      totalCostCny: round(totalCostCny),
      fixedCostPerUnitCny: round(fixedOrderCostCny / tier.quantity, 4),
      allocatedCostPerUnitCny: round(totalCostCny / tier.quantity, 4),
      breakEvenUnitPriceForeign: round(totalCostCny / breakEvenDenominator / tier.quantity / exchangeRate, 6),
      rawUnitPriceForeign: round(rawUnitPriceForeign, 6),
      quotedUnitPriceForeign,
      totalQuoteForeign: round(totalQuoteForeign),
      revenueCny: round(revenueCny),
      variableFeeCny: round(variableFeeCny),
      profitCny: round(profitCny),
      marginPercent: revenueCny > 0 ? profitCny / revenueCny * 100 : 0,
      priceReductionVsBasePercent: 0,
      purchaseSavingVsBaseCny: round((baseTier.unitCostCny - tier.unitCostCny) * tier.quantity),
    }
  })
  const baseResult = calculated.find((tier) => tier.id === baseTier.id) ?? calculated[0]
  const priceOrder = [...calculated].sort((a, b) => a.quotedUnitPriceForeign - b.quotedUnitPriceForeign || b.quantity - a.quantity)
  const tiers = calculated.map((tier) => ({
    ...tier,
    unitPriceRank: priceOrder.findIndex((item) => item.id === tier.id) + 1,
    priceReductionVsBasePercent: baseResult.quotedUnitPriceForeign > 0 ? (baseResult.quotedUnitPriceForeign - tier.quotedUnitPriceForeign) / baseResult.quotedUnitPriceForeign * 100 : 0,
  }))
  const largestResult = tiers.find((tier) => tier.id === largestTier.id) ?? tiers[tiers.length - 1]

  return {
    currency: inputs.currency,
    exchangeRate: round(exchangeRate, 6),
    fixedOrderCostCny: round(fixedOrderCostCny),
    commissionPercent,
    paymentFeePercent,
    targetMarginPercent,
    roundingIncrementForeign,
    baseTierId: baseTier.id,
    largestTierId: largestTier.id,
    lowestUnitPriceTierId: priceOrder[0].id,
    maximumPriceReductionPercent: Math.max(...tiers.map((tier) => tier.priceReductionVsBasePercent)),
    fixedCostDilutionCnyPerUnit: round(baseResult.fixedCostPerUnitCny - largestResult.fixedCostPerUnitCny, 4),
    tiers,
  }
}
