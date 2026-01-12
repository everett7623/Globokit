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

// 恢复价格模式定义
export type PriceMode = 'total' | 'premium' | 'discount'

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

let exchangeRatesCache: Record<string, number> = { 
  CNY: 1, USD: 0.138, EUR: 0.128, GBP: 0.11, JPY: 21.5, 
  HKD: 1.08, KRW: 192.5, AUD: 0.21, CAD: 0.19, SGD: 0.19 
}
let lastFetchTime = 0

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const now = Date.now()
  if (now - lastFetchTime < 3600000 && Object.keys(exchangeRatesCache).length > 5) return exchangeRatesCache
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

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatDate(date: Date): string {
  // 输出格式保持 YYYY/MM/DD 不变，仅用于显示
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
 * 核心计算逻辑
 */
export function calculateVPSValue(
  purchaseDateStr: string,
  renewalMonths: number,
  purchasePrice: number,
  currency: string,
  modeValue: number, 
  priceMode: PriceMode,
  rates: Record<string, number>,
  tradeDateStr: string
): CalculationResult {
  // 1. 日期解析修改：专门解析 DD/MM/YYYY 格式的文本输入
  const parseUKDate = (str: string) => {
    if (!str || !str.includes('/')) return new Date()
    const parts = str.split('/')
    // 简单验证格式是否为3部分
    if (parts.length !== 3) return new Date()

    const d = parseInt(parts[0], 10)
    const m = parseInt(parts[1], 10)
    const y = parseInt(parts[2], 10)

    // 验证数字是否有效
    if (isNaN(d) || isNaN(m) || isNaN(y)) return new Date()
    
    // 设为中午12点防止时区偏差
    return new Date(y, m - 1, d, 12, 0, 0)
  }

  const purchaseDate = parseUKDate(purchaseDateStr)
  const tradeDate = parseUKDate(tradeDateStr)

  const expireDate = new Date(purchaseDate)
  expireDate.setMonth(expireDate.getMonth() + renewalMonths)
  expireDate.setHours(12, 0, 0, 0)
  
  // 2. 汇率转换
  const rate = rates[currency] || 1
  const rateToCNY = currency === 'CNY' ? 1 : (rate > 0 ? 1/rate : 1)
  const purchasePriceCNY = purchasePrice * rateToCNY

  // 3. 天数计算
  const msPerDay = 1000 * 60 * 60 * 24
  const totalDays = Math.round((expireDate.getTime() - purchaseDate.getTime()) / msPerDay)
  
  let remainingDays = Math.round((expireDate.getTime() - tradeDate.getTime()) / msPerDay)
  if (remainingDays < 0) remainingDays = 0
  if (remainingDays > totalDays) remainingDays = totalDays

  const usedDays = totalDays - remainingDays

  // 4. 剩余价值计算 (日均价 * 剩余天数)
  const dailyPrice = totalDays > 0 ? purchasePriceCNY / totalDays : 0
  const remainingValue = dailyPrice * remainingDays
  const remainingRatio = totalDays > 0 ? remainingDays / totalDays : 0

  // 5. 根据模式计算期望售价 (Expected Price)
  let expectedPrice = 0
  
  if (priceMode === 'total') {
    expectedPrice = modeValue >= 0 ? modeValue : remainingValue
  } 
  else if (priceMode === 'premium') {
    const premiumAmount = isNaN(modeValue) ? 0 : modeValue
    expectedPrice = remainingValue + premiumAmount
  } 
  else if (priceMode === 'discount') {
    const discount = modeValue > 0 ? modeValue : 1
    expectedPrice = remainingValue * discount
  }

  // 6. 计算最终溢价
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
