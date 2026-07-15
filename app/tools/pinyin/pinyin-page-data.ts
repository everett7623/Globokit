// 名称: 拼音页面数据
// 描述: 定义示例、声调选项与历史记录类型
// 路径: Globokit/app/tools/pinyin/pinyin-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import { examples } from '@/lib/tools/pinyin'

export type ToneType = 'symbol' | 'num' | 'none'

export interface PinyinHistoryItem {
  input: string
  output: string
  toneType: string
}

export const EXAMPLE_BUTTONS = [
  { key: 'basic', label: '基础示例', text: examples.basic },
  { key: 'greeting', label: '常用问候', text: examples.greeting },
  { key: 'classic', label: '经典句子', text: examples.classic },
  { key: 'daily', label: '日常用语', text: examples.daily },
  { key: 'names', label: '常见姓名', text: examples.names },
  { key: 'address', label: '地址示例', text: examples.address },
]

export const TONE_OPTIONS: Array<{ value: ToneType; label: string; example: string; description: string }> = [
  { value: 'none', label: '无声调', example: 'ni hao', description: '不显示声调标记' },
  { value: 'symbol', label: '符号声调', example: 'nǐ hǎo', description: '使用音调符号' },
  { value: 'num', label: '数字声调', example: 'ni3 hao3', description: '使用数字表示声调' },
]

export const EMPTY_STATS = { totalChars: 0, chineseChars: 0, nonChineseChars: 0, conversionRate: '0%' }
