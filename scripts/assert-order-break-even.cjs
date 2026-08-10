const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_ORDER_BREAK_EVEN_INPUTS,
  calculateOrderBreakEven,
} = loadTypescriptModule('lib/tools/order-break-even-calculator.ts')

let assertionCount = 0
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

const result = calculateOrderBreakEven(DEFAULT_ORDER_BREAK_EVEN_INPUTS)
equal(result.totalVariableFeePercent, 5.5, '成交费率应正确汇总')
equal(result.variableFeePerUnit, 0.66, '单件成交费用应正确')
equal(result.netRevenuePerUnit, 11.34, '单件净收入应正确')
equal(result.contributionPerUnit, 4.34, '单件贡献毛利应正确')
equal(result.breakEvenQuantity, 185, '保本销量应向上取整')
equal(result.targetProfitQuantity, 415, '目标利润销量应向上取整')
equal(result.plannedProfit, 1370, '计划订单利润应正确')
equal(result.marginOfSafetyUnits, 315, '安全余量件数应正确')
equal(result.marginOfSafetyPercent, 63, '安全余量比例应正确')
equal(result.status, 'target-achieved', '默认计划应达到目标利润')
check(result.breakEvenUnitPriceAtPlan > 9.1 && result.breakEvenUnitPriceAtPlan < 9.11, '计划销量下保本单价应正确')
check(result.targetUnitPriceAtPlan > 11.21 && result.targetUnitPriceAtPlan < 11.22, '计划销量下目标单价应正确')

const profitable = calculateOrderBreakEven({ ...DEFAULT_ORDER_BREAK_EVEN_INPUTS, plannedQuantity: 300 })
equal(profitable.status, 'profitable', '超过保本但未达目标时应标记为盈利')
const loss = calculateOrderBreakEven({ ...DEFAULT_ORDER_BREAK_EVEN_INPUTS, plannedQuantity: 100 })
equal(loss.status, 'below-break-even', '未达保本销量时应标记为未保本')
const noFixedCost = calculateOrderBreakEven({ ...DEFAULT_ORDER_BREAK_EVEN_INPUTS, fixedOrderCost: 0 })
equal(noFixedCost.breakEvenQuantity, 0, '无固定成本时保本销量应为零')

throws(() => calculateOrderBreakEven({ ...DEFAULT_ORDER_BREAK_EVEN_INPUTS, unitSellingPrice: 0 }), /销售单价必须在/, '零售价应被拒绝')
throws(() => calculateOrderBreakEven({ ...DEFAULT_ORDER_BREAK_EVEN_INPUTS, plannedQuantity: 1.5 }), /必须是整数/, '非整数计划销量应被拒绝')
throws(() => calculateOrderBreakEven({ ...DEFAULT_ORDER_BREAK_EVEN_INPUTS, commissionPercent: 60, paymentFeePercent: 30, lossAllowancePercent: 10 }), /合计必须小于 100%/, '合计费率达到 100% 应被拒绝')
throws(() => calculateOrderBreakEven({ ...DEFAULT_ORDER_BREAK_EVEN_INPUTS, unitVariableCost: 12 }), /单件净收入必须高于/, '无贡献毛利订单应被拒绝')

console.log(`外贸订单保本销量计算：${assertionCount} 条定向断言通过`)
