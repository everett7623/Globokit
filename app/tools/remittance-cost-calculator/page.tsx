// 名称: 国际收款渠道费用对比工具页面
// 描述: 按订单金额、汇率与资金成本比较电汇、信用证、托收与第三方渠道的到手金额与总成本
// 路径: Globokit/app/tools/remittance-cost-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-18

'use client'

import { useMemo, useState } from 'react'
import { BadgeCheck, CircleDollarSign, Clock3, Landmark, RotateCcw, TrendingDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { FormattedInput } from '@/components/ui/formatted-input'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { MobileButtonGroup, MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import { REMITTANCE_CHANNELS, calculateRemittance, type RemittanceChannelId } from '@/lib/tools/remittance-cost-calculator'
import {
  DEFAULT_REMITTANCE_FORM,
  REMITTANCE_CURRENCIES,
  REMITTANCE_PRESETS,
  REMITTANCE_SETTLEMENT_CURRENCIES,
  buildRemittanceSummary,
  formatDays,
  formatMoney,
  formatPercent,
  toNumber,
  type RemittanceFormState,
} from './remittance-page-data'

interface AmountFieldProps {
  id: string
  label: string
  suffix: string
  value: string
  onChange: (value: string) => void
  integer?: boolean
}

function AmountField({ id, label, suffix, value, onChange, integer = false }: AmountFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <FormattedInput
          id={id}
          value={value}
          onChange={onChange}
          format={integer ? 'number' : 'decimal'}
          maxDecimals={integer ? 0 : 4}
          className="h-11 pr-16 font-medium"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">{suffix}</span>
      </div>
    </div>
  )
}

export default function RemittanceCostCalculatorPage() {
  const [form, setForm] = useState<RemittanceFormState>(DEFAULT_REMITTANCE_FORM)

  const update = <Key extends keyof RemittanceFormState>(key: Key, value: RemittanceFormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const toggleChannel = (id: RemittanceChannelId) => {
    setForm((current) => ({
      ...current,
      channelIds: current.channelIds.includes(id)
        ? current.channelIds.filter((item) => item !== id)
        : [...current.channelIds, id],
    }))
  }

  const calculation = useMemo(() => {
    try {
      return {
        result: calculateRemittance({
          orderAmount: toNumber(form.orderAmount),
          currency: form.currency,
          exchangeRate: toNumber(form.exchangeRate),
          settlementCurrency: form.settlementCurrency,
          annualFundingRatePercent: toNumber(form.annualFundingRatePercent),
          sellerPaysFee: form.sellerPaysFee,
          channelIds: form.channelIds,
        }),
        error: '',
      }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '收款渠道无法计算，请检查输入' }
    }
  }, [form])

  const summaryText = useMemo(
    () => (calculation.result ? buildRemittanceSummary(calculation.result) : ''),
    [calculation.result]
  )

  const best = calculation.result?.channels.find((channel) => channel.id === calculation.result?.bestChannelId)
  const fastest = calculation.result?.channels.find((channel) => channel.id === calculation.result?.fastestChannelId)

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">国际收款渠道费用对比</h1>
        <p className="text-muted-foreground">
          按订单金额、结算币种与汇率折算，比较电汇、信用证、托收与第三方渠道的手续费、汇损、资金占用与到手金额。
        </p>
      </div>

      <ScenarioPresets presets={REMITTANCE_PRESETS} onSelect={(values) => setForm((current) => ({ ...current, ...values }))} />

      {calculation.error && (
        <EnhancedAlert
          type="error"
          title="计算错误"
          message={calculation.error}
          action={{ label: '重置', onClick: () => setForm(DEFAULT_REMITTANCE_FORM) }}
          className="mt-6"
        />
      )}

      {calculation.result && best && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardContent className="space-y-1 pt-6">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <BadgeCheck className="h-3.5 w-3.5" />
                推荐渠道
              </p>
              <p className="text-lg font-semibold">{best.name}</p>
              <p className="text-xs text-muted-foreground">{formatDays(best.collectionDays)}到账</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-1 pt-6">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <CircleDollarSign className="h-3.5 w-3.5" />
                最低总成本
              </p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {formatMoney(best.totalCostSettlement, calculation.result.settlementCurrency)}
              </p>
              <p className="text-xs text-muted-foreground">成本率 {formatPercent(best.costRatePercent)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-1 pt-6">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingDown className="h-3.5 w-3.5" />
                渠道差额
              </p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {formatMoney(calculation.result.maxSavingSettlement, calculation.result.settlementCurrency)}
              </p>
              <p className="text-xs text-muted-foreground">最高与最低总成本之差</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-1 pt-6">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5" />
                最快到账
              </p>
              <p className="text-lg font-semibold">{fastest ? fastest.name : '—'}</p>
              <p className="text-xs text-muted-foreground">
                {fastest ? formatDays(fastest.collectionDays) + '，成本率 ' + formatPercent(fastest.costRatePercent) : '—'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Landmark className="h-4 w-4" />
              订单与结算口径
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <AmountField id="orderAmount" label="订单金额" suffix={form.currency} value={form.orderAmount} onChange={(value) => update('orderAmount', value)} />
              <div className="space-y-2">
                <Label htmlFor="currency">支付币种</Label>
                <Select value={form.currency} onValueChange={(value) => update('currency', value)}>
                  <SelectTrigger id="currency" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REMITTANCE_CURRENCIES.map((code) => (
                      <SelectItem key={code} value={code}>{code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AmountField id="exchangeRate" label="折算汇率" suffix={'1 ' + form.currency + ' ='} value={form.exchangeRate} onChange={(value) => update('exchangeRate', value)} />
              <div className="space-y-2">
                <Label htmlFor="settlementCurrency">结算币种</Label>
                <Select value={form.settlementCurrency} onValueChange={(value) => update('settlementCurrency', value)}>
                  <SelectTrigger id="settlementCurrency" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REMITTANCE_SETTLEMENT_CURRENCIES.map((code) => (
                      <SelectItem key={code} value={code}>{code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AmountField id="annualFundingRate" label="资金年化成本" suffix="%" value={form.annualFundingRatePercent} onChange={(value) => update('annualFundingRatePercent', value)} />
              <div className="space-y-2">
                <Label htmlFor="feeBearer">渠道费用承担方</Label>
                <Button
                  id="feeBearer"
                  type="button"
                  variant={form.sellerPaysFee ? 'default' : 'outline'}
                  aria-pressed={form.sellerPaysFee}
                  onClick={() => update('sellerPaysFee', !form.sellerPaysFee)}
                >
                  {form.sellerPaysFee ? '卖方承担（从收款扣除）' : '买方承担（全额到手）'}
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-md border p-4">
              <div>
                <p className="text-sm font-medium">参与对比的渠道</p>
                <p className="text-xs text-muted-foreground">至少保留两个渠道；费率取行业常见区间，可按谈判结果调整后再比</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {REMITTANCE_CHANNELS.map((channel) => {
                  const selected = form.channelIds.includes(channel.id)
                  return (
                    <Button
                      key={channel.id}
                      type="button"
                      size="sm"
                      variant={selected ? 'default' : 'outline'}
                      aria-pressed={selected}
                      title={channel.fit}
                      onClick={() => toggleChannel(channel.id)}
                    >
                      {channel.shortName}
                    </Button>
                  )
                })}
              </div>
              <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                {REMITTANCE_CHANNELS.map((channel) => (
                  <p key={channel.id}>
                    {channel.shortName}：费率 {channel.ratePercent}% + 固定 {channel.fixedFee} + 中段 {channel.midFee}，汇损 {channel.fxLossPercent}%，约 {channel.collectionDays} 天
                  </p>
                ))}
              </div>
            </div>

            <MobileButtonGroup>
              <EnhancedCopyButton text={summaryText} disabled={!summaryText}>复制对比摘要</EnhancedCopyButton>
              <Button type="button" variant="outline" onClick={() => setForm(DEFAULT_REMITTANCE_FORM)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                重置
              </Button>
            </MobileButtonGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">渠道对比结果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {calculation.result && calculation.result.channels.length > 0 ? (
              calculation.result.channels.map((channel) => {
                const isBest = channel.id === calculation.result?.bestChannelId
                return (
                  <div
                    key={channel.id}
                    className={
                      isBest
                        ? 'rounded-md border border-emerald-300 bg-emerald-50/70 p-4 dark:border-cyan-300/30 dark:bg-cyan-300/10'
                        : 'rounded-md border p-4'
                    }
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-base font-semibold">{channel.name}</span>
                      <Badge variant={isBest ? 'default' : 'outline'}>
                        {isBest ? '推荐' : '第 ' + channel.rank + ' 名'}
                      </Badge>
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      <div>
                        <dt className="text-muted-foreground">总成本</dt>
                        <dd className="font-mono font-medium tabular-nums">
                          {formatMoney(channel.totalCostSettlement, calculation.result!.settlementCurrency)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">手续费合计</dt>
                        <dd className="font-mono tabular-nums">
                          {formatMoney(channel.totalFeeSettlement, calculation.result!.settlementCurrency)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">资金占用</dt>
                        <dd className="font-mono tabular-nums">
                          {formatMoney(channel.fundingCostSettlement, calculation.result!.settlementCurrency)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">实际到手</dt>
                        <dd className="font-mono tabular-nums">
                          {formatMoney(channel.netReceiptSettlement, calculation.result!.settlementCurrency)}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>成本率 {formatPercent(channel.costRatePercent)}</span>
                      <span>回款 {formatDays(channel.collectionDays)}</span>
                      <span>{channel.settlement}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                修正参数后查看渠道对比
              </div>
            )}

            <div className="rounded-md bg-muted/30 p-3 text-xs text-muted-foreground">
              <p>口径说明：资金占用成本按订单金额 × 年化成本 × 回款天数 / 365 估算；汇损按订单金额百分比预算。</p>
              <p className="mt-1">贷方费率为常见区间参考值，实际以银行与平台当期价目为准。</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileFriendlyWrapper>
  )
}

