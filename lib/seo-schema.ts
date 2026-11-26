// 名称: 全站结构化数据构建工具
// 描述: 集中生成 WebSite、Organization、BreadcrumbList、CollectionPage 等 JSON-LD，兼顾 SEO 与 GEO
// 路径: Globokit/lib/seo-schema.ts
// 作者: everettlabs
// 更新时间: 2026-11-25

import { SITE_NAME, SITE_URL } from '@/lib/site'
import { TOOL_REGISTRY } from '@/lib/tools/registry'

export interface BreadcrumbItem {
  name: string
  path: string
}

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function buildAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: buildAbsoluteUrl('/logo.png'),
    sameAs: ['https://github.com/everett7623/Globokit'],
  }
}

export function buildWebsiteSchema(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: 'Globokit 外贸实用工具集',
    url: SITE_URL,
    inLanguage: 'zh-CN',
    description: `专为外贸从业者打造的免费在线工具平台，收录 ${TOOL_REGISTRY.length} 个纯前端本地计算工具，覆盖报价核算、物流装柜、单证制作、收款催款与全球资料查询。`,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function buildRootGraphSchema(): string {
  return serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationSchema(), buildWebsiteSchema()],
  })
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  }
}

export function buildCollectionPageSchema(options: {
  name: string
  description: string
  path: string
  breadcrumbs: BreadcrumbItem[]
  itemUrls?: Array<{ name: string; path: string }>
}): string {
  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'CollectionPage',
      name: options.name,
      description: options.description,
      url: buildAbsoluteUrl(options.path),
      inLanguage: 'zh-CN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      ...(options.itemUrls?.length
        ? {
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: options.itemUrls.length,
              itemListElement: options.itemUrls.map((entry, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: entry.name,
                url: buildAbsoluteUrl(entry.path),
              })),
            },
          }
        : {}),
    },
    buildBreadcrumbSchema(options.breadcrumbs),
  ]

  return serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': graph,
  })
}

export function buildAboutPageSchema(options: {
  name: string
  description: string
  path: string
  breadcrumbs: BreadcrumbItem[]
}): string {
  return serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: options.name,
        description: options.description,
        url: buildAbsoluteUrl(options.path),
        inLanguage: 'zh-CN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${SITE_URL}/#organization` },
      },
      buildBreadcrumbSchema(options.breadcrumbs),
    ],
  })
}
