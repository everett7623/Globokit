// 名称: 特殊字符检查与转换
// 描述: 检查文本中的特殊字符，并提供清理或替换选项
// 路径: seedtool/app/tools/special-char/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-23

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { checkSpecialChars } from '@/lib/tools/special-char'
import { AlertCircle, CheckCircle, Copy, Check, Search, Shield, FileWarning, Info, Zap } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function SpecialCharPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ReturnType<typeof checkSpecialChars> | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [checkHistory, setCheckHistory] = useState<Array<{
    time: string
    charCount: number
    hasSpecial: boolean
  }>>([])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleCheck = () => {
    if (input) {
      const checkResult = checkSpecialChars(input)
      setResult(checkResult)
      
      // 添加到检查历史
      setCheckHistory(prev => [{
        time: new Date().toLocaleTimeString('zh-CN'),
        charCount: checkResult.specialChars.length,
        hasSpecial: checkResult.hasSpecialChars
      }, ...prev.slice(0, 4)])
    }
  }

  // 示例文本
  const sampleTexts = [
    { 
      text: 'Hello，世界！这是一个测试文本。', 
      label: '中英混合' 
    },
    { 
      text: 'Price: ￥100.00 / $15.99 （含税）', 
      label: '货币符号' 
    },
    { 
      text: 'Email: user@example.com\nTel: +86-123-4567-8900', 
      label: '联系方式' 
    },
    {
      text: 'Product™ © 2024 - "Best" Quality®',
      label: '商标符号'
    }
  ]

  // 特殊字符分类统计
  const categorizeSpecialChars = (chars: string[]) => {
    const categories = {
      chinese: 0,
      currency: 0,
      punctuation: 0,
      symbols: 0,
      other: 0
    }

    chars.forEach(char => {
      if (/[\u4e00-\u9fa5]/.test(char)) {
        categories.chinese++
      } else if (/[￥$€£¥₹₽]/.test(char)) {
        categories.currency++
      } else if (/[，。！？、；：""''（）【】《》]/.test(char)) {
        categories.punctuation++
      } else if (/[™®©℃℉§†‡№]/.test(char)) {
        categories.symbols++
      } else {
        categories.other++
      }
    })

    return categories
  }

  const stats = result ? categorizeSpecialChars(result.specialChars) : null

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">特殊字符检查与转换</h1>
        <p className="text-muted-foreground">
          检查文本中的特殊字符，并提供清理或替换选项，避免在邮件或文档中出现乱码
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4" />
              检查次数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{checkHistory.length}</div>
            <p className="text-xs text-muted-foreground">今日检查</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileWarning className="h-4 w-4" />
              发现问题
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {checkHistory.filter(h => h.hasSpecial).length}
            </div>
            <p className="text-xs text-muted-foreground">包含特殊字符</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              处理模式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">种清理方式</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4" />
              实时检测
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
          <CardTitle>文本检查</CardTitle>
          <CardDescription>
            输入或粘贴文本，系统将自动检测并标记所有特殊字符
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">输入文本</Label>
              <span className="text-sm text-muted-foreground">
                {input.length} 字符
              </span>
            </div>
            <Textarea
              id="input"
              placeholder="粘贴需要检查的文本..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="font-mono text-base"
            />
            
            {/* 示例文本按钮 */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">快速示例：</span>
              {sampleTexts.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput(sample.text)
                    setResult(null)
                  }}
                >
                  {sample.label}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleCheck} className="w-full" size="lg">
            检查特殊字符
          </Button>

          {result && (
            <>
              {/* 检查结果状态 */}
              <Alert variant={result.hasSpecialChars ? "destructive" : "default"}>
                {result.hasSpecialChars ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertDescription className="font-medium">
                  {result.hasSpecialChars
                    ? `发现 ${result.specialChars.length} 个特殊字符，可能在某些系统中显示异常`
                    : '未发现特殊字符，文本可以安全使用'}
                </AlertDescription>
              </Alert>

              {result.hasSpecialChars && (
                <>
                  {/* 特殊字符详情 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">发现的特殊字符</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {result.specialChars.map((char, index) => (
                            <Badge 
                              key={index} 
                              variant="destructive"
                              className="text-lg px-3 py-1 font-mono"
                            >
                              {char}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* 字符分类统计 */}
                        {stats && (
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-3 border-t">
                            {stats.chinese > 0 && (
                              <div className="text-center">
                                <p className="text-2xl font-bold">{stats.chinese}</p>
                                <p className="text-xs text-muted-foreground">中文字符</p>
                              </div>
                            )}
                            {stats.currency > 0 && (
                              <div className="text-center">
                                <p className="text-2xl font-bold">{stats.currency}</p>
                                <p className="text-xs text-muted-foreground">货币符号</p>
                              </div>
                            )}
                            {stats.punctuation > 0 && (
                              <div className="text-center">
                                <p className="text-2xl font-bold">{stats.punctuation}</p>
                                <p className="text-xs text-muted-foreground">标点符号</p>
                              </div>
                            )}
                            {stats.symbols > 0 && (
                              <div className="text-center">
                                <p className="text-2xl font-bold">{stats.symbols}</p>
                                <p className="text-xs text-muted-foreground">特殊符号</p>
                              </div>
                            )}
                            {stats.other > 0 && (
                              <div className="text-center">
                                <p className="text-2xl font-bold">{stats.other}</p>
                                <p className="text-xs text-muted-foreground">其他字符</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 处理结果标签页 */}
                  <Tabs defaultValue="smart" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="smart">智能替换</TabsTrigger>
                      <TabsTrigger value="clean">完全清理</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="smart" className="space-y-2">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center justify-between">
                            智能替换结果
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(result.replacedText, 'replaced')}
                            >
                              {copiedText === 'replaced' ? (
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
                            将特殊字符替换为相近的标准字符，保留原意
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            value={result.replacedText}
                            readOnly
                            rows={6}
                            className="bg-muted font-mono"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="clean" className="space-y-2">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center justify-between">
                            完全清理结果
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(result.cleanedText, 'cleaned')}
                            >
                              {copiedText === 'cleaned' ? (
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
                            仅保留ASCII字符，适合纯英文环境
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            value={result.cleanedText}
                            readOnly
                            rows={6}
                            className="bg-muted font-mono"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </>
          )}

          {/* 检查历史 */}
          {checkHistory.length > 0 && (
            <div className="space-y-2">
              <Label>最近检查记录</Label>
              <div className="space-y-2">
                {checkHistory.map((item, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.hasSpecial ? (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {item.hasSpecial ? `发现 ${item.charCount} 个特殊字符` : '无特殊字符'}
                            </p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                        </div>
                        <Badge variant={item.hasSpecial ? "destructive" : "secondary"}>
                          {item.hasSpecial ? '需处理' : '安全'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 功能说明 */}
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              功能说明
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 自动检测中英文标点、特殊符号等</p>
            <p>• 智能替换：将特殊字符替换为相近的标准字符</p>
            <p>• 完全清理：只保留标准ASCII字符，适合纯英文环境</p>
            <p>• 支持批量文本处理，无长度限制</p>
            <p>• 实时统计各类特殊字符数量</p>
            <p>• 保存最近5次检查历史记录</p>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              使用场景
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 邮件发送前的文本检查</p>
            <p>• 跨系统文档传输</p>
            <p>• 数据库录入前的清理</p>
            <p>• API接口数据处理</p>
            <p>• Excel/CSV文件导入</p>
            <p>• 国际化内容处理</p>
          </CardContent>
        </Card>
      </div>

      {/* 常见特殊字符说明 */}
      <Card className="mt-4 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">常见特殊字符类型</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">中文标点符号</p>
              <p className="text-muted-foreground">
                ，。！？、；：""''（）【】《》
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">货币符号</p>
              <p className="text-muted-foreground">
                ￥ $ € £ ¥ ₹ ₽ ₩ ₪
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">商标版权符号</p>
              <p className="text-muted-foreground">
                ™ ® © ℃ ℉ § † ‡ № 
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">其他特殊符号</p>
              <p className="text-muted-foreground">
                … — – ° ± × ÷ ≈ ≠ ≤ ≥
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
