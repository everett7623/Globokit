const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_PACKAGING_COMPARISON_INPUTS,
  comparePackagingPlans,
} = loadTypescriptModule('lib/tools/packaging-plan-comparison.ts')

let assertionCount = 0
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const deepEqual = (actual, expected, message) => {
  assertionCount += 1
  assert.deepEqual(actual, expected, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

const airResult = comparePackagingPlans(DEFAULT_PACKAGING_COMPARISON_INPUTS)
deepEqual(airResult.plans.map(({ cartonCount }) => cartonCount), [50, 25, 20], '默认方案箱数应保持稳定')
deepEqual(airResult.plans.map(({ totalCbm }) => totalCbm), [1.5, 1.75, 1.98], '默认方案总体积应保持稳定')
deepEqual(airResult.plans.map(({ chargeableWeightKg }) => chargeableWeightKg), [600, 550, 560], '默认方案计费重应正确')
deepEqual(airResult.plans.map(({ totalLogisticsCostCny }) => totalLogisticsCostCny), [19600, 17900, 18220], '空运总成本应包含包装与运费')
equal(airResult.bestCostPlanId, 'plan-b', '空运默认总成本应由标准中箱最低')
equal(airResult.lowestVolumePlanId, 'plan-a', '紧凑小箱应使用最少 CBM')
equal(airResult.lowestChargeableWeightPlanId, 'plan-b', '标准中箱应具有最低计费重')
equal(airResult.plans[1].costPerUnitCny, 17.9, '单件物流成本应正确计算')

const oceanResult = comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, shippingMode: 'ocean' })
deepEqual(oceanResult.plans.map(({ freightCostCny }) => freightCostCny), [1020, 1190, 1346.4], '海运费用应按总 CBM 计算')
equal(oceanResult.bestCostPlanId, 'plan-a', '海运默认总成本应由紧凑小箱最低')
equal(oceanResult.plans[0].totalLogisticsCostCny, 1420, '海运总成本应包含包装成本')

const oceanHiddenFieldResult = comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, shippingMode: 'ocean', volumetricDivisor: 0, airRateCnyPerKg: -1 })
equal(oceanHiddenFieldResult.volumetricDivisor, 6000, '海运模式不应被隐藏的空运泡重参数阻塞')
const airHiddenFieldResult = comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, oceanRateCnyPerCbm: -1 })
equal(airHiddenFieldResult.bestCostPlanId, 'plan-b', '空运模式不应被隐藏的海运单价阻塞')

const partialResult = comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, totalUnits: 1001 })
equal(partialResult.plans[0].cartonCount, 51, '非整箱件数应向上取整')
equal(partialResult.plans[0].unusedCapacityUnits, 19, '尾箱空余容量应正确计算')

const lowDensityPlans = DEFAULT_PACKAGING_COMPARISON_INPUTS.plans.map((plan, index) => index === 0 ? { ...plan, grossWeightKg: 4 } : plan)
const lowDensityResult = comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, plans: lowDensityPlans })
equal(lowDensityResult.plans[0].billingBasis, 'volumetric', '低密度纸箱应按体积重计费')
equal(lowDensityResult.plans[0].chargeableWeightKg, 250, '低密度纸箱体积重应正确')

throws(() => comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, totalUnits: 0 }), /产品总件数必须在/, '零产品件数应被拒绝')
throws(() => comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, volumetricDivisor: 0 }), /体积重系数必须在/, '零体积重系数应被拒绝')
throws(() => comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, plans: [DEFAULT_PACKAGING_COMPARISON_INPUTS.plans[0]] }), /包装方案必须为/, '少于两个方案应被拒绝')
throws(() => comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, plans: DEFAULT_PACKAGING_COMPARISON_INPUTS.plans.map((plan) => ({ ...plan, id: 'duplicate' })) }), /包装方案 ID 不能重复/, '重复方案 ID 应被拒绝')
throws(() => comparePackagingPlans({ ...DEFAULT_PACKAGING_COMPARISON_INPUTS, plans: DEFAULT_PACKAGING_COMPARISON_INPUTS.plans.map((plan, index) => index === 0 ? { ...plan, lengthCm: 0 } : plan) }), /长度必须在/, '零纸箱尺寸应被拒绝')

console.log(`纸箱包装方案对比：${assertionCount} 条定向断言通过`)
