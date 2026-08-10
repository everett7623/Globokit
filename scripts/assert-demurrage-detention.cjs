const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_DEMURRAGE_DETENTION_INPUTS,
  calculateDemurrageDetention,
} = loadTypescriptModule('lib/tools/demurrage-detention-calculator.ts')

let assertionCount = 0
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const deepEqual = (actual, expected, message) => {
  assertionCount += 1
  assert.deepEqual(actual, expected, message)
}
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

const defaultResult = calculateDemurrageDetention(DEFAULT_DEMURRAGE_DETENTION_INPUTS)
equal(defaultResult.demurrage.chargeableDays, 7, '滞港超期天数应扣除免费期')
equal(defaultResult.detention.chargeableDays, 9, '滞箱超期天数应扣除免费期')
deepEqual(defaultResult.demurrage.tiers.map(({ days }) => days), [5, 2, 0], '滞港费应按阶梯拆分')
deepEqual(defaultResult.detention.tiers.map(({ days }) => days), [5, 4, 0], '滞箱费应按阶梯拆分')
equal(defaultResult.demurrage.feeTotal, 2700, '默认滞港费应按柜量计算')
equal(defaultResult.detention.feeTotal, 3120, '默认滞箱费应按柜量计算')
equal(defaultResult.totalFee, 5820, '默认总费用应正确汇总')
equal(defaultResult.feePerContainer, 2910, '默认单柜费用应正确计算')
equal(defaultResult.highestCostType, 'detention', '默认滞箱费应为更高费用')

const finalTierResult = calculateDemurrageDetention({
  ...DEFAULT_DEMURRAGE_DETENTION_INPUTS,
  containerCount: 1,
  demurrageDays: 17,
  detentionDays: 0,
})
deepEqual(finalTierResult.demurrage.tiers.map(({ days }) => days), [5, 5, 2], '超出两段阶梯后应计入后续费率')
equal(finalTierResult.demurrage.feeTotal, 3250, '后续阶梯费用应正确计算')
equal(finalTierResult.detention.feeTotal, 0, '未超滞箱免费期时费用应为零')

const freeTimeResult = calculateDemurrageDetention({
  ...DEFAULT_DEMURRAGE_DETENTION_INPUTS,
  demurrageDays: 3,
  detentionDays: 7,
})
equal(freeTimeResult.demurrage.freeDaysRemaining, 2, '免费期内应显示剩余滞港天数')
equal(freeTimeResult.detention.freeDaysRemaining, 0, '正好用完免费期时不应剩余天数')
equal(freeTimeResult.totalFee, 0, '免费期内总费用应为零')
equal(freeTimeResult.highestCostType, null, '费用为零时不应标记较高费用环节')

throws(() => calculateDemurrageDetention({ ...DEFAULT_DEMURRAGE_DETENTION_INPUTS, containerCount: 0 }), /集装箱数量必须在/, '零柜量应被拒绝')
throws(() => calculateDemurrageDetention({ ...DEFAULT_DEMURRAGE_DETENTION_INPUTS, demurrageDays: 1.5 }), /滞港占用天数必须是整数/, '占用天数应为整数')
throws(() => calculateDemurrageDetention({ ...DEFAULT_DEMURRAGE_DETENTION_INPUTS, detention: { ...DEFAULT_DEMURRAGE_DETENTION_INPUTS.detention, secondTierRate: -1 } }), /滞箱费第二阶梯日费率必须在/, '负费率应被拒绝')

console.log(`集装箱滞箱滞港费计算：${assertionCount} 条定向断言通过`)
