// 名称: 页脚组件
// 描述: 网站底部区域，展示版权信息、友情链接及技术栈说明
// 路径: Globokit/components/layout/footer.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm font-medium text-gray-900">
              © {currentYear} GloboKit. 为全球贸易赋能
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ by Jensfrank
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
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
            <span className="text-gray-300">|</span>
            <Link
              href="https://seedloc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-gray-900 flex items-center gap-1.5 transition-colors"
            >
              Seedloc 博客
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <span className="text-gray-300">|</span>
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
        
        <div className="mt-8 pt-8 border-t border-gray-200">
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
