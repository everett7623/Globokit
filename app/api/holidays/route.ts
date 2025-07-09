// app/api/holidays/route.ts
import { NextRequest, NextResponse } from 'next/server'

const HOLIDAY_API_KEY = process.env.HOLIDAY_API_KEY || '30d53266-a144-4c48-9e1c-84508c12335d'
const HOLIDAY_API_BASE_URL = 'https://holidayapi.com/v1'

// 缓存对象，减少 API 调用
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24小时缓存

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const year = searchParams.get('year') || new Date().getFullYear()
    const month = searchParams.get('month')
    
    // 构建缓存键
    const cacheKey = `${country}-${year}-${month || 'all'}`
    
    // 检查缓存
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data)
    }
    
    // 构建 API URL
    let apiUrl = `${HOLIDAY_API_BASE_URL}/holidays?key=${HOLIDAY_API_KEY}&year=${year}`
    
    if (country) {
      apiUrl += `&country=${country}`
    }
    
    if (month) {
      apiUrl += `&month=${month}`
    }
    
    // 添加更多参数以获取更详细的信息
    apiUrl += '&pretty&public=true'
    
    // 调用 Holiday API
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      throw new Error(`Holiday API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // 转换数据格式以匹配我们的接口
    const holidays = data.holidays ? Object.values(data.holidays).map((holiday: any) => ({
      date: holiday.date,
      name: holiday.name,
      type: holiday.public ? 'public' : 'observance',
      impact: determineImpact(holiday),
      observed: holiday.observed,
      country: holiday.country,
      weekday: holiday.weekday
    })) : []
    
    const result = {
      status: data.status,
      holidays,
      country: country || 'all',
      year,
      requests: data.requests // API 调用次数信息
    }
    
    // 存入缓存
    cache.set(cacheKey, { data: result, timestamp: Date.now() })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Holiday API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch holiday data', message: errorMessage },
      { status: 500 }
    )
  }
}

// 获取支持的国家列表
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action === 'countries') {
      const apiUrl = `${HOLIDAY_API_BASE_URL}/countries?key=${HOLIDAY_API_KEY}&pretty`
      
      // 检查缓存
      const cached = cache.get('countries')
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 7) { // 国家列表缓存7天
        return NextResponse.json(cached.data)
      }
      
      const response = await fetch(apiUrl)
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || `Holiday API error: ${response.status}`)
      }
      
      // 转换国家数据
      const countries = Object.entries(data.countries || {}).map(([code, country]: [string, any]) => ({
        code,
        name: country.name,
        flag: country.flag || getCountryFlag(code),
        languages: country.languages,
        timezone: getTimezone(code),
        currency: getCurrency(code)
      }))
      
      const result = {
        status: data.status,
        countries
      }
      
      // 存入缓存
      cache.set('countries', { data: result, timestamp: Date.now() })
      
      return NextResponse.json(result)
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Holiday API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch data', message: errorMessage },
      { status: 500 }
    )
  }
}

// 辅助函数：判断节假日影响等级
function determineImpact(holiday: any): 'high' | 'medium' | 'low' {
  // 根据节假日名称判断影响等级
  const highImpactKeywords = ['new year', 'christmas', 'national day', 'independence', 'easter']
  const lowImpactKeywords = ['regional', 'local', 'observance']
  
  const name = holiday.name.toLowerCase()
  
  if (highImpactKeywords.some(keyword => name.includes(keyword))) {
    return 'high'
  }
  
  if (lowImpactKeywords.some(keyword => name.includes(keyword))) {
    return 'low'
  }
  
  return holiday.public ? 'medium' : 'low'
}

// 获取国家旗帜 emoji
function getCountryFlag(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

// 获取时区信息（简化版）
function getTimezone(code: string): string {
  const timezones: Record<string, string> = {
    US: 'UTC-5',
    UK: 'UTC+0',
    DE: 'UTC+1',
    FR: 'UTC+1',
    JP: 'UTC+9',
    CN: 'UTC+8',
    AU: 'UTC+10',
    BR: 'UTC-3',
    IN: 'UTC+5:30',
    // 添加更多...
  }
  return timezones[code] || 'UTC'
}

// 获取货币信息（简化版）
function getCurrency(code: string): string {
  const currencies: Record<string, string> = {
    US: 'USD',
    UK: 'GBP',
    DE: 'EUR',
    FR: 'EUR',
    JP: 'JPY',
    CN: 'CNY',
    AU: 'AUD',
    BR: 'BRL',
    IN: 'INR',
    // 添加更多...
  }
  return currencies[code] || 'N/A'
}
