// 名称: 信用证交单自查清单逻辑
// 描述: 覆盖信用证条款、发票、提单、保险、单证与一致性六组审单要点，输出风险等级与英文改证片段
// 路径: Globokit/lib/tools/lc-discrepancy-checklist.ts
// 作者: everettlabs
// 更新时间: 2026-09-30

export type LcChecklistGroup = 'credit-terms' | 'invoice' | 'bill-of-lading' | 'insurance' | 'certificates' | 'consistency'

export type LcItemSeverity = 'critical' | 'major' | 'minor'

export type LcRiskLevel = 'high' | 'medium' | 'low'

export interface LcChecklistItem {
  id: string
  group: LcChecklistGroup
  text: string
  severity: LcItemSeverity
  hint?: string
  amendment?: string
}

export interface LcChecklistGroupMeta {
  id: LcChecklistGroup
  name: string
  description: string
}

export interface LcChecklistEvaluation {
  totalItems: number
  checkedCount: number
  completionPercent: number
  score: number
  riskLevel: LcRiskLevel
  riskLabel: string
  uncheckedCritical: LcChecklistItem[]
  uncheckedMajor: LcChecklistItem[]
  summary: string
  advice: string[]
}

export const LC_CHECKLIST_GROUPS: LcChecklistGroupMeta[] = [
  { id: 'credit-terms', name: '信用证条款', description: '效期、装运期、交单期与金额是否可执行' },
  { id: 'invoice', name: '商业发票', description: '抬头、金额与货物描述是否逐字对应' },
  { id: 'bill-of-lading', name: '提单', description: '清洁已装船、收发货人与份数是否合规' },
  { id: 'insurance', name: '保险单据', description: '投保加成、币种、险别与日期要求' },
  { id: 'certificates', name: '产地证与附加单证', description: '产地证类型与信用证要求的其他单证' },
  { id: 'consistency', name: '单证一致性', description: '唛头、编码、拼写与日期跨单据核对' },
]

