// 名称: 集装箱滞箱滞港费页面数据
// 描述: 管理表单字符串状态、场景预设与复制摘要
// 路径: Globokit/app/tools/demurrage-detention-calculator/demurrage-detention-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

import {
  CHARGE_CURRENCY_OPTIONS,
  DEFAULT_DEMURRAGE_DETENTION_INPUTS,
  type ChargeCurrency,
  type DemurrageDetentionInputs,
  type DemurrageDetentionResult,
} from '@/lib/tools/demurrage-detention-calculator'

export type NumericField = Exclude<keyof DemurrageDetentionFormState, 'currency'>

export interface DemurrageDetentionFormState {
  currency: ChargeCurrency
  containerCount: string
  demurrageDays: string
  detentionDays: string
  demurrageFreeDays: string
  demurrageFirstTierDays: string
  demurrageFirstTierRate: string
  demurrageSecondTierDays: string
  demurrageSecondTierRate: string
  demurrageFinalTierRate: string
  detentionFreeDays: string
  detentionFirstTierDays: string
  detentionFirstTierRate: string
  detentionSecondTierDays: string
  detentionSecondTierRate: string
  detentionFinalTierRate: string
}

export interface DemurrageDetentionPreset {
  label: string
  description: string
  values: Partial<DemurrageDetentionFormState>
}

export const DEMURRAGE_DETENTION_PRESETS: readonly DemurrageDetentionPreset[] = [
  { label: '标准进口柜', description: '按常见免费期和两段阶梯费率演示', values: { currency: 'CNY', demurrageFreeDays: '5', demurrageFirstTierDays: '5', demurrageFirstTierRate: '150', demurrageSecondTierDays: '5', demurrageSecondTierRate: '300', demurrageFinalTierRate: '500', detentionFreeDays: '7', detentionFirstTierDays: '5', detentionFirstTierRate: '120', detentionSecondTierDays: '5', detentionSecondTierRate: '240', detentionFinalTierRate: '400' } },
  { label: '港区拥堵', description: '免费期较短、超期费率更高的预算场景', values: { demurrageDays: '20', detentionDays: '22', demurrageFreeDays: '3', detentionFreeDays: '5', demurrageFirstTierRate: '220', demurrageSecondTierRate: '420', demurrageFinalTierRate: '680', detentionFirstTierRate: '180', detentionSecondTierRate: '360', detentionFinalTierRate: '600' } },
  { label: '谈判长免费期', description: '用于核对货代或船公司给出的延长免费期', values: { demurrageFreeDays: '14', detentionFreeDays: '14' } },
  { label: '美元账单', description: '按美元账单口径录入每柜每日费率', values: { currency: 'USD', demurrageFirstTierRate: '25', demurrageSecondTierRate: '45', demurrageFinalTierRate: '70', detentionFirstTierRate: '20', detentionSecondTierRate: '40', detentionFinalTierRate: '65' } },
]

export function createInitialForm(): DemurrageDetentionFormState {
  const inputs = DEFAULT_DEMURRAGE_DETENTION_INPUTS
  return {
    currency: inputs.currency,
    containerCount: String(inputs.containerCount),
    demurrageDays: String(inputs.demurrageDays),
    detentionDays: String(inputs.detentionDays),
    demurrageFreeDays: String(inputs.demurrage.freeDays),
    demurrageFirstTierDays: String(inputs.demurrage.firstTierDays),
    demurrageFirstTierRate: String(inputs.demurrage.firstTierRate),
    demurrageSecondTierDays: String(inputs.demurrage.secondTierDays),
    demurrageSecondTierRate: String(inputs.demurrage.secondTierRate),
    demurrageFinalTierRate: String(inputs.demurrage.finalTierRate),
    detentionFreeDays: String(inputs.detention.freeDays),
    detentionFirstTierDays: String(inputs.detention.firstTierDays),
    detentionFirstTierRate: String(inputs.detention.firstTierRate),
    detentionSecondTierDays: String(inputs.detention.secondTierDays),
    detentionSecondTierRate: String(inputs.detention.secondTierRate),
    detentionFinalTierRate: String(inputs.detention.finalTierRate),
  }
}

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function toInputs(form: DemurrageDetentionFormState): DemurrageDetentionInputs {
  return {
    currency: form.currency,
    containerCount: toNumber(form.containerCount),
    demurrageDays: toNumber(form.demurrageDays),
    detentionDays: toNumber(form.detentionDays),
    demurrage: {
      freeDays: toNumber(form.demurrageFreeDays),
      firstTierDays: toNumber(form.demurrageFirstTierDays),
      firstTierRate: toNumber(form.demurrageFirstTierRate),
      secondTierDays: toNumber(form.demurrageSecondTierDays),
      secondTierRate: toNumber(form.demurrageSecondTierRate),
      finalTierRate: toNumber(form.demurrageFinalTierRate),
    },
    detention: {
      freeDays: toNumber(form.detentionFreeDays),
      firstTierDays: toNumber(form.detentionFirstTierDays),
      firstTierRate: toNumber(form.detentionFirstTierRate),
      secondTierDays: toNumber(form.detentionSecondTierDays),
      secondTierRate: toNumber(form.detentionSecondTierRate),
      finalTierRate: toNumber(form.detentionFinalTierRate),
    },
  }
}

export function formatMoney(value: number, currency: ChargeCurrency) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value)
}

export function formatRate(value: number, currency: ChargeCurrency) {
  return `${formatMoney(value, currency)}/柜·天`
}

export function buildDemurrageDetentionSummary(result: DemurrageDetentionResult) {
  const currencyLabel = CHARGE_CURRENCY_OPTIONS.find((item) => item.value === result.currency)?.label ?? result.currency
  const describe = (charge: DemurrageDetentionResult['demurrage']) => [
    `${charge.label}：占用 ${charge.totalDays} 天，免费 ${charge.freeDays} 天，超期 ${charge.chargeableDays} 天`,
    `  费用：${formatMoney(charge.feeTotal, result.currency)}（${formatMoney(charge.feePerContainer, result.currency)}/柜）`,
  ]
  return [
    '集装箱滞箱滞港费估算',
    `计费币种：${currencyLabel}`,
    `集装箱数量：${result.containerCount} 柜`,
    ...describe(result.demurrage),
    ...describe(result.detention),
    `异常费用合计：${formatMoney(result.totalFee, result.currency)}`,
    `平均每柜：${formatMoney(result.feePerContainer, result.currency)}`,
    '注：本工具按用户录入的日历天数和船公司费率预算，最终以提单、设备交接单及账单的实际计费规则为准。',
  ].join('\n')
}
