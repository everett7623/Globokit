// 名称: 页头组件
// 描述: 网站顶部容器，集成Logo与导航栏，支持粘性定位和毛玻璃效果
// 路径: Globokit/components/layout/header.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-12

import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from './navigation'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/70 bg-white/80 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 dark:shadow-black/20">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-95">
          <Image 
            src="/logo.png" 
            alt="Globokit Logo" 
            width={140}
            height={40}
            priority
            className="h-10 w-auto shrink-0 object-contain"
            style={{ width: 'auto', height: '40px' }}
          />
          <span className="hidden rounded-md border border-emerald-200/80 bg-emerald-50/80 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200 xl:inline-flex">
            Trade Desk
          </span>
        </Link>

        <Navigation />
      </div>
    </header>
  )
}
