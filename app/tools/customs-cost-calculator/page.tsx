'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calculator, Check, ClipboardCopy, FileCheck2, Info, Package, RotateCcw, ShieldCheck, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { calculateCustomsCost, CustomsCostInputs, CustomsDirection, DEFAULT_CUSTOMS_COST_INPUTS } from '@/lib/tools/customs-cost-calculator'

type NumericField = Exclude<keyof CustomsCostInputs, 'direction'>
type FormState = Record<NumericField, string> & { direction: CustomsDirection }

const initialForm = Object.fromEntries(
  Object.entries(DEFAULT_CUSTOMS_COST_INPUTS).map(([key, value]) => [key, String(value)])
) as unknown as FormState
initialForm.direction = DEFAULT_CUSTOMS_COST_INPUTS.direction

const fields: Array<{ field: NumericField; label: string; suffix: string; integer?: boolean }> = [
  { field: 'shipmentCount', label: '报关票数', suffix: '票', integer: true },
  { field: 'itemQuantity', label: '货物数量', suffix: '件', integer: true },
  { field: 'cargoValueCny', label: '申报货值', suffix: 'CNY' },
  { field: 'declarationFeeCny', label: '基础报关费/票', suffix: 'CNY' },
  { field: 'declarationItemCount', label: '申报品名数', suffix: '项', integer: true },
  { field: 'includedItemCount', label: '基础费含品名', suffix: '项', integer: true },
  { field: 'extraItemFeeCny', label: '超项费/品名', suffix: 'CNY' },
  { field: 'documentFeeCny', label: '单证费/票', suffix: 'CNY' },
  { field: 'agencyFeeCny', label: '代理服务费/票', suffix: 'CNY' },
  { field: 'inspectionProbabilityPercent', label: '预计查验概率', suffix: '%' },
  { field: 'inspectionFeeCny', label: '单次查验费用', suffix: 'CNY' },
  { field: 'portOperationFeeCny', label: '港区/场站操作费', suffix: 'CNY' },
  { field: 'storageFeeCny', label: '仓储费用', suffix: 'CNY' },
  { field: 'domesticTransportFeeCny', label: '国内运输费', suffix: 'CNY' },
  { field: 'otherFeeCny', label: '其他费用', suffix: 'CNY' },
]

const money = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 2 })
const number = (value: string) => Number.isFinite(Number.parseFloat(value)) ? Number.parseFloat(value) : 0

export default function CustomsCostCalculatorPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [copied, setCopied] = useState(false)
  const inputs = useMemo(() => Object.fromEntries(
    Object.entries(form).map(([key, value]) => [key, key === 'direction' ? value : number(value)])
  ) as unknown as CustomsCostInputs, [form])
  const result = useMemo(() => calculateCustomsCost(inputs), [inputs])
  const maxCost = Math.max(...result.costBreakdown.map((row) => row.value), 1)

  const copySummary = async () => {
    await navigator.clipboard.writeText([
      '报关费用估算', `业务方向：${result.directionLabel}`, `预计总费用：${money.format(result.totalExpectedCostCny)}`,
      `每票费用：${money.format(result.perShipmentCny)}`, `每件摊费：${money.format(result.perItemCny)}`,
      `货值占比：${result.cargoValueRatioPercent.toFixed(2)}%`, `查验期望成本：${money.format(result.expectedInspectionCostCny)}`,
    ].join('\n'))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const cards = [
    { label: '预计费用合计', value: money.format(result.totalExpectedCostCny), caption: result.directionLabel, icon: Wallet },
    { label: '每票费用', value: money.format(result.perShipmentCny), caption: `${result.shipmentCount} 票平均`, icon: FileCheck2 },
    { label: '每件摊费', value: money.format(result.perItemCny), caption: `${result.itemQuantity} 件平均`, icon: Package },
    { label: '货值占比', value: `${result.cargoValueRatioPercent.toFixed(2)}%`, caption: '费用 / 申报货值', icon: Calculator },
  ]

  return <>
    <div className="mb-8"><h1 className="mb-2 text-3xl font-bold">报关费用估算器</h1><p className="text-muted-foreground">汇总报关、单证、代理、查验和本地操作费用，快速测算每票与每件成本。</p></div>
    <div className="grid gap-4 md:grid-cols-4">{cards.map(({ label, value, caption, icon: Icon }) => <Card key={label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div><p className="text-xs text-muted-foreground">{caption}</p></CardContent></Card>)}</div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
      <Card><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle>费用参数</CardTitle><CardDescription>按实际代理报价填写；查验费用以概率折算为预算期望值</CardDescription></div><Button variant="outline" size="sm" onClick={() => setForm(initialForm)}><RotateCcw className="mr-2 h-4 w-4" />重置</Button></div></CardHeader><CardContent className="space-y-6">
        <Tabs value={form.direction} onValueChange={(value) => setForm((current) => ({ ...current, direction: value as CustomsDirection }))}><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="export">出口报关</TabsTrigger><TabsTrigger value="import">进口清关</TabsTrigger></TabsList></Tabs>
        <div className="grid gap-4 md:grid-cols-2">{fields.map(({ field, label, suffix, integer }) => <div key={field} className="space-y-2"><Label htmlFor={field}>{label}</Label><div className="relative"><Input id={field} type="text" inputMode={integer ? 'numeric' : 'decimal'} value={form[field]} onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))} className="h-11 pr-20 tabular-nums" /><span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-muted-foreground">{suffix}</span></div></div>)}</div>
        <Alert><Info className="h-4 w-4" /><AlertDescription>本工具不含关税、进口增值税和消费税。进口税费请使用“进口到岸成本计算器”，实际费用以报关行、港区和海关单据为准。</AlertDescription></Alert>
        <Button onClick={copySummary}>{copied ? <Check className="mr-2 h-4 w-4" /> : <ClipboardCopy className="mr-2 h-4 w-4" />}{copied ? '已复制' : '复制估算摘要'}</Button>
      </CardContent></Card>
      <div className="space-y-6"><Card><CardHeader><CardTitle className="flex items-center justify-between"><span>费用拆分</span><Badge variant="secondary">{result.directionLabel}</Badge></CardTitle><CardDescription>超出基础范围的申报品名 {result.extraItemCount} 项</CardDescription></CardHeader><CardContent className="space-y-4">{result.costBreakdown.map((row) => <div key={row.key} className="space-y-1"><div className="flex justify-between gap-3 text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-medium">{money.format(row.value)}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn('h-full rounded-full', row.key === 'declaration' ? 'bg-emerald-500' : row.key === 'inspection' ? 'bg-amber-500' : 'bg-slate-500')} style={{ width: `${row.value ? Math.max(3, row.value / maxCost * 100) : 0}%` }} /></div><p className="text-right text-[11px] text-muted-foreground">{row.sharePercent.toFixed(1)}%</p></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" />预算提示</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>查验期望成本：{money.format(result.expectedInspectionCostCny)}</p><p>报关与品名附加：{money.format(result.declarationSubtotalCny)}</p><p>本地操作费用：{money.format(result.localOperationCostCny)}</p></CardContent></Card></div>
    </div>
  </>
}
