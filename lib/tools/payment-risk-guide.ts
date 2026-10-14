// 名称: 收款方式风险速查逻辑
// 描述: 外贸常见收款方式的风险等级、资金占用、适用场景与防坑要点，支持按风险与场景筛选
// 路径: Globokit/lib/tools/payment-risk-guide.ts
// 作者: everettlabs
// 更新时间: 2026-10-12

export type PaymentRiskLevel = 'low' | 'medium' | 'high' | 'very-high'

export type PaymentScenario = 'new-customer' | 'repeat-customer' | 'sample-order' | 'bulk-order'

export interface PaymentMethod {
  id: string
  name: string
  shortName: string
  riskLevel: PaymentRiskLevel
  /** 1–5，5 为资金占用最有利卖方（先收钱） */
  cashFlowScore: number
  /** 到账速度描述 */
  speed: string
  typicalCost: string
  scenarios: PaymentScenario[]
  summary: string
  tips: string[]
}

export const RISK_META: Record<PaymentRiskLevel, { label: string; className: string; description: string }> = {
  low: { label: '低风险', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-300', description: '银行信用或款到发货，收汇基本无忧' },
  medium: { label: '中风险', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-300/20 dark:bg-sky-300/10 dark:text-sky-300', description: '有银行信用或代收机制托底，单证需严谨' },
  high: { label: '高风险', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-300', description: '依赖买方商业信用，需控货权或投保' },
  'very-high': { label: '极高风险', className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-300/20 dark:bg-red-300/10 dark:text-red-300', description: '纯赊销，货权已交出，慎用' },
}

export const SCENARIO_META: Record<PaymentScenario, string> = {
  'new-customer': '新客户',
  'repeat-customer': '老客户',
  'sample-order': '样品/小单',
  'bulk-order': '大货订单',
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'tt-advance',
    name: 'T/T 全额预付（前 T/T）',
    shortName: '前 T/T',
    riskLevel: 'low',
    cashFlowScore: 5,
    speed: '1–3 个工作日',
    typicalCost: '电汇费由付款方承担，汇损约 0.1%–0.5%',
    scenarios: ['sample-order', 'new-customer', 'repeat-customer'],
    summary: '先收款后生产/发货，卖方零风险；买方承担全部信任成本，通常只用于样品单、小额定金或深度信任客户。',
    tips: [
      '大额预付客户往往要求折扣，可给 1%–3% 现金折扣换取全款预付',
      '收到水单不等于到账，凭银行入账通知再安排生产',
      '警惕伪造水单：以本行入账为准，不认客户转发截图',
    ],
  },
  {
    id: 'tt-deposit-balance',
    name: 'T/T 定金 + 尾款（30/70 等）',
    shortName: '定金+尾款',
    riskLevel: 'medium',
    cashFlowScore: 4,
    speed: '各 1–3 个工作日',
    typicalCost: '两笔电汇费 + 中间行扣费',
    scenarios: ['new-customer', 'repeat-customer', 'bulk-order'],
    summary: '外贸最主流方式：定金覆盖原料与启动成本，尾款节点决定风险敞口。发货前付清（前尾款）风险低，提单副本后付款存在拒付尾款可能。',
    tips: [
      '新客户定金不低于 30%，且尾款尽量谈「发货前付清」而非提单副本后',
      '提单副本后付款时保留货权：正本提单在手，或使用记名提单之外的指示提单',
      '尾款逾期立即触发催款流程，参考催款邮件生成器的分档话术',
    ],
  },
  {
    id: 'lc-sight',
    name: '即期信用证（L/C at sight）',
    shortName: '即期 L/C',
    riskLevel: 'medium',
    cashFlowScore: 3,
    speed: '交单审单后 5–10 个工作日',
    typicalCost: '开证行外费用约 0.5%–1.5%（议付费、邮电费、不符点费）',
    scenarios: ['new-customer', 'bulk-order'],
    summary: '银行信用替代买方信用，只要单证相符就能收汇。风险从「客户会不会赖账」转移为「单证有没有不符点」。',
    tips: [
      '收到证先审条款：软条款（客检证、指定船公司等）直接要求改证',
      '交单前用交单自查清单核对 27 项要点，一个不符点损失可能超过全部利润',
      '开证行资质要核：小银行、战乱国家开证行风险需投保出口信用保险',
    ],
  },
  {
    id: 'lc-usance',
    name: '远期信用证（L/C usance）',
    shortName: '远期 L/C',
    riskLevel: 'medium',
    cashFlowScore: 2,
    speed: '承兑后 N 天（30–180 天常见）',
    typicalCost: '承兑费 + 贴现息（年化 3%–8%）',
    scenarios: ['bulk-order'],
    summary: '银行承兑后到期付款，安全性同即期 L/C，但资金被占用。需要提前回款可贴现，用贴现计算器测算年化成本是否可接受。',
    tips: [
      '远期天数写进合同与发票，避免「见票后 90 天」与「提单后 90 天」的口径纠纷',
      '资金紧张时测算贴现成本：贴现年化 + 承兑费折年，与自有资金成本比较',
      '承兑电报到达后及时查证开证行承兑真实性',
    ],
  },
  {
    id: 'dp',
    name: '付款交单（D/P）',
    shortName: 'D/P',
    riskLevel: 'high',
    cashFlowScore: 2,
    speed: '代收行收到款后放单',
    typicalCost: '托收费 + 银行间划转费，约 0.1%–0.5%',
    scenarios: ['repeat-customer'],
    summary: '买方付款才能拿到提单，货权有保障；但若买方拒付，货物已到目的港，转卖或退运成本高昂。',
    tips: [
      '只对合作过的老客户使用，新客户慎用',
      '尽量走 D/P at sight 而非远期，缩短风险敞口',
      '投保出口信用保险可覆盖拒付风险，费率约 0.3%–1%',
    ],
  },
  {
    id: 'da',
    name: '承兑交单（D/A）',
    shortName: 'D/A',
    riskLevel: 'very-high',
    cashFlowScore: 1,
    speed: '买方承兑汇票到期付款',
    typicalCost: '托收费 + 汇票承兑相关费用',
    scenarios: [],
    summary: '买方承兑汇票即可提货，货权已交出，到期不付只能追讨。本质是赊销披着托收外衣，除非老客户且投保，否则不建议。',
    tips: [
      '如必须使用，务必投保信用保险并把赔款权益转让给融资银行',
      '控制单笔敞口：不超过与该客户年交易额的一定比例',
      '到期前 15 天发送提醒邮件，逾期立即进入催收程序',
    ],
  },
  {
    id: 'oa',
    name: '赊销（O/A，Open Account）',
    shortName: 'O/A',
    riskLevel: 'very-high',
    cashFlowScore: 1,
    speed: '约定账期后付款（30/60/90 天）',
    typicalCost: '汇款费用低，但融资/保险成本高',
    scenarios: [],
    summary: '纯信用销售，先发货后收款。大买家（商超、品牌方）常要求 O/A 60/90 天，议价能力强，卖方必须用信保+融资对冲。',
    tips: [
      '接 O/A 订单前先核定信用保险额度，无额度不做',
      '账期成本要计入报价：用收款账期成本对比工具折算实际利润',
      '逾期的第一周就启动催收，账龄越长回收率越低',
    ],
  },
  {
    id: 'paypal',
    name: 'PayPal / 西联 / MoneyGram',
    shortName: 'PayPal 等',
    riskLevel: 'medium',
    cashFlowScore: 4,
    speed: 'PayPal 即时，西联 1 小时内',
    typicalCost: 'PayPal 费率约 4.4% + 固定费，提现另计',
    scenarios: ['sample-order', 'new-customer'],
    summary: '适合样品费、小额定金等小额场景，到账快、买方操作简单；但 PayPal 买家保护政策偏卖方风险，大额慎用且手续费高。',
    tips: [
      'PayPal 单笔建议控制在 1000 USD 以内，避免买家发起退单仲裁',
      '发货地址必须与 PayPal 账户地址一致，否则拒付必输',
      '西联到账快但要留意姓名拼写，取款需凭收款人证件',
    ],
  },
]

export function getMethodsByRisk(level: PaymentRiskLevel): PaymentMethod[] {
  return PAYMENT_METHODS.filter((method) => method.riskLevel === level)
}

export function recommendMethods(scenario: PaymentScenario): PaymentMethod[] {
  const methods = PAYMENT_METHODS.filter((method) => method.scenarios.includes(scenario))
  return [...methods].sort((a, b) => b.cashFlowScore - a.cashFlowScore)
}

export function getPaymentStats(): { total: number; lowRisk: number; veryHighRisk: number } {
  return {
    total: PAYMENT_METHODS.length,
    lowRisk: PAYMENT_METHODS.filter((method) => method.riskLevel === 'low').length,
    veryHighRisk: PAYMENT_METHODS.filter((method) => method.riskLevel === 'very-high').length,
  }
}
