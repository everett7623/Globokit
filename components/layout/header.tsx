// 名称: 页头组件
// 描述: 网站顶部容器，集成Logo与导航栏，支持粘性定位和毛玻璃效果
// 路径: Globokit/components/layout/header.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-12

import Link from 'next/link'
import Image from 'next/image' // 引入 Image 组件
import { Navigation } from './navigation'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo 区域：替换为图片 */}
        <Link href="/" className="flex items-center mr-6 transition-opacity hover:opacity-90">
          <Image 
            src="/logo.png" 
            alt="Globokit Logo" 
            width={140} // 设置适当的宽度，保持比例
            height={40} // 导航栏高 h-16 (64px)，Logo 设置为 40px 比较协调
            priority    // 关键属性：优先加载 Logo，防止闪烁
            className="h-10 w-auto object-contain" // 确保图片按比例缩放不亦庄
          />
        </Link>
        
        <Navigation />
      </div>
    </header>
  )
}
