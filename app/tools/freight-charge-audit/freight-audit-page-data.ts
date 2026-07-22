// 名称: FOB/CIF 货代收费核对页面数据
// 描述: 定义可编辑账单、演示场景和金额格式化函数
// 路径: Globokit/app/tools/freight-charge-audit/freight-audit-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-22

import type { ChargeCategory, FreightAuditCurrency, FreightAuditParty, FreightChargeLine, FreightTradeTerm } from '@/lib/tools/freight-charge-audit'

export interface EditableChargeLine {
  id: string
  name: string
  category: ChargeCategory
  actual: string
  benchmark: string
}

export interface FreightAuditPreset {
  label: string
  description: string
  term: FreightTradeTerm
  auditParty: FreightAuditParty
  currency: FreightAuditCurrency
  tolerancePercent: string
  lines: EditableChargeLine[]
}

export const FREIGHT_AUDIT_PRESETS: FreightAuditPreset[] = [
  {
    label: 'FOB 指定货代卖方账单',
    description: '常见争议：操作/文件费偏高，并混入海运费与目的港费',
    term: 'FOB',
    auditParty: 'seller',
    currency: 'CNY',
    tolerancePercent: '10',
    lines: [
      { id: 'fob-1', name: '拖车费', category: 'origin-trucking', actual: '1800', benchmark: '1650' },
      { id: 'fob-2', name: '出口报关费', category: 'export-customs', actual: '450', benchmark: '450' },
      { id: 'fob-3', name: 'THC/港杂费', category: 'origin-terminal', actual: '1280', benchmark: '1200' },
      { id: 'fob-4', name: '订舱操作费', category: 'booking-handling', actual: '880', benchmark: '350' },
      { id: 'fob-5', name: '提单文件费', category: 'carrier-document', actual: '680', benchmark: '300' },
      { id: 'fob-6', name: '国际海运费', category: 'ocean-freight', actual: '9200', benchmark: '9000' },
      { id: 'fob-7', name: '目的港操作费', category: 'destination-charge', actual: '2600', benchmark: '1800' },
    ],
  },
  {
    label: 'CIF 目的港客户账单',
    description: '常见争议：目的港代理向客户收取的换单、拆箱和操作费用偏高',
    term: 'CIF',
    auditParty: 'buyer',
    currency: 'USD',
    tolerancePercent: '10',
    lines: [
      { id: 'cif-1', name: '目的港 Handling', category: 'destination-charge', actual: '380', benchmark: '220' },
      { id: 'cif-2', name: '换单/放单费 D/O', category: 'destination-charge', actual: '150', benchmark: '80' },
      { id: 'cif-3', name: 'CFS 拆箱费', category: 'destination-charge', actual: '420', benchmark: '260' },
      { id: 'cif-4', name: '仓储/超期费', category: 'special-surcharge', actual: '180', benchmark: '120' },
      { id: 'cif-5', name: '清关代理费', category: 'import-customs-tax', actual: '130', benchmark: '120' },
      { id: 'cif-6', name: '末端派送费', category: 'destination-charge', actual: '320', benchmark: '300' },
    ],
  },
]

export const EMPTY_AUDIT_PRESET: FreightAuditPreset = {
  label: '清空账单',
  description: '从空白账单开始录入',
  term: 'FOB',
  auditParty: 'seller',
  currency: 'CNY',
  tolerancePercent: '10',
  lines: [],
}

export function clonePresetLines(lines: EditableChargeLine[]) {
  return lines.map((line) => ({ ...line }))
}

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function toChargeLines(lines: EditableChargeLine[]): FreightChargeLine[] {
  return lines.map((line) => ({
    id: line.id,
    name: line.name.trim() || '未命名费用',
    category: line.category,
    actual: toNumber(line.actual),
    benchmark: toNumber(line.benchmark),
  }))
}

export function createEmptyLine(): EditableChargeLine {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `charge-${Date.now()}`,
    name: '',
    category: 'other',
    actual: '',
    benchmark: '',
  }
}

export function formatMoney(value: number, currency: FreightAuditCurrency) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export async function copyAuditText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    return copied
  }
}
