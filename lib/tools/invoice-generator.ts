// 名称: 商业发票计算逻辑
// 描述: 计算发票明细、税额并生成可复制的纯文本
// 路径: Globokit/lib/tools/invoice-generator.ts

export type InvoiceType = 'commercial' | 'proforma'
export interface InvoiceParty { name: string; address: string; tel: string; email: string }
export interface InvoiceLine { id: string; description: string; quantity: number; unit: string; unitPrice: number }
export interface InvoiceInput {
  invoiceNo: string; invoiceDate: string; invoiceType: InvoiceType; currency: string
  seller: InvoiceParty; buyer: InvoiceParty; paymentTerms: string; incoterm: string
  portOfLoading: string; portOfDischarge: string; bankDetails: string; lines: InvoiceLine[]
  taxPercent: number; notes: string[]
}
export interface InvoiceTotals { lines: Array<InvoiceLine & { amount: number }>; subtotal: number; tax: number; total: number; totalInWordsEn: string }

const ONES = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN']
const TENS = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY']
function words(n: number): string { if (n < 20) return ONES[n]; if (n < 100) return `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${ONES[n % 10]}` : ''}`; if (n < 1000) return `${ONES[Math.floor(n / 100)]} HUNDRED${n % 100 ? ` ${words(n % 100)}` : ''}`; if (n < 1_000_000) return `${words(Math.floor(n / 1000))} THOUSAND${n % 1000 ? ` ${words(n % 1000)}` : ''}`; return `${words(Math.floor(n / 1_000_000))} MILLION${n % 1_000_000 ? ` ${words(n % 1_000_000)}` : ''}` }
function amountWords(value: number): string { const cents = Math.round((value % 1) * 100); const whole = Math.floor(value); return `${whole ? words(whole) : 'ZERO'}${cents ? ` AND ${String(cents).padStart(2, '0')}/100` : ''}` }
export function calculateInvoice(input: InvoiceInput): InvoiceTotals {
  if (!input.lines.length) throw new Error('至少需要一条发票明细')
  const lines = input.lines.map((line) => ({ ...line, amount: Math.round(line.quantity * line.unitPrice * 100) / 100 }))
  const subtotal = Math.round(lines.reduce((sum, line) => sum + line.amount, 0) * 100) / 100
  const tax = Math.round(subtotal * Math.max(0, input.taxPercent) / 100 * 100) / 100
  return { lines, subtotal, tax, total: Math.round((subtotal + tax) * 100) / 100, totalInWordsEn: amountWords(subtotal + tax) }
}
export function buildInvoicePlainText(input: InvoiceInput): string {
  const totals = calculateInvoice(input)
  const lines = totals.lines.map((line, i) => `${i + 1}. ${line.description || 'Item'} | ${line.quantity} ${line.unit} × ${line.unitPrice.toFixed(2)} = ${line.amount.toFixed(2)} ${input.currency}`)
  return [`${input.invoiceType === 'proforma' ? 'PROFORMA' : 'COMMERCIAL'} INVOICE`, `No.: ${input.invoiceNo}`, `Date: ${input.invoiceDate}`, `Seller: ${input.seller.name}`, `Buyer: ${input.buyer.name}`, `Terms: ${input.paymentTerms} / ${input.incoterm}`, ...lines, `Subtotal: ${totals.subtotal.toFixed(2)} ${input.currency}`, `Tax: ${totals.tax.toFixed(2)} ${input.currency}`, `TOTAL: ${totals.total.toFixed(2)} ${input.currency}`, `Amount in words: ${totals.totalInWordsEn} ${input.currency}`, ...input.notes.filter(Boolean)].join('\n')
}
