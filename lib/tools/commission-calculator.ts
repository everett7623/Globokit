// 名称: 阶梯佣金计算逻辑
// 描述: 按累计销售额分段计提销售佣金，支持回款率折算与达标奖金
// 路径: Globokit/lib/tools/commission-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-10-10

export interface CommissionTierInput {
  id: string
  /** 本档累计销售额上限，0 表示不封顶（仅允许最后一档） */
  upToAmount: number
  ratePercent: number
}

export interface CommissionInputs {
  salesAmount: number
  tiers: CommissionTierInput[]
  /** 实际回款率百分比，0–100 */
  collectionPercent: number
  /** 达标奖金（单次发放，按业绩是否达到阈值判断） */
  targetBonus: number
  /** 奖金起征的累计销售额 */
  bonusThresholdAmount: number
}

export interface CommissionTierBreakdown {
  id: string
  rangeLabel: string
  tierAmount: number
  ratePercent: number
  commission: number
}

export interface CommissionResult {
  salesAmount: number
  collectionPercent: number
  tiers: CommissionTierBreakdown[]
  totalCommission: number
  effectiveRatePercent: number
  collectedCommission: number
  uncollectedCommission: number
  bonusUnlocked: boolean
  totalPayout: number
  highestTierRatePercent: number
}

const MAX_TIERS = 5

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function calculateCommission(inputs: CommissionInputs): CommissionResult {
  const salesAmount = inputs.salesAmount
  if (!Number.isFinite(salesAmount) || salesAmount <= 0) throw new Error('累计销售额必须大于 0')
  const collectionPercent = inputs.collectionPercent
  if (!Number.isFinite(collectionPercent) || collectionPercent < 0 || collectionPercent > 100) throw new Error('回款率必须在 0 到 100 之间')
  if (inputs.tiers.length < 2 || inputs.tiers.length > MAX_TIERS) throw new Error(`请配置 2 到 ${MAX_TIERS} 个佣金档位`)
  if (!Number.isFinite(inputs.targetBonus) || inputs.targetBonus < 0) throw new Error('达标奖金不能为负')
  if (!Number.isFinite(inputs.bonusThresholdAmount) || inputs.bonusThresholdAmount < 0) throw new Error('奖金起征销售额不能为负')

  let previousCap = 0
  let coveredUpTo = 0
  const breakdowns: CommissionTierBreakdown[] = []
  inputs.tiers.forEach((tier, index) => {
    const isLast = index === inputs.tiers.length - 1
    if (!Number.isFinite(tier.ratePercent) || tier.ratePercent < 0 || tier.ratePercent > 30) {
      throw new Error(`第 ${index + 1} 档费率必须在 0 到 30 之间`)
    }
    if (!isLast) {
      if (!Number.isFinite(tier.upToAmount) || tier.upToAmount <= previousCap) {
        throw new Error(`第 ${index + 1} 档上限必须大于上一档上限（${previousCap.toLocaleString('en-US')}）`)
      }
    } else if (tier.upToAmount !== 0 && tier.upToAmount <= previousCap) {
      throw new Error(`末档上限须为 0（不封顶）或大于上一档上限`)
    }

    coveredUpTo = isLast && tier.upToAmount === 0 ? Number.POSITIVE_INFINITY : tier.upToAmount
    const tierCap = isLast && tier.upToAmount === 0 ? salesAmount : Math.min(tier.upToAmount, salesAmount)
    if (tierCap > previousCap) {
      const tierAmount = roundMoney(tierCap - previousCap)
      breakdowns.push({
        id: tier.id,
        rangeLabel: isLast && tier.upToAmount === 0 ? `${previousCap.toLocaleString('en-US')} 以上` : `${previousCap.toLocaleString('en-US')} – ${tierCap.toLocaleString('en-US')}`,
        tierAmount,
        ratePercent: tier.ratePercent,
        commission: roundMoney(tierAmount * (tier.ratePercent / 100)),
      })
    }
    if (!isLast) previousCap = tier.upToAmount
  })

  if (breakdowns.length === 0) throw new Error('销售额未达到最低档位起点，请调整档位上限')
  if (salesAmount > coveredUpTo) {
    throw new Error('销售额超出最高档上限且末档未设为不封顶，超出部分无法计佣')
  }

  const totalCommission = roundMoney(breakdowns.reduce((sum, tier) => sum + tier.commission, 0))
  const collectedCommission = roundMoney(totalCommission * (collectionPercent / 100))
  const bonusUnlocked = salesAmount >= inputs.bonusThresholdAmount && inputs.targetBonus > 0

  return {
    salesAmount: roundMoney(salesAmount),
    collectionPercent,
    tiers: breakdowns,
    totalCommission,
    effectiveRatePercent: roundMoney((totalCommission / salesAmount) * 100),
    collectedCommission,
    uncollectedCommission: roundMoney(totalCommission - collectedCommission),
    bonusUnlocked,
    totalPayout: roundMoney(collectedCommission + (bonusUnlocked ? inputs.targetBonus : 0)),
    highestTierRatePercent: breakdowns[breakdowns.length - 1].ratePercent,
  }
}

export function buildCommissionSummary(result: CommissionResult, currency = 'CNY'): string {
  return [
    `累计销售额 ${result.salesAmount.toLocaleString('en-US')} ${currency}，回款率 ${result.collectionPercent}%`,
    ...result.tiers.map((tier) => `${tier.rangeLabel} × ${tier.ratePercent}% = ${tier.commission.toLocaleString('en-US')}`),
    `佣金合计 ${result.totalCommission.toLocaleString('en-US')}（有效费率 ${result.effectiveRatePercent}%）`,
    `回款后实得 ${result.collectedCommission.toLocaleString('en-US')}${result.bonusUnlocked ? ` + 达标奖金，合计发放 ${result.totalPayout.toLocaleString('en-US')}` : ''}`,
  ].join('\n')
}
