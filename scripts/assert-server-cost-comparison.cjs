const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_SERVER_COST_INPUTS,
  buildServerCostNote,
  calculatePlanCost,
  calculateServerCosts,
} = loadTypescriptModule('lib/tools/server-cost-comparison.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const ok = (value, message) => { assertionCount += 1; assert.ok(value, message) }
const RATE = DEFAULT_SERVER_COST_INPUTS.exchangeRate
const HOLDING = DEFAULT_SERVER_COST_INPUTS.holdingMonths
const planById = (id) => DEFAULT_SERVER_COST_INPUTS.plans.find((plan) => plan.id === id)

// 由方案定义推导期望金额的工具函数，避免手写数字漂移
const cycleCost = (plan, withPromo) => {
  const base = withPromo ? Math.max(plan.promoPrice - plan.firstCycleDiscount, 0) : plan.renewalPrice
  return base + plan.monthlyAddon * plan.cycleMonths
}
const renewalPerCycle = (plan) => plan.renewalPrice + plan.monthlyAddon * plan.cycleMonths
const renewalMonthlySettlement = (plan) => (renewalPerCycle(plan) / plan.cycleMonths) * RATE
const holdingPlanned = (plan) => {
  const firstMonthCount = Math.min(plan.cycleMonths, HOLDING)
  const first = (cycleCost(plan, true) + plan.setupFee + 0) * RATE
  const remaining = Math.max(HOLDING - plan.cycleMonths, 0)
  const fullCycles = Math.floor(remaining / plan.cycleMonths)
  const leftover = remaining - fullCycles * plan.cycleMonths
  return first + fullCycles * renewalPerCycle(plan) * RATE + leftover * renewalMonthlySettlement(plan)
}

// 方案级计算：方案 A（年付、续费价高于套餐价）
const planA = planById('plan-a')
const costA = calculatePlanCost(planA, DEFAULT_SERVER_COST_INPUTS)
const expectedFirstA = (cycleCost(planA, true) + planA.setupFee) * RATE
equal(Number(costA.firstCyclePaymentSettlement.toFixed(6)), Number(expectedFirstA.toFixed(6)), '方案 A 首期实付等于套餐价加附加费再折算')
equal(
  Number(costA.firstCycleMonthlySettlement.toFixed(6)),
  Number((expectedFirstA / planA.cycleMonths).toFixed(6)),
  '方案 A 首期月均等于首期实付除以计费月数'
)
equal(
  Number(costA.renewalMonthlySettlement.toFixed(6)),
  Number(renewalMonthlySettlement(planA).toFixed(6)),
  '方案 A 续费月均按续费价加附加费折算'
)
ok(costA.discountMonthlyGapSettlement > 0, '套餐价低于续费价时应体现月均差额')
ok(costA.notes.some((note) => note.includes('续费价')), '方案 A 应提示续费价风险')
ok(costA.notes.some((note) => note.includes('备份')), '方案 A 未含备份应给出提示')
equal(costA.notes.some((note) => note.includes('控制面板授权')), false, '方案 A 含面板不应提示面板风险')

// 月付方案不应被判为幻价
const planB = planById('plan-b')
const costB = calculatePlanCost(planB, DEFAULT_SERVER_COST_INPUTS)
equal(Number(costB.firstCyclePaymentSettlement.toFixed(6)), Number((planB.promoPrice * RATE).toFixed(6)), '月付方案首期等于月费折算')
equal(Number(costB.firstCycleMonthlySettlement.toFixed(6)), Number(costB.renewalMonthlySettlement.toFixed(6)), '月付方案首期与续费月均一致')
equal(costB.notes.some((note) => note.includes('续费价')), false, '月付方案不应提示幻价')

// 三年特惠 + 首期优惠 + 开通费
const planC = planById('plan-c')
const costC = calculatePlanCost(planC, DEFAULT_SERVER_COST_INPUTS)
ok(planC.firstCycleDiscount > 0, '方案 C 带首期优惠')
equal(
  Number(costC.firstCyclePaymentSettlement.toFixed(6)),
  Number(((planC.promoPrice - planC.firstCycleDiscount + planC.setupFee) * RATE).toFixed(6)),
  '首期优惠与开通费都应计入首期实付'
)
ok(costC.discountMonthlyGapSettlement > 0 || planC.renewalPrice > planC.promoPrice, '方案 C 的首期优惠或续费价差应在结果中体现')
ok(costC.holdingPlannedSettlement > 0, '方案 C 持有期成本为正')

// 整体对比
const result = calculateServerCosts(DEFAULT_SERVER_COST_INPUTS)
equal(result.plans.length, 3, '默认对比三个方案')
equal(result.holdingMonths, HOLDING, '持有月数透传正确')
equal(result.settlementCurrency, 'CNY', '结算币种透传正确')
result.plans.forEach((plan) => {
  const source = planById(plan.id)
  equal(
    Number(plan.holdingPlannedSettlement.toFixed(6)),
    Number(holdingPlanned(source).toFixed(6)),
    plan.name + ' 的持有期总成本与独立推导一致'
  )
})
const ranks = result.plans.map((plan) => plan.rank)
equal(ranks.join(','), '1,2,3', '方案按持有成本升序排名')
equal(result.cheapestByHoldingId, result.plans[0].id, '持有成本最低方案与排名一致')
ok(result.maxSavingSettlement > 0, '最高与最低方案差额为正')
equal(result.hasPromoPricing, true, '存在年付幻价方案时应标记')
equal(result.plans[0].extraCostSettlement, 0, '最低成本方案差额为 0')
equal(
  Number(result.plans[result.plans.length - 1].extraCostSettlement.toFixed(6)),
  Number(result.maxSavingSettlement.toFixed(6)),
  '末位方案差额等于最大差额'
)

// 单位算力成本：内存与核数都参与折算
const unitA = costA.monthlyPerComputeUnitSettlement
equal(
  Number(unitA.toFixed(6)),
  Number((costA.renewalMonthlySettlement / (planA.vcpu + planA.memoryGb / 2)).toFixed(6)),
  '单位算力月成本按 1 vCPU + 2GB 内存折算'
)
equal(
  Number(costA.monthlyPerMemoryGbSettlement.toFixed(6)),
  Number((costA.renewalMonthlySettlement / planA.memoryGb).toFixed(6)),
  '每 GB 内存月成本计算正确'
)
const bestValue = result.plans.find((plan) => plan.id === result.bestValuePerComputeId)
ok(bestValue, '性价比最优方案存在')
ok(
  result.plans.every((plan) => plan.monthlyPerComputeUnitSettlement >= bestValue.monthlyPerComputeUnitSettlement - 1e-9),
  '性价比最优方案的单位算力成本不高于其他方案'
)

// 校验分支
assert.throws(() => calculateServerCosts({ ...DEFAULT_SERVER_COST_INPUTS, plans: [planA] }), /至少配置 2 个/, '少于两个方案应报错')
assert.throws(
  () => calculateServerCosts({ ...DEFAULT_SERVER_COST_INPUTS, plans: [planA, planB, planC, planA, planB, planC] }),
  /最多同时比较 5 个/,
  '超过五个方案应报错'
)
assert.throws(() => calculateServerCosts({ ...DEFAULT_SERVER_COST_INPUTS, exchangeRate: 0 }), /汇率/, '汇率为零应报错')
assert.throws(() => calculateServerCosts({ ...DEFAULT_SERVER_COST_INPUTS, holdingMonths: 2.5 }), /整数/, '持有月数非整数应报错')
assert.throws(
  () => calculatePlanCost({ ...planA, cycleMonths: 0 }, DEFAULT_SERVER_COST_INPUTS),
  /计费周期/,
  '计费周期为零应报错'
)
assert.throws(
  () => calculatePlanCost({ ...planA, promoPrice: 10, firstCycleDiscount: 50 }, DEFAULT_SERVER_COST_INPUTS),
  /首期优惠/,
  '首期优惠超过套餐价应报错'
)

// 持有期短于计费周期时按比例折算
const shortHolding = calculateServerCosts({ ...DEFAULT_SERVER_COST_INPUTS, holdingMonths: 30 })
shortHolding.plans.forEach((plan) => {
  ok(plan.holdingPlannedSettlement > 0, '持有期不改变方案数量')
})
const planAShort = shortHolding.plans.find((plan) => plan.id === 'plan-a')
ok(planAShort.notes.some((note) => note.includes('尾部')), '持有 30 个月时年付方案的尾部 6 个月应提示按续费月均折算')

// 续费价等于套餐价时不提示幻价
const noPromo = calculateServerCosts({
  ...DEFAULT_SERVER_COST_INPUTS,
  plans: [{ ...planA, renewalPrice: planA.promoPrice }, planB, { ...planC, renewalPrice: planC.promoPrice }],
})
equal(noPromo.hasPromoPricing, false, '无幻价方案时不标记')

// 摘要文本
const note = buildServerCostNote(result)
ok(note.includes('服务器成本对比'), '摘要含标题')
equal(note.split(String.fromCharCode(10)).length >= 4, true, '摘要至少包含标题与三个方案行')
ok(note.includes('差额'), '摘要含差额说明')
ok(note.includes('续费价'), '存在幻价时摘要给出提示')

// 汇率不影响相对排名，只影响绝对值
const doubled = calculateServerCosts({ ...DEFAULT_SERVER_COST_INPUTS, exchangeRate: RATE * 2 })
equal(doubled.plans.map((plan) => plan.id).join(','), result.plans.map((plan) => plan.id).join(','), '汇率变化不改变排名')
equal(
  Number((doubled.plans[0].holdingPlannedSettlement / result.plans[0].holdingPlannedSettlement).toFixed(6)),
  2,
  '汇率翻倍时成本绝对值同步翻倍'
)

console.log('服务器成本对比：' + assertionCount + ' 条定向断言通过')
