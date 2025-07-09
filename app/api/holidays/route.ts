// app/api/holidays/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { countries as fallbackCountries, holidays2025 as fallbackHolidays } from '@/lib/tools/holiday-data'

const HOLIDAY_API_KEY = process.env.HOLIDAY_API_KEY || '30d53266-a144-4c48-9e1c-84508c12335d'
const HOLIDAY_API_BASE_URL = 'https://holidayapi.com/v1'

// 缓存对象
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24小时缓存

// 检查是否应该使用备用数据
const shouldUseFallback = (year: string | number): boolean => {
  const yearNum = typeof year === 'string' ? parseInt(year) : year
  // Holiday API 免费版只支持过去的年份
  return yearNum >= new Date().getFullYear()
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const year = searchParams.get('year') || new Date().getFullYear()
    const month = searchParams.get('month')
    
    // 如果是当前年份或未来年份，使用备用数据
    if (shouldUseFallback(year)) {
      console.log('Using fallback data for year:', year)
      
      const holidays = country && fallbackHolidays[country] 
        ? fallbackHolidays[country] 
        : []
      
      // 按月份筛选
      const filteredHolidays = month 
        ? holidays.filter(h => new Date(h.date).getMonth() + 1 === parseInt(month))
        : holidays
      
      return NextResponse.json({
        status: 200,
        holidays: filteredHolidays,
        country: country || 'all',
        year,
        source: 'fallback',
        message: 'Holiday API 免费版不支持当前年份，使用备用数据'
      })
    }
    
    // 否则尝试调用 Holiday API
    const cacheKey = `${country}-${year}-${month || 'all'}`
    
    // 检查缓存
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({ ...cached.data, source: 'cache' })
    }
    
    // 构建 API URL
    let apiUrl = `${HOLIDAY_API_BASE_URL}/holidays?key=${HOLIDAY_API_KEY}&year=${year}`
    
    if (country) {
      apiUrl += `&country=${country}`
    }
    
    if (month) {
      apiUrl += `&month=${month}`
    }
    
    apiUrl += '&pretty&public=true'
    
    console.log('Calling Holiday API for year:', year)
    
    try {
      const response = await fetch(apiUrl, { 
        signal: AbortSignal.timeout(10000) // 10秒超时
      })
      const data = await response.json()
      
      if (!response.ok || data.status !== 200) {
        throw new Error(data.error || 'Invalid API response')
      }
      
      // 转换数据格式
      const holidays = data.holidays ? Object.values(data.holidays).map((holiday: any) => ({
        date: holiday.date,
        name: holiday.name,
        type: holiday.public ? 'public' : 'observance',
        impact: determineImpact(holiday),
        observed: holiday.observed,
        weekday: holiday.weekday
      })) : []
      
      const result = {
        status: 200,
        holidays,
        country: country || 'all',
        year,
        requests: data.requests,
        source: 'api'
      }
      
      // 存入缓存
      cache.set(cacheKey, { data: result, timestamp: Date.now() })
      
      return NextResponse.json(result)
    } catch (apiError) {
      console.error('Holiday API failed, using fallback:', apiError)
      
      // API 失败时使用备用数据
      const holidays = country && fallbackHolidays[country] 
        ? fallbackHolidays[country] 
        : []
      
      const filteredHolidays = month 
        ? holidays.filter(h => new Date(h.date).getMonth() + 1 === parseInt(month))
        : holidays
      
      return NextResponse.json({
        status: 200,
        holidays: filteredHolidays,
        country: country || 'all',
        year,
        source: 'fallback',
        message: 'Holiday API 不可用，使用备用数据'
      })
    }
  } catch (error) {
    console.error('Holiday route error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch holiday data', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// 获取国家列表
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body
    
    if (action === 'countries') {
      // 先尝试从 API 获取
      try {
        const apiUrl = `${HOLIDAY_API_BASE_URL}/countries?key=${HOLIDAY_API_KEY}&pretty`
        
        const response = await fetch(apiUrl, {
          signal: AbortSignal.timeout(5000) // 5秒超时
        })
        
        if (response.ok) {
          const data = await response.json()
          
          if (data.status === 200 && data.countries) {
            const countries = Object.entries(data.countries).map(([code, country]: [string, any]) => ({
              code,
              name: country.name,
              flag: getCountryFlag(code),
              timezone: getTimezone(code),
              currency: getCurrency(code)
            }))
            
            return NextResponse.json({
              status: 200,
              countries,
              source: 'api'
            })
          }
        }
      } catch (apiError) {
        console.log('Countries API failed, using fallback')
      }
      
      // API 失败时使用备用数据
      const countries = Object.values(fallbackCountries)
      
      return NextResponse.json({
        status: 200,
        countries,
        source: 'fallback',
        message: '使用备用国家数据'
      })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Countries route error:', error)
    // 错误时也返回备用数据
    return NextResponse.json({
      status: 200,
      countries: Object.values(fallbackCountries),
      source: 'fallback',
      message: '使用备用国家数据'
    })
  }
}

// 辅助函数
function determineImpact(holiday: any): 'high' | 'medium' | 'low' {
  const highImpactKeywords = ['new year', 'christmas', 'national', 'independence', 'easter', '春节', '国庆']
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

function getCountryFlag(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

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
    KR: 'UTC+9',
    SG: 'UTC+8',
    CA: 'UTC-5',
    MX: 'UTC-6',
    RU: 'UTC+3',
    AE: 'UTC+4',
    SA: 'UTC+3',
    TH: 'UTC+7',
    MY: 'UTC+8',
    ID: 'UTC+7',
    VN: 'UTC+7',
    PH: 'UTC+8'
  }
  return timezones[code] || 'UTC'
}

function getCurrency(code: string): string {
  const currencies: Record<string, string> = {
    US: 'USD',
    UK: 'GBP',
    DE: 'EUR',
    FR: 'EUR',
    IT: 'EUR',
    ES: 'EUR',
    JP: 'JPY',
    CN: 'CNY',
    AU: 'AUD',
    BR: 'BRL',
    IN: 'INR',
    KR: 'KRW',
    SG: 'SGD',
    CA: 'CAD',
    MX: 'MXN',
    RU: 'RUB',
    AE: 'AED',
    SA: 'SAR',
    TH: 'THB',
    MY: 'MYR',
    ID: 'IDR',
    VN: 'VND',
    PH: 'PHP'
  }
  return currencies[code] || 'N/A'
}
