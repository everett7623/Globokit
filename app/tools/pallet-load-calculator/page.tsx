'use client'

import { useMemo, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Boxes, Check, ClipboardCopy, Info, Layers3, RotateCcw, Weight } from 'lucide-react'
import { calculatePalletLoad, DEFAULT_PALLET_LOAD_INPUTS, PALLET_SPECS, PalletLoadInputs, PalletType } from '@/lib/tools/pallet-load-calculator'
import { ScenarioPresets, type ScenarioPreset } from '@/components/tools/scenario-presets'

type NumericField = Exclude<keyof PalletLoadInputs, 'palletType'>
type FormState = Record<NumericField, string> & { palletType: PalletType }
const initialForm = Object.fromEntries(Object.entries(DEFAULT_PALLET_LOAD_INPUTS).map(([key, value]) => [key, String(value)])) as unknown as FormState
initialForm.palletType = DEFAULT_PALLET_LOAD_INPUTS.palletType
const number = (value: string) => Number.isFinite(Number.parseFloat(value)) ? Number.parseFloat(value) : 0
const fields: Array<{ field: NumericField; label: string; suffix: string }> = [
  { field: 'cartonLengthCm', label: '纸箱长', suffix: 'cm' }, { field: 'cartonWidthCm', label: '纸箱宽', suffix: 'cm' },
  { field: 'cartonHeightCm', label: '纸箱高', suffix: 'cm' }, { field: 'cartonWeightKg', label: '单箱毛重', suffix: 'kg' },
  { field: 'cartonQuantity', label: '货物总箱数', suffix: '箱' }, { field: 'maxLoadedHeightCm', label: '最大含托高度', suffix: 'cm' },
  { field: 'maxGrossWeightKg', label: '单托限重', suffix: 'kg' },
]
const PALLET_PRESETS: Array<ScenarioPreset<Partial<FormState>>> = [
  { label: '国内/海运托', description: '120×100 cm 中国标准托盘，常用含托高度和载重预算', values: { palletType: 'china', maxLoadedHeightCm: '180', maxGrossWeightKg: '1000' } },
  { label: '欧洲 EUR 托', description: '120×80 cm 欧标托盘，适合欧洲仓库和客户收货要求初算', values: { palletType: 'euro', maxLoadedHeightCm: '180', maxGrossWeightKg: '1000' } },
  { label: '北美 48×40', description: '北美常用 48×40 inch 托盘规格', values: { palletType: 'north-america', maxLoadedHeightCm: '180', maxGrossWeightKg: '1000' } },
  { label: '空运低托', description: '按较低含托高度和较轻载重预估，最终以航空公司或货代限制为准', values: { palletType: 'china', maxLoadedHeightCm: '160', maxGrossWeightKg: '700' } },
]

