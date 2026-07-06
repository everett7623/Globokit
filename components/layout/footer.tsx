// 名称: 页脚组件
// 描述: 网站底部区域，展示版权信息、友情链接及技术栈说明
// 路径: Globokit/components/layout/footer.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-08

import Link from 'next/link'
import { Github, ExternalLink, Globe2 } from 'lucide-react'
import { SITE_NAME } from '@/lib/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-auto border-t border-white/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-1 text-center md:text-left">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
              <Globe2 className="h-4 w-4 text-emerald-600 dark:text-cyan-300" />
              © {currentYear} {SITE_NAME}. 为全球贸易赋能
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Built for global trade teams
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:justify-end">
            <Link
              href="https://github.com/everett7623/Globokit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <span className="hidden text-slate-300 dark:text-white/20 sm:inline">|</span>
            <Link
              href="https://seedloc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              Seedloc 博客
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <span className="hidden text-slate-300 dark:text-white/20 sm:inline">|</span>
            <Link
              href="https://vpsknow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              VPSKnow 站点
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
            <span className="hidden text-slate-300 dark:text-white/20 sm:inline">|</span>
            <Link
              href="https://nav.seedloc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              SeedNav 导航
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-200/80 pt-8 dark:border-white/10">
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Powered by{' '}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-emerald-700 dark:hover:text-cyan-200"
            >
              Vercel
            </Link>
            {' '}&{' '}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-emerald-700 dark:hover:text-cyan-200"
            >
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
