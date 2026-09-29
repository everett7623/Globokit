// 名称: 404 页面
// 描述: 未匹配路由的中文提示页，提供返回首页与高频工具入口
// 路径: Globokit/app/not-found.tsx
// 作者: everettlabs
// 更新时间: 2026-09-29

import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '页面不存在 - Globokit',
  description: '你访问的页面不存在或已被移动，可从首页或工具目录重新进入。',
  robots: { index: false, follow: false },
}

const QUICK_LINKS = [
  { href: '/tools/yaml-json-converter', label: 'YAML 与 JSON 互转' },
  { href: '/tools/remittance-cost-calculator', label: '国际收款渠道费用对比' },
  { href: '/tools/inquiry-priority-scorer', label: '外贸询盘优先级评估' },
  { href: '/tools/server-cost-comparison', label: '服务器成本对比' },
]

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-16 text-center">
      <p className="font-mono text-6xl font-semibold text-slate-300 dark:text-slate-700">404</p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">这个页面不存在</h1>
      <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        链接可能已经失效或输入有误。可以回到首页，或直接从下面的高频工具继续。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">返回首页</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/#tools">浏览全部工具</Link>
        </Button>
      </div>
      <div className="mt-4 grid w-full gap-2 sm:grid-cols-2">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
