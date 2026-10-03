// 名称: 出口货物保险费计算逻辑
// 描述: 按 FOB/CFR/CIF 口径换算 CIF、投保金额与保险费，支持投保加成与战争险附加费率
// 路径: Globokit/lib/tools/cargo-insurance-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-09-30

export type InsurancePriceBasis = 'FOB' | 'CFR' | 'CIF'

export type InsurancePresetId = 'ocean-container' | 'air-cargo' | 'cif-with-war-risk'

export interface CargoInsuranceInputs {
  priceBasis: InsurancePriceBasis
  amount: number
  freightAmount: number
  markupPercent: number
  premiumRatePercent: number
  warRiskRatePercent: number
  currency: string
}

export interface CargoInsurancePreset extends Omit<CargoInsuranceInputs, 'currency'> {
  id: InsurancePresetId
  name: string
  description: string
}

export interface CargoInsuranceResult {
  priceBasis: InsurancePriceBasis
  currency: string
  cifValue: number
  insuredAmount: number
  basePremium: number
  warRiskPremium: number
  totalPremium: number
  effectivePremiumRateOnCif: number
  insuredPercentOfCif: number
  basisNote: string
  warnings: string[]
}

export const INSURANCE_PRESETS: CargoInsurancePreset[] = [
  {
    id: 'ocean-container',
    name: '集装箱海运',
    description: 'FOB 报价加海运费，0.08% 基本险费率',
    priceBasis: 'FOB',
    amount: 50000,
    freightAmount: 2200,
    markupPercent: 10,
    premiumRatePercent: 0.08,
    warRiskRatePercent: 0,
  },
  {
    id: 'air-cargo',
    name: '空运高值货',
    description: 'FOB 报价加空运费，0.1% 费率',
    priceBasis: 'FOB',
    amount: 12000,
    freightAmount: 900,
    markupPercent: 10,
    premiumRatePercent: 0.1,
    warRiskRatePercent: 0,
  },
  {
    id: 'cif-with-war-risk',
    name: 'CIF 含战争险',
    description: 'CIF 直保，基本险 0.08% + 战争险 0.03%',
    priceBasis: 'CIF',
    amount: 30000,
    freightAmount: 0,
    markupPercent: 10,
    premiumRatePercent: 0.08,
    warRiskRatePercent: 0.03,
  },
]

export const DEFAULT_CARGO_INSURANCE_INPUTS: CargoInsuranceInputs = {
  ...INSURANCE_PRESETS[0],
  currency: 'USD',
}

const MAX_INSURED_AMOUNT = 1_000_000_000

function requireFinite(value: number, label: string, min: number, max: number): number {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  }
  return value
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

function buildBasisNote(priceBasis: InsurancePriceBasis): string {
  if (priceBasis === 'FOB') return '按 FOB 金额加海运费换算 CIF 后投保，保费由卖方另行支付'
  if (priceBasis === 'CFR') return '按 CFR 金额换算 CIF 后投保，保费由卖方另行支付'
  return '按 CIF 金额直接投保，保费已含在货价中由卖方承担'
}

export function calculateCargoInsurance(inputs: CargoInsuranceInputs): CargoInsuranceResult {
  const priceBasis = inputs.priceBasis
  if (priceBasis !== 'FOB' && priceBasis !== 'CFR' && priceBasis !== 'CIF') {
    throw new Error('价格条款必须是 FOB、CFR 或 CIF')
  }
  const amount = requireFinite(inputs.amount, '货值金额', 0.01, MAX_INSURED_AMOUNT)
  const markupPercent = requireFinite(inputs.markupPercent, '投保加成', 0, 50)
  const premiumRatePercent = requireFinite(inputs.premiumRatePercent, '保险费率', 0, 10)
  const warRiskRatePercent = requireFinite(inputs.warRiskRatePercent, '战争险费率', 0, 10)
  const currency = inputs.currency.trim().toUpperCase() || 'USD'

  const warnings: string[] = []
  let freightAmount = 0
  if (priceBasis === 'FOB') {
    freightAmount = requireFinite(inputs.freightAmount, '海运费', 0, MAX_INSURED_AMOUNT)
    if (freightAmount === 0) warnings.push('FOB 口径未填写海运费，当前按 CFR 换算，仅适合已代付运费核对场景')
  }

  const totalRate = (premiumRatePercent + warRiskRatePercent) / 100
  const insuredFactor = 1 + markupPercent / 100
  const denominator = 1 - insuredFactor * totalRate

  let cifValue: number
  if (priceBasis === 'CIF') {
    cifValue = amount
  } else {
    if (denominator <= 0.1) {
      throw new Error('投保加成与费率组合过高，无法换算出合理的 CIF 价格，请核对费率单位（应为百分数）')
    }
    cifValue = (amount + freightAmount) / denominator
  }

  const insuredAmount = roundMoney(cifValue * insuredFactor)
  const basePremium = roundMoney(insuredAmount * (premiumRatePercent / 100))
  const warRiskPremium = roundMoney(insuredAmount * (warRiskRatePercent / 100))
  const totalPremium = roundMoney(basePremium + warRiskPremium)
  const roundedCif = roundMoney(cifValue)

  if (warRiskRatePercent > 0) warnings.push('战争险与罢工险按附加费率单独计费，出运前需向保险公司确认是否承保')
  if (priceBasis === 'CIF' && markupPercent > 0) {
    warnings.push(`CIF 口径下投保金额为货值的 ${Math.round(insuredFactor * 100)}%，超出部分用于覆盖买方预期利润`)
  }

  return {
    priceBasis,
    currency,
    cifValue: roundedCif,
    insuredAmount,
    basePremium,
    warRiskPremium,
    totalPremium,
    effectivePremiumRateOnCif: roundMoney((totalPremium / roundedCif) * 100),
    insuredPercentOfCif: roundMoney(insuredFactor * 100),
    basisNote: buildBasisNote(priceBasis),
    warnings,
  }
}

export function createInsuranceInputsFromPreset(presetId: InsurancePresetId, currency = 'USD'): CargoInsuranceInputs {
  const preset = INSURANCE_PRESETS.find((item) => item.id === presetId)
  if (!preset) throw new Error('未找到保险费预设')
  return {
    priceBasis: preset.priceBasis,
    amount: preset.amount,
    freightAmount: preset.freightAmount,
    markupPercent: preset.markupPercent,
    premiumRatePercent: preset.premiumRatePercent,
    warRiskRatePercent: preset.warRiskRatePercent,
    currency,
  }
}
