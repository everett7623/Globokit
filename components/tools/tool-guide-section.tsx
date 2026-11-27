// 名称: 工具页使用说明与适用场景区块
// 描述: 基于工具注册表元数据在服务端统一渲染适用场景、检索关键词与本地计算说明，提升内容深度与 SEO/GEO 可读性
// 路径: Globokit/components/tools/tool-guide-section.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

import Link from 'next/link'
import { CalendarClock, CheckCircle2, FolderKanban, ShieldCheck } from 'lucide-react'
import type { ToolMeta } from '@/lib/tools/registry'

interface ToolGuideSectionProps {
  tool: ToolMeta
}

export function ToolGuideSection({ tool }: ToolGuideSectionProps) {
  const summary = tool.seoDescription ?? tool.description
  const useCases = tool.useCases ?? []
  const keywords = tool.keywords ?? []

  return (
    <section
      aria-labelledby="tool-guide-heading"
      className="mt-10 rounded-lg border border-slate-200/80 bg-white/80 p-5 shadow-xs dark:border-white/10 dark:bg-slate-950/55 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-4 dark:border-white/10">
        <div>
          <h2
            id="tool-guide-heading"
            className="text-base font-semibold text-slate-950 dark:text-white"
          >
            关于「{tool.title}」
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            工具适用场景、本地运行说明与所属业务分类
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <Link
            href={`/tools#${encodeURIComponent(tool.category)}`}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-300/50 dark:hover:text-cyan-200"
          >
            <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{tool.category}</span>
          </Link>
          <span className="inline-flex items-center gap-1">
            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>更新于 {tool.updatedAt}</span>
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
        {summary}
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {useCases.length > 0 && (
          <div className="rounded-md border border-slate-200/70 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              典型适用场景
            </h3>
            <ul className="mt-2.5 space-y-2">
              {useCases.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-cyan-300"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-md border border-slate-200/70 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            隐私与计算说明
          </h3>
          <p className="mt-2.5 flex items-start gap-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
            <ShieldCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-cyan-300"
              aria-hidden="true"
            />
            <span>
              本工具采用纯前端本地架构，免注册、无使用次数限制。你输入的报价、参数与明细均在浏览器本地完成运算，不会上传至任何服务器。
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <Link
              href="/faq"
              className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-cyan-300"
            >
              查看常见问题
            </Link>
            <Link
              href="/privacy"
              className="font-medium text-slate-600 underline-offset-4 hover:underline dark:text-slate-400"
            >
              了解隐私政策
            </Link>
          </div>
        </div>
      </div>

      {keywords.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">常见检索词：</span>
          {keywords.map((keyword) => (
            <Link
              key={keyword}
              href={`/tools?q=${encodeURIComponent(keyword)}`}
              className="rounded border border-slate-200/80 bg-white px-2 py-0.5 text-xs text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-cyan-300/50 dark:hover:text-cyan-200"
            >
              {keyword}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
