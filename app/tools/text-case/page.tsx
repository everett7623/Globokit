// 名称: 英文大小写转换
// 描述: 快速转换英文文本的大小写格式，支持多种转换模式
// 路径: seedtool/app/tools/text-case/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-22

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Copy, Check, RefreshCw, Trash2, Type, Hash, FileText, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

// 大小写转换类型
type TextCase = 'upper' | 'lower' | 'sentence' | 'title' | 'toggle' | 'camel' | 'snake' | 'kebab'

// 转换函数
const convertCase = (text: string, caseType: TextCase): string => {
  switch (caseType) {
    case 'upper':
      return text.toUpperCase()
    
    case 'lower':
      return text.toLowerCase()
    
    case 'sentence':
      // 修复：正确处理多行文本和句子边界
      return text.split(/(\r?\n)/).map((part, index) => {
        // 保留换行符
        if (part === '\n' || part === '\r\n') return part
        
        // 处理每一行
        return part.split(/([.!?]+\s*)/).map((segment, i) => {
          // 保留标点符号
          if (i % 2 === 1) return segment
          
          // 转换文本段落
          const trimmed = segment.trim()
          if (!trimmed) return segment
          
          // 将第一个字母大写，其余小写
          return segment.replace(trimmed, 
            trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
          )
        }).join('')
      }).join('')
    
    case 'title':
      // 标题格式：主要单词首字母大写
      const smallWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'])
      return text.replace(/\b\w+/g, (word, index) => {
        // 第一个单词总是大写
        if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        
        // 小词保持小写（除非在句首）
        if (smallWords.has(word.toLowerCase())) {
          // 检查是否在句子开头（前面是句号、感叹号或问号）
          const beforeWord = text.slice(0, index).trim()
          if (beforeWord.match(/[.!?]$/)) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          }
          return word.toLowerCase()
        }
        
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
    
    case 'toggle':
      return text.split('').map(char => {
        if (char === char.toUpperCase()) return char.toLowerCase()
        if (char === char.toLowerCase()) return char.toUpperCase()
        return char
      }).join('')
    
    case 'camel':
      // 驼峰命名：首字母小写，后续单词首字母大写
      return text.replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^(.)/, (char) => char.toLowerCase())
    
    case 'snake':
      // 蛇形命名：全小写，单词用下划线分隔
      return text.replace(/\s+/g, '_')
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toLowerCase()
    
    case 'kebab':
      // 短横线命名：全小写，单词用短横线分隔
      return text.replace(/\s+/g, '-')
        .replace(/([A-Z])/g, '-$1')
        .replace(/_+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase()
    
    default:
      return text
  }
}

export default function TextCasePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseType, setCaseType] = useState<TextCase>('sentence')
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

    // 检查是否包含中文字符
    const chineseRegex = /[\u4e00-\u9fa5]/
    if (chineseRegex.test(input)) {
      setError('检测到中文字符，本工具仅支持英文大小写转换。请使用纯英文文本。')
      setOutput('')
      return
    }

    // 检查是否包含英文字母
    const englishRegex = /[a-zA-Z]/
    if (!englishRegex.test(input)) {
      setError('未检测到英文字母，请输入包含英文字母的文本')
      setOutput('')
      return
    }

    try {
      const result = convertCase(input, caseType)
      setOutput(result)
      // 添加到历史记录
      const typeLabel = caseOptions.find(opt => opt.value === caseType)?.shortLabel || caseType
      setHistory(prev => [{input: input.slice(0, 50), output: result.slice(0, 50), type: typeLabel}, ...prev.slice(0, 4)])
    } catch (err) {
      setError('转换失败，请重试')
      setOutput('')
    }
  }

  const caseOptions = [
    { value: 'upper', label: '全部大写', shortLabel: 'UPPERCASE', example: 'HELLO WORLD', icon: <Type className="h-4 w-4" /> },
    { value: 'lower', label: '全部小写', shortLabel: 'lowercase', example: 'hello world', icon: <Type className="h-4 w-4" /> },
    { value: 'sentence', label: '句子首字母大写', shortLabel: 'Sentence case', example: 'Hello world.', icon: <FileText className="h-4 w-4" /> },
    { value: 'title', label: '标题格式', shortLabel: 'Title Case', example: 'Hello World', icon: <FileText className="h-4 w-4" /> },
    { value: 'toggle', label: '大小写反转', shortLabel: 'tOGGLE cASE', example: 'hELLO wORLD', icon: <RefreshCw className="h-4 w-4" /> },
    { value: 'camel', label: '驼峰命名', shortLabel: 'camelCase', example: 'helloWorld', icon: <Hash className="h-4 w-4" /> },
    { value: 'snake', label: '蛇形命名', shortLabel: 'snake_case', example: 'hello_world', icon: <Hash className="h-4 w-4" /> },
    { value: 'kebab', label: '短横线命名', shortLabel: 'kebab-case', example: 'hello-world', icon: <Hash className="h-4 w-4" /> },
  ]

  // 示例文本
  const sampleTexts = [
    { 
      text: 'CATHETER SUCTION 16FR W/CON VALVE\nCATHETER SUCTION 08 FG / 14FG WITH FINGER CONTROL VALVE, STERILE', 
      label: '医疗设备' 
    },
    { 
      text: 'The Quick Brown Fox Jumps Over The Lazy Dog', 
      label: '完整句子' 
    },
    { 
      text: 'user@example.com\nJohn.Doe@Company.org', 
      label: '邮箱地址' 
    },
    {
      text: 'PRODUCT_NAME\nuser_id\norderNumber',
      label: '变量名'
    }
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

  // 统计信息
  const getStats = (text: string) => {
    return {
      chars: text.length,
      words: text.split(/\s+/).filter(w => w).length,
      lines: text.split('\n').length
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">英文大小写转换</h1>
        <p className="text-muted-foreground">
          快速转换英文文本的大小写格式，支持多种转换模式和编程命名规范
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
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
              <FileText className="h-4 w-4" />
              支持功能
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">多行</div>
            <p className="text-xs text-muted-foreground">文本处理</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Hash className="h-4 w-4" />
              编程规范
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">种命名法</p>
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
        <CardContent className="space-y-6">
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
              rows={8}
              className="font-mono text-base"
            />
            
            {/* 示例文本按钮 */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">快速填充：</span>
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
              <SelectContent>
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
                setHistory([])
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
                  rows={8}
                  className="bg-background font-mono text-base"
                />
                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span>{getStats(output).chars} 字符</span>
                  <span>·</span>
                  <span>{getStats(output).words} 单词</span>
                  <span>·</span>
                  <span>{getStats(output).lines} 行</span>
                </div>
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

      {/* 功能说明 */}
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              功能特点
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• 支持多行文本和复杂格式处理</p>
            <p>• 智能识别句子边界（句号、问号、感叹号）</p>
            <p>• 保留原有的标点符号和格式</p>
            <p>• 支持编程命名规范转换（驼峰、蛇形、短横线）</p>
            <p>• 实时预览转换效果</p>
            <p>• 保存最近5条转换历史记录</p>
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
            <p>• 文档标题和内容格式化</p>
            <p>• 代码变量命名转换</p>
            <p>• 邮件地址规范化</p>
            <p>• 产品描述和目录整理</p>
            <p>• SQL查询和数据处理</p>
            <p>• API文档和技术文档编写</p>
          </CardContent>
        </Card>
      </div>

      {/* 快捷说明 */}
      <Card className="mt-4 bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caseOptions.slice(0, 4).map((option) => (
              <div key={option.value} className="text-center">
                <div className="mb-2">{option.icon}</div>
                <p className="font-medium text-sm">{option.shortLabel}</p>
                <p className="text-xs text-muted-foreground">{option.example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
