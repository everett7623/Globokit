'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function PinyinPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleConvert = () => {
    // 超简化版本 - 只做基本演示
    const basicMap: { [key: string]: string } = {
      '中': 'zhong', '文': 'wen', '转': 'zhuan', '拼': 'pin', '音': 'yin',
      '你': 'ni', '好': 'hao', '世': 'shi', '界': 'jie', '我': 'wo',
      '爱': 'ai', '中': 'zhong', '国': 'guo', '北': 'bei', '京': 'jing',
    }
    
    let output = ''
    for (let char of input) {
      if (basicMap[char]) {
        output += basicMap[char] + ' '
      } else if (/[a-zA-Z0-9\s]/.test(char)) {
        output += char
      } else {
        output += `[${char}] `
      }
    }
    
    setResult(output.trim())
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>中文转拼音（演示版）</CardTitle>
            <CardDescription>
              简单的中文转拼音工具
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>输入中文</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入中文文本..."
                rows={4}
              />
            </div>
            
            <Button onClick={handleConvert} className="w-full">
              转换
            </Button>
            
            {result && (
              <div className="space-y-2">
                <Label>结果</Label>
                <div className="p-4 bg-gray-100 rounded">
                  {result}
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-600">
              <p>提示：这是简化演示版本，仅支持少量常用字。</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
