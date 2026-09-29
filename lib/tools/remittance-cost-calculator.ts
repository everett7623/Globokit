// 名称: 国际收款渠道费用对比计算逻辑
// 描述: 按订单金额、币种构成与汇率折算，比较电汇、信用证、托收与第三方渠道的到手金额、成本率与资金占用
// 路径: Globokit/lib/tools/remittance-cost-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-09-18

export type RemittanceChannelId = 'tt' | 'lc' | 'dp' | 'gateway' | 'platform'

export interface RemittanceChannelConfig {
  id: RemittanceChannelId
  name: string
  shortName: string
  /** 收款条件说明 */
  settlement: string
  /** 预计回款周期（天） */
  collectionDays: number
  /** 平台/银行手续费率（订单金额百分比） */
  ratePercent: number
  /** 固定费用（以支付币种计价） */
  fixedFee: number
  /** 电报费/单据费等中段费用（以支付币种计价） */
  midFee: number
  /** 汇损预算（订单金额百分比，含中间行与点差） */
  fxLossPercent: number
  /** 是否有银行额度或开证成本 */
  openingFee: number
  /** 该渠道的典型适用场景 */
  fit: string
}

export const REMITTANCE_CHANNELS: readonly RemittanceChannelConfig[] = [
  {
    id: 'tt',
    name: '电汇 T/T',
    shortName: 'T/T',
    settlement: '客户直接汇入公司外币账户',
    collectionDays: 3,
    ratePercent: 0,
    fixedFee: 0,
    midFee: 45,
    fxLossPercent: 0.3,
    openingFee: 0,
    fit: '老客户、小额到中额订单，回款最快',
  },
  {
    id: 'lc',
    name: '信用证 L/C',
    shortName: 'L/C',
    settlement: '银行开证并按单据付款',
    collectionDays: 25,
    ratePercent: 0.5,
    fixedFee: 60,
    midFee: 120,
    fxLossPercent: 0.2,
    openingFee: 180,
    fit: '大额订单、新客户或高风险市场，单据要求严格',
  },
  {
    id: 'dp',
    name: '托收 D/P',
    shortName: 'D/P',
    settlement: '单据经银行代收，买方付款后交单',
    collectionDays: 18,
    ratePercent: 0.35,
    fixedFee: 40,
    midFee: 60,
    fxLossPercent: 0.35,
    openingFee: 0,
    fit: '需要银行介入但不想承担开证成本的订单',
  },
  {
    id: 'gateway',
    name: '第三方收款（PayPal 类）',
    shortName: '第三方',
    settlement: '平台账户收款后提现到境内账户',
    collectionDays: 2,
    ratePercent: 3.4,
    fixedFee: 0.4,
    midFee: 0,
    fxLossPercent: 1.2,
    openingFee: 0,
    fit: '样品单、小额试单，客户付款门槛最低',
  },
  {
    id: 'platform',
    name: '平台托管（B2B 平台）',
    shortName: '平台',
    settlement: '平台担保交易，确认收货后放款',
    collectionDays: 14,
    ratePercent: 2.2,
    fixedFee: 20,
    midFee: 0,
    fxLossPercent: 0.8,
    openingFee: 0,
    fit: '平台获客订单，兼顾信任与到账速度',
  },
]

export interface RemittanceInputs {
  /** 订单金额（支付币种计价） */
  orderAmount: number
  /** 支付币种代码 */
  currency: string
  /** 该币种兑结算币种的汇率（1 支付币种 = N 结算币种） */
  exchangeRate: number
  /** 结算币种代码 */
  settlementCurrency: string
  /** 资金年化成本（百分比），用于衡量账期占用 */
  annualFundingRatePercent: number
  /** 不同渠道的手续费是否由卖方承担（否则从买方收款中另收） */
  sellerPaysFee: boolean
  /** 参与对比的渠道 */
  channelIds: RemittanceChannelId[]
}

export interface RemittanceChannelFee {
  label: string
  amountForeign: number
  amountSettlement: number
}

export interface RemittanceChannelResult {
  id: RemittanceChannelId
  name: string
  shortName: string
  settlement: string
  fit: string
  rank: number
  collectionDays: number
  /** 以支付币种计价的费用明细 */
  feesForeign: RemittanceChannelFee[]
  totalFeeForeign: number
  totalFeeSettlement: number
  /** 实际到手（结算币种） */
  netReceiptSettlement: number
  /** 成本率（费用占订单金额比例） */
  costRatePercent: number
  /** 资金占用成本（结算币种） */
  fundingCostSettlement: number
  /** 计入资金占用后的总成本（结算币种） */
  totalCostSettlement: number
  /** 到手金额扣除资金占用后 */
  netAfterFundingSettlement: number
}

export interface RemittanceResult {
  orderAmount: number
  currency: string
  settlementCurrency: string
  exchangeRate: number
  /** 订单金额折算为结算币种 */
  orderAmountSettlement: number
  channels: RemittanceChannelResult[]
  bestChannelId: RemittanceChannelId
  /** 最快到账渠道 */
  fastestChannelId: RemittanceChannelId
  /** 最高与最低总成本差额（结算币种） */
  maxSavingSettlement: number
  /** 渠道成本率极差（百分点） */
  costRateSpread: number
  fundingRatePercent: number
  sellerPaysFee: boolean
}

const MAX_AMOUNT = 1_000_000_000

function requireFinite(value: number, label: string, min: number, max: number): number {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(label + '必须在 ' + min + ' 到 ' + max + ' 之间')
  }
  return value
}

