'use client'

// 名称: 全局错误边界
// 描述: 渲染期错误的中文兜底界面，提供重试入口并记录错误摘要
// 路径: Globokit/app/error.tsx
// 作者: everettlabs
// 更新时间: 2026-09-29

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 保留错误摘要，便于在浏览器控制台定位真实来源
    console.error('页面渲染失败：' + error.message)
  }, [error])

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">页面加载出错</h1>
      <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        这个工具页在渲染时遇到问题。可以先重试，或者返回首页换一个工具。
      </p>
      {error.digest ? (
        <p className="font-mono text-xs text-slate-400 dark:text-slate-500">错误编号 {error.digest}</p>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()}>重试</Button>
        <Button variant="outline" asChild>
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </div>
  )
}
