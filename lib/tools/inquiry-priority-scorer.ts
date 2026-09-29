// 名称: 外贸询盘优先级评估逻辑
// 描述: 按询盘信息完整度、客户可信度与商务价值打分，输出优先级、缺失信息清单与追问话术
// 路径: Globokit/lib/tools/inquiry-priority-scorer.ts
// 作者: everettlabs
// 更新时间: 2026-09-18

export interface InquiryInputs {
  /** 是否写明具体采购数量 */
  hasQuantity: boolean
  /** 是否写明目标价格或价格区间 */
  hasTargetPrice: boolean
  /** 是否写明确切规格、型号或材质 */
  hasSpecification: boolean
  /** 是否写明贸易术语（FOB/CIF 等） */
  hasIncoterm: boolean
  /** 是否写明目的港或交付地 */
  hasDestination: boolean
  /** 是否写明期望交期 */
  hasLeadTime: boolean
  /** 是否写明付款方式 */
  hasPaymentTerm: boolean
  /** 是否来自公司域名邮箱 */
  corporateEmail: boolean
  /** 是否附公司名称与网站 */
  hasCompanyProfile: boolean
  /** 询盘是否针对具体型号而非泛泛求报价 */
  specificSku: boolean
  /** 是否提到已有供应商或在比价 */
  comparingSuppliers: boolean
  /** 是否索取样品 */
  requestedSample: boolean
  /** 是否索取正式报价单或形式发票 */
  requestedQuotation: boolean
  /** 询盘正文段落数（用于判断认真程度） */
  messageLength: number
  /** 是否由老客户或二次询盘引入 */
  existingCustomer: boolean
  /** 已知客户年采购规模（万美元），未知按 0 计 */
  annualVolumeUsd: number
}

export interface InquiryCriterion {
  id: string
  label: string
  hit: boolean
  weight: number
  note: string
}

export interface InquiryMissingItem {
  label: string
  prompt: string
  promptEn: string
}

export interface InquiryScoreResult {
  /** 0-100 总分 */
  total: number
  level: 'high' | 'medium' | 'low'
  levelLabel: string
  /** 建议的首次响应时限（小时） */
  responseWithinHours: number
  criteria: InquiryCriterion[]
  missing: InquiryMissingItem[]
  hits: InquiryCriterion[]
  /** 商务价值提示 */
  volumeNote: string
}

export const INQUIRY_CRITERIA: readonly { id: string; label: string; weight: number; note: string }[] = [
  { id: 'quantity', label: '明确采购数量', weight: 10, note: '有数量才能报价与排产' },
  { id: 'specificSku', label: '指向具体型号', weight: 9, note: '型号明确说明做过功课' },
  { id: 'specification', label: '规格参数完整', weight: 9, note: '缺少规格容易反复确认' },
  { id: 'destination', label: '目的港或交付地', weight: 7, note: '影响运费与条款选择' },
  { id: 'incoterm', label: '贸易术语明确', weight: 6, note: '决定成本边界' },
  { id: 'leadTime', label: '期望交期', weight: 5, note: '判断是否在产能窗口内' },
  { id: 'targetPrice', label: '目标价格或预算', weight: 5, note: '帮助判断价格弹性' },
  { id: 'paymentTerm', label: '付款方式', weight: 5, note: '关联资金占用与风险' },
  { id: 'corporateEmail', label: '公司域名邮箱', weight: 8, note: '降低诈骗与垃圾询盘概率' },
  { id: 'companyProfile', label: '附带公司信息', weight: 8, note: '便于核查背景与规模' },
  { id: 'requestedQuotation', label: '索取正式报价', weight: 7, note: '进入采购流程的信号' },
  { id: 'requestedSample', label: '索取样品', weight: 4, note: '推进意愿较强但成本较高' },
  { id: 'comparingSuppliers', label: '正在比价', weight: 3, note: '存在竞争但机会明确' },
  { id: 'existingCustomer', label: '老客户或返单', weight: 6, note: '成交概率显著更高' },
]

