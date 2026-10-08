// 名称: 商业发票计算逻辑
// 描述: 汇总发票明细、税额与总计，生成英文金额大写与纯文本发票
// 路径: Globokit/lib/tools/invoice-generator.ts
// 作者: everettlabs
// 更新时间: 2026-09-30

import { numberToEnglish } from './number-english'

export type InvoiceType = 'commercial' | 'proforma'

export interface InvoiceLineInput {
  id: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
}

export interface InvoiceParty {
  name: string
  address: string
  tel?: string
  email?: string
}

export interface InvoiceInput {
  invoiceNo: string
  invoiceDate: string
  invoiceType: InvoiceType
  currency: string
  seller: InvoiceParty
  buyer: InvoiceParty
  paymentTerms: string
  incoterm: string
  portOfLoading?: string
  portOfDischarge?: string
  bankDetails?: string
  lines: InvoiceLineInput[]
  taxPercent?: number
  notes: string[]
}

export interface InvoiceLineTotal extends InvoiceLineInput {
  amount: number
}

export interface InvoiceTotals {
  subtotal: number
  tax: number
  total: number
  lineCount: number
  lines: InvoiceLineTotal[]
  totalInWordsEn: string
}

export const MAX_INVOICE_LINES = 20

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US DOLLARS',
  EUR: 'EUROS',
  GBP: 'POUNDS STERLING',
  CNY: 'CHINESE YUAN',
  RMB: 'CHINESE YUAN',
  JPY: 'JAPANESE YEN',
  AUD: 'AUSTRALIAN DOLLARS',
  CAD: 'CANADIAN DOLLARS',
  HKD: 'HONG KONG DOLLARS',
}

function toCents(value: number): number {
  return Math.round((value + Number.EPSILON) * 100)
}

function fromCents(cents: number): number {
  return cents / 100
}

