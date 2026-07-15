// 名称: 文本大小写页面数据
// 描述: 定义转换选项、快速示例与历史记录类型
// 路径: Globokit/app/tools/text-case/text-case-data.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Code, FileText, Hash, RefreshCw, Type } from 'lucide-react'
import type { TextCase } from '@/lib/tools/text-case'

export interface TextCaseHistoryItem {
  input: string
  output: string
  type: string
}

export const CASE_OPTIONS: Array<{
  value: TextCase
  label: string
  shortLabel: string
  example: string
  icon: React.ReactNode
}> = [
  { value: 'upper', label: '全部大写', shortLabel: 'UPPERCASE', example: 'HELLO WORLD', icon: <Type className="h-4 w-4" /> },
  { value: 'lower', label: '全部小写', shortLabel: 'lowercase', example: 'hello world', icon: <Type className="h-4 w-4" /> },
  { value: 'sentence', label: '句子首字母大写', shortLabel: 'Sentence case', example: 'Hello world.', icon: <FileText className="h-4 w-4" /> },
  { value: 'title', label: '标题格式', shortLabel: 'Title Case', example: 'Hello World', icon: <FileText className="h-4 w-4" /> },
  { value: 'capitalize', label: '单词首字母大写', shortLabel: 'Capitalize', example: 'Hello World', icon: <Type className="h-4 w-4" /> },
  { value: 'toggle', label: '大小写反转', shortLabel: 'tOGGLE cASE', example: 'hELLO wORLD', icon: <RefreshCw className="h-4 w-4" /> },
  { value: 'alternating', label: '交替大小写', shortLabel: 'aLtErNaTiNg', example: 'HeLLo WoRLd', icon: <RefreshCw className="h-4 w-4" /> },
  { value: 'inverse', label: '反向格式', shortLabel: 'iNVERSE', example: 'hELLO WORLD', icon: <RefreshCw className="h-4 w-4" /> },
  { value: 'snake', label: '下划线命名', shortLabel: 'snake_case', example: 'hello_world', icon: <Code className="h-4 w-4" /> },
  { value: 'kebab', label: '短横线命名', shortLabel: 'kebab-case', example: 'hello-world', icon: <Code className="h-4 w-4" /> },
  { value: 'camel', label: '小驼峰命名', shortLabel: 'camelCase', example: 'helloWorld', icon: <Code className="h-4 w-4" /> },
  { value: 'pascal', label: '大驼峰命名', shortLabel: 'PascalCase', example: 'HelloWorld', icon: <Code className="h-4 w-4" /> },
  { value: 'constant', label: '常量命名', shortLabel: 'CONSTANT_CASE', example: 'HELLO_WORLD', icon: <Code className="h-4 w-4" /> },
  { value: 'dot', label: '点连接命名', shortLabel: 'dot.case', example: 'hello.world', icon: <Hash className="h-4 w-4" /> },
  { value: 'path', label: '路径格式', shortLabel: 'path/case', example: 'hello/world', icon: <Hash className="h-4 w-4" /> },
]

export const SAMPLE_TEXTS = [
  { text: 'HELLO WORLD', label: '大写文本' },
  { text: 'hello world, this is a test message', label: '小写文本' },
  { text: 'user_id_123', label: '编程变量' },
]
