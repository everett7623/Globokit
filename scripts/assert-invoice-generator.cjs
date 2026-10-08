// 名称: 商业发票生成器专项测试
// 描述: 覆盖合计与英文大写黄金数值、浮点陷阱、校验报错与纯文本输出
// 路径: Globokit/scripts/assert-invoice-generator.cjs
// 作者: everettlabs
// 更新时间: 2026-09-30

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  MAX_INVOICE_LINES,
  calculateInvoice,
  normalizeInvoiceInput,
  buildInvoicePlainText,
} = loadTypescriptModule('lib/tools/invoice-generator.ts')

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
    invoiceNo: 'INV-2026-0930',
    invoiceDate: '2026-09-30',
    invoiceType: 'commercial',
    currency: 'USD',
    seller: { name: 'SELLER CO', address: 'Ningbo, China', tel: '+86 574', email: 'sales@example.com' },
    buyer: { name: 'BUYER AB', address: 'Goteborg, Sweden' },
    paymentTerms: 'T/T 30% deposit',
    incoterm: 'FOB Ningbo',
    lines: [
      { id: '1', description: 'Thermos Flask', quantity: 1200, unit: 'PCS', unitPrice: 4.35 },
      { id: '2', description: 'Replacement Lid', quantity: 240, unit: 'PCS', unitPrice: 0.85 },
      { id: '3', description: 'Gift Box', quantity: 1200, unit: 'PCS', unitPrice: 0.6 },
    ],
    taxPercent: 0,
    notes: [],
    ...overrides,
  }
}

// 示例数据合计：5220 + 204 + 720 = 6144.00，免税
const sample = calculateInvoice(createInput())
equal(sample.subtotal, 6144, '示例小计应为 6144.00')
equal(sample.tax, 0, '税率为 0 时税额应为 0')
equal(sample.total, 6144, '示例总计应为 6144.00')
equal(sample.lineCount, 3, '明细行数应为 3')
equal(sample.lines[0].amount, 5220, '第一行金额应为 5220.00')
equal(sample.totalInWordsEn, 'SAY US DOLLARS SIX THOUSAND ONE HUNDRED AND FORTY FOUR ONLY', '6144 的英文大写应正确')

// 浮点陷阱：0.1 + 0.2 = 0.3
const floatTrap = calculateInvoice(createInput({
  lines: [
    { id: '1', description: 'Item A', quantity: 1, unit: 'PCS', unitPrice: 0.1 },
    { id: '2', description: 'Item B', quantity: 1, unit: 'PCS', unitPrice: 0.2 },
  ],
}))
equal(floatTrap.total, 0.3, '0.1 + 0.2 应精确等于 0.3')
equal(floatTrap.totalInWordsEn, 'SAY US DOLLARS ZERO AND CENTS 30/100 ONLY', '不足 1 美元时应输出美分大写')

// 整数带美分：20.5
const withCents = calculateInvoice(createInput({
  lines: [
    { id: '1', description: 'Item A', quantity: 2, unit: 'PCS', unitPrice: 10.1 },
    { id: '2', description: 'Item B', quantity: 3, unit: 'PCS', unitPrice: 0.1 },
  ],
}))
equal(withCents.total, 20.5, '20.2 + 0.3 应精确等于 20.5')
equal(withCents.totalInWordsEn, 'SAY US DOLLARS TWENTY AND CENTS 50/100 ONLY', '20.5 的英文大写应含 CENTS 50/100')

// 含税：1000 + 13% = 1130
const taxed = calculateInvoice(createInput({
  lines: [{ id: '1', description: 'Item A', quantity: 100, unit: 'PCS', unitPrice: 10 }],
  taxPercent: 13,
}))
equal(taxed.tax, 130, '13% 税额应为 130')
equal(taxed.total, 1130, '含税总计应为 1130')
equal(taxed.totalInWordsEn, 'SAY US DOLLARS ONE THOUSAND ONE HUNDRED AND THIRTY ONLY', '1130 的英文大写应正确')

// 零金额
const zeroTotal = calculateInvoice(createInput({
  lines: [{ id: '1', description: 'Free Sample', quantity: 1, unit: 'PCS', unitPrice: 0 }],
}))
equal(zeroTotal.total, 0, '免费样品总计应为 0')
equal(zeroTotal.totalInWordsEn, 'SAY US DOLLARS ZERO ONLY', '零金额大写应为 ZERO ONLY')