export const DEFAULT_INQUIRY_INPUTS: InquiryInputs = {
  hasQuantity: true,
  hasTargetPrice: false,
  hasSpecification: true,
  hasIncoterm: false,
  hasDestination: true,
  hasLeadTime: false,
  hasPaymentTerm: false,
  corporateEmail: true,
  hasCompanyProfile: false,
  specificSku: true,
  comparingSuppliers: true,
  requestedSample: false,
  requestedQuotation: true,
  messageLength: 3,
  existingCustomer: false,
  annualVolumeUsd: 0,
}

const MISSING_PROMPTS: Record<string, { prompt: string; promptEn: string }> = {
  quantity: {
    prompt: '请确认本次采购数量与后续返单预期数量。',
    promptEn: 'Could you confirm the quantity for this order and your expected reorder volume?',
  },
  targetPrice: {
    prompt: '方便的话请提供目标价或预算区间，我们据此调整配置方案。',
    promptEn: 'Could you share your target price or budget range so we can adjust the configuration?',
  },
  specification: {
    prompt: '请补充规格、型号或材质要求，便于我们给出对应报价。',
    promptEn: 'Could you specify the model, size or material requirements so we can quote accordingly?',
  },
  incoterm: {
    prompt: '请问本次按哪种贸易术语报价（EXW / FOB / CIF / DDP）？',
    promptEn: 'Which Incoterm would you like us to quote (EXW / FOB / CIF / DDP)?',
  },
  destination: {
    prompt: '请提供目的港或交付地址，用于核算运费与到门成本。',
    promptEn: 'Please share the destination port or delivery address for freight calculation.',
  },
  leadTime: {
    prompt: '请问期望交期或需货日期是什么时候？',
    promptEn: 'What is your expected delivery date or required lead time?',
  },
  paymentTerm: {
    prompt: '请确认付款方式（T/T 预付款比例、L/C 或平台托管）。',
    promptEn: 'Could you confirm your payment terms (T/T deposit, L/C, or platform escrow)?',
  },
  corporateEmail: {
    prompt: '建议使用公司邮箱沟通，方便我们走正式报价与合同流程。',
    promptEn: 'A company email address helps us proceed with the formal quotation and contract.',
  },
  companyProfile: {
    prompt: '能否提供公司名称与网站，我们可先登记客户档案再出报价。',
    promptEn: 'Could you share your company name and website so we can register your account?',
  },
  specificSku: {
    prompt: '请指明具体型号或图纸编号，避免泛泛询价影响报价精度。',
    promptEn: 'Please indicate the specific model or drawing number for an accurate quotation.',
  },
}

function requireBoolean(value: unknown, label: string): boolean {
  if (typeof value !== 'boolean') throw new Error(label + '必须是明确的勾选状态')
  return value
}

