'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tools = [
  { href: '/', label: '首页' },
  { href: '/tools/rmb-converter', label: '人民币大写' },
  { href: '/tools/text-case', label: '大小写转换' },
  { href: '/tools/special-char', label: '特殊字符' },
  { href: '/tools/number-to-english', label: '数字转英文' },
  { href: '/tools/pinyin', label: '中文转拼音' },
  { href: '/tools/holiday-query', label: '国际节假日查询' },
  { href: '/tools/world-time', label: '世界时间' },
  { href: '/tools/currency-symbols', label: '全球货币符号大全' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="ml-auto flex items-center space-x-4">
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === tool.href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {tool.label}
        </Link>
      ))}
  {/* 右侧外部链接 */}
      <div className="flex items-center gap-3">
        <Link 
          href="https://seedloc.com" 
          target="_blank"
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
        >
          <BookOpen className="h-4 w-4" />
          博客
          <ExternalLink className="h-3 w-3" />
        </Link>
        <Link 
          href="https://nav.seedloc.com" 
          target="_blank"
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg transition-all shadow-sm hover:shadow-md"
        >
          <Compass className="h-4 w-4" />
          导航站
          <ExternalLink className="h-3 w-3" />
        </Link>
        
        {/* 移动端菜单按钮 */}
        <button className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  )
}
