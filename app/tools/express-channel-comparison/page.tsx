// 名称: 国际快递专线报价对比
// 描述: 按箱规、重量、运输方式和货代报价口径对比空运、快递与 DDP 专线
// 路径: Globokit/app/tools/express-channel-comparison/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-24

'use client'

import { useMemo, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Check, ClipboardCopy, RotateCcw } from 'lucide-react'
import {
  compareExpressChannels,
  EXPRESS_PRICING_MODE_LABELS,
  EXPRESS_SERVICE_LABELS,
  EXPRESS_TRADE_TERM_LABELS,
  type ExpressPricingMode,
  type ExpressServiceType,
  type ExpressTradeTerm,
} from '@/lib/tools/express-channel-comparison'
import { ExpressComparisonResults, ExpressComparisonStats, ExpressWeightSummary } from './express-comparison-results'
import {
  CARGO_TYPE_OPTIONS,
  INITIAL_CHANNELS,
  INITIAL_SHIPMENT,
  SERVICE_OPTIONS,
  formatNumber,
  money,
  toNumber,
  type CargoType,
  type ChannelForm,
  type ChannelNumericField,
  type ShipmentForm,
  type ShipmentNumericField,
  type ShipmentTextField,
} from './express-comparison-page-data'
import { ExpressQuoteForm } from './express-quote-form'
import { ExpressShipmentForm } from './express-shipment-form'

export default function ExpressChannelComparisonPage() {
  const [shipment, setShipment] = useState<ShipmentForm>(INITIAL_SHIPMENT)
  const [channels, setChannels] = useState<ChannelForm[]>(INITIAL_CHANNELS)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState('')
  const inputs = useMemo(() => ({
    lengthCm: toNumber(shipment.lengthCm), widthCm: toNumber(shipment.widthCm), heightCm: toNumber(shipment.heightCm),
    grossWeightKg: toNumber(shipment.grossWeightKg), netWeightKg: toNumber(shipment.netWeightKg), packageCount: toNumber(shipment.packageCount),
    channels: channels.map((channel) => ({
      ...channel,
      divisor: toNumber(channel.divisor), quoteAmountCny: toNumber(channel.quoteAmountCny), fuelRatePercent: toNumber(channel.fuelRatePercent),
      remoteFeeCny: toNumber(channel.remoteFeeCny), customsFeeCny: toNumber(channel.customsFeeCny), otherFeeCny: toNumber(channel.otherFeeCny),
      transitDaysMin: toNumber(channel.transitDaysMin), transitDaysMax: toNumber(channel.transitDaysMax),
    })),
  }), [shipment, channels])
  const results = useMemo(() => compareExpressChannels(inputs), [inputs])

  const updateShipment = (field: ShipmentTextField | ShipmentNumericField, value: string) => setShipment((current) => ({ ...current, [field]: value }))
  const updateChannel = <K extends keyof ChannelForm>(id: string, field: K, value: ChannelForm[K]) => setChannels((current) => current.map((channel) => channel.id === id ? { ...channel, [field]: value } : channel))
  const updateService = (id: string, serviceType: ExpressServiceType) => {
    const divisor = SERVICE_OPTIONS.find((option) => option.value === serviceType)?.divisor ?? 6000
    setChannels((current) => current.map((channel) => channel.id === id ? {
      ...channel,
      serviceType,
      divisor: String(divisor),
      ...(serviceType === 'ddp-line' ? { tradeTerm: 'DDP' as const } : {}),
    } : channel))
  }
  const reset = () => { setShipment(INITIAL_SHIPMENT); setChannels(INITIAL_CHANNELS); setCopied(false); setCopyError('') }
  const copy = async () => {
    const cargoType = CARGO_TYPE_OPTIONS.find((option) => option.value === shipment.cargoType)?.label ?? '未填写'
    const lines = [
      '国际快递/专线报价对比',
      `货物：${shipment.cargoName || '未填写'}（${cargoType}）`,
      `目的地：${shipment.destination || '未填写'}`,
      `箱规：${shipment.lengthCm} × ${shipment.widthCm} × ${shipment.heightCm} cm，${shipment.packageCount} 箱`,
      `单箱毛重/净重：${shipment.grossWeightKg}/${shipment.netWeightKg} kg`,
      ...results.map((row) => [
        '', `${row.name}：${EXPRESS_SERVICE_LABELS[row.serviceType]}，${EXPRESS_TRADE_TERM_LABELS[row.tradeTerm]}`,
        `报价方式：${EXPRESS_PRICING_MODE_LABELS[row.pricingMode]}`,
        `重量口径：/${formatNumber(row.divisor, 0)}，${row.billingBasis === 'volumetric' ? '按体积重' : '按实重'} ${formatNumber(row.chargeableWeightKg)} kg`,
        `费用：${money.format(row.totalCostCny)}，折合 ${money.format(row.perKgCny)}/kg`,
        `时效：${row.transitDaysMin}-${row.transitDaysMax} 天`,
      ].join('\n')),
    ]
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopyError('')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopyError('复制失败，请检查浏览器剪贴板权限。')
    }
  }

  return <>
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div><h1 className="mb-2 text-3xl font-bold">国际快递/专线报价对比</h1><p className="text-muted-foreground">自动判断实重或体积重，并区分空运、商业快递、DDP 专线及货代报价方式。</p></div>
      <div className="flex shrink-0 gap-2"><Button variant="outline" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button><Button onClick={copy} disabled={!results.length}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制结果'}</Button></div>
    </div>
    {copyError && <Alert variant="destructive" className="mb-6"><AlertDescription>{copyError}</AlertDescription></Alert>}
    <div className="space-y-6">
      <ExpressShipmentForm form={shipment} onTextChange={updateShipment} onNumericChange={updateShipment} onCargoTypeChange={(cargoType: CargoType) => setShipment((current) => ({ ...current, cargoType }))} />
      <ExpressWeightSummary shipment={shipment} />
      <ExpressQuoteForm
        channels={channels}
        onNameChange={(id, value) => updateChannel(id, 'name', value)}
        onServiceChange={updateService}
        onTradeTermChange={(id, value: ExpressTradeTerm) => updateChannel(id, 'tradeTerm', value)}
        onPricingModeChange={(id, value: ExpressPricingMode) => updateChannel(id, 'pricingMode', value)}
        onNumericChange={(id, field: ChannelNumericField, value) => updateChannel(id, field, value)}
      />
      <ExpressComparisonStats results={results} />
      <ExpressComparisonResults results={results} />
    </div>
  </>
}