export const LC_CHECKLIST_ITEMS: LcChecklistItem[] = [
  // 信用证条款
  {
    id: 'ct-expiry',
    group: 'credit-terms',
    text: '效期与效期地点已确认，交单地点在指定银行且预留寄单时间',
    severity: 'major',
    hint: '效期在中国之外的银行时，寄单在途时间会压缩交单窗口',
  },
  {
    id: 'ct-latest-shipment',
    group: 'credit-terms',
    text: '最迟装运期晚于预计发货日，且与生产周期匹配',
    severity: 'critical',
    hint: '装运期太紧是延期与拒付的常见源头',
    amendment: 'Please extend the latest shipment date and the expiry date of the credit to match the agreed production schedule.',
  },
  {
    id: 'ct-presentation',
    group: 'credit-terms',
    text: '交单期能在提单日后规定天数内完成（UCP600 默认 21 天）',
    severity: 'critical',
    hint: '信用证另行约定更短交单期时，备单时间必须提前核算',
    amendment: 'Please delete the restrictive presentation period clause and allow presentation within 21 days after the bill of lading date.',
  },
  {
    id: 'ct-amount',
    group: 'credit-terms',
    text: '信用证金额与合同一致，金额浮动条款（约/±%）符合约定',
    severity: 'critical',
    hint: '发票金额超过信用证金额即构成不符点',
    amendment: 'Please increase the credit amount to the full contract value and confirm the tolerance clause.',
  },
  { id: 'ct-partial', group: 'credit-terms', text: '分批装运与转运要求与物流方案一致', severity: 'major' },
  { id: 'ct-fees', group: 'credit-terms', text: '银行费用承担方（开证行外费用条款）已确认', severity: 'minor' },
  // 商业发票
  {
    id: 'inv-beneficiary',
    group: 'invoice',
    text: '发票抬头（受益人名称与地址）与信用证完全一致',
    severity: 'critical',
    hint: '公司英文名多一个逗号都可能被判不符',
    amendment: 'We confirm the beneficiary name and address on all documents will appear exactly as stated in the credit.',
  },
  {
    id: 'inv-amount',
    group: 'invoice',
    text: '发票金额不超过信用证金额，币种与信用证一致',
    severity: 'critical',
    amendment: 'Please confirm the currency of the credit matches the invoicing currency agreed in the contract.',
  },
  { id: 'inv-description', group: 'invoice', text: '货物描述与信用证条款逐字对应，未使用矛盾用语', severity: 'major' },
  { id: 'inv-signed', group: 'invoice', text: '发票签字/盖章与份数满足信用证要求', severity: 'minor' },
  // 提单
  {
    id: 'bl-clean',
    group: 'bill-of-lading',
    text: '提单为清洁已装船提单，无不良批注',
    severity: 'critical',
    hint: '不清洁提单几乎必然被拒付',
    amendment: 'Please accept clean shipped on board bills of lading as required under UCP600.',
  },
  {
    id: 'bl-consignee',
    group: 'bill-of-lading',
    text: '收货人、通知人与信用证一致，背书链完整正确',
    severity: 'critical',
    amendment: 'We confirm the consignee and notify party on the bill of lading will be made out exactly as required by the credit.',
  },
  { id: 'bl-ports', group: 'bill-of-lading', text: '装运港与卸货港符合信用证规定的范围', severity: 'major' },
  {
    id: 'bl-onboard',
    group: 'bill-of-lading',
    text: '已装船批注日期不晚于最迟装运期',
    severity: 'critical',
    amendment: 'Please extend the latest shipment date so that the on-board notation date remains within the credit terms.',
  },
  { id: 'bl-copies', group: 'bill-of-lading', text: '提单正本/副本份数满足信用证要求（常见全套 3/3）', severity: 'major' },
  { id: 'bl-freight', group: 'bill-of-lading', text: '运费预付/到付批注与价格条款（CIF/FOB）一致', severity: 'major' },
  // 保险单据
  {
    id: 'ins-amount',
    group: 'insurance',
    text: '投保金额不少于 CIF 或发票金额的 110%',
    severity: 'critical',
    amendment: 'We confirm the insurance document will be issued for at least 110% of the CIF value as required by the credit.',
  },
  { id: 'ins-currency', group: 'insurance', text: '保险单据币种与信用证币种一致', severity: 'major' },
  { id: 'ins-clause', group: 'insurance', text: '险别与保险条款（如 ICC A）满足信用证要求', severity: 'major' },
  {
    id: 'ins-date',
    group: 'insurance',
    text: '保险签发日期不晚于提单装运日期',
    severity: 'critical',
    hint: '保险日期晚于提单日需加注承担生效批注，否则构成不符点',
    amendment: 'We confirm the insurance document will be dated no later than the date of shipment.',
  },
  // 产地证与附加单证
  { id: 'cert-co', group: 'certificates', text: '产地证类型（CO/FORM A/E 等）与信用证要求一致', severity: 'major' },
  { id: 'cert-packing', group: 'certificates', text: '装箱单毛净重、件数与提单、发票一致', severity: 'major' },
  { id: 'cert-extra', group: 'certificates', text: '信用证要求的附加单证（熏蒸、检验、MSDS 等）已齐备', severity: 'major' },
  // 单证一致性
  { id: 'cons-marks', group: 'consistency', text: '唛头在发票、箱单、提单上完全一致', severity: 'minor' },
  { id: 'cons-hs', group: 'consistency', text: 'HS 编码在各单据之间保持一致', severity: 'minor' },
  { id: 'cons-spelling', group: 'consistency', text: '客户、港口、船名拼写与信用证完全一致', severity: 'major' },
  { id: 'cons-dates', group: 'consistency', text: '各单据日期逻辑合理（发票 ≤ 提单 ≤ 交单日）', severity: 'major' },
]

