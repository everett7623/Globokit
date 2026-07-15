// 名称: 数字转英文页面数据
// 描述: 定义常用数字、示例及历史记录类型
// 路径: Globokit/app/tools/number-to-english/number-english-data.ts
// 作者: wwj
// 更新时间: 2026-07-15

export interface NumberEnglishHistoryItem {
  number: string
  cardinal: string
  ordinal: string
}

export const NUMBER_EXAMPLES = [
  { num: '123', cardinal: 'one hundred and twenty three', ordinal: 'one hundred and twenty third' },
  { num: '1000', cardinal: 'one thousand', ordinal: 'one thousandth' },
  { num: '2024', cardinal: 'two thousand and twenty four', ordinal: 'two thousand and twenty fourth' },
  { num: '1000000', cardinal: 'one million', ordinal: 'one millionth' },
]

export const COMMON_NUMBERS = [
  { value: '1', label: '1' },
  { value: '12', label: '12' },
  { value: '100', label: '100' },
  { value: '1000', label: '1,000' },
  { value: '10000', label: '10,000' },
  { value: '100000', label: '100,000' },
  { value: '1000000', label: '1,000,000' },
  { value: '2024', label: '2024' },
]

export function formatNumber(number: string) {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
