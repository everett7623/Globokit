'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/tools/copy-button'
import { numberToEnglish, convertOrdinal } from '@/lib/tools/number-english'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function NumberToEnglishPage() {
  const [number, setNumber] = useState('')
  const [cardinalResult, setCardinalResult] = useState('')
  const [ordinalResult, setOrdinalResult] = useState('')

  const handleConvert = () => {
    const num = parseInt(number)
    if (!isNaN(num)) {
      setCardinalResult(numberToEnglish(num))
      setOrdinalResult(convertOrdinal(num))
    } else {
      setCardinalResult('请输入有效的数字')
      setOrdinalResult('请输入有效的数字')
    }
  }

  const examples = [
    { num: '123', text: 'one hundred and twenty three' },
    { num: '1000', text: 'one thousand' },
    { num: '2024', text: 'two thousand and twenty four' },
    { num: '1000000', text: 'one million' },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>数字转英文</CardTitle>
            <CardDescription>
              将数字转换为英文表达形式，支持基数词和序数词
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number">输入数字</Label>
              <Input
                id="number"
                type="number"
                placeholder="请输入数字，如：123"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <Button onClick={handleConvert} className="w-full">
              转换为英文
            </Button>

            {(cardinalResult || ordinalResult) && (
              <Tabs defaultValue="cardinal" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="cardinal">基数词</TabsTrigger>
                  <TabsTrigger value="ordinal">序数词</TabsTrigger>
                </TabsList>
                <TabsContent value="cardinal" className="space-y-2">
                  <div className="relative">
                    <div className="rounded-md border bg-muted p-4 pr-12">
                      <p className="text-lg">{cardinalResult}</p>
                    </div>
                    <CopyButton 
                      text={cardinalResult} 
                      className="absolute right-2 top-2"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="ordinal" className="space-y-2">
                  <div className="relative">
                    <div className="rounded-md border bg-muted p-4 pr-12">
                      <p className="text-lg">{ordinalResult}</p>
                    </div>
                    <CopyButton 
                      text={ordinalResult} 
                      className="absolute right-2 top-2"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            )}

            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="font-medium mb-3">常见示例：</p>
                <div className="space-y-2">
                  {examples.map((example, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-mono">{example.num}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-right flex-1 ml-2">{example.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">使用场景：</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>支票金额的英文大写</li>
                  <li>合同中的数字表述</li>
                  <li>正式文件的数字说明</li>
                  <li>英文邮件中的数字表达</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
