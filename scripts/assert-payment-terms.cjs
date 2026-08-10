const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_PAYMENT_TERMS_INPUTS,
  calculatePaymentTerms,
  createPaymentTermOption,
} = loadTypescriptModule('lib/tools/payment-terms-calculator.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

const defaultResult = calculatePaymentTerms(DEFAULT_PAYMENT_TERMS_INPUTS)
equal(defaultResult.bestTermId, 'option-1', '默认方案应以 T/T 30/70 提单副本为首选')
assertionCount += 1
assert.deepEqual(defaultResult.results.map(({ rank }) => rank), [1, 2, 3], '默认方案排名应按实际利润递减')
equal(defaultResult.results[0].effectiveProfit, 15566.75, '默认首选方案实际利润应保持稳定')
equal(defaultResult.costSavingAgainstWorst, 1624.7, '默认首尾方案成本差应保持稳定')

const prepaid = createPaymentTermOption('prepaid', 'tt-prepaid')
const prepaidResult = calculatePaymentTerms({
  ...DEFAULT_PAYMENT_TERMS_INPUTS,
  terms: [prepaid, createPaymentTermOption('oa', 'oa-60')],
}).results.find(({ id }) => id === 'prepaid')
equal(prepaidResult.collectionDay, 0, '100% 预付不应产生尾款回款周期')
equal(prepaidResult.fundingGap, 0, '100% 预付覆盖成本后不应产生资金缺口')
equal(prepaidResult.fundingCost, 0, '100% 预付不应产生资金占用成本')
equal(prepaidResult.riskReserve, 0, '100% 预付不应对尾款计提风险准备金')

const longOa = { ...createPaymentTermOption('long-oa', 'oa-60'), daysAfterShipment: 3650 }
const longOaResult = calculatePaymentTerms({
  ...DEFAULT_PAYMENT_TERMS_INPUTS,
  terms: [createPaymentTermOption('prepaid', 'tt-prepaid'), longOa],
}).results.find(({ id }) => id === 'long-oa')
equal(longOaResult.collectionDay, 3685, '长账期应叠加生产周期和发货后账期')
check(longOaResult.fundingCost > DEFAULT_PAYMENT_TERMS_INPUTS.orderCost * 0.8, '十年 OA 应体现显著资金成本')
equal(longOaResult.rank, 2, '长账期 OA 应排在 100% 预付之后')

const invalidAdvance = {
  ...DEFAULT_PAYMENT_TERMS_INPUTS,
  terms: [
    { ...createPaymentTermOption('invalid', 'oa-60'), advancePercent: 101 },
    createPaymentTermOption('valid', 'tt-prepaid'),
  ],
}
throws(() => calculatePaymentTerms(invalidAdvance), /预付款比例必须在 0 到 100 之间/, '预付款比例超过 100% 应被拒绝')

const twoTerms = DEFAULT_PAYMENT_TERMS_INPUTS.terms.slice(0, 2)
equal(calculatePaymentTerms({ ...DEFAULT_PAYMENT_TERMS_INPUTS, terms: twoTerms }).results.length, 2, '应接受两个对比方案')
equal(calculatePaymentTerms(DEFAULT_PAYMENT_TERMS_INPUTS).results.length, 3, '应接受三个对比方案')
throws(
  () => calculatePaymentTerms({ ...DEFAULT_PAYMENT_TERMS_INPUTS, terms: twoTerms.slice(0, 1) }),
  /请选择 2 到 3 个收款方案/,
  '少于两个方案应被拒绝',
)
throws(
  () => calculatePaymentTerms({
    ...DEFAULT_PAYMENT_TERMS_INPUTS,
    terms: [...DEFAULT_PAYMENT_TERMS_INPUTS.terms, createPaymentTermOption('option-4', 'dp-30')],
  }),
  /请选择 2 到 3 个收款方案/,
  '超过三个方案应被拒绝',
)

console.log(`付款账期成本对比：${assertionCount} 条定向断言通过`)
