// 名称: llms-full.txt 完整知识索引路由
// 描述: 为 AI 搜索引擎与大模型提供全站工具的详细场景、关键词与关联链路说明（GEO）
// 路径: Globokit/app/llms-full.txt/route.ts
// 作者: everettlabs
// 更新时间: 2026-11-25

import { SITE_NAME, SITE_URL } from '@/lib/site'
import { TOOL_REGISTRY, getActiveCategories, getToolsByCategory } from '@/lib/tools/registry'

export const dynamic = 'force-static'

function buildLlmsFullTxt(): string {
  const categories = getActiveCategories()
  const grouped = getToolsByCategory()

  const lines: string[] = [
    `# ${SITE_NAME} — 完整工具与场景知识索引`,
    '',
    `> ${SITE_NAME} (${SITE_URL}) 是面向外贸业务员、跟单、采购与跨境卖家的免费在线工具平台。共 ${TOOL_REGISTRY.length} 个工具，覆盖报价核算、装柜估算、海空运与快递比价、单证生成、收款风控与全球资料查询，全部在浏览器本地运行。`,
    '',
    '## 站点核心特征',
    '',
    '- 免费与开放: 全部工具免费、免注册、无次数限制，基于 Next.js 开源（GPL-3.0）。',
    '- 数据安全: 纯前端本地计算，报价、发票、装箱单与客户明细不上传任何服务器。',
    '- 离线友好: 除实时汇率接口（open.er-api.com，失败自动回退内置参考汇率）外，其余工具离线可用。',
    `- 精简索引: ${SITE_URL}/llms.txt`,
    `- 站点地图: ${SITE_URL}/sitemap.xml`,
  ]

  for (const category of categories) {
    const tools = grouped[category]
    lines.push('', `## 分类：${category}（${tools.length} 个工具）`)

    for (const tool of tools) {
      lines.push('', `### ${tool.title}`)
      lines.push(`- URL: ${SITE_URL}${tool.href}`)
      lines.push(`- 简介: ${tool.seoDescription ?? tool.description}`)
      if (tool.useCases?.length) {
        lines.push(`- 适用场景: ${tool.useCases.join('、')}`)
      }
      if (tool.keywords?.length) {
        lines.push(`- 关键词: ${tool.keywords.join(', ')}`)
      }
      if (tool.relatedTools?.length) {
        const relatedLinks = tool.relatedTools
          .map((id) => TOOL_REGISTRY.find((item) => item.id === id))
          .filter(Boolean)
          .map((item) => `${item!.title} (${SITE_URL}${item!.href})`)
        if (relatedLinks.length) {
          lines.push(`- 关联工具: ${relatedLinks.join('；')}`)
        }
      }
      lines.push(`- 更新日期: ${tool.updatedAt}`)
    }
  }

  return `${lines.join('\n')}\n`
}

export function GET(): Response {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