/** 评估单条询盘的优先级，返回总分、等级、缺失信息与回应时限 */
export function scoreInquiry(inputs: InquiryInputs): InquiryScoreResult {
  const messageLength = Number.isFinite(inputs.messageLength) ? Math.max(0, Math.floor(inputs.messageLength)) : 0
  const annualVolumeUsd = Number.isFinite(inputs.annualVolumeUsd) && inputs.annualVolumeUsd > 0 ? inputs.annualVolumeUsd : 0

  const flags: Record<string, boolean> = {
    quantity: requireBoolean(inputs.hasQuantity, '采购数量'),
    targetPrice: requireBoolean(inputs.hasTargetPrice, '目标价格'),
    specification: requireBoolean(inputs.hasSpecification, '规格参数'),
    incoterm: requireBoolean(inputs.hasIncoterm, '贸易术语'),
    destination: requireBoolean(inputs.hasDestination, '目的港'),
    leadTime: requireBoolean(inputs.hasLeadTime, '期望交期'),
    paymentTerm: requireBoolean(inputs.hasPaymentTerm, '付款方式'),
    corporateEmail: requireBoolean(inputs.corporateEmail, '公司邮箱'),
    companyProfile: requireBoolean(inputs.hasCompanyProfile, '公司信息'),
    specificSku: requireBoolean(inputs.specificSku, '具体型号'),
    comparingSuppliers: requireBoolean(inputs.comparingSuppliers, '比价状态'),
    requestedSample: requireBoolean(inputs.requestedSample, '样品申请'),
    requestedQuotation: requireBoolean(inputs.requestedQuotation, '报价要求'),
    existingCustomer: requireBoolean(inputs.existingCustomer, '老客户标记'),
  }

  const criteria: InquiryCriterion[] = INQUIRY_CRITERIA.map((criterion) => ({
    id: criterion.id,
    label: criterion.label,
    weight: criterion.weight,
    hit: flags[criterion.id] === true,
    note: criterion.note,
  }))

  // 正文篇幅作为认真程度的补充信号，最多加 6 分
  const lengthBonus = Math.min(messageLength, 6)
  const rawTotal = criteria.reduce((sum, item) => sum + (item.hit ? item.weight : 0), 0) + lengthBonus
  const total = Math.max(0, Math.min(100, rawTotal))

  const level: InquiryScoreResult['level'] = total >= 70 ? 'high' : total >= 45 ? 'medium' : 'low'
  const levelLabel = level === 'high' ? '高优先级' : level === 'medium' ? '中优先级' : '低优先级'
  const responseWithinHours = level === 'high' ? 4 : level === 'medium' ? 12 : 24

  const missing: InquiryMissingItem[] = criteria
    .filter((criterion) => !criterion.hit && MISSING_PROMPTS[criterion.id] !== undefined)
    .map((criterion) => ({ label: criterion.label, ...MISSING_PROMPTS[criterion.id] }))

  const volumeNote =
    annualVolumeUsd >= 100
      ? '客户年采购规模在 100 万美元以上，建议由业务主管跟进并准备阶梯报价。'
      : annualVolumeUsd >= 20
        ? '客户具备中等采购规模，可提供阶梯价与账期方案争取长期合作。'
        : annualVolumeUsd > 0
          ? '客户规模较小，优先按标准报价与最小起订量沟通。'
          : '客户年采购规模未知，建议在首次回复中顺带询问年度需求量。'

  return {
    total,
    level,
    levelLabel,
    responseWithinHours,
    criteria,
    missing,
    hits: criteria.filter((criterion) => criterion.hit),
    volumeNote,
  }
}

/** 生成可直接粘贴到邮件的中文追问清单 */
export function buildInquiryFollowUp(result: InquiryScoreResult, language: 'zh' | 'en' = 'zh'): string {
  if (result.missing.length === 0) {
    return language === 'en'
      ? 'All key details are provided. Proceed with the formal quotation.'
      : '询盘信息已基本齐全，可直接进入报价流程。'
  }
  const lines = result.missing.map((item, index) =>
    language === 'en'
      ? index + 1 + '. ' + item.promptEn
      : index + 1 + '. ' + item.prompt
  )
  const header = language === 'en'
    ? 'To prepare an accurate quotation, could you confirm the following:'
    : '为了给出准确报价，还想确认以下几点：'
  return [header, ...lines].join(String.fromCharCode(10))
}

/** 按分数给出跟进节奏建议 */
export function describeInquiryCadence(level: InquiryScoreResult['level']): string {
  if (level === 'high') return '4 小时内首次回复，24 小时内给出正式报价，2 天后电话或语音跟进。'
  if (level === 'medium') return '12 小时内首次回复，补齐缺失信息后再报价，3 天后跟进一次。'
  return '24 小时内模板化回复并索取关键信息，5 天后仍未补齐则转入长期培育。'
}

