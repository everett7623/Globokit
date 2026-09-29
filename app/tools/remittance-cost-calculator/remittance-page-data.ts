// 名称: 国际收款渠道对比页面数据
// 描述: 维护表单状态、场景预设、格式化函数与结果摘要生成
// 路径: Globokit/app/tools/remittance-cost-calculator/remittance-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-09-18

import type { RemittanceChannelId, RemittanceResult } from '@/lib/tools/remittance-cost-calculator'

export interface RemittanceFormState {
  orderAmount: string
  currency: string
  exchangeRate: string
  settlementCurrency: string
  annualFundingRatePercent: string
  sellerPaysFee: boolean
  channelIds: RemittanceChannelId[]
}

export const REMITTANCE_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'] as const
export const REMITTANCE_SETTLEMENT_CURRENCIES = ['CNY', 'USD', 'EUR', 'HKD'] as const

export const DEFAULT_REMITTANCE_FORM: RemittanceFormState = {
  orderAmount: '50000',
  currency: 'USD',
  exchangeRate: '7.15',
  settlementCurrency: 'CNY',
  annualFundingRatePercent: '6',
  sellerPaysFee: true,
  channelIds: ['tt', 'lc', 'dp', 'gateway', 'platform'],
}

export interface RemittancePreset {
  label: string
  description: string
  values: Partial<RemittanceFormState>
}

export const REMITTANCE_PRESETS: readonly RemittancePreset[] = [
  {
    label: '常规美元订单',
    description: '5 万美元订单，电汇、信用证与第三方渠道横向对比',
    values: { orderAmount: '50000', currency: 'USD', exchangeRate: '7.15', annualFundingRatePercent: '6' },
  },
  {
    label: '小额样品单',
    description: '3000 美元试单，固定费用占比明显高于大额订单',
    values: { orderAmount: '3000', currency: 'USD', exchangeRate: '7.15', annualFundingRatePercent: '5' },
  },
  {
    label: '大额信用证',
    description: '30 万美元订单，重点评估开证成本与资金占用',
    values: { orderAmount: '300000', currency: 'USD', exchangeRate: '7.15', annualFundingRatePercent: '7' },
  },
  {
    label: '欧元新客户',
    description: '新客户欧元订单，渠道覆盖托收与平台托管',
    values: { orderAmount: '80000', currency: 'EUR', exchangeRate: '7.8', annualFundingRatePercent: '6' },
  },
]

export const toNumber = (value: string): number => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatMoney(value: number, currency: string): string {
  const rounded = Math.round(value * 100) / 100
  return currency + ' ' + rounded.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatPercent(value: number, digits = 2): string {
  return value.toFixed(digits) + '%'
}

export function formatDays(days: number): string {
  return days + ' 天'
}

export function buildRemittanceSummary(result: RemittanceResult): string {
  const best = result.channels.find((channel) => channel.id === result.bestChannelId) ?? result.channels[0]
  const lines = [
    '国际收款渠道费用对比',
    '订单金额：' + result.currency + ' ' + result.orderAmount.toLocaleString('zh-CN') + '（按 1:' + result.exchangeRate + ' 折算为 ' + result.settlementCurrency + '）',
    '结算口径：' + (result.sellerPaysFee ? '卖方承担渠道费用' : '买方承担渠道费用') + '，资金年化成本 ' + result.fundingRatePercent + '%',
    '推荐渠道：' + best.name + '，总成本 ' + formatMoney(best.totalCostSettlement, result.settlementCurrency) + '，成本率 ' + formatPercent(best.costRatePercent) + '，预计 ' + formatDays(best.collectionDays) + ' 到账',
    '',
    '各渠道明细（按总成本升序）：',
  ]
  result.channels.forEach((channel) => {
    lines.push(
      channel.rank + '. ' + channel.name + '：总成本 ' + formatMoney(channel.totalCostSettlement, result.settlementCurrency) +
        '，手续费 ' + formatMoney(channel.totalFeeSettlement, result.settlementCurrency) +
        '，资金占用 ' + formatMoney(channel.fundingCostSettlement, result.settlementCurrency) +
        '，到手 ' + formatMoney(channel.netReceiptSettlement, result.settlementCurrency) +
        '，成本率 ' + formatPercent(channel.costRatePercent) +
        '，回款 ' + formatDays(channel.collectionDays)
    )
  })
  lines.push('')
  lines.push('最高与最低渠道总成本差额：' + formatMoney(result.maxSavingSettlement, result.settlementCurrency))
  lines.push('注：费率为行业常见区间参考值，实际以银行与平台当期公布价目为准；汇损按订单金额百分比预算。')
  return lines.join(String.fromCharCode(10))
}

