import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'  // 这一行必须存在！
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SeedTool - 外贸实用工具集',
  description: '提供人民币大写转换、英文大小写转换、特殊字符检查、数字转英文、中文转拼音等实用工具',
  keywords: '外贸工具,人民币大写,大小写转换,特殊字符,数字转英文,中文拼音',
  authors: [{ name: 'Jensfrank' }],
  creator: 'Jensfrank',
  publisher: 'Jensfrank',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'SeedTool - 外贸实用工具集',
    description: '提供人民币大写转换、英文大小写转换、特殊字符检查、数字转英文、中文转拼音等实用工具',
    url: 'https://seedtool.vercel.app',
    siteName: 'SeedTool',
    locale: 'zh_CN',
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
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
