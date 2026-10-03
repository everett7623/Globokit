// 名称: 发票静态数据
// 描述: CI/PI 类型说明、付款条款与贸易术语速查、示例数据
// 路径: Globokit/app/tools/invoice-generator/invoice-data.ts
// 作者: everettlabs
// 更新时间: 2026-09-30

export const INVOICE_TYPE_OPTIONS: Array<{ value: 'commercial' | 'proforma'; label: string }> = [
  { value: 'commercial', label: '商业发票 COMMERCIAL INVOICE' },
  { value: 'proforma', label: '形式发票 PROFORMA INVOICE' },
]

export const INVOICE_TYPE_NOTES: Array<{ type: 'commercial' | 'proforma'; summary: string; points: string[] }> = [
  {
    type: 'commercial',
    summary: '正式履约单据，报关与收汇以此为准',
    points: [
      '货物装运后签发，品名、数量、单价必须与实际出运和信用证/合同一致。',
      '是报关、结算、退税的核心单据，各栏拼写需与箱单、提单严格一致。',
      '付款条款与贸易术语应填写完整（如 T/T 30 days after B/L date, FOB Shanghai）。',
    ],
  },
  {
    type: 'proforma',
    summary: '报价确认与开证/付汇依据',
    points: [
      '成交前签发，买方常凭 PI 申请进口许可、开立信用证或安排预付款。',
      '有效期建议注明（如 This PI is valid for 30 days），避免汇率与原料波动风险。',
      '金额与条款确认后即视为合同附件，后续 CI 与 PI 不一致可能引起收汇纠纷。',
    ],
  },
]

export const PAYMENT_TERM_OPTIONS: string[] = [
  'T/T 30% deposit, 70% against B/L copy',
  'T/T 30 days after B/L date',
  'L/C at sight',
  'L/C 60 days after sight',
  'D/P at sight',
  '100% T/T in advance',
]

export const INCOTERM_OPTIONS: string[] = [
  'EXW',
  'FCA',
  'FOB',
  'CFR',
  'CIF',
  'DAP',
  'DDP',
]

export const CURRENCY_OPTIONS: string[] = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'AUD', 'CAD', 'HKD']

export interface InvoiceSampleData {
  invoiceNo: string
  invoiceDate: string
  invoiceType: 'commercial' | 'proforma'
  currency: string
  sellerName: string
  sellerAddress: string
  sellerTel: string
  sellerEmail: string
  buyerName: string
  buyerAddress: string
  buyerTel: string
  buyerEmail: string
  paymentTerms: string
  incoterm: string
  portOfLoading: string
  portOfDischarge: string
  bankDetails: string
  notesText: string
  lines: Array<{ id: string; description: string; quantity: string; unit: string; unitPrice: string }>
}

export const SAMPLE_INVOICE: InvoiceSampleData = {
  invoiceNo: 'INV-2026-0930',
  invoiceDate: '2026-09-30',
  invoiceType: 'commercial',
  currency: 'USD',
  sellerName: 'NINGBO GLOBOKIT INDUSTRIAL CO., LTD.',
  sellerAddress: 'No. 88 Zhongshan East Road, Ningbo, Zhejiang, China',
  sellerTel: '+86 574 8888 6666',
  sellerEmail: 'sales@globokit.example.com',
  buyerName: 'NORDIC HOME APPLIANCES AB',
  buyerAddress: 'Storgatan 12, 411 18 Goteborg, Sweden',
  buyerTel: '+46 31 123 456',
  buyerEmail: 'purchase@nordichome.example.se',
  paymentTerms: 'T/T 30% deposit, 70% against B/L copy',
  incoterm: 'FOB Ningbo',
  portOfLoading: 'Ningbo, China',
  portOfDischarge: 'Goteborg, Sweden',
  bankDetails: 'BANK OF CHINA NINGBO BRANCH, SWIFT: BKCHCNBJ, A/C NO. 8888 6666 7777',
  notesText: 'This invoice is valid for customs clearance purposes.',
  lines: [
    { id: 'line-1', description: 'Stainless Steel Thermos Flask 500ml, Matte Black', quantity: '1200', unit: 'PCS', unitPrice: '4.35' },
    { id: 'line-2', description: 'Replacement Lid for 500ml Flask', quantity: '240', unit: 'PCS', unitPrice: '0.85' },
    { id: 'line-3', description: 'Gift Box Packaging (5-color printing)', quantity: '1200', unit: 'PCS', unitPrice: '0.6' },
  ],
}
