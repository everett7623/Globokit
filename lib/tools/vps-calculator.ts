// 名称: VPS价值计算函数
// 描述: 计算服务器剩余使用时间的折算价值及汇率转换
// 路径: Globokit/lib/tools/vps-calculator.ts
// 作者: Jensfrank
// 更新时间: 2026-01-08

// VPS配置接口
export interface VPSConfig {
  vpsPlan?: string
  cpuCores?: number
  ramSize?: number
  diskSize?: number
  bandwidth?: number
  vendor?: string
}

// 计算结果接口
export interface CalculationResult {
  purchasePriceCNY: number
  remainingDays: number
  totalDays: number
  remainingRatio: number
  remainingValue: number
  premium?: number
  premiumPercent?: number
  expireDate: Date
  expectedPrice?: number
  dailyPrice: number // 新增：日均价格
}

// 价格输入模式
export type PriceMode = 'total' | 'monthly' | 'discount'

// 支持的货币列表
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

// 续费周期选项
export const RENEWAL_PERIODS = [
  { value: 1, label: '月付' },
  { value: 3, label: '季付' },
  { value: 6, label: '半年' },
  { value: 12, label: '年付' },
  { value: 24, label: '两年' },
  { value: 36, label: '三年' },
  { value: 60, label: '五年' },
]

// 汇率缓存
let exchangeRatesCache: Record<string, number> = {
  CNY: 1,
  USD: 0.14,
  EUR: 0.13,
  GBP: 0.11,
  JPY: 21.5,
  HKD: 1.09,
  KRW: 192.5,
  AUD: 0.21,
  CAD: 0.19,
  SGD: 0.19,
}

let lastFetchTime = 0
const CACHE_DURATION = 3600000 // 1小时

/**
 * 获取实时汇率
 */
export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const now = Date.now()
  
  if (now - lastFetchTime < CACHE_DURATION) {
    return exchangeRatesCache
  }

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/CNY')
    const data = await response.json()
    
    if (data.rates) {
      exchangeRatesCache = data.rates
      lastFetchTime = now
    }
    
    return exchangeRatesCache
  } catch (error) {
    console.error('获取汇率失败:', error)
    return exchangeRatesCache
  }
}

/**
 * 将外币转换为人民币
 */
export function convertToCNY(
  amount: number,
  currency: string,
  rates: Record<string, number>
): number {
  if (currency === 'CNY') return amount
  
  const rate = rates[currency]
  if (!rate) return amount
  
  return amount / rate
}

/**
 * 计算VPS剩余价值
 */
export function calculateVPSValue(
  purchaseDate: Date,
  renewalMonths: number,
  purchasePrice: number,
  currency: string,
  expectedPrice: number = 0,
  priceMode: PriceMode = 'total',
  rates: Record<string, number>,
  tradeDateInput?: Date // 新增参数：交易日期
): CalculationResult {
  // 交易日期默认为今天
  const tradeDate = tradeDateInput || new Date()
  
  // 计算到期日
  const expireDate = new Date(purchaseDate)
  expireDate.setMonth(expireDate.getMonth() + renewalMonths)

  // 计算总天数 (购买日 -> 到期日)
  const totalDays = Math.ceil((expireDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))
  
  // 计算剩余天数 (交易日 -> 到期日)
  const remainingDays = Math.max(0, Math.ceil((expireDate.getTime() - tradeDate.getTime()) / (1000 * 60 * 60 * 24)))

  // 转换为人民币
  let purchasePriceCNY = convertToCNY(purchasePrice, currency, rates)

  // 根据价格模式调整
  if (priceMode === 'monthly') {
    // 溢价模式：不调整购买价格
    purchasePriceCNY = purchasePriceCNY
  } else if (priceMode === 'discount') {
    // 折扣模式：购买价格已经在前端计算好了
    purchasePriceCNY = purchasePriceCNY
  }

  // 计算剩余价值
  const remainingRatio = totalDays > 0 ? remainingDays / totalDays : 0
  const remainingValue = purchasePriceCNY * remainingRatio
  const dailyPrice = totalDays > 0 ? purchasePriceCNY / totalDays : 0

  // 计算溢价
  let premium: number | undefined
  let premiumPercent: number | undefined

  if (expectedPrice > 0) {
    premium = expectedPrice - remainingValue
    premiumPercent = remainingValue > 0 ? (premium / remainingValue) * 100 : 0
  }

  return {
    purchasePriceCNY,
    remainingDays,
    totalDays,
    remainingRatio,
    remainingValue,
    premium,
    premiumPercent,
    expireDate,
    dailyPrice
  }
}

export function formatCurrency(amount: number, decimals: number = 2): string {
  return amount.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function validateInput(
  purchaseDate: string,
  purchasePrice: number
): { valid: boolean; error?: string } {
  if (!purchaseDate) {
    return { valid: false, error: '请选择购买日期' }
  }

  if (!purchasePrice || purchasePrice <= 0) {
    return { valid: false, error: '请输入有效的购买价格' }
  }

  return { valid: true }
}

export function getExchangeRateText(
  currency: string,
  rates: Record<string, number>
): string {
  if (currency === 'CNY') return ''
  
  const rate = rates[currency]
  if (!rate) return ''
  
  const cnyRate = (1 / rate).toFixed(4)
  return `1 ${currency} ≈ ${cnyRate} CNY`
}
