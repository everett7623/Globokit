// 名称: 工具页 SEO 与结构化数据工厂
// 描述: 为每个工具路由统一生成 Metadata（含 OG/Twitter）与 WebApplication + BreadcrumbList JSON-LD
// 路径: Globokit/lib/tools/tool-seo.tsx
// 作者: everettlabs
// 更新时间: 2026-11-25

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ToolGuideSection } from '@/components/tools/tool-guide-section'
import { buildAbsoluteUrl, buildBreadcrumbSchema, serializeJsonLd } from '@/lib/seo-schema'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { getToolBySlug } from './registry'

function getRegisteredTool(slug: string) {
  const tool = getToolBySlug(slug)
  if (!tool) throw new Error(`Unknown tool slug: ${slug}`)
  return tool
}

export function createToolMetadata(slug: string): Metadata {
  const tool = getRegisteredTool(slug)
  const title = tool.seoTitle ?? `${tool.title} | ${SITE_NAME}`
  const description = tool.seoDescription ?? tool.description
  const url = buildAbsoluteUrl(tool.href)
  const ogImageUrl = buildAbsoluteUrl(`/api/og?slug=${encodeURIComponent(tool.slug)}`)

  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'zh_CN',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export function createToolLayout(slug: string) {
  const tool = getRegisteredTool(slug)
  const description = tool.seoDescription ?? tool.description
  const url = buildAbsoluteUrl(tool.href)
  const structuredData = serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: tool.title,
        alternateName: tool.shortTitle,
        description,
        url,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: tool.category,
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Runs locally in modern browsers.',
        inLanguage: 'zh-CN',
        dateModified: tool.updatedAt,
        ...(tool.keywords?.length ? { keywords: tool.keywords.join(', ') } : {}),
        ...(tool.useCases?.length ? { featureList: tool.useCases } : {}),
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY',
        },
      },
      buildBreadcrumbSchema([
        { name: '首页', path: '/' },
        { name: '全部工具', path: '/tools' },
        { name: tool.category, path: `/tools#${encodeURIComponent(tool.category)}` },
        { name: tool.title, path: tool.href },
      ]),
    ],
  })

  return function ToolRouteLayout({ children }: { children: ReactNode }) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
        {children}
        <ToolGuideSection tool={tool} />
      </>
    )
  }
}
