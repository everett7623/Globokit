// 路径: seedtool/app/page.tsx
// 更新时间: 2025-07-22
// 说明: 优化布局，保留导航栏和外部链接

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Compass,
  Github,
  Menu,
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react'

const tools = [
  {
    title: '人民币大写转换',
    description: '将数字金额转换为中文大写形式，适用于发票、合同等正式文件',
    icon: Calculator,
    href: '/tools/rmb-converter',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    badge: '热门',
    badgeColor: 'bg-orange-100 text-orange-700'
  },
  {
    title: '英文大小写转换',
    description: '快速转换英文文本的大小写格式，支持多种转换模式',
    icon: Type,
    href: '/tools/text-case',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    title: '特殊字符检查与转换',
    description: '检查并转换文本中的特殊字符，避免邮件或文档中的乱码',
    icon: AlertCircle,
    href: '/tools/special-char',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  },
  {
    title: '数字转英文',
    description: '将数字转换为英文表达形式，支持基数词和序数词',
    icon: Hash,
    href: '/tools/number-to-english',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    title: '中文转拼音',
    description: '将中文文本转换为汉语拼音，支持声调和多种格式',
    icon: Languages,
    href: '/tools/pinyin',
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  },
  {
    title: '国际节假日查询',
    description: '查询全球主要贸易国家的节假日安排，便于外贸业务安排',
    icon: Calendar,
    href: '/tools/holiday-query',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    badge: '新增',
    badgeColor: 'bg-green-100 text-green-700'
  },
  {
    title: '世界时间',
    description: '查看全球主要贸易城市的实时时间，便于安排国际业务',
    icon: Clock,
    href: '/tools/world-time',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    badge: '新增',
    badgeColor: 'bg-green-100 text-green-700'
  },
  {
    title: '全球货币符号大全',
    description: '查看和复制全球各国货币符号，便于外贸报价和合同编写',
    icon: CircleDollarSign,
    href: '/tools/currency-symbols',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    badge: '新增',
    badgeColor: 'bg-green-100 text-green-700'
  }
]

const stats = [
  { label: '工具总数', value: '8+', icon: Zap },
  { label: '月活用户', value: '1000+', icon: Users },
  { label: '持续更新', value: '每周', icon: TrendingUp },
  { label: '用户好评', value: '98%', icon: Sparkles }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 头部区域 - 增强视觉效果 */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            专为外贸人打造的效率工具
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            外贸实用工具集
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            精选8款专业工具，涵盖文本处理、时间管理、货币转换等外贸场景
            <br />让国际贸易更简单，让工作效率更高效
          </p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                <Icon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
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
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Card>
              </Link>
            )
          })}
        </div>

        {/* 关于区域 */}
        <div id="about" className="mt-20 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  关于 SeedTool
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  SeedTool 是专为外贸从业者打造的在线工具平台，我们深知外贸工作中的各种痛点，
                  因此精心开发了这些实用工具。无论是人民币大写转换、文本处理，还是进行货币符号查询等等，
                  我们都为您提供了简单高效的解决方案。
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    href="https://github.com/everett7623/seedtool" 
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
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <p className="text-blue-700 font-medium flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              更多实用工具正在开发中，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
