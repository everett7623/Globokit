// 名称: 外贸唛头生成器专项测试
// 描述: 覆盖箱号风格、大小写处理、附加行保留、边界校验与逐箱标签截断
// 路径: Globokit/scripts/assert-shipping-mark.cjs
// 作者: everettlabs
// 更新时间: 2026-09-30

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  buildMarkLines,
  buildMarkText,
  buildCartonLabels,
  normalizeShippingMark,
} = loadTypescriptModule('lib/tools/shipping-mark-generator.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}
const deepEqual = (actual, expected, message) => {
  assertionCount += 1
  assert.deepEqual(actual, expected, message)
}

function createInput(overrides = {}) {
  return {
    consigneeMark: 'abc',
    orderNo: 'po-2026-0930',
    destinationPort: 'hamburg',
    cartonCount: 50,
    cartonNumberStyle: 'range',
    startCartonNo: 1,
    extraLines: [],
    showMadeIn: true,
    showGrossWeight: false,
    grossWeightKg: 0,
    showDimensions: false,
    dimensionsCm: '',
    ...overrides,
  }
}

// 区间箱号风格：主唛输出 1-50，附加 MADE IN CHINA，全部大写化
deepEqual(
  buildMarkLines(createInput()),
  ['ABC', 'ORDER NO. PO-2026-0930', 'HAMBURG', 'CARTON NO. 1-50', 'MADE IN CHINA'],
  '默认区间风格应输出大写主唛与 1-50 区间箱号'
)

// 逐箱风格主唛输出 1 OF 50
equal(
  buildMarkLines(createInput({ cartonNumberStyle: 'each' }))[3],
  'CARTON NO. 1 OF 50',
  '逐箱风格主唛应输出 1 OF 50'
)

// none 风格不输出箱号行
check(
  buildMarkLines(createInput({ cartonNumberStyle: 'none' })).every((line) => !line.startsWith('CARTON NO.')),
  'none 风格不应输出箱号行'
)

// 附加行原样保留大小写与空行过滤
deepEqual(
  buildMarkLines(createInput({ extraLines: ['Keep Dry', '  ', 'THIS SIDE UP'] })).slice(-2),
  ['Keep Dry', 'THIS SIDE UP'],
  '附加行应保留原始大小写并过滤空行'
)

// 毛重与尺寸行
deepEqual(
  buildMarkLines(createInput({ showGrossWeight: true, grossWeightKg: 28.5, showDimensions: true, dimensionsCm: '60x40x40' })),
  ['ABC', 'ORDER NO. PO-2026-0930', 'HAMBURG', 'CARTON NO. 1-50', 'G.W. 28.5 KGS', '60X40X40 CM', 'MADE IN CHINA'],
  '毛重与尺寸应按 G.W./CM 格式输出'
)

// MADE IN CHINA 开关
check(
  !buildMarkLines(createInput({ showMadeIn: false })).includes('MADE IN CHINA'),
  '关闭 MADE IN 开关后不应输出该行'
)

// 单箱批次：区间风格退化为单号
equal(
  buildMarkLines(createInput({ cartonCount: 1 }))[3],
  'CARTON NO. 1',
  '单箱批次区间风格应输出单号'
)

// 起始箱号非 1
equal(
  buildMarkLines(createInput({ startCartonNo: 101, cartonCount: 20 }))[3],
  'CARTON NO. 101-120',
  '起始箱号 101 应输出 101-120'
)

// 纯文本拼接
equal(
  buildMarkText(createInput({ cartonNumberStyle: 'none' })),
  'ABC\nORDER NO. PO-2026-0930\nHAMBURG\nMADE IN CHINA',
  '纯文本输出应按换行拼接'
)

// 逐箱标签：range 风格单箱号，each 风格 N OF 总数
const rangeLabels = buildCartonLabels(createInput({ cartonCount: 10 }), 3)
equal(rangeLabels.length, 3, '标签预览应截断为请求数量')
equal(rangeLabels[1].cartonNo, 2, '标签箱号应连续递增')
check(rangeLabels[1].lines.includes('CARTON NO. 2'), 'range 风格标签应输出单箱号')
const eachLabels = buildCartonLabels(createInput({ cartonCount: 10, cartonNumberStyle: 'each' }), 2)
check(eachLabels[0].lines.includes('CARTON NO. 1 OF 10'), 'each 风格标签应输出 N OF 总数')
check(eachLabels[1].lines.includes('CARTON NO. 2 OF 10'), 'each 风格第二箱应为 2 OF 10')
deepEqual(buildCartonLabels(createInput({ cartonCount: 5 }), 0), [], '预览数为 0 时应返回空数组')

// 边界与非法输入
equal(normalizeShippingMark(createInput({ cartonCount: 9999 })).cartonCount, 9999, '总箱数 9999 应合法')
throws(() => buildMarkLines(createInput({ cartonCount: 0 })), /总箱数/, '总箱数 0 应报错')
throws(() => buildMarkLines(createInput({ cartonCount: 10000 })), /总箱数/, '总箱数 10000 应报错')
throws(() => buildMarkLines(createInput({ cartonCount: 12.5 })), /总箱数/, '总箱数非整数应报错')
throws(() => buildMarkLines(createInput({ startCartonNo: 0 })), /起始箱号/, '起始箱号 0 应报错')
throws(() => buildMarkLines(createInput({ startCartonNo: 9990, cartonCount: 20 })), /超出/, '箱号区间超出 9999 应报错')
throws(() => buildMarkLines(createInput({ showGrossWeight: true, grossWeightKg: 0 })), /毛重/, '勾选毛重但未填写应报错')

// normalize 清理首尾空白
const normalized = normalizeShippingMark(createInput({ consigneeMark: '  ABC  ', orderNo: ' PO-1 ', destinationPort: ' LAX ' }))
equal(normalized.consigneeMark, 'ABC', '收货人代号应去除首尾空白')
equal(normalized.orderNo, 'PO-1', '订单号应去除首尾空白')
equal(normalized.destinationPort, 'LAX', '目的港应去除首尾空白')

console.log(`shipping-mark-generator: ${assertionCount} 条断言全部通过`)
