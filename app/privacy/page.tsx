// 名称: 隐私政策
// 描述: 说明数据本地处理、localStorage 用途与第三方服务
// 路径: Globokit/app/privacy/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { SITE_NAME } from '@/lib/site'

export const metadata: Metadata = {
  title: `隐私政策 - ${SITE_NAME}`,
  description: `${SITE_NAME} 不设账号体系、无后端存储，工具计算全部在浏览器本地完成。本页说明数据存储位置、localStorage 用途与第三方服务清单。`,
  alternates: { canonical: '/privacy' },
}

const STORAGE_KEYS = [
  { key: 'globokit-theme', usage: '记住你选择的日间/夜间主题' },
  { key: 'currencyFavorites', usage: '货币符号页的收藏币种' },
  { key: 'worldTimeFavorites', usage: '世界时间页的收藏城市' },
  { key: 'countryFavorites', usage: '国家信息页的收藏国家' },
]

const THIRD_PARTIES = [
  { service: 'open.er-api.com', usage: 'VPS 计算器与多币种换算器获取实时汇率，请求不携带任何个人数据' },
  { service: 'Google Analytics', usage: '匿名访问统计，用于了解工具使用情况' },
  { service: 'Vercel', usage: '静态站点托管与 CDN 分发' },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
          <ShieldCheck className="h-3.5 w-3.5" />
          隐私政策
        </div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">你的数据只属于你的浏览器</h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
          {SITE_NAME} 是纯前端工具站：没有账号体系、没有后端数据库。你在报价、装柜、发票等工具中输入的一切数据，都只在浏览器内存中参与计算，关闭页面即消失，不会被上传。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">本地存储（localStorage）</h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          为了记住你的偏好设置，站点会在浏览器 localStorage 中保存以下少量非敏感信息。清除浏览器数据即可全部删除：
        </p>
        <div className="overflow-hidden rounded-lg border border-slate-200/80 dark:border-white/10">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                <th className="px-3 py-2 font-medium">键名</th>
                <th className="px-3 py-2 font-medium">用途</th>
              </tr>
            </thead>
            <tbody>
              {STORAGE_KEYS.map((item) => (
                <tr key={item.key} className="border-b last:border-0 dark:border-white/10">
                  <td className="px-3 py-2 font-mono text-xs">{item.key}</td>
                  <td className="px-3 py-2 text-slate-600 dark:text-slate-300">{item.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">第三方服务</h2>
        <ul className="space-y-2">
          {THIRD_PARTIES.map((item) => (
            <li key={item.service} className="rounded-md border border-slate-200/80 bg-white/80 px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/4">
              <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-100">{item.service}</span>
              <span className="mt-1 block text-slate-600 dark:text-slate-300">{item.usage}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">联系方式</h2>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          对本政策或数据处理方式有疑问，请通过 <a href="https://github.com/everett7623/Globokit/issues" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-cyan-300">GitHub Issues</a> 联系我们。政策更新后会在此页面发布并更新日期。
        </p>
        <p className="text-xs text-slate-400">最后更新：2026-10-10</p>
      </section>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        准备好开始了吗？<Link href="/#tools" className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-cyan-300">返回工具目录</Link>。
      </p>
    </div>
  )
}
