// 路径: seedtool/app/page.tsx
// 更新时间: 2025-07-19
// 说明: 添加了世界时间工具

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
    description: '将数字金额转换为中文大写形式',
    icon: Calculator,
    href: '/tools/rmb-converter',
    color: 'text-blue-500'
  },
  {
    title: '英文大小写转换',
    description: '快速转换英文文本的大小写格式',
    icon: Type,
    href: '/tools/text-case',
    color: 'text-green-500'
  },
  {
    title: '特殊字符检查',
    description: '检查并转换文本中的特殊字符',
    icon: AlertCircle,
    href: '/tools/special-char',
    color: 'text-yellow-500'
  },
  {
    title: '数字转英文',
    description: '将数字转换为英文表达形式',
    icon: Hash,
    href: '/tools/number-to-english',
    color: 'text-purple-500'
  },
  {
    title: '中文转拼音',
    description: '将中文文本转换为汉语拼音',
    icon: Languages,
    href: '/tools/pinyin',
    color: 'text-red-500'
  },
  {
    title: '国际节假日查询',
    description: '查询全球主要贸易国家的节假日安排',
    icon: Calendar,
    href: '/tools/holiday-query',
    color: 'text-orange-500'
  },
  {
    title: '世界时间',
    description: '查看全球主要贸易城市的实时时间',
    icon: Clock,
    href: '/tools/world-time',
    color: 'text-indigo-500'
  },
  {
    title: '全球货币符号大全',
    description: '查看和复制全球各国货币符号',
    icon: CircleDollarSign,
    href: '/tools/currency-symbols',
    color: 'text-emerald-500'
  }
]

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">外贸实用工具集</h1>
        <p className="text-xl text-muted-foreground">
          为外贸从业者提供的专业工具，提升工作效率
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-background ${tool.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="mt-12 text-center text-muted-foreground">
        <p>更多实用工具正在开发中...</p>
      </div>
    </div>
  )
}
