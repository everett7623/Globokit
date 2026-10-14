// 名称: 收款方式风险速查专项测试
// 描述: 覆盖数据完整性、风险筛选、场景推荐排序与枚举一致性
// 路径: Globokit/scripts/assert-payment-risk.cjs
// 作者: everettlabs
// 更新时间: 2026-10-12

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  PAYMENT_METHODS,
  RISK_META,
  SCENARIO_META,
  getMethodsByRisk,
  recommendMethods,
  getPaymentStats,
} = loadTypescriptModule('lib/tools/payment-risk-guide.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}

const VALID_RISKS = new Set(Object.keys(RISK_META))
const VALID_SCENARIOS = new Set(Object.keys(SCENARIO_META))
const ids = PAYMENT_METHODS.map((method) => method.id)

// 数据完整性
check(ids.length >= 8, '至少收录 8 种收款方式')
check(new Set(ids).size === ids.length, '收款方式 id 不应重复')
for (const method of PAYMENT_METHODS) {
  check(VALID_RISKS.has(method.riskLevel), `${method.id} 的风险等级必须合法`)
  check(method.scenarios.every((scenario) => VALID_SCENARIOS.has(scenario)), `${method.id} 的场景枚举必须合法`)
  check(method.summary.length >= 20, `${method.id} 的摘要应足够说明`)
  check(method.tips.length >= 2, `${method.id} 至少两条防坑要点`)
  check(method.cashFlowScore >= 1 && method.cashFlowScore <= 5, `${method.id} 的现金流评分应在 1-5`)
}

// 筛选
equal(getMethodsByRisk('low').map((method) => method.id).join(','), 'tt-advance', '低风险应只有前 T/T')
equal(getMethodsByRisk('very-high').length, 2, '极高风险应含 D/A 与 O/A')
check(getMethodsByRisk('high')[0].id === 'dp', '高风险应含 D/P')

// 场景推荐：新客户应推荐预付与即期 L/C，不应推荐 O/A/D/A
const newCustomer = recommendMethods('new-customer')
check(newCustomer.some((method) => method.id === 'tt-advance'), '新客户应推荐前 T/T')
check(!newCustomer.some((method) => method.id === 'oa'), '新客户不应推荐 O/A')
const scores = newCustomer.map((method) => method.cashFlowScore)
check(scores.every((score, index) => index === 0 || scores[index - 1] >= score), '推荐列表应按现金流评分降序')
check(recommendMethods('sample-order').length >= 2, '样品单应有多个可选方式')

// 统计
const stats = getPaymentStats()
equal(stats.total, ids.length, '统计总数应与列表一致')
equal(stats.lowRisk, 1, '低风险计数应为 1')

console.log(`payment-risk-guide: ${assertionCount} 条断言全部通过`)
