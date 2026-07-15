// 名称: 数字转英文
// 描述: 将数字转换为英文表达形式，支持基数词和序数词
// 路径: Globokit/app/tools/number-to-english/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useState } from 'react'
import { COMMON_NUMBERS, type NumberEnglishHistoryItem } from './number-english-data'
import { NumberEnglishInfo, NumberEnglishStats } from './number-english-info'
import { NumberEnglishHistory, NumberEnglishResults } from './number-english-results'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { convertOrdinal, numberToEnglish } from '@/lib/tools/number-english'

export default function NumberToEnglishPage() {
  const [number, setNumber] = useState('')
  const [cardinalResult, setCardinalResult] = useState('')
  const [ordinalResult, setOrdinalResult] = useState('')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [history, setHistory] = useState<NumberEnglishHistoryItem[]>([])
  const [error, setError] = useState('')

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }
  const fail = (message: string) => {
    setError(message); setCardinalResult(''); setOrdinalResult('')
  }
  const handleConvert = () => {
    setError('')
    const value = Number(number)
    if (!number.trim()) return fail('请输入数字')
    if (!Number.isFinite(value) || !Number.isInteger(value)) return fail('请输入有效的整数')
    if (value < 0) return fail('请输入正数')
    if (value > 999999999999) return fail('数字太大，最大支持12位数')

    const cardinal = numberToEnglish(value)
    const ordinal = convertOrdinal(value)
    setCardinalResult(cardinal)
    setOrdinalResult(ordinal)
    setHistory((items) => [{ number, cardinal, ordinal }, ...items.slice(0, 4)])
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">数字转英文</h1>
        <p className="text-muted-foreground">将数字转换为英文表达形式，支持基数词和序数词，适用于支票、合同等正式文件</p>
      </div>
      <NumberEnglishStats historyCount={history.length} />
      <Card>
        <CardHeader><CardTitle>数字转换</CardTitle><CardDescription>输入数字，自动转换为英文基数词和序数词</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">输入数字</Label>
            <Input id="number" type="number" placeholder="请输入数字，如：123" value={number} onChange={(event) => { setNumber(event.target.value); setError('') }} className="text-lg" />
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          </div>
          <div className="space-y-2">
            <Label>常用数字</Label>
            <div className="flex flex-wrap gap-2">{COMMON_NUMBERS.map((item) => <Button key={item.value} variant="outline" size="sm" onClick={() => { setNumber(item.value); setError('') }}>{item.label}</Button>)}</div>
          </div>
          <Button onClick={handleConvert} className="w-full" size="lg">转换为英文</Button>
          <NumberEnglishResults number={number} cardinal={cardinalResult} ordinal={ordinalResult} copiedText={copiedText} onCopy={copyToClipboard} />
          <NumberEnglishHistory history={history} copiedText={copiedText} onCopy={copyToClipboard} />
        </CardContent>
      </Card>
      <NumberEnglishInfo />
    </>
  )
}
