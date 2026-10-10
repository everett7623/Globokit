// 名称: 装箱单生成器专项测试
// 描述: 覆盖汇总黄金数值、Excel 粘贴解析、尺寸格式与 CSV/纯文本导出
// 路径: Globokit/scripts/assert-packing-list.cjs
// 作者: everettlabs
// 更新时间: 2026-10-10

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  MAX_PACKING_LINES,
  parseDimensions,
  parsePastedLines,
  normalizePackingLines,
  calculatePackingList,
  buildPackingListPlainText,
  buildPackingListCsv,
} = loadTypescriptModule('lib/tools/packing-list-generator.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const close = (actual, expected, message) => {
  assertionCount += 1
  assert.ok(Math.abs(actual - expected) < 1e-6, `${message}（期望 ${expected}，实际 ${actual}）`)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

function createLine(overrides = {}) {
  return {
    id: 'l1',
    description: 'Thermos Flask 500ml',
    cartons: 1200,
    qtyPerCarton: 24,
    unit: 'PCS',
    gwPerCarton: 12.5,
    nwPerCarton: 11.2,
    dimensions: '60x40x40',
    ...overrides,
  }
}

// 尺寸解析
deepEqualDims()
function deepEqualDims() {
  const dims = parseDimensions('60x40x40')
  assertionCount += 1
  assert.deepEqual(dims, { length: 60, width: 40, height: 40 }, '标准尺寸应解析出长宽高')
}
check(parseDimensions('60×40×40') !== null, '全角乘号应可解析')
check(parseDimensions('60 * 40 * 40') !== null, '星号分隔应可解析')
equal(parseDimensions('60x40'), null, '两段尺寸应返回 null')
equal(parseDimensions('axbx c'), null, '非数字尺寸应返回 null')
equal(parseDimensions('0x40x40'), null, '零尺寸应返回 null')

// 黄金数值：1200 箱 x 24 = 28800 件，毛重 15000 KG，CBM = 1200×0.096 = 115.2
const totals = calculatePackingList([createLine()])
equal(totals.totalCartons, 1200, '总箱数应为 1200')
equal(totals.totalQty, 28800, '总数量应为 28800')
equal(totals.totalGw, 15000, '总毛重应为 15000')
equal(totals.totalNw, 13440, '总净重应为 13440')
close(totals.totalCbm, 115.2, '总体积应为 115.2 CBM')
equal(totals.lines[0].dimensionsLabel, '60x40x40 cm', '尺寸标签应规范化')

// 多行汇总
const multi = calculatePackingList([
  createLine(),
  createLine({ id: 'l2', description: 'Gift Box', cartons: 240, qtyPerCarton: 60, gwPerCarton: 3.2, nwPerCarton: 2.8, dimensions: '40x30x25' }),
])
equal(multi.totalCartons, 1440, '多行总箱数应为 1440')
equal(multi.lineCount, 2, '明细行数应为 2')
close(multi.totalCbm, 115.2 + 240 * 0.03, '多行总体积应正确')

// normalize 过滤空行
const normalized = normalizePackingLines([
  createLine({ description: '  Valid  ' }),
  createLine({ id: 'l3', description: '   ' }),
  createLine({ id: 'l4', description: 'Zero', cartons: 0 }),
])
equal(normalized.length, 1, '空品名与零箱数行应被过滤')
equal(normalized[0].description, 'Valid', '品名应去除空白')

// 粘贴解析
const pasted = parsePastedLines('Thermos Flask\t1200\t24\tPCS\t12.5\t11.2\t60x40x40\nGift Box\t240\t60\tPCS\t3.2\t2.8\t40x30x25')
equal(pasted.length, 2, '两行粘贴应解析出两条明细')
equal(pasted[0].description, 'Thermos Flask', '品名列应正确')
equal(pasted[0].cartons, 1200, '箱数列应正确')
equal(pasted[0].unit, 'PCS', '单位列应正确')
const minimalPaste = parsePastedLines('Item A\t10\t5')
equal(minimalPaste[0].unit, 'PCS', '缺省单位应为 PCS')
equal(minimalPaste[0].gwPerCarton, 0, '缺省毛重应为 0')
throws(() => parsePastedLines('OnlyTwo\t10'), /至少需要 3 列/, '少于 3 列应报错')
throws(() => parsePastedLines(',10,5'), /品名为空/, '品名为空应报错')
throws(() => parsePastedLines('Item\t0\t5'), /箱数必须大于 0/, '箱数为 0 应报错')
throws(() => parsePastedLines('   '), /粘贴内容为空/, '空粘贴应报错')
throws(() => parsePastedLines(Array.from({ length: MAX_PACKING_LINES + 1 }, (_, i) => `Item${i}\t1\t1`).join('\n')), /最多导入/, '超行数上限应报错')

// 校验
throws(() => calculatePackingList([]), /至少需要一行/, '空明细应报错')
throws(() => calculatePackingList([createLine({ cartons: 12.5 })]), /箱数/, '箱数非整数应报错')
throws(() => calculatePackingList([createLine({ qtyPerCarton: 0 })]), /每箱数量/, '每箱数量为 0 应报错')
throws(() => calculatePackingList([createLine({ gwPerCarton: -1 })]), /重量不能为负/, '负毛重应报错')
throws(() => calculatePackingList([createLine({ gwPerCarton: 5, nwPerCarton: 8 })]), /净重不能大于毛重/, '净重大于毛重应报错')
throws(() => calculatePackingList([createLine({ dimensions: '60x40' })]), /尺寸格式/, '非法尺寸应报错')

// 纯文本与 CSV 导出
const header = { exporter: 'Globokit Trading', consignee: 'NORDIC HOME AB', invoiceNo: 'INV-2026-0930', date: '2026-10-10' }
const plain = buildPackingListPlainText(totals, header)
check(plain.startsWith('PACKING LIST'), '纯文本应以 PACKING LIST 开头')
check(plain.includes('TOTAL: 1200 CTNS, 28,800 PCS'), '纯文本应含合计行')
check(plain.includes('TOTAL VOLUME: 115.2 CBM'), '纯文本应含体积合计')

const csv = buildPackingListCsv(totals)
check(csv.startsWith('\uFEFF'), 'CSV 应带 BOM（Excel 中文兼容）')
check(csv.includes('"Description"') || csv.includes('Description'), 'CSV 应含表头')
check(csv.includes('Thermos Flask 500ml'), 'CSV 应含品名')
check(csv.split('\r\n').length >= 3, 'CSV 应有表头+明细+合计行')

console.log(`packing-list-generator: ${assertionCount} 条断言全部通过`)
