// 名称: Unix 时间戳转换工具
// 描述: 时间戳与北京时间日期互转，支持秒/毫秒口径
// 路径: Globokit/app/tools/timestamp-converter/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-16

'use client'

import { useEffect, useMemo, useState } from 'react'
import { Clock, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { FormattedInput } from '@/components/ui/formatted-input'
import { MobileFriendlyWrapper, MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'
import {
  nowTimestamps,
  parseShanghaiDateTime,
  timestampToBreakdown,
} from '@/lib/tools/timestamp-converter'

type TimestampUnit = 'auto' | 's' | 'ms'

const UNIT_LABELS: Record<TimestampUnit, string> = {
  auto: '自动判断',
  s: '秒（10 位）',
  ms: '毫秒（13 位）',
}

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('')
  const [unit, setUnit] = useState<TimestampUnit>('auto')
  const [dateTime, setDateTime] = useState('')
  const [now, setNow] = useState(() => nowTimestamps())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(nowTimestamps()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const breakdown = useMemo(() => timestampToBreakdown(timestamp, unit), [timestamp, unit])
  const parsed = useMemo(() => parseShanghaiDateTime(dateTime), [dateTime])

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Unix 时间戳转换</h1>
        <p className="text-muted-foreground">Unix 时间戳与北京时间日期互转，用于排查日志、回调参数与 API 数据时间</p>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700/60 dark:bg-slate-800/40">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4" />
          当前时间（每秒刷新）
          <EnhancedCopyButton text={String(now.seconds)} iconOnly title="复制当前秒级时间戳">复制秒</EnhancedCopyButton>
          <EnhancedCopyButton text={String(now.milliseconds)} iconOnly title="复制当前毫秒时间戳">复制毫秒</EnhancedCopyButton>
        </div>
        <p className="mt-2 font-mono text-lg font-semibold tabular-nums">{now.seconds} s ／ {now.milliseconds} ms</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>时间戳 → 日期</CardTitle>
            <CardDescription>所有结果按北京时间（Asia/Shanghai）显示</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timestamp-input">Unix 时间戳</Label>
              <FormattedInput
                id="timestamp-input"
                value={timestamp}
                onChange={setTimestamp}
                format="none"
                placeholder="如 1760000000"
                className="h-12 font-mono text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label>时间戳口径</Label>
              <Select value={unit} onValueChange={(value) => setUnit(value as TimestampUnit)}>
                <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(UNIT_LABELS) as TimestampUnit[]).map((item) => (
                    <SelectItem key={item} value={item}>{UNIT_LABELS[item]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {timestamp.trim() !== '' && !breakdown && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertDescription>请输入有效的时间戳数字（超出可表示范围也会被拒绝）。</AlertDescription>
              </Alert>
            )}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 dark:border-cyan-300/20 dark:bg-cyan-300/10">
              <p className="text-sm text-emerald-800 dark:text-cyan-100">北京时间</p>
              <p className="mt-1 break-words text-2xl font-bold tabular-nums text-emerald-950 dark:text-white">
                {breakdown ? breakdown.display : '—'}
              </p>
              {breakdown && <p className="mt-2 break-all font-mono text-xs text-emerald-700 dark:text-cyan-200">{breakdown.iso}</p>}
            </div>
            <MobileButtonGroup>
              <EnhancedCopyButton text={breakdown ? breakdown.display : ''} disabled={!breakdown}>复制日期</EnhancedCopyButton>
              <Button type="button" variant="outline" onClick={() => setTimestamp(String(now.seconds))}>填入当前秒级</Button>
            </MobileButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>日期 → 时间戳</CardTitle>
            <CardDescription>输入北京时间，格式 YYYY-MM-DD HH:mm:ss（时间可省略）</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="datetime-input">北京时间</Label>
              <FormattedInput
                id="datetime-input"
                value={dateTime}
                onChange={setDateTime}
                format="none"
                placeholder="如 2026-09-16 14:30:05"
                className="h-12 font-mono text-lg"
              />
            </div>
            {dateTime.trim() !== '' && !parsed && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertDescription>日期或时间数字超出合法范围，请核对后重试。</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm">
                <span className="text-muted-foreground">秒级时间戳</span>
                <span className="font-mono font-medium tabular-nums">{parsed ? parsed.seconds : '—'}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md bg-muted/50 px-3 py-2 text-sm">
                <span className="text-muted-foreground">毫秒时间戳</span>
                <span className="font-mono font-medium tabular-nums">{parsed ? parsed.milliseconds : '—'}</span>
              </div>
            </div>
            <MobileButtonGroup>
              <EnhancedCopyButton text={parsed ? String(parsed.seconds) : ''} disabled={!parsed}>复制秒级</EnhancedCopyButton>
              <EnhancedCopyButton text={parsed ? String(parsed.milliseconds) : ''} disabled={!parsed}>复制毫秒</EnhancedCopyButton>
            </MobileButtonGroup>
          </CardContent>
        </Card>
      </div>
    </MobileFriendlyWrapper>
  )
}
