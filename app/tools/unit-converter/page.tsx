// 名称: 外贸单位换算器
// 描述: 换算外贸物流常用长度、重量与体积单位
// 路径: Globokit/app/tools/unit-converter/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-21

'use client'

import { useMemo, useState } from 'react'
import { ArrowLeftRight, Info, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { FormattedInput } from '@/components/ui/formatted-input'
import { MobileFriendlyWrapper, MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'
import {
  DEFAULT_UNIT_SELECTIONS,
  UNIT_CATEGORY_LABELS,
  UNIT_GROUPS,
  convertUnit,
  formatUnitInput,
  formatUnitValue,
  type UnitCategory,
} from '@/lib/tools/unit-converter'

const CATEGORIES = Object.keys(UNIT_CATEGORY_LABELS) as UnitCategory[]

export default function UnitConverterPage() {
  const [category, setCategory] = useState<UnitCategory>('length')
  const [sourceUnit, setSourceUnit] = useState(DEFAULT_UNIT_SELECTIONS.length.source)
  const [targetUnit, setTargetUnit] = useState(DEFAULT_UNIT_SELECTIONS.length.target)
  const [inputValue, setInputValue] = useState(DEFAULT_UNIT_SELECTIONS.length.value)
  const units = UNIT_GROUPS[category]
  const numericValue = inputValue.trim() === '' ? Number.NaN : Number(inputValue)
  const result = useMemo(
    () => convertUnit(category, numericValue, sourceUnit, targetUnit),
    [category, numericValue, sourceUnit, targetUnit]
  )
  const source = units.find((unit) => unit.id === sourceUnit)
  const target = units.find((unit) => unit.id === targetUnit)

  const selectCategory = (nextCategory: UnitCategory) => {
    const defaults = DEFAULT_UNIT_SELECTIONS[nextCategory]
    setCategory(nextCategory)
    setSourceUnit(defaults.source)
    setTargetUnit(defaults.target)
    setInputValue(defaults.value)
  }

  const reset = () => selectCategory(category)
  const swapUnits = () => {
    setSourceUnit(targetUnit)
    setTargetUnit(sourceUnit)
    if (result !== null) setInputValue(formatUnitInput(result))
  }
  const getCopyText = () => {
    if (result === null || !source || !target) return ''
    return `${formatUnitValue(numericValue)} ${source.symbol} = ${formatUnitValue(result)} ${target.symbol}`
  }

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">外贸单位换算器</h1>
        <p className="text-muted-foreground">快速换算物流、包装与产品规格中的公制和英制长度、重量、体积单位</p>
      </div>

      <MobileButtonGroup className="mb-6">
        {CATEGORIES.map((item) => (
          <Button key={item} type="button" variant={category === item ? 'default' : 'outline'} onClick={() => selectCategory(item)}>
            {UNIT_CATEGORY_LABELS[item]}
          </Button>
        ))}
      </MobileButtonGroup>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <Card>
          <CardHeader>
            <CardTitle>{UNIT_CATEGORY_LABELS[category]}换算</CardTitle>
            <CardDescription>选择原单位和目标单位，输入非负数后即时换算</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="unit-value">数值</Label>
              <FormattedInput
                id="unit-value"
                value={inputValue}
                onChange={setInputValue}
                format="decimal"
                autoFocusFirst
                placeholder="请输入数字"
                className="h-12 text-lg"
              />
            </div>
            <div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              <UnitSelect id="source-unit" label="原单位" value={sourceUnit} units={units} onChange={setSourceUnit} />
              <Button type="button" variant="outline" size="icon" onClick={swapUnits} aria-label="交换原单位和目标单位"><ArrowLeftRight className="h-4 w-4" /></Button>
              <UnitSelect id="target-unit" label="目标单位" value={targetUnit} units={units} onChange={setTargetUnit} />
            </div>
            {result === null && <Alert variant="destructive"><Info className="h-4 w-4" /><AlertDescription>请输入大于或等于 0 的有效数字。</AlertDescription></Alert>}
            <MobileButtonGroup>
              <EnhancedCopyButton text={getCopyText()} disabled={result === null}>复制结果</EnhancedCopyButton>
              <Button type="button" variant="outline" onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />重置</Button>
            </MobileButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>换算结果</CardTitle><CardDescription>{source && target ? `${source.label} → ${target.label}` : '请选择单位'}</CardDescription></CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-5 dark:border-cyan-300/20 dark:bg-cyan-300/10">
              <p className="text-sm text-emerald-800 dark:text-cyan-100">目标数值</p>
              <p className="mt-2 break-words text-3xl font-bold tabular-nums text-emerald-950 dark:text-white">{result === null || !target ? '—' : `${formatUnitValue(result)} ${target.symbol}`}</p>
              {result !== null && source && target && <p className="mt-2 text-sm text-emerald-700 dark:text-cyan-200">{formatUnitValue(numericValue)} {source.symbol} = {formatUnitValue(result)} {target.symbol}</p>}
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold">同量纲速览</h2>
              <div className="space-y-2">
                {units.filter((unit) => unit.id !== sourceUnit).map((unit) => {
                  const converted = convertUnit(category, numericValue, sourceUnit, unit.id)
                  return <div key={unit.id} className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm"><span className="text-muted-foreground">{unit.label}</span><span className="text-right font-medium tabular-nums">{converted === null ? '—' : `${formatUnitValue(converted)} ${unit.symbol}`}</span></div>
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileFriendlyWrapper>
  )
}

function UnitSelect({ id, label, value, units, onChange }: { id: string; label: string; value: string; units: readonly { id: string; label: string; symbol: string }[]; onChange: (value: string) => void }) {
  return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger id={id} className="h-11"><SelectValue /></SelectTrigger><SelectContent>{units.map((unit) => <SelectItem key={unit.id} value={unit.id}>{unit.label}（{unit.symbol}）</SelectItem>)}</SelectContent></Select></div>
}
