// 名称: 页脚组件
// 描述: 网站底部区域，展示版权信息、友情链接及技术栈说明
// 路径: Globokit/components/layout/footer.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'
import { SITE_NAME } from '@/lib/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm font-medium text-gray-900">
              © {currentYear} {SITE_NAME}. 为全球贸易赋能
            </p>
            <p className="text-xs text-muted-foreground">
              Built by Jensfrank
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:justify-end">
            <Link
              href="https://github.com/everett7623/Globokit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gray-900 flex items-center gap-1.5 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <span className="hidden text-gray-300 sm:inline">|</span>
            <Link
              href="https://seedloc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gray-900 flex items-center gap-1.5 transition-colors"
            >
              Seedloc 博客
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <span className="hidden text-gray-300 sm:inline">|</span>
            <Link
              href="https://vpsknow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gray-900 flex items-center gap-1.5 transition-colors"
            >
              VPSKnow 站点
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <span className="hidden text-gray-300 sm:inline">|</span>
            <Link
              href="https://nav.seedloc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gray-900 flex items-center gap-1.5 transition-colors"
            >
              SeedNav 导航
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            Powered by{' '}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-gray-900 transition-colors"
            >
              Vercel
            </Link>
            {' '}&{' '}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-gray-900 transition-colors"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
