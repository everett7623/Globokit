// 名称: Robots 配置
// 描述: 声明搜索引擎抓取规则与站点地图地址
// 路径: Globokit/app/robots.ts
// 作者: everettlabs
// 更新时间: 2026-07-06

import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
