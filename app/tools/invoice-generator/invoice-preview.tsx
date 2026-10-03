// 名称: 商业发票预览组件
// 描述: 以 A4 版式实时预览发票，支持复制纯文本与打印
// 路径: Globokit/app/tools/invoice-generator/invoice-preview.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

'use client'

import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import type { InvoiceInput, InvoiceTotals } from '@/lib/tools/invoice-generator'
import { INVOICE_TYPE_NOTES } from './invoice-data'

export interface InvoicePreviewProps {
  input: InvoiceInput
  totals: InvoiceTotals
  plainText: string
}

export function InvoicePreview({ input, totals, plainText }: InvoicePreviewProps) {
  const title = input.invoiceType === 'proforma' ? 'PROFORMA INVOICE' : 'COMMERCIAL INVOICE'
  const typeNote = INVOICE_TYPE_NOTES.find((note) => note.type === input.invoiceType)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Button type="button" size="sm" onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />打印 / 导出 PDF
        </Button>
        <EnhancedCopyButton text={plainText} variant="outline" size="sm">复制纯文本</EnhancedCopyButton>
      </div>

      <div className="mx-auto w-full max-w-[820px] bg-white p-8 text-slate-900 shadow-sm print:max-w-none print:p-0 print:shadow-none dark:bg-slate-900 dark:text-slate-100">
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4 dark:border-slate-100">
          <div>
            <h2 className="text-2xl font-black tracking-wide">{title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">INVOICE NO.: <span className="font-semibold text-slate-900 dark:text-slate-100">{input.invoiceNo}</span></p>
            <p className="text-sm text-slate-500 dark:text-slate-400">DATE: <span className="font-semibold text-slate-900 dark:text-slate-100">{input.invoiceDate}</span></p>
          </div>
          <div className="max-w-[300px] text-right text-xs leading-5 text-slate-600 dark:text-slate-300">
            <p className="font-bold">{input.seller.name}</p>
            <p className="whitespace-pre-line">{input.seller.address}</p>
            {(input.seller.tel || input.seller.email) && (
              <p>{[input.seller.tel, input.seller.email].filter(Boolean).join(' · ')}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-slate-300 py-4 dark:border-slate-600">
          <PartyBlock label="BUYER" name={input.buyer.name} address={input.buyer.address} contact={[input.buyer.tel, input.buyer.email].filter(Boolean).join(' · ')} />
          <div className="space-y-1 text-sm">
            <MetaRow label="PAYMENT TERMS" value={input.paymentTerms} />
            <MetaRow label="INCOTERM" value={input.incoterm} />
            {input.portOfLoading && <MetaRow label="PORT OF LOADING" value={input.portOfLoading} />}
            {input.portOfDischarge && <MetaRow label="PORT OF DISCHARGE" value={input.portOfDischarge} />}
            <MetaRow label="CURRENCY" value={input.currency} />
          </div>
        </div>

        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border border-slate-400 bg-slate-100 text-left text-xs uppercase tracking-wide dark:border-slate-500 dark:bg-slate-800">
              <th className="border border-slate-400 px-2 py-2 dark:border-slate-500">No.</th>
              <th className="border border-slate-400 px-2 py-2 dark:border-slate-500">Description</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">Qty</th>
              <th className="border border-slate-400 px-2 py-2 dark:border-slate-500">Unit</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">Unit Price</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">Amount</th>
            </tr>
          </thead>
          <tbody>
            {totals.lines.map((line, index) => (
              <tr key={line.id} className="border border-slate-400 align-top dark:border-slate-500">
                <td className="border border-slate-400 px-2 py-2 dark:border-slate-500">{index + 1}</td>
                <td className="border border-slate-400 px-2 py-2 dark:border-slate-500">{line.description}</td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{line.quantity.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                <td className="border border-slate-400 px-2 py-2 dark:border-slate-500">{line.unit}</td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{formatAmount(line.unitPrice)}</td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{formatAmount(line.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <div className="w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Subtotal</span><span className="tabular-nums font-medium">{formatAmount(totals.subtotal)} {input.currency}</span></div>
            {totals.tax > 0 && (
              <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Tax ({input.taxPercent}%)</span><span className="tabular-nums font-medium">{formatAmount(totals.tax)} {input.currency}</span></div>
            )}
            <div className="flex justify-between border-t-2 border-slate-900 pt-1 text-base font-bold dark:border-slate-100">
              <span>TOTAL</span><span className="tabular-nums">{formatAmount(totals.total)} {input.currency}</span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm font-semibold">{totals.totalInWordsEn}</p>

        {input.bankDetails && (
          <div className="mt-4 border-t border-slate-300 pt-3 text-xs leading-5 dark:border-slate-600">
            <p className="font-bold uppercase tracking-wide">Bank Details</p>
            <p className="whitespace-pre-line">{input.bankDetails}</p>
          </div>
        )}

        {input.notes.length > 0 && (
          <div className="mt-3 text-xs leading-5">
            <p className="font-bold uppercase tracking-wide">Notes</p>
            <ul className="ml-4 list-disc space-y-0.5">
              {input.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        )}

        <div className="mt-10 flex items-end justify-between border-t border-slate-300 pt-2 dark:border-slate-600">
          <div className="flex h-16 w-48 items-end border-b border-slate-500 pb-1 text-xs text-slate-400">For {input.seller.name}</div>
          <p className="text-xs text-slate-400">Authorized Signature</p>
        </div>
      </div>

      {typeNote && (
        <Card className="bg-muted/30 print:hidden">
          <CardHeader>
            <CardTitle className="text-base">{input.invoiceType === 'proforma' ? '形式发票 PI' : '商业发票 CI'}：{typeNote.summary}</CardTitle>
            <CardDescription>使用要点</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc space-y-1 text-sm leading-6 text-muted-foreground">
              {typeNote.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PartyBlock({ label, name, address, contact }: { label: string; name: string; address: string; contact: string }) {
  return (
    <div className="text-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 font-bold">{name}</p>
      <p className="whitespace-pre-line text-slate-600 dark:text-slate-300">{address}</p>
      {contact && <p className="text-slate-600 dark:text-slate-300">{contact}</p>}
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <p><span className="mr-2 inline-block min-w-[120px] text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span><span className="font-medium">{value}</span></p>
  )
}

function formatAmount(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
