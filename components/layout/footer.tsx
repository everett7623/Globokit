// 路径: Globokit/components/layout/footer.tsx
// 更新时间: 2025-09-01
// 说明: 优化页脚组件

import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2025 Globokit. 为全球贸易赋能
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with ❤️ by Jensfrank
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="https://github.com/everett7623/Globokit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-3 w-3" />
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="https://seedloc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              Seedloc 博客
              <ExternalLink className="h-3 w-3" />
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="https://nav.seedloc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              SeedNav 导航
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-xs text-muted-foreground">
            Powered by{' '}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Vercel
            </Link>
            {' '}& {' '}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
