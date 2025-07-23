// 名称: 数字转英文
// 描述: 将数字转换为英文表达形式，支持基数词和序数词
// 路径: seedtool/app/tools/number-to-english/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-23

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { numberToEnglish, convertOrdinal } from '@/lib/tools/number-english'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Hash, Type, Calculator, Info, TrendingUp, Zap } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function NumberToEnglishPage() {
  const [number, setNumber] = useState('')
  const [cardinalResult, setCardinalResult] = useState('')
  const [ordinalResult, setOrdinalResult] = useState('')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{
    number: string
    cardinal: string
    ordinal: string
  }>>([])
  const [error, setError] = useState('')

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleConvert = () => {
    setError('')
    const num = parseInt(number)
    
    if (!number.trim()) {
      setError('请输入数字')
      setCardinalResult('')
      setOrdinalResult('')
      return
    }
    
    if (isNaN(num)) {
      setError('请输入有效的数字')
      setCardinalResult('')
      setOrdinalResult('')
      return
    }
    
    if (num < 0) {
      setError('请输入正数')
      setCardinalResult('')
      setOrdinalResult('')
      return
    }
    
    if (num > 999999999999) {
      setError('数字太大，最大支持12位数')
      setCardinalResult('')
      setOrdinalResult('')
      return
    }
    
    const cardinal = numberToEnglish(num)
    const ordinal = convertOrdinal(num)
    setCardinalResult(cardinal)
    setOrdinalResult(ordinal)
    
    // 添加到历史记录
    setHistory(prev => [{
      number: number,
      cardinal: cardinal,
      ordinal: ordinal
    }, ...prev.slice(0, 4)])
  }

  const examples = [
    { num: '123', cardinal: 'one hundred and twenty three', ordinal: 'one hundred and twenty third' },
    { num: '1000', cardinal: 'one thousand', ordinal: 'one thousandth' },
    { num: '2024', cardinal: 'two thousand and twenty four', ordinal: 'two thousand and twenty fourth' },
    { num: '1000000', cardinal: 'one million', ordinal: 'one millionth' },
  ]

  const commonNumbers = [
    { value: '1', label: '1' },
    { value: '12', label: '12' },
    { value: '100', label: '100' },
    { value: '1000', label: '1,000' },
    { value: '10000', label: '10,000' },
    { value: '100000', label: '100,000' },
    { value: '1000000', label: '1,000,000' },
    { value: '2024', label: '2024' },
  ]

  // 格式化显示数字（添加千位分隔符）
  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">数字转英文</h1>
        <p className="text-muted-foreground">
          将数字转换为英文表达形式，支持基数词和序数词，适用于支票、合同等正式文件
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              转换次数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{history.length}</div>
            <p className="text-xs text-muted-foreground">今日转换</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-4 w-4" />
              支持范围
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12位</div>
            <p className="text-xs text-muted-foreground">最大数字</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              转换模式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">种格式</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              实时转换
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">支持</div>
            <p className="text-xs text-muted-foreground">即时反馈</p>
          </CardContent>
        </Card>
      </div>

      {/* 主功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>数字转换</CardTitle>
          <CardDescription>
            输入数字，自动转换为英文基数词和序数词
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
              onChange={(e) => {
                setNumber(e.target.value)
                setError('')
              }}
              className="text-lg"
            />
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* 快捷数字按钮 */}
          <div className="space-y-2">
            <Label>常用数字</Label>
            <div className="flex flex-wrap gap-2">
              {commonNumbers.map((item) => (
                <Button
                  key={item.value}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNumber(item.value)
                    setError('')
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleConvert} className="w-full" size="lg">
            转换为英文
          </Button>

          {(cardinalResult || ordinalResult) && (
            <Tabs defaultValue="cardinal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cardinal">基数词 (Cardinal)</TabsTrigger>
                <TabsTrigger value="ordinal">序数词 (Ordinal)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cardinal" className="space-y-2">
                <Card className="border-2 border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      基数词结果
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(cardinalResult, 'cardinal')}
                      >
                        {copiedText === 'cardinal' ? (
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
                    <CardDescription>
                      表示数量，如：one, two, three...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-semibold text-primary">{cardinalResult}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      数字形式：{formatNumber(number)}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ordinal" className="space-y-2">
                <Card className="border-2 border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      序数词结果
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(ordinalResult, 'ordinal')}
                      >
                        {copiedText === 'ordinal' ? (
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
                    <CardDescription>
                      表示顺序，如：first, second, third...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-semibold text-primary">{ordinalResult}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      数字形式：{formatNumber(number)}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* 转换历史 */}
          {history.length > 0 && (
            <div className="space-y-2">
              <Label>最近转换记录</Label>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-3 pb-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-lg font-semibold">
                            {formatNumber(item.number)}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(item.cardinal, `history-cardinal-${index}`)}
                              className="h-8 px-2"
                            >
                              {copiedText === `history-cardinal-${index}` ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  <span className="text-xs">基数</span>
                                </>
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(item.ordinal, `history-ordinal-${index}`)}
                              className="h-8 px-2"
                            >
                              {copiedText === `history-ordinal-${index}` ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <>
                                  <Copy className="h-3 w-3 mr-1" />
                                  <span className="text-xs">序数</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="grid gap-1 text-sm">
                          <div>
                            <span className="text-muted-foreground">基数：</span>
                            <span className="ml-2">{item.cardinal}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">序数：</span>
                            <span className="ml-2">{item.ordinal}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 示例展示 */}
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              常见示例
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <div key={index} className="space-y-1 p-3 rounded bg-background">
                  <div className="font-mono font-semibold">{example.num}</div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="text-muted-foreground">基数：</span>
                      <span className="ml-2">{example.cardinal}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">序数：</span>
                      <span className="ml-2">{example.ordinal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                使用场景
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• 支票金额的英文大写</p>
              <p>• 合同中的数字表述</p>
              <p>• 正式文件的数字说明</p>
              <p>• 英文邮件中的数字表达</p>
              <p>• 财务报表的英文版本</p>
              <p>• 国际贸易单据填写</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                注意事项
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• 基数词用于表示数量</p>
              <p>• 序数词用于表示顺序或排名</p>
              <p>• 英式英语在百位后通常加"and"</p>
              <p>• 支持0-999,999,999,999的数字</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 数字单位说明 */}
      <Card className="mt-4 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">英文数字单位对照表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">1-19</p>
              <p className="text-muted-foreground">one, two, three...</p>
            </div>
            <div>
              <p className="font-medium">20-90</p>
              <p className="text-muted-foreground">twenty, thirty, forty...</p>
            </div>
            <div>
              <p className="font-medium">100</p>
              <p className="text-muted-foreground">hundred</p>
            </div>
            <div>
              <p className="font-medium">1,000</p>
              <p className="text-muted-foreground">thousand</p>
            </div>
            <div>
              <p className="font-medium">1,000,000</p>
              <p className="text-muted-foreground">million</p>
            </div>
            <div>
              <p className="font-medium">1,000,000,000</p>
              <p className="text-muted-foreground">billion</p>
            </div>
            <div>
              <p className="font-medium">序数词后缀</p>
              <p className="text-muted-foreground">-st, -nd, -rd, -th</p>
            </div>
            <div>
              <p className="font-medium">特殊序数</p>
              <p className="text-muted-foreground">first, second, third</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
