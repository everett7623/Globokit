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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`h-6 w-6 ${color}`} />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button className="w-full" variant="default">
            开始使用
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
