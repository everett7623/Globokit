// 名称: 催款邮件表单
// 描述: 采集发票与账期信息，展示四档催款语气选择
// 路径: Globokit/app/tools/payment-reminder-generator/payment-reminder-form.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

import { BellRing, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { REMINDER_STAGES, recommendStage, type ReminderStage } from '@/lib/tools/payment-reminder-generator'
import { cn } from '@/lib/utils'

export interface ReminderFormState {
  customerName: string
  invoiceNo: string
  amount: string
  currency: string
  dueDate: string
  overdueDays: string
  paymentTerms: string
  senderName: string
}

export interface PaymentReminderFormProps {
  form: ReminderFormState
  stage: ReminderStage
  onChange: (patch: Partial<ReminderFormState>) => void
  onStageChange: (stage: ReminderStage) => void
  onReset: () => void
}

export function PaymentReminderForm({ form, stage, onChange, onStageChange, onReset }: PaymentReminderFormProps) {
  const overdueDays = Number.parseInt(form.overdueDays, 10)
  const recommended = Number.isFinite(overdueDays) ? recommendStage(overdueDays) : null

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5" />催款信息</CardTitle>
            <CardDescription>填写发票要素，按逾期天数选择催款语气</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />重置
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="customerName" label="客户名称" value={form.customerName} onChange={(value) => onChange({ customerName: value })} placeholder="NORDIC HOME AB" autoFocus />
          <Field id="invoiceNo" label="发票号" value={form.invoiceNo} onChange={(value) => onChange({ invoiceNo: value })} placeholder="INV-2026-0930" />
          <div className="space-y-2">
            <Label htmlFor="amount">发票金额</Label>
            <div className="relative">
              <FormattedInput id="amount" value={form.amount} onChange={(value) => onChange({ amount: value })} format="decimal" maxDecimals={2} className="h-11 pr-20 font-medium" />
              <input
                value={form.currency}
                onChange={(event) => onChange({ currency: event.target.value.toUpperCase() })}
                maxLength={6}
                aria-label="币种"
                className="absolute inset-y-1.5 right-1.5 w-16 rounded border border-slate-200 bg-slate-50 px-2 text-center text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
              />
            </div>
          </div>
          <Field id="dueDate" label="付款到期日" value={form.dueDate} onChange={(value) => onChange({ dueDate: value })} placeholder="2026-09-15" />
          <div className="space-y-2">
            <Label htmlFor="overdueDays">逾期天数</Label>
            <FormattedInput id="overdueDays" value={form.overdueDays} onChange={(value) => onChange({ overdueDays: value })} format="number" maxDecimals={0} className="h-11 font-medium" />
            {recommended && <p className="text-xs text-muted-foreground">按逾期天数推荐：<span className="font-medium text-emerald-700 dark:text-cyan-300">{recommendStageLabel(recommended)}</span></p>}
          </div>
          <Field id="paymentTerms" label="付款条款（可选）" value={form.paymentTerms} onChange={(value) => onChange({ paymentTerms: value })} placeholder="T/T 30 days after B/L date" />
          <Field id="senderName" label="署名（可选）" value={form.senderName} onChange={(value) => onChange({ senderName: value })} placeholder="Everett / Sales Dept." />
        </div>

        <div className="space-y-2">
          <Label>催款语气</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {REMINDER_STAGES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onStageChange(item.id)}
                aria-pressed={stage === item.id}
                className={cn(
                  'rounded-md border p-3 text-left transition-all',
                  stage === item.id
                    ? 'border-emerald-400 bg-emerald-50/80 dark:border-cyan-300/50 dark:bg-cyan-300/10'
                    : 'border-slate-200 bg-white/70 hover:border-emerald-200 dark:border-white/10 dark:bg-white/4'
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-950 dark:text-white">{item.label}</span>
                  <span className="text-xs text-slate-400">{item.range}</span>
                </span>
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.tone}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function recommendStageLabel(stage: ReminderStage): string {
  return REMINDER_STAGES.find((item) => item.id === stage)?.label ?? stage
}

function Field({ id, label, value, onChange, placeholder, autoFocus = false }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; autoFocus?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-11 font-medium" maxLength={120} autoFocus={autoFocus} />
    </div>
  )
}
