// 名称: FOB/CIF 货代收费核对参数
// 描述: 展示贸易条款、币种、容差和演示场景控件
// 路径: Globokit/app/tools/freight-charge-audit/freight-audit-controls.tsx
// 作者: everettlabs
// 更新时间: 2026-07-22

import { Info, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FREIGHT_AUDIT_PARTY_LABELS, type FreightAuditCurrency, type FreightAuditParty, type FreightTradeTerm } from '@/lib/tools/freight-charge-audit'
import { EMPTY_AUDIT_PRESET, FREIGHT_AUDIT_PRESETS, type FreightAuditPreset } from './freight-audit-page-data'

interface FreightAuditControlsProps {
  term: FreightTradeTerm
  auditParty: FreightAuditParty
  currency: FreightAuditCurrency
  tolerancePercent: string
  onTermChange: (value: FreightTradeTerm) => void
  onAuditPartyChange: (value: FreightAuditParty) => void
  onCurrencyChange: (value: FreightAuditCurrency) => void
  onToleranceChange: (value: string) => void
  onPreset: (preset: FreightAuditPreset) => void
  onReset: () => void
}

export function FreightAuditControls(props: FreightAuditControlsProps) {
  const boundary = props.term === 'CIF' && props.auditParty === 'buyer'
    ? '目的港操作、换单、拆箱、进口清关和派送通常由客户承担，但价格仍需与目的港代理报价比较，避免到港后投诉。'
    : props.term === 'FOB'
    ? '卖方通常承担出口清关及货物装船前费用；国际海运、保险、目的港和进口费用通常由买方承担。'
    : '卖方通常承担出口清关、装船、国际海运和最低保险；目的港操作、进口清关与税费通常仍由买方承担。'
  const partyDescription = props.auditParty === 'seller'
    ? '核对出口卖方收到的起运端或主运账单'
    : '核对海外客户收到或将支付的目的港账单'

  return (
    <Card>
      <CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><CardTitle className="flex items-center gap-2"><SlidersHorizontal className="h-5 w-5" />核价口径</CardTitle><CardDescription>{partyDescription}</CardDescription></div><Button type="button" variant="outline" size="sm" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button></div></CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>贸易条款</Label><Tabs value={props.term} onValueChange={(value) => props.onTermChange(value as FreightTradeTerm)}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="FOB">FOB</TabsTrigger><TabsTrigger value="CIF">CIF</TabsTrigger></TabsList></Tabs></div>
          <div className="space-y-2"><Label>核对账单对象</Label><Tabs value={props.auditParty} onValueChange={(value) => props.onAuditPartyChange(value as FreightAuditParty)}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="seller">出口卖方</TabsTrigger><TabsTrigger value="buyer">海外客户</TabsTrigger></TabsList></Tabs></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="audit-currency">账单币种</Label><Select value={props.currency} onValueChange={(value) => props.onCurrencyChange(value as FreightAuditCurrency)}><SelectTrigger id="audit-currency"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="CNY">CNY 人民币</SelectItem><SelectItem value="USD">USD 美元</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="audit-tolerance">允许浮动</Label><div className="relative"><Input id="audit-tolerance" type="text" inputMode="decimal" value={props.tolerancePercent} onChange={(event) => props.onToleranceChange(event.target.value)} className="pr-10 tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">%</span></div></div>
        </div>
        <div className="space-y-2"><Label>常见账单</Label><div className="flex flex-wrap gap-2">{FREIGHT_AUDIT_PRESETS.map((preset) => <Button key={preset.label} type="button" variant="outline" size="sm" title={preset.description} onClick={() => props.onPreset(preset)}>{preset.label}</Button>)}<Button type="button" variant="ghost" size="sm" onClick={() => props.onPreset(EMPTY_AUDIT_PRESET)}>清空账单</Button></div></div>
        <Alert><Info className="h-4 w-4" /><AlertDescription><strong>{props.term} · {FREIGHT_AUDIT_PARTY_LABELS[props.auditParty]}：</strong>{boundary} 实际合同、订舱委托与异常原因优先。</AlertDescription></Alert>
      </CardContent>
    </Card>
  )
}
