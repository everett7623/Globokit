// 名称: 外贸收款账期成本计算逻辑
// 描述: 比较不同收款方式的资金占用、费用、风险准备金与实际利润
// 路径: Globokit/lib/tools/payment-terms-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-08-10

export type PaymentTermPresetId =
  | 'tt-prepaid'
  | 'tt-deposit-shipment'
  | 'tt-deposit-bl'
  | 'lc-sight'
  | 'lc-usance-90'
  | 'dp-30'
  | 'oa-60'

export interface PaymentTermPreset {
  id: PaymentTermPresetId
  name: string
  advancePercent: number
  daysAfterShipment: number
  feePercent: number
  fixedFee: number
  riskReservePercent: number
}

export interface PaymentTermOption extends Omit<PaymentTermPreset, 'id'> {
  id: string
  presetId: PaymentTermPresetId
}

export interface PaymentTermsInputs {
  orderAmount: number
  orderCost: number
  productionDays: number
  annualFundingRatePercent: number
  terms: PaymentTermOption[]
}

export interface PaymentTermResult extends PaymentTermOption {
  advanceAmount: number
  balanceAmount: number
  collectionDay: number
  weightedCollectionDays: number
  fundingGap: number
  fundingCost: number
  collectionFee: number
  riskReserve: number
  totalTermCost: number
  netProceeds: number
  effectiveProfit: number
  effectiveMarginPercent: number
  advanceCoveragePercent: number
  rank: number
}

export interface PaymentTermsResult {
  orderAmount: number
  orderCost: number
  baseGrossProfit: number
  baseGrossMarginPercent: number
  bestTermId: string
  costSavingAgainstWorst: number
  results: PaymentTermResult[]
}

export const PAYMENT_TERM_PRESETS: PaymentTermPreset[] = [
  { id: 'tt-prepaid', name: 'T/T 100% 预付', advancePercent: 100, daysAfterShipment: 0, feePercent: 0.15, fixedFee: 0, riskReservePercent: 0 },
  { id: 'tt-deposit-shipment', name: 'T/T 30/70 发货前', advancePercent: 30, daysAfterShipment: 0, feePercent: 0.2, fixedFee: 0, riskReservePercent: 0.3 },
  { id: 'tt-deposit-bl', name: 'T/T 30/70 提单副本', advancePercent: 30, daysAfterShipment: 3, feePercent: 0.2, fixedFee: 0, riskReservePercent: 0.5 },
  { id: 'lc-sight', name: 'L/C 即期', advancePercent: 0, daysAfterShipment: 7, feePercent: 1, fixedFee: 0, riskReservePercent: 0.3 },
  { id: 'lc-usance-90', name: 'L/C 远期 90 天', advancePercent: 0, daysAfterShipment: 90, feePercent: 1.5, fixedFee: 0, riskReservePercent: 0.7 },
  { id: 'dp-30', name: 'D/P 30 天', advancePercent: 0, daysAfterShipment: 30, feePercent: 0.5, fixedFee: 0, riskReservePercent: 1.5 },
  { id: 'oa-60', name: 'OA 60 天', advancePercent: 0, daysAfterShipment: 60, feePercent: 0.2, fixedFee: 0, riskReservePercent: 2.5 },
]

export const DEFAULT_PAYMENT_TERMS_INPUTS: PaymentTermsInputs = {
  orderAmount: 50000,
  orderCost: 34000,
  productionDays: 35,
  annualFundingRatePercent: 8,
  terms: [
    createPaymentTermOption('option-1', 'tt-deposit-bl'),
    createPaymentTermOption('option-2', 'lc-sight'),
    createPaymentTermOption('option-3', 'oa-60'),
  ],
}

export function createPaymentTermOption(id: string, presetId: PaymentTermPresetId): PaymentTermOption {
  const preset = PAYMENT_TERM_PRESETS.find((item) => item.id === presetId)
  if (!preset) throw new Error('未找到收款方案预设')
  return { ...preset, id, presetId }
}

