const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const { getTimeDifference } = loadTypescriptModule('lib/tools/global-country-info.ts')
const { getUpcomingHolidays } = loadTypescriptModule('lib/tools/holiday-query.ts')
const { formatCalendarDateKey, getCalendarDayOfMonth, getDateKeyInTimeZone } = loadTypescriptModule('lib/date-utils.ts')
const { buildCityTimes, getUpcomingWorkingCities } = loadTypescriptModule('app/tools/world-time/world-time-page-data.ts')

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

const shanghaiBoundary = new Date('2026-09-02T16:30:00Z')
equal(getDateKeyInTimeZone(shanghaiBoundary), '2026-09-03', '业务日期应按 Asia/Shanghai 生成')
equal(formatCalendarDateKey('2026-09-03'), '2026/9/3', '日期字符串显示不应受系统时区影响')
equal(getCalendarDayOfMonth('2026-09-03'), 3, '日期字符串日号应保持日历语义')
equal(getCalendarDayOfMonth('2026-02-30'), null, '非法日期字符串应被拒绝')

const cityTimes = buildCityTimes(new Date('2026-09-03T12:00:00Z'), '12')
const newYork = cityTimes.find((city) => city.nameEn === 'New York')
equal(newYork?.currentTime, '08:00:00 AM', '12 小时制不应重复应用目标时区')
equal(newYork?.date, '9月3日周四', '城市日期应直接按目标时区格式化')
check(getUpcomingWorkingCities(cityTimes).some((city) => city.nameEn === 'New York'), '当地 8 点城市应进入即将工作列表')

console.log(`时间依赖数据：${assertionCount} 条定向断言通过`)
