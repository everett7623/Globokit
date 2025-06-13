'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CopyButton } from '@/components/tools/copy-button'
import { convertToPinyin, getInitials, PinyinOptions } from '@/lib/tools/pinyin'

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [pinyinResult, setPinyinResult] = useState('')
  const [initialsResult, setInitialsResult] = useState('')
  const [toneType, setToneType] = useState<PinyinOptions['toneType']>('symbol')
  const [separator, setSeparator] = useState(' ')

  const handleConvert = () => {
    if (input) {
      const result = convertToPinyin(input, { toneType, separator })
      setPinyinResult(result)
      setInitialsResult(getInitials(input))
    }
  }

  const toneOptions = [
    { value: 'symbol', label: '带声调符号 (pīn yīn)' },
    { value: 'num', label: '带数字声调 (pin1 yin1)' },
    { value: 'none', label: '不带声调 (pin yin)' },
  ]

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
              将中文文本转换为拼音，支持多种格式和声调显示方式
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone-type">声调类型</Label>
                <Select value={toneType} onValueChange={(value) => setToneType(value as PinyinOptions['toneType'])}>
                  <SelectTrigger id="tone-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>拼音首字母</Label>
                    <CopyButton text={initialsResult} />
                  </div>
                  <div className="rounded-md border bg-muted p-4">
                    <p className="text-lg font-mono">{initialsResult}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">功能特点：</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>支持多音字智能识别</li>
                  <li>保留原文标点符号</li>
                  <li>自动过滤非中文字符</li>
                  <li>支持繁体中文转换</li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">使用场景：</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>姓名拼音标注</li>
                  <li>地址翻译</li>
                  <li>产品名称音译</li>
                  <li>拼音学习材料</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
