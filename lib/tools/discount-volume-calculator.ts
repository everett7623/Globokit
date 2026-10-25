// 名称: 降价保利销量测算
// 描述: 固定成本与单位变动成本不变时，反推维持原订单利润的销量
// 路径: Globokit/lib/tools/discount-volume-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-10-25

export interface DiscountVolumeInput {
  price: number
  unitCost: number
  quantity: number
  discountPercent: number
  feePercent: number
  fixedCost: number
}

export function calculateDiscountVolume(input: DiscountVolumeInput) {
  const { price, unitCost, quantity, discountPercent, feePercent, fixedCost } = input
  if (!Object.values(input).every(Number.isFinite)) throw new Error('请完整填写所有参数，数值必须有限')
  if (price <= 0 || unitCost < 0 || fixedCost < 0) throw new Error('原单价须大于 0，成本不能为负数')
  if (!Number.isSafeInteger(quantity) || quantity < 1) throw new Error('原订单数量须为正整数')
  if (discountPercent < 0 || discountPercent >= 100 || feePercent < 0 || feePercent >= 100) throw new Error('降价幅度与成交费率须在 0%（含）至 100%（不含）之间')
  const contribution = price * (1 - feePercent / 100) - unitCost
  if (contribution <= 0) throw new Error('原单价扣除费用后已无法覆盖单位成本，请先调整原报价')
  const discountedPrice = price * (1 - discountPercent / 100)
  const discountedContribution = discountedPrice * (1 - feePercent / 100) - unitCost
  const originalProfit = contribution * quantity - fixedCost
  const sameQuantityProfit = discountedContribution * quantity - fixedCost
  const requiredQuantity = discountedContribution > 0 ? Math.ceil(contribution * quantity / discountedContribution) : null
  if (![discountedPrice, originalProfit, sameQuantityProfit].every(Number.isFinite) || (requiredQuantity !== null && !Number.isSafeInteger(requiredQuantity))) throw new Error('计算结果过大，请缩小金额或数量')
  return { discountedPrice, contribution, discountedContribution, originalProfit, sameQuantityProfit, requiredQuantity,
    extraQuantity: requiredQuantity === null ? null : requiredQuantity - quantity,
    growthPercent: requiredQuantity === null ? null : (requiredQuantity / quantity - 1) * 100,
    profitLoss: originalProfit - sameQuantityProfit }
}