// 非欧元币种大写用默认 DOLLARS 名称映射
equal(calculateInvoice(createInput({ currency: 'eur' })).totalInWordsEn.includes('EUROS'), true, 'EUR 应映射为 EUROS')

// 校验报错
throws(() => calculateInvoice(createInput({ invoiceNo: '   ' })), /发票号/, '发票号为空应报错')
throws(() => calculateInvoice(createInput({ invoiceDate: '' })), /发票日期/, '发票日期为空应报错')
throws(() => calculateInvoice(createInput({ seller: { name: ' ', address: 'x' } })), /卖方名称/, '卖方名称为空应报错')
throws(() => calculateInvoice(createInput({ buyer: { name: '', address: 'x' } })), /买方名称/, '买方名称为空应报错')
throws(() => calculateInvoice(createInput({ lines: [] })), /至少需要一行有效明细/, '明细为空应报错')
throws(() => calculateInvoice(createInput({ lines: [{ id: '1', description: 'A', quantity: 0, unit: 'PCS', unitPrice: 1 }] })), /至少需要一行有效明细/, '数量为 0 的明细被过滤后应报错')
throws(() => calculateInvoice(createInput({ lines: [{ id: '1', description: 'A', quantity: -5, unit: 'PCS', unitPrice: 1 }] })), /至少需要一行有效明细/, '数量为负的明细被过滤后应报错')
throws(() => calculateInvoice(createInput({ lines: [{ id: '1', description: 'A', quantity: 1, unit: 'PCS', unitPrice: -1 }] })), /单价/, '单价为负应报错')
throws(() => calculateInvoice(createInput({ taxPercent: 31 })), /税率/, '税率超过 30 应报错')
throws(() => calculateInvoice(createInput({ taxPercent: -1 })), /税率/, '税率为负应报错')
throws(
  () => calculateInvoice(createInput({
    lines: Array.from({ length: MAX_INVOICE_LINES + 1 }, (_, index) => ({ id: String(index), description: `Item ${index}`, quantity: 1, unit: 'PCS', unitPrice: 1 })),
  })),
  /明细行数/,
  '超过 20 行明细应报错'
)

// normalizeInvoiceInput：去空白、过滤空行与空备注、币种大写
const normalized = normalizeInvoiceInput(createInput({
  currency: ' usd ',
  lines: [
    { id: '1', description: '  Valid Item  ', quantity: 2, unit: ' PCS ', unitPrice: 3 },
    { id: '2', description: '   ', quantity: 5, unit: 'PCS', unitPrice: 9 },
    { id: '3', description: 'Zero Qty', quantity: 0, unit: 'PCS', unitPrice: 9 },
  ],
  notes: ['Keep dry', '  ', 'Fragile'],
}))
equal(normalized.currency, 'USD', '币种应规范化为大写')
equal(normalized.lines.length, 1, '空描述与零数量明细应被过滤')
equal(normalized.lines[0].description, 'Valid Item', '描述应去除首尾空白')
equal(normalized.lines[0].unit, 'PCS', '单位应去除首尾空白')
equal(normalized.notes.length, 2, '空备注行应被过滤')

// 纯文本输出
const plain = buildInvoicePlainText(createInput({ notes: ['Keep dry'], bankDetails: 'BANK OF CHINA, SWIFT: BKCHCNBJ' }))
check(plain.startsWith('COMMERCIAL INVOICE'), '纯文本应以 COMMERCIAL INVOICE 开头')
check(plain.includes('INVOICE NO.: INV-2026-0930'), '纯文本应包含发票号')
check(plain.includes('SELLER: SELLER CO'), '纯文本应包含卖方')
check(plain.includes('BUYER: BUYER AB'), '纯文本应包含买方')
check(plain.includes('FOB Ningbo'), '纯文本应包含贸易术语')
check(plain.includes('TOTAL: 6,144.00 USD'), '纯文本应包含总计行')
check(plain.includes('SAY US DOLLARS'), '纯文本应包含英文大写')
check(plain.includes('NOTE: Keep dry'), '纯文本应包含备注')
check(plain.includes('BANK DETAILS:'), '纯文本应包含银行信息')

const proformaPlain = buildInvoicePlainText(createInput({ invoiceType: 'proforma' }))
check(proformaPlain.startsWith('PROFORMA INVOICE'), 'PI 类型应以 PROFORMA INVOICE 开头')

console.log(`invoice-generator: ${assertionCount} 条断言全部通过`)
