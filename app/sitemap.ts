// 名称: 站点地图
// 描述: 基于工具注册表生成首页与工具页 sitemap
// 路径: Globokit/app/sitemap.ts
// 作者: Jensfrank
// 更新时间: 2026-07-06

import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { TOOL_REGISTRY } from '@/lib/tools/registry'

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestToolDate = TOOL_REGISTRY.reduce(
    (latest, tool) => (tool.updatedAt > latest ? tool.updatedAt : latest),
    '2026-01-01'
  )

  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(latestToolDate),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...TOOL_REGISTRY.map((tool) => ({
      url: absoluteUrl(tool.href),
      lastModified: new Date(tool.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: tool.badge === '热门' ? 0.9 : 0.8,
    })),
  ]
}
