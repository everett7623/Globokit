// 名称: 信用证交单自查清单
// 描述: 按六组单证勾选审单要点，实时输出风险等级与英文改证片段
// 路径: Globokit/app/tools/lc-discrepancy-checklist/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

'use client'

import { useMemo, useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import {
  LC_CHECKLIST_ITEMS,
  evaluateLcChecklist,
  generateLcAmendmentRequests,
} from '@/lib/tools/lc-discrepancy-checklist'
import { LcChecklistForm } from './lc-checklist-form'
import { LcChecklistResult } from './lc-checklist-result'

export default function LcDiscrepancyChecklistPage() {
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [creditNo, setCreditNo] = useState('')

  const evaluation = useMemo(() => evaluateLcChecklist(checkedIds), [checkedIds])
  const amendmentRequests = useMemo(() => generateLcAmendmentRequests(evaluation.uncheckedCritical, creditNo), [evaluation, creditNo])

  const toggle = (itemId: string) => setCheckedIds((current) =>
    current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]
  )
  const checkAll = () => setCheckedIds(LC_CHECKLIST_ITEMS.map((item) => item.id))

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">信用证交单自查清单</h1>
        <p className="text-muted-foreground">按信用证条款、发票、提单、保险、附加单证与跨单一致性六组核对 {LC_CHECKLIST_ITEMS.length} 项审单要点，识别致命不符点并生成英文改证片段。</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <LcChecklistForm
          checkedIds={checkedIds}
          creditNo={creditNo}
          onToggle={toggle}
          onCreditNoChange={setCreditNo}
          onCheckAll={checkAll}
          onReset={() => setCheckedIds([])}
        />
        <LcChecklistResult evaluation={evaluation} amendmentRequests={amendmentRequests} />
      </div>
    </MobileFriendlyWrapper>
  )
}
