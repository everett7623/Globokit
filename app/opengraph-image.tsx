// 名称: 全站默认 Open Graph 分享图
// 描述: 使用 Next.js ImageResponse 生成简洁克制的 1200x630 品牌分享卡片
// 路径: Globokit/app/opengraph-image.tsx
// 作者: everettlabs
// 更新时间: 2026-11-25

import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/site'
import { TOOL_REGISTRY, getActiveCategories } from '@/lib/tools/registry'

export const alt = `${SITE_NAME} - Global Trade Control Desk`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  const toolCount = TOOL_REGISTRY.length
  const categoryCount = getActiveCategories().length

  return new ImageResponse(
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
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
            GLOBAL TRADE TOOLKIT
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, lineHeight: 1.15, color: '#0f172a' }}>
            {`${toolCount} Free Trade Tools`}
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#475569', lineHeight: 1.4 }}>
            Quoting · Container Loading · Trade Docs · Payments · World Info
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
          <span>{`${categoryCount} Workflows · 100% Browser-Local & Free`}</span>
          <span style={{ fontWeight: 700, color: '#0f766e' }}>globokit.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
