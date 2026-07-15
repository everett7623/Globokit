// 名称: 批量生成的公共节假日数据
// 描述: 由 Nager.Date Public Holidays API 生成，用于补齐 2026/2027 年国家法定节假日明细
// 路径: Globokit/lib/tools/holiday-query-generated.ts
// 作者: everettlabs
// 更新时间: 2026-07-15

import generatedData from './data/holiday-query-generated.json'
import type { Holiday } from './holiday-query'

export const generatedHolidaySource = generatedData.source
export const generatedHolidayUnsupportedCountryCodes = generatedData.unsupportedCountryCodes
export const generatedHolidays2026 = generatedData.holidays2026 as unknown as Record<string, Holiday[]>
export const generatedHolidays2027 = generatedData.holidays2027 as unknown as Record<string, Holiday[]>
