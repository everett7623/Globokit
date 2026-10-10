// 名称: 催款邮件生成器
// 描述: 按逾期天数分档生成英文催款邮件与催收节奏建议
// 路径: Globokit/app/tools/payment-reminder-generator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

'use client'

import { useMemo, useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { generateReminderEmail, buildReminderPlainText, recommendStage, type ReminderStage } from '@/lib/tools/payment-reminder-generator'
import { PaymentReminderForm, type ReminderFormState } from './payment-reminder-form'
import { PaymentReminderPreview } from './payment-reminder-preview'

function createInitialForm(): ReminderFormState {
  return {
    customerName: 'NORDIC HOME APPLIANCES AB',
    invoiceNo: 'INV-2026-0930',
    amount: '12800',
    currency: 'USD',
    dueDate: '2026-09-15',
    overdueDays: '8',
    paymentTerms: 'T/T 30 days after B/L date',
    senderName: 'Everett, Sales Dept.',
  }
}

function toNumber(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export default function PaymentReminderGeneratorPage() {
  const [form, setForm] = useState<ReminderFormState>(createInitialForm)
  const [stageOverride, setStageOverride] = useState<ReminderStage | null>(null)

  const recommendedStage = useMemo(() => {
    const overdueDays = Number.parseInt(form.overdueDays, 10)
    return Number.isFinite(overdueDays) && overdueDays >= 0 ? recommendStage(overdueDays) : 'first'
  }, [form.overdueDays])
  const stage = stageOverride ?? recommendedStage

  const computation = useMemo(() => {
    try {
      const email = generateReminderEmail({
        customerName: form.customerName,
        invoiceNo: form.invoiceNo,
        amount: toNumber(form.amount),
        currency: form.currency,
        dueDate: form.dueDate,
        overdueDays: Number.parseInt(form.overdueDays, 10),
        paymentTerms: form.paymentTerms,
        senderName: form.senderName,
      }, stage)
      return { email, plainText: buildReminderPlainText(email), error: '' }
    } catch (error) {
      return { email: null, plainText: '', error: error instanceof Error ? error.message : '邮件无法生成，请检查输入' }
    }
  }, [form, stage])

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">催款邮件生成器</h1>
        <p className="text-muted-foreground">按逾期天数分四档语气（友好提醒 → 首次催款 → 二次严肃 → 最后通牒），一键生成可直接发送的英文催款邮件与催收节奏建议。</p>
      </div>

      {computation.error && <EnhancedAlert type="error" title="生成失败" message={computation.error} action={{ label: '重置', onClick: () => { setForm(createInitialForm()); setStageOverride(null) } }} className="mb-6" />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.15fr)]">
        <PaymentReminderForm
          form={form}
          stage={stage}
          onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
          onStageChange={setStageOverride}
          onReset={() => { setForm(createInitialForm()); setStageOverride(null) }}
        />
        {computation.email
          ? <PaymentReminderPreview email={computation.email} plainText={computation.plainText} />
          : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正表单后查看邮件预览</div>}
      </div>
    </MobileFriendlyWrapper>
  )
}
