// 名称: 纸箱包装方案对比表单
// 描述: 编辑运输口径、箱规、装箱量、重量与包装成本
// 路径: Globokit/app/tools/packaging-plan-comparison/packaging-plan-form.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { Boxes, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAX_PACKAGING_PLANS, MIN_PACKAGING_PLANS, type PackagingShippingMode } from '@/lib/tools/packaging-plan-comparison'
import { PACKAGING_PRESETS, type PackagingCommonField, type PackagingComparisonFormState, type PackagingPlanFormState, type PackagingPlanNumericField } from './packaging-page-data'

interface PackagingPlanFormProps {
  form: PackagingComparisonFormState
  summaryText: string
  onCommonFieldChange: (field: PackagingCommonField, value: string) => void
  onModeChange: (mode: PackagingShippingMode) => void
  onPlanNameChange: (id: string, value: string) => void
  onPlanFieldChange: (id: string, field: PackagingPlanNumericField, value: string) => void
  onPreset: (values: Partial<PackagingComparisonFormState>) => void
  onAddPlan: () => void
  onRemovePlan: (id: string) => void
  onReset: () => void
}

export function PackagingPlanForm(props: PackagingPlanFormProps) {
  return <Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><Boxes className="h-5 w-5" />包装与运输参数</CardTitle><CardDescription>纸箱毛重应包含产品、内包装和外箱重量</CardDescription></div><div className="flex gap-2"><EnhancedCopyButton text={props.summaryText} variant="outline" size="sm" disabled={!props.summaryText}>复制摘要</EnhancedCopyButton><Button type="button" variant="outline" size="sm" onClick={props.onReset}><RefreshCw className="mr-2 h-4 w-4" />重置</Button></div></div></CardHeader><CardContent className="space-y-6">
    <Tabs value={props.form.shippingMode} onValueChange={(value) => props.onModeChange(value as PackagingShippingMode)}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="air">空运 / 快递</TabsTrigger><TabsTrigger value="ocean">海运 / 拼箱</TabsTrigger></TabsList></Tabs>
    <div className="grid gap-4 sm:grid-cols-2"><NumberField id="pack-total-units" label="产品总件数" suffix="件" value={props.form.totalUnits} integer autoFocus onChange={(value) => props.onCommonFieldChange('totalUnits', value)} />{props.form.shippingMode === 'air' ? <><NumberField id="pack-divisor" label="体积重系数" suffix="cm³/kg" value={props.form.volumetricDivisor} integer onChange={(value) => props.onCommonFieldChange('volumetricDivisor', value)} /><NumberField id="pack-air-rate" label="预估空运单价" suffix="CNY/kg" value={props.form.airRateCnyPerKg} onChange={(value) => props.onCommonFieldChange('airRateCnyPerKg', value)} /></> : <NumberField id="pack-ocean-rate" label="预估海运单价" suffix="CNY/CBM" value={props.form.oceanRateCnyPerCbm} onChange={(value) => props.onCommonFieldChange('oceanRateCnyPerCbm', value)} />}</div>
    <ScenarioPresets presets={PACKAGING_PRESETS} onSelect={props.onPreset} />
    <div className="space-y-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold">包装方案</h2><p className="mt-1 text-xs text-muted-foreground">同时比较 {MIN_PACKAGING_PLANS}–{MAX_PACKAGING_PLANS} 个候选箱规</p></div><Button type="button" variant="outline" size="sm" onClick={props.onAddPlan} disabled={props.form.plans.length >= MAX_PACKAGING_PLANS}><Plus className="mr-2 h-4 w-4" />添加方案</Button></div>{props.form.plans.map((plan, index) => <PlanEditor key={plan.id} plan={plan} index={index} removable={props.form.plans.length > MIN_PACKAGING_PLANS} onNameChange={props.onPlanNameChange} onFieldChange={props.onPlanFieldChange} onRemove={props.onRemovePlan} />)}</div>
    <p className="text-xs leading-5 text-muted-foreground">运输成本只使用单一运价估算。燃油附加、最低收费、港杂费、托盘费和偏远附加费应在确定包装方案后，转到对应运费工具继续核算。</p>
  </CardContent></Card>
}

function PlanEditor({ plan, index, removable, onNameChange, onFieldChange, onRemove }: { plan: PackagingPlanFormState; index: number; removable: boolean; onNameChange: (id: string, value: string) => void; onFieldChange: (id: string, field: PackagingPlanNumericField, value: string) => void; onRemove: (id: string) => void }) {
  const fields: Array<{ field: PackagingPlanNumericField; label: string; suffix: string; integer?: boolean }> = [
    { field: 'lengthCm', label: '外箱长度', suffix: 'cm' }, { field: 'widthCm', label: '外箱宽度', suffix: 'cm' }, { field: 'heightCm', label: '外箱高度', suffix: 'cm' },
    { field: 'unitsPerCarton', label: '每箱装量', suffix: '件', integer: true }, { field: 'grossWeightKg', label: '单箱毛重', suffix: 'kg' }, { field: 'cartonCostCny', label: '单箱包装成本', suffix: 'CNY' },
  ]
  return <div className="rounded-md border p-4"><div className="mb-4 flex items-end gap-3"><div className="min-w-0 flex-1 space-y-2"><Label htmlFor={`pack-name-${plan.id}`}>方案 {String.fromCharCode(65 + index)} 名称</Label><Input id={`pack-name-${plan.id}`} value={plan.name} onChange={(event) => onNameChange(plan.id, event.target.value)} className="h-11" /></div><Button type="button" variant="ghost" size="icon" disabled={!removable} onClick={() => onRemove(plan.id)} title={removable ? `删除${plan.name}` : '至少保留两个方案'} aria-label={removable ? `删除${plan.name}` : '至少保留两个方案'}><Trash2 className="h-4 w-4" /></Button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fields.map((field) => <NumberField key={field.field} id={`pack-${plan.id}-${field.field}`} label={field.label} suffix={field.suffix} value={plan[field.field]} integer={field.integer} onChange={(value) => onFieldChange(plan.id, field.field, value)} />)}</div></div>
}

function NumberField({ id, label, suffix, value, onChange, integer = false, autoFocus = false }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void; integer?: boolean; autoFocus?: boolean }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><div className="relative"><FormattedInput id={id} value={value} onChange={onChange} format={integer ? 'number' : 'decimal'} maxDecimals={2} autoFocusFirst={autoFocus} className="h-11 pr-24 font-medium" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] text-muted-foreground">{suffix}</span></div></div>
}
