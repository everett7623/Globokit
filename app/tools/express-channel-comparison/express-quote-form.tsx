// 名称: 快递专线货代报价表单
// 描述: 录入运输方式、贸易条款、泡重口径、报价方式和时效
// 路径: Globokit/app/tools/express-channel-comparison/express-quote-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-24

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BadgeDollarSign, Info } from 'lucide-react'
import type { ExpressPricingMode, ExpressServiceType, ExpressTradeTerm } from '@/lib/tools/express-channel-comparison'
import {
  PRICING_MODE_OPTIONS,
  SERVICE_OPTIONS,
  TRADE_TERM_OPTIONS,
  type ChannelForm,
  type ChannelNumericField,
} from './express-comparison-page-data'

interface ExpressQuoteFormProps {
  channels: ChannelForm[]
  onNameChange: (id: string, value: string) => void
  onServiceChange: (id: string, value: ExpressServiceType) => void
  onTradeTermChange: (id: string, value: ExpressTradeTerm) => void
  onPricingModeChange: (id: string, value: ExpressPricingMode) => void
  onNumericChange: (id: string, field: ChannelNumericField, value: string) => void
}

export function ExpressQuoteForm(props: ExpressQuoteFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BadgeDollarSign className="h-5 w-5" />货代报价</CardTitle>
        <CardDescription>分别保留每个渠道的重量口径、报价方式和责任范围</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-3">
          {props.channels.map((channel) => <ChannelPanel key={channel.id} channel={channel} {...props} />)}
        </div>
      </CardContent>
    </Card>
  )
}

function ChannelPanel(props: ExpressQuoteFormProps & { channel: ChannelForm }) {
  const { channel } = props
  const quoteLabel = channel.pricingMode === 'per-kg' ? '货代单价' : '整票报价'
  const quoteSuffix = channel.pricingMode === 'per-kg' ? 'CNY/kg' : 'CNY'
  const hasSeparateFees = channel.pricingMode !== 'all-in'

  return (
    <section className="space-y-4 rounded-md border p-4">
      <div className="space-y-2"><Label htmlFor={`${channel.id}-name`}>货代/渠道名称</Label><Input id={`${channel.id}-name`} value={channel.name} onChange={(event) => props.onNameChange(channel.id, event.target.value)} className="font-semibold" /></div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        <SelectField id={`${channel.id}-service`} label="运输方式" value={channel.serviceType} options={SERVICE_OPTIONS} onChange={(value) => props.onServiceChange(channel.id, value as ExpressServiceType)} />
        <SelectField id={`${channel.id}-term`} label="报价范围" value={channel.tradeTerm} options={TRADE_TERM_OPTIONS} onChange={(value) => props.onTradeTermChange(channel.id, value as ExpressTradeTerm)} />
      </div>
      <NumberField id={channel.id} field="divisor" label="泡重系数" suffix="cm3/kg" value={channel.divisor} onChange={props.onNumericChange} />
      <div className="space-y-2">
        <Label>货代报价方式</Label>
        <Tabs value={channel.pricingMode} onValueChange={(value) => props.onPricingModeChange(channel.id, value as ExpressPricingMode)}>
          <TabsList className="grid h-auto w-full grid-cols-3">
            {PRICING_MODE_OPTIONS.map((option) => <TabsTrigger key={option.value} value={option.value} className="min-h-9 whitespace-normal px-1 text-xs leading-4">{option.label}</TabsTrigger>)}
          </TabsList>
        </Tabs>
      </div>
      <NumberField id={channel.id} field="quoteAmountCny" label={quoteLabel} suffix={quoteSuffix} value={channel.quoteAmountCny} onChange={props.onNumericChange} />
      <div className="grid grid-cols-2 gap-3">
        <NumberField id={channel.id} field="transitDaysMin" label="最快时效" suffix="天" value={channel.transitDaysMin} onChange={props.onNumericChange} />
        <NumberField id={channel.id} field="transitDaysMax" label="最慢时效" suffix="天" value={channel.transitDaysMax} onChange={props.onNumericChange} />
      </div>
      {hasSeparateFees ? <div className="grid grid-cols-2 gap-3">
        <NumberField id={channel.id} field="fuelRatePercent" label="燃油附加" suffix="%" value={channel.fuelRatePercent} onChange={props.onNumericChange} />
        <NumberField id={channel.id} field="remoteFeeCny" label="偏远附加" suffix="CNY" value={channel.remoteFeeCny} onChange={props.onNumericChange} />
        <NumberField id={channel.id} field="customsFeeCny" label="报关/操作" suffix="CNY" value={channel.customsFeeCny} onChange={props.onNumericChange} />
        <NumberField id={channel.id} field="otherFeeCny" label="其他附加" suffix="CNY" value={channel.otherFeeCny} onChange={props.onNumericChange} />
      </div> : <Alert><Info className="h-4 w-4" /><AlertDescription>整票一口价作为最终费用，不再重复累加附加费。</AlertDescription></Alert>}
    </section>
  )
}

function SelectField({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger id={id}><SelectValue /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>
}

function NumberField({ id, field, label, suffix, value, onChange }: { id: string; field: ChannelNumericField; label: string; suffix: string; value: string; onChange: (id: string, field: ChannelNumericField, value: string) => void }) {
  const inputId = `${id}-${field}`
  return <div className="space-y-2"><Label htmlFor={inputId}>{label}</Label><div className="relative"><Input id={inputId} inputMode="decimal" value={value} onChange={(event) => onChange(id, field, event.target.value)} className="pr-16 tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-3 flex max-w-14 items-center text-right text-xs text-muted-foreground">{suffix}</span></div></div>
}
