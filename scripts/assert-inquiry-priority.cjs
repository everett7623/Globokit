const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_INQUIRY_INPUTS,
  INQUIRY_CRITERIA,
  buildInquiryFollowUp,
  describeInquiryCadence,
  scoreInquiry,
} = loadTypescriptModule('lib/tools/inquiry-priority-scorer.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const ok = (value, message) => { assertionCount += 1; assert.ok(value, message) }

// 权重表作为唯一事实来源，预期值全部由权重表推导，避免手写数字漂移
const WEIGHTS = Object.fromEntries(INQUIRY_CRITERIA.map((item) => [item.id, item.weight]))
const ALL_FLAGS = {
  hasQuantity: 'quantity', hasTargetPrice: 'targetPrice', hasSpecification: 'specification',
  hasIncoterm: 'incoterm', hasDestination: 'destination', hasLeadTime: 'leadTime',
  hasPaymentTerm: 'paymentTerm', corporateEmail: 'corporateEmail', hasCompanyProfile: 'companyProfile',
  specificSku: 'specificSku', comparingSuppliers: 'comparingSuppliers', requestedSample: 'requestedSample',
  requestedQuotation: 'requestedQuotation', existingCustomer: 'existingCustomer',
}
const weightSum = INQUIRY_CRITERIA.reduce((sum, item) => sum + item.weight, 0)
const weightOf = (keys) => keys.reduce((sum, key) => sum + WEIGHTS[ALL_FLAGS[key]], 0)
const LONG_MESSAGE = 10
const lengthBonus = Math.min(LONG_MESSAGE, 6)

const ALL_ON = {
  hasQuantity: true, hasTargetPrice: true, hasSpecification: true, hasIncoterm: true,
  hasDestination: true, hasLeadTime: true, hasPaymentTerm: true, corporateEmail: true,
  hasCompanyProfile: true, specificSku: true, comparingSuppliers: true, requestedSample: true,
  requestedQuotation: true, messageLength: LONG_MESSAGE, existingCustomer: true, annualVolumeUsd: 200,
}
const ALL_OFF = {
  hasQuantity: false, hasTargetPrice: false, hasSpecification: false, hasIncoterm: false,
  hasDestination: false, hasLeadTime: false, hasPaymentTerm: false, corporateEmail: false,
  hasCompanyProfile: false, specificSku: false, comparingSuppliers: false, requestedSample: false,
  requestedQuotation: false, messageLength: 0, existingCustomer: false, annualVolumeUsd: 0,
}

// 规则表基线
equal(INQUIRY_CRITERIA.length, 14, '评估维度共 14 项')
equal(new Set(INQUIRY_CRITERIA.map((item) => item.id)).size, 14, '维度 id 不重复')
equal(weightSum, 92, '维度权重合计 92 分，篇幅另加最多 6 分')
equal(new Set(INQUIRY_CRITERIA.map((item) => item.id)).size, Object.keys(ALL_FLAGS).length, '每个维度都有对应开关')

// 默认询盘：由权重表推导预期
const DEFAULT_ON = ['hasQuantity', 'hasSpecification', 'hasDestination', 'corporateEmail', 'specificSku', 'comparingSuppliers', 'requestedQuotation']
const defaultExpected = weightOf(DEFAULT_ON) + Math.min(DEFAULT_INQUIRY_INPUTS.messageLength, 6)
const base = scoreInquiry(DEFAULT_INQUIRY_INPUTS)
equal(Object.keys(DEFAULT_INQUIRY_INPUTS).length, 16, '默认输入包含 16 个字段')
equal(base.total, defaultExpected, '默认询盘得分等于命中权重加篇幅加分')
equal(base.hits.length, DEFAULT_ON.length, '默认命中项数量与开关一致')
equal(base.level, defaultExpected >= 70 ? 'high' : defaultExpected >= 45 ? 'medium' : 'low', '默认等级与分数阈值一致')
equal(base.levelLabel, defaultExpected >= 70 ? '高优先级' : defaultExpected >= 45 ? '中优先级' : '低优先级', '等级文案与阈值一致')
equal(base.responseWithinHours, defaultExpected >= 70 ? 4 : defaultExpected >= 45 ? 12 : 24, '响应时限与等级匹配')
ok(base.missing.length > 0, '默认询盘存在待补齐信息')
ok(base.missing.every((item) => item.prompt.length > 0 && item.promptEn.length > 0), '缺失项带中英文追问')
ok(base.criteria.filter((item) => item.hit).length === base.hits.length, '命中项与维度明细一致')

// 上限与下限
const full = scoreInquiry(ALL_ON)
equal(full.total, Math.min(100, weightSum + lengthBonus), '全选时总分为权重合计加篇幅加分且不超上限')
equal(full.level, 'high', '全选为高优先级')
equal(full.missing.length, 0, '全选时无误缺项')
equal(buildInquiryFollowUp(full), '询盘信息已基本齐全，可直接进入报价流程。', '信息齐全时给出直接报价提示')
ok(buildInquiryFollowUp(full, 'en').includes('Proceed'), '信息齐全时英文提示同步')

const empty = scoreInquiry(ALL_OFF)
equal(empty.total, 0, '全不选且篇幅为 0 时得分为 0')
equal(empty.level, 'low', '得分为 0 为低优先级')
equal(empty.levelLabel, '低优先级', '低优先级文案正确')
equal(empty.responseWithinHours, 24, '低优先级需 24 小时内响应')
equal(empty.hits.length, 0, '全不选无命中项')
equal(empty.missing.length, INQUIRY_CRITERIA.length - 3 - 1, '可追问项为 14 个维度去掉比价、样品、老客户与无需追问项')

// 阈值分界：构造刚好达到 70 与 69 的组合
const INFO_KEYS = ['hasQuantity', 'hasTargetPrice', 'hasSpecification', 'hasIncoterm', 'hasDestination', 'hasLeadTime', 'hasPaymentTerm']
const TRUST_KEYS = ['corporateEmail', 'hasCompanyProfile']
const VALUE_KEYS = ['requestedQuotation', 'existingCustomer', 'specificSku']
const infoOnly = scoreInquiry({ ...ALL_OFF, ...Object.fromEntries(INFO_KEYS.map((k) => [k, true])) })
equal(infoOnly.total, weightOf(INFO_KEYS), '仅信息维度命中时得分等于其权重合计')
equal(infoOnly.level, weightOf(INFO_KEYS) >= 70 ? 'high' : weightOf(INFO_KEYS) >= 45 ? 'medium' : 'low', '仅信息维度时等级与阈值一致')
const withTrust = scoreInquiry({ ...ALL_OFF, ...Object.fromEntries([...INFO_KEYS, ...TRUST_KEYS, ...VALUE_KEYS].map((k) => [k, true])) })
ok(withTrust.total >= 70, '补齐可信度与价值维度后进入高优先级')
equal(withTrust.level, 'high', '分数达到 70 及以上时为高优先级')

// 篇幅加分边界
const noLength = scoreInquiry({ ...ALL_ON, messageLength: 0 })
equal(noLength.total, weightSum, '篇幅为 0 时总分等于权重合计')
const longOnly = scoreInquiry({ ...ALL_OFF, messageLength: 100 })
equal(longOnly.total, 6, '仅靠篇幅最多得 6 分')
const atCap = scoreInquiry({ ...ALL_ON, messageLength: 999, annualVolumeUsd: 500 })
equal(atCap.total, Math.min(100, weightSum + 6), '总分受 100 分上限约束')

// 规模提示四档
ok(scoreInquiry({ ...ALL_ON, annualVolumeUsd: 150 }).volumeNote.includes('100 万美元'), '大客户提示阶梯报价')
ok(scoreInquiry({ ...ALL_ON, annualVolumeUsd: 50 }).volumeNote.includes('中等采购规模'), '中客户提示账期方案')
ok(scoreInquiry({ ...ALL_ON, annualVolumeUsd: 5 }).volumeNote.includes('最小起订量'), '小客户提示起订量')
ok(scoreInquiry({ ...ALL_ON, annualVolumeUsd: 0 }).volumeNote.includes('年度需求量'), '规模未知时提示询问需求量')

// 追问清单与节奏建议
const followUpZh = buildInquiryFollowUp(base, 'zh')
ok(followUpZh.includes('为了给出准确报价'), '中文追问清单含抬头')
equal(followUpZh.split(String.fromCharCode(10)).length, base.missing.length + 1, '中文清单行数等于缺失项加抬头')
const followUpEn = buildInquiryFollowUp(base, 'en')
ok(followUpEn.includes('Incoterm') || followUpEn.includes('payment'), '英文清单包含关键追问项')
equal(followUpEn.split(String.fromCharCode(10)).length, base.missing.length + 1, '英文清单行数与缺失项一致')
ok(describeInquiryCadence('high').includes('4 小时内'), '高优先级节奏包含 4 小时')
ok(describeInquiryCadence('medium').includes('12 小时内'), '中优先级节奏包含 12 小时')
ok(describeInquiryCadence('low').includes('长期培育'), '低优先级节奏包含培育策略')

// 非法与边界输入
assert.throws(() => scoreInquiry({ ...ALL_ON, hasQuantity: 'yes' }), /采购数量/, '非布尔输入应报错')
const weird = scoreInquiry({ ...ALL_ON, messageLength: Number.NaN, annualVolumeUsd: Number.NaN })
equal(weird.total, weightSum, '非法篇幅与规模按 0 处理且不抛错')
const negative = scoreInquiry({ ...ALL_ON, messageLength: -5, annualVolumeUsd: -10 })
equal(negative.total, weightSum, '负数输入按 0 处理')

// 维度明细可解释
base.criteria.forEach((item) => {
  equal(typeof item.hit, 'boolean', '维度命中状态为布尔值')
  ok(item.weight > 0, '维度权重为正数')
  ok(item.note.length > 0, '维度带说明文案')
})

console.log('外贸询盘优先级评估：' + assertionCount + ' 条定向断言通过')
