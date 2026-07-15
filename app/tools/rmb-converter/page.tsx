// 名称: 人民币大写转换
// 描述: 将数字金额转换为中文大写形式，适用于发票、合同等正式文件
// 路径: Globokit/app/tools/rmb-converter/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

'use client'

import { useState } from 'react'
import { RmbReference, RmbStats } from './rmb-info-panels'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { numberToChinese } from '@/lib/tools/rmb-converter'
import { Copy, Check } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function RMBConverterPage() {
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{amount: string, result: string}>>([])

  const handleConvert = () => {
    setError('')
    const num = Number(amount)
    
    if (!Number.isFinite(num)) {
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
      // 添加到历史记录（最多保留5条）
      setHistory(prev => [{amount: amount, result: converted}, ...prev.slice(0, 4)])
    } catch {
      setError('转换出错，请重试')
      setResult('')
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const commonAmounts = [
    { value: '100', label: '100元' },
    { value: '1000', label: '1千元' },
    { value: '10000', label: '1万元' },
    { value: '100000', label: '10万元' },
    { value: '1000000', label: '100万元' },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">人民币大写转换器</h1>
        <p className="text-muted-foreground">
          将数字金额转换为中文大写格式，适用于发票、合同等正式文件
        </p>
      </div>

      <RmbStats historyCount={history.length} />

      {/* 主要功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>金额转换</CardTitle>
          <CardDescription>
            输入数字金额，自动转换为财务规范的中文大写格式
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
              className="text-lg"
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* 快捷金额按钮 */}
          <div className="space-y-2">
            <Label>快捷金额</Label>
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
          </div>
          
          <Button onClick={handleConvert} className="w-full" size="lg">
            转换为大写
          </Button>

          {result && (
            <Card className="border-2 border-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  转换结果
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(result, 'result')}
                  >
                    {copiedText === 'result' ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        复制
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-primary">{result}</p>
              </CardContent>
            </Card>
          )}

          {/* 转换历史 */}
          {history.length > 0 && (
            <div className="space-y-2">
              <Label>最近转换记录</Label>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="font-mono text-sm">{item.amount}</span>
                          <span className="mx-2 text-muted-foreground">→</span>
                          <span className="text-sm">{item.result}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.result, `history-${index}`)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedText === `history-${index}` ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <RmbReference />
    </>
  )
}