export const SEVERITY_WEIGHTS: Record<LcItemSeverity, number> = {
  critical: 10,
  major: 5,
  minor: 2,
}

const RISK_LABELS: Record<LcRiskLevel, string> = {
  high: '高风险：暂缓交单',
  medium: '中风险：补齐后再交单',
  low: '低风险：可以交单',
}

function countSeverity(items: LcChecklistItem[], severity: LcItemSeverity): number {
  return items.filter((item) => item.severity === severity).length
}

export function evaluateLcChecklist(checkedIds: string[]): LcChecklistEvaluation {
  const checked = new Set(checkedIds.filter((id) => LC_CHECKLIST_ITEMS.some((item) => item.id === id)))
  const totalItems = LC_CHECKLIST_ITEMS.length
  const checkedCount = checked.size
  const uncheckedItems = LC_CHECKLIST_ITEMS.filter((item) => !checked.has(item.id))
  const uncheckedCritical = uncheckedItems.filter((item) => item.severity === 'critical')
  const uncheckedMajor = uncheckedItems.filter((item) => item.severity === 'major')

  const totalScore = LC_CHECKLIST_ITEMS.reduce((sum, item) => sum + SEVERITY_WEIGHTS[item.severity], 0)
  const earnedScore = LC_CHECKLIST_ITEMS.reduce(
    (sum, item) => (checked.has(item.id) ? sum + SEVERITY_WEIGHTS[item.severity] : sum),
    0
  )
  const score = Math.round((earnedScore / totalScore) * 100)
  const completionPercent = Math.round((checkedCount / totalItems) * 100)

  let riskLevel: LcRiskLevel
  if (uncheckedCritical.length > 0 || score < 70) {
    riskLevel = 'high'
  } else if (score >= 95) {
    riskLevel = 'low'
  } else {
    riskLevel = 'medium'
  }

  const advice: string[] = []
  if (uncheckedCritical.length > 0) {
    advice.push(`交单前必须先解决 ${uncheckedCritical.length} 项致命项，任何一项未勾都可能直接拒付`)
  }
  if (score < 70) {
    advice.push('整体完成度偏低，建议按单证组逐项补齐后再预约交单')
  } else if (riskLevel === 'medium') {
    advice.push(`核心条款已核对，交单前建议完成剩余 ${uncheckedMajor.length} 项重要项复核`)
  } else {
    advice.push('清单已全部核对，交单时保留全套副本与银行交单回执备查')
  }
  if (uncheckedCritical.length > 0) {
    advice.push('涉及信用证条款本身的缺陷，优先让申请人改证而不是冒险交单')
  }

  return {
    totalItems,
    checkedCount,
    completionPercent,
    score,
    riskLevel,
    riskLabel: RISK_LABELS[riskLevel],
    uncheckedCritical,
    uncheckedMajor,
    summary: `共 ${totalItems} 项，已核对 ${checkedCount} 项（${completionPercent}%），得分 ${score} 分`,
    advice,
  }
}

export function generateLcAmendmentRequests(uncheckedCritical: LcChecklistItem[], creditNo = ''): string[] {
  const prefix = creditNo.trim() ? `Re L/C No. ${creditNo.trim()}: ` : ''
  return uncheckedCritical
    .map((item) => item.amendment)
    .filter((sentence): sentence is string => Boolean(sentence))
    .map((sentence) => `${prefix}${sentence}`)
}

export function getLcGroupItems(group: LcChecklistGroup): LcChecklistItem[] {
  return LC_CHECKLIST_ITEMS.filter((item) => item.group === group)
}

export function getLcStats(): { total: number; critical: number; major: number; minor: number } {
  return {
    total: LC_CHECKLIST_ITEMS.length,
    critical: countSeverity(LC_CHECKLIST_ITEMS, 'critical'),
    major: countSeverity(LC_CHECKLIST_ITEMS, 'major'),
    minor: countSeverity(LC_CHECKLIST_ITEMS, 'minor'),
  }
}
