// 名称: 货代账单明细编辑表
// 描述: 录入费用名称、费用类型、实际收费与核价基准
// 路径: Globokit/app/tools/freight-charge-audit/freight-audit-table.tsx
// 作者: everettlabs
// 更新时间: 2026-07-22

import { Plus, ReceiptText, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CHARGE_CATEGORY_OPTIONS, type ChargeCategory, type FreightAuditCurrency } from '@/lib/tools/freight-charge-audit'
import type { EditableChargeLine } from './freight-audit-page-data'

interface FreightAuditTableProps {
  currency: FreightAuditCurrency
  lines: EditableChargeLine[]
  onAdd: () => void
  onRemove: (id: string) => void
  onChange: (id: string, field: keyof Omit<EditableChargeLine, 'id'>, value: string) => void
}

export function FreightAuditTable({ currency, lines, onAdd, onRemove, onChange }: FreightAuditTableProps) {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div><CardTitle className="flex items-center gap-2"><ReceiptText className="h-5 w-5" />账单明细</CardTitle><CardDescription className="mt-1">基准价填写同港口、同票型或柜型、同货量的同行价或约定价格</CardDescription></div>
        <Button type="button" size="sm" variant="outline" onClick={onAdd}><Plus className="mr-2 h-4 w-4" />添加</Button>
      </CardHeader>
      <CardContent className="min-w-0">
        {lines.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed text-center"><ReceiptText className="mb-3 h-7 w-7 text-muted-foreground" /><p className="text-sm font-medium">暂无费用明细</p><Button type="button" variant="link" size="sm" onClick={onAdd}>添加第一项费用</Button></div>
        ) : (
          <div className="w-full max-w-full overflow-x-auto">
            <div className="min-w-[760px] space-y-2">
              <div className="grid grid-cols-[1.1fr_1.2fr_140px_140px_40px] gap-2 px-1 text-xs font-medium text-muted-foreground"><span>账单项目</span><span>费用类型</span><span>实际收费 ({currency})</span><span>基准价 ({currency})</span><span className="sr-only">操作</span></div>
              {lines.map((line) => (
                <div key={line.id} className="grid grid-cols-[1.1fr_1.2fr_140px_140px_40px] items-center gap-2 rounded-md border bg-background p-2">
                  <Input aria-label="账单项目" value={line.name} placeholder="如：THC" onChange={(event) => onChange(line.id, 'name', event.target.value)} />
                  <Select value={line.category} onValueChange={(value) => onChange(line.id, 'category', value as ChargeCategory)}><SelectTrigger aria-label="费用类型"><SelectValue /></SelectTrigger><SelectContent>{CHARGE_CATEGORY_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select>
                  <Input aria-label="实际收费" type="text" inputMode="decimal" value={line.actual} placeholder="0" onChange={(event) => onChange(line.id, 'actual', event.target.value)} className="tabular-nums" />
                  <Input aria-label="基准价" type="text" inputMode="decimal" value={line.benchmark} placeholder="未询价" onChange={(event) => onChange(line.id, 'benchmark', event.target.value)} className="tabular-nums" />
                  <Button type="button" variant="ghost" size="icon" title="删除费用" aria-label={`删除 ${line.name || '费用'}`} onClick={() => onRemove(line.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
