// 名称: 供应商报价对比表单
// 描述: 编辑计划数量、税价口径和各供应商采购参数
// 路径: Globokit/app/tools/supplier-quote-comparison/supplier-quote-form.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { Factory, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MAX_SUPPLIER_QUOTES, MIN_SUPPLIER_QUOTES, SUPPLIER_QUOTE_CURRENCY_OPTIONS, type SupplierQuoteCurrency, type SupplierQuoteTaxMode } from '@/lib/tools/supplier-quote-comparison'
import { SUPPLIER_QUOTE_PRESETS, type SupplierCommonField, type SupplierComparisonFormState, type SupplierNumericField, type SupplierQuoteFormState } from './supplier-quote-page-data'

interface SupplierQuoteFormProps {
  form: SupplierComparisonFormState
  summaryText: string
  onCommonFieldChange: (field: SupplierCommonField, value: string) => void
  onCurrencyChange: (currency: SupplierQuoteCurrency) => void
  onSupplierNameChange: (id: string, value: string) => void
  onSupplierTaxModeChange: (id: string, value: SupplierQuoteTaxMode) => void
  onSupplierFieldChange: (id: string, field: SupplierNumericField, value: string) => void
  onPreset: (values: SupplierComparisonFormState) => void
  onAddSupplier: () => void
  onRemoveSupplier: (id: string) => void
  onReset: () => void
}

export function SupplierQuoteForm(props: SupplierQuoteFormProps) {
  return <Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><Factory className="h-5 w-5" />采购需求与报价</CardTitle><CardDescription>所有供应商使用同一核算币种</CardDescription></div><div className="flex gap-2"><EnhancedCopyButton text={props.summaryText} variant="outline" size="sm" disabled={!props.summaryText}>复制摘要</EnhancedCopyButton><Button type="button" variant="outline" size="sm" onClick={props.onReset}><RefreshCw className="mr-2 h-4 w-4" />重置</Button></div></div></CardHeader><CardContent className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="supplier-currency">核算币种</Label><Select value={props.form.currency} onValueChange={(value) => props.onCurrencyChange(value as SupplierQuoteCurrency)}><SelectTrigger id="supplier-currency" className="h-11"><SelectValue /></SelectTrigger><SelectContent>{SUPPLIER_QUOTE_CURRENCY_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div><NumberField id="supplier-required-units" label="计划合格品数量" suffix="件" value={props.form.requiredGoodUnits} integer onChange={(value) => props.onCommonFieldChange('requiredGoodUnits', value)} /></div>
    <ScenarioPresets presets={SUPPLIER_QUOTE_PRESETS} onSelect={props.onPreset} />
    <div className="space-y-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold">供应商报价</h2><p className="mt-1 text-xs text-muted-foreground">同时比较 {MIN_SUPPLIER_QUOTES}–{MAX_SUPPLIER_QUOTES} 家供应商</p></div><Button type="button" variant="outline" size="sm" onClick={props.onAddSupplier} disabled={props.form.suppliers.length >= MAX_SUPPLIER_QUOTES}><Plus className="mr-2 h-4 w-4" />添加供应商</Button></div>{props.form.suppliers.map((supplier, index) => <SupplierEditor key={supplier.id} supplier={supplier} index={index} currency={props.form.currency} removable={props.form.suppliers.length > MIN_SUPPLIER_QUOTES} onNameChange={props.onSupplierNameChange} onTaxModeChange={props.onSupplierTaxModeChange} onFieldChange={props.onSupplierFieldChange} onRemove={props.onRemoveSupplier} />)}</div>
    <p className="text-xs leading-5 text-muted-foreground">固定费用可录入打样、开模、制版或认证费；国内运费按最终应付金额录入。首付仅按货款计算，不自动包含固定费用和运费。</p>
  </CardContent></Card>
}

function SupplierEditor({ supplier, index, currency, removable, onNameChange, onTaxModeChange, onFieldChange, onRemove }: { supplier: SupplierQuoteFormState; index: number; currency: SupplierQuoteCurrency; removable: boolean; onNameChange: (id: string, value: string) => void; onTaxModeChange: (id: string, value: SupplierQuoteTaxMode) => void; onFieldChange: (id: string, field: SupplierNumericField, value: string) => void; onRemove: (id: string) => void }) {
  const fields: Array<{ field: SupplierNumericField; label: string; suffix: string; integer?: boolean }> = [
    { field: 'quotedUnitPrice', label: '供应商报价单价', suffix: `${currency}/件` }, { field: 'vatRatePercent', label: '增值税率', suffix: '%' }, { field: 'minimumOrderQuantity', label: '起订量 MOQ', suffix: '件', integer: true }, { field: 'defectAllowancePercent', label: '次品预留率', suffix: '%' }, { field: 'fixedFee', label: '固定费用', suffix: currency }, { field: 'domesticFreight', label: '国内运费', suffix: currency }, { field: 'leadTimeDays', label: '交期', suffix: '天', integer: true }, { field: 'depositPercent', label: '货款首付比例', suffix: '%' },
  ]
  return <div className="rounded-md border p-4"><div className="mb-4 flex items-end gap-3"><div className="min-w-0 flex-1 space-y-2"><Label htmlFor={`supplier-name-${supplier.id}`}>供应商 {index + 1} 名称</Label><Input id={`supplier-name-${supplier.id}`} value={supplier.name} maxLength={40} onChange={(event) => onNameChange(supplier.id, event.target.value)} className="h-11" /></div><Button type="button" variant="ghost" size="icon" disabled={!removable} onClick={() => onRemove(supplier.id)} title={removable ? `删除${supplier.name}` : '至少保留两家供应商'} aria-label={removable ? `删除${supplier.name}` : '至少保留两家供应商'}><Trash2 className="h-4 w-4" /></Button></div><div className="mb-4 space-y-2"><Label>报价税价口径</Label><Tabs value={supplier.taxMode} onValueChange={(value) => onTaxModeChange(supplier.id, value as SupplierQuoteTaxMode)}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="tax-inclusive">含税报价</TabsTrigger><TabsTrigger value="tax-exclusive">未税报价</TabsTrigger></TabsList></Tabs></div><div className="grid gap-4 sm:grid-cols-2">{fields.map((field) => <NumberField key={field.field} id={`supplier-${supplier.id}-${field.field}`} label={field.label} suffix={field.suffix} value={supplier[field.field]} integer={field.integer} onChange={(value) => onFieldChange(supplier.id, field.field, value)} />)}</div></div>
}

function NumberField({ id, label, suffix, value, onChange, integer = false }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void; integer?: boolean }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><div className="relative"><FormattedInput id={id} value={value} onChange={onChange} format={integer ? 'number' : 'decimal'} maxDecimals={4} className="h-11 pr-24 font-medium" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] text-muted-foreground">{suffix}</span></div></div>
}
