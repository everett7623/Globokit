const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const { getTimeDifference } = loadTypescriptModule('lib/tools/global-country-info.ts')
const { getUpcomingHolidays } = loadTypescriptModule('lib/tools/holiday-query.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const check = (condition, message) => { assertionCount += 1; assert.ok(condition, message) }

equal(getTimeDifference('Asia/Shanghai', 'Asia/Shanghai'), 0, '相同时区差应为零')
equal(getTimeDifference('UTC', 'Asia/Shanghai'), -8, 'UTC 应比上海晚八小时')
equal(getTimeDifference('Asia/Shanghai', 'UTC'), 8, '上海应比 UTC 早八小时')

const august10 = getUpcomingHolidays(30, new Date(2026, 7, 10))
const august17 = getUpcomingHolidays(30, new Date(2026, 7, 17))
equal(august10.filter((holiday) => holiday.daysUntil <= 7).length, 38, '8 月 10 日的七天提醒应可复现')
equal(august17.filter((holiday) => holiday.daysUntil <= 7).length, 6, '8 月 17 日的七天提醒应可复现')
check(august17.every((holiday) => holiday.daysUntil > 0 && holiday.daysUntil <= 30), '即将到来的节假日应位于查询窗口内')

console.log(`时间依赖数据：${assertionCount} 条定向断言通过`)
