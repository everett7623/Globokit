// 名称: FOB/CIF 货代收费核对逻辑
// 描述: 按贸易条款、账单对象与用户基准价审计货代收费
// 路径: Globokit/lib/tools/freight-charge-audit.ts
// 作者: everettlabs
// 更新时间: 2026-07-22

export type FreightTradeTerm = 'FOB' | 'CIF'
export type FreightAuditCurrency = 'CNY' | 'USD'
export type FreightAuditParty = 'seller' | 'buyer'
export type ChargeResponsibility = 'seller' | 'buyer' | 'check'
export type ChargeAuditStatus = 'normal' | 'high' | 'wrong-party' | 'review' | 'missing-reference'

export type ChargeCategory =
  | 'origin-trucking'
  | 'export-customs'
  | 'origin-terminal'
  | 'booking-handling'
  | 'carrier-document'
  | 'ocean-freight'
  | 'cargo-insurance'
  | 'destination-charge'
  | 'import-customs-tax'
  | 'special-surcharge'
  | 'other'

export interface FreightChargeLine {
  id: string
  name: string
  category: ChargeCategory
  actual: number
  benchmark: number
}

export interface FreightAuditInput {
  term: FreightTradeTerm
  auditParty: FreightAuditParty
  currency: FreightAuditCurrency
  tolerancePercent: number
  lines: FreightChargeLine[]
}

export interface AuditedChargeLine extends FreightChargeLine {
  actual: number
  benchmark: number
  responsibility: ChargeResponsibility
  responsibilityLabel: string
  status: ChargeAuditStatus
  statusLabel: string
  difference: number
  differencePercent: number | null
  reviewAmount: number
  reason: string
}

export interface FreightAuditResult {
  term: FreightTradeTerm
  auditParty: FreightAuditParty
  currency: FreightAuditCurrency
  tolerancePercent: number
  actualTotal: number
  benchmarkTotal: number
  matchedResponsibilityTotal: number
  otherPartyResponsibilityTotal: number
  agreementReviewTotal: number
  reviewAmount: number
  highCount: number
  wrongPartyCount: number
  reviewCount: number
  missingReferenceCount: number
  normalCount: number
  lines: AuditedChargeLine[]
}

export const CHARGE_CATEGORY_OPTIONS: Array<{ value: ChargeCategory; label: string }> = [
  { value: 'origin-trucking', label: '起运地拖车/内装' },
  { value: 'export-customs', label: '出口报关' },
  { value: 'origin-terminal', label: '起运港码头/港杂' },
  { value: 'booking-handling', label: '订舱/操作费' },
  { value: 'carrier-document', label: '提单/文件/VGM' },
  { value: 'ocean-freight', label: '国际海运费' },
  { value: 'cargo-insurance', label: '货运保险' },
  { value: 'destination-charge', label: '目的港费用' },
  { value: 'import-customs-tax', label: '进口清关/税费' },
  { value: 'special-surcharge', label: '查验/仓储/异常附加' },
  { value: 'other', label: '其他费用' },
]

const RESPONSIBILITY_LABELS: Record<ChargeResponsibility, string> = {
  seller: '卖方通常承担',
  buyer: '买方通常承担',
  check: '需核对约定',
}

export const FREIGHT_AUDIT_PARTY_LABELS: Record<FreightAuditParty, string> = {
  seller: '出口卖方',
  buyer: '海外客户',
}

const STATUS_LABELS: Record<ChargeAuditStatus, string> = {
  normal: '正常',
  high: '高于基准',
  'wrong-party': '疑似错收费',
  review: '核对约定',
  'missing-reference': '缺少基准',
}

const RESPONSIBILITY_BY_TERM: Record<FreightTradeTerm, Record<ChargeCategory, ChargeResponsibility>> = {
  FOB: {
    'origin-trucking': 'seller',
    'export-customs': 'seller',
    'origin-terminal': 'seller',
    'booking-handling': 'check',
    'carrier-document': 'check',
    'ocean-freight': 'buyer',
    'cargo-insurance': 'buyer',
    'destination-charge': 'buyer',
    'import-customs-tax': 'buyer',
    'special-surcharge': 'check',
    other: 'check',
  },
  CIF: {
    'origin-trucking': 'seller',
    'export-customs': 'seller',
    'origin-terminal': 'seller',
    'booking-handling': 'check',
    'carrier-document': 'check',
    'ocean-freight': 'seller',
    'cargo-insurance': 'seller',
    'destination-charge': 'buyer',
    'import-customs-tax': 'buyer',
    'special-surcharge': 'check',
    other: 'check',
  },
}

