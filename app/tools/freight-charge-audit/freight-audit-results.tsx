// 名称: FOB/CIF 货代收费核对结果
// 描述: 展示账单合计、责任拆分、异常项目和复核操作
// 路径: Globokit/app/tools/freight-charge-audit/freight-audit-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-22

import type { ComponentType } from 'react'
import { Check, CheckCircle2, CircleDollarSign, ClipboardCopy, FileWarning, Scale, ShieldAlert, WalletCards } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FREIGHT_AUDIT_PARTY_LABELS, type AuditedChargeLine, type ChargeAuditStatus, type FreightAuditResult } from '@/lib/tools/freight-charge-audit'
import { formatMoney } from './freight-audit-page-data'

const STATUS_STYLES: Record<ChargeAuditStatus, string> = {
  normal: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200',
  high: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-300/20 dark:bg-rose-300/10 dark:text-rose-200',
  'wrong-party': 'border-red-200 bg-red-50 text-red-700 dark:border-red-300/20 dark:bg-red-300/10 dark:text-red-200',
  review: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200',
  'missing-reference': 'border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200',
}

export function FreightAuditStats({ result }: { result: FreightAuditResult }) {
  const partyLabel = FREIGHT_AUDIT_PARTY_LABELS[result.auditParty]
  const cards: Array<{ label: string; value: string; caption: string; icon: ComponentType<{ className?: string }> }> = [
    { label: '账单合计', value: formatMoney(result.actualTotal, result.currency), caption: `${result.lines.length} 项费用`, icon: WalletCards },
    { label: `${partyLabel}责任费用`, value: formatMoney(result.matchedResponsibilityTotal, result.currency), caption: `${result.term} 常规责任边界`, icon: Scale },
    { label: `非${partyLabel}责任费用`, value: formatMoney(result.otherPartyResponsibilityTotal, result.currency), caption: `${result.wrongPartyCount} 项责任不匹配`, icon: ShieldAlert },
    { label: '重点复核金额', value: formatMoney(result.reviewAmount, result.currency), caption: '错收费全额 + 超基准差额', icon: CircleDollarSign },
  ]

  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{card.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold tabular-nums">{card.value}</div><p className="mt-1 text-xs text-muted-foreground">{card.caption}</p></CardContent></Card> })}</div>
}

export function FreightAuditResults({ result, copied, copyFailed, onCopy }: { result: FreightAuditResult; copied: boolean; copyFailed: boolean; onCopy: () => void }) {
  const issues = result.lines.filter((line) => line.status !== 'normal')
  const partyLabel = FREIGHT_AUDIT_PARTY_LABELS[result.auditParty]
  const hasLines = result.lines.length > 0
  const hasDefiniteIssue = result.highCount + result.wrongPartyCount > 0
  const title = !hasLines ? '等待录入账单' : hasDefiniteIssue ? '这份账单建议复核' : issues.length > 0 ? '存在待确认项目' : '未发现明显异常'
  const description = !hasLines
    ? '添加货代收费项目和核价基准后生成诊断。'
    : hasDefiniteIssue
    ? `发现 ${result.highCount} 项高于基准、${result.wrongPartyCount} 项与${partyLabel}责任不匹配。`
    : issues.length > 0 ? '价格或责任依据还不完整，补齐后再确认。' : '已录入项目均符合当前责任边界与基准容差。'

  return (
    <div className="space-y-6">
      <Card className={cn(hasDefiniteIssue && 'border-rose-200 dark:border-rose-300/20')}>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3"><div><CardTitle className="flex items-center gap-2">{hasDefiniteIssue ? <FileWarning className="h-5 w-5 text-rose-600" /> : <CheckCircle2 className="h-5 w-5 text-emerald-600" />}{title}</CardTitle><CardDescription className="mt-1">{description}</CardDescription></div><Badge variant="outline">{result.term} · {partyLabel} · 容差 {result.tolerancePercent}%</Badge></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 rounded-md bg-muted/50 p-4 text-sm"><Metric label="账单基准合计" value={formatMoney(result.benchmarkTotal, result.currency)} /><Metric label="需核对约定费用" value={formatMoney(result.agreementReviewTotal, result.currency)} /><Metric label="高于基准" value={`${result.highCount} 项`} /><Metric label="缺少基准" value={`${result.missingReferenceCount} 项`} /></div>
          <div><Button type="button" disabled={!hasLines} onClick={onCopy}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制给货代复核'}</Button>{copyFailed && <p className="mt-2 text-xs text-rose-600">复制失败，请检查浏览器剪贴板权限后重试。</p>}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>逐项诊断</CardTitle><CardDescription>先看责任归属，再看实际收费是否超过核价基准</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {issues.length === 0 ? <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed px-4 text-center text-sm text-muted-foreground">{hasLines ? '全部项目均在当前责任边界与基准容差内' : '录入费用后，这里会显示需要复核的项目'}</div> : issues.map((line) => <IssueRow key={line.id} line={line} currency={result.currency} />)}
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-semibold tabular-nums">{value}</p></div>
}

function IssueRow({ line, currency }: { line: AuditedChargeLine; currency: FreightAuditResult['currency'] }) {
  return (
    <div className="rounded-md border p-4">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{line.name}</p><p className="mt-1 text-xs text-muted-foreground">{line.responsibilityLabel}</p></div><Badge variant="outline" className={STATUS_STYLES[line.status]}>{line.statusLabel}</Badge></div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{line.reason}</p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs"><span>实收 <strong className="tabular-nums">{formatMoney(line.actual, currency)}</strong></span><span>基准 <strong className="tabular-nums">{line.benchmark > 0 ? formatMoney(line.benchmark, currency) : '未填写'}</strong></span>{line.reviewAmount > 0 && <span>复核 <strong className="tabular-nums text-rose-600">{formatMoney(line.reviewAmount, currency)}</strong></span>}</div>
    </div>
  )
}
