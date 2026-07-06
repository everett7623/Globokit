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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/[0.02] backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center transition-opacity hover:opacity-90">
          <Image 
            src="/logo.png" 
            alt="Globokit Logo" 
            width={140}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>
        
        <Navigation />
      </div>
    </header>
  )
}
