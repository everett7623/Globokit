// 名称: 交期计算表单
// 描述: 展示起始日期、阶段天数、日期口径和节假日选项
// 路径: Globokit/app/tools/delivery-date-calculator/delivery-date-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-21

import { Check, ClipboardCopy, Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DELIVERY_COUNTRIES, type DeliveryDayMode } from '@/lib/tools/delivery-date-calculator'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import { DELIVERY_PRESETS, type DayField, type DeliveryDateFormState } from './delivery-date-page-data'

interface DeliveryDateFormProps {
  form: DeliveryDateFormState
  copied: boolean
  canCopy: boolean
  onStartDate: (value: string) => void
  onDayField: (field: DayField, value: string) => void
  onMode: (value: DeliveryDayMode) => void
  onHolidayToggle: () => void
  onCountry: (value: string) => void
  onPreset: (values: Partial<DeliveryDateFormState>) => void
  onCopy: () => void
  onReset: () => void
}

export function DeliveryDateForm(props: DeliveryDateFormProps) {
  const holidaysEnabled = props.form.dayMode === 'business'
  return (
    <Card>
      <CardHeader><CardTitle>交期参数</CardTitle><CardDescription>起始日不计入天数，三个阶段按顺序累加</CardDescription></CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2"><Label htmlFor="startDate">起始日期</Label><Input id="startDate" type="date" value={props.form.startDate} onChange={(event) => props.onStartDate(event.target.value)} className="h-11 font-mono" /></div>
        <div className="grid gap-4 md:grid-cols-3">
          <DayInput field="productionDays" label="生产周期" value={props.form.productionDays} onChange={props.onDayField} />
          <DayInput field="transitDays" label="运输周期" value={props.form.transitDays} onChange={props.onDayField} />
          <DayInput field="bufferDays" label="缓冲时间" value={props.form.bufferDays} onChange={props.onDayField} />
        </div>
        <ScenarioPresets presets={DELIVERY_PRESETS} onSelect={props.onPreset} />
        <div className="space-y-2"><Label htmlFor="dayMode">计算口径</Label><Select value={props.form.dayMode} onValueChange={(value) => props.onMode(value as DeliveryDayMode)}><SelectTrigger id="dayMode" className="h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="calendar">自然日</SelectItem><SelectItem value="business">工作日（排除周末）</SelectItem></SelectContent></Select></div>
        <div className="space-y-3 rounded-md border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-medium">排除法定公共假日</p><p className="text-xs text-muted-foreground">仅工作日模式可用，数据覆盖 2025–2027</p></div><Button type="button" size="sm" variant={props.form.excludeHolidays ? 'default' : 'outline'} disabled={!holidaysEnabled} aria-pressed={props.form.excludeHolidays} onClick={props.onHolidayToggle}>{props.form.excludeHolidays ? '已启用' : '未启用'}</Button></div>
          <div className="space-y-2"><Label htmlFor="holidayCountry">节假日国家/地区</Label><Select value={props.form.countryCode} onValueChange={props.onCountry} disabled={!holidaysEnabled || !props.form.excludeHolidays}><SelectTrigger id="holidayCountry" className="h-11"><SelectValue /></SelectTrigger><SelectContent>{DELIVERY_COUNTRIES.map((country) => <SelectItem key={country.code} value={country.code}>{country.label}</SelectItem>)}</SelectContent></Select></div>
        </div>
        <Alert><Info className="h-4 w-4" /><AlertDescription>工作日口径统一应用于生产、运输和缓冲阶段；实际交期仍应结合供应商排产、船期和清关安排确认。</AlertDescription></Alert>
        <div className="flex flex-wrap gap-2"><Button type="button" disabled={!props.canCopy} onClick={props.onCopy}>{props.copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{props.copied ? '英文摘要已复制' : '复制英文摘要'}</Button><Button type="button" variant="outline" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button></div>
      </CardContent>
    </Card>
  )
}

function DayInput({ field, label, value, onChange }: { field: DayField; label: string; value: string; onChange: (field: DayField, value: string) => void }) {
  return <div className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode="numeric" pattern="[0-9]*" value={value} onChange={(event) => onChange(field, event.target.value)} className="h-11 pr-12 tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-muted-foreground">天</span></div></div>
}
