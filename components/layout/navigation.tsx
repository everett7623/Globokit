'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tools = [
  { href: '/tools/rmb-converter', label: '人民币大写' },
  { href: '/tools/text-case', label: '大小写转换' },
  { href: '/tools/special-char', label: '特殊字符' },
  { href: '/tools/number-to-english', label: '数字转英文' },
  { href: '/tools/pinyin', label: '中文转拼音' },
  { href: '/tools/holiday-query', label: '国际节假日查询' },
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
    </nav>
  )
}
