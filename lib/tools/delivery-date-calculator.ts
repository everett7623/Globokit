// 名称: 外贸交期计算逻辑
// 描述: 按自然日或工作日计算生产、运输和缓冲阶段里程碑
// 路径: Globokit/lib/tools/delivery-date-calculator.ts
// 作者: everettlabs
// 更新时间: 2026-07-21

import { countries, generateHolidayData, SUPPORTED_HOLIDAY_YEARS, type Holiday } from './holiday-query'

export type DeliveryDayMode = 'calendar' | 'business'

export interface DeliveryDateInputs {
  startDate: string
  productionDays: number
  transitDays: number
  bufferDays: number
  dayMode: DeliveryDayMode
  excludeHolidays: boolean
  countryCode: string
}

export interface DeliveryMilestone {
  key: 'production' | 'transit' | 'delivery'
  label: string
  days: number
  date: string
}

export interface DeliveryDateResult {
  startDate: string
  deliveryDate: string
  plannedDays: number
  elapsedDays: number
  weekendDaysSkipped: number
  holidayDaysSkipped: number
  skippedHolidays: Array<Pick<Holiday, 'date' | 'name' | 'nameCN' | 'localName'>>
  holidayCoverageComplete: boolean
  milestones: DeliveryMilestone[]
}

export type DeliveryDateCalculation =
  | { result: DeliveryDateResult; error: null }
  | { result: null; error: string }

export const DELIVERY_BUSINESS_TIME_ZONE = 'Asia/Shanghai'
export const MAX_DELIVERY_STAGE_DAYS = 3650
const MILLISECONDS_PER_DAY = 86_400_000
const SUPPORTED_YEAR_SET = new Set<number>(SUPPORTED_HOLIDAY_YEARS)

const supportedCountryCodes = new Set<string>()
for (const year of SUPPORTED_HOLIDAY_YEARS) {
  Object.keys(generateHolidayData(year)).forEach((code) => supportedCountryCodes.add(code))
}

export const DELIVERY_COUNTRIES = Array.from(supportedCountryCodes)
  .filter((code) => countries[code])
  .map((code) => ({ code, label: `${countries[code].flag} ${countries[code].name}` }))
  .sort((a, b) => a.label.localeCompare(b.label, 'zh-CN'))

function parseCalendarDate(dateKey: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey)
  if (!match) return null

  const [, yearText, monthText, dayText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const date = new Date(0)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCFullYear(year, month - 1, day)

  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? date
    : null
}

function toDateKey(date: Date): string {
  return `${date.getUTCFullYear().toString().padStart(4, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`
}

function nextCalendarDay(date: Date): Date {
  const next = new Date(date.getTime())
  next.setUTCDate(next.getUTCDate() + 1)
  return next
}

function isValidStageDays(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= MAX_DELIVERY_STAGE_DAYS
}

interface CalendarContext {
  countryCode: string
  excludeHolidays: boolean
  holidayMaps: Map<number, Map<string, Holiday>>
  coverageComplete: boolean
}

interface StageResult {
  date: Date
  weekendDaysSkipped: number
  skippedHolidays: Holiday[]
}

function getPublicHolidayMap(year: number, context: CalendarContext): Map<string, Holiday> {
  const cached = context.holidayMaps.get(year)
  if (cached) return cached

  if (!SUPPORTED_YEAR_SET.has(year)) {
    context.coverageComplete = false
    const empty = new Map<string, Holiday>()
    context.holidayMaps.set(year, empty)
    return empty
  }

  const yearData = generateHolidayData(year)
  if (!Object.prototype.hasOwnProperty.call(yearData, context.countryCode)) context.coverageComplete = false
  const holidays = new Map<string, Holiday>()
  for (const holiday of yearData[context.countryCode] ?? []) {
    if (holiday.type === 'public' && !holidays.has(holiday.date)) holidays.set(holiday.date, holiday)
  }
  context.holidayMaps.set(year, holidays)
  return holidays
}

function addStageDays(start: Date, days: number, mode: DeliveryDayMode, context: CalendarContext): StageResult {
  let date = new Date(start.getTime())
  let addedDays = 0
  let weekendDaysSkipped = 0
  const skippedHolidays: Holiday[] = []

  while (addedDays < days) {
    date = nextCalendarDay(date)
    if (mode === 'business') {
      const weekday = date.getUTCDay()
      if (weekday === 0 || weekday === 6) {
        weekendDaysSkipped++
        continue
      }
      if (context.excludeHolidays) {
        const holiday = getPublicHolidayMap(date.getUTCFullYear(), context).get(toDateKey(date))
        if (holiday) {
          skippedHolidays.push(holiday)
          continue
        }
      }
    }
    addedDays++
  }

  return { date, weekendDaysSkipped, skippedHolidays }
}

export function getDateKeyInTimeZone(date: Date, timeZone = DELIVERY_BUSINESS_TIME_ZONE): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

export function formatDeliveryDate(dateKey: string): string {
  const date = parseCalendarDate(dateKey)
  if (!date) return dateKey
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date)
}

export function formatDeliveryDateEnglish(dateKey: string): string {
  const date = parseCalendarDate(dateKey)
  if (!date) return dateKey
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date)
}

export function calculateDeliveryDate(inputs: DeliveryDateInputs): DeliveryDateCalculation {
  const start = parseCalendarDate(inputs.startDate)
  if (!start) return { result: null, error: '请选择有效的起始日期。' }
  if (![inputs.productionDays, inputs.transitDays, inputs.bufferDays].every(isValidStageDays)) {
    return { result: null, error: `各阶段天数必须是 0–${MAX_DELIVERY_STAGE_DAYS} 的整数。` }
  }

  const useHolidays = inputs.dayMode === 'business' && inputs.excludeHolidays
  if (useHolidays && !countries[inputs.countryCode]) {
    return { result: null, error: '请选择有效的节假日国家或地区。' }
  }

  const context: CalendarContext = {
    countryCode: inputs.countryCode,
    excludeHolidays: useHolidays,
    holidayMaps: new Map(),
    coverageComplete: true,
  }
  const stages = [
    { key: 'production' as const, label: '生产完成', days: inputs.productionDays },
    { key: 'transit' as const, label: '运输完成', days: inputs.transitDays },
    { key: 'delivery' as const, label: '预计交付', days: inputs.bufferDays },
  ]
  const milestones: DeliveryMilestone[] = []
  const skippedHolidays: Holiday[] = []
  let current = start
  let weekendDaysSkipped = 0

  for (const stage of stages) {
    const stageResult = addStageDays(current, stage.days, inputs.dayMode, context)
    current = stageResult.date
    weekendDaysSkipped += stageResult.weekendDaysSkipped
    skippedHolidays.push(...stageResult.skippedHolidays)
    milestones.push({ ...stage, date: toDateKey(current) })
  }

  return {
    result: {
      startDate: inputs.startDate,
      deliveryDate: toDateKey(current),
      plannedDays: inputs.productionDays + inputs.transitDays + inputs.bufferDays,
      elapsedDays: Math.round((current.getTime() - start.getTime()) / MILLISECONDS_PER_DAY),
      weekendDaysSkipped,
      holidayDaysSkipped: skippedHolidays.length,
      skippedHolidays: skippedHolidays.map(({ date, name, nameCN, localName }) => ({ date, name, nameCN, localName })),
      holidayCoverageComplete: !useHolidays || context.coverageComplete,
      milestones,
    },
    error: null,
  }
}
