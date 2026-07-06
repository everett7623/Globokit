// 名称: 全局根布局
// 描述: 定义全站基础结构，包含SEO元数据、字体配置、Google Analytics统计及通用页头页脚
// 路径: Globokit/app/layout.tsx
// 作者: Jensfrank
// 更新时间: 2026-01-12

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/components/theme/theme-provider'
import Script from 'next/script'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Globokit - 外贸实用工具集',
  description: '专为外贸从业者打造的在线工具平台，提供外贸报价利润计算、人民币大写转换、文本处理、货币符号查询等实用工具',
  keywords: '外贸工具,外贸报价,利润计算,人民币大写,英文大小写,特殊字符,数字转英文,中文拼音,国际节假日,世界时间,货币符号',
  authors: [{ name: 'Jensfrank' }],
  openGraph: {
    title: 'Globokit - 外贸实用工具集',
    description: '专为外贸从业者打造的在线工具平台',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  // 使用 PNG 图标，保持桌面与移动端显示一致
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('globokit-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : (prefersDark ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.style.colorScheme = theme;
                } catch (error) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JCBDVN470N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JCBDVN470N');
          `}
        </Script>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef7f4_42%,#ffffff_100%)] pt-[72px] text-slate-950 dark:bg-[linear-gradient(180deg,#020617_0%,#0b1220_48%,#07111d_100%)] dark:text-slate-50">
            <div className="pointer-events-none fixed inset-0 z-0 opacity-70 dark:opacity-40 trade-grid-bg" />
            <Header />
            <main className="relative z-10 mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-8 md:py-10">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
