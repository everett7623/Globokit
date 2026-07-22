// 名称: FOB/CIF 货代收费核对工具
// 描述: 按责任边界和用户基准价核对卖方或海外客户货代账单
// 路径: Globokit/app/tools/freight-charge-audit/page.tsx
// 作者: everettlabs
// 更新时间: 2026-07-22

'use client'

import { useMemo, useState } from 'react'
import { FreightAuditControls } from './freight-audit-controls'
import { FreightAuditResults, FreightAuditStats } from './freight-audit-results'
import { FreightAuditTable } from './freight-audit-table'
import { clonePresetLines, copyAuditText, createEmptyLine, formatMoney, FREIGHT_AUDIT_PRESETS, toChargeLines, toNumber, type EditableChargeLine, type FreightAuditPreset } from './freight-audit-page-data'
import { auditFreightCharges, FREIGHT_AUDIT_PARTY_LABELS, type FreightAuditCurrency, type FreightAuditParty, type FreightTradeTerm } from '@/lib/tools/freight-charge-audit'

const DEFAULT_PRESET = FREIGHT_AUDIT_PRESETS[0]

export default function FreightChargeAuditPage() {
  const [term, setTerm] = useState<FreightTradeTerm>(DEFAULT_PRESET.term)
  const [auditParty, setAuditParty] = useState<FreightAuditParty>(DEFAULT_PRESET.auditParty)
  const [currency, setCurrency] = useState<FreightAuditCurrency>(DEFAULT_PRESET.currency)
  const [tolerancePercent, setTolerancePercent] = useState(DEFAULT_PRESET.tolerancePercent)
  const [lines, setLines] = useState<EditableChargeLine[]>(() => clonePresetLines(DEFAULT_PRESET.lines))
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const result = useMemo(() => auditFreightCharges({
    term,
    auditParty,
    currency,
    tolerancePercent: toNumber(tolerancePercent),
    lines: toChargeLines(lines),
  }), [auditParty, currency, lines, term, tolerancePercent])

  const applyPreset = (preset: FreightAuditPreset) => {
    setTerm(preset.term)
    setAuditParty(preset.auditParty)
    setCurrency(preset.currency)
    setTolerancePercent(preset.tolerancePercent)
    setLines(clonePresetLines(preset.lines))
  }

  const changeTerm = (value: FreightTradeTerm) => {
    setTerm(value)
    setAuditParty(value === 'CIF' ? 'buyer' : 'seller')
  }

  const updateLine = (id: string, field: keyof Omit<EditableChargeLine, 'id'>, value: string) => {
    setLines((current) => current.map((line) => line.id === id ? { ...line, [field]: value } : line))
  }

  const copyReview = async () => {
    const issues = result.lines.filter((line) => line.status !== 'normal')
    const detail = issues.length > 0
      ? issues.map((line, index) => `${index + 1}. ${line.name}：${line.statusLabel}；实收 ${formatMoney(line.actual, currency)}；${line.reason}`).join('\n')
      : '当前未发现明显超出责任边界或核价基准的项目。'
    const summary = [
      '你好，请协助复核本票货代账单：',
      `贸易条款：${term}`,
      `核对账单：${FREIGHT_AUDIT_PARTY_LABELS[auditParty]}`,
      `账单合计：${formatMoney(result.actualTotal, currency)}`,
      `重点复核金额：${formatMoney(result.reviewAmount, currency)}`,
      '',
      detail,
      '',
      auditParty === 'buyer'
        ? '请提供目的港代理收费标准和明细，并说明换单、拆箱、仓储等计费依据，便于回复客户。'
        : '请提供对应收费标准、订舱/合同依据及费用明细；如属于买方责任，请说明垫付和回收安排。',
    ].join('\n')
    const success = await copyAuditText(summary)
    setCopyFailed(!success)
    if (!success) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      <div className="mb-8 max-w-4xl"><h1 className="mb-2 text-3xl font-bold">FOB/CIF 货代收费核对</h1><p className="leading-7 text-muted-foreground">核对 FOB 指定货代向卖方收取的起运端费用，也核对 CIF 目的港向海外客户收取的本地费用是否偏高。</p></div>
      <FreightAuditStats result={result} />
      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)]">
        <div className="min-w-0 space-y-6"><FreightAuditControls term={term} auditParty={auditParty} currency={currency} tolerancePercent={tolerancePercent} onTermChange={changeTerm} onAuditPartyChange={setAuditParty} onCurrencyChange={setCurrency} onToleranceChange={setTolerancePercent} onPreset={applyPreset} /><FreightAuditTable currency={currency} lines={lines} onAdd={() => setLines((current) => [...current, createEmptyLine()])} onRemove={(id) => setLines((current) => current.filter((line) => line.id !== id))} onChange={updateLine} /></div>
        <FreightAuditResults result={result} copied={copied} copyFailed={copyFailed} onCopy={copyReview} />
      </div>
    </>
  )
}
