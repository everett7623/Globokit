// 名称: 外贸工具集首页
// 描述: 聚合各类外贸效率工具的导航主页，展示热门工具入口、统计数据及项目介绍
// 路径: Globokit/app/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-07-01

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  Type, 
  AlertCircle, 
  Hash, 
  Languages, 
  Calendar,
  Clock,
  CircleDollarSign,
  ExternalLink,
  BookOpen,
  Github,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Globe,
  Server,
  Code,
  FileSearch,
  Code2,
} from 'lucide-react'
import { TOOL_REGISTRY } from '@/lib/tools/registry'
import { TOOL_UI_CONFIG } from '@/lib/tools/registry-ui'

// Icon mapping for dynamic rendering based on registry iconName
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Type,
  AlertCircle,
  Hash,
  Languages,
  Calendar,
  Clock,
  CircleDollarSign,
  Globe,
  Server,
  FileSearch,
  Code2,
}

const tools = TOOL_REGISTRY.map((tool) => {
  const uiConfig = TOOL_UI_CONFIG[tool.id] || {
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
  }
  const IconComponent = ICON_MAP[tool.iconName] || Code
  
  return {
    title: tool.title,
    description: tool.description,
    icon: IconComponent,
    href: tool.href,
    badge: tool.badge,
    ...uiConfig,
  }
})

// Legacy tools array kept for reference during migration
const legacyTools = []

const stats = [
  { label: '工具总数', value: `${tools.length}+`, icon: Zap },
  { label: '月活用户', value: '1000+', icon: Users },
  { label: '持续更新', value: '每周', icon: TrendingUp },
  { label: '用户好评', value: '98%', icon: Sparkles }
]

export default function HomePage() {
  return (
    <>
      {/* 头部区域 - 增强视觉效果 */}
      <div className="text-center mb-12 pt-16">
        {/* 修改 1: 头部 Banner 徽章 -> Emerald */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          专为外贸人打造的效率工具
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          外贸实用工具集
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          精选{tools.length}款专业工具，涵盖文本处理、时间管理、货币转换与数据处理等外贸场景
          <br />让国际贸易更简单，让工作效率更高效
        </p>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              {/* 修改 2: 统计图标颜色 -> Emerald */}
              <Icon className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* 工具卡片网格 */}
      <div id="tools" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-gray-200 overflow-hidden relative">
                {tool.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${tool.badgeColor} border-0 font-medium`}>
                      {tool.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${tool.bgColor} ${tool.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  {/* 修改: 卡片标题 Hover 颜色 -> Emerald (可选，如果想统一 Hover 色) */}
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {tool.description}
                  </CardDescription>
                </CardContent>
                {/* 修改: 卡片底部条 -> Emerald 渐变 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Card>
            </Link>
          )
        })}
      </div>

      {/* 关于区域 */}
      <div id="about" className="mt-20 mb-12">
        {/* 修改: 关于区域背景 -> Emerald/Teal 极淡渐变 (可选，或者保持原有的蓝紫色调也行，这里我改成极淡的 emerald) */}
        <Card className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-0">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                关于 GloboKit
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                GloboKit 是专为外贸从业者打造的在线工具平台，我们深知外贸工作中的各种痛点，
                因此精心开发了这些实用工具。无论是人民币大写转换、文本处理，还是货币符号查询等等，
                我们都为您提供了简单高效的解决方案。
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="https://github.com/everett7623/globokit" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  开源地址
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link 
                  href="https://seedloc.com" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  访问博客
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部信息 */}
      <div className="text-center py-8">
        {/* 修改 3: 底部 Banner 背景及文字 -> Emerald/Teal */}
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
          <p className="text-emerald-700 font-medium flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            更多实用工具正在开发中，敬请期待...
          </p>
        </div>
      </div>
    </>
  )
}
