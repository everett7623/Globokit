// 名称: 催款邮件生成逻辑
// 描述: 按逾期天数分四档语气生成英文催款邮件，输出主题、正文与催收节奏建议
// 路径: Globokit/lib/tools/payment-reminder-generator.ts
// 作者: everettlabs
// 更新时间: 2026-10-10

export type ReminderStage = 'friendly' | 'first' | 'second' | 'final'

export interface ReminderStageMeta {
  id: ReminderStage
  label: string
  range: string
  tone: string
  action: string
}

export interface PaymentReminderInput {
  customerName: string
  invoiceNo: string
  amount: number
  currency: string
  dueDate: string
  overdueDays: number
  paymentTerms?: string
  senderName?: string
}

export interface ReminderEmail {
  stage: ReminderStage
  stageLabel: string
  subject: string
  body: string
  toneNote: string
  tips: string[]
}

export const REMINDER_STAGES: ReminderStageMeta[] = [
  { id: 'friendly', label: '友好对账提醒', range: '逾期 1–3 天', tone: '假设对方只是遗漏，重点维护关系', action: '礼貌确认付款安排与水单' },
  { id: 'first', label: '首次正式催款', range: '逾期 4–10 天', tone: '明确引用合同条款，给出明确付款期限', action: '要求 7 天内付款并附上发票' },
  { id: 'second', label: '二次严肃催款', range: '逾期 11–21 天', tone: '指出逾期后果（信用、滞纳金），升级至决策人', action: '抄送对方财务与采购负责人' },
  { id: 'final', label: '最后通牒', range: '逾期 22 天以上', tone: '声明保留法律与信用保险追索权利', action: '评估暂停出货与信保报损' },
]

export const STAGE_BY_ID: Record<ReminderStage, ReminderStageMeta> = Object.fromEntries(
  REMINDER_STAGES.map((stage) => [stage.id, stage])
) as Record<ReminderStage, ReminderStageMeta>

export function recommendStage(overdueDays: number): ReminderStage {
  if (overdueDays <= 3) return 'friendly'
  if (overdueDays <= 10) return 'first'
  if (overdueDays <= 21) return 'second'
  return 'final'
}

function requireValidInput(input: PaymentReminderInput): void {
  if (!input.customerName.trim()) throw new Error('客户名称不能为空')
  if (!input.invoiceNo.trim()) throw new Error('发票号不能为空')
  if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error('发票金额必须大于 0')
  if (!input.currency.trim()) throw new Error('币种不能为空')
  if (!input.dueDate.trim()) throw new Error('付款到期日不能为空')
  if (!Number.isFinite(input.overdueDays) || input.overdueDays < 0 || input.overdueDays > 3650 || !Number.isInteger(input.overdueDays)) {
    throw new Error('逾期天数必须是 0 到 3650 之间的整数')
  }
}

