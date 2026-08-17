const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const { calculateDeliveryDate, getDateKeyInTimeZone } = loadTypescriptModule('lib/tools/delivery-date-calculator.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const check = (condition, message) => { assertionCount += 1; assert.ok(condition, message) }

const base = {
  startDate: '2026-08-17', productionDays: 10, transitDays: 5, bufferDays: 2,
  dayMode: 'calendar', excludeHolidays: false, countryCode: 'US',
}
const calendar = calculateDeliveryDate(base)
equal(calendar.error, null, '有效自然日输入不应报错')
equal(calendar.result.deliveryDate, '2026-09-03', '自然日阶段应顺序累加')
equal(calendar.result.milestones.map((item) => item.date).join(','), '2026-08-27,2026-09-01,2026-09-03', '阶段里程碑应正确')

const weekend = calculateDeliveryDate({ ...base, startDate: '2026-08-28', productionDays: 1, transitDays: 0, bufferDays: 0, dayMode: 'business' })
equal(weekend.result.deliveryDate, '2026-08-31', '工作日应跳过周末')
equal(weekend.result.weekendDaysSkipped, 2, '应记录跳过的周末天数')

const withHoliday = calculateDeliveryDate({ ...base, startDate: '2026-09-04', productionDays: 1, transitDays: 0, bufferDays: 0, dayMode: 'business', excludeHolidays: true })
equal(withHoliday.result.deliveryDate, '2026-09-08', '美国劳动节应被排除')
equal(withHoliday.result.holidayDaysSkipped, 1, '应记录跳过的公共假日')

const invalidDate = calculateDeliveryDate({ ...base, startDate: '2026-02-30' })
check(Boolean(invalidDate.error), '非法日历日期应被拒绝')
const invalidDays = calculateDeliveryDate({ ...base, productionDays: 1.5 })
check(Boolean(invalidDays.error), '非整数阶段天数应被拒绝')
const outsideCoverage = calculateDeliveryDate({ ...base, startDate: '2027-12-31', productionDays: 3, transitDays: 0, bufferDays: 0, dayMode: 'business', excludeHolidays: true })
equal(outsideCoverage.result.holidayCoverageComplete, false, '超出节假日年份时应提示覆盖不完整')
equal(getDateKeyInTimeZone(new Date('2026-08-16T16:30:00Z')), '2026-08-17', '今天应按 Asia/Shanghai 边界生成')

console.log(`外贸交期计算：${assertionCount} 条定向断言通过`)
