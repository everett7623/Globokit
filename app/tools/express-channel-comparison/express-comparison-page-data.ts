// 名称: 快递专线比价页面数据
// 描述: 定义货物、渠道报价表单和格式化函数
// 路径: Globokit/app/tools/express-channel-comparison/express-comparison-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-24

import type {
  ExpressPricingMode,
  ExpressServiceType,
  ExpressTradeTerm,
} from '@/lib/tools/express-channel-comparison'

export type CargoType = 'general' | 'paste' | 'liquid' | 'powder' | 'battery'

export interface ShipmentForm {
  cargoName: string
  cargoType: CargoType
  destination: string
  lengthCm: string
  widthCm: string
  heightCm: string
  grossWeightKg: string
  netWeightKg: string
  packageCount: string
}

export type ShipmentTextField = 'cargoName' | 'destination'
export type ShipmentNumericField = Exclude<keyof ShipmentForm, ShipmentTextField | 'cargoType'>

export interface ChannelForm {
  id: string
  name: string
  serviceType: ExpressServiceType
  tradeTerm: ExpressTradeTerm
  divisor: string
  pricingMode: ExpressPricingMode
  quoteAmountCny: string
  fuelRatePercent: string
  remoteFeeCny: string
  customsFeeCny: string
  otherFeeCny: string
  transitDaysMin: string
  transitDaysMax: string
}

export type ChannelNumericField = Exclude<
  keyof ChannelForm,
  'id' | 'name' | 'serviceType' | 'tradeTerm' | 'pricingMode'
>

export const CARGO_TYPE_OPTIONS: Array<{ value: CargoType; label: string }> = [
  { value: 'general', label: '普通固体' },
  { value: 'paste', label: '膏体' },
  { value: 'liquid', label: '液体' },
  { value: 'powder', label: '粉末' },
  { value: 'battery', label: '带电/含电池' },
]

export const SERVICE_OPTIONS: Array<{ value: ExpressServiceType; label: string; divisor: number }> = [
  { value: 'express', label: '商业快递', divisor: 5000 },
  { value: 'air', label: '空运', divisor: 6000 },
  { value: 'ddp-line', label: 'DDP 专线', divisor: 6000 },
]

export const TRADE_TERM_OPTIONS: Array<{ value: ExpressTradeTerm; label: string }> = [
  { value: 'DDP', label: 'DDP 包税到门' },
  { value: 'DAP', label: 'DAP 到门不包税' },
  { value: 'CPT', label: 'CPT 主运费' },
]

export const PRICING_MODE_OPTIONS: Array<{ value: ExpressPricingMode; label: string }> = [
  { value: 'per-kg', label: '按公斤' },
  { value: 'total-base', label: '整票基础价' },
  { value: 'all-in', label: '整票一口价' },
]

export const INITIAL_SHIPMENT: ShipmentForm = {
  cargoName: '硅橡胶印模材料',
  cargoType: 'paste',
  destination: 'Tacoma 98445, USA',
  lengthCm: '41',
  widthCm: '32',
  heightCm: '21.5',
  grossWeightKg: '14',
  netWeightKg: '13',
  packageCount: '1',
}

export const INITIAL_CHANNELS: ChannelForm[] = [
  {
    id: 'a', name: '美国 DDP 专线', serviceType: 'ddp-line', tradeTerm: 'DDP', divisor: '6000',
    pricingMode: 'all-in', quoteAmountCny: '1580', fuelRatePercent: '0', remoteFeeCny: '0',
    customsFeeCny: '0', otherFeeCny: '0', transitDaysMin: '12', transitDaysMax: '15',
  },
  {
    id: 'b', name: '商业快递', serviceType: 'express', tradeTerm: 'DAP', divisor: '5000',
    pricingMode: 'per-kg', quoteAmountCny: '', fuelRatePercent: '0', remoteFeeCny: '0',
    customsFeeCny: '0', otherFeeCny: '0', transitDaysMin: '5', transitDaysMax: '7',
  },
  {
    id: 'c', name: '空运渠道', serviceType: 'air', tradeTerm: 'CPT', divisor: '6000',
    pricingMode: 'per-kg', quoteAmountCny: '', fuelRatePercent: '0', remoteFeeCny: '0',
    customsFeeCny: '0', otherFeeCny: '0', transitDaysMin: '5', transitDaysMax: '8',
  },
]

export function toNumber(value: string) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

export const money = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
  maximumFractionDigits: 2,
})
