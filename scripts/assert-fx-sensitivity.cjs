const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_FX_SENSITIVITY_INPUTS,
  calculateFxSensitivity,
} = loadTypescriptModule('lib/tools/fx-sensitivity-calculator.ts')

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

const defaultResult = calculateFxSensitivity(DEFAULT_FX_SENSITIVITY_INPUTS)
deepEqual(defaultResult.results.map(({ rate }) => rate), [6.84, 7.2, 7.56], '默认情景汇率应为基准汇率上下浮动 5%')
deepEqual(defaultResult.results.map(({ profitCny }) => profitCny), [13194.8, 16784, 20373.2], '默认情景利润应保持稳定')
equal(defaultResult.breakEvenRate, 5.51655, '默认盈亏平衡汇率应保持稳定')
equal(defaultResult.bestScenarioId, 'rmb-depreciation', '人民币贬值情景应产生最高 CNY 利润')
equal(defaultResult.worstScenarioId, 'rmb-appreciation', '人民币升值情景应产生最低 CNY 利润')
equal(defaultResult.profitRangeCny, 7178.4, '默认升贬值情景利润差应保持稳定')
equal(defaultResult.results[0].profitDeltaCny, -3589.2, '升值情景应正确计算相对基准利润变化')
equal(defaultResult.results[2].profitDeltaCny, 3589.2, '贬值情景应正确计算相对基准利润变化')

const feeResult = calculateFxSensitivity({ ...DEFAULT_FX_SENSITIVITY_INPUTS, settlementFeePercent: 10 })
equal(feeResult.results[1].settlementFeeCny, 7200, '手续费应按折算后的 CNY 收入计提')
equal(feeResult.results[1].profitCny, 9800, '高费率情景应扣除相应手续费')
equal(feeResult.breakEvenRate, 6.111111, '盈亏平衡汇率应包含手续费影响')

const jpyResult = calculateFxSensitivity({
  ...DEFAULT_FX_SENSITIVITY_INPUTS,
  currency: 'JPY',
  foreignAmount: 1_000_000,
  costCny: 0,
  otherCostCny: 0,
  settlementFeePercent: 0,
  baseRate: 4.8,
  rmbAppreciationPercent: 0,
  rmbDepreciationPercent: 0,
})
equal(jpyResult.rateUnit, 100, 'JPY 汇率应按每 100 日元计价')
equal(jpyResult.results[1].revenueCny, 48000, 'JPY 收入不应出现 100 倍折算误差')

const lossResult = calculateFxSensitivity({ ...DEFAULT_FX_SENSITIVITY_INPUTS, costCny: 80000 })
check(lossResult.results.every(({ profitCny }) => profitCny < 0), '成本过高时三个汇率情景都应显示亏损')

throws(() => calculateFxSensitivity({ ...DEFAULT_FX_SENSITIVITY_INPUTS, foreignAmount: 0 }), /外币订单金额必须在/, '零订单金额应被拒绝')
throws(() => calculateFxSensitivity({ ...DEFAULT_FX_SENSITIVITY_INPUTS, baseRate: 0 }), /基准汇率必须在/, '零汇率应被拒绝')
throws(() => calculateFxSensitivity({ ...DEFAULT_FX_SENSITIVITY_INPUTS, settlementFeePercent: 100 }), /收款手续费率必须在/, '100% 手续费率应被拒绝')
throws(() => calculateFxSensitivity({ ...DEFAULT_FX_SENSITIVITY_INPUTS, rmbAppreciationPercent: 100 }), /人民币升值情景必须在/, '100% 人民币升值幅度应被拒绝')

console.log(`外贸汇率敏感性分析：${assertionCount} 条定向断言通过`)
