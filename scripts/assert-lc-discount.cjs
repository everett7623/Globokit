// 名称: 信用证远期贴现计算器专项测试
// 描述: 覆盖利息与年化成本黄金数值、即期对比、边界与非法输入
// 路径: Globokit/scripts/assert-lc-discount.cjs
// 作者: everettlabs
// 更新时间: 2026-10-12

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_LC_DISCOUNT_INPUTS,
  calculateLcDiscount,
  buildLcDiscountSummary,
} = loadTypescriptModule('lib/tools/lc-discount-calculator.ts')

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

// 黄金数值：10 万 USD，90 天，年化 4.5%，承兑费 0.125%，邮电 100，即期费 0.8%
// 利息 = 100000 × 4.5% × 90/360 = 1125；承兑费 = 125；总成本 = 1350；净额 = 98650
const result = calculateLcDiscount(DEFAULT_LC_DISCOUNT_INPUTS)
equal(result.discountInterest, 1125, '贴现利息应为 1125（360 天惯例）')
equal(result.acceptanceFee, 125, '承兑手续费应为 125')
equal(result.totalCost, 1350, '总成本应为 1350')
equal(result.netProceeds, 98650, '到手净额应为 98650')
equal(result.costToFacePercent, 1.35, '成本占面值应为 1.35%')
equal(result.effectiveAnnualRatePercent, 5.47, '实际年化成本应为 5.47%（1.368% × 360/90，固定费被年化放大）')

// 即期对比：即期净额 = 99200，持有成本 = 99200 − 98650 = 550
equal(result.sightComparison.enabled, true, '即期对比应启用')
equal(result.sightComparison.sightNet, 99200, '即期净额应为 99200')
equal(result.sightComparison.holdingCost, 550, '持有成本应为 550')
check(result.sightComparison.note.includes('机会成本'), '贴现劣于即期时提示机会成本')

// 半年以上的分段提示
const longTenor = calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, tenorDays: 360 })
check(longTenor.warnings.some((item) => item.includes('180')), '远期超 180 天应有分段计息提示')
equal(longTenor.discountInterest, 4500, '360 天利息应为 4500')

// 全零费用提示
const zeroFees = calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, discountRatePercent: 0, acceptanceFeePercent: 0, cableFee: 0, sightFeePercent: 0 })
equal(zeroFees.netProceeds, 100000, '零费用时净额等于面值')
check(zeroFees.warnings.some((item) => item.includes('均为 0')), '全零费用应提示核对银行报价')
equal(zeroFees.sightComparison.enabled, false, '即期费 0 时不启用对比')
check(zeroFees.sightComparison.note.includes('未启用'), '未启用对比时说明')

// 贴现占优场景：贴现率极低 + 即期费高
const discountWins = calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, discountRatePercent: 0.1, sightFeePercent: 3 })
check(discountWins.sightComparison.note.includes('贴现方案占优'), '贴现净额更高时应提示贴现占优')

// 摘要
const summary = buildLcDiscountSummary(result)
check(summary.includes('100,000.00 USD'), '摘要应含面值')
check(summary.includes('1,350.00'), '摘要应含总成本')
check(summary.includes('98,650.00'), '摘要应含净额')

// 校验
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, faceAmount: 0 }), /信用证金额/, '金额为 0 应报错')
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, tenorDays: 0 }), /远期天数/, '远期 0 天应报错')
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, tenorDays: 90.5 }), /整数/, '远期非整数应报错')
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, tenorDays: 721 }), /远期天数/, '远期超 720 天应报错')
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, discountRatePercent: 31 }), /贴现率/, '贴现率超 30 应报错')
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, acceptanceFeePercent: 6 }), /承兑手续费/, '承兑费超 5 应报错')
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, cableFee: 200000 }), /邮电费/, '邮电费超面值应报错')
throws(() => calculateLcDiscount({ ...DEFAULT_LC_DISCOUNT_INPUTS, sightFeePercent: 11 }), /即期综合费率/, '即期费超 10 应报错')

console.log(`lc-discount-calculator: ${assertionCount} 条断言全部通过`)
