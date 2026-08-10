// 名称: 外贸阶梯报价页面数据
// 描述: 管理表单状态、币种、场景预设与复制摘要
// 路径: Globokit/app/tools/tiered-quote-calculator/tiered-quote-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

import {
  DEFAULT_TIERED_QUOTE_INPUTS,
  TIERED_QUOTE_CURRENCY_OPTIONS,
  type TieredQuoteCurrency,
  type TieredQuoteInputs,
  type TieredQuoteResult,
  type TieredQuoteTierInput,
} from '@/lib/tools/tiered-quote-calculator'

export type TierNumericField = Exclude<keyof TieredQuoteTierInput, 'id' | 'label'>
export type QuoteCommonField = Exclude<keyof TieredQuoteInputs, 'currency' | 'tiers'>

export interface TierFormState extends Record<TierNumericField, string> {
  id: string
  label: string
}

export interface TieredQuoteFormState extends Record<QuoteCommonField, string> {
  currency: TieredQuoteCurrency
  tiers: TierFormState[]
}

export interface TieredQuotePreset {
  label: string
  description: string
  values: Partial<TieredQuoteFormState>
}

const toTierForm = (tier: TieredQuoteTierInput): TierFormState => ({
  id: tier.id,
  label: tier.label,
  quantity: String(tier.quantity),
  unitCostCny: String(tier.unitCostCny),
})

const DEFAULT_TIERS = DEFAULT_TIERED_QUOTE_INPUTS.tiers.map(toTierForm)
const SMALL_ORDER_TIERS: TierFormState[] = [
  { id: 'small-50', label: '样品后试单', quantity: '50', unitCostCny: '55' },
  { id: 'small-100', label: '小额订单', quantity: '100', unitCostCny: '52' },
  { id: 'small-300', label: '常规小单', quantity: '300', unitCostCny: '49' },
  { id: 'small-500', label: '稳定补货', quantity: '500', unitCostCny: '47' },
]
const BULK_ORDER_TIERS: TierFormState[] = [
  { id: 'bulk-1000', label: '起订量', quantity: '1000', unitCostCny: '45' },
  { id: 'bulk-3000', label: '标准大货', quantity: '3000', unitCostCny: '43' },
  { id: 'bulk-5000', label: '整批采购', quantity: '5000', unitCostCny: '42' },
  { id: 'bulk-10000', label: '年度框架量', quantity: '10000', unitCostCny: '40' },
]

export const TIERED_QUOTE_PRESETS: readonly TieredQuotePreset[] = [
  { label: '常规外贸', description: '含佣金与收款费的四档美元报价', values: { currency: 'USD', exchangeRate: '7.2', fixedOrderCostCny: '800', commissionPercent: '3', paymentFeePercent: '1.5', targetMarginPercent: '25', roundingIncrementForeign: '0.05', tiers: DEFAULT_TIERS } },
  { label: '小额试单', description: '突出小订单固定费用摊销差异', values: { fixedOrderCostCny: '600', targetMarginPercent: '25', tiers: SMALL_ORDER_TIERS } },
  { label: '大货询价', description: '比较千件以上采购成本与单价降幅', values: { fixedOrderCostCny: '1200', targetMarginPercent: '22', tiers: BULK_ORDER_TIERS } },
  { label: '平台订单', description: '提高平台佣金和收款费率预算', values: { commissionPercent: '8', paymentFeePercent: '3', targetMarginPercent: '20' } },
]

export function createInitialForm(): TieredQuoteFormState {
  const inputs = DEFAULT_TIERED_QUOTE_INPUTS
  return {
    currency: inputs.currency,
    exchangeRate: String(inputs.exchangeRate),
    fixedOrderCostCny: String(inputs.fixedOrderCostCny),
    commissionPercent: String(inputs.commissionPercent),
    paymentFeePercent: String(inputs.paymentFeePercent),
    targetMarginPercent: String(inputs.targetMarginPercent),
    roundingIncrementForeign: String(inputs.roundingIncrementForeign),
    tiers: inputs.tiers.map(toTierForm),
  }
}

export function createAdditionalTier(tiers: TierFormState[]): TierFormState {
  let suffix = 1
  while (tiers.some((tier) => tier.id === `custom-tier-${suffix}`)) suffix += 1
  const largest = [...tiers].sort((a, b) => toNumber(b.quantity) - toNumber(a.quantity))[0]
  const quantity = Math.max(1, Math.round(toNumber(largest?.quantity ?? '100') * 2))
  const unitCost = Math.max(0.01, toNumber(largest?.unitCostCny ?? '50') * 0.95)
  return { id: `custom-tier-${suffix}`, label: `新增档位 ${suffix}`, quantity: String(quantity), unitCostCny: unitCost.toFixed(2) }
}

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function toInputs(form: TieredQuoteFormState): TieredQuoteInputs {
  return {
    currency: form.currency,
    exchangeRate: toNumber(form.exchangeRate),
    fixedOrderCostCny: toNumber(form.fixedOrderCostCny),
    commissionPercent: toNumber(form.commissionPercent),
    paymentFeePercent: toNumber(form.paymentFeePercent),
    targetMarginPercent: toNumber(form.targetMarginPercent),
    roundingIncrementForeign: toNumber(form.roundingIncrementForeign),
    tiers: form.tiers.map((tier) => ({ id: tier.id, label: tier.label, quantity: toNumber(tier.quantity), unitCostCny: toNumber(tier.unitCostCny) })),
  }
}

export const formatCny = (value: number) => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 }).format(value)
export const formatForeign = (value: number, currency: TieredQuoteCurrency) => new Intl.NumberFormat('zh-CN', { style: 'currency', currency, maximumFractionDigits: currency === 'CNY' ? 2 : 4 }).format(value)
export const formatPercent = (value: number) => `${value.toFixed(1)}%`

export function buildTieredQuoteSummary(result: TieredQuoteResult) {
  const best = result.tiers.find((tier) => tier.id === result.lowestUnitPriceTierId) ?? result.tiers[0]
  const currencyLabel = TIERED_QUOTE_CURRENCY_OPTIONS.find((option) => option.value === result.currency)?.label ?? result.currency
  return [
    '外贸阶梯报价',
    `报价币种：${currencyLabel}`,
    `结算汇率：${result.exchangeRate} CNY/${result.currency}`,
    `固定费用：${formatCny(result.fixedOrderCostCny)}`,
    `目标利润率：${formatPercent(result.targetMarginPercent)}；佣金 ${formatPercent(result.commissionPercent)}；收款费 ${formatPercent(result.paymentFeePercent)}`,
    ...[...result.tiers].sort((a, b) => a.quantity - b.quantity).map((tier) => `${tier.label}：${tier.quantity.toLocaleString('zh-CN')} 件，${formatForeign(tier.quotedUnitPriceForeign, result.currency)}/件，订单总额 ${formatForeign(tier.totalQuoteForeign, result.currency)}，实际利润率 ${formatPercent(tier.marginPercent)}`),
    `最低单价档位：${best.label}，较最小数量档位降低 ${formatPercent(result.maximumPriceReductionPercent)}`,
    '注：报价只包含采购成本、每单固定费用、佣金、收款费和目标利润，不自动计入运费、税费或汇率波动。',
  ].join('\n')
}
