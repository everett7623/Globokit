// 名称: 外贸阶梯报价表单
// 描述: 编辑币种、费用、利润率和数量采购成本档位
// 路径: Globokit/app/tools/tiered-quote-calculator/tiered-quote-form.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

import { ListOrdered, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MAX_QUOTE_TIERS, MIN_QUOTE_TIERS, TIERED_QUOTE_CURRENCY_OPTIONS, type TieredQuoteCurrency } from '@/lib/tools/tiered-quote-calculator'
import { TIERED_QUOTE_PRESETS, type QuoteCommonField, type TieredQuoteFormState, type TierFormState, type TierNumericField } from './tiered-quote-page-data'

interface TieredQuoteFormProps {
  form: TieredQuoteFormState
  summaryText: string
  onCommonFieldChange: (field: QuoteCommonField, value: string) => void
  onCurrencyChange: (currency: TieredQuoteCurrency, rate: string) => void
  onTierLabelChange: (id: string, value: string) => void
  onTierFieldChange: (id: string, field: TierNumericField, value: string) => void
  onPreset: (values: Partial<TieredQuoteFormState>) => void
  onAddTier: () => void
  onRemoveTier: (id: string) => void
  onReset: () => void
}

export function TieredQuoteForm(props: TieredQuoteFormProps) {
  return <Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><ListOrdered className="h-5 w-5" />报价与成本参数</CardTitle><CardDescription>每个数量档位可使用不同的采购单价</CardDescription></div><div className="flex gap-2"><EnhancedCopyButton text={props.summaryText} variant="outline" size="sm" disabled={!props.summaryText}>复制摘要</EnhancedCopyButton><Button type="button" variant="outline" size="sm" onClick={props.onReset}><RefreshCw className="mr-2 h-4 w-4" />重置</Button></div></div></CardHeader><CardContent className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="tiered-currency">报价币种</Label><Select value={props.form.currency} onValueChange={(value) => { const option = TIERED_QUOTE_CURRENCY_OPTIONS.find((item) => item.value === value); props.onCurrencyChange(value as TieredQuoteCurrency, String(option?.rate ?? props.form.exchangeRate)) }}><SelectTrigger id="tiered-currency" className="h-11"><SelectValue /></SelectTrigger><SelectContent>{TIERED_QUOTE_CURRENCY_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div><NumberField id="tiered-rate" label="结算汇率" suffix={`CNY/${props.form.currency}`} value={props.form.exchangeRate} onChange={(value) => props.onCommonFieldChange('exchangeRate', value)} /><NumberField id="tiered-fixed-cost" label="每单固定费用" suffix="CNY" value={props.form.fixedOrderCostCny} onChange={(value) => props.onCommonFieldChange('fixedOrderCostCny', value)} /><NumberField id="tiered-margin" label="目标销售利润率" suffix="%" value={props.form.targetMarginPercent} onChange={(value) => props.onCommonFieldChange('targetMarginPercent', value)} /><NumberField id="tiered-commission" label="佣金率" suffix="%" value={props.form.commissionPercent} onChange={(value) => props.onCommonFieldChange('commissionPercent', value)} /><NumberField id="tiered-payment-fee" label="收款费率" suffix="%" value={props.form.paymentFeePercent} onChange={(value) => props.onCommonFieldChange('paymentFeePercent', value)} /><NumberField id="tiered-rounding" label="向上取整步长" suffix={props.form.currency} value={props.form.roundingIncrementForeign} onChange={(value) => props.onCommonFieldChange('roundingIncrementForeign', value)} /></div>
    <ScenarioPresets presets={TIERED_QUOTE_PRESETS} onSelect={props.onPreset} />
    <div className="space-y-4"><div className="flex items-center justify-between gap-3"><div><h2 className="text-sm font-semibold">数量档位</h2><p className="mt-1 text-xs text-muted-foreground">同时比较 {MIN_QUOTE_TIERS}–{MAX_QUOTE_TIERS} 个报价档位</p></div><Button type="button" variant="outline" size="sm" onClick={props.onAddTier} disabled={props.form.tiers.length >= MAX_QUOTE_TIERS}><Plus className="mr-2 h-4 w-4" />添加档位</Button></div>{props.form.tiers.map((tier, index) => <TierEditor key={tier.id} tier={tier} index={index} removable={props.form.tiers.length > MIN_QUOTE_TIERS} onLabelChange={props.onTierLabelChange} onFieldChange={props.onTierFieldChange} onRemove={props.onRemoveTier} />)}</div>
    <p className="text-xs leading-5 text-muted-foreground">采购单价用于反映供应商的数量折扣；每单固定费用会按各档数量摊薄。运费、保险、税费和目的地费用应在确定档位后转到报价利润工具核算。</p>
  </CardContent></Card>
}

function TierEditor({ tier, index, removable, onLabelChange, onFieldChange, onRemove }: { tier: TierFormState; index: number; removable: boolean; onLabelChange: (id: string, value: string) => void; onFieldChange: (id: string, field: TierNumericField, value: string) => void; onRemove: (id: string) => void }) {
  return <div className="rounded-md border p-4"><div className="mb-4 flex items-end gap-3"><div className="min-w-0 flex-1 space-y-2"><Label htmlFor={`tiered-label-${tier.id}`}>档位 {index + 1} 名称</Label><Input id={`tiered-label-${tier.id}`} value={tier.label} maxLength={40} onChange={(event) => onLabelChange(tier.id, event.target.value)} className="h-11" /></div><Button type="button" variant="ghost" size="icon" disabled={!removable} onClick={() => onRemove(tier.id)} title={removable ? `删除${tier.label}` : '至少保留两个档位'} aria-label={removable ? `删除${tier.label}` : '至少保留两个档位'}><Trash2 className="h-4 w-4" /></Button></div><div className="grid gap-4 sm:grid-cols-2"><NumberField id={`tiered-${tier.id}-quantity`} label="订购数量" suffix="件" value={tier.quantity} integer onChange={(value) => onFieldChange(tier.id, 'quantity', value)} /><NumberField id={`tiered-${tier.id}-unit-cost`} label="采购单价" suffix="CNY/件" value={tier.unitCostCny} onChange={(value) => onFieldChange(tier.id, 'unitCostCny', value)} /></div></div>
}

function NumberField({ id, label, suffix, value, onChange, integer = false }: { id: string; label: string; suffix: string; value: string; onChange: (value: string) => void; integer?: boolean }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><div className="relative"><FormattedInput id={id} value={value} onChange={onChange} format={integer ? 'number' : 'decimal'} maxDecimals={4} className="h-11 pr-24 font-medium" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] text-muted-foreground">{suffix}</span></div></div>
}
