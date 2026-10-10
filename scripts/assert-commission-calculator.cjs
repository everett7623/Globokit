// 名称: 阶梯佣金计算器专项测试
// 描述: 覆盖分段计佣、回款折算、达标奖金与档位校验
// 路径: Globokit/scripts/assert-commission-calculator.cjs
// 作者: everettlabs
// 更新时间: 2026-10-10

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  calculateCommission,
  buildCommissionSummary,
} = loadTypescriptModule('lib/tools/commission-calculator.ts')

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

function createTiers() {
  return [
    { id: 't1', upToAmount: 500000, ratePercent: 2 },
    { id: 't2', upToAmount: 1000000, ratePercent: 3 },
    { id: 't3', upToAmount: 0, ratePercent: 4 },
  ]
}

// 黄金数值：120 万销售额，三档 2/3/4%，回款 90%，奖金 2 万（起征 100 万）
const result = calculateCommission({
  salesAmount: 1200000,
  tiers: createTiers(),
  collectionPercent: 90,
  targetBonus: 20000,
  bonusThresholdAmount: 1000000,
})
equal(result.tiers.length, 3, '应有三段明细')
equal(result.tiers[0].tierAmount, 500000, '第一段销售额应为 500000')
equal(result.tiers[0].commission, 10000, '第一段佣金应为 10000')
equal(result.tiers[1].tierAmount, 500000, '第二段销售额应为 500000')
equal(result.tiers[1].commission, 15000, '第二段佣金应为 15000')
equal(result.tiers[2].tierAmount, 200000, '第三段销售额应为 200000')
equal(result.tiers[2].commission, 8000, '第三段佣金应为 8000')
equal(result.totalCommission, 33000, '佣金合计应为 33000')
equal(result.effectiveRatePercent, 2.75, '有效费率应为 2.75%')
equal(result.collectedCommission, 29700, '回款后实得应为 29700')
equal(result.uncollectedCommission, 3300, '未回款挂账应为 3300')
equal(result.bonusUnlocked, true, '销售额达到起征线应解锁奖金')
equal(result.totalPayout, 49700, '合计发放应为 49700')
equal(result.highestTierRatePercent, 4, '最高档费率应为 4%')

// 销售额未达第二档：只产生一段
const partial = calculateCommission({
  salesAmount: 300000,
  tiers: createTiers(),
  collectionPercent: 100,
  targetBonus: 20000,
  bonusThresholdAmount: 1000000,
})
equal(partial.tiers.length, 1, '30 万销售额只应产生一段')
equal(partial.totalCommission, 6000, '30 万销售额佣金应为 6000')
equal(partial.bonusUnlocked, false, '未达起征线不应发放奖金')
equal(partial.totalPayout, 6000, '无奖金时合计发放等于佣金')

// 末档设上限：销售额恰好等于最高上限
const cappedTiers = [
  { id: 'a', upToAmount: 400000, ratePercent: 2 },
  { id: 'b', upToAmount: 800000, ratePercent: 5 },
]
const capped = calculateCommission({
  salesAmount: 800000,
  tiers: cappedTiers,
  collectionPercent: 100,
  targetBonus: 0,
  bonusThresholdAmount: 0,
})
equal(capped.tiers.length, 2, '两档应产生两段')
equal(capped.tiers[1].rangeLabel, '400,000 – 800,000', '末段区间标签应正确')
equal(capped.totalCommission, 8000 + 20000, '末档封顶佣金应为 28000')

// 回款率 0：佣金全额挂账
const zeroCollection = calculateCommission({
  salesAmount: 300000,
  tiers: createTiers(),
  collectionPercent: 0,
  targetBonus: 0,
  bonusThresholdAmount: 0,
})
equal(zeroCollection.collectedCommission, 0, '回款率 0 时实得应为 0')
equal(zeroCollection.uncollectedCommission, 6000, '回款率 0 时挂账应等于全额佣金')

// 摘要文本
const summary = buildCommissionSummary(result)
check(summary.includes('1,200,000 CNY'), '摘要应含销售额')
check(summary.includes('33,000'), '摘要应含佣金合计')
check(summary.includes('49,700'), '摘要应含合计发放')

// 校验
throws(() => calculateCommission({ salesAmount: 0, tiers: createTiers(), collectionPercent: 100, targetBonus: 0, bonusThresholdAmount: 0 }), /销售额/, '销售额为 0 应报错')
throws(() => calculateCommission({ salesAmount: -1, tiers: createTiers(), collectionPercent: 100, targetBonus: 0, bonusThresholdAmount: 0 }), /销售额/, '销售额为负应报错')
throws(() => calculateCommission({ salesAmount: 100, tiers: [createTiers()[0]], collectionPercent: 100, targetBonus: 0, bonusThresholdAmount: 0 }), /2 到 5/, '单档应报错')
throws(() => calculateCommission({
  salesAmount: 100,
  tiers: [
    { id: 'a', upToAmount: 500000, ratePercent: 2 },
    { id: 'b', upToAmount: 500000, ratePercent: 3 },
    { id: 'c', upToAmount: 0, ratePercent: 4 },
  ],
  collectionPercent: 100,
  targetBonus: 0,
  bonusThresholdAmount: 0,
}), /大于上一档/, '档位上限重复应报错')
throws(() => calculateCommission({ salesAmount: 100, tiers: createTiers(), collectionPercent: 101, targetBonus: 0, bonusThresholdAmount: 0 }), /回款率/, '回款率超过 100 应报错')
// 末档封顶、销售额低于首档上限：正常按首段计佣
const smallSale = calculateCommission({ salesAmount: 100000, tiers: createTiers(), collectionPercent: 100, targetBonus: 0, bonusThresholdAmount: 0 })
equal(smallSale.tiers.length, 1, '销售额低于首档上限只应产生一段')
equal(smallSale.totalCommission, 2000, '10 万销售额佣金应为 2000')
throws(() => calculateCommission({ salesAmount: 100, tiers: [{ id: 'a', upToAmount: 500000, ratePercent: 31 }, { id: 'b', upToAmount: 0, ratePercent: 2 }], collectionPercent: 100, targetBonus: 0, bonusThresholdAmount: 0 }), /费率/, '费率超过 30 应报错')
throws(() => calculateCommission({
  salesAmount: 2000000,
  tiers: [
    { id: 'a', upToAmount: 500000, ratePercent: 2 },
    { id: 'b', upToAmount: 1000000, ratePercent: 3 },
  ],
  collectionPercent: 100,
  targetBonus: 0,
  bonusThresholdAmount: 0,
}), /无法计佣/, '销售额超上限且末档封顶应报错')

// 非末档填 0 视为非法（0 <= previousCap）
throws(() => calculateCommission({
  salesAmount: 100,
  tiers: [
    { id: 'a', upToAmount: 0, ratePercent: 2 },
    { id: 'b', upToAmount: 0, ratePercent: 3 },
  ],
  collectionPercent: 100,
  targetBonus: 0,
  bonusThresholdAmount: 0,
}), /大于上一档/, '首档上限填 0 应报错')

console.log(`commission-calculator: ${assertionCount} 条断言全部通过`)
