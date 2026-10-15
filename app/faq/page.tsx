// 名称: 常见问题页
// 描述: 站点使用与外贸工具场景的高频问答，含 FAQPage 结构化数据
// 路径: Globokit/app/faq/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-12

import type { Metadata } from 'next'
import Link from 'next/link'
import { CircleQuestionMark } from 'lucide-react'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: `常见问题 FAQ - ${SITE_NAME} 外贸工具站`,
  description: `${SITE_NAME} 常见问题：工具是否免费、数据是否安全、报价与装柜怎么算、信用证工具怎么用、能否离线使用等高频问答。`,
  alternates: { canonical: '/faq' },
}

const FAQS: Array<{ question: string; answer: string; href?: string; hrefLabel?: string }> = [
  {
    question: 'Globokit 的工具收费吗？需要注册吗？',
    answer: '全部工具免费、免注册、无使用次数限制。站点没有账号体系，打开即用。',
  },
  {
    question: '我填写的报价、发票、客户信息会被上传吗？',
    answer: '不会。全站是纯前端架构，报价、装柜、发票等所有计算都在你的浏览器里完成，没有后端数据库，关闭页面数据即消失。仅主题偏好和收藏等少量设置会保存在浏览器本地（localStorage），可在隐私政策页查看完整清单。',
    href: '/privacy',
    hrefLabel: '查看隐私政策',
  },
  {
    question: 'FOB 报价怎么换算成 CIF？保险费算在谁头上？',
    answer: '使用出口货物保险费计算器：输入 FOB 金额与海运费，按公式 CIF = (FOB + 运费) ÷ (1 − 投保加成 × 总费率) 自动换算，并按 110% 投保加成计算保费。FOB 条件下保费由卖方另行承担，CIF 条件下保费已含在货价中。',
    href: '/tools/cargo-insurance-calculator',
    hrefLabel: '打开保险费计算器',
  },
  {
    question: '装柜计算器支持哪些柜型？能算混装吗？',
    answer: '支持 20GP、40GP、40HQ、45HQ 常见柜型，按纸箱尺寸与毛重估算装载数量、柜数与利用率。多个不同箱规建议先用纸箱包装方案对比工具比较方案，再进装柜计算器核算整柜。',
    href: '/tools/container-load-calculator',
    hrefLabel: '打开装柜计算器',
  },
  {
    question: '远期信用证承兑后想提前回款，贴现划不划算怎么判断？',
    answer: '用信用证远期贴现计算器：输入面值、远期天数、贴现率与承兑费，得到到手净额与实际年化成本，并与即期收款净额对比。经验法则是：贵司自有资金成本低于显示的年化成本时，持有到期更划算。',
    href: '/tools/lc-discount-calculator',
    hrefLabel: '打开贴现计算器',
  },
  {
    question: '出货要准备哪些单证？站内能做哪些？',
    answer: '常规出货三件套：商业发票（CI）、装箱单（PL）、外箱唛头，站内三个生成器都有，风格统一、可打印导出 PDF。信用证收汇场景再加一步交单自查清单，核对 27 项常见不符点。',
    href: '/tools/invoice-generator',
    hrefLabel: '查看发票生成器',
  },
  {
    question: '客户逾期不付款，催款邮件怎么写才不失分寸？',
    answer: '催款邮件生成器按逾期天数分四档：1–3 天友好对账、4–10 天首次正式催款、11–21 天二次严肃、22 天以上最后通牒。每档都有可直接发送的英文全文与注意事项，避免一上来就撕破脸。',
    href: '/tools/payment-reminder-generator',
    hrefLabel: '打开催款邮件生成器',
  },
  {
    question: '生成的装箱单能直接给 Excel 用吗？',
    answer: '可以。装箱单生成器支持从 Excel 直接粘贴批量导入明细，也支持导出带 BOM 的 CSV 文件（Excel 打开中文不乱码），并可打印导出 PDF。填写内容会自动保存为浏览器本地草稿。',
    href: '/tools/packing-list-generator',
    hrefLabel: '打开装箱单生成器',
  },
  {
    question: '汇率数据从哪来？可以离线使用吗？',
    answer: '多币种换算器与 VPS 计算器的汇率来自 open.er-api.com 公开接口（每小时更新），获取失败会自动降级为内置参考汇率并明确标注。除汇率外的所有工具完全离线可用。',
    href: '/tools/currency-converter',
    hrefLabel: '打开多币种换算器',
  },
  {
    question: '出口退税到底能退多少？',
    answer: '出口退税计算器内置「13% 征 13% 退」「13% 征 9% 退」等常用组合，按含税/未税采购口径拆分进项税与退税额，并结合 FOB 收入测算退税后利润。具体退税率以产品 HS 编码对应的最税则为准。',
    href: '/tools/export-tax-rebate-calculator',
    hrefLabel: '打开退税计算器',
  },
  {
    question: '新客户要求货到付款，怎么判断收款方式的风险？',
    answer: '收款方式风险速查把 T/T、信用证、D/P、D/A、O/A 等方式按风险等级与适用场景做了对比，并给出防坑要点。经验顺序：新客户优先前 T/T 或即期信用证；D/A 与 O/A 属于赊销，务必投保出口信用保险。',
    href: '/tools/payment-risk-guide',
    hrefLabel: '打开收款风险速查',
  },
  {
    question: '产品图太大发不了邮件，怎么压到目标体积？',
    answer: '产品图片压缩工具在浏览器本地批量压缩（最多 20 张），可设最大边长、质量与输出格式（JPEG/WebP/PNG），处理完直接下载，图片不会上传到任何服务器。',
    href: '/tools/image-compressor',
    hrefLabel: '打开图片压缩工具',
  },
  {
    question: '站点开源吗？可以自己部署吗？',
    answer: '开源，GPL-3.0 协议，基于 Next.js 构建，README 提供一键部署到 Vercel 的按钮。发现计算错误或想提需求，欢迎在 GitHub Issues 反馈。',
    href: '/about',
    hrefLabel: '了解关于页',
  },
  {
    question: '手机上能用吗？',
    answer: '全部工具针对移动端做了布局与触控优化（44px 最小触控区、防横向溢出），并纳入每次发布的自动化浏览器验证。',
  },
]

export default function FaqPage() {
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }).replace(/</g, '\\u003c')

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-200">
          <CircleQuestionMark className="h-3.5 w-3.5" />
          常见问题
        </div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">高频问题一览</h1>
        <p className="text-base leading-7 text-muted-foreground">
          关于 {SITE_NAME} 的使用方式、数据安全与典型外贸场景的工具选择。没有找到答案？欢迎在 GitHub Issues 提问。
        </p>
      </header>

      <div className="space-y-3">
        {FAQS.map((faq, index) => (
          <details key={faq.question} className="group rounded-lg border border-slate-200/80 bg-white/85 open:shadow-md open:shadow-slate-900/5 dark:border-white/10 dark:bg-white/4" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold text-slate-950 dark:text-white">
              {faq.question}
              <span className="text-slate-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="border-t border-slate-100 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
              {faq.answer}
              {faq.href && (
                <Link href={faq.href} className="mt-2 inline-flex items-center gap-1 font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-cyan-300">
                  {faq.hrefLabel} →
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        准备好开始了吗？<Link href="/tools" className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-cyan-300">浏览全部工具目录</Link>。
      </p>
    </div>
  )
}
