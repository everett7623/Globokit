// 名称: 催款邮件预览
// 描述: 展示生成的邮件主题与正文，附催收行动建议
// 路径: Globokit/app/tools/payment-reminder-generator/payment-reminder-preview.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

import { MailWarning, Receipt, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { REMINDER_STAGES, type ReminderEmail } from '@/lib/tools/payment-reminder-generator'

export interface PaymentReminderPreviewProps {
  email: ReminderEmail
  plainText: string
}

export function PaymentReminderPreview({ email, plainText }: PaymentReminderPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2"><MailWarning className="h-5 w-5" />邮件预览 · {email.stageLabel}</CardTitle>
              <CardDescription>{email.toneNote}</CardDescription>
            </div>
            <EnhancedCopyButton text={plainText} variant="outline" size="sm">复制全文</EnhancedCopyButton>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border bg-muted/20 p-3">
            <p className="text-xs font-semibold text-muted-foreground">Subject</p>
            <p className="mt-1 break-words text-sm font-semibold">{email.subject}</p>
          </div>
          <div className="rounded-md border bg-white/85 p-4 dark:bg-white/4">
            <p className="whitespace-pre-wrap break-words text-sm leading-6">{email.body}</p>
          </div>
          <EnhancedCopyButton text={email.body} variant="ghost" size="sm">仅复制正文</EnhancedCopyButton>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-muted/30">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" />催收节奏</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {REMINDER_STAGES.map((stage) => (
              <div key={stage.id} className={stage.id === email.stage ? 'rounded-md border border-emerald-300 bg-emerald-50/70 p-2.5 dark:border-cyan-300/30 dark:bg-cyan-300/10' : 'rounded-md p-2.5'}>
                <p className="flex items-center justify-between gap-2 text-sm font-medium">
                  {stage.label}
                  <span className="text-xs text-muted-foreground">{stage.range}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stage.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-muted/30">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Receipt className="h-4 w-4" />本档注意事项</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
              {email.tips.map((tip) => <li key={tip} className="flex items-start gap-2"><Badge variant="outline" className="mt-1 shrink-0 border-0 bg-slate-950 px-1.5 py-0 text-[10px] text-white dark:bg-white dark:text-slate-950">•</Badge>{tip}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
