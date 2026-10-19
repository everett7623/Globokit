// 名称: 装箱单生成器
// 描述: Excel 粘贴导入明细，自动汇总箱数重量体积，输出 A4 单证与 CSV
// 路径: Globokit/app/tools/packing-list-generator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { createId } from '@/lib/utils'
import {
  buildPackingListCsv,
  buildPackingListPlainText,
  calculatePackingList,
} from '@/lib/tools/packing-list-generator'
import { PackingListForm, type PackingFormState, type PackingLineFormState } from './packing-list-form'
import { PackingListPreview } from './packing-list-preview'

const DRAFT_KEY = 'globokit-packing-draft'

interface DraftPayload {
  savedAt: string
  form: PackingFormState
}

function createInitialForm(): PackingFormState {
  return {
    exporter: 'Globokit Trading Co., Ltd.',
    consignee: 'NORDIC HOME APPLIANCES AB',
    invoiceNo: 'INV-2026-0930',
    date: '2026-10-10',
    vessel: 'MSC ANNA V.026W',
    containerNo: 'MSCU1234567 / SEAL 08888',
    portOfLoading: 'Ningbo, China',
    portOfDischarge: 'Goteborg, Sweden',
    marks: 'ABC\nPO-2026-0930\nGOTEBORG\nCARTON NO. 1-120',
    notes: 'Each carton with shipping mark on two adjacent sides.',
    lines: [
      { id: 'line-1', description: 'Stainless Steel Thermos Flask 500ml', cartons: '1200', qtyPerCarton: '24', unit: 'PCS', gwPerCarton: '12.5', nwPerCarton: '11.2', dimensions: '60x40x40' },
      { id: 'line-2', description: 'Replacement Lid for 500ml Flask', cartons: '240', qtyPerCarton: '60', unit: 'PCS', gwPerCarton: '3.2', nwPerCarton: '2.8', dimensions: '40x30x25' },
    ],
  }
}

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function toLines(form: PackingFormState) {
  return form.lines.map((line) => ({
    id: line.id,
    description: line.description,
    cartons: toNumber(line.cartons),
    qtyPerCarton: toNumber(line.qtyPerCarton),
    unit: line.unit,
    gwPerCarton: toNumber(line.gwPerCarton),
    nwPerCarton: toNumber(line.nwPerCarton),
    dimensions: line.dimensions,
  }))
}

export default function PackingListGeneratorPage() {
  const [form, setForm] = useState<PackingFormState>(createInitialForm)
  const [hasDraft, setHasDraft] = useState(false)

  const initialSnapshot = useRef(JSON.stringify(createInitialForm()))

  // 草稿自动保存：内容偏离初始示例后才写入（防抖 800ms，localStorage 只写外部存储不触发级联渲染）
  useEffect(() => {
    if (JSON.stringify(form) === initialSnapshot.current) return
    const timer = window.setTimeout(() => {
      try {
        const payload: DraftPayload = { savedAt: new Date().toISOString(), form }
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(payload))
        setHasDraft(true)
      } catch {
        // 隐私模式下写入失败时静默跳过
      }
    }, 800)
    return () => window.clearTimeout(timer)
  }, [form])

  const computation = useMemo(() => {
    try {
      const totals = calculatePackingList(toLines(form))
      const header = {
        exporter: form.exporter,
        consignee: form.consignee,
        invoiceNo: form.invoiceNo,
        date: form.date,
        vessel: form.vessel,
        containerNo: form.containerNo,
        portOfLoading: form.portOfLoading,
        portOfDischarge: form.portOfDischarge,
        marks: form.marks,
        notes: form.notes,
      }
      return { totals, plainText: buildPackingListPlainText(totals, header), csv: buildPackingListCsv(totals), header, error: '' }
    } catch (error) {
      return { totals: null, plainText: '', csv: '', header: null, error: error instanceof Error ? error.message : '装箱单无法生成，请检查明细' }
    }
  }, [form])

  const restoreDraft = () => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY)
      if (!raw) {
        setHasDraft(false)
        return
      }
      const payload = JSON.parse(raw) as DraftPayload
      if (payload.form && Array.isArray(payload.form.lines)) {
        setForm(payload.form)
      }
    } catch {
      setHasDraft(false)
    }
  }

  const updateLine = (lineId: string, field: keyof Omit<PackingLineFormState, 'id'>, value: string) => setForm((current) => ({
    ...current,
    lines: current.lines.map((line) => (line.id === lineId ? { ...line, [field]: value } : line)),
  }))
  const addLine = () => setForm((current) => ({
    ...current,
    lines: [...current.lines, { id: createId('line'), description: '', cartons: '1', qtyPerCarton: '1', unit: 'PCS', gwPerCarton: '0', nwPerCarton: '0', dimensions: '' }],
  }))
  const removeLine = (lineId: string) => setForm((current) => {
    if (current.lines.length <= 1) return current
    return { ...current, lines: current.lines.filter((line) => line.id !== lineId) }
  })

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8 print:hidden">
        <h1 className="mb-2 text-3xl font-bold">装箱单生成器</h1>
        <p className="text-muted-foreground">支持从 Excel 直接粘贴批量导入明细，自动汇总箱数、数量、毛净重与 CBM，输出 A4 版式 PACKING LIST，可打印导出 PDF 或导出 CSV 给 Excel。填写内容自动保存为本地草稿。</p>
      </div>

      {computation.error && <EnhancedAlert type="error" title="生成失败" message={computation.error} action={{ label: '重置', onClick: () => setForm(createInitialForm()) }} className="mb-6 print:hidden" />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <PackingListForm
          form={form}
          onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
          onLineChange={updateLine}
          onAddLine={addLine}
          onRemoveLine={removeLine}
          onRestoreDraft={restoreDraft}
          hasDraft={hasDraft}
          onReset={() => setForm(createInitialForm())}
        />
        {computation.totals && computation.header
          ? <PackingListPreview totals={computation.totals} plainText={computation.plainText} csv={computation.csv} header={computation.header} />
          : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground print:hidden">修正明细后查看装箱单预览</div>}
      </div>
    </MobileFriendlyWrapper>
  )
}