function requireFinite(value: number, label: string, min: number, max: number) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  }
  return value
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function calculatePaymentTerms(inputs: PaymentTermsInputs): PaymentTermsResult {
  const orderAmount = requireFinite(inputs.orderAmount, '订单金额', 0.01, 1_000_000_000)
  const orderCost = requireFinite(inputs.orderCost, '订单总成本', 0, 1_000_000_000)
  const productionDays = requireFinite(inputs.productionDays, '生产周期', 0, 3650)
  const annualFundingRate = requireFinite(inputs.annualFundingRatePercent, '资金年化成本', 0, 100) / 100
  if (!Number.isInteger(productionDays)) throw new Error('生产周期必须是整数天')
  if (inputs.terms.length < 2 || inputs.terms.length > 3) throw new Error('请选择 2 到 3 个收款方案进行比较')

  const calculated = inputs.terms.map((term) => {
    if (!term.name.trim()) throw new Error('收款方案名称不能为空')
    const advancePercent = requireFinite(term.advancePercent, `${term.name} 的预付款比例`, 0, 100)
    const daysAfterShipment = requireFinite(term.daysAfterShipment, `${term.name} 的发货后账期`, 0, 3650)
    const feePercent = requireFinite(term.feePercent, `${term.name} 的收款费率`, 0, 100)
    const fixedFee = requireFinite(term.fixedFee, `${term.name} 的固定费用`, 0, orderAmount)
    const riskReservePercent = requireFinite(term.riskReservePercent, `${term.name} 的风险准备金`, 0, 100)
    if (!Number.isInteger(daysAfterShipment)) throw new Error(`${term.name} 的发货后账期必须是整数天`)

    const advanceAmount = orderAmount * advancePercent / 100
    const balanceAmount = orderAmount - advanceAmount
    const collectionDay = balanceAmount > 0 ? productionDays + daysAfterShipment : 0
    const fundingGap = Math.max(orderCost - advanceAmount, 0)
    const fundingCost = fundingGap * annualFundingRate * collectionDay / 365
    const collectionFee = orderAmount * feePercent / 100 + fixedFee
    const riskReserve = balanceAmount * riskReservePercent / 100
    const totalTermCost = fundingCost + collectionFee + riskReserve
    const effectiveProfit = orderAmount - orderCost - totalTermCost

    return {
      ...term,
      advanceAmount: roundMoney(advanceAmount),
      balanceAmount: roundMoney(balanceAmount),
      collectionDay,
      weightedCollectionDays: orderAmount > 0 ? balanceAmount / orderAmount * collectionDay : 0,
      fundingGap: roundMoney(fundingGap),
      fundingCost: roundMoney(fundingCost),
      collectionFee: roundMoney(collectionFee),
      riskReserve: roundMoney(riskReserve),
      totalTermCost: roundMoney(totalTermCost),
      netProceeds: roundMoney(orderAmount - totalTermCost),
      effectiveProfit: roundMoney(effectiveProfit),
      effectiveMarginPercent: effectiveProfit / orderAmount * 100,
      advanceCoveragePercent: orderCost > 0 ? advanceAmount / orderCost * 100 : 100,
      rank: 0,
    }
  })

  const ranking = [...calculated].sort((a, b) => b.effectiveProfit - a.effectiveProfit)
  const ranks = new Map(ranking.map((term, index) => [term.id, index + 1]))
  const results = calculated.map((term) => ({ ...term, rank: ranks.get(term.id) ?? calculated.length }))
  const baseGrossProfit = orderAmount - orderCost

  return {
    orderAmount: roundMoney(orderAmount),
    orderCost: roundMoney(orderCost),
    baseGrossProfit: roundMoney(baseGrossProfit),
    baseGrossMarginPercent: baseGrossProfit / orderAmount * 100,
    bestTermId: ranking[0].id,
    costSavingAgainstWorst: roundMoney(ranking[ranking.length - 1].totalTermCost - ranking[0].totalTermCost),
    results,
  }
}
