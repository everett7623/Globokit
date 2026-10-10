// 名称: 多币种换算器专项测试
// 描述: 覆盖交叉汇率、点差、换算表与非法输入
// 路径: Globokit/scripts/assert-currency-converter.cjs
// 作者: everettlabs
// 更新时间: 2026-10-10

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  CONVERTER_CURRENCIES,
  getCrossRate,
  convertCurrency,
  buildConversionTable,
  buildConversionSummary,
  validateRates,
} = loadTypescriptModule('lib/tools/currency-converter.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const close = (actual, expected, message) => {
  assertionCount += 1
  assert.ok(Math.abs(actual - expected) < 1e-6, `${message}（期望 ${expected}，实际 ${actual}）`)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

// CNY 基准测试汇率：1 CNY = 0.125 USD（即 1 USD = 8 CNY），1 CNY = 20 JPY
const RATES = { CNY: 1, USD: 0.125, EUR: 0.115, GBP: 0.098, JPY: 20, HKD: 0.97, KRW: 170, AUD: 0.187, CAD: 0.17, SGD: 0.168 }

equal(CONVERTER_CURRENCIES.length, 10, '应支持 10 个币种')
equal(CONVERTER_CURRENCIES[0].code, 'CNY', 'CNY 应为基准币种')

// 交叉汇率：USD→EUR = 0.115/0.125 = 0.92
close(getCrossRate(RATES, 'USD', 'EUR'), 0.92, 'USD→EUR 交叉汇率应为 0.92')
close(getCrossRate(RATES, 'USD', 'CNY'), 8, 'USD→CNY 应为 8')
close(getCrossRate(RATES, 'JPY', 'USD'), 0.125 / 20, 'JPY→USD 应为 0.00625')

// 基本换算：10000 USD→CNY = 80000，无点差
const basic = convertCurrency({ amount: 10000, from: 'USD', to: 'CNY', rates: RATES })
equal(basic.convertedAmount, 80000, '10000 USD 应换 80000 CNY')
equal(basic.midRate, 8, '中间价应为 8')
equal(basic.appliedRate, 8, '无点差时适用汇率等于中间价')
equal(basic.markupPercent, 0, '默认点差应为 0')

// 点差：0.5% 时适用汇率 7.96，换出 79600
const withMarkup = convertCurrency({ amount: 10000, from: 'USD', to: 'CNY', rates: RATES, markupPercent: 0.5 })
close(withMarkup.appliedRate, 7.96, '0.5% 点差后适用汇率应为 7.96')
equal(withMarkup.convertedAmount, 79600, '点差换算金额应为 79600')

// JPY/KRW 零小数位：1250 USD→JPY，交叉汇率 20/0.125 = 160，得 200000
const toJpy = convertCurrency({ amount: 1250, from: 'USD', to: 'JPY', rates: RATES })
equal(toJpy.convertedAmount, 200000, 'USD→JPY 换算应为 200000')

// 换算表：10 个币种排除来源后应为 9 行
const table = buildConversionTable(100, 'USD', RATES)
equal(table.length, 9, 'USD 来源的换算表应有 9 行')
check(!table.some((row) => row.code === 'USD'), '换算表不应包含来源币种')
check(table.every((row) => row.converted > 0 && row.unitRate > 0), '换算表各行金额与汇率应大于 0')

// 摘要文本
const summary = buildConversionSummary(basic)
check(summary.includes('10,000.00 USD'), '摘要应含原始金额')
check(summary.includes('80,000.00 CNY'), '摘要应含换算金额')
check(summary.includes('中间价 8'), '摘要应含中间价')

// 校验
throws(() => validateRates({ USD: 0.125 }), /CNY 为基准/, '缺少 CNY 基准应报错')
throws(() => validateRates({ CNY: 2, USD: 0.125 }), /CNY 为基准/, 'CNY 不为 1 应报错')
throws(() => validateRates({ CNY: 1, USD: -1 }), /大于 0/, '负汇率应报错')
throws(() => convertCurrency({ amount: 0, from: 'USD', to: 'CNY', rates: RATES }), /大于 0/, '金额为 0 应报错')
throws(() => convertCurrency({ amount: -5, from: 'USD', to: 'CNY', rates: RATES }), /大于 0/, '金额为负应报错')
throws(() => convertCurrency({ amount: 100, from: 'GBP', to: 'CNY', rates: { CNY: 1, USD: 0.125, EUR: 0.115 } }), /暂不支持/, '汇率表缺失币种应报错')
throws(() => convertCurrency({ amount: 100, from: 'USD', to: 'CNY', rates: RATES, markupPercent: 11 }), /点差/, '点差超过 10 应报错')
throws(() => convertCurrency({ amount: 100, from: 'USD', to: 'CNY', rates: RATES, markupPercent: -1 }), /点差/, '点差为负应报错')

console.log(`currency-converter: ${assertionCount} 条断言全部通过`)
