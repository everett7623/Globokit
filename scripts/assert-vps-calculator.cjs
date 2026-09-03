const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  FALLBACK_EXCHANGE_RATES,
  SUPPORTED_CURRENCIES,
  calculateVPSValue,
  fetchExchangeRates,
  getExchangeRateSourceLabel,
} = loadTypescriptModule('lib/tools/vps-calculator.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const check = (condition, message) => { assertionCount += 1; assert.ok(condition, message) }

async function main() {
  const fallback = await fetchExchangeRates(async () => { throw new Error('offline') }, 1_000)
  equal(fallback.source, 'fallback', '首次请求失败应明确返回内置参考汇率')
  equal(fallback.stale, true, '内置参考汇率应标记为非实时')
  equal(fallback.rates.USD, FALLBACK_EXCHANGE_RATES.USD, '内置参考汇率内容应稳定')
  equal(getExchangeRateSourceLabel(fallback), '内置参考汇率', '汇率来源标签应准确')

  const liveRates = Object.fromEntries(SUPPORTED_CURRENCIES.map((currency, index) => [currency.code, index + 1]))
  let requestSignal
  const live = await fetchExchangeRates(async (_input, init) => {
    requestSignal = init?.signal
    return { ok: true, json: async () => ({ rates: liveRates }) }
  }, 10_000)
  equal(live.source, 'live', '有效响应应标记为实时汇率')
  equal(live.stale, false, '实时汇率不应标记过期')
  check(Boolean(live.fetchedAt), '实时汇率应记录获取时间')
  check(requestSignal instanceof AbortSignal, '实时汇率请求应设置超时信号')

  const cached = await fetchExchangeRates(async () => { throw new Error('不应在缓存期内请求') }, 20_000)
  equal(cached.source, 'cache', '缓存期内应复用近期缓存')
  equal(cached.stale, false, '未过期缓存应保持可用')

  const staleCache = await fetchExchangeRates(async () => ({ ok: false, json: async () => ({}) }), 4_000_000)
  equal(staleCache.source, 'cache', '实时请求失败后应优先保留历史缓存')
  equal(staleCache.stale, true, '历史缓存应标记过期')

  const result = calculateVPSValue('2026-01-01', 12, 120, 'CNY', -1, 'total', { CNY: 1 }, '2026-07-01')
  equal(result.totalDays, 365, '一年周期应按实际日历天数计算')
  check(result.remainingDays > 0 && result.remainingDays < result.totalDays, '周期中交易应保留部分剩余天数')
  check(result.expectedPrice === result.remainingValue, '默认一口价应等于剩余价值')

  console.log(`VPS 剩余价值计算：${assertionCount} 条定向断言通过`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
