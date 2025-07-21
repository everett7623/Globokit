// 名称: 英文大小写转换
// 描述: 快速转换英文文本的大小写格式，支持多种转换模式
// 路径: https://raw.githubusercontent.com/everett7623/seedtool/main/tools/text-case/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-21

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Copy, Check, RefreshCw, Trash2 } from 'lucide-react'
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

// 复制按钮组件
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="h-8"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 mr-1" />
          已复制
        </>
      ) : (
        <>
          <Copy className="h-3 w-3 mr-1" />
          复制
        </>
      )}
    </Button>
  )
}

export default function TextCasePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [caseType, setCaseType] = useState<TextCase>('sentence')
  const [error, setError] = useState('')

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
    } catch (err) {
      setError('转换失败，请重试')
      setOutput('')
    }
  }

  const caseOptions = [
    { value: 'upper', label: '全部大写 (UPPERCASE)', example: 'HELLO WORLD' },
    { value: 'lower', label: '全部小写 (lowercase)', example: 'hello world' },
    { value: 'sentence', label: '句子首字母大写 (Sentence case)', example: 'Hello world. How are you?' },
    { value: 'title', label: '标题格式 (Title Case)', example: 'Hello World and Welcome' },
    { value: 'toggle', label: '大小写反转 (tOGGLE cASE)', example: 'hELLO wORLD' },
    { value: 'camel', label: '驼峰命名 (camelCase)', example: 'helloWorld' },
    { value: 'snake', label: '蛇形命名 (snake_case)', example: 'hello_world' },
    { value: 'kebab', label: '短横线命名 (kebab-case)', example: 'hello-world' },
  ]

  // 示例文本
  const sampleTexts = [
    { 
      text: 'CATHETER SUCTION 16FR W/CON VALVE\nCATHETER SUCTION 08 FG / 14FG WITH FINGER CONTROL VALVE, STERILE', 
      label: '医疗设备示例' 
    },
    { 
      text: 'The Quick Brown Fox Jumps Over The Lazy Dog', 
      label: '完整句子' 
    },
    { 
      text: 'user@example.com\nJohn.Doe@Company.org', 
      label: '邮箱地址' 
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

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>英文大小写转换</CardTitle>
            <CardDescription>
              快速转换英文文本的大小写格式，支持多种转换模式和编程命名规范
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
                className="font-mono"
              />
              
              {/* 示例文本按钮 */}
              <div className="flex flex-wrap gap-2 mt-2">
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
                      <div className="flex justify-between items-center w-full">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground ml-4">{option.example}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* 实时预览 */}
              {input && (
                <div className="text-sm text-muted-foreground">
                  预览: <span className="font-mono">{getPreview()}</span>
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
              <Button onClick={handleConvert} className="flex-1">
                转换文本
              </Button>
              <Button
                variant="outline"
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>转换结果</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setInput(output)
                        setOutput('')
                        setError('')
                      }}
                      title="将结果作为输入"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      作为输入
                    </Button>
                    <CopyButton text={output} />
                  </div>
                </div>
                <Textarea
                  value={output}
                  readOnly
                  rows={8}
                  className="bg-muted font-mono"
                />
                <div className="text-sm text-muted-foreground">
                  {output.length} 字符 · {output.split(/\s+/).filter(w => w).length} 单词 · {output.split('\n').length} 行
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">功能特点：</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>支持多行文本和复杂格式</li>
                  <li>智能识别句子边界（句号、问号、感叹号）</li>
                  <li>保留原有的标点符号和格式</li>
                  <li>支持编程命名规范转换</li>
                  <li>实时预览转换效果</li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-medium mb-2">使用场景：</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>文档标题和内容格式化</li>
                  <li>代码变量命名转换</li>
                  <li>邮件地址规范化</li>
                  <li>产品描述和目录整理</li>
                  <li>SQL查询和数据处理</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
