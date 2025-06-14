'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'
import { numberToChinese } from '@/lib/tools/rmb-converter'

export default function RMBConverterPage() {
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const handleConvert = () => {
    setError('')
    const num = parseFloat(amount)
    
    if (isNaN(num)) {
      setError('请输入有效的数字')
      setResult('')
      return
    }
    
    if (num < 0) {
      setError('请输入正数')
      setResult('')
      return
    }
    
    if (num > 999999999999999) {
      setError('数字太大，无法转换')
      setResult('')
      return
    }
    
    try {
      const converted = numberToChinese(num)
      setResult(converted)
    } catch (err) {
      setError('转换出错，请重试')
      setResult('')
    }
  }

  const commonAmounts = [
    { value: '100', label: '100元' },
    { value: '1000', label: '1千元' },
    { value: '10000', label: '1万元' },
    { value: '100000', label: '10万元' },
    { value: '1000000', label: '100万元' },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>人民币大写转换器</CardTitle>
            <CardDescription>
              将数字金额转换为中文大写格式，适用于发票、合同等正式文件
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">金额（数字）</Label>
              <Input
                id="amount"
                type="number"
                placeholder="请输入金额，如：12345.67"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            {/* 快捷金额按钮 */}
            <div className="flex flex-wrap gap-2">
              {commonAmounts.map((item) => (
                <Button
                  key={item.value}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAmount(item.value)
                    setError('')
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            
            <Button onClick={handleConvert} className="w-full">
              转换为大写
            </Button>

            {result && (
              <div className="space-y-2">
                <Label>转换结果</Label>
                <div className="relative">
                  <div className="rounded-md border bg-muted p-4 pr-12">
                    <p className="text-lg font-medium">{result}</p>
                  </div>
                  <CopyButton 
                    text={result} 
                    className="absolute right-2 top-2"
                  />
                </div>
              </div>
            )}

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">使用说明：</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>支持小数点后两位（角、分）</li>
                <li>最大支持千万亿级别的金额</li>
                <li>自动添加"人民币"前缀和"元整"或"元X角X分"后缀</li>
                <li>符合财务规范的大写格式</li>
              </ul>
            </div>

            {/* 示例展示 */}
            <div className="rounded-lg bg-blue-50 p-4 text-sm">
              <p className="font-medium text-blue-900 mb-2">转换示例：</p>
              <div className="space-y-1 text-blue-700">
                <p>123.45 → 人民币壹佰贰拾叁元肆角伍分</p>
                <p>10000 → 人民币壹万元整</p>
                <p>50000.5 → 人民币伍万元伍角</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
