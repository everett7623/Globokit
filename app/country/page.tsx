// 名称: 全球国家外贸档案索引页
// 描述: 按大洲索引 171 个国家/地区的外贸基础资料、节假日、货币与电压插头专题页
// 路径: Globokit/app/country/page.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getAllCountries, getCountriesGroupedByContinent, getCountryFlag } from '@/lib/country-guide'
import { buildAbsoluteUrl, buildCollectionPageSchema } from '@/lib/seo-schema'
import { SITE_NAME } from '@/lib/site'

const countries = getAllCountries()
const groups = getCountriesGroupedByContinent()

const pageTitle = `全球 ${countries.length} 国外贸档案 - 节假日、时差、货币与电压插头 | ${SITE_NAME}`
const pageDescription = `汇总全球 ${countries.length} 个国家与地区的外贸实用档案，涵盖 2026–2027 公共节假日、北京时差、货币符号、国际区号、电压插头与主要港口。`

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/country' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: buildAbsoluteUrl('/country'),
    siteName: SITE_NAME,
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: buildAbsoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: pageTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [buildAbsoluteUrl('/opengraph-image')],
  },
}

export default function CountryDirectoryPage() {
  const structuredData = buildCollectionPageSchema({
    name: pageTitle,
    description: pageDescription,
    path: '/country',
    breadcrumbs: [
      { name: '首页', path: '/' },
      { name: '全球国家外贸档案', path: '/country' },
    ],
    itemUrls: countries.map((country) => ({
      name: `${country.name_cn}（${country.name_en}）外贸资料`,
      path: `/country/${country.iso2.toLowerCase()}`,
    })),
  })

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
          <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
          全球市场资料库
        </div>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">
            全球 {countries.length} 国外贸档案
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            点击任意国家查看 2026–2027 公共节假日、与北京时差、货币符号、国际区号、电压插头与商务注意事项。也支持在{' '}
            <Link href="/tools/global-country-info" className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-cyan-300">
              国家信息速查工具
            </Link>{' '}
            中按关键词筛选。
          </p>
        </div>

        <nav aria-label="按大洲跳转" className="flex flex-wrap gap-2">
          {groups.map(({ continent, countries: list }) => (
            <a
              key={continent}
              href={`#${encodeURIComponent(continent)}`}
              className="rounded-md border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-300/50 dark:hover:text-cyan-200"
            >
              {continent} · {list.length}
            </a>
          ))}
        </nav>
      </header>

      <div className="space-y-8">
        {groups.map(({ continent, countries: list }) => (
          <section key={continent} id={encodeURIComponent(continent)} className="scroll-mt-24 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{continent}</h2>
              <Badge variant="outline" className="border-slate-200 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                {list.length} 个国家/地区
              </Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((country) => (
                <Link
                  key={country.iso2}
                  href={`/country/${country.iso2.toLowerCase()}`}
                  className="group rounded-lg border border-slate-200/80 bg-white/85 p-3.5 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/4 dark:hover:border-cyan-300/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">
                      {getCountryFlag(country.iso2)} {country.name_cn}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-slate-400">{country.iso2}</span>
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{country.name_en}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{country.currency_code} ({country.currency_symbol})</span>
                    <span>·</span>
                    <span>{country.dial_code}</span>
                    <span>·</span>
                    <span>{country.voltage}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