function formatAmount(amount: number, currency: string): string {
  return `${currency.trim().toUpperCase()} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function generateReminderEmail(rawInput: PaymentReminderInput, stage: ReminderStage): ReminderEmail {
  requireValidInput(rawInput)
  const stageMeta = STAGE_BY_ID[stage]
  const customer = rawInput.customerName.trim()
  const invoiceNo = rawInput.invoiceNo.trim()
  const amount = formatAmount(rawInput.amount, rawInput.currency)
  const dueDate = rawInput.dueDate.trim()
  const terms = rawInput.paymentTerms?.trim() || 'the agreed payment terms'
  const sender = rawInput.senderName?.trim() || '[Your Name]'
  const overdue = rawInput.overdueDays
  const pastDueText = overdue > 0 ? `${overdue} day${overdue === 1 ? '' : 's'} past due` : 'due today'
  const tips = buildTips(stage)

  const templates: Record<ReminderStage, { subject: string; body: string }> = {
    friendly: {
      subject: `Friendly Reminder: Invoice ${invoiceNo} (${amount}) Due ${dueDate}`,
      body: [
        `Dear ${customer},`,
        '',
        `Hope everything is going well on your side.`,
        '',
        `This is a gentle reminder that invoice ${invoiceNo} for ${amount} was due on ${dueDate} and is now ${pastDueText}. We have not yet received the payment or the bank slip.`,
        '',
        `Could you please help confirm the payment schedule, or share the wire transfer receipt if the payment has already been arranged?`,
        '',
        `Thank you for your kind attention, and we look forward to continued cooperation.`,
        '',
        'Best regards,',
        sender,
      ].join('\n'),
    },
    first: {
      subject: `Payment Overdue: Invoice ${invoiceNo} (${amount}) — ${overdue} Days Past Due`,
      body: [
        `Dear ${customer},`,
        '',
        `We are writing to follow up on invoice ${invoiceNo} for ${amount}, which was due on ${dueDate} under ${terms}. As of today the payment remains outstanding and the invoice is ${pastDueText}.`,
        '',
        `We would appreciate it if you could arrange the payment within 7 days and send us the bank slip once the transfer is made.`,
        '',
        `Please let us know immediately if there is any issue with the invoice or if you need a duplicate copy for your accounting team.`,
        '',
        'Best regards,',
        sender,
      ].join('\n'),
    },
    second: {
      subject: `URGENT: Second Notice — Invoice ${invoiceNo} Overdue by ${overdue} Days`,
      body: [
        `Dear ${customer},`,
        '',
        `Despite our previous reminder regarding invoice ${invoiceNo} (${amount}), the payment is still outstanding — now ${overdue} days past the due date of ${dueDate}.`,
        '',
        `Please treat this matter as urgent. We kindly ask your finance team to release the payment within 5 business days. Delayed settlement affects our production scheduling for your future orders.`,
        '',
        `We would also appreciate a confirmed payment date in writing. If payment is not received by then, we may have to apply late payment charges as agreed in ${terms} and reconsider credit terms for upcoming orders.`,
        '',
        'We value our partnership and trust this can be resolved promptly.',
        '',
        'Best regards,',
        sender,
      ].join('\n'),
    },
    final: {
      subject: `FINAL DEMAND: Invoice ${invoiceNo} — ${overdue} Days Overdue (${amount})`,
      body: [
        `Dear ${customer},`,
        '',
        `This is a final demand for payment of invoice ${invoiceNo} in the amount of ${amount}, which has been outstanding for ${overdue} days beyond the due date of ${dueDate}.`,
        '',
        `All previous reminders have not resulted in settlement. We therefore require full payment within 7 days of this notice.`,
        '',
        `Please be advised that if payment is not received within this period, we will:`,
        `- suspend any pending orders and shipments;`,
        `- charge late payment interest as stipulated in ${terms};`,
        `- reserve the right to file a claim under credit insurance and take further legal action to recover the debt.`,
        '',
        `We sincerely hope to avoid these steps and remain open to discussing a payment plan if you are facing temporary difficulties.`,
        '',
        'Regards,',
        sender,
      ].join('\n'),
    },
  }

  return {
    stage,
    stageLabel: stageMeta.label,
    subject: templates[stage].subject,
    body: templates[stage].body,
    toneNote: stageMeta.tone,
    tips,
  }
}

function buildTips(stage: ReminderStage): string[] {
  const base = [
    '邮件主题保留发票号与金额，方便客户财务直接检索对应账单。',
    '发送前把 [Your Name] 替换为自己署名，并确认附件里已带上发票与对账单。',
  ]
  if (stage === 'friendly') {
    return [...base, '先私聊确认再发邮件，很多逾期只是对方财务流程卡住。']
  }
  if (stage === 'first') {
    return [...base, '同步抄送自己公司财务，记录催收时间线，为后续升级留痕。']
  }
  if (stage === 'second') {
    return [...base, '此阶段建议抄送对方采购与财务负责人，把催款从事务层面升级到管理层。']
  }
  return [
    ...base,
    '投保出口信用保险的订单，达到报损期限前务必提交可能损失通知，避免错过索赔窗口。',
    '最后通牒发出前先评估客户价值与翻盘可能，必要时改为电话谈判付款计划。',
  ]
}

export function buildReminderPlainText(email: ReminderEmail): string {
  return `Subject: ${email.subject}\n\n${email.body}`
}
