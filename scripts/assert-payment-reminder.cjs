// 名称: 催款邮件生成器专项测试
// 描述: 覆盖四档语气模板、逾期推荐分档、校验与纯文本输出
// 路径: Globokit/scripts/assert-payment-reminder.cjs
// 作者: everettlabs
// 更新时间: 2026-10-10

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  REMINDER_STAGES,
  recommendStage,
  generateReminderEmail,
  buildReminderPlainText,
} = loadTypescriptModule('lib/tools/payment-reminder-generator.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

function createInput(overrides = {}) {
  return {
    customerName: 'NORDIC HOME AB',
    invoiceNo: 'INV-2026-0930',
    amount: 12800,
    currency: 'USD',
    dueDate: '2026-09-15',
    overdueDays: 8,
    paymentTerms: 'T/T 30 days after B/L date',
    senderName: 'Everett',
    ...overrides,
  }
}

// 推荐分档边界
equal(recommendStage(0), 'friendly', '逾期 0 天应推荐友好提醒')
equal(recommendStage(3), 'friendly', '逾期 3 天应推荐友好提醒')
equal(recommendStage(4), 'first', '逾期 4 天应推荐首次催款')
equal(recommendStage(10), 'first', '逾期 10 天应推荐首次催款')
equal(recommendStage(11), 'second', '逾期 11 天应推荐二次催款')
equal(recommendStage(21), 'second', '逾期 21 天应推荐二次催款')
equal(recommendStage(22), 'final', '逾期 22 天应推荐最后通牒')
equal(REMINDER_STAGES.length, 4, '应有四档催款语气')

// 四档邮件各自特征
const friendly = generateReminderEmail(createInput({ overdueDays: 2 }), 'friendly')
check(friendly.subject.includes('Friendly Reminder'), '友好档主题应含 Friendly Reminder')
check(friendly.body.includes('gentle reminder'), '友好档正文应为温和语气')
check(friendly.body.includes('USD 12,800.00'), '正文金额应千分位格式化')
check(friendly.body.includes('2 days past due'), '正文应含逾期天数')

const first = generateReminderEmail(createInput({ overdueDays: 8 }), 'first')
check(first.subject.includes('8 Days Past Due'), '首次催款主题应含逾期天数')
check(first.body.includes('within 7 days'), '首次催款应给 7 天期限')
check(first.body.includes('T/T 30 days after B/L date'), '正文应引用付款条款')

const second = generateReminderEmail(createInput({ overdueDays: 15 }), 'second')
check(second.subject.startsWith('URGENT'), '二次催款主题应以 URGENT 开头')
check(second.body.includes('5 business days'), '二次催款应给 5 个工作日期限')
check(second.subject.includes('15 Days'), '二次催款主题应含逾期天数')

const final = generateReminderEmail(createInput({ overdueDays: 45 }), 'final')
check(final.subject.startsWith('FINAL DEMAND'), '最后通牒主题应以 FINAL DEMAND 开头')
check(final.body.includes('credit insurance'), '最后通牒应提及信用保险')
check(final.body.includes('suspend any pending orders'), '最后通牒应提及暂停订单')

// 未逾期（0 天）时的措辞
const dueToday = generateReminderEmail(createInput({ overdueDays: 0 }), 'friendly')
check(dueToday.body.includes('due today'), '逾期 0 天应表述为 due today')

// 默认署名与替换
const noSender = generateReminderEmail(createInput({ senderName: '' }), 'friendly')
check(noSender.body.includes('[Your Name]'), '未填署名应输出占位符')

// 校验
throws(() => generateReminderEmail(createInput({ customerName: '  ' }), 'first'), /客户名称/, '客户名称为空应报错')
throws(() => generateReminderEmail(createInput({ invoiceNo: '' }), 'first'), /发票号/, '发票号为空应报错')
throws(() => generateReminderEmail(createInput({ amount: 0 }), 'first'), /金额/, '金额为 0 应报错')
throws(() => generateReminderEmail(createInput({ dueDate: '' }), 'first'), /到期日/, '到期日为空应报错')
throws(() => generateReminderEmail(createInput({ overdueDays: -1 }), 'first'), /逾期天数/, '逾期天数为负应报错')
throws(() => generateReminderEmail(createInput({ overdueDays: 7.5 }), 'first'), /逾期天数/, '逾期天数非整数应报错')

// 纯文本输出
const plain = buildReminderPlainText(first)
check(plain.startsWith('Subject: '), '纯文本应以 Subject: 开头')
check(plain.includes(first.body.slice(0, 40)), '纯文本应包含正文内容')

console.log(`payment-reminder-generator: ${assertionCount} 条断言全部通过`)
