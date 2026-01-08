// 名称: 英文大小写转换
// 描述: 快速转换英文文本的大小写格式，支持多种转换模式
// 路径: seedtool/app/tools/text-case/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Copy, Check, RefreshCw, Trash2, Type, FileText, Info, Code, Hash, Keyboard } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { convertCase, type TextCase } from '@/lib/tools/text-case'

export default function TextCasePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseType, setCaseType] = useState<TextCase>('dot')
  const [error, setError] = useState('')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [history, setHistory] = useState<Array<{input: string, output: string, type: string}>>([])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleConvert = () => {
    setError('')
    
    if (!input.trim()) {
      setError('请输入需要转换的文本')
      setOutput('')
      return
    }

    const chineseRegex = /[\u4e00-\u9fa5]/
    if (chineseRegex.test(input)) {
      setError('检测到中文字符，本工具仅支持英文大小写转换。')
      setOutput('')
      return
    }

    const validCharRegex = /[a-zA-Z0-9]/
    if (!validCharRegex.test(input)) {
      setError('未检测到有效字符，请输入包含英文字母或数字的文本')
      setOutput('')
      return
    }

    try {
      const result = convertCase(input, caseType)
      setOutput(result)
      const typeLabel = caseOptions.find(opt => opt.value === caseType)?.shortLabel || caseType
      setHistory(prev => [{input: input.slice(0, 50), output: result.slice(0, 50), type: typeLabel}, ...prev.slice(0, 4)])
    } catch (err) {
      setError('转换失败，请重试')
      setOutput('')
    }
  }

  // 定义所有支持的格式选项，shortLabel 已完全汉化
  const caseOptions = [
    // 基础格式
    { value: 'upper', label: '全部大写', shortLabel: '全部大写', example: 'HELLO WORLD', icon: <Type className="h-4 w-4" /> },
    { value: 'lower', label: '全部小写', shortLabel: '全部小写', example: 'hello world', icon: <Type className="h-4 w-4" /> },
    { value: 'sentence', label: '句子首字母大写', shortLabel: '句子格式', example: 'Hello world.', icon: <FileText className="h-4 w-4" /> },
    { value: 'title', label: '标题格式', shortLabel: '标题格式', example: 'Hello World', icon: <FileText className="h-4 w-4" /> },
    { value: 'capitalize', label: '单词首字母大写', shortLabel: '首字大写', example: 'Hello World', icon: <Type className="h-4 w-4" /> },
    
    // 趣味/特殊格式
    { value: 'toggle', label: '大小写反转', shortLabel: '大小写反转', example: 'hELLO wORLD', icon: <RefreshCw className="h-4 w-4" /> },
    { value: 'alternating', label: '交替大小写', shortLabel: '交替大小写', example: 'HeLLo WoRLd', icon: <RefreshCw className="h-4 w-4" /> },
    { value: 'inverse', label: '反向格式', shortLabel: '反向格式', example: 'hELLO WORLD', icon: <RefreshCw className="h-4 w-4" /> },
    
    // 编程常用格式
    { value: 'snake', label: '下划线命名', shortLabel: '下划线命名', example: 'hello_world', icon: <Code className="h-4 w-4" /> },
    { value: 'kebab', label: '短横线命名', shortLabel: '短横线命名', example: 'hello-world', icon: <Code className="h-4 w-4" /> },
    { value: 'camel', label: '小驼峰命名', shortLabel: '小驼峰命名', example: 'helloWorld', icon: <Code className="h-4 w-4" /> },
    { value: 'pascal', label: '大驼峰命名', shortLabel: '大驼峰命名', example: 'HelloWorld', icon: <Code className="h-4 w-4" /> },
    { value: 'constant', label: '常量命名', shortLabel: '常量命名', example: 'HELLO_WORLD', icon: <Code className="h-4 w-4" /> },
    { value: 'dot', label: '点连接命名', shortLabel: '点连接命名', example: 'hello.world', icon: <Hash className="h-4 w-4" /> },
    { value: 'path', label: '路径格式', shortLabel: '路径格式', example: 'hello/world', icon: <Hash className="h-4 w-4" /> },
  ]

  // 还原为通用的示例文本
  const sampleTexts = [
    { 
      text: 'The Quick Brown Fox Jumps Over The Lazy Dog', 
      label: '完整句子' 
    },
    { 
      text: 'hello world, this is a test message', 
      label: '小写文本' 
    },
    { 
      text: 'IMPORTANT NOTICE: PLEASE READ CAREFULLY', 
      label: '大写文本' 
    },
  ]

  // 实时预览
  const getPreview = () => {
    if (!input.trim()) return ''
    try {
      return convertCase(input, caseType).slice(0, 50) + (input.length > 50 ? '...' : '')
    } catch {
      return ''
    }
  }

  // 演示用的基础文本 (保持 hello world)
  const demoText = "hello world"

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">英文大小写转换</h1>
        <p className="text-muted-foreground">
          快速转换英文文本的大小写格式，支持编程命名规范与文件名格式化
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              转换模式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseOptions.length}</div>
            <p className="text-xs text-muted-foreground">种格式</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Code className="h-4 w-4" />
              编程支持
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7+</div>
            <p className="text-xs text-muted-foreground">开发常用格式</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              历史记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{history.length}</div>
            <p className="text-xs text-muted-foreground">次转换</p>
          </CardContent>
        </Card>
      </div>

      {/* 主功能区 */}
      <Card>
        <CardHeader>
          <CardTitle>文本转换</CardTitle>
          <CardDescription>
            输入英文文本，选择转换格式，即可快速转换大小写
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
              placeholder="请输入需要转换的英文文本...&#10;支持多行文本输入"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setError('')
              }}
              rows={6}
              className="font-mono"
            />
            
            {/* 示例文本按钮 */}
            <div className="flex flex-wrap gap-2">
              <Label className="text-sm">快速填充：</Label>
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
              <SelectTrigger id="case-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {caseOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-3 w-full">
                      {option.icon}
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.example}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* 实时预览 */}
            {input && (
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground mb-1">预览：</p>
                <p className="font-mono text-sm">{getPreview()}</p>
              </div>
            )}
          </div>

          {/* 错误提示 */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button onClick={handleConvert} className="flex-1" size="lg">
              转换文本
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setInput('')
                setOutput('')
                setError('')
              }}
              title="清空所有内容"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {output && (
            <Card className="border-2 border-primary">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  转换结果
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setInput(output)
                        setOutput('')
                        setError('')
                      }}
                      title="将结果作为输入"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      作为输入
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(output, 'output')}
                    >
                      {copiedText === 'output' ? (
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
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={output}
                  readOnly
                  rows={6}
                  className="bg-background font-mono"
                />
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
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {item.input.length > 30 ? item.input.slice(0, 30) + '...' : item.input}
                            </span>
                          </div>
                          <p className="font-mono text-sm">
                            {item.output.length > 50 ? item.output.slice(0, 50) + '...' : item.output}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(item.output, `history-${index}`)}
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

      {/* 功能说明与转换示例 */}
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              转换示例
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm max-h-[300px] overflow-y-auto pr-3">
              {/* 动态生成所有格式的示例 */}
              {caseOptions.map((option, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-background transition-colors">
                  <span className="font-mono text-xs text-muted-foreground w-28 shrink-0 truncate" title={option.shortLabel}>{option.shortLabel}</span>
                  <div className="flex-1 flex items-center justify-end gap-2 overflow-hidden ml-2">
                    <span className="font-mono truncate text-xs sm:text-sm">{demoText}</span>
                    <span className="text-muted-foreground shrink-0">→</span>
                    <span className="font-mono font-medium truncate text-xs sm:text-sm text-right">
                      {convertCase(demoText, option.value as TextCase)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              使用说明
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="font-semibold text-foreground shrink-0">• 多模式支持:</span>
              <span>支持 15 种转换模式，涵盖基础大小写与 Camel/Snake 等编程命名规范。</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-foreground shrink-0">• 智能分词:</span>
              <span>精准识别单词边界，正确处理驼峰命名与缩写词（如 XML, HDTV），避免错误拆分。</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-foreground shrink-0">• 文件命名:</span>
              <span>特有的“点连接命名”可保留原始大小写（如 S01.HDTV），完美适配影视资源命名场景。</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-foreground shrink-0">• 批量处理:</span>
              <span>支持大段多行文本输入，一键批量转换，保留原有换行。</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-foreground shrink-0">• 历史回溯:</span>
              <span>自动保存最近 5 条转换记录，点击复制图标即可快速复用。</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
