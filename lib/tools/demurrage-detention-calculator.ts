// 名称: 集装箱滞箱滞港费计算逻辑
// 描述: 按场内/场外占用天数、免费期与阶梯日费率估算集装箱异常费用
// 路径: Globokit/lib/tools/demurrage-detention-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

export type ChargeCurrency = 'CNY' | 'USD' | 'EUR'
export type ChargeType = 'demurrage' | 'detention'

export interface ChargeSchedule {
  freeDays: number
  firstTierDays: number
  firstTierRate: number
  secondTierDays: number
  secondTierRate: number
  finalTierRate: number
}

export interface DemurrageDetentionInputs {
  currency: ChargeCurrency
  containerCount: number
  demurrageDays: number
  detentionDays: number
  demurrage: ChargeSchedule
  detention: ChargeSchedule
}

export interface ChargeTierResult {
  label: string
  days: number
  rate: number
  feePerContainer: number
  feeTotal: number
}

export interface ChargeTypeResult {
  type: ChargeType
  label: string
  totalDays: number
  freeDays: number
  chargeableDays: number
  freeDaysRemaining: number
  overageDays: number
  tiers: ChargeTierResult[]
  feePerContainer: number
  feeTotal: number
}

export interface DemurrageDetentionResult {
  currency: ChargeCurrency
  containerCount: number
  demurrage: ChargeTypeResult
  detention: ChargeTypeResult
  totalChargeableDays: number
  totalFee: number
  feePerContainer: number
  highestCostType: ChargeType | null
}

export const CHARGE_CURRENCY_OPTIONS: Array<{ value: ChargeCurrency; label: string }> = [
  { value: 'CNY', label: 'CNY 人民币' },
  { value: 'USD', label: 'USD 美元' },
  { value: 'EUR', label: 'EUR 欧元' },
]

export const DEFAULT_DEMURRAGE_DETENTION_INPUTS: DemurrageDetentionInputs = {
  currency: 'CNY',
  containerCount: 2,
  demurrageDays: 12,
  detentionDays: 16,
  demurrage: {
    freeDays: 5,
    firstTierDays: 5,
    firstTierRate: 150,
    secondTierDays: 5,
    secondTierRate: 300,
    finalTierRate: 500,
  },
  detention: {
    freeDays: 7,
    firstTierDays: 5,
    firstTierRate: 120,
    secondTierDays: 5,
    secondTierRate: 240,
    finalTierRate: 400,
  },
}

function requireFinite(value: number, label: string, min: number, max: number) {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  }
  return value
}

function requireInteger(value: number, label: string, min: number, max: number) {
  requireFinite(value, label, min, max)
  if (!Number.isInteger(value)) throw new Error(`${label}必须是整数`)
  return value
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

function validateSchedule(schedule: ChargeSchedule, label: string) {
  return {
    freeDays: requireInteger(schedule.freeDays, `${label}免费天数`, 0, 3650),
    firstTierDays: requireInteger(schedule.firstTierDays, `${label}第一阶梯天数`, 0, 3650),
    firstTierRate: requireFinite(schedule.firstTierRate, `${label}第一阶梯日费率`, 0, 1_000_000),
    secondTierDays: requireInteger(schedule.secondTierDays, `${label}第二阶梯天数`, 0, 3650),
    secondTierRate: requireFinite(schedule.secondTierRate, `${label}第二阶梯日费率`, 0, 1_000_000),
    finalTierRate: requireFinite(schedule.finalTierRate, `${label}后续日费率`, 0, 1_000_000),
  }
}

function calculateCharge(type: ChargeType, totalDays: number, schedule: ChargeSchedule, containerCount: number): ChargeTypeResult {
  const label = type === 'demurrage' ? '滞港费（Demurrage）' : '滞箱费（Detention）'
  const freeDays = schedule.freeDays
  const chargeableDays = Math.max(totalDays - freeDays, 0)
  const firstDays = Math.min(chargeableDays, schedule.firstTierDays)
  const secondDays = Math.min(Math.max(chargeableDays - firstDays, 0), schedule.secondTierDays)
  const finalDays = Math.max(chargeableDays - firstDays - secondDays, 0)
  const tiers = [
    { label: '第一阶梯', days: firstDays, rate: schedule.firstTierRate },
    { label: '第二阶梯', days: secondDays, rate: schedule.secondTierRate },
    { label: '后续阶梯', days: finalDays, rate: schedule.finalTierRate },
  ].map((tier) => ({
    ...tier,
    feePerContainer: roundMoney(tier.days * tier.rate),
    feeTotal: roundMoney(tier.days * tier.rate * containerCount),
  }))
  const feePerContainer = tiers.reduce((sum, tier) => sum + tier.days * tier.rate, 0)

  return {
    type,
    label,
    totalDays,
    freeDays,
    chargeableDays,
    freeDaysRemaining: Math.max(freeDays - totalDays, 0),
    overageDays: chargeableDays,
    tiers,
    feePerContainer: roundMoney(feePerContainer),
    feeTotal: roundMoney(feePerContainer * containerCount),
  }
}

export function calculateDemurrageDetention(inputs: DemurrageDetentionInputs): DemurrageDetentionResult {
  if (!CHARGE_CURRENCY_OPTIONS.some((option) => option.value === inputs.currency)) {
    throw new Error('请选择有效的计费币种')
  }
  const containerCount = requireInteger(inputs.containerCount, '集装箱数量', 1, 100_000)
  const demurrageDays = requireInteger(inputs.demurrageDays, '滞港占用天数', 0, 3650)
  const detentionDays = requireInteger(inputs.detentionDays, '滞箱占用天数', 0, 3650)
  const demurrage = validateSchedule(inputs.demurrage, '滞港费')
  const detention = validateSchedule(inputs.detention, '滞箱费')
  const demurrageResult = calculateCharge('demurrage', demurrageDays, demurrage, containerCount)
  const detentionResult = calculateCharge('detention', detentionDays, detention, containerCount)
  const totalFee = demurrageResult.feeTotal + detentionResult.feeTotal

  return {
    currency: inputs.currency,
    containerCount,
    demurrage: demurrageResult,
    detention: detentionResult,
    totalChargeableDays: demurrageResult.chargeableDays + detentionResult.chargeableDays,
    totalFee: roundMoney(totalFee),
    feePerContainer: roundMoney(totalFee / containerCount),
    highestCostType: totalFee === 0 ? null : demurrageResult.feeTotal >= detentionResult.feeTotal ? 'demurrage' : 'detention',
  }
}
