import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  Type, 
  AlertCircle, 
  Hash, 
  Languages,
  Globe,
  ArrowRight 
} from 'lucide-react'

const tools = [
  {
    title: '人民币大写转换',
    description: '将数字金额转换为中文大写格式',
    icon: DollarSign,
    href: '/tools/rmb-converter',
    color: 'text-green-600',
  },
  {
    title: '英文大小写转换',
    description: '快速转换英文文本的大小写格式',
    icon: Type,
    href: '/tools/text-case',
    color: 'text-blue-600',
  },
  {
    title: '特殊字符检查',
    description: '检查并转换文本中的特殊字符',
    icon: AlertCircle,
    href: '/tools/special-char',
    color: 'text-orange-600',
  },
  {
    title: '数字转英文',
    description: '将数字转换为英文表达形式',
    icon: Hash,
    href: '/tools/number-to-english',
    color: 'text-purple-600',
  },
  {
    title: '中文转拼音',
    description: '将中文文本转换为拼音',
    icon: Languages,
    href: '/tools/pinyin',
    color: 'text-red-600',
  },
  {
    title: '国际节假日查询',
    description: '查询全球主要贸易国家的节假日安排',
    icon: Globe,
    href: '/tools/holiday-query',
    color: 'text-indigo-600',
  },
]

export default function Home() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
          SeedTool 外贸工具集
        </h1>
        <p className="text-lg text-muted-foreground">
          专为外贸人打造的实用工具集，提高工作效率，简化日常操作
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Card key={tool.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-6 w-6 ${tool.color}`} />
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={tool.href}>
                  <Button className="w-full" variant="default">
                    开始使用
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
