// 名称: 页脚组件
// 描述: 网站底部区域，展示版权信息、友情链接及技术栈说明
// 路径: Globokit/components/layout/footer.tsx
// 作者: everettlabs
// 更新时间: 2026-01-08

import Link from 'next/link'
import { ExternalLink, Globe2, PackageCheck } from 'lucide-react'
import { SITE_NAME } from '@/lib/site'

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-auto border-t border-white/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
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
              href="/resources"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              <PackageCheck className="h-4 w-4" />
              业务资源
            </Link>
            <span className="hidden text-slate-300 dark:text-white/20 sm:inline">|</span>
            <Link
              href="/about"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              关于
            </Link>
            <span className="hidden text-slate-300 dark:text-white/20 sm:inline">|</span>
            <Link
              href="/privacy"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              隐私政策
            </Link>
            <span className="hidden text-slate-300 dark:text-white/20 sm:inline">|</span>
            <Link
              href="https://github.com/everett7623/Globokit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-500 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-cyan-200"
            >
              <GithubMark className="h-4 w-4" />
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
