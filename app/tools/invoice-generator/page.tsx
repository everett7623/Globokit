// 名称: 商业发票/形式发票生成器
// 描述: 表单驱动生成 A4 版式发票，支持实时预览、复制纯文本与打印导出
// 路径: Globokit/app/tools/invoice-generator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

'use client'

import { useMemo, useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { buildInvoicePlainText, calculateInvoice, type InvoiceInput } from '@/lib/tools/invoice-generator'
import { createInvoiceFormState, InvoiceForm, type InvoiceFormState } from './invoice-form'
import { InvoicePreview } from './invoice-preview'

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function toInput(form: InvoiceFormState): InvoiceInput {
  return {
    invoiceNo: form.invoiceNo,
    invoiceDate: form.invoiceDate,
    invoiceType: form.invoiceType,
    currency: form.currency,
    seller: { name: form.sellerName, address: form.sellerAddress, tel: form.sellerTel, email: form.sellerEmail },
    buyer: { name: form.buyerName, address: form.buyerAddress, tel: form.buyerTel, email: form.buyerEmail },
    paymentTerms: form.paymentTerms,
    incoterm: form.incoterm,
    portOfLoading: form.portOfLoading,
    portOfDischarge: form.portOfDischarge,
    bankDetails: form.bankDetails,
    lines: form.lines.map((line) => ({
      id: line.id,
      description: line.description,
      quantity: toNumber(line.quantity),
      unit: line.unit,
      unitPrice: toNumber(line.unitPrice),
    })),
    taxPercent: toNumber(form.taxPercent),
    notes: form.notesText.split('\n'),
  }
}

export default function InvoiceGeneratorPage() {
  const [form, setForm] = useState<InvoiceFormState>(createInvoiceFormState)

  const computation = useMemo(() => {
    const input = toInput(form)
    try {
      return { input, totals: calculateInvoice(input), plainText: buildInvoicePlainText(input), error: '' }
    } catch (error) {
      return { input, totals: null, plainText: '', error: error instanceof Error ? error.message : '发票无法生成，请检查输入' }
    }
  }, [form])

  const updateLine = (lineId: string, field: 'description' | 'quantity' | 'unit' | 'unitPrice', value: string) => setForm((current) => ({
    ...current,
    lines: current.lines.map((line) => (line.id === lineId ? { ...line, [field]: value } : line)),
  }))
  const addLine = () => setForm((current) => ({
    ...current,
    lines: [...current.lines, { id: `line-${Date.now()}`, description: '', quantity: '1', unit: 'PCS', unitPrice: '0' }],
  }))
  const removeLine = (lineId: string) => setForm((current) => {
    if (current.lines.length <= 1) return current
    return { ...current, lines: current.lines.filter((line) => line.id !== lineId) }
  })

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8 print:hidden">
        <h1 className="mb-2 text-3xl font-bold">商业发票/形式发票生成器</h1>
        <p className="text-muted-foreground">填写买卖双方、贸易条款与明细，实时生成 A4 版式发票，可复制纯文本粘贴到邮件，或打印导出 PDF 附给客户与货代。</p>
      </div>

      {computation.error && <EnhancedAlert type="error" title="生成失败" message={computation.error} action={{ label: '重置为示例', onClick: () => setForm(createInvoiceFormState()) }} className="mb-6 print:hidden" />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <InvoiceForm
          form={form}
          onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
          onLineChange={updateLine}
          onAddLine={addLine}
          onRemoveLine={removeLine}
          onReset={() => setForm(createInvoiceFormState())}
        />
        {computation.totals
          ? <InvoicePreview input={computation.input} totals={computation.totals} plainText={computation.plainText} />
          : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground print:hidden">修正表单后查看发票预览</div>}
      </div>
    </MobileFriendlyWrapper>
  )
}
