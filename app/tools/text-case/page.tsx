'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CopyButton } from '@/components/tools/copy-button'
import { convertCase, TextCase } from '@/lib/tools/text-case'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function TextCasePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseType, setCaseType] = useState<TextCase>('upper')
  const [error, setError] = useState('')

  const handleConvert = () => {
    setError('')
    
    if (!input.trim()) {
      setError('请输入需要转换的文本')
      setOutput('')
      return
    }

    // 检查是否包含中文字符
    const chineseRegex = /[\u4e00-\u9fa5]/
    if (chineseRegex.test(input)) {
      setError('检测到中文字符，本工具仅支持英文大小写转换。请使用纯英文文本。')
      setOutput('')
      return
    }

    // 检查是否包含英文字母
    const englishRegex = /[a-zA-Z]/
    if (!englishRegex.test(input)) {
      setError('未检测到英文字母，请输入包含英文字母的文本')
      setOutput('')
      return
    }

    try {
      const result = convertCase(input, caseType)
      setOutput(result)
    } catch (err) {
      setError('转换失败，请重试')
      setOutput('')
    }
  }

  const caseOptions = [
    { value: 'upper', label: '全部大写 (UPPERCASE)' },
    { value: 'lower', label: '全部小写 (lowercase)' },
    { value: 'sentence', label: '句子首字母大写 (Sentence case)' },
    { value: 'title', label: '标题格式 (Title Case)' },
    { value: 'toggle', label: '大小写反转 (tOGGLE cASE)' },
  ]

  // 示例文本
  const sampleTexts = [
    { text: 'Hello World', label: '简单示例' },
    { text: 'The Quick Brown Fox Jumps Over The Lazy Dog', label: '完整句子' },
    { text: 'user@example.com', label: '邮箱地址' },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>英文大小写转换</CardTitle>
            <CardDescription>
              快速转换英文文本的大小写格式，支持多种转换模式
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">输入文本</Label>
              <Textarea
                id="input"
                placeholder="请输入需要转换的英文文本..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setError('') // 清除错误信息
                }}
                rows={6}
              />
              
              {/* 示例文本按钮 */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm text-muted-foreground">快速填充：</span>
                {sampleTexts.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(sample.text)
                      setError('')
                      setOutput('')
                    }}
                  >
                    {sample.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="case-type">转换类型</Label>
              <Select value={caseType} onValueChange={(value) => setCaseType(value as TextCase)}>
                <SelectTrigger id="case-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {caseOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 错误提示 */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleConvert} className="w-full">
              转换文本
            </Button>

            {output && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>转换结果</Label>
                  <CopyButton text={output} />
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="bg-muted"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">快捷操作：</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setInput(output)
                      setOutput('')
                      setError('')
                    }}
                    disabled={!output}
                  >
                    将结果作为输入
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setInput('')
                      setOutput('')
                      setError('')
                    }}
                  >
                    清空所有内容
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">使用提示：</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>仅支持英文字母转换</li>
                  <li>保留原有的标点符号和格式</li>
                  <li>数字和特殊字符不会改变</li>
                  <li>适用于邮件、文档等场景</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
