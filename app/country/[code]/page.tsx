// 名称: 单国外贸档案静态专题页
// 描述: 聚合单个国家的时差、2026-2027 节假日、货币、电压插头、主要港口与外贸工具互链，含 FAQPage 与 BreadcrumbList JSON-LD
// 路径: Globokit/app/country/[code]/page.tsx
// 作者: everettlabs
// 更新时间: 2026-11-27

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Calendar, ChevronRight, Clock, Globe2, Home, PlugZap, Ship } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  buildCountryFaqs,
  formatBeijingTimeDiff,
  getAllCountryCodes,
  getCountryByCode,
  getCountryFlag,
  getCountryHolidaysForYear,
  getRelatedCountries,
} from '@/lib/country-guide'
import { buildAbsoluteUrl, buildBreadcrumbSchema, serializeJsonLd } from '@/lib/seo-schema'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export const dynamicParams = false

const RECOMMENDED_TOOLS = [
  { href: '/tools/quote-calculator', title: '外贸报价利润计算器', desc: '按 EXW/FOB/CIF/DDP 测算报价与利润' },
  { href: '/tools/holiday-query', title: '全球节假日查询', desc: '对比多国假期，避开客户休假发盘' },
  { href: '/tools/world-time', title: '世界时间换算', desc: '实时核对客户当地时间与沟通窗口' },
  { href: '/tools/currency-converter', title: '多币种报价换算器', desc: '实时交叉汇率与点差试算' },
  { href: '/tools/container-load-calculator', title: '集装箱装柜计算器', desc: '20GP/40GP/40HQ 装箱数与利用率估算' },
  { href: '/tools/voltage-plug-guide', title: '全球电压与插头速查', desc: '核对目标市场插头类型与电压频率' },
] as const

export function generateStaticParams() {
  return getAllCountryCodes().map((code) => ({ code }))
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params
  const country = getCountryByCode(code)
  if (!country) return {}

  const title = `${country.name_cn}（${country.name_en}）外贸资料：节假日、时差、货币与电压插头 | ${SITE_NAME}`
  const description = `${country.name_cn}（${country.iso2}）外贸实用档案：货币 ${country.currency_name_cn}（${country.currency_code}）、区号 ${country.dial_code}、电压 ${country.voltage} / 插头 ${country.power_plug}、时区 ${country.timezone} 及 2026–2027 节假日查询。`
  const path = `/country/${country.iso2.toLowerCase()}`
  const ogImageUrl = buildAbsoluteUrl(`/api/og?country=${country.iso2.toLowerCase()}`)

  return {
    title,
    description,
    keywords: [country.name_cn, country.name_en, `${country.name_cn}节假日`, `${country.name_cn}时差`, `${country.name_cn}电压插头`, `${country.name_cn}货币`, '外贸国家资料'],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: buildAbsoluteUrl(path),
      siteName: SITE_NAME,
      type: 'website',
      locale: 'zh_CN',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImageUrl] },
  }
}

