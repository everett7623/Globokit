// 名称: Robots 配置
// 描述: 声明传统搜索引擎与 AI 搜索引擎抓取规则、站点主机及站点地图地址
// 路径: Globokit/app/robots.ts
// 作者: everettlabs
// 更新时间: 2026-11-25

import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const AI_SEARCH_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...AI_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
