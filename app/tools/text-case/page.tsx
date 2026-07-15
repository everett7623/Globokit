// 名称: 英文大小写转换
// 描述: 快速转换英文文本的大小写格式，支持多种转换模式
// 路径: Globokit/app/tools/text-case/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useState } from 'react'
import { AlertCircle, Trash2 } from 'lucide-react'
import { CASE_OPTIONS, SAMPLE_TEXTS, type TextCaseHistoryItem } from './text-case-data'
import { TextCaseHistory, TextCaseResult } from './text-case-history'
import { TextCaseInfo, TextCaseStats } from './text-case-info'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { convertCase, type TextCase } from '@/lib/tools/text-case'

export default function TextCasePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseType, setCaseType] = useState<TextCase>('upper')
  const [error, setError] = useState('')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [history, setHistory] = useState<TextCaseHistoryItem[]>([])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }
  const handleConvert = () => {
    setError('')
    if (!input.trim()) {
      setError('请输入需要转换的文本'); setOutput(''); return
    }
    if (/[\u4e00-\u9fa5]/.test(input)) {
      setError('检测到中文字符，本工具仅支持英文大小写转换。'); setOutput(''); return
    }
    if (!/[a-zA-Z0-9]/.test(input)) {
      setError('未检测到有效字符，请输入包含英文字母或数字的文本'); setOutput(''); return
    }
    try {
      const result = convertCase(input, caseType)
      setOutput(result)
      const typeLabel = CASE_OPTIONS.find((option) => option.value === caseType)?.shortLabel || caseType
      setHistory((items) => [{ input: input.slice(0, 50), output: result.slice(0, 50), type: typeLabel }, ...items.slice(0, 4)])
    } catch {
      setError('转换失败，请重试'); setOutput('')
    }
  }
  const preview = (() => {
    if (!input.trim()) return ''
    try {
      return convertCase(input, caseType).slice(0, 50) + (input.length > 50 ? '...' : '')
    } catch {
      return ''
    }
  })()

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">英文大小写转换</h1>
        <p className="text-muted-foreground">快速转换英文文本的大小写格式，支持编程命名规范与文件名格式化</p>
      </div>
      <TextCaseStats historyCount={history.length} />
      <Card>
        <CardHeader><CardTitle>文本转换</CardTitle><CardDescription>输入英文文本，选择转换格式，即可快速转换大小写</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between"><Label htmlFor="input">输入文本</Label><span className="text-sm text-muted-foreground">{input.length} 字符</span></div>
            <Textarea id="input" placeholder="请输入需要转换的英文文本...&#10;支持多行文本输入" value={input} onChange={(event) => { setInput(event.target.value); setError('') }} rows={6} className="font-mono" />
            <div className="flex flex-wrap gap-2">
              <Label className="text-sm">快速填充：</Label>
              {SAMPLE_TEXTS.map((sample) => <Button key={sample.label} variant="outline" size="sm" onClick={() => { setInput(sample.text); setError(''); setOutput('') }}>{sample.label}</Button>)}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="case-type">转换类型</Label>
            <Select value={caseType} onValueChange={(value) => setCaseType(value as TextCase)}>
              <SelectTrigger id="case-type" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {CASE_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}><div className="flex items-center gap-3 w-full">{option.icon}<div className="flex-1"><div className="font-medium">{option.label}</div><div className="text-xs text-muted-foreground">{option.example}</div></div></div></SelectItem>)}
              </SelectContent>
            </Select>
            {input && <div className="p-3 rounded-lg bg-muted"><p className="text-xs text-muted-foreground mb-1">预览：</p><p className="font-mono text-sm">{preview}</p></div>}
          </div>
          {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1" size="lg">转换文本</Button>
            <Button variant="outline" size="lg" onClick={() => { setInput(''); setOutput(''); setError('') }} title="清空所有内容"><Trash2 className="h-4 w-4" /></Button>
          </div>
          <TextCaseResult output={output} copiedText={copiedText} onUseAsInput={() => { setInput(output); setOutput(''); setError('') }} onCopy={copyToClipboard} />
          <TextCaseHistory history={history} copiedText={copiedText} onCopy={copyToClipboard} />
        </CardContent>
      </Card>
      <TextCaseInfo />
    </>
  )
}