function nonNegative(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function buildReason(
  status: ChargeAuditStatus,
  term: FreightTradeTerm,
  auditParty: FreightAuditParty,
  responsibility: ChargeResponsibility,
  line: FreightChargeLine,
  differencePercent: number | null,
  tolerancePercent: number,
) {
  if (status === 'wrong-party') return `${term} 下该费用${RESPONSIBILITY_LABELS[responsibility]}，与当前${FREIGHT_AUDIT_PARTY_LABELS[auditParty]}账单对象不一致，应核对收费依据。`
  if (status === 'high') return `实际收费比基准高 ${round(differencePercent ?? 0, 1)}%，超过 ${tolerancePercent}% 容差。`
  if (status === 'missing-reference') return '未填写同行价或约定价，暂时无法判断价格是否偏高。'
  if (status === 'review') return '费用归属取决于订舱、合同或异常原因，金额虽在基准容差内，仍需核对依据。'
  if (line.actual === 0) return '本次未收取该项费用。'
  return '责任归属明确，实际收费未超过基准价容差。'
}

export function getChargeResponsibility(term: FreightTradeTerm, category: ChargeCategory) {
  return RESPONSIBILITY_BY_TERM[term][category]
}

export function auditFreightCharges(input: FreightAuditInput): FreightAuditResult {
  const tolerancePercent = Math.min(100, nonNegative(input.tolerancePercent))
  const term: FreightTradeTerm = input.term === 'CIF' ? 'CIF' : 'FOB'
  const auditParty: FreightAuditParty = input.auditParty === 'buyer' ? 'buyer' : 'seller'
  const currency: FreightAuditCurrency = input.currency === 'USD' ? 'USD' : 'CNY'

  const lines = input.lines.map<AuditedChargeLine>((source) => {
    const actual = nonNegative(source.actual)
    const benchmark = nonNegative(source.benchmark)
    const responsibility = getChargeResponsibility(term, source.category)
    const difference = actual - benchmark
    const differencePercent = benchmark > 0 ? difference / benchmark * 100 : null
    const upperLimit = benchmark * (1 + tolerancePercent / 100)
    let status: ChargeAuditStatus = 'normal'

    if (actual > 0 && responsibility !== 'check' && responsibility !== auditParty) status = 'wrong-party'
    else if (actual > 0 && benchmark === 0) status = 'missing-reference'
    else if (actual > upperLimit) status = 'high'
    else if (actual > 0 && responsibility === 'check') status = 'review'

    const reviewAmount = status === 'wrong-party'
      ? actual
      : status === 'high' ? Math.max(0, difference) : 0

    const line = { ...source, actual, benchmark }
    return {
      ...line,
      responsibility,
      responsibilityLabel: RESPONSIBILITY_LABELS[responsibility],
      status,
      statusLabel: STATUS_LABELS[status],
      difference: round(difference),
      differencePercent,
      reviewAmount: round(reviewAmount),
      reason: buildReason(status, term, auditParty, responsibility, line, differencePercent, tolerancePercent),
    }
  })

  const sum = (values: AuditedChargeLine[]) => round(values.reduce((total, line) => total + line.actual, 0))
  return {
    term,
    auditParty,
    currency,
    tolerancePercent,
    actualTotal: sum(lines),
    benchmarkTotal: round(lines.reduce((total, line) => total + line.benchmark, 0)),
    matchedResponsibilityTotal: sum(lines.filter((line) => line.responsibility === auditParty)),
    otherPartyResponsibilityTotal: sum(lines.filter((line) => line.responsibility !== 'check' && line.responsibility !== auditParty)),
    agreementReviewTotal: sum(lines.filter((line) => line.responsibility === 'check')),
    reviewAmount: round(lines.reduce((total, line) => total + line.reviewAmount, 0)),
    highCount: lines.filter((line) => line.status === 'high').length,
    wrongPartyCount: lines.filter((line) => line.status === 'wrong-party').length,
    reviewCount: lines.filter((line) => line.status === 'review').length,
    missingReferenceCount: lines.filter((line) => line.status === 'missing-reference').length,
    normalCount: lines.filter((line) => line.status === 'normal').length,
    lines,
  }
}
