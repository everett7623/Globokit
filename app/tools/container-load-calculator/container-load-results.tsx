// 名称: 装柜计算结果
// 描述: 展示概览、装载结果、利用率和柜型参数
// 路径: Globokit/app/tools/container-load-calculator/container-load-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Boxes, Container, PackageCheck, Ruler, Truck, Weight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { calculateContainerLoad, CONTAINER_SPECS, type ContainerType } from '@/lib/tools/container-load-calculator'
import { formatNumber, formatPercent } from './container-load-page-data'

type ContainerLoadResult = ReturnType<typeof calculateContainerLoad>

export function ContainerLoadStats({ result }: { result: ContainerLoadResult }) {
  const doesNotFit = !result.fitsContainer
  const isWeightLimited = result.limitingFactor === 'weight'
  const cards = [
    { label: '单箱体积', value: `${result.cartonCbm} CBM`, caption: '按外箱尺寸计算', icon: Boxes },
    { label: '总体积', value: `${result.totalCbm} CBM`, caption: `${formatNumber(result.totalWeightKg, 1)} kg 总毛重`, icon: PackageCheck },
    { label: '单柜可装', value: `${formatNumber(result.maxCartonsPerContainer)} 箱`, caption: doesNotFit ? '纸箱尺寸无法装入' : `${isWeightLimited ? '重量' : '摆放/体积'}限制`, icon: Container },
    { label: '预计柜数', value: `${result.requiredContainers} 柜`, caption: `末柜 ${formatNumber(result.lastContainerCartons)} 箱`, icon: Truck },
  ]
  return <div className="grid gap-4 md:grid-cols-4">{cards.map((card) => { const Icon = card.icon; return <Card key={card.label}><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" />{card.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{card.value}</div><p className="text-xs text-muted-foreground">{card.caption}</p></CardContent></Card> })}</div>
}

export function ContainerLoadResults({ result, containerType }: { result: ContainerLoadResult; containerType: ContainerType }) {
  const doesNotFit = !result.fitsContainer
  const isWeightLimited = result.limitingFactor === 'weight'
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3"><span>装载结果</span><Badge variant={doesNotFit || isWeightLimited ? 'destructive' : 'secondary'}>{doesNotFit ? '无法装入' : isWeightLimited ? '重量限制' : '体积/摆放限制'}</Badge></CardTitle>
          <CardDescription>{result.container.name} · {result.container.lengthCm} x {result.container.widthCm} x {result.container.heightCm} cm</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3">
            <ResultRow label="最佳摆放方向" value={`${result.bestOrientation.lengthCm} x ${result.bestOrientation.widthCm} x ${result.bestOrientation.heightCm} cm`} />
            <ResultRow label="长宽高排布" value={`${result.bestOrientation.countLength} x ${result.bestOrientation.countWidth} x ${result.bestOrientation.countHeight}`} />
            <ResultRow label="按摆放可装" value={`${formatNumber(result.bestOrientation.cartons)} 箱/柜`} />
            <ResultRow label="按重量可装" value={`${formatNumber(result.maxByWeight)} 箱/柜`} />
          </div>
          <div className="space-y-3"><UtilizationBar label="体积利用率" value={result.volumeUtilizationPercent} /><UtilizationBar label="载重利用率" value={result.weightUtilizationPercent} /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>常用柜型参数</CardTitle><CardDescription>按常见内尺寸和最大载重估算，实际以订舱数据为准</CardDescription></CardHeader>
        <CardContent className="space-y-3">{Object.values(CONTAINER_SPECS).map((container) => (
          <div key={container.type} className={cn('rounded-md border p-3 text-sm', containerType === container.type ? 'border-emerald-200 bg-emerald-50/70' : 'border-gray-200')}>
            <div className="mb-1 flex items-center justify-between gap-3"><span className="font-semibold">{container.name}</span><span className="text-xs text-muted-foreground">{container.volumeCbm} CBM</span></div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{container.lengthCm} x {container.widthCm} x {container.heightCm} cm</span><span className="flex items-center gap-1"><Weight className="h-3.5 w-3.5" />{formatNumber(container.maxPayloadKg)} kg</span></div>
          </div>
        ))}</CardContent>
      </Card>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium text-right">{value}</span></div>
}

function UtilizationBar({ label, value }: { label: string; value: number }) {
  const width = Math.max(0, Math.min(100, value))
  return <div><div className="mb-1 flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium">{formatPercent(value)}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${width}%` }} /></div></div>
}
