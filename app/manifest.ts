// 名称: Web App Manifest 配置
// 描述: 提供站点 PWA 元信息、主题色与图标声明，增强移动端与浏览器体验
// 路径: Globokit/app/manifest.ts
// 作者: everettlabs
// 更新时间: 2026-11-25

import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/site'
import { TOOL_REGISTRY } from '@/lib/tools/registry'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} - 外贸实用工具集`,
    short_name: SITE_NAME,
    description: `专为外贸从业者打造的在线工具平台，${TOOL_REGISTRY.length} 个免费工具覆盖报价核算、装柜出货、单证制作与全球资料查询，全部在浏览器本地运行。`,
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0d9488',
    lang: 'zh-CN',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
