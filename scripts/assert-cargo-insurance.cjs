// 名称: 出口货物保险费计算器专项测试
// 描述: 覆盖 FOB/CFR/CIF 换算、战争险叠加、边界与非法输入
// 路径: Globokit/scripts/assert-cargo-insurance.cjs
// 作者: everettlabs
// 更新时间: 2026-09-30

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_CARGO_INSURANCE_INPUTS,
  calculateCargoInsurance,
  createInsuranceInputsFromPreset,
} = loadTypescriptModule('lib/tools/cargo-insurance-calculator.ts')

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

// 场景一：默认 FOB 预设（50000 + 2200 运费，110% 投保，0.08% 费率）
const fobResult = calculateCargoInsurance(DEFAULT_CARGO_INSURANCE_INPUTS)
equal(fobResult.priceBasis, 'FOB', '默认预设应为 FOB 口径')
equal(fobResult.cifValue, 52245.98, 'FOB 换算 CIF 应为 52245.98')
equal(fobResult.insuredAmount, 57470.57, '110% 投保金额应为 57470.57')
equal(fobResult.basePremium, 45.98, '基础险保费应为 45.98')
equal(fobResult.warRiskPremium, 0, '未附加战争险时战争险保费应为 0')
equal(fobResult.totalPremium, 45.98, '合计保费应为 45.98')
equal(fobResult.insuredPercentOfCif, 110, '投保比例应为 110%')
equal(fobResult.effectivePremiumRateOnCif, 0.09, '保费占 CIF 比例四舍五入应为 0.09%')
check(fobResult.basisNote.includes('FOB'), 'FOB 口径说明应提示加运费换算')

// 场景二：CIF 含战争险（30000，0.08% + 0.03%）
const cifResult = calculateCargoInsurance(createInsuranceInputsFromPreset('cif-with-war-risk'))
equal(cifResult.cifValue, 30000, 'CIF 口径直接以货值为 CIF')
equal(cifResult.insuredAmount, 33000, 'CIF 投保金额应为 33000')
equal(cifResult.basePremium, 26.4, '基础险保费应为 26.4')
equal(cifResult.warRiskPremium, 9.9, '战争险保费应为 9.9')
equal(cifResult.totalPremium, 36.3, '合计保费应为 36.3')
equal(cifResult.effectivePremiumRateOnCif, 0.12, '保费占 CIF 比例应为 0.12%')
equal(cifResult.warnings.length, 2, 'CIF 含战争险应产生两条提示')
check(cifResult.warnings.some((item) => item.includes('战争险')), '应包含战争险提示')

// 场景三：CFR 口径（20000，110% 投保，0.1% 费率）
const cfrResult = calculateCargoInsurance({
  priceBasis: 'CFR',
  amount: 20000,
  freightAmount: 0,
  markupPercent: 10,
  premiumRatePercent: 0.1,
  warRiskRatePercent: 0,
  currency: 'USD',
})
equal(cfrResult.cifValue, 20022.02, 'CFR 换算 CIF 应为 20022.02')
equal(cfrResult.insuredAmount, 22024.23, 'CFR 投保金额应为 22024.23')
equal(cfrResult.basePremium, 22.02, 'CFR 基础险保费应为 22.02')

// 场景四：投保加成为 0（不加成，按 CIF 全额投保）
const noMarkupResult = calculateCargoInsurance({
  priceBasis: 'FOB',
  amount: 10000,
  freightAmount: 1000,
  markupPercent: 0,
  premiumRatePercent: 0.08,
  warRiskRatePercent: 0,
  currency: 'USD',
})
equal(noMarkupResult.insuredPercentOfCif, 100, '加成为 0 时投保比例应为 100%')
equal(noMarkupResult.insuredAmount, 11008.81, '不加成投保金额应为 11008.81')
equal(noMarkupResult.basePremium, 8.81, '不加成基础险保费应为 8.81')

// 边界与非法输入
throws(() => calculateCargoInsurance({ ...DEFAULT_CARGO_INSURANCE_INPUTS, markupPercent: 51 }), /投保加成/, '投保加成 51% 应报错')
throws(() => calculateCargoInsurance({ ...DEFAULT_CARGO_INSURANCE_INPUTS, markupPercent: -1 }), /投保加成/, '投保加成为负应报错')
throws(() => calculateCargoInsurance({ ...DEFAULT_CARGO_INSURANCE_INPUTS, premiumRatePercent: 10.01 }), /保险费率/, '保险费率超过 10 应报错')
throws(() => calculateCargoInsurance({ ...DEFAULT_CARGO_INSURANCE_INPUTS, amount: 0 }), /货值金额/, '货值为 0 应报错')
throws(() => calculateCargoInsurance({ ...DEFAULT_CARGO_INSURANCE_INPUTS, amount: -5 }), /货值金额/, '货值为负应报错')
throws(() => calculateCargoInsurance({ ...DEFAULT_CARGO_INSURANCE_INPUTS, priceBasis: 'EXW' }), /价格条款/, '未知价格条款应报错')

// FOB 未填运费时给出提示而不是报错
const zeroFreightResult = calculateCargoInsurance({ ...DEFAULT_CARGO_INSURANCE_INPUTS, freightAmount: 0 })
check(zeroFreightResult.warnings.some((item) => item.includes('海运费')), 'FOB 运费为 0 时应提示按 CFR 换算')

// 预设加载
equal(createInsuranceInputsFromPreset('air-cargo').premiumRatePercent, 0.1, '空运预设费率应为 0.1%')
throws(() => createInsuranceInputsFromPreset('unknown'), /未找到保险费预设/, '未知预设应报错')

console.log(`cargo-insurance-calculator: ${assertionCount} 条断言全部通过`)
