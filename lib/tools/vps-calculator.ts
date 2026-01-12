// 名称: VPS价值计算函数
// 描述: 计算服务器剩余使用时间的折算价值及汇率转换
// 路径: Globokit/lib/tools/vps-calculator.ts
// 作者: Jensfrank
// 更新时间: 2026-01-08

// 计算结果接口
export interface CalculationResult {
  purchasePriceCNY: number // 原价(CNY)
  remainingDays: number    // 剩余天数
  totalDays: number        // 总周期天数
  usedDays: number         // 已用天数
  remainingRatio: number   // 剩余比例 (0-1)
  remainingValue: number   // 剩余价值(CNY)
  premium: number          // 溢价金额 (+/-)
  premiumPercent: number   // 溢价百分比
  expireDate: Date         // 到期日
  expectedPrice: number    // 期望售价
  dailyPrice: number       // 日均价格
}

export type PriceMode = 'total' | 'monthly' | 'discount'

// 支持的货币列表
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: '美元', symbol: '$' },
  { code: 'CNY', name: '人民币', symbol: '¥' },
  { code: 'EUR', name: '欧元', symbol: '€' },
  { code: 'GBP', name: '英镑', symbol: '£' },
  { code: 'JPY', name: '日元', symbol: 'JP¥' },
  { code: 'HKD', name: '港币', symbol: 'HK$' },
  { code: 'KRW', name: '韩元', symbol: '₩' },
  { code: 'AUD', name: '澳元', symbol: 'A$' },
]

// 汇率缓存 (示例，实际建议从API获取)
let exchangeRatesCache: Record<string, number> = {
  CNY: 1, USD: 0.138, EUR: 0.128, GBP: 0.11, JPY: 21.5, HKD: 1.08,
}
let lastFetchTime = 0

// 获取汇率
export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const now = Date.now()
  if (now - lastFetchTime < 3600000) return exchangeRatesCache
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/CNY')
    const data = await res.json()
    if (data.rates) {
      exchangeRatesCache = data.rates
      lastFetchTime = now
    }
    return exchangeRatesCache
  } catch (e) { return exchangeRatesCache }
}

// 格式化货币
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// 格式化日期
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

// 获取汇率文本
export function getExchangeRateText(currency: string, rates: Record<string, number>): string {
  if (currency === 'CNY') return ''
  const rate = rates[currency]
  return rate ? `1 ${currency} ≈ ${(1/rate).toFixed(4)} CNY` : ''
}

/**
 * 核心计算逻辑
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
  // 1. 处理日期 (全部设为中午12点，避免时区导致的 +/- 1天误差)
  const purchaseDate = new Date(purchaseDateStr)
  purchaseDate.setHours(12, 0, 0, 0)
  
  const tradeDate = new Date(tradeDateStr)
  tradeDate.setHours(12, 0, 0, 0)

  const expireDate = new Date(purchaseDate)
  expireDate.setMonth(expireDate.getMonth() + renewalMonths)
  
  // 2. 转换原价到人民币
  const rate = rates[currency] || 1
  const purchasePriceCNY = currency === 'CNY' ? purchasePrice : purchasePrice / rate

  // 3. 计算天数
  const msPerDay = 1000 * 60 * 60 * 24
  const totalDays = Math.round((expireDate.getTime() - purchaseDate.getTime()) / msPerDay)
  
  // 剩余天数 = 到期日 - 交易日
  let remainingDays = Math.round((expireDate.getTime() - tradeDate.getTime()) / msPerDay)
  if (remainingDays < 0) remainingDays = 0
  if (remainingDays > totalDays) remainingDays = totalDays // 交易日早于购买日的情况修正

  const usedDays = totalDays - remainingDays

  // 4. 计算价值
  const dailyPrice = totalDays > 0 ? purchasePriceCNY / totalDays : 0
  const remainingValue = dailyPrice * remainingDays
  const remainingRatio = totalDays > 0 ? remainingDays / totalDays : 0

  // 5. 计算溢价 (期望售价 - 剩余价值)
  // 如果用户没填期望售价，默认期望售价 = 剩余价值（即溢价为0）
  const expectedPrice = expectedPriceInput > 0 ? expectedPriceInput : remainingValue
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
