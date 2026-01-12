// 名称: VPS价值计算函数
// 描述: 计算服务器剩余使用时间的折算价值及汇率转换
// 路径: Globokit/lib/tools/vps-calculator.ts
// 作者: Jensfrank
// 更新时间: 2026-01-12

export interface CalculationResult {
  purchasePriceCNY: number
  remainingDays: number
  totalDays: number
  usedDays: number
  remainingRatio: number
  remainingValue: number
  premium: number
  premiumPercent: number
  expireDate: Date
  expectedPrice: number
  dailyPrice: number
}

export type PriceMode = 'total' | 'monthly' | 'discount'

// 完整保留所有货币
export const SUPPORTED_CURRENCIES = [
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

export const RENEWAL_PERIODS = [
  { value: 1, label: '月付' },
  { value: 3, label: '季付' },
  { value: 6, label: '半年' },
  { value: 12, label: '年付' },
  { value: 24, label: '两年' },
  { value: 36, label: '三年' },
  { value: 60, label: '五年' },
]

// 扩充默认缓存，防止API失败时汇率缺失
let exchangeRatesCache: Record<string, number> = { 
  CNY: 1, 
  USD: 0.138, 
  EUR: 0.128, 
  GBP: 0.11, 
  JPY: 21.5, 
  HKD: 1.08,
  KRW: 192.5,
  AUD: 0.21,
  CAD: 0.19,
  SGD: 0.19
}
let lastFetchTime = 0

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const now = Date.now()
  // 缓存 1 小时
  if (now - lastFetchTime < 3600000 && Object.keys(exchangeRatesCache).length > 5) {
    return exchangeRatesCache
  }
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/CNY')
    const data = await res.json()
    if (data.rates) {
      exchangeRatesCache = data.rates
      lastFetchTime = now
    }
    return exchangeRatesCache
  } catch (e) { 
    console.error('汇率API请求失败，使用默认缓存', e)
    return exchangeRatesCache 
  }
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}/${m}/${d}`
}

export function getExchangeRateText(currency: string, rates: Record<string, number>): string {
  if (currency === 'CNY') return ''
  const rate = rates[currency]
  return rate ? `1 ${currency} ≈ ${(1/rate).toFixed(4)} CNY` : ''
}

/**
 * 核心计算逻辑 - 强制使用 YYYY-MM-DD 解析，防止 input errors
 */
export function calculateVPSValue(
  purchaseDateStr: string,
  renewalMonths: number,
  purchasePrice: number,
  currency: string,
  expectedPriceInput: number,
  rates: Record<string, number>,
  tradeDateStr: string
): CalculationResult {
  // 1. 强制解析逻辑：不依赖 new Date(str) 的自动识别，手动拆解 YYYY-MM-DD
  const parseISO = (str: string) => {
    if (!str) return new Date()
    const [y, m, d] = str.split('-').map(Number)
    // 设为中午12点防止时区回拨导致少算一天
    return new Date(y, m - 1, d, 12, 0, 0)
  }

  const purchaseDate = parseISO(purchaseDateStr)
  const tradeDate = parseISO(tradeDateStr)

  // 计算到期日
  const expireDate = new Date(purchaseDate)
  expireDate.setMonth(expireDate.getMonth() + renewalMonths)
  expireDate.setHours(12, 0, 0, 0) // 保持时间一致
  
  // 2. 转换原价到人民币
  const rate = rates[currency] || 1
  const rateToCNY = currency === 'CNY' ? 1 : (rate > 0 ? 1/rate : 1)
  const purchasePriceCNY = purchasePrice * rateToCNY

  // 3. 计算天数 (毫秒差 / 每天毫秒数)
  const msPerDay = 1000 * 60 * 60 * 24
  const totalDays = Math.round((expireDate.getTime() - purchaseDate.getTime()) / msPerDay)
  
  // 剩余天数 = 到期日 - 交易日
  let remainingDays = Math.round((expireDate.getTime() - tradeDate.getTime()) / msPerDay)
  
  // 边界修正
  if (remainingDays < 0) remainingDays = 0
  if (remainingDays > totalDays) remainingDays = totalDays

  const usedDays = totalDays - remainingDays

  // 4. 计算价值 (核心公式：日均价 * 剩余天数)
  const dailyPrice = totalDays > 0 ? purchasePriceCNY / totalDays : 0
  const remainingValue = dailyPrice * remainingDays
  const remainingRatio = totalDays > 0 ? remainingDays / totalDays : 0

  // 5. 溢价计算
  // 如果输入了期望价格(>=0)，则按输入计算；否则默认期望价格=剩余价值(溢价0)
  const expectedPrice = expectedPriceInput >= 0 ? expectedPriceInput : remainingValue
  const premium = expectedPrice - remainingValue
  const premiumPercent = remainingValue > 0 ? (premium / remainingValue) * 100 : 0

  return {
    purchasePriceCNY,
    remainingDays,
    totalDays,
    usedDays,
    remainingRatio,
    remainingValue,
    premium,
    premiumPercent,
    expireDate,
    expectedPrice,
    dailyPrice
  }
}
