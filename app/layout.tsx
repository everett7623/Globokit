// 路径: Globokit/app/layout.tsx
// 更新时间: 2025-09-01
// 说明: 根布局文件，包含全站通用的头部和底部

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Globokit - 外贸实用工具集',
  description: '专为外贸从业者打造的在线工具平台，提供人民币大写转换、文本处理、货币符号查询等实用工具',
  keywords: '外贸工具,人民币大写,英文大小写,特殊字符,数字转英文,中文拼音,国际节假日,世界时间,货币符号',
  authors: [{ name: 'Jensfrank' }],
  openGraph: {
    title: 'SeedTool - 外贸实用工具集',
    description: '专为外贸从业者打造的在线工具平台',
    url: 'https://Globokit.com',
    siteName: 'Globokit',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JCBDVN470N"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JCBDVN470N');
</script>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
