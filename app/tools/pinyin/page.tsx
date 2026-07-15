// 名称: 中文转拼音
// 描述: 将中文文本转换为汉语拼音，支持声调和多种格式
// 路径: Globokit/app/tools/pinyin/page.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { EMPTY_STATS, EXAMPLE_BUTTONS, TONE_OPTIONS, type PinyinHistoryItem, type ToneType } from './pinyin-page-data'
import { PinyinInfo, PinyinStats } from './pinyin-info'
import { PinyinHistory, PinyinResults } from './pinyin-results'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { analyzeText, convertToPinyin, type PinyinOptions } from '@/lib/tools/pinyin'

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [toneType, setToneType] = useState<ToneType>('none')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [history, setHistory] = useState<PinyinHistoryItem[]>([])
  const [stats, setStats] = useState(EMPTY_STATS)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }
  const handleConvert = () => {
    if (!input.trim()) {
      alert('请输入中文文本'); return
    }
    const options: PinyinOptions = { toneType, separator: ' ', nonZh: 'spaced' }
    const result = convertToPinyin(input, options)
    setOutput(result)
    setStats(analyzeText(input))
    const toneLabel = toneType === 'none' ? '无声调' : toneType === 'symbol' ? '符号声调' : '数字声调'
    setHistory((items) => [{ input: input.slice(0, 50), output: result.slice(0, 50), toneType: toneLabel }, ...items.slice(0, 4)])
  }
  const handleReset = () => {
    setInput(''); setOutput(''); setStats(EMPTY_STATS)
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">中文转拼音</h1>
        <p className="text-muted-foreground">将中文文本转换为拼音，使用专业的 pinyin-pro 库，支持多种声调格式</p>
      </div>
      <PinyinStats historyCount={history.length} />
      <Card>
        <CardHeader><CardTitle>拼音转换</CardTitle><CardDescription>输入中文文本，选择声调格式，即可转换为对应的拼音</CardDescription></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between"><Label htmlFor="input">输入中文文本</Label><span className="text-sm text-muted-foreground">{input.length} 字符</span></div>
            <Textarea id="input" placeholder="请输入需要转换的中文文本..." value={input} onChange={(event) => setInput(event.target.value)} className="h-32 font-mono text-base" />
          </div>
          <div className="space-y-2"><Label>快速示例</Label><div className="flex flex-wrap gap-2">{EXAMPLE_BUTTONS.map((example) => <Button key={example.key} variant="outline" size="sm" onClick={() => { setInput(example.text); setOutput('') }}>{example.label}</Button>)}</div></div>
          <div className="space-y-2">
            <Label htmlFor="toneType">声调格式</Label>
            <Select value={toneType} onValueChange={(value) => setToneType(value as ToneType)}>
              <SelectTrigger id="toneType"><SelectValue /></SelectTrigger>
              <SelectContent>{TONE_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}><div className="flex items-center gap-3 w-full"><div className="flex-1"><div className="font-medium">{option.label}</div><div className="text-xs text-muted-foreground">{option.example} - {option.description}</div></div></div></SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex gap-2"><Button onClick={handleConvert} className="flex-1" size="lg">转换拼音</Button><Button onClick={handleReset} variant="outline" size="lg"><RotateCcw className="h-4 w-4" /></Button></div>
          <PinyinResults output={output} stats={stats} copiedText={copiedText} onCopy={copyToClipboard} />
          <PinyinHistory history={history} copiedText={copiedText} onCopy={copyToClipboard} />
        </CardContent>
      </Card>
      <PinyinInfo />
    </>
  )
}
