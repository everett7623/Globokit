// 名称: 工具数据资产校验
// 描述: 校验国家资料与节假日 JSON 的字段契约和基础一致性
// 作者: wwj

const assert = require('node:assert/strict')

const countries = require('../lib/tools/data/global-country-info.json')
const countryOverrides = require('../lib/tools/data/holiday-country-overrides.json')
const observances = require('../lib/tools/data/holiday-observances.json')
const generated = require('../lib/tools/data/holiday-query-generated.json')
const holidays2025 = require('../lib/tools/data/holidays-2025.json')
const curatedHolidays2026 = require('../lib/tools/data/holidays-curated-2026.json')

const holidayTypes = new Set(['public', 'regional', 'observance', 'international'])
const impactLevels = new Set(['high', 'medium', 'low'])

function assertString(value, field) {
  assert.equal(typeof value, 'string', `${field} 必须是字符串`)
  assert.notEqual(value.trim(), '', `${field} 不能为空`)
}

function validateCountry(country, index, iso2Codes) {
  const prefix = `countries[${index}]`
  for (const field of [
    'name_cn', 'name_en', 'iso2', 'iso3', 'capital_cn', 'capital_en',
    'continent_cn', 'continent_en', 'dial_code', 'tld', 'timezone',
    'currency_code', 'currency_name_cn', 'currency_symbol', 'power_plug', 'voltage',
  ]) {
    assertString(country[field], `${prefix}.${field}`)
  }
  assert.match(country.iso2, /^[A-Z]{2}$/, `${prefix}.iso2 格式错误`)
  assert.match(country.iso3, /^[A-Z]{3}$/, `${prefix}.iso3 格式错误`)
  assert(!iso2Codes.has(country.iso2), `${prefix}.iso2 重复: ${country.iso2}`)
  iso2Codes.add(country.iso2)
  for (const field of ['language_cn', 'language_en', 'religion']) {
    assert(Array.isArray(country[field]), `${prefix}.${field} 必须是数组`)
  }
  assert.equal(typeof country.area_km2, 'number', `${prefix}.area_km2 必须是数字`)
  assert.equal(typeof country.population, 'number', `${prefix}.population 必须是数字`)
  assert(['left', 'right'].includes(country.driving_side), `${prefix}.driving_side 非法`)
}

function validateHoliday(holiday, prefix, datePattern) {
  assertString(holiday.date, `${prefix}.date`)
  assert.match(holiday.date, datePattern, `${prefix}.date 格式错误`)
  assertString(holiday.name, `${prefix}.name`)
  assert(holidayTypes.has(holiday.type), `${prefix}.type 非法: ${holiday.type}`)
  assert(impactLevels.has(holiday.impact), `${prefix}.impact 非法: ${holiday.impact}`)
}

function validateHolidayRecord(record, label, year) {
  assert(record && typeof record === 'object' && !Array.isArray(record), `${label} 必须是对象`)
  let count = 0
  for (const [countryCode, holidays] of Object.entries(record)) {
    assert.match(countryCode, /^[A-Z]{2}$/, `${label}.${countryCode} 国家代码格式错误`)
    assert(Array.isArray(holidays), `${label}.${countryCode} 必须是数组`)
    holidays.forEach((holiday, index) => {
      validateHoliday(holiday, `${label}.${countryCode}[${index}]`, new RegExp(`^${year}-\\d{2}-\\d{2}$`))
      count += 1
    })
  }
  return count
}

const iso2Codes = new Set()
assert(Array.isArray(countries), 'global-country-info.json 必须是数组')
countries.forEach((country, index) => validateCountry(country, index, iso2Codes))

for (const [countryCode, country] of Object.entries(countryOverrides)) {
  assert.match(countryCode, /^[A-Z]{2}$/, `countryOverrides.${countryCode} 国家代码格式错误`)
  for (const field of ['name', 'flag', 'timezone', 'currency', 'region']) {
    assertString(country[field], `countryOverrides.${countryCode}.${field}`)
  }
}

assertString(generated.source.provider, 'generated.source.provider')
assert(Array.isArray(generated.unsupportedCountryCodes), 'generated.unsupportedCountryCodes 必须是数组')
generated.unsupportedCountryCodes.forEach((code, index) => {
  assert.match(code, /^[A-Z]{2}$/, `generated.unsupportedCountryCodes[${index}] 格式错误`)
})

observances.internationalHolidays.forEach((holiday, index) => {
  validateHoliday(holiday, `internationalHolidays[${index}]`, /^\d{2}-\d{2}$/)
})
observances.religiousHolidays2025.forEach((holiday, index) => {
  validateHoliday(holiday, `religiousHolidays2025[${index}]`, /^2025-\d{2}-\d{2}$/)
})
assert.deepEqual(Object.keys(observances.impactDescriptions).sort(), ['high', 'low', 'medium'])

const counts = {
  countries: countries.length,
  countryOverrides: Object.keys(countryOverrides).length,
  holidays2025: validateHolidayRecord(holidays2025, 'holidays2025', 2025),
  curatedHolidays2026: validateHolidayRecord(curatedHolidays2026, 'curatedHolidays2026', 2026),
  generatedHolidays2026: validateHolidayRecord(generated.holidays2026, 'generated.holidays2026', 2026),
  generatedHolidays2027: validateHolidayRecord(generated.holidays2027, 'generated.holidays2027', 2027),
}

console.log('工具数据资产校验通过', counts)
