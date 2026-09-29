// 名称: 外贸询盘优先级评估工具页面
// 描述: 按询盘完整度、客户可信度与商务价值打分，输出优先级、回应时限、缺失信息清单与中英文追问话术
// 路径: Globokit/app/tools/inquiry-priority-scorer/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-18

'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Gauge, MessageSquareText, RotateCcw } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { FormattedInput } from '@/components/ui/formatted-input'
import { MobileButtonGroup, MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import type { ScenarioPreset } from '@/components/tools/scenario-presets'
import {
  INQUIRY_CRITERIA,
  buildInquiryFollowUp,
  describeInquiryCadence,
  scoreInquiry,
  type InquiryInputs,
} from '@/lib/tools/inquiry-priority-scorer'

type FlagKey = Exclude<keyof InquiryInputs, 'messageLength' | 'annualVolumeUsd'>

const DEFAULT_FORM: InquiryInputs = {
  hasQuantity: true,
  hasTargetPrice: false,
  hasSpecification: true,
  hasIncoterm: false,
  hasDestination: true,
  hasLeadTime: false,
  hasPaymentTerm: false,
  corporateEmail: true,
  hasCompanyProfile: false,
  specificSku: true,
  comparingSuppliers: true,
  requestedSample: false,
  requestedQuotation: true,
  messageLength: 3,
  existingCustomer: false,
  annualVolumeUsd: 0,
}

const FLAG_LABELS: Record<FlagKey, string> = {
  hasQuantity: '写明采购数量',
  hasTargetPrice: '给出目标价格',
  hasSpecification: '规格或参数完整',
  hasIncoterm: '写明贸易术语',
  hasDestination: '写明目的港或交付地',
  hasLeadTime: '写明期望交期',
  hasPaymentTerm: '写明付款方式',
  corporateEmail: '公司域名邮箱',
  hasCompanyProfile: '附带公司名称与网站',
  specificSku: '指向具体型号',
  comparingSuppliers: '正在比价',
  requestedSample: '索取样品',
  requestedQuotation: '索取正式报价',
  existingCustomer: '老客户或返单',
}

const FLAG_KEYS = Object.keys(FLAG_LABELS) as FlagKey[]

const PRESETS: readonly ScenarioPreset<Partial<InquiryInputs>>[] = [
  {
    label: '高质量询盘',
    description: '型号、数量、目的港齐全，公司邮箱，索取正式报价',
    values: { hasQuantity: true, specificSku: true, hasSpecification: true, hasDestination: true, corporateEmail: true, hasCompanyProfile: true, requestedQuotation: true, messageLength: 4, comparingSuppliers: false, annualVolumeUsd: 60 },
  },
  {
    label: '信息不足询盘',
    description: '只有一个邮箱说“请报价”，需要模板化追问',
    values: { hasQuantity: false, specificSku: false, hasSpecification: false, hasDestination: false, corporateEmail: false, hasCompanyProfile: false, requestedQuotation: false, messageLength: 1, annualVolumeUsd: 0 },
  },
  {
    label: '老客户返单',
    description: '已有合作基础，直接进入报价与排产确认',
    values: { existingCustomer: true, hasQuantity: true, specificSku: true, hasSpecification: true, hasDestination: true, hasIncoterm: true, hasPaymentTerm: true, corporateEmail: true, hasCompanyProfile: true, requestedQuotation: true, messageLength: 5, annualVolumeUsd: 120 },
  },
  {
    label: '比价型询盘',
    description: '多家比价、压价意图明显，需要差异化报价',
    values: { comparingSuppliers: true, hasTargetPrice: true, hasQuantity: true, specificSku: false, hasSpecification: false, corporateEmail: true, messageLength: 3, annualVolumeUsd: 30 },
  },
]

export default function InquiryPriorityScorerPage() {
  const [form, setForm] = useState<InquiryInputs>(DEFAULT_FORM)

  const toggle = (key: FlagKey) => {
    setForm((current) => ({ ...current, [key]: !current[key] }))
  }

  const result = useMemo(() => {
    try {
      return { data: scoreInquiry(form), error: '' }
    } catch (error) {
      return { data: null, error: error instanceof Error ? error.message : '询盘评估失败，请检查输入' }
    }
  }, [form])

  const followUpZh = result.data ? buildInquiryFollowUp(result.data, 'zh') : ''
  const followUpEn = result.data ? buildInquiryFollowUp(result.data, 'en') : ''
  const cadence = result.data ? describeInquiryCadence(result.data.level) : ''

  const levelTone = result.data?.level === 'high'
    ? 'text-emerald-600 dark:text-emerald-400'
    : result.data?.level === 'medium'
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-slate-500 dark:text-slate-300'

  const summaryText = result.data
    ? [
        '询盘优先级评估',
        '总分：' + result.data.total + ' / 100（' + result.data.levelLabel + '）',
        '建议响应：' + result.data.responseWithinHours + ' 小时内首次回复',
        '跟进节奏：' + cadence,
        '规模判断：' + result.data.volumeNote,
        '',
        '已满足：' + (result.data.hits.length > 0 ? result.data.hits.map((item) => item.label).join('、') : '无'),
        '待补齐：' + (result.data.missing.length > 0 ? result.data.missing.map((item) => item.label).join('、') : '无'),
      ].join(String.fromCharCode(10))
    : ''

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">外贸询盘优先级评估</h1>
        <p className="text-muted-foreground">
          按信息完整度、客户可信度与商务价值三项维度打分，判断先回哪一封、还缺哪些信息，并生成可直接粘贴的中英文追问话术。
        </p>
      </div>

      <ScenarioPresets presets={PRESETS} onSelect={(values) => setForm((current) => ({ ...current, ...values }))} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquareText className="h-4 w-4" />
              询盘信息核对
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-2">
              {FLAG_KEYS.map((key) => {
                const active = form[key]
                return (
                  <div key={key} className="flex items-center justify-between gap-3 rounded-md border p-3">
                    <span className="text-sm">{FLAG_LABELS[key]}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant={active ? 'default' : 'outline'}
                      aria-pressed={active}
                      onClick={() => toggle(key)}
                    >
                      {active ? '已满足' : '缺失'}
                    </Button>
                  </div>
                )
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="messageLength">询盘正文段落数</Label>
                <FormattedInput
                  id="messageLength"
                  value={String(form.messageLength)}
                  onChange={(value) => setForm((current) => ({ ...current, messageLength: Number.parseInt(value, 10) || 0 }))}
                  format="number"
                  maxDecimals={0}
                  className="h-11 font-medium"
                />
                <p className="text-xs text-muted-foreground">段落越多说明客户投入越多，最多折算 6 分加分</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="annualVolume">客户年采购规模</Label>
                <div className="relative">
                  <FormattedInput
                    id="annualVolume"
                    value={String(form.annualVolumeUsd)}
                    onChange={(value) => setForm((current) => ({ ...current, annualVolumeUsd: Number.parseFloat(value) || 0 }))}
                    format="decimal"
                    maxDecimals={1}
                    className="h-11 pr-16 font-medium"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">万美元</span>
                </div>
                <p className="text-xs text-muted-foreground">未知填 0，评估结果会提示主动询问年度需求量</p>
              </div>
            </div>

            <MobileButtonGroup>
              <EnhancedCopyButton text={summaryText} disabled={!summaryText}>复制评估摘要</EnhancedCopyButton>
              <Button type="button" variant="outline" onClick={() => setForm(DEFAULT_FORM)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                重置
              </Button>
            </MobileButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gauge className="h-4 w-4" />
              评估结果
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.error && <p className="text-sm text-red-600">{result.error}</p>}
            {result.data && (
              <>
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className={'font-mono text-3xl font-bold tabular-nums ' + levelTone}>{result.data.total}</span>
                    <Badge variant={result.data.level === 'high' ? 'default' : 'outline'}>{result.data.levelLabel}</Badge>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700"
                      style={{ width: result.data.total + '%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    建议 {result.data.responseWithinHours} 小时内首次回复 · {cadence}
                  </p>
                </div>

                <div className="rounded-md border p-3 text-xs text-muted-foreground">{result.data.volumeNote}</div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    已满足信息（{result.data.hits.length} 项）
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.data.hits.length > 0 ? (
                      result.data.hits.map((item) => (
                        <span key={item.id} className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200">
                          {item.label}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">暂无</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    待补齐信息（{result.data.missing.length} 项）
                  </p>
                  {result.data.missing.length > 0 ? (
                    <ul className="space-y-2">
                      {result.data.missing.map((item) => (
                        <li key={item.label} className="rounded-md border border-amber-200 bg-amber-50/60 p-3 text-xs dark:border-amber-300/20 dark:bg-amber-300/10">
                          <p className="font-medium">{item.label}</p>
                          <p className="mt-1 text-muted-foreground">{item.prompt}</p>
                          <p className="mt-1 text-muted-foreground">{item.promptEn}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">信息已齐全，可直接报价</p>
                  )}
                </div>

                <MobileButtonGroup>
                  <EnhancedCopyButton text={followUpZh} variant="outline" disabled={!followUpZh}>复制中文追问</EnhancedCopyButton>
                  <EnhancedCopyButton text={followUpEn} variant="outline" disabled={!followUpEn}>复制英文追问</EnhancedCopyButton>
                </MobileButtonGroup>

                <div className="rounded-md bg-muted/30 p-3 text-xs text-muted-foreground">
                  <p>评分口径：{INQUIRY_CRITERIA.map((item) => item.label + ' ' + item.weight + ' 分').join('、')}，另加最多 6 分篇幅加分。</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileFriendlyWrapper>
  )
}

