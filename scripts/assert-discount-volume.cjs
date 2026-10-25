const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')
const { calculateDiscountVolume } = loadTypescriptModule('lib/tools/discount-volume-calculator.ts')
const input = { price: 100, unitCost: 70, quantity: 1000, discountPercent: 5, feePercent: 2, fixedCost: 5000 }
const result = calculateDiscountVolume(input)
assert.equal(result.originalProfit, 23000)
assert.equal(result.requiredQuantity, 1213)
assert.equal(result.extraQuantity, 213)
assert.ok(result.discountedContribution * result.requiredQuantity - input.fixedCost >= result.originalProfit)
assert.ok(result.discountedContribution * (result.requiredQuantity - 1) - input.fixedCost < result.originalProfit)
assert.equal(calculateDiscountVolume({ ...input, discountPercent: 0 }).requiredQuantity, 1000)
assert.equal(calculateDiscountVolume({ ...input, discountPercent: 40 }).requiredQuantity, null)
assert.ok(calculateDiscountVolume({ ...input, fixedCost: 50000 }).originalProfit < 0)
for (const change of [{ price: 0 }, { quantity: 0 }, { quantity: 1.5 }, { feePercent: 100 }, { discountPercent: 100 }, { unitCost: -1 }, { fixedCost: -1 }, { price: NaN }, { unitCost: Infinity }, { unitCost: 100 }]) {
  assert.throws(() => calculateDiscountVolume({ ...input, ...change }))
}
console.log('降价保利销量：利润保全、向上取整、亏损边界及非法输入验证通过')
