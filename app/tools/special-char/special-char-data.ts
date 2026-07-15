// 名称: 特殊字符页面数据
// 描述: 定义快速示例、历史类型与字符分类函数
// 路径: Globokit/app/tools/special-char/special-char-data.ts
// 作者: wwj
// 更新时间: 2026-07-15

export interface CheckHistoryItem {
  time: string
  charCount: number
  hasSpecial: boolean
}

export interface SpecialCharStats {
  chinese: number
  currency: number
  punctuation: number
  symbols: number
  other: number
}

export const SAMPLE_TEXTS = [
  { text: 'Hello，世界！这是一个测试文本。', label: '中英混合' },
  { text: 'Price: ￥100.00 / $15.99 （含税）', label: '货币符号' },
  { text: 'Email: user@example.com\nTel: +86-123-4567-8900', label: '联系方式' },
  { text: 'Product™ © 2024 - "Best" Quality®', label: '商标符号' },
]

export function categorizeSpecialChars(chars: string[]): SpecialCharStats {
  const categories = { chinese: 0, currency: 0, punctuation: 0, symbols: 0, other: 0 }

  chars.forEach((char) => {
    if (/[\u4e00-\u9fa5]/.test(char)) categories.chinese++
    else if (/[￥$€£¥₹₽]/.test(char)) categories.currency++
    else if (/[，。！？、；：""''（）【】《》]/.test(char)) categories.punctuation++
    else if (/[™®©℃℉§†‡№]/.test(char)) categories.symbols++
    else categories.other++
  })

  return categories
}
