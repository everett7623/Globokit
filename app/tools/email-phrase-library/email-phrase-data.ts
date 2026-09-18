// 名称: 外贸邮件话术库数据
// 描述: 按业务场景组织的外贸英文邮件常用话术，附中文对照
// 路径: Globokit/app/tools/email-phrase-library/email-phrase-data.ts
// 作者: everettlabs
// 更新时间: 2026-09-16

export interface EmailPhrase {
  id: string
  subject: string
  body: string
  note: string
}

export interface EmailPhraseScenario {
  id: string
  label: string
  description: string
  phrases: EmailPhrase[]
}

export const EMAIL_PHRASE_SCENARIOS: EmailPhraseScenario[] = [
  {
    id: 'cold-outreach',
    label: '客户开发',
    description: '首次触达潜在客户的开场话术',
    phrases: [
      {
        id: 'cold-intro',
        subject: 'Subject: Reliable {product} supplier from China',
        body: 'Hi {name},\n\nI’m {your name} from {company}, a manufacturer of {product} with over {years} years of export experience. We currently supply {reference market} and noticed your range of {customer product line}.\n\nWould you be open to receiving our latest catalog and price list for reference?\n\nBest regards,\n{your name}',
        note: '开发信保持 100 词以内，突出与客户产品线的关联，结尾用低门槛提问降低回复压力。',
      },
      {
        id: 'cold-followup',
        subject: 'Subject: Re: {product} supplier — quick follow-up',
        body: 'Hi {name},\n\nJust following up on my previous email. If the timing isn’t right, I’m happy to check back in {period}.\n\nMeanwhile, here is a one-page overview of our best-selling {product} for your reference: {link}\n\nBest regards,\n{your name}',
        note: '跟进信附上一页概览而不是再次发送完整目录，减少打扰感。',
      },
    ],
  },
  {
    id: 'quotation',
    label: '报价与议价',
    description: '发送报价、回应砍价与调价通知',
    phrases: [
      {
        id: 'quote-send',
        subject: 'Subject: Quotation for {product} — {validity} validity',
        body: 'Dear {name},\n\nThank you for your inquiry. Please find our quotation below:\n\n- Product: {product}\n- Specification: {spec}\n- MOQ: {moq}\n- Unit price: {currency} {price} FOB {port}\n- Payment terms: {payment terms}\n- Lead time: {lead time} days after deposit\n\nThis offer is valid until {validity}. Samples are available upon request.\n\nBest regards,\n{your name}',
        note: '报价要素一次说全，注明有效期与贸易条款，避免来回邮件。',
      },
      {
        id: 'price-pushback',
        subject: 'Subject: Re: Price discussion on {product}',
        body: 'Dear {name},\n\nThank you for your feedback. Our price already reflects {cost factor: material grade / certification / QC}.\n\nIf the target price is firm, we could explore:\n1. Increasing the order quantity to {quantity} to unlock a better rate;\n2. Adjusting the specification of {component};\n3. Switching to {alternative term, e.g. FOB → EXW}.\n\nWhich option works best for you?\n\nBest regards,\n{your name}',
        note: '不直接让价，而是给出三个可谈维度，把议价变成方案选择。',
      },
      {
        id: 'price-increase',
        subject: 'Subject: Notice of price adjustment for {product}',
        body: 'Dear {name},\n\nDue to the rising cost of {raw material / freight}, we will adjust the price of {product} by {percent}% effective {date}.\n\nOrders confirmed before {date} will be honored at the current price. We apologize for the inconvenience and appreciate your understanding.\n\nBest regards,\n{your name}',
        note: '调价通知给出缓冲期与锁价窗口，帮客户决策也稳住订单。',
      },
    ],
  },
  {
    id: 'order-production',
    label: '订单与生产',
    description: '订单确认、生产进度与验货安排',
    phrases: [
      {
        id: 'order-confirmation',
        subject: 'Subject: Sales Confirmation — {order no.}',
        body: 'Dear {name},\n\nThank you for your order. Please confirm the details below:\n\n- Order no.: {order no.}\n- Product & quantity: {product} x {quantity}\n- Total amount: {currency} {amount} {term}\n- Deposit received: {date}\n- Expected completion: {date}\n\nProduction has been scheduled. We will keep you updated on the progress.\n\nBest regards,\n{your name}',
        note: '复述关键订单要素请客户确认，避免规格或数量误解。',
      },
      {
        id: 'production-update',
        subject: 'Subject: Production update — {order no.} ({percent}% complete)',
        body: 'Dear {name},\n\nQuick update on {order no.}: production is now {percent}% complete and on schedule.\n\nAttached photos show {process: assembly / packaging}. Estimated ex-factory date remains {date}.\n\nBest regards,\n{your name}',
        note: '主动汇报进度附现场照片，是低成本高回报的信任动作。',
      },
      {
        id: 'inspection-arrange',
        subject: 'Subject: Third-party inspection arrangement — {order no.}',
        body: 'Dear {name},\n\nThe goods will be ready on {date}. Please arrange the inspection between {start} and {end}.\n\nFactory address: {address}\nContact person: {contact} ({phone})\n\nWe will fully cooperate with the inspector and prepare samples accordingly.\n\nBest regards,\n{your name}',
        note: '一次性给齐验货窗口、地址与联系人，方便客户直接转给第三方。',
      },
    ],
  },
  {
    id: 'payment-shipping',
    label: '收款与发货',
    description: '催款、水单确认与发货通知',
    phrases: [
      {
        id: 'payment-reminder',
        subject: 'Subject: Payment reminder — Invoice {invoice no.} due on {due date}',
        body: 'Dear {name},\n\nThis is a friendly reminder that Invoice {invoice no.} for {currency} {amount} is due on {due date}.\n\nIf the payment has already been arranged, please kindly share the bank slip. If any issue is holding it up, let me know so we can help.\n\nBest regards,\n{your name}',
        note: '催款语气保持“友好提醒”，主动提出解决问题而不是施压。',
      },
      {
        id: 'payment-received',
        subject: 'Subject: Payment received — {order no.}',
        body: 'Dear {name},\n\nWe have received your payment of {currency} {amount} on {date}. Thank you!\n\nWe are proceeding with {next step: production / booking / shipment} and will update you by {date}.\n\nBest regards,\n{your name}',
        note: '收款后当天确认并说明下一步，让客户对资金去向放心。',
      },
      {
        id: 'shipping-notice',
        subject: 'Subject: Shipping advice — {order no.} shipped',
        body: 'Dear {name},\n\nYour order has been shipped. Details as below:\n\n- Vessel / Flight: {vessel}\n- ETD / ETA: {etd} / {eta}\n- B/L or AWB no.: {number}\n- Container / packages: {packages}\n\nFull shipping documents will be sent by {document channel} before arrival.\n\nBest regards,\n{your name}',
        note: '发货通知把清关要素列全，减少客户目的港焦虑。',
      },
    ],
  },
  {
    id: 'after-sales',
    label: '售后与关系维护',
    description: '处理投诉、索赔与日常问候',
    phrases: [
      {
        id: 'complaint-response',
        subject: 'Subject: Re: Quality issue on {order no.}',
        body: 'Dear {name},\n\nThank you for the detailed feedback and photos. We take this seriously and have started an internal investigation with our QC team.\n\nTo move fast, could you confirm:\n1. The quantity affected ({quantity} pcs?);\n2. Whether the issue stops sales or can be sorted locally.\n\nWe will come back with a solution within {period}. Sorry again for the trouble.\n\nBest regards,\n{your name}',
        note: '先共情并启动调查，再用两个问题界定损失范围，方案给明确期限。',
      },
      {
        id: 'holiday-greeting',
        subject: 'Subject: Happy {holiday} from {company}',
        body: 'Dear {name},\n\nWishing you a wonderful {holiday}! Thank you for your support throughout the year.\n\nOur office will be closed from {start} to {end}; for urgent matters please reach me at {phone}.\n\nBest regards,\n{your name}',
        note: '节日问候附上放假安排与紧急联系方式，问候之外带实用信息。',
      },
    ],
  },
]

/** 按关键词过滤话术（匹配场景、主题、正文与说明，大小写不敏感） */
export function searchPhrases(scenarios: EmailPhraseScenario[], keyword: string): EmailPhraseScenario[] {
  const query = keyword.trim().toLowerCase()
  if (!query) return scenarios
  return scenarios
    .map((scenario) => ({
      ...scenario,
      phrases: scenario.phrases.filter((phrase) =>
        [scenario.label, phrase.subject, phrase.body, phrase.note]
          .join('\n')
          .toLowerCase()
          .includes(query)
      ),
    }))
    .filter((scenario) => scenario.phrases.length > 0)
}
