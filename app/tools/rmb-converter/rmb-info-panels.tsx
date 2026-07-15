// 名称: 人民币转换信息面板
// 描述: 展示转换统计、示例和使用说明
// 路径: Globokit/app/tools/rmb-converter/rmb-info-panels.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Calculator, Info, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RmbStats({ historyCount }: { historyCount: number }) {
  return (
    <div className="grid gap-4 mb-6 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            今日转换
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{historyCount}</div>
          <p className="text-xs text-muted-foreground">次转换记录</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            支持范围
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">千万亿</div>
          <p className="text-xs text-muted-foreground">最大金额单位</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Info className="h-4 w-4" />
            精确度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0.01</div>
          <p className="text-xs text-muted-foreground">支持到分</p>
        </CardContent>
      </Card>
    </div>
  )
}

const EXAMPLES = [
  ['123.45', '人民币壹佰贰拾叁元肆角伍分'],
  ['10000', '人民币壹万元整'],
  ['50000.5', '人民币伍万元伍角'],
  ['999999.99', '人民币玖拾玖万玖仟玖佰玖拾玖元玖角玖分'],
]

export function RmbReference() {
  return (
    <div className="grid gap-4 mt-6 md:grid-cols-2">
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            转换示例
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2 text-sm">
            {EXAMPLES.map(([amount, result]) => (
              <div key={amount} className="flex items-center justify-between p-2 rounded bg-background">
                <span className="font-mono">{amount}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-right flex-1 ml-2">{result}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• 支持小数点后两位（角、分）</p>
          <p>• 最大支持千万亿级别的金额</p>
          <p>• 自动添加“人民币”前缀和“元整”或“元X角X分”后缀</p>
          <p>• 符合财务规范的大写格式</p>
          <p>• 适用于支票、发票、合同等正式财务文件</p>
          <p>• 转换结果可直接复制使用</p>
        </CardContent>
      </Card>
    </div>
  )
}
