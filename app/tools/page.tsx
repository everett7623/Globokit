// 名称: 工具总目录页
// 描述: 独立索引页，按业务分类展示全部工具及其用途说明，含 CollectionPage 结构化数据、分类锚点与 ?q= 实时搜索
// 路径: Globokit/app/tools/page.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ToolsDirectoryClient } from '@/components/tools/tools-directory-client'
import { buildAbsoluteUrl, buildCollectionPageSchema } from '@/lib/seo-schema'
import { SITE_NAME } from '@/lib/site'
import { HOME_ACTIVE_CATEGORIES, HOME_TOOLS } from '@/components/home/home-data'

const toolsTitle = `全部工具目录 - ${HOME_TOOLS.length} 个外贸实用工具 | ${SITE_NAME}`
const toolsDescription = `${SITE_NAME} 共 ${HOME_TOOLS.length} 个外贸工具，覆盖财务报价、物流装柜、外贸沟通、单证制作、国家资料等 ${HOME_ACTIVE_CATEGORIES.length} 大业务分类，全部免费且在浏览器本地运行。`

export const metadata: Metadata = {
  title: toolsTitle,
  description: toolsDescription,
  alternates: { canonical: '/tools' },
  openGraph: {
    title: toolsTitle,
    description: toolsDescription,
    url: buildAbsoluteUrl('/tools'),
    siteName: SITE_NAME,
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: buildAbsoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: toolsTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: toolsTitle,
    description: toolsDescription,
    images: [buildAbsoluteUrl('/opengraph-image')],
  },
}

export default function ToolsIndexPage() {
  const structuredData = buildCollectionPageSchema({
    name: toolsTitle,
    description: toolsDescription,
    path: '/tools',
    breadcrumbs: [
      { name: '首页', path: '/' },
      { name: '全部工具目录', path: '/tools' },
    ],
    itemUrls: HOME_TOOLS.map((tool) => ({ name: tool.title, path: tool.href })),
  })

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">全部工具目录</h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {HOME_TOOLS.length} 个工具按外贸业务流分为 {HOME_ACTIVE_CATEGORIES.length} 类：从客户报价、装柜出货，到收款催款、单证制作。全部工具免费、免注册，计算在浏览器本地完成。
        </p>
      </header>

      <Suspense
        fallback={
          <div className="rounded-lg border border-slate-200/80 bg-white/80 p-6 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-400">
            正在加载全部 {HOME_TOOLS.length} 个外贸工具目录…
          </div>
        }
      >
        <ToolsDirectoryClient />
      </Suspense>

      <div className="flex justify-center">
        <Link
          href="/resources"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/15 dark:text-slate-200 dark:hover:border-cyan-300/50"
        >
          配套业务资源
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
