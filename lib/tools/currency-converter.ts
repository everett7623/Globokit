// 名称: 多币种换算逻辑
// 描述: 以 CNY 为基准的交叉汇率换算，支持点差模拟与全币种换算表
// 路径: Globokit/lib/tools/currency-converter.ts
// 作者: everettlabs
// 更新时间: 2026-10-10

export interface ConversionInput {
  amount: number
  from: string
  to: string
  rates: Record<string, number>
  markupPercent?: number
}

export interface ConversionResult {
  amount: number
  from: string
  to: string
  midRate: number
  appliedRate: number
  markupPercent: number
  convertedAmount: number
  rateUnit: string
}

export interface CurrencyOption {
  code: string
  name: string
  symbol: string
}

/** 常用外贸结算币种，rates 以 1 CNY 兑该币数量表示。 */
export const CONVERTER_CURRENCIES: CurrencyOption[] = [
  { code: 'CNY', name: '人民币', symbol: '¥' },
  { code: 'USD', name: '美元', symbol: '$' },
  { code: 'EUR', name: '欧元', symbol: '€' },
  { code: 'GBP', name: '英镑', symbol: '£' },
  { code: 'JPY', name: '日元', symbol: 'JP¥' },
  { code: 'HKD', name: '港币', symbol: 'HK$' },
  { code: 'KRW', name: '韩元', symbol: '₩' },
  { code: 'AUD', name: '澳元', symbol: 'A$' },
  { code: 'CAD', name: '加元', symbol: 'C$' },
  { code: 'SGD', name: '新加坡元', symbol: 'S$' },
]

const BASE_CURRENCY = 'CNY'

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export function validateRates(rates: Record<string, number>): void {
  const cny = rates[BASE_CURRENCY]
  if (!Number.isFinite(cny) || cny !== 1) throw new Error('汇率表必须以 CNY 为基准（CNY = 1）')
  for (const [code, rate] of Object.entries(rates)) {
    if (!Number.isFinite(rate) || rate <= 0) throw new Error(`币种 ${code} 的汇率必须大于 0`)
  }
}

export function getCrossRate(rates: Record<string, number>, from: string, to: string): number {
  validateRates(rates)
  const fromRate = rates[from]
  const toRate = rates[to]
  if (!Number.isFinite(fromRate) || fromRate <= 0) throw new Error(`暂不支持币种 ${from}，请检查汇率表`)
  if (!Number.isFinite(toRate) || toRate <= 0) throw new Error(`暂不支持币种 ${to}，请检查汇率表`)
  return toRate / fromRate
}

/**
 * 按中间价换算。markupPercent 模拟银行/收款渠道点差：换入方实际到手按点差缩水。
 * 例如 USD→CNY、点差 0.5% 时，appliedRate = midRate × (1 − 0.5%)。
 */
export function convertCurrency(input: ConversionInput): ConversionResult {
  const amount = input.amount
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('换算金额必须大于 0')
  const markupPercent = input.markupPercent ?? 0
  if (!Number.isFinite(markupPercent) || markupPercent < 0 || markupPercent > 10) throw new Error('点差必须在 0 到 10 之间')
  const midRate = getCrossRate(input.rates, input.from, input.to)
  const appliedRate = midRate * (1 - markupPercent / 100)
  const decimals = input.to === 'JPY' || input.to === 'KRW' ? 0 : 2

  return {
    amount: round(amount, 2),
    from: input.from,
    to: input.to,
    midRate: round(midRate, 6),
    appliedRate: round(appliedRate, 6),
    markupPercent,
    convertedAmount: round(amount * appliedRate, decimals),
    rateUnit: `1 ${input.from} = ${round(midRate, 6)} ${input.to}`,
  }
}

export interface ConversionTableRow {
  code: string
  name: string
  symbol: string
  converted: number
  unitRate: number
}

/** 金额对全部支持币种的换算表（不含来源币种本身）。 */
export function buildConversionTable(amount: number, from: string, rates: Record<string, number>, markupPercent = 0): ConversionTableRow[] {
  return CONVERTER_CURRENCIES
    .filter((currency) => currency.code !== from)
    .map((currency) => {
      const result = convertCurrency({ amount, from, to: currency.code, rates, markupPercent })
      return { code: currency.code, name: currency.name, symbol: currency.symbol, converted: result.convertedAmount, unitRate: result.midRate }
    })
}

export function buildConversionSummary(result: ConversionResult): string {
  const decimals = result.to === 'JPY' || result.to === 'KRW' ? 0 : 2
  return [
    `${result.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${result.from} → ${result.convertedAmount.toLocaleString('en-US', { minimumFractionDigits: decimals })} ${result.to}`,
    `中间价 ${result.midRate}，适用汇率 ${result.appliedRate}${result.markupPercent > 0 ? `（含点差 ${result.markupPercent}%）` : ''}`,
  ].join('\n')
}