export default function PalletLoadCalculatorPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [copied, setCopied] = useState(false)
  const inputs = useMemo(() => Object.fromEntries(Object.entries(form).map(([key, value]) => [key, key === 'palletType' ? value : number(value)])) as unknown as PalletLoadInputs, [form])
  const result = useMemo(() => calculatePalletLoad(inputs), [inputs])
  const noFit = result.cartonsPerPallet === 0
  const copy = async () => {
    await navigator.clipboard.writeText(['托盘装载测算', `纸箱：${form.cartonLengthCm} × ${form.cartonWidthCm} × ${form.cartonHeightCm} cm，${form.cartonWeightKg} kg/箱`, `货物总数：${form.cartonQuantity} 箱`, `托盘：${result.pallet.name}`, `限制：含托高 ${form.maxLoadedHeightCm} cm，单托毛重 ${form.maxGrossWeightKg} kg`, `单层：${result.bestOrientation.cartonsPerLayer} 箱`, `层数：${result.maxLayers} 层`, `单托：${result.cartonsPerPallet} 箱`, `预计托盘数：${result.requiredPallets} 托（末托 ${result.lastPalletCartons} 箱）`, `单托毛重：${result.grossWeightKg} kg`, `含托高度：${result.loadedHeightCm} cm`, `限制因素：${result.limitingFactor === 'weight' ? '载重' : '尺寸/高度'}`].join('\n'))
    setCopied(true); window.setTimeout(() => setCopied(false), 1800)
  }
  const cards = [
    { label: '单层箱数', value: `${result.bestOrientation.cartonsPerLayer} 箱`, caption: `${result.bestOrientation.countLength} x ${result.bestOrientation.countWidth}`, icon: Boxes },
    { label: '单托箱数', value: `${result.cartonsPerPallet} 箱`, caption: `${result.maxLayers} 层`, icon: Layers3 },
    { label: '预计托盘数', value: `${result.requiredPallets} 托`, caption: `末托 ${result.lastPalletCartons} 箱`, icon: Boxes },
    { label: '单托毛重', value: `${result.grossWeightKg} kg`, caption: `含托盘自重 ${result.pallet.tareWeightKg} kg`, icon: Weight },
  ]
  return <>
    <div className="mb-8"><h1 className="mb-2 text-3xl font-bold">托盘装载计算器</h1><p className="text-muted-foreground">按纸箱、托盘规格及高度载重限制，估算每层箱数、码放层数和所需托盘数量。</p></div>
    <div className="grid gap-4 md:grid-cols-4">{cards.map(({ label, value, caption, icon: Icon }) => <Card key={label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div><p className="text-xs text-muted-foreground">{caption}</p></CardContent></Card>)}</div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      <Card><CardHeader><div className="flex justify-between gap-3"><div><CardTitle>装载参数</CardTitle><CardDescription>高度包含托盘本体，限重包含托盘自重</CardDescription></div><Button size="sm" variant="outline" onClick={() => setForm(initialForm)}><RotateCcw className="mr-2 h-4 w-4" />重置</Button></div></CardHeader><CardContent className="space-y-5">
        <div className="space-y-2"><Label>托盘规格</Label><Select value={form.palletType} onValueChange={(value) => setForm(current => ({ ...current, palletType: value as PalletType }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.values(PALLET_SPECS).map(pallet => <SelectItem key={pallet.type} value={pallet.type}>{pallet.name} · {pallet.lengthCm} x {pallet.widthCm} cm</SelectItem>)}</SelectContent></Select></div>
        <ScenarioPresets presets={PALLET_PRESETS} onSelect={(values) => setForm((current) => ({ ...current, ...values }))} />
        <div className="grid gap-4 md:grid-cols-2">{fields.map(({ field, label, suffix }) => <div key={field} className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode="decimal" value={form[field]} onChange={event => setForm(current => ({ ...current, [field]: event.target.value }))} className="h-11 pr-16 tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-muted-foreground">{suffix}</span></div></div>)}</div>
        <Alert><Info className="h-4 w-4" /><AlertDescription>结果按同一朝向规则码放，未考虑交错码放、纸箱承压、托盘外沿、绑带和仓库安全间距。实际出货前请复核包装强度与承运方限制。</AlertDescription></Alert>
        <Button onClick={copy}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制装载摘要'}</Button>
      </CardContent></Card>
      <div className="space-y-6"><Card><CardHeader><CardTitle className="flex items-center justify-between gap-3"><span>装载结果</span><Badge variant={noFit || result.limitingFactor === 'weight' ? 'destructive' : 'secondary'}>{noFit ? '无法装入' : result.limitingFactor === 'weight' ? '载重限制' : '尺寸/高度限制'}</Badge></CardTitle></CardHeader><CardContent className="space-y-3">{[
        ['最佳箱底朝向', `${result.bestOrientation.lengthCm} x ${result.bestOrientation.widthCm} cm`], ['按尺寸可装', `${result.maxByDimensions} 箱/托`], ['按载重可装', `${result.maxByWeight} 箱/托`], ['含托装载高度', `${result.loadedHeightCm} cm`], ['空间利用率', `${result.volumeUtilizationPercent}%`],
      ].map(([label, value]) => <div key={label} className="flex justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle>托盘规格</CardTitle></CardHeader><CardContent className="space-y-3">{Object.values(PALLET_SPECS).map(pallet => <div key={pallet.type} className="rounded-md border p-3 text-sm"><div className="font-medium">{pallet.name}</div><div className="mt-1 text-xs text-muted-foreground">{pallet.lengthCm} x {pallet.widthCm} x {pallet.baseHeightCm} cm · 自重约 {pallet.tareWeightKg} kg</div></div>)}</CardContent></Card></div>
    </div>
  </>
}
