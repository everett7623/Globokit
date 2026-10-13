// 名称: 全局错误边界
// 描述: 客户端渲染异常时展示中文兜底界面，支持重试并输出错误编号便于排查
// 路径: Globokit/app/error.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, ShieldAlert } from 'lucide-react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // digest 由 Next 注入且服务端/客户端一致，避免随机编号造成 hydration mismatch
  const errorNo = error.digest || 'CLIENT-ERROR'

  useEffect(() => {
    console.error(`[Globokit ${errorNo}]`, error)
  }, [error, errorNo])

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-300/10">
        <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-300" />
      </div>
      <p className="mt-6 font-mono text-sm font-semibold text-slate-400">错误编号 {errorNo}</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">页面出了点问题</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        工具的计算都在本地进行，你的输入数据不会丢失到别处。可以重试一次，若反复出现请通过 GitHub Issues 反馈并附上错误编号。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-50"
        >
          <RefreshCw className="h-4 w-4" />重试
        </button>
        <Link href="/" className="inline-flex h-10 items-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200">
          返回首页
        </Link>
      </div>
    </div>
  )
}
