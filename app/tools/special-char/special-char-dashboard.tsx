// 名称: 特殊字符统计与历史
// 描述: 展示检查统计和最近五次检查结果
// 路径: Globokit/app/tools/special-char/special-char-dashboard.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { AlertCircle, CheckCircle, FileWarning, Search, Shield, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import type { CheckHistoryItem } from './special-char-data'

export function SpecialCharStats({ history }: { history: CheckHistoryItem[] }) {
  const stats = [
    { label: '检查次数', value: history.length, note: '今日检查', icon: Search },
    { label: '发现问题', value: history.filter((item) => item.hasSpecial).length, note: '包含特殊字符', icon: FileWarning },
    { label: '处理模式', value: '2', note: '种清理方式', icon: Shield },
    { label: '实时检测', value: '支持', note: '即时反馈', icon: Zap },
  ]

  return (
    <div className="grid gap-4 mb-6 md:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center gap-2"><Icon className="h-4 w-4" />{item.label}</CardTitle></CardHeader>
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

export function SpecialCharHistory({ history }: { history: CheckHistoryItem[] }) {
  if (history.length === 0) return null
  return (
    <div className="space-y-2">
      <Label>最近检查记录</Label>
      <div className="space-y-2">
        {history.map((item, index) => (
          <Card key={index} className="bg-muted/50">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.hasSpecial ? <AlertCircle className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-green-600" />}
                  <div>
                    <p className="text-sm font-medium">{item.hasSpecial ? `发现 ${item.charCount} 个特殊字符` : '无特殊字符'}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <Badge variant={item.hasSpecial ? 'destructive' : 'secondary'}>{item.hasSpecial ? '需处理' : '安全'}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
