// 名称: 文本转换信息面板
// 描述: 展示模式统计、转换示例与使用说明
// 路径: Globokit/app/tools/text-case/text-case-info.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Code, Info, Keyboard, RefreshCw, Type } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { convertCase } from '@/lib/tools/text-case'
import { CASE_OPTIONS } from './text-case-data'

export function TextCaseStats({ historyCount }: { historyCount: number }) {
  const stats = [
    { label: '转换模式', value: CASE_OPTIONS.length, note: '种格式', icon: Type },
    { label: '编程支持', value: '7+', note: '开发常用格式', icon: Code },
    { label: '历史记录', value: historyCount, note: '次转换', icon: RefreshCw },
  ]
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{item.value}</div><p className="text-xs text-muted-foreground">{item.note}</p></CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const INSTRUCTIONS = [
  ['多模式支持:', '内置 15 种转换算法，完美覆盖日常写作、编程开发及文件命名需求。'],
  ['影视与PT:', '特有“点连接命名”模式，智能识别 S01/HDTV 等关键词，保留原始大小写，一键生成规范文件名。'],
  ['开发者友好:', '支持驼峰 (Camel)、下划线 (Snake) 等常用编程变量转换，自动识别单词边界。'],
  ['批量操作:', '支持多段文本混合输入，毫秒级实时转换，自动保留原文本换行格式。'],
  ['快捷复用:', '自动记录最近 5 次转换结果，点击右侧历史记录即可快速复制，提升工作效率。'],
]

export function TextCaseInfo() {
  const demoText = 'hello world'
  return (
    <div className="grid gap-4 mt-6 md:grid-cols-2">
      <Card className="bg-muted/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />转换示例</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm max-h-[300px] overflow-y-auto pr-3">
            {CASE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center justify-between p-2 rounded hover:bg-background transition-colors">
                <span className="font-mono text-xs text-muted-foreground w-28 shrink-0 truncate" title={option.shortLabel}>{option.shortLabel}</span>
                <div className="flex-1 flex items-center justify-end gap-2 overflow-hidden ml-2">
                  <span className="font-mono truncate text-xs sm:text-sm">{demoText}</span><span className="text-muted-foreground shrink-0">→</span>
                  <span className="font-mono font-medium truncate text-xs sm:text-sm text-right">{convertCase(demoText, option.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-muted/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Keyboard className="h-5 w-5" />使用说明</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          {INSTRUCTIONS.map(([title, content]) => (
            <p key={title} className="flex items-start gap-2"><span className="font-semibold text-foreground shrink-0">• {title}</span><span>{content}</span></p>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
