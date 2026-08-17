const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const { convertUnit, formatUnitInput, formatUnitValue } = loadTypescriptModule('lib/tools/unit-converter.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const closeTo = (actual, expected, tolerance, message) => { assertionCount += 1; assert.ok(Math.abs(actual - expected) <= tolerance, message) }

closeTo(convertUnit('length', 100, 'cm', 'in'), 39.3700787402, 1e-10, '厘米应正确换算为英寸')
closeTo(convertUnit('weight', 10, 'kg', 'lb'), 22.0462262185, 1e-10, '千克应正确换算为磅')
closeTo(convertUnit('volume', 1, 'm3', 'ft3'), 35.3146667215, 1e-10, 'CBM 应正确换算为立方英尺')
equal(convertUnit('length', 5, 'm', 'm'), 5, '相同单位换算应保持原值')
equal(convertUnit('length', -1, 'm', 'cm'), null, '负数输入应被拒绝')
equal(convertUnit('length', Number.POSITIVE_INFINITY, 'm', 'cm'), null, '无限值应被拒绝')
equal(convertUnit('length', 1, 'm', 'kg'), null, '跨量纲目标单位应被拒绝')
equal(formatUnitValue(1.0000000000001), '1', '近整数应归一显示')
equal(formatUnitInput(1 / 3), '0.333333333333', '输入回填应限制有效精度')

console.log(`外贸单位换算：${assertionCount} 条定向断言通过`)
