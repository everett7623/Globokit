// 名称: 信用证交单自查表单
// 描述: 分组展示审单要点复选框，支持全选、重置与信用证号输入
// 路径: Globokit/app/tools/lc-discrepancy-checklist/lc-checklist-form.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

import { ClipboardCheck, RotateCcw, ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  LC_CHECKLIST_GROUPS,
  getLcGroupItems,
  type LcChecklistItem,
} from '@/lib/tools/lc-discrepancy-checklist'
import { cn } from '@/lib/utils'

export interface LcChecklistFormProps {
  checkedIds: string[]
  creditNo: string
  onToggle: (itemId: string) => void
  onCreditNoChange: (value: string) => void
  onCheckAll: () => void
  onReset: () => void
}

const SEVERITY_META: Record<LcChecklistItem['severity'], { label: string; className: string }> = {
  critical: { label: '致命', className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-300/20 dark:bg-red-300/10 dark:text-red-300' },
  major: { label: '重要', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-300' },
  minor: { label: '次要', className: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-300/20 dark:bg-slate-300/10 dark:text-slate-300' },
}

export function LcChecklistForm({ checkedIds, creditNo, onToggle, onCreditNoChange, onCheckAll, onReset }: LcChecklistFormProps) {
  const checked = new Set(checkedIds)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5" />交单自查清单</CardTitle>
            <CardDescription>逐项勾选已核对通过的要点，实时评估交单风险</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onCheckAll}>
              <ListChecks className="mr-2 h-4 w-4" />全选
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="mr-2 h-4 w-4" />重置
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="creditNo">信用证号（可选，用于生成改证片段抬头）</Label>
          <Input id="creditNo" value={creditNo} onChange={(event) => onCreditNoChange(event.target.value)} className="h-11 font-medium" placeholder="如 LC-1234567890" maxLength={40} />
        </div>

        <div className="space-y-5">
          {LC_CHECKLIST_GROUPS.map((group) => {
            const items = getLcGroupItems(group.id)
            return (
              <div key={group.id} className="rounded-md border bg-muted/20 p-4">
                <div className="mb-3">
                  <h3 className="text-sm font-semibold">{group.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{group.description}</p>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-background">
                        <input
                          type="checkbox"
                          checked={checked.has(item.id)}
                          onChange={() => onToggle(item.id)}
                          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-emerald-600"
                          aria-label={item.text}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className={cn('text-sm', checked.has(item.id) && 'text-muted-foreground line-through')}>{item.text}</span>
                            <Badge variant="outline" className={SEVERITY_META[item.severity].className}>{SEVERITY_META[item.severity].label}</Badge>
                          </span>
                          {item.hint && <span className="mt-1 block text-xs text-muted-foreground">{item.hint}</span>}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
