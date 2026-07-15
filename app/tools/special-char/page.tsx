// 名称: 特殊字符检查与转换
// 描述: 检查并转换文本中的特殊字符，避免邮件或文档中的乱码
// 路径: Globokit/app/tools/special-char/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useState } from 'react'
import { SAMPLE_TEXTS, categorizeSpecialChars, type CheckHistoryItem } from './special-char-data'
import { SpecialCharHistory, SpecialCharStats } from './special-char-dashboard'
import { SpecialCharInfo } from './special-char-info'
import { SpecialCharCheckResult } from './special-char-result'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { checkSpecialChars } from '@/lib/tools/special-char'

export default function SpecialCharPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ReturnType<typeof checkSpecialChars> | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [checkHistory, setCheckHistory] = useState<CheckHistoryItem[]>([])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }
  const handleCheck = () => {
    if (!input) return
    const checkResult = checkSpecialChars(input)
    setResult(checkResult)
    setCheckHistory((history) => [{
      time: new Date().toLocaleTimeString('zh-CN'),
      charCount: checkResult.specialChars.length,
      hasSpecial: checkResult.hasSpecialChars,
    }, ...history.slice(0, 4)])
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">特殊字符检查与转换</h1>
        <p className="text-muted-foreground">检查文本中的特殊字符，并提供清理或替换选项，避免在邮件或文档中出现乱码</p>
      </div>
      <SpecialCharStats history={checkHistory} />
      <Card>
        <CardHeader>
          <CardTitle>文本检查</CardTitle>
          <CardDescription>输入或粘贴文本，系统将自动检测并标记所有特殊字符</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">输入文本</Label>
              <span className="text-sm text-muted-foreground">{input.length} 字符</span>
            </div>
            <Textarea id="input" placeholder="粘贴需要检查的文本..." value={input} onChange={(event) => setInput(event.target.value)} rows={6} className="font-mono text-base" />
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">快速示例：</span>
              {SAMPLE_TEXTS.map((sample) => (
                <Button key={sample.label} variant="outline" size="sm" onClick={() => { setInput(sample.text); setResult(null) }}>{sample.label}</Button>
              ))}
            </div>
          </div>
          <Button onClick={handleCheck} className="w-full" size="lg">检查特殊字符</Button>
          {result && <SpecialCharCheckResult result={result} stats={categorizeSpecialChars(result.specialChars)} copiedText={copiedText} onCopy={copyToClipboard} />}
          <SpecialCharHistory history={checkHistory} />
        </CardContent>
      </Card>
      <SpecialCharInfo />
    </>
  )
}
