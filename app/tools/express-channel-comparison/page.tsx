'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Check, ClipboardCopy, Info, Package, RotateCcw, Timer, Trophy, Wallet } from 'lucide-react'
import { compareExpressChannels, ExpressChannelInput } from '@/lib/tools/express-channel-comparison'

type ChannelField = Exclude<keyof ExpressChannelInput, 'id' | 'name'>
type ChannelForm = { id: string; name: string } & Record<ChannelField, string>

const initialChannels: ChannelForm[] = [
  { id: 'a', name: '渠道 A', baseFreightCny: '1680', fuelRatePercent: '12', remoteFeeCny: '0', customsFeeCny: '180', otherFeeCny: '0', transitDays: '5' },
  { id: 'b', name: '渠道 B', baseFreightCny: '1520', fuelRatePercent: '18', remoteFeeCny: '120', customsFeeCny: '150', otherFeeCny: '0', transitDays: '7' },
  { id: 'c', name: '渠道 C', baseFreightCny: '1850', fuelRatePercent: '8', remoteFeeCny: '0', customsFeeCny: '200', otherFeeCny: '80', transitDays: '4' },
]
const fields: Array<{ key: ChannelField; label: string; suffix: string }> = [
  { key: 'baseFreightCny', label: '基础运费', suffix: 'CNY' }, { key: 'fuelRatePercent', label: '燃油附加', suffix: '%' },
  { key: 'remoteFeeCny', label: '偏远附加', suffix: 'CNY' }, { key: 'customsFeeCny', label: '报关/操作', suffix: 'CNY' },
  { key: 'otherFeeCny', label: '其他附加', suffix: 'CNY' }, { key: 'transitDays', label: '预计时效', suffix: '天' },
]
const toNumber = (value: string) => Number.isFinite(Number(value)) ? Number(value) : 0
const money = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 })

export default function ExpressChannelComparisonPage() {
  const [weight, setWeight] = useState('42')
  const [packages, setPackages] = useState('3')
  const [channels, setChannels] = useState(initialChannels)
  const [copied, setCopied] = useState(false)
  const results = useMemo(() => compareExpressChannels({ chargeableWeightKg: toNumber(weight), packageCount: toNumber(packages), channels: channels.map((channel) => ({ ...channel, baseFreightCny: toNumber(channel.baseFreightCny), fuelRatePercent: toNumber(channel.fuelRatePercent), remoteFeeCny: toNumber(channel.remoteFeeCny), customsFeeCny: toNumber(channel.customsFeeCny), otherFeeCny: toNumber(channel.otherFeeCny), transitDays: toNumber(channel.transitDays) })) }), [weight, packages, channels])
  const cheapest = results.find((row) => row.costRank === 1)
  const fastest = results.find((row) => row.speedRank === 1)
  const update = (id: string, key: keyof ChannelForm, value: string) => setChannels((current) => current.map((channel) => channel.id === id ? { ...channel, [key]: value } : channel))
  const copy = async () => { await navigator.clipboard.writeText(results.map((row) => `${row.name}：${money.format(row.totalCostCny)}，${row.transitDays} 天，${money.format(row.perKgCny)}/kg`).join('\n')); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }

  return <><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">快递渠道价格对比</h1><p className="text-muted-foreground">统一计入燃油、偏远、报关及其他附加费，对比不同渠道的真实成本与时效。</p></div>
    <div className="grid gap-4 md:grid-cols-3"><Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Trophy className="h-4 w-4" />最低成本</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{cheapest?.name}</div><p className="text-xs text-muted-foreground">{money.format(cheapest?.totalCostCny ?? 0)}</p></CardContent></Card><Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Timer className="h-4 w-4" />最快渠道</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{fastest?.name}</div><p className="text-xs text-muted-foreground">预计 {fastest?.transitDays} 天</p></CardContent></Card><Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Package className="h-4 w-4" />计费口径</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{weight} kg</div><p className="text-xs text-muted-foreground">{packages} 件包裹</p></CardContent></Card></div>
    <Card className="mt-6"><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:justify-between"><div><CardTitle>报价参数</CardTitle><CardDescription>渠道名称和所有费用均可按货代报价修改</CardDescription></div><Button variant="outline" size="sm" onClick={() => { setWeight('42'); setPackages('3'); setChannels(initialChannels) }}><RotateCcw className="mr-2 h-4 w-4" />重置</Button></div></CardHeader><CardContent className="space-y-6"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="weight">计费重量（kg）</Label><Input id="weight" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="packages">包裹件数</Label><Input id="packages" inputMode="numeric" value={packages} onChange={(e) => setPackages(e.target.value)} /></div></div>
      <div className="grid gap-4 xl:grid-cols-3">{channels.map((channel) => <div key={channel.id} className="rounded-md border p-4"><Input aria-label={`${channel.name}名称`} value={channel.name} onChange={(e) => update(channel.id, 'name', e.target.value)} className="mb-4 font-semibold" /><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">{fields.map((field) => <div key={field.key} className="space-y-1.5"><Label htmlFor={`${channel.id}-${field.key}`} className="text-xs">{field.label}</Label><div className="relative"><Input id={`${channel.id}-${field.key}`} inputMode="decimal" value={channel[field.key]} onChange={(e) => update(channel.id, field.key, e.target.value)} className="pr-16 tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{field.suffix}</span></div></div>)}</div></div>)}</div>
      <Alert><Info className="h-4 w-4" /><AlertDescription>请使用相同计费重量和币种的报价。关税、进口增值税及可能发生的退件费用未计入。</AlertDescription></Alert><Button onClick={copy}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制对比结果'}</Button></CardContent></Card>
    <div className="mt-6 grid gap-4 lg:grid-cols-3">{results.sort((a, b) => a.costRank - b.costRank).map((row) => <Card key={row.id} className={row.costRank === 1 ? 'border-emerald-300' : ''}><CardHeader><CardTitle className="flex items-center justify-between gap-2"><span>{row.name}</span><Badge variant={row.costRank === 1 ? 'default' : 'secondary'}>成本第 {row.costRank}</Badge></CardTitle><CardDescription>时效第 {row.speedRank} · 预计 {row.transitDays} 天</CardDescription></CardHeader><CardContent className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">费用合计</span><span className="text-2xl font-bold">{money.format(row.totalCostCny)}</span></div><div className="flex justify-between text-sm"><span>每公斤</span><span>{money.format(row.perKgCny)}</span></div><div className="flex justify-between text-sm"><span>每件包裹</span><span>{money.format(row.perPackageCny)}</span></div><div className="flex justify-between text-sm"><span>燃油附加</span><span>{money.format(row.fuelFeeCny)}</span></div><div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground"><Wallet className="h-3.5 w-3.5" />已包含所有录入附加费</div></CardContent></Card>)}</div>
  </>
}
