// 名称: 信用证交单自查结果
// 描述: 展示完成度、风险等级、未勾致命项与英文改证片段
// 路径: Globokit/app/tools/lc-discrepancy-checklist/lc-checklist-result.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

import { AlertTriangle, ClipboardCheck, Lightbulb, MailWarning } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import type { LcChecklistEvaluation } from '@/lib/tools/lc-discrepancy-checklist'
import { cn } from '@/lib/utils'

export interface LcChecklistResultProps {
  evaluation: LcChecklistEvaluation
  amendmentRequests: string[]
}

const RISK_BADGE: Record<LcChecklistEvaluation['riskLevel'], string> = {
  high: 'border-red-200 bg-red-50 text-red-700 dark:border-red-300/20 dark:bg-red-300/10 dark:text-red-300',
  medium: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-300',
  low: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-300',
}

export function LcChecklistResult({ evaluation, amendmentRequests }: LcChecklistResultProps) {
  const stats = [
    { label: '完成度', value: `${evaluation.completionPercent}%`, note: `${evaluation.checkedCount}/${evaluation.totalItems} 项` },
    { label: '自查得分', value: `${evaluation.score}`, note: '按致命 10 / 重要 5 / 次要 2 加权' },
    { label: '未勾致命项', value: `${evaluation.uncheckedCritical.length}`, note: evaluation.uncheckedCritical.length > 0 ? '任一项都可能导致拒付' : '全部通过' },
    { label: '未勾重要项', value: `${evaluation.uncheckedMajor.length}`, note: '交单前建议复核' },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5" />风险评估</CardTitle>
              <CardDescription>{evaluation.summary}</CardDescription>
            </div>
            <Badge variant="outline" className={cn('shrink-0 px-3 py-1 text-sm font-semibold', RISK_BADGE[evaluation.riskLevel])}>
              {evaluation.riskLabel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10" role="progressbar" aria-valuenow={evaluation.completionPercent} aria-valuemin={0} aria-valuemax={100} aria-label="清单完成度">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                evaluation.riskLevel === 'low' ? 'bg-emerald-500' : evaluation.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-red-500'
              )}
              style={{ width: `${evaluation.completionPercent}%` }}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-md border bg-muted/20 px-3 py-2">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-xl font-bold tabular-nums">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
              </div>
            ))}
          </div>

          {evaluation.uncheckedCritical.length > 0 && (
            <div className="space-y-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm dark:border-red-300/20 dark:bg-red-300/10">
              <p className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-300"><AlertTriangle className="h-4 w-4" />未解决的致命项（{evaluation.uncheckedCritical.length}）</p>
              <ul className="ml-6 list-disc space-y-1 text-red-700/90 dark:text-red-200/90">
                {evaluation.uncheckedCritical.map((item) => <li key={item.id}>{item.text}</li>)}
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold"><Lightbulb className="h-4 w-4 text-amber-600" />下一步建议</p>
            <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
              {evaluation.advice.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MailWarning className="h-5 w-5" />英文改证/确认片段</CardTitle>
          <CardDescription>针对未勾致命项生成，可直接粘贴进邮件或交单面函</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {amendmentRequests.length === 0 ? (
            <p className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">致命项全部通过，无需生成改证片段</p>
          ) : (
            amendmentRequests.map((sentence) => (
              <div key={sentence} className="flex items-start justify-between gap-3 rounded-md border bg-muted/20 p-3">
                <p className="min-w-0 flex-1 break-words text-sm leading-6">{sentence}</p>
                <EnhancedCopyButton text={sentence} variant="outline" size="sm">复制</EnhancedCopyButton>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
