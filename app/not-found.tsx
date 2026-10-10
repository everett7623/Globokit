// 名称: 404 页面
// 描述: 全站中文 404 兜底页，提供工具目录与首页出口，禁止搜索引擎索引
// 路径: Globokit/app/not-found.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'

export const metadata: Metadata = {
  title: '页面不存在 - Globokit',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-300/10">
        <Compass className="h-8 w-8 text-amber-600 dark:text-amber-300" />
      </div>
      <p className="mt-6 font-mono text-sm font-semibold text-slate-400">404</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">这个页面不存在或已迁移</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        链接可能有误，或工具已更名。全部工具都在目录里，按业务流程找一遍即可。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/#tools" className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-50">
          打开工具目录<ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/" className="inline-flex h-10 items-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200">
          返回首页
        </Link>
      </div>
    </div>
  )
}
