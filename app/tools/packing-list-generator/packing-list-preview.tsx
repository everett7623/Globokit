// 名称: 装箱单预览组件
// 描述: A4 版式实时预览，支持打印、复制纯文本与导出 CSV
// 路径: Globokit/app/tools/packing-list-generator/packing-list-preview.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

'use client'

import { Download, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import type { PackingListTotals } from '@/lib/tools/packing-list-generator'

export interface PackingListPreviewProps {
  totals: PackingListTotals
  plainText: string
  csv: string
  header: { exporter: string; consignee: string; invoiceNo: string; date: string; vessel: string; containerNo: string; portOfLoading: string; portOfDischarge: string; marks: string; notes: string }
}

function downloadCsv(csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `packing-list-${Date.now()}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function PackingListPreview({ totals, plainText, csv, header }: PackingListPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />打印 / 导出 PDF
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => downloadCsv(csv)}>
            <Download className="mr-2 h-4 w-4" />导出 CSV（Excel）
          </Button>
        </div>
        <EnhancedCopyButton text={plainText} variant="ghost" size="sm">复制纯文本</EnhancedCopyButton>
      </div>

      <div className="mx-auto w-full max-w-[820px] bg-white p-8 text-slate-900 shadow-sm print:max-w-none print:p-0 print:shadow-none dark:bg-slate-900 dark:text-slate-100">
        <div className="border-b-2 border-slate-900 pb-3 text-center dark:border-slate-100">
          <h2 className="text-2xl font-black tracking-wide">PACKING LIST</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">INVOICE NO.: <span className="font-semibold text-slate-900 dark:text-slate-100">{header.invoiceNo}</span> · DATE: <span className="font-semibold text-slate-900 dark:text-slate-100">{header.date}</span></p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-slate-300 py-4 text-sm dark:border-slate-600">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Exporter</p>
            <p className="mt-1 whitespace-pre-line font-semibold">{header.exporter}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Consignee</p>
            <p className="mt-1 whitespace-pre-line font-semibold">{header.consignee}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Vessel / Voyage</p>
            <p className="mt-1">{header.vessel}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{header.containerNo}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Ports</p>
            <p className="mt-1">{header.portOfLoading} → {header.portOfDischarge}</p>
          </div>
        </div>

        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border border-slate-400 bg-slate-100 text-left text-xs uppercase tracking-wide dark:border-slate-500 dark:bg-slate-800">
              <th className="border border-slate-400 px-2 py-2 dark:border-slate-500">No.</th>
              <th className="border border-slate-400 px-2 py-2 dark:border-slate-500">Description</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">CTNS</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">Qty</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">G.W. (KG)</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">N.W. (KG)</th>
              <th className="border border-slate-400 px-2 py-2 text-right dark:border-slate-500">CBM</th>
            </tr>
          </thead>
          <tbody>
            {totals.lines.map((line, index) => (
              <tr key={line.id} className="border border-slate-400 align-top dark:border-slate-500">
                <td className="border border-slate-400 px-2 py-2 dark:border-slate-500">{index + 1}</td>
                <td className="border border-slate-400 px-2 py-2 dark:border-slate-500">
                  {line.description}
                  {line.dimensionsLabel && <span className="block text-xs text-slate-500 dark:text-slate-400">{line.dimensionsLabel} · {line.qtyPerCarton.toLocaleString('en-US')} {line.unit}/ctn</span>}
                </td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{line.cartons}</td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{line.qtyTotal.toLocaleString('en-US')} {line.unit}</td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{line.gwTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{line.nwTotal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{line.cbm ? line.cbm.toLocaleString('en-US', { maximumFractionDigits: 4 }) : '--'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border border-slate-900 bg-slate-100 text-sm font-bold dark:border-slate-100 dark:bg-slate-800">
              <td className="border border-slate-400 px-2 py-2 dark:border-slate-500" colSpan={2}>TOTAL</td>
              <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{totals.totalCartons}</td>
              <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{totals.totalQty.toLocaleString('en-US')}</td>
              <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{totals.totalGw.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
              <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{totals.totalNw.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
              <td className="border border-slate-400 px-2 py-2 text-right tabular-nums dark:border-slate-500">{totals.totalCbm.toLocaleString('en-US', { maximumFractionDigits: 4 })}</td>
            </tr>
          </tfoot>
        </table>

        {header.marks && (
          <div className="mt-4 border border-slate-300 p-3 text-xs dark:border-slate-600">
            <p className="font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Shipping Marks</p>
            <p className="mt-1 whitespace-pre-line font-mono">{header.marks}</p>
          </div>
        )}

        {header.notes && (
          <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300">NOTE: {header.notes}</p>
        )}

        <div className="mt-10 flex items-end justify-between border-t border-slate-300 pt-2 dark:border-slate-600">
          <div className="flex h-16 w-48 items-end border-b border-slate-500 pb-1 text-xs text-slate-400">For {header.exporter}</div>
          <p className="text-xs text-slate-400">Authorized Signature</p>
        </div>
      </div>
    </div>
  )
}
