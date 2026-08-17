const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const { auditFreightCharges, getChargeResponsibility } = loadTypescriptModule('lib/tools/freight-charge-audit.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }

equal(getChargeResponsibility('FOB', 'ocean-freight'), 'buyer', 'FOB 海运费通常由买方承担')
equal(getChargeResponsibility('CIF', 'ocean-freight'), 'seller', 'CIF 海运费通常由卖方承担')
equal(getChargeResponsibility('CIF', 'destination-charge'), 'buyer', 'CIF 目的港费用通常由买方承担')

const result = auditFreightCharges({
  term: 'FOB', auditParty: 'seller', currency: 'CNY', tolerancePercent: 10,
  lines: [
    { id: 'origin', name: '起运港杂费', category: 'origin-terminal', actual: 111, benchmark: 100 },
    { id: 'ocean', name: '海运费', category: 'ocean-freight', actual: 500, benchmark: 500 },
    { id: 'customs', name: '报关费', category: 'export-customs', actual: 50, benchmark: 0 },
    { id: 'document', name: '文件费', category: 'carrier-document', actual: 80, benchmark: 80 },
    { id: 'free', name: '未收费项', category: 'export-customs', actual: 0, benchmark: 30 },
  ],
})

equal(result.lines[0].status, 'high', '超过容差的卖方费用应标记高收费')
equal(result.lines[0].reviewAmount, 11, '高收费复核金额应为实际与基准差额')
equal(result.lines[1].status, 'wrong-party', 'FOB 卖方账单中的海运费应标记错收费')
equal(result.lines[2].status, 'missing-reference', '没有基准的收费应标记缺少基准')
equal(result.lines[3].status, 'review', '约定类费用应要求复核')
equal(result.lines[4].status, 'normal', '零收费项目应保持正常')
equal(result.actualTotal, 741, '实际收费总额应正确汇总')
equal(result.reviewAmount, 511, '复核金额应汇总错收费与高收费差额')
equal(result.wrongPartyCount, 1, '错收费项目数量应正确')

console.log(`FOB/CIF 货代收费核对：${assertionCount} 条定向断言通过`)
