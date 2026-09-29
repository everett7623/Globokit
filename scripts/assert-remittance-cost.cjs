const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_REMITTANCE_INPUTS,
  REMITTANCE_CHANNELS,
  calculateRemittance,
  calculateRemittanceChannel,
} = loadTypescriptModule('lib/tools/remittance-cost-calculator.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const ok = (value, message) => { assertionCount += 1; assert.ok(value, message) }
const closeTo = (actual, expected, delta, message) => { assertionCount += 1; assert.ok(Math.abs(actual - expected) < delta, message + '（实际 ' + actual + '，期望 ' + expected + '）') }

// 渠道表基线
equal(REMITTANCE_CHANNELS.length, 5, '内置五个收款渠道')
equal(REMITTANCE_CHANNELS[0].id, 'tt', '首个渠道为电汇')
equal(new Set(REMITTANCE_CHANNELS.map((c) => c.id)).size, 5, '渠道 id 不重复')

// 默认参数下的整体对比
const base = calculateRemittance(DEFAULT_REMITTANCE_INPUTS)
equal(base.channels.length, 5, '默认对比五个渠道')
equal(base.orderAmountSettlement, 357500, '订单金额按汇率折算为结算币种')
equal(base.bestChannelId, 'tt', '电汇为默认参数下的最低成本渠道')
equal(base.fastestChannelId, 'gateway', '第三方渠道到账最快')
equal(base.channels[0].rank, 1, '排名第一的渠道 rank 为 1')
equal(base.channels[base.channels.length - 1].rank, 5, '末位渠道 rank 为 5')
ok(base.maxSavingSettlement > 0, '最高与最低成本差额应为正')
ok(base.costRateSpread > 0, '成本率极差应为正')

// 电汇渠道明细
const tt = base.channels.find((c) => c.id === 'tt')
ok(tt, '电汇渠道存在')
equal(tt.collectionDays, 3, '电汇回款周期为 3 天')
equal(tt.feesForeign.length, 2, '电汇含电报费与汇损两项')
closeTo(tt.feesForeign[0].amountForeign, 45, 1e-9, '电汇电报费为订单币种 45')
closeTo(tt.feesForeign[1].amountForeign, 150, 1e-9, '汇损为订单金额的 0.3%')
closeTo(tt.totalFeeForeign, 195, 1e-9, '电汇费用合计为 195')
closeTo(tt.totalFeeSettlement, 1394.25, 1e-9, '电汇费用折算为 1394.25')
closeTo(tt.netReceiptSettlement, 356105.75, 1e-9, '电汇到手金额为 356105.75')
closeTo(tt.costRatePercent, 0.39, 1e-6, '电汇成本率约 0.39%')
closeTo(tt.fundingCostSettlement, 176.3013699, 1e-6, '电汇资金占用成本按 3 天折算')
closeTo(tt.totalCostSettlement, 1570.5513699, 1e-6, '电汇总成本为费用加资金占用')
closeTo(tt.netAfterFundingSettlement, 355929.4486301, 1e-6, '扣资金占用后电汇到手指标')

// 信用证成本高于电汇
const lc = base.channels.find((c) => c.id === 'lc')
ok(lc.totalCostSettlement > tt.totalCostSettlement, '信用证总成本应高于电汇')
closeTo(lc.feesForeign[0].amountForeign, 250, 1e-9, '信用证手续费为订单金额 0.5%')
equal(lc.feesForeign.length, 5, '信用证包含手续费、固定费、开证费、电报费与汇损五项')

// 卖方不承担费用：到手金额为全额
const buyerPays = calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, sellerPaysFee: false })
buyerPays.channels.forEach((channel) => {
  equal(channel.netReceiptSettlement, 357500, '买方承担费用时到手金额等于订单金额折算值')
  ok(channel.totalFeeSettlement > 0, '渠道费用仍应计算并展示')
})

// 渠道选择与校验
const pairResult = calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, channelIds: ['tt', 'gateway'] })
equal(pairResult.channels.length, 2, '仅对比选中的两个渠道')
assert.throws(() => calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, channelIds: ['tt'] }), /至少选择 2 个/, '少于两个渠道应报错')
assert.throws(() => calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, orderAmount: 0 }), /订单金额/, '订单金额为零应报错')
assert.throws(() => calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, orderAmount: Number.NaN }), /订单金额/, '订单金额非法应报错')
assert.throws(() => calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, exchangeRate: 0 }), /汇率/, '汇率为零应报错')
assert.throws(() => calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, annualFundingRatePercent: -1 }), /资金年化成本/, '资金成本为负应报错')
assert.throws(() => calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, annualFundingRatePercent: 101 }), /资金年化成本/, '资金成本超过 100% 应报错')

// 汇率放大时费用与成本率同步变化
const doubled = calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, exchangeRate: 14.3 })
closeTo(doubled.orderAmountSettlement, 715000, 1e-9, '汇率翻倍后订单金额折算翻倍')
closeTo(doubled.channels.find((c) => c.id === 'tt').costRatePercent, 0.39, 1e-6, '成本率与汇率无关')
closeTo(doubled.channels.find((c) => c.id === 'tt').totalFeeSettlement, 2788.5, 1e-9, '费用折算值随汇率放大')

// 资金占用：零资金成本时总成本等于手续费
const noFunding = calculateRemittance({ ...DEFAULT_REMITTANCE_INPUTS, annualFundingRatePercent: 0 })
noFunding.channels.forEach((channel) => {
  equal(channel.fundingCostSettlement, 0, '资金成本为零时无资金占用')
  closeTo(channel.totalCostSettlement, channel.totalFeeSettlement, 1e-9, '总成本等于手续费合计')
})

// 单渠道计算可直接调用
const single = calculateRemittanceChannel(DEFAULT_REMITTANCE_INPUTS, REMITTANCE_CHANNELS[0])
equal(single.rank, 0, '单独计算时不带排名')
closeTo(single.totalFeeForeign, 195, 1e-9, '单独计算费用与传统路径一致')

// 渠道排序应严格按总成本升序
const sorted = base.channels.map((c) => c.totalCostSettlement)
const isAscending = sorted.every((value, index) => index === 0 || value >= sorted[index - 1])
ok(isAscending, '渠道按总成本升序排列')

console.log('国际收款渠道费用对比：' + assertionCount + ' 条定向断言通过')
