import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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
  const url = new URL(tool.href, SITE_URL).toString()

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
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export function createToolLayout(slug: string) {
  const tool = getRegisteredTool(slug)
  const description = tool.seoDescription ?? tool.description
  const url = new URL(tool.href, SITE_URL).toString()
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
  }).replace(/</g, '\\u003c')

  return function ToolRouteLayout({ children }: { children: ReactNode }) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
        {children}
      </>
    )
  }
}
