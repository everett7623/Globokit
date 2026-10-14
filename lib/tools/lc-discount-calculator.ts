// 名称: 信用证远期贴现计算逻辑
// 描述: 测算远期信用证贴现/押汇的利息、费用、到手净额与实际年化成本，并与即期收款对比
// 路径: Globokit/lib/tools/lc-discount-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-10-12

export interface LcDiscountInputs {
  /** 信用证金额 */
  faceAmount: number
  currency: string
  /** 远期天数（提单后/承兑后 N 天付款） */
  tenorDays: number
  /** 贴现率（年化 %） */
  discountRatePercent: number
  /** 承兑手续费（一次性，占面值 %） */
  acceptanceFeePercent: number
  /** 邮电/单据处理费（一次性，固定金额） */
  cableFee: number
  /** 即期收款的综合费率（%，用于对比基准），0 表示忽略对比 */
  sightFeePercent: number
}

export interface LcDiscountResult {
  faceAmount: number
  currency: string
  tenorDays: number
  discountInterest: number
  acceptanceFee: number
  cableFee: number
  totalCost: number
  netProceeds: number
  /** 实际年化成本率（按净额与实际占用天数折算，360 天国际惯例） */
  effectiveAnnualRatePercent: number
  /** 成本占面值比例（%） */
  costToFacePercent: number
  sightComparison: {
    enabled: boolean
    sightNet: number
    holdingCost: number
    /** 贴现净额比即期净额少多少（正数 = 即期更划算） */
    breakEvenAmount: number
    note: string
  }
  warnings: string[]
}

const MAX_AMOUNT = 1_000_000_000

function requireFinite(value: number, label: string, min: number, max: number): number {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  }
  return value
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function calculateLcDiscount(inputs: LcDiscountInputs): LcDiscountResult {
  const faceAmount = requireFinite(inputs.faceAmount, '信用证金额', 0.01, MAX_AMOUNT)
  const tenorDays = requireFinite(inputs.tenorDays, '远期天数', 1, 720)
  if (!Number.isInteger(tenorDays)) throw new Error('远期天数必须是整数天')
  const discountRatePercent = requireFinite(inputs.discountRatePercent, '贴现率', 0, 30)
  const acceptanceFeePercent = requireFinite(inputs.acceptanceFeePercent, '承兑手续费', 0, 5)
  const cableFee = requireFinite(inputs.cableFee, '邮电费', 0, faceAmount)
  const sightFeePercent = requireFinite(inputs.sightFeePercent, '即期综合费率', 0, 10)
  const currency = inputs.currency.trim().toUpperCase() || 'USD'

  const discountInterest = roundMoney(faceAmount * (discountRatePercent / 100) * (tenorDays / 360))
  const acceptanceFee = roundMoney(faceAmount * (acceptanceFeePercent / 100))
  const totalCost = roundMoney(discountInterest + acceptanceFee + cableFee)
  const netProceeds = roundMoney(faceAmount - totalCost)
  const effectiveAnnualRatePercent = roundMoney((totalCost / netProceeds) * (360 / tenorDays) * 100)
  const costToFacePercent = roundMoney((totalCost / faceAmount) * 100)

  const warnings: string[] = []
  if (discountRatePercent === 0 && acceptanceFeePercent === 0 && cableFee === 0) {
    warnings.push('三项费用均为 0，结果仅用于占位，请核对银行实际报价')
  }
  if (tenorDays > 180) {
    warnings.push('远期超过 180 天，部分银行按分段利率计息，实际成本可能更高')
  }
  if (effectiveAnnualRatePercent > 15) {
    warnings.push('实际年化成本偏高，建议与即期收款或出口押汇报价横向比较')
  }

  const sightEnabled = sightFeePercent > 0
  const sightNet = roundMoney(faceAmount * (1 - sightFeePercent / 100))
  const holdingCost = roundMoney(sightNet - netProceeds)
  let note: string
  if (!sightEnabled) {
    note = '未启用即期对比'
  } else if (holdingCost > 0) {
    note = `等待远期付款的机会成本约 ${holdingCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${currency}（占面值 ${roundMoney((holdingCost / faceAmount) * 100)}%）；若贵司资金成本低于该比例对应的年化水平，持有到期更划算`
  } else {
    note = '当前费率下贴现净额不低于即期净额，贴现方案占优'
  }

  return {
    faceAmount: roundMoney(faceAmount),
    currency,
    tenorDays,
    discountInterest,
    acceptanceFee,
    cableFee,
    totalCost,
    netProceeds,
    effectiveAnnualRatePercent,
    costToFacePercent,
    sightComparison: {
      enabled: sightEnabled,
      sightNet,
      holdingCost,
      breakEvenAmount: holdingCost,
      note,
    },
    warnings,
  }
}

export function buildLcDiscountSummary(result: LcDiscountResult): string {
  const money = (value: number) => value.toLocaleString('en-US', { minimumFractionDigits: 2 })
  return [
    `信用证金额 ${money(result.faceAmount)} ${result.currency}，远期 ${result.tenorDays} 天`,
    `贴现利息 ${money(result.discountInterest)} + 承兑费 ${money(result.acceptanceFee)} + 邮电费 ${money(result.cableFee)} = 总成本 ${money(result.totalCost)} ${result.currency}`,
    `到手净额 ${money(result.netProceeds)} ${result.currency}（成本占面值 ${result.costToFacePercent}%，实际年化 ${result.effectiveAnnualRatePercent}%）`,
    result.sightComparison.note,
  ].join('\n')
}

export const DEFAULT_LC_DISCOUNT_INPUTS: LcDiscountInputs = {
  faceAmount: 100000,
  currency: 'USD',
  tenorDays: 90,
  discountRatePercent: 4.5,
  acceptanceFeePercent: 0.125,
  cableFee: 100,
  sightFeePercent: 0.8,
}
