'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'
import { pinyinMap } from '@/lib/tools/pinyin-data'

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{
    pinyin: string;
    initials: string;
    unknownCount: number;
  } | null>(null)

  const convertToPinyin = () => {
    if (!input.trim()) {
      setResult(null)
      return
    }

    const chars = input.split('')
    const pinyinArray: string[] = []
    const initials: string[] = []
    let unknownCount = 0

    chars.forEach(char => {
      if (pinyinMap[char]) {
        pinyinArray.push(pinyinMap[char])
        initials.push(pinyinMap[char][0].toUpperCase())
      } else if (/[a-zA-Z0-9]/.test(char)) {
        pinyinArray.push(char)
        if (/[a-zA-Z]/.test(char)) {
          initials.push(char.toUpperCase())
        }
      } else if (/[\s\.,!?;:'"，。！？；：""''（）【】《》\-_、]/.test(char)) {
        pinyinArray.push(char)
      } else if (/[\u4e00-\u9fa5]/.test(char)) {
        pinyinArray.push(`[${char}]`)
        initials.push('?')
        unknownCount++
      } else {
        pinyinArray.push(char)
      }
    })

    setResult({
      pinyin: pinyinArray.join(' ').replace(/\s+/g, ' ').trim(),
      initials: initials.join(''),
      unknownCount
    })
  }

  const sampleTexts = [
    { text: '中文转拼音', label: '基础示例' },
    { text: '你好世界', label: '常用问候' },
    { text: '我爱北京天安门', label: '经典句子' },
    { text: '今天天气真好', label: '日常用语' },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>中文转拼音</CardTitle>
            <CardDescription>
              将中文文本转换为拼音，支持常用汉字
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
              
              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((sample, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(sample.text)
                    }}
                  >
                    {sample.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={convertToPinyin} className="w-full">
              转换拼音
            </Button>

            {result && (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>完整拼音</Label>
                    <CopyButton text={result.pinyin} />
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="break-all">{result.pinyin}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>拼音首字母</Label>
                    <CopyButton text={result.initials} />
                  </div>
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-mono break-all">{result.initials}</p>
                  </div>
                </div>

                {result.unknownCount > 0 && (
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
                    <p className="text-sm text-orange-800">
                      有 {result.unknownCount} 个汉字未被收录，已用 [ ] 标记
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">使用说明：</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>支持600+常用汉字转换</li>
                <li>保留英文、数字和标点符号</li>
                <li>未收录的汉字会用 [原字] 标记</li>
                <li>拼音首字母中，未知汉字显示为 ?</li>
                <li>适用于姓名、地址、日常用语等转换</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
