// 名称: llms.txt 动态索引路由
// 描述: 面向大模型与 AI 搜索引擎（GEO）生成符合 llmstxt.org 规范的站点精简索引
// 路径: Globokit/app/llms.txt/route.ts
// 作者: everettlabs
// 更新时间: 2026-11-25

import { SITE_NAME, SITE_URL } from '@/lib/site'
import { TOOL_REGISTRY, getActiveCategories, getToolsByCategory } from '@/lib/tools/registry'

export const dynamic = 'force-static'

function buildLlmsTxt(): string {
  const categories = getActiveCategories()
  const grouped = getToolsByCategory()

  const lines: string[] = [
    `# ${SITE_NAME}`,
    '',
    `> 专为外贸与跨境贸易从业者打造的免费在线工具平台，共收录 ${TOOL_REGISTRY.length} 个实用工具，涵盖报价核算、物流装柜、单证制作（商业发票/装箱单/外箱唛头）、收款催款与全球国家/时区/节假日查询。全站纯前端架构，免注册、无后端存储，所有计算均在浏览器本地完成。`,
    '',
    '## 核心信息',
    '',
    `- 官网地址: ${SITE_URL}`,
    `- 工具总数: ${TOOL_REGISTRY.length} 个（覆盖 ${categories.length} 大业务分类）`,
    '- 隐私与运行方式: 纯浏览器本地计算，不上传报价、单证与客户数据；仅极少量偏好与草稿保存在 localStorage',
    '- 开源协议: GPL-3.0-only (https://github.com/everett7623/Globokit)',
    `- 完整工具说明与场景详情: ${SITE_URL}/llms-full.txt`,
    '',
    '## 主要页面',
    '',
    `- [首页与工作台](${SITE_URL}/): 高频外贸入口、业务流导航与工具总览`,
    `- [全部工具目录](${SITE_URL}/tools): 按 ${categories.length} 大业务分类索引全部 ${TOOL_REGISTRY.length} 个工具`,
    `- [全球 171 国外贸档案](${SITE_URL}/country): 单国静态档案页，聚合 2026–2027 节假日、北京时差、货币符号、国际区号与电压插头`,
    `- [常见问题 FAQ](${SITE_URL}/faq): 报价换算、装柜、信用证贴现、单证导出与隐私安全问答`,
    `- [配套业务资源](${SITE_URL}/resources): 精选外贸客户开发、主机建站、域名、账号支付与 AI 服务`,
    `- [关于 ${SITE_NAME}](${SITE_URL}/about): 站点定位、技术架构与开源反馈入口`,
    `- [隐私政策](${SITE_URL}/privacy): 本地存储键名与第三方服务透明清单`,
  ]

  for (const category of categories) {
    lines.push('', `## ${category}`, '')
    for (const tool of grouped[category]) {
      lines.push(`- [${tool.title}](${SITE_URL}${tool.href}): ${tool.description}`)
    }
  }

  return `${lines.join('\n')}\n`
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