export const DEFAULT_REMITTANCE_INPUTS: RemittanceInputs = {
  orderAmount: 50000,
  currency: 'USD',
  exchangeRate: 7.15,
  settlementCurrency: 'CNY',
  annualFundingRatePercent: 6,
  sellerPaysFee: true,
  channelIds: ['tt', 'lc', 'dp', 'gateway', 'platform'],
}

export const SUPPORTED_SETTLEMENT_CURRENCIES = ['CNY', 'USD', 'EUR', 'HKD'] as const

export function createRemittanceChannel(
  config: RemittanceChannelConfig
): RemittanceChannelConfig {
  return { ...config }
}

/** 按渠道模型计算费用明细 */
function buildFees(inputs: RemittanceInputs, channel: RemittanceChannelConfig): RemittanceChannelFee[] {
  const fees: Array<{ label: string; amountForeign: number }> = []

  if (channel.ratePercent > 0) {
    fees.push({
      label: '手续费 ' + channel.ratePercent + '%',
      amountForeign: (inputs.orderAmount * channel.ratePercent) / 100,
    })
  }
  if (channel.fixedFee > 0) {
    fees.push({ label: '固定手续费', amountForeign: channel.fixedFee })
  }
  if (channel.openingFee > 0) {
    fees.push({ label: '开证与改证费', amountForeign: channel.openingFee })
  }
  if (channel.midFee > 0) {
    fees.push({ label: '电报费与中间行费', amountForeign: channel.midFee })
  }
  if (channel.fxLossPercent > 0) {
    fees.push({
      label: '汇损预算 ' + channel.fxLossPercent + '%',
      amountForeign: (inputs.orderAmount * channel.fxLossPercent) / 100,
    })
  }

  return fees.map((fee) => ({
    label: fee.label,
    amountForeign: fee.amountForeign,
    amountSettlement: fee.amountForeign * inputs.exchangeRate,
  }))
}

/** 计算单个渠道的到手金额、成本率与资金占用 */
export function calculateRemittanceChannel(
  inputs: RemittanceInputs,
  channel: RemittanceChannelConfig
): RemittanceChannelResult {
  const feesForeign = buildFees(inputs, channel)
  const totalFeeForeign = feesForeign.reduce((sum, fee) => sum + fee.amountForeign, 0)
  const totalFeeSettlement = totalFeeForeign * inputs.exchangeRate
  const orderAmountSettlement = inputs.orderAmount * inputs.exchangeRate

  // 卖方承担费用时从收款中扣除，否则费用由买方另付、卖方全额到手
  const netReceiptSettlement = inputs.sellerPaysFee
    ? orderAmountSettlement - totalFeeSettlement
    : orderAmountSettlement

  const costRatePercent = orderAmountSettlement === 0 ? 0 : (totalFeeSettlement / orderAmountSettlement) * 100
  const fundingCostSettlement =
    (orderAmountSettlement * (inputs.annualFundingRatePercent / 100) * channel.collectionDays) / 365
  const totalCostSettlement = totalFeeSettlement + fundingCostSettlement

  return {
    id: channel.id,
    name: channel.name,
    shortName: channel.shortName,
    settlement: channel.settlement,
    fit: channel.fit,
    rank: 0,
    collectionDays: channel.collectionDays,
    feesForeign,
    totalFeeForeign,
    totalFeeSettlement,
    netReceiptSettlement,
    costRatePercent,
    fundingCostSettlement,
    totalCostSettlement,
    netAfterFundingSettlement: netReceiptSettlement - fundingCostSettlement,
  }
}

/** 对所有选中渠道排序并汇总对比结果 */
export function calculateRemittance(inputs: RemittanceInputs): RemittanceResult {
  const orderAmount = requireFinite(inputs.orderAmount, '订单金额', 0.01, MAX_AMOUNT)
  const exchangeRate = requireFinite(inputs.exchangeRate, '汇率', 0.0001, 100_000)
  const fundingRatePercent = requireFinite(inputs.annualFundingRatePercent, '资金年化成本', 0, 100)

  const selected = REMITTANCE_CHANNELS.filter((channel) => inputs.channelIds.includes(channel.id))
  if (selected.length < 2) {
    throw new Error('请至少选择 2 个收款渠道进行对比')
  }

  const normalized: RemittanceInputs = {
    ...inputs,
    orderAmount,
    exchangeRate,
    annualFundingRatePercent: fundingRatePercent,
  }

  const results = selected
    .map((channel) => calculateRemittanceChannel(normalized, channel))
    .sort((left, right) => left.totalCostSettlement - right.totalCostSettlement)
    .map((result, position) => ({ ...result, rank: position + 1 }))

  const cheapest = results[0]
  const mostExpensive = results[results.length - 1]
  const fastest = [...results].sort((left, right) => left.collectionDays - right.collectionDays)[0]

  return {
    orderAmount,
    currency: inputs.currency,
    settlementCurrency: inputs.settlementCurrency,
    exchangeRate,
    orderAmountSettlement: orderAmount * exchangeRate,
    channels: results,
    bestChannelId: cheapest.id,
    fastestChannelId: fastest.id,
    maxSavingSettlement: mostExpensive.totalCostSettlement - cheapest.totalCostSettlement,
    costRateSpread: mostExpensive.costRatePercent - cheapest.costRatePercent,
    fundingRatePercent,
    sellerPaysFee: inputs.sellerPaysFee,
  }
}
