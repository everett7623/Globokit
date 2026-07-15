// 名称: 数字转英文信息面板
// 描述: 展示统计、示例、使用场景和单位对照
// 路径: Globokit/app/tools/number-to-english/number-english-info.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Calculator, Hash, Info, Type, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NUMBER_EXAMPLES } from './number-english-data'

export function NumberEnglishStats({ historyCount }: { historyCount: number }) {
  const stats = [
    { label: '转换次数', value: historyCount, note: '今日转换', icon: Calculator },
    { label: '支持范围', value: '12位', note: '最大数字', icon: Hash },
    { label: '转换模式', value: '2', note: '种格式', icon: Type },
    { label: '实时转换', value: '支持', note: '即时反馈', icon: Zap },
  ]
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon
        return <Card key={item.label}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{item.value}</div><p className="text-xs text-muted-foreground">{item.note}</p></CardContent></Card>
      })}
    </div>
  )
}

const USAGE = ['支票金额的英文大写', '合同中的数字表述', '正式文件的数字说明', '英文邮件中的数字表达', '财务报表的英文版本', '国际贸易单据填写']
const NOTES = ['基数词用于表示数量', '序数词用于表示顺序或排名', '英式英语在百位后通常加“and”', '支持0-999,999,999,999的数字']
const UNITS = [
  ['1-19', 'one, two, three...'], ['20-90', 'twenty, thirty, forty...'], ['100', 'hundred'], ['1,000', 'thousand'],
  ['1,000,000', 'million'], ['1,000,000,000', 'billion'], ['序数词后缀', '-st, -nd, -rd, -th'], ['特殊序数', 'first, second, third'],
]

export function NumberEnglishInfo() {
  return (
    <>
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card className="bg-muted/50">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />常见示例</CardTitle></CardHeader>
          <CardContent><div className="space-y-3">
            {NUMBER_EXAMPLES.map((example) => (
              <div key={example.num} className="space-y-1 p-3 rounded bg-background">
                <div className="font-mono font-semibold">{example.num}</div>
                <div className="text-sm space-y-1"><div><span className="text-muted-foreground">基数：</span><span className="ml-2">{example.cardinal}</span></div><div><span className="text-muted-foreground">序数：</span><span className="ml-2">{example.ordinal}</span></div></div>
              </div>
            ))}
          </div></CardContent>
        </Card>
        <div className="space-y-4">
          <InfoList title="使用场景" items={USAGE} />
          <InfoList title="注意事项" items={NOTES} />
        </div>
      </div>
      <Card className="mt-4 bg-muted/50">
        <CardHeader><CardTitle className="text-lg">英文数字单位对照表</CardTitle></CardHeader>
        <CardContent><div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {UNITS.map(([unit, english]) => <div key={unit}><p className="font-medium">{unit}</p><p className="text-muted-foreground">{english}</p></div>)}
        </div></CardContent>
      </Card>
    </>
  )
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="bg-muted/50">
      <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">{items.map((item) => <p key={item}>• {item}</p>)}</CardContent>
    </Card>
  )
}
