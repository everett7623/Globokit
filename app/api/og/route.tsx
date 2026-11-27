// 名称: 工具专属动态 Open Graph 分享图路由
// 描述: 根据 slug 参数生成 1200x630 工具专属分享卡片，零外部字体依赖、支持 CDN 缓存
// 路径: Globokit/app/api/og/route.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { SITE_NAME } from '@/lib/site'
import { getToolBySlug, TOOL_REGISTRY, type ToolCategory } from '@/lib/tools/registry'

const CATEGORY_EN_MAP: Record<ToolCategory, string> = {
  财务报价: 'QUOTING & FINANCE',
  物流与装柜: 'LOGISTICS & LOADING',
  外贸沟通: 'TRADE COMMUNICATION',
  时间与节假日: 'TIME & HOLIDAYS',
  国家与货币: 'COUNTRIES & CURRENCIES',
  文件与格式转换: 'FILES & FORMATS',
  文本处理: 'TEXT UTILITIES',
  'VPS/站长工具': 'VPS & WEBMASTER',
}

const UPPERCASE_TOKENS = new Set(['rmb', 'lc', 'fx', 'vps', 'csv', 'json', 'yaml', 'fob', 'cif', 'ddp'])

function formatSlugTitle(slug: string): string {
  return slug
    .split('-')
    .map((part) => {
      if (UPPERCASE_TOKENS.has(part)) return part.toUpperCase()
      if (part === 'to') return 'to'
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join(' ')
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')?.trim() ?? ''
  const tool = slug ? getToolBySlug(slug) : undefined

  const categoryLabel = tool ? CATEGORY_EN_MAP[tool.category] : 'GLOBAL TRADE TOOLKIT'
  const headline = tool ? formatSlugTitle(tool.slug) : `${TOOL_REGISTRY.length} Free Trade Tools`
  const routePath = tool ? `globokit.com${tool.href}` : 'globokit.com'
  const subtitle = tool
    ? `Free online trade utility · Updated ${tool.updatedAt} · Runs 100% locally in your browser`
    : 'Quoting · Container Loading · Trade Docs · Payments · World Info'

  const response = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#f8fafc',
          color: '#0f172a',
          fontFamily: 'sans-serif',
          border: '16px solid #0d9488',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background: '#0d9488',
              }}
            />
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: '0.04em' }}>
              {SITE_NAME}
            </span>
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#0f766e',
              background: '#ccfbf1',
              padding: '8px 18px',
              borderRadius: '8px',
            }}
          >
            {categoryLabel}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: headline.length > 26 ? 52 : 62,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#0f172a',
            }}
          >
            {headline}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#475569', lineHeight: 1.4 }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #e2e8f0',
            paddingTop: '28px',
            fontSize: 22,
            color: '#475569',
          }}
        >
          <span>100% Browser-Local · Free · No Sign-up</span>
          <span style={{ fontWeight: 700, color: '#0f766e' }}>{routePath}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )

  response.headers.set(
    'Cache-Control',
    'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
  )

  return response
}
