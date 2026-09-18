const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const { csvToMarkdown, markdownToCsv } = loadTypescriptModule('lib/tools/csv-to-markdown.ts')
const { timestampToBreakdown, parseShanghaiDateTime } = loadTypescriptModule('lib/tools/timestamp-converter.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const ok = (value, message) => { assertionCount += 1; assert.ok(value, message) }

// CSV → Markdown
const md = csvToMarkdown('产品,数量\nA,1\nB,"x,y"')
ok(md.ok, 'CSV 应转换成功')
equal(md.output, '| 产品 | 数量 |\n| --- | --- |\n| A | 1 |\n| B | x,y |', 'Markdown 表格应含表头分隔行')
equal(md.rowCount, 2, '数据行数应为 2')
const pipeMd = csvToMarkdown('name,note\nA,"has | pipe"')
ok(pipeMd.output.includes('has \\| pipe'), '字段中的竖线应被转义')
equal(csvToMarkdown('   ').ok, false, '空输入应被拒绝')

// Markdown → CSV
const csv = markdownToCsv('| a | b |\n| --- | --- |\n| 1 | 2 |\n| 3 | "q,z" |')
ok(csv.ok, 'Markdown 表格应还原成功')
equal(csv.output, 'a,b\r\n1,2\r\n3,"""q,z"""', 'CSV 输出应含 CRLF，并对含逗号与引号的字段做转义')
equal(csv.rowCount, 2, '数据行数应为 2')
const roundTrip = markdownToCsv(csvToMarkdown('x,y\n1,2').output)
ok(roundTrip.ok && roundTrip.output === 'x,y\r\n1,2', '互转应可往返还原')
equal(markdownToCsv('plain text').ok, false, '非表格输入应被拒绝')
equal(markdownToCsv('| --- |').ok, false, '只有分隔行应被拒绝')

// 时间戳 → 日期（Asia/Shanghai）
const ts = timestampToBreakdown('1760000000', 'auto')
ok(ts, '秒级时间戳应被自动识别')
equal(ts.date, '2025-10-09', '秒级时间戳日期应为北京时间 2025-10-09')
equal(ts.time, '16:53:20', '秒级时间戳时间应为北京时间 16:53:20')
equal(ts.weekday, '星期四', '星期应为星期四')
const tsMs = timestampToBreakdown('1760000000000', 'auto')
ok(tsMs && tsMs.date === ts.date && tsMs.time === ts.time, '毫秒时间戳应得到相同北京时间')
equal(timestampToBreakdown('abc', 'auto'), null, '非数字输入应被拒绝')
equal(timestampToBreakdown('99999999999999999', 'auto'), null, '超大时间戳应被拒绝')
equal(timestampToBreakdown('-1', 's').date, '1970-01-01', '负数秒级时间戳应折算到北京时间 1970-01-01')

// 日期 → 时间戳（Asia/Shanghai）
const parsed = parseShanghaiDateTime('2025-10-09 16:53:20')
ok(parsed, '合法日期应解析成功')
equal(parsed.seconds, 1760000000, '北京时间应正确折算为 Unix 秒')
equal(parsed.milliseconds, 1760000000000, '毫秒时间戳应与秒一致')
equal(parseShanghaiDateTime('2025-10-09').seconds, 1760000000 - 16 * 3600 - 53 * 60 - 20, '省略时间应按 00:00:00 处理')
equal(parseShanghaiDateTime('2025-02-30'), null, '非法日历日期应被拒绝')
equal(parseShanghaiDateTime('2025-10-09 25:00'), null, '非法小时应被拒绝')

console.log(`分类补充工具（CSV/Markdown、时间戳）：${assertionCount} 条定向断言通过`)
