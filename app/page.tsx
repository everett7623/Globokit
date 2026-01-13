// 名称: 首页组件
// 描述: 展示核心工具卡片、统计数据及平台介绍
// 路径: Globokit/app/page.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-12

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calculator, 
  Type, 
  AlertCircle, 
  Languages, 
  FileText, 
  CalendarDays, 
  Clock, 
  Coins, 
  Globe2, 
  Server,
  Zap,
  Users,
  TrendingUp,
  Sparkles,
  Github,
  BookOpen
} from 'lucide-react'

// 工具列表配置
const tools = [
  {
    href: '/tools/rmb-converter',
    title: '人民币大写转换',
    description: '将数字金额转换为中文大写形式，适用于发票、合同等正式文件',
    icon: Calculator,
    badge: '热门',
    color: 'text-blue-500' // 保持原有图标色或改为 emerald
  },
  {
    href: '/tools/text-case',
    title: '英文大小写转换',
    description: '快速转换英文文本的大小写格式，支持多种转换模式',
    icon: Type,
    color: 'text-green-500'
  },
  {
    href: '/tools/special-char',
    title: '特殊字符检查与转换',
    description: '检查并转换文本中的特殊字符，避免邮件或文档中的乱码',
    icon: AlertCircle,
    color: 'text-yellow-500'
  },
  {
    href: '/tools/number-to-english',
    title: '数字转英文',
    description: '将数字转换为英文表达形式，支持基数词和序数词',
    icon: Languages,
    color: 'text-purple-500'
  },
  {
    href: '/tools/pinyin',
    title: '中文转拼音',
    description: '将中文文本转换为汉语拼音，支持声调和多种格式',
    icon: FileText,
    color: 'text-red-500'
  },
  {
    href: '/tools/holiday-query',
    title: '国际节假日查询',
    description: '查询全球主要贸易国家的节假日安排，便于外贸业务安排',
    icon: CalendarDays,
    color: 'text-orange-500'
  },
  {
    href: '/tools/world-time',
    title: '世界时间',
    description: '查看全球主要贸易城市的实时时间，便于安排国际业务',
    icon: Clock,
    color: 'text-indigo-500'
  },
  {
    href: '/tools/currency-symbols',
    title: '全球货币符号大全',
    description: '查看和复制全球各国货币符号，便于外贸报价和合同编写',
    icon: Coins,
    color: 'text-emerald-500'
  },
  {
    href: '/tools/global-country-info',
    title: '全球国家信息查询',
    description: '查询世界各国的中英文名称、区号、代码、时区、域名等信息',
    icon: Globe2,
    color: 'text-cyan-500'
  },
  {
    href: '/tools/vps-calculator',
    title: 'VPS剩余价值计算器',
    description: '基于购买日期和到期时间精确计算VPS剩余价值，支持多币种转换',
    icon: Server,
    badge: '新增',
    color: 'text-violet-500'
  }
]

// 统计数据
const stats = [
  { label: '工具总数', value: '10+', icon: Zap },
  { label: '月活跃用户', value: '1000+', icon: Users },
  { label: '持续更新', value: '每周', icon: TrendingUp },
  { label: '用户好评', value: '98%', icon: Sparkles },
]

export default function Home() {
  return (
    <div className="space-y-12 py-8">
      
      {/* Hero 区域 */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium animate-in fade-in zoom-in duration-500">
          <Sparkles className="h-3.5 w-3.5" />
          <span>专为外贸人打造的效率工具</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          外贸实用工具集
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          精选10款专业工具，涵盖文本处理、时间管理、货币转换等外贸场景<br className="hidden sm:inline" />
          让国际贸易更简单，让工作效率更高效
        </p>
      </section>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm bg-white/50 hover:bg-white transition-colors">
            <div className="p-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-2.5 bg-emerald-50 rounded-full text-emerald-600 mb-1">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* 工具网格 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group block h-full">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-slate-200/60 hover:border-emerald-200 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2.5 rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors ${tool.color.replace('text-', 'text-slate-500 group-hover:text-')}`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  {tool.badge && (
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                      tool.badge === '热门' 
                        ? 'bg-orange-50 text-orange-600' 
                        : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {tool.badge}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-emerald-700 transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2 leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* 底部关于区域 */}
      <section className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 sm:p-12 text-center space-y-8 border border-slate-100 shadow-sm">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">关于 GloboKit</h2>
          <p className="text-slate-600 leading-relaxed">
            GloboKit 是专为外贸从业者打造的在线工具平台，我们深知外贸工作中的各种痛点，因此精心开发了这些实用工具。无论是人民币大写转换、文本处理，还是货币符号查询等等，我们都为您提供了简单高效的解决方案。
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" className="h-11 px-8 shadow-md bg-slate-900 hover:bg-slate-800" asChild>
            <Link href="https://github.com/everett7623/Globokit" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              开源地址
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-11 px-8 border-slate-200 hover:bg-white hover:text-emerald-700" asChild>
            <Link href="https://seedloc.com" target="_blank">
              <BookOpen className="mr-2 h-4 w-4" />
              访问博客
            </Link>
          </Button>
        </div>
      </section>

      {/* 底部 Banner */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-4 text-center border border-emerald-100/50">
        <p className="text-sm font-medium text-emerald-700 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" />
          更多实用工具正在开发中，敬请期待...
        </p>
      </div>

    </div>
  )
}
