// 名称: 页头组件
// 描述: 网站顶部容器，集成Logo与导航栏，支持粘性定位和毛玻璃效果
// 路径: Globokit/components/layout/header.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

import Link from 'next/link'
import { Navigation } from './navigation'
import { Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6 transition-opacity hover:opacity-90">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            GloboKit
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  )
}
