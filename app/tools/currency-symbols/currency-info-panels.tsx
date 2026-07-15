// 名称: 货币信息面板
// 描述: 展示货币统计、示例与使用说明
// 路径: Globokit/app/tools/currency-symbols/currency-info-panels.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { CircleDollarSign, Info, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CurrencyStatsProps {
  totalCount: number
  popularCount: number
  tradingCount: number
  favoriteCount: number
}

export function CurrencyStats(props: CurrencyStatsProps) {
  const stats = [
    { label: '货币总数', value: props.totalCount, note: '种货币', icon: CircleDollarSign },
    { label: '主要货币', value: props.popularCount, note: '种常用', icon: TrendingUp },
    { label: '贸易货币', value: props.tradingCount, note: '种重点结算', icon: Star },
    { label: '已收藏', value: props.favoriteCount, note: '种货币', icon: Star },
  ]

  return (
    <div className="grid gap-4 mb-6 md:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const CURRENCY_EXAMPLES = [
  ['USD ($)', '$1,234.56'],
  ['EUR (€)', '€1.234,56'],
  ['CNY (¥)', '¥1,234.56'],
  ['GBP (£)', '£1,234.56'],
]

export function CurrencyReference() {
  return (
    <div className="grid gap-4 mt-6 md:grid-cols-2">
      <Card className="bg-muted/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />常用货币示例</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2 text-sm">
            {CURRENCY_EXAMPLES.map(([code, example]) => (
              <div key={code} className="flex items-center justify-between p-2 rounded bg-background">
                <span className="font-mono">{code}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-right flex-1 ml-2">{example}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-muted/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Info className="h-5 w-5" />使用说明</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 点击“复制符号”可快速复制货币符号到剪贴板</p>
          <p>• 点击“复制代码”可复制ISO 4217标准货币代码</p>
          <p>• 蓝色“常用”标签表示国际贸易中的主要结算货币</p>
          <p>• 绿色“贸易”标签表示重要的国际贸易货币</p>
          <p>• 收藏常用货币方便快速查找和使用</p>
          <p>• 在合同中建议同时标注货币符号和代码，如：$100 USD</p>
        </CardContent>
      </Card>
    </div>
  )
}
