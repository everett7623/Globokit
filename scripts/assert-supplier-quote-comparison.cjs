const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  DEFAULT_SUPPLIER_QUOTE_INPUTS,
  compareSupplierQuotes,
} = loadTypescriptModule('lib/tools/supplier-quote-comparison.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const check = (condition, message) => { assertionCount += 1; assert.ok(condition, message) }
const throws = (callback, pattern, message) => { assertionCount += 1; assert.throws(callback, pattern, message) }

const result = compareSupplierQuotes(DEFAULT_SUPPLIER_QUOTE_INPUTS)
equal(result.suppliers.length, 3, '默认应比较三家供应商')
const east = result.suppliers.find((supplier) => supplier.id === 'supplier-east')
const south = result.suppliers.find((supplier) => supplier.id === 'supplier-south')
equal(east.purchaseQuantity, 1016, '次品预留应提高采购数量')
equal(east.expectedGoodUnits, 1000.76, '预期合格品数量应正确')
equal(east.totalAcquisitionCost, 50068, '含税报价总现金成本应正确')
equal(east.costPerRequiredUnit, 50.068, '计划合格品摊销成本应正确')
equal(east.depositAmount, 14630.4, '首付金额应只按货款计算')
equal(south.cashUnitPrice, 50.85, '未税报价应加计 VAT')
equal(south.vatAmount, 5902.65, '未税报价税额应正确')
equal(result.bestCostSupplierId, 'supplier-east', '华东工厂应为现金成本最低')
equal(result.fastestSupplierId, 'supplier-platform', '平台供应商应为交期最快')
equal(result.lowestDepositSupplierId, 'supplier-east', '华东工厂应为首付最低')
equal(result.costSpread, 2558, '最高与最低总成本差应正确')
equal(result.moqConstrainedCount, 0, '默认需求不应被 MOQ 抬高')

const smallOrder = compareSupplierQuotes({ ...DEFAULT_SUPPLIER_QUOTE_INPUTS, requiredGoodUnits: 200 })
check(smallOrder.moqConstrainedCount >= 2, '小单应触发多个供应商 MOQ')
const equivalentTaxQuotes = compareSupplierQuotes({
  currency: 'CNY', requiredGoodUnits: 100, suppliers: [
    { ...DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers[0], id: 'inclusive', quotedUnitPrice: 113, taxMode: 'tax-inclusive', minimumOrderQuantity: 1, defectAllowancePercent: 0, fixedFee: 0, domesticFreight: 0 },
    { ...DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers[1], id: 'exclusive', quotedUnitPrice: 100, taxMode: 'tax-exclusive', minimumOrderQuantity: 1, defectAllowancePercent: 0, fixedFee: 0, domesticFreight: 0 },
  ],
})
equal(equivalentTaxQuotes.suppliers[0].cashUnitPrice, equivalentTaxQuotes.suppliers[1].cashUnitPrice, '等价含税和未税报价的现金单价应一致')

throws(() => compareSupplierQuotes({ ...DEFAULT_SUPPLIER_QUOTE_INPUTS, suppliers: [DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers[0]] }), /必须为 2 到 5 个/, '少于两家供应商应被拒绝')
throws(() => compareSupplierQuotes({ ...DEFAULT_SUPPLIER_QUOTE_INPUTS, suppliers: DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers.map((supplier) => ({ ...supplier, id: 'same' })) }), /ID 不能重复/, '重复 ID 应被拒绝')
throws(() => compareSupplierQuotes({ ...DEFAULT_SUPPLIER_QUOTE_INPUTS, suppliers: DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers.map((supplier, index) => index === 0 ? { ...supplier, defectAllowancePercent: 100 } : supplier) }), /次品预留率必须在/, '100% 次品预留应被拒绝')
throws(() => compareSupplierQuotes({ ...DEFAULT_SUPPLIER_QUOTE_INPUTS, suppliers: DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers.map((supplier, index) => index === 0 ? { ...supplier, minimumOrderQuantity: 10.5 } : supplier) }), /起订量必须是整数/, '非整数 MOQ 应被拒绝')
throws(() => compareSupplierQuotes({ ...DEFAULT_SUPPLIER_QUOTE_INPUTS, suppliers: DEFAULT_SUPPLIER_QUOTE_INPUTS.suppliers.map((supplier, index) => index === 0 ? { ...supplier, name: ' ' } : supplier) }), /名称不能为空/, '空供应商名称应被拒绝')

console.log(`供应商报价对比：${assertionCount} 条定向断言通过`)