function formatAmount(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function buildAmountInWords(total: number, currency: string): string {
  const currencyName = CURRENCY_NAMES[currency.toUpperCase()] ?? `${currency.toUpperCase()} DOLLARS`
  const cents = Math.round((total + Number.EPSILON) * 100) % 100
  const dollars = Math.floor(Math.round((total + Number.EPSILON) * 100) / 100)
  if (dollars === 0 && cents === 0) return `SAY ${currencyName} ZERO ONLY`
  const dollarWords = numberToEnglish(dollars).toUpperCase()
  if (cents === 0) return `SAY ${currencyName} ${dollarWords} ONLY`
  return `SAY ${currencyName} ${dollarWords} AND CENTS ${String(cents).padStart(2, '0')}/100 ONLY`
}

export function normalizeInvoiceInput(input: InvoiceInput): InvoiceInput {
  return {
    ...input,
    invoiceNo: input.invoiceNo.trim(),
    invoiceDate: input.invoiceDate.trim(),
    currency: input.currency.trim().toUpperCase(),
    paymentTerms: input.paymentTerms.trim(),
    incoterm: input.incoterm.trim(),
    portOfLoading: input.portOfLoading?.trim(),
    portOfDischarge: input.portOfDischarge?.trim(),
    bankDetails: input.bankDetails?.trim(),
    seller: {
      name: input.seller.name.trim(),
      address: input.seller.address.trim(),
      tel: input.seller.tel?.trim(),
      email: input.seller.email?.trim(),
    },
    buyer: {
      name: input.buyer.name.trim(),
      address: input.buyer.address.trim(),
      tel: input.buyer.tel?.trim(),
      email: input.buyer.email?.trim(),
    },
    lines: input.lines
      .map((line) => ({
        ...line,
        description: line.description.trim(),
        unit: line.unit.trim(),
      }))
      .filter((line) => line.description.length > 0 && line.quantity > 0),
    notes: input.notes.map((note) => note.trim()).filter((note) => note.length > 0),
  }
}

export function calculateInvoice(rawInput: InvoiceInput): InvoiceTotals {
  const input = normalizeInvoiceInput(rawInput)
  if (!input.invoiceNo) throw new Error('发票号不能为空')
  if (!input.invoiceDate) throw new Error('发票日期不能为空')
  if (!input.currency) throw new Error('币种不能为空')
  if (!input.seller.name) throw new Error('卖方名称不能为空')
  if (!input.buyer.name) throw new Error('买方名称不能为空')
  if (input.lines.length === 0) throw new Error('至少需要一行有效明细（品名非空且数量大于 0）')
  if (input.lines.length > MAX_INVOICE_LINES) throw new Error(`明细行数不能超过 ${MAX_INVOICE_LINES} 行`)

  const lines: InvoiceLineTotal[] = input.lines.map((line) => {
    if (!Number.isFinite(line.quantity) || line.quantity <= 0 || line.quantity > 1_000_000_000) {
      throw new Error(`明细「${line.description}」的数量必须大于 0`)
    }
    if (!Number.isFinite(line.unitPrice) || line.unitPrice < 0 || line.unitPrice > 1_000_000_000_000) {
      throw new Error(`明细「${line.description}」的单价必须不小于 0`)
    }
    return { ...line, amount: fromCents(toCents(line.quantity * line.unitPrice)) }
  })

  const subtotalCents = lines.reduce((sum, line) => sum + toCents(line.amount), 0)
  const taxPercent = input.taxPercent ?? 0
  if (!Number.isFinite(taxPercent) || taxPercent < 0 || taxPercent > 30) {
    throw new Error('税率必须在 0 到 30 之间')
  }
  const taxCents = Math.round(subtotalCents * (taxPercent / 100))
  const totalCents = subtotalCents + taxCents
  const total = fromCents(totalCents)

  return {
    subtotal: fromCents(subtotalCents),
    tax: fromCents(taxCents),
    total,
    lineCount: lines.length,
    lines,
    totalInWordsEn: buildAmountInWords(total, input.currency),
  }
}

export function buildInvoicePlainText(rawInput: InvoiceInput): string {
  const input = normalizeInvoiceInput(rawInput)
  const totals = calculateInvoice(input)
  const title = input.invoiceType === 'proforma' ? 'PROFORMA INVOICE' : 'COMMERCIAL INVOICE'
  const rows = totals.lines.map(
    (line, index) =>
      `${String(index + 1).padStart(2, ' ')}. ${line.description}  ${line.quantity} ${line.unit} x ${formatAmount(line.unitPrice)} = ${formatAmount(line.amount)} ${input.currency}`
  )

  const blocks: string[] = [
    title,
    `INVOICE NO.: ${input.invoiceNo}    DATE: ${input.invoiceDate}`,
    '',
    `SELLER: ${input.seller.name}`,
    input.seller.address,
    [input.seller.tel, input.seller.email].filter(Boolean).join(' / '),
    '',
    `BUYER: ${input.buyer.name}`,
    input.buyer.address,
    [input.buyer.tel, input.buyer.email].filter(Boolean).join(' / '),
    '',
    `PAYMENT TERMS: ${input.paymentTerms}    INCOTERM: ${input.incoterm}`,
  ]

  if (input.portOfLoading) blocks.push(`PORT OF LOADING: ${input.portOfLoading}`)
  if (input.portOfDischarge) blocks.push(`PORT OF DISCHARGE: ${input.portOfDischarge}`)
  blocks.push('', ...rows, '')
  blocks.push(`SUBTOTAL: ${formatAmount(totals.subtotal)} ${input.currency}`)
  if (totals.tax > 0) blocks.push(`TAX (${input.taxPercent ?? 0}%): ${formatAmount(totals.tax)} ${input.currency}`)
  blocks.push(`TOTAL: ${formatAmount(totals.total)} ${input.currency}`)
  blocks.push(totals.totalInWordsEn)
  if (input.bankDetails) blocks.push('', `BANK DETAILS: ${input.bankDetails}`)
  if (input.notes.length > 0) blocks.push('', ...input.notes.map((note) => `NOTE: ${note}`))

  return blocks.filter((line) => line !== undefined).join('\n').replace(/\n{3,}/g, '\n\n').trim()
}
