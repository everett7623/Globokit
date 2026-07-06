// 名称: 工具卡片组件
// 描述: 首页及列表页使用的工具入口卡片，展示图标、标题、描述及跳转按钮
// 路径: Globokit/components/tools/tool-card.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, LucideIcon } from 'lucide-react'

interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color?: string
}

export function ToolCard({ title, description, icon: Icon, href, color = 'text-primary' }: ToolCardProps) {
  return (
    <Card className="group h-full overflow-hidden rounded-lg border-slate-200/80 bg-white/80 shadow-sm shadow-slate-900/[0.04] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/[0.06] dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-cyan-300/50">
      <CardHeader>
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 ring-1 ring-emerald-200/70 dark:bg-cyan-300/10 dark:ring-cyan-300/15">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <CardTitle className="text-lg text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2 leading-6 dark:text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button className="w-full" variant="outline">
            开始使用
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
