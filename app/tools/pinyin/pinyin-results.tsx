// 名称: 拼音转换结果
// 描述: 展示转换文本、字符统计和最近五次历史
// 路径: Globokit/app/tools/pinyin/pinyin-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Badge } from '@/components/ui/badge'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { analyzeText } from '@/lib/tools/pinyin'
import type { PinyinHistoryItem } from './pinyin-page-data'

interface PinyinResultsProps {
  output: string
  stats: ReturnType<typeof analyzeText>
}

export function PinyinResults({ output, stats }: PinyinResultsProps) {
  if (!output) return null
  const statItems = [
    { label: '总字符数', value: stats.totalChars, className: '' },
    { label: '中文字符', value: stats.chineseChars, className: 'text-primary' },
    { label: '非中文字符', value: stats.nonChineseChars, className: '' },
    { label: '中文占比', value: stats.conversionRate, className: 'text-green-600' },
  ]
  return (
    <>
      <Card className="border-2 border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            转换结果
            <EnhancedCopyButton text={output} variant="ghost" size="sm">复制</EnhancedCopyButton>
          </CardTitle>
        </CardHeader>
        <CardContent><Textarea value={output} readOnly className="h-32 bg-background font-mono text-base" /></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">转换统计</CardTitle></CardHeader>
        <CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {statItems.map((item) => <div key={item.label}><p className={`text-2xl font-bold ${item.className}`}>{item.value}</p><p className="text-xs text-muted-foreground">{item.label}</p></div>)}
        </div></CardContent>
      </Card>
    </>
  )
}

interface PinyinHistoryProps {
  history: PinyinHistoryItem[]
}

export function PinyinHistory({ history }: PinyinHistoryProps) {
  if (history.length === 0) return null
  return (
    <div className="space-y-2">
      <Label>最近转换记录</Label>
      <div className="space-y-2">
        {history.map((item, index) => (
          <Card key={index} className="bg-muted/50"><CardContent className="pt-3 pb-3"><div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{item.toneType}</Badge>
              <EnhancedCopyButton text={item.output} variant="ghost" size="icon" iconOnly title="复制历史结果" className="h-8 w-8" />
            </div>
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">{item.input}{item.input.length >= 50 ? '...' : ''}</p>
              <p className="font-mono">{item.output}{item.output.length >= 50 ? '...' : ''}</p>
            </div>
          </div></CardContent></Card>
        ))}
      </div>
    </div>
  )
}
