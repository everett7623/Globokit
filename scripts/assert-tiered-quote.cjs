const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_TIERED_QUOTE_INPUTS,
  calculateTieredQuote,
} = loadTypescriptModule('lib/tools/tiered-quote-calculator.ts')

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

const defaultResult = calculateTieredQuote(DEFAULT_TIERED_QUOTE_INPUTS)
deepEqual(defaultResult.tiers.map(({ quantity }) => quantity), [100, 500, 1000, 5000], '默认数量档位应保持稳定')
deepEqual(defaultResult.tiers.map(({ quotedUnitPriceForeign }) => quotedUnitPriceForeign), [11.45, 9.6, 9.05, 8.35], '默认报价应向上取整到 0.05 USD')
equal(defaultResult.baseTierId, 'tier-100', '最小数量档位应作为比较基准')
equal(defaultResult.largestTierId, 'tier-5000', '最大数量档位应正确识别')
equal(defaultResult.lowestUnitPriceTierId, 'tier-5000', '大货价应具有最低外币单价')
equal(defaultResult.tiers[0].fixedCostPerUnitCny, 8, '试单固定费用摊销应正确')
equal(defaultResult.tiers[3].fixedCostPerUnitCny, 0.16, '大货固定费用摊销应正确')
equal(defaultResult.fixedCostDilutionCnyPerUnit, 7.84, '最大档位应显著摊薄固定费用')
check(defaultResult.tiers.every((tier) => tier.marginPercent >= 25), '向上取整后的利润率不应低于目标利润率')
check(defaultResult.maximumPriceReductionPercent > 27 && defaultResult.maximumPriceReductionPercent < 28, '最大阶梯降价幅度应保持稳定')

const noRoundingResult = calculateTieredQuote({ ...DEFAULT_TIERED_QUOTE_INPUTS, roundingIncrementForeign: 0 })
equal(noRoundingResult.tiers[0].quotedUnitPriceForeign, noRoundingResult.tiers[0].rawUnitPriceForeign, '零取整步长应保留原始建议价')

const cnyResult = calculateTieredQuote({ ...DEFAULT_TIERED_QUOTE_INPUTS, currency: 'CNY', exchangeRate: 1 })
equal(cnyResult.currency, 'CNY', '人民币报价应被支持')
check(cnyResult.tiers[0].quotedUnitPriceForeign > defaultResult.tiers[0].quotedUnitPriceForeign, '人民币单价应高于同成本美元单价')

throws(() => calculateTieredQuote({ ...DEFAULT_TIERED_QUOTE_INPUTS, exchangeRate: 0 }), /结算汇率必须在/, '零汇率应被拒绝')
throws(() => calculateTieredQuote({ ...DEFAULT_TIERED_QUOTE_INPUTS, targetMarginPercent: 96 }), /合计必须小于 100%/, '利润与费用合计达到 100% 应被拒绝')
throws(() => calculateTieredQuote({ ...DEFAULT_TIERED_QUOTE_INPUTS, tiers: [DEFAULT_TIERED_QUOTE_INPUTS.tiers[0]] }), /数量档位必须为/, '少于两个档位应被拒绝')
throws(() => calculateTieredQuote({ ...DEFAULT_TIERED_QUOTE_INPUTS, tiers: DEFAULT_TIERED_QUOTE_INPUTS.tiers.map((tier) => ({ ...tier, quantity: 100 })) }), /数量档位不能重复/, '重复数量档位应被拒绝')
throws(() => calculateTieredQuote({ ...DEFAULT_TIERED_QUOTE_INPUTS, tiers: DEFAULT_TIERED_QUOTE_INPUTS.tiers.map((tier, index) => index === 0 ? { ...tier, unitCostCny: 0 } : tier) }), /采购单价必须在/, '零采购单价应被拒绝')

console.log(`外贸阶梯报价计算：${assertionCount} 条定向断言通过`)
