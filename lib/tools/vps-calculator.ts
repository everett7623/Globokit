// 名称: VPS剩余价值计算器工具函数
// 描述: 提供VPS价值计算、汇率转换和配置管理功能
// 路径: Globokit/lib/tools/vps-calculator.ts
// 作者: Jensfrank
// 更新时间: 2025-12-01

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
}

// 价格输入模式
export type PriceMode = 'total' | 'monthly' | 'discount'

// 支持的货币列表
export const SUPPORTED_CURRENCIES = [
  { code: 'CNY', name: '人民币', symbol: '¥' },
  { code: 'USD', name: '美元', symbol: '$' },
  { code: 'EUR', name: '欧元', symbol: '€' },
  { code: 'GBP', name: '英镑', symbol: '£' },
  { code: 'JPY', name: '日元', symbol: '¥' },
  { code: 'HKD', name: '港币', symbol: 'HK$' },
  { code: 'KRW', name: '韩元', symbol: '₩' },
  { code: 'AUD', name: '澳元', symbol: 'A$' },
  { code: 'CAD', name: '加元', symbol: 'C$' },
  { code: 'SGD', name: '新加坡元', symbol: 'S$' },
]

// 续费周期选项
export const RENEWAL_PERIODS = [
  { value: 1, label: '1个月' },
  { value: 3, label: '3个月' },
  { value: 6, label: '6个月' },
  { value: 12, label: '1年（推荐）' },
  { value: 24, label: '2年' },
  { value: 36, label: '3年' },
  { value: 60, label: '5年' },
  { value: 0, label: '自定义' },
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
  
  // 如果缓存未过期，直接返回缓存
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
    // 返回默认汇率
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
  rates: Record<string, number>
): CalculationResult {
  const today = new Date()
  const expireDate = new Date(purchaseDate)
  expireDate.setMonth(expireDate.getMonth() + renewalMonths)

  // 计算总天数和剩余天数
  const totalDays = Math.ceil((expireDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24))
  const remainingDays = Math.max(0, Math.ceil((expireDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))

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
  }
}

/**
 * 格式化货币显示
 */
export function formatCurrency(amount: number, decimals: number = 2): string {
  return amount.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * 格式化日期显示
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

/**
 * 验证输入数据
 */
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

  const date = new Date(purchaseDate)
  const today = new Date()
  
  if (date > today) {
    return { valid: false, error: '购买日期不能晚于今天' }
  }

  return { valid: true }
}

/**
 * 获取汇率信息文本
 */
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
