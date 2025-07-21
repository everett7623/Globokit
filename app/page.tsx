// 路径: seedtool/app/page.tsx
// 更新时间: 2025-07-21
// 说明: 优化布局，统一样式

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calculator, 
  Type, 
  AlertCircle, 
  Hash, 
  Languages, 
  Calendar,
  Clock,
  CircleDollarSign
} from 'lucide-react'

const tools = [
  {
    title: '人民币大写转换',
    description: '将数字金额转换为中文大写形式，适用于发票、合同等正式文件',
    icon: Calculator,
    href: '/tools/rmb-converter',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
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
    title: '特殊字符检查',
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
    bgColor: 'bg-orange-50'
  },
  {
    title: '世界时间',
    description: '查看全球主要贸易城市的实时时间，便于安排国际业务',
    icon: Clock,
    href: '/tools/world-time',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
  {
    title: '全球货币符号大全',
    description: '查看和复制全球各国货币符号，便于外贸报价和合同编写',
    icon: CircleDollarSign,
    href: '/tools/currency-symbols',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 头部区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">外贸实用工具集</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            为外贸从业者精心打造的专业工具集，提升工作效率，让国际贸易更简单
          </p>
        </div>

        {/* 工具卡片网格 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-gray-200 overflow-hidden">
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
                </Card>
              </Link>
            )
          })}
        </div>

        {/* 底部信息 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-700 font-medium">
              🚀 更多实用工具正在开发中，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
