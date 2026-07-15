// 名称: VPS 计算器页头
// 描述: 展示工具介绍、推荐资源和汇率错误提示
// 路径: Globokit/app/tools/vps-calculator/vps-header.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import Image from 'next/image'
import { AlertTriangle, ExternalLink, Server } from 'lucide-react'

export function VpsHeader({ rateError }: { rateError: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 ring-1 ring-violet-100"><Server className="h-4 w-4" />VPS/站长工具</div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">VPS 剩余价值计算器</h1>
          <p className="mt-2 text-muted-foreground">基于实时汇率与精确到天的时间计算，快速分析服务器残值、期望售价与交易盈亏。</p>
        </div>
        <a href="https://vpsknow.com" target="_blank" rel="noopener noreferrer" className="group flex w-full max-w-sm items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-violet-200 hover:shadow-md hover:shadow-violet-900/5 lg:w-auto">
          <Image src="https://vpsknow.com/favicon.png" alt="VPSKnow Logo" width={44} height={44} className="h-11 w-11 shrink-0 rounded-md border border-slate-100 object-contain" />
          <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700">推荐</span><span className="font-semibold text-gray-900 transition-colors group-hover:text-violet-700">VPSKnow</span></div><p className="mt-1 text-xs leading-5 text-muted-foreground">专业 VPS 评测、全球云服务器与网络工具指南</p></div>
          <ExternalLink className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-violet-600" />
        </a>
      </div>
      {rateError && <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"><AlertTriangle className="h-4 w-4 shrink-0" /><span>实时汇率获取失败，计算结果可能不准确，请稍后刷新重试。</span></div>}
    </>
  )
}
