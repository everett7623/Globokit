// 名称: 拼音工具信息面板
// 描述: 展示统计、功能场景与声调格式对比
// 路径: Globokit/app/tools/pinyin/pinyin-info.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Globe, Hash, Info, Type, Zap } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PinyinStats({ historyCount }: { historyCount: number }) {
  const stats = [
    { label: '转换次数', value: historyCount, note: '今日转换', icon: Type },
    { label: '声调格式', value: '3', note: '种模式', icon: Globe },
    { label: '识别准确', value: '高', note: '准确率', icon: Hash },
    { label: '高性能', value: '支持', note: '大量文本', icon: Zap },
  ]
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-4">{stats.map((item) => {
      const Icon = item.icon
      return <Card key={item.label}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{item.value}</div><p className="text-xs text-muted-foreground">{item.note}</p></CardContent></Card>
    })}</div>
  )
}

const INFO_GROUPS = [
  { title: '功能特点', items: ['使用专业的 pinyin-pro 库，识别准确率高', '支持多种声调格式（符号、数字、无声调）', '自动处理多音字，选择最常用读音', '保留英文、数字和标点符号', '支持完整的中文字符集，包括生僻字', '高性能转换，可处理大量文本'] },
  { title: '使用场景', items: ['中文学习和教学材料制作', '拼音输入法词库生成', '中文内容国际化处理', '语音合成前处理', 'SEO优化URL生成', '数据库拼音索引建立'] },
]
const TONE_COMPARISONS = [
  ['无声调', 'ni hao shi jie', '适合：URL、文件名'],
  ['符号声调', 'nǐ hǎo shì jiè', '适合：教学材料、出版物'],
  ['数字声调', 'ni3 hao3 shi4 jie4', '适合：输入法、数据处理'],
]

export function PinyinInfo() {
  return (
    <>
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        {INFO_GROUPS.map((group) => <Card key={group.title} className="bg-muted/50"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />{group.title}</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground">{group.items.map((item) => <p key={item}>• {item}</p>)}</CardContent></Card>)}
      </div>
      <Card className="mt-4 bg-muted/50">
        <CardHeader><CardTitle className="text-lg">声调格式对比</CardTitle></CardHeader>
        <CardContent><div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TONE_COMPARISONS.map(([title, example, note]) => <div key={title} className="text-center p-4 rounded bg-background"><p className="font-medium mb-2">{title}</p><p className="font-mono text-lg">{example}</p><p className="text-xs text-muted-foreground mt-2">{note}</p></div>)}
          </div>
          <Alert><AlertDescription>原文：你好世界 - 不同的声调格式适用于不同的使用场景</AlertDescription></Alert>
        </div></CardContent>
      </Card>
    </>
  )
}