export default async function CountryDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const country = getCountryByCode(code)
  if (!country) notFound()

  const path = `/country/${country.iso2.toLowerCase()}`
  const flag = getCountryFlag(country.iso2)
  const timeDiff = formatBeijingTimeDiff(country.timezone)
  const holidays2026 = getCountryHolidaysForYear(country.iso2, 2026)
  const holidays2027 = getCountryHolidaysForYear(country.iso2, 2027)
  const relatedCountries = getRelatedCountries(country)
  const faqs = buildCountryFaqs(country)

  const structuredData = serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${country.name_cn}（${country.name_en}）外贸资料`,
        url: buildAbsoluteUrl(path),
        inLanguage: 'zh-CN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      buildBreadcrumbSchema([
        { name: '首页', path: '/' },
        { name: '全球国家外贸档案', path: '/country' },
        { name: country.name_cn, path },
      ]),
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  })

  const facts = [
    { label: '官方货币', value: `${country.currency_name_cn} (${country.currency_code} / ${country.currency_symbol})` },
    { label: '国际区号 / 域名', value: `${country.dial_code} · ${country.tld}` },
    { label: '时区与时差', value: `${country.timezone}（${timeDiff}）` },
    { label: '电压与插头', value: `${country.voltage} · ${country.power_plug}` },
    { label: '首都 / 地区', value: `${country.capital_cn} (${country.capital_en}) · ${country.continent_cn}` },
    { label: '常用语言', value: country.language_cn.join('、') || '—' },
  ]

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      <nav aria-label="面包屑导航">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <li><Link href="/" className="inline-flex items-center gap-1 hover:text-emerald-700 dark:hover:text-cyan-200"><Home className="h-3.5 w-3.5" />首页</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-slate-400" /></li>
          <li><Link href="/country" className="hover:text-emerald-700 dark:hover:text-cyan-200">全球国家外贸档案</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-slate-400" /></li>
          <li aria-current="page" className="font-medium text-slate-800 dark:text-slate-200">{country.name_cn}</li>
        </ol>
      </nav>

      <header className="rounded-lg border border-slate-200/80 bg-white/85 p-6 shadow-xs dark:border-white/10 dark:bg-slate-950/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">{country.iso2} / {country.iso3}</Badge>
              <Badge variant="outline" className="text-xs">{country.continent_cn}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {flag} {country.name_cn}外贸实用档案
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              {country.name_en} · 首都 {country.capital_cn} · 驾驶方向：{country.driving_side === 'left' ? '靠左行驶' : '靠右行驶'}
            </p>
          </div>
          <Link href="/tools/global-country-info" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200">
            <Globe2 className="h-4 w-4" />打开国家对比速查
          </Link>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-md border border-slate-200/70 bg-slate-50/75 p-3.5 dark:border-white/10 dark:bg-white/4">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{fact.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200/80 bg-white/85 p-5 dark:border-white/10 dark:bg-slate-950/60">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-950 dark:text-white">
            <Calendar className="h-4 w-4 text-emerald-600 dark:text-cyan-300" />2026 & 2027 公共节假日参考
          </h2>
          {holidays2026.length === 0 && holidays2027.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              暂未收录该国逐日节假日明细，可前往{' '}
              <Link href="/tools/holiday-query" className="font-medium text-emerald-700 hover:underline dark:text-cyan-300">全球节假日查询工具</Link>{' '}
              查看国际与宗教通用节日。
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {[
                { year: 2026, list: holidays2026 },
                { year: 2027, list: holidays2027 },
              ].map(({ year, list }) =>
                list.length > 0 ? (
                  <div key={year}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{year} 年（{list.length} 项）</h3>
                    <ul className="mt-2 divide-y divide-slate-100 text-sm dark:divide-white/10">
                      {list.slice(0, 8).map((holiday) => (
                        <li key={`${year}-${holiday.date}-${holiday.name}`} className="flex items-center justify-between gap-3 py-2">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{holiday.nameCN || holiday.name}</span>
                          <span className="shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">{holiday.date}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200/80 bg-white/85 p-5 dark:border-white/10 dark:bg-slate-950/60">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-950 dark:text-white">
            <Ship className="h-4 w-4 text-emerald-600 dark:text-cyan-300" />外贸港口与商务跟进要点
          </h2>
          {country.major_ports && country.major_ports.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">主要港口</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {country.major_ports.map((port) => (
                  <Badge key={port} variant="outline" className="text-xs">{port}</Badge>
                ))}
              </div>
            </div>
          )}
          {country.business_hours && (
            <p className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <Clock className="h-4 w-4 text-slate-400" />常规工作时间：{country.business_hours}
            </p>
          )}
          {country.trade_notes && country.trade_notes.length > 0 && (
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {country.trade_notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          )}
          <p className="flex items-center gap-2 rounded-md bg-slate-50 p-3 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">
            <PlugZap className="h-4 w-4 shrink-0 text-emerald-600 dark:text-cyan-300" />
            出口带电或家用产品至{country.name_cn}时，请按 {country.voltage} / {country.power_plug} 规格核对电源适配与合规标签。
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">高频外贸配套工具</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDED_TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group rounded-lg border border-slate-200/80 bg-white/85 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-300 dark:border-white/10 dark:bg-white/4 dark:hover:border-cyan-300/50">
              <p className="text-sm font-semibold text-slate-950 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-cyan-200">{tool.title}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tool.desc}</p>
              <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-cyan-300">打开工具<ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{country.name_cn}外贸常见问题</h2>
        <div className="space-y-2.5">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-lg border border-slate-200/80 bg-white/85 p-4 dark:border-white/10 dark:bg-white/4">
              <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{faq.question}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {relatedCountries.length > 0 && (
        <section className="space-y-3 border-t border-slate-200/80 pt-6 dark:border-white/10">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">{country.continent_cn}其他贸易国家档案</h2>
          <div className="flex flex-wrap gap-2">
            {relatedCountries.map((item) => (
              <Link key={item.iso2} href={`/country/${item.iso2.toLowerCase()}`} className="rounded-md border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-cyan-300/50">
                {getCountryFlag(item.iso2)} {item.name_cn} ({item.iso2})
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
