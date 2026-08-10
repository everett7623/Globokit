// 名称: 外贸订单保本销量计算逻辑
// 描述: 按售价、变动成本、固定成本和成交费率测算保本与目标利润销量
// 路径: Globokit/lib/tools/order-break-even-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

export type BreakEvenCurrency = 'USD' | 'EUR' | 'GBP' | 'CNY'
export type BreakEvenStatus = 'below-break-even' | 'profitable' | 'target-achieved'

export interface OrderBreakEvenInputs {
  currency: BreakEvenCurrency
  unitSellingPrice: number
  unitVariableCost: number
  fixedOrderCost: number
  commissionPercent: number
  paymentFeePercent: number
  lossAllowancePercent: number
  plannedQuantity: number
  targetProfit: number
}

export interface OrderBreakEvenResult extends OrderBreakEvenInputs {
  totalVariableFeePercent: number
  variableFeePerUnit: number
  netRevenuePerUnit: number
  contributionPerUnit: number
  contributionMarginPercent: number
  breakEvenQuantity: number
  targetProfitQuantity: number
  breakEvenSalesAmount: number
  targetSalesAmount: number
  plannedRevenue: number
  plannedVariableFees: number
  plannedVariableCost: number
  plannedContribution: number
  plannedProfit: number
  plannedMarginPercent: number
  marginOfSafetyUnits: number
  marginOfSafetyPercent: number
  quantityGapToTarget: number
  breakEvenUnitPriceAtPlan: number
  targetUnitPriceAtPlan: number
  status: BreakEvenStatus
}

export const BREAK_EVEN_CURRENCY_OPTIONS: Array<{ value: BreakEvenCurrency; label: string }> = [
  { value: 'USD', label: 'USD 美元' },
  { value: 'EUR', label: 'EUR 欧元' },
  { value: 'GBP', label: 'GBP 英镑' },
  { value: 'CNY', label: 'CNY 人民币' },
]

export const DEFAULT_ORDER_BREAK_EVEN_INPUTS: OrderBreakEvenInputs = {
  currency: 'USD',
  unitSellingPrice: 12,
  unitVariableCost: 7,
  fixedOrderCost: 800,
  commissionPercent: 3,
  paymentFeePercent: 1.5,
  lossAllowancePercent: 1,
  plannedQuantity: 500,
  targetProfit: 1000,
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

export function calculateOrderBreakEven(inputs: OrderBreakEvenInputs): OrderBreakEvenResult {
  if (!BREAK_EVEN_CURRENCY_OPTIONS.some((option) => option.value === inputs.currency)) throw new Error('请选择有效的报价币种')
  const unitSellingPrice = requireFinite(inputs.unitSellingPrice, '销售单价', 0.000001, 1_000_000_000)
  const unitVariableCost = requireFinite(inputs.unitVariableCost, '单件变动成本', 0, 1_000_000_000)
  const fixedOrderCost = requireFinite(inputs.fixedOrderCost, '订单固定成本', 0, 1_000_000_000_000)
  const commissionPercent = requireFinite(inputs.commissionPercent, '佣金率', 0, 99.99)
  const paymentFeePercent = requireFinite(inputs.paymentFeePercent, '收款费率', 0, 99.99)
  const lossAllowancePercent = requireFinite(inputs.lossAllowancePercent, '售后损耗预留率', 0, 99.99)
  const plannedQuantity = requireInteger(inputs.plannedQuantity, '计划销量', 1, 1_000_000_000)
  const targetProfit = requireFinite(inputs.targetProfit, '目标利润', 0, 1_000_000_000_000)
  const totalVariableFeePercent = commissionPercent + paymentFeePercent + lossAllowancePercent
  if (totalVariableFeePercent >= 100) throw new Error('佣金率、收款费率和售后损耗预留率合计必须小于 100%')

  const retainedRevenueRate = 1 - totalVariableFeePercent / 100
  const variableFeePerUnit = unitSellingPrice * totalVariableFeePercent / 100
  const netRevenuePerUnit = unitSellingPrice - variableFeePerUnit
  const contributionPerUnit = netRevenuePerUnit - unitVariableCost
  if (contributionPerUnit <= 0) throw new Error('扣除成交费率后的单件净收入必须高于单件变动成本')

  const breakEvenQuantity = Math.ceil(fixedOrderCost / contributionPerUnit)
  const targetProfitQuantity = Math.ceil((fixedOrderCost + targetProfit) / contributionPerUnit)
  const plannedRevenue = unitSellingPrice * plannedQuantity
  const plannedVariableFees = variableFeePerUnit * plannedQuantity
  const plannedVariableCost = unitVariableCost * plannedQuantity
  const plannedContribution = contributionPerUnit * plannedQuantity
  const plannedProfit = plannedContribution - fixedOrderCost
  const marginOfSafetyUnits = plannedQuantity - breakEvenQuantity
  const quantityGapToTarget = Math.max(0, targetProfitQuantity - plannedQuantity)
  const status: BreakEvenStatus = plannedProfit >= targetProfit
    ? 'target-achieved'
    : plannedQuantity >= breakEvenQuantity
      ? 'profitable'
      : 'below-break-even'

  return {
    currency: inputs.currency,
    unitSellingPrice: round(unitSellingPrice, 6),
    unitVariableCost: round(unitVariableCost, 6),
    fixedOrderCost: round(fixedOrderCost),
    commissionPercent,
    paymentFeePercent,
    lossAllowancePercent,
    plannedQuantity,
    targetProfit: round(targetProfit),
    totalVariableFeePercent: round(totalVariableFeePercent, 6),
    variableFeePerUnit: round(variableFeePerUnit, 6),
    netRevenuePerUnit: round(netRevenuePerUnit, 6),
    contributionPerUnit: round(contributionPerUnit, 6),
    contributionMarginPercent: round(contributionPerUnit / unitSellingPrice * 100, 6),
    breakEvenQuantity,
    targetProfitQuantity,
    breakEvenSalesAmount: round(breakEvenQuantity * unitSellingPrice),
    targetSalesAmount: round(targetProfitQuantity * unitSellingPrice),
    plannedRevenue: round(plannedRevenue),
    plannedVariableFees: round(plannedVariableFees),
    plannedVariableCost: round(plannedVariableCost),
    plannedContribution: round(plannedContribution),
    plannedProfit: round(plannedProfit),
    plannedMarginPercent: round(plannedProfit / plannedRevenue * 100, 6),
    marginOfSafetyUnits,
    marginOfSafetyPercent: round(marginOfSafetyUnits / plannedQuantity * 100, 6),
    quantityGapToTarget,
    breakEvenUnitPriceAtPlan: round((unitVariableCost + fixedOrderCost / plannedQuantity) / retainedRevenueRate, 6),
    targetUnitPriceAtPlan: round((unitVariableCost + (fixedOrderCost + targetProfit) / plannedQuantity) / retainedRevenueRate, 6),
    status,
  }
}
