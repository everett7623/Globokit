'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CopyButton } from '@/components/tools/copy-button'

// 简单的拼音映射表（示例）
const pinyinMap: { [key: string]: string } = {
  '中': 'zhong',
  '文': 'wen',
  '转': 'zhuan',
  '拼': 'pin',
  '音': 'yin',
  '测': 'ce',
  '试': 'shi',
  // 可以扩展更多字符
}

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [pinyinResult, setPinyinResult] = useState('')
  const [initialsResult, setInitialsResult] = useState('')
  const [separator, setSeparator] = useState(' ')

  const handleConvert = () => {
    if (!input) return
    
    // 简单的拼音转换实现
    const chars = input.split('')
    const pinyinArray: string[] = []
    const initials: string[] = []
    
    chars.forEach(char => {
      if (pinyinMap[char]) {
        pinyinArray.push(pinyinMap[char])
        initials.push(pinyinMap[char][0].toUpperCase())
      } else if (/[a-zA-Z0-9]/.test(char)) {
        pinyinArray.push(char)
        initials.push(char.toUpperCase())
      } else if (/\s/.test(char)) {
        pinyinArray.push(' ')
      }
    })
    
    setPinyinResult(pinyinArray.join(separator))
    setInitialsResult(initials.join(''))
  }

  const separatorOptions = [
    { value: ' ', label: '空格分隔' },
    { value: '-', label: '连字符分隔' },
    { value: '', label: '无分隔' },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>中文转拼音</CardTitle>
            <CardDescription>
              将中文文本转换为拼音（简化版本）
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">输入中文文本</Label>
              <Textarea
                id="input"
                placeholder="请输入需要转换的中文..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="separator">分隔符</Label>
              <Select value={separator} onValueChange={setSeparator}>
                <SelectTrigger id="separator">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {separatorOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleConvert} className="w-full">
              转换拼音
            </Button>

            {pinyinResult && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>完整拼音</Label>
                    <CopyButton text={pinyinResult} />
                  </div>
                  <div className="rounded-md border bg-muted p-4">
                    <p className="text-lg">{pinyinResult}</p>
                  </div>
                </div>

                {initialsResult && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>拼音首字母</Label>
                      <CopyButton text={initialsResult} />
                    </div>
                    <div className="rounded-md border bg-muted p-4">
                      <p className="text-lg font-mono">{initialsResult}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-lg bg-blue-50 p-4 text-sm">
              <p className="font-medium text-blue-900 mb-2">提示：</p>
              <p className="text-blue-700">
                这是一个简化版本的拼音转换器。完整版本需要更大的字典库。
                当前只支持部分常用汉字。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
