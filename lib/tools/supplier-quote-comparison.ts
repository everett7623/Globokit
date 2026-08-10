// 名称: 供应商报价对比逻辑
// 描述: 标准化含税未税报价、MOQ、次品预留、费用、首付和交期
// 路径: Globokit/lib/tools/supplier-quote-comparison.ts
// 作者: everettlabs
// 更新时间: 2026-08-11

export type SupplierQuoteCurrency = 'CNY' | 'USD' | 'EUR' | 'GBP'
export type SupplierQuoteTaxMode = 'tax-inclusive' | 'tax-exclusive'

export interface SupplierQuoteInput {
  id: string
  name: string
  quotedUnitPrice: number
  taxMode: SupplierQuoteTaxMode
  vatRatePercent: number
  minimumOrderQuantity: number
  defectAllowancePercent: number
  fixedFee: number
  domesticFreight: number
  leadTimeDays: number
  depositPercent: number
}

export interface SupplierQuoteComparisonInputs {
  currency: SupplierQuoteCurrency
  requiredGoodUnits: number
  suppliers: SupplierQuoteInput[]
}

export interface SupplierQuoteResult extends SupplierQuoteInput {
  requiredPurchaseQuantity: number
  purchaseQuantity: number
  moqConstrained: boolean
  expectedGoodUnits: number
  surplusGoodUnits: number
  preTaxUnitPrice: number
  cashUnitPrice: number
  preTaxGoodsAmount: number
  vatAmount: number
  goodsCashAmount: number
  totalAcquisitionCost: number
  costPerRequiredUnit: number
  costPerExpectedGoodUnit: number
  depositAmount: number
  goodsBalanceAmount: number
  costDifferenceFromBest: number
  costRank: number
  speedRank: number
  depositRank: number
}

export interface SupplierQuoteComparisonResult {
  currency: SupplierQuoteCurrency
  requiredGoodUnits: number
  bestCostSupplierId: string
  fastestSupplierId: string
  lowestDepositSupplierId: string
  costSpread: number
  costSpreadPercent: number
  moqConstrainedCount: number
  suppliers: SupplierQuoteResult[]
}

export const MIN_SUPPLIER_QUOTES = 2
export const MAX_SUPPLIER_QUOTES = 5

export const SUPPLIER_QUOTE_CURRENCY_OPTIONS: Array<{ value: SupplierQuoteCurrency; label: string }> = [
  { value: 'CNY', label: 'CNY 人民币' },
  { value: 'USD', label: 'USD 美元' },
  { value: 'EUR', label: 'EUR 欧元' },
  { value: 'GBP', label: 'GBP 英镑' },
]

export const DEFAULT_SUPPLIER_QUOTE_INPUTS: SupplierQuoteComparisonInputs = {
  currency: 'CNY',
  requiredGoodUnits: 1000,
  suppliers: [
    { id: 'supplier-east', name: '华东工厂', quotedUnitPrice: 48, taxMode: 'tax-inclusive', vatRatePercent: 13, minimumOrderQuantity: 500, defectAllowancePercent: 1.5, fixedFee: 500, domesticFreight: 800, leadTimeDays: 18, depositPercent: 30 },
    { id: 'supplier-south', name: '华南工厂', quotedUnitPrice: 45, taxMode: 'tax-exclusive', vatRatePercent: 13, minimumOrderQuantity: 1000, defectAllowancePercent: 0.8, fixedFee: 0, domesticFreight: 1200, leadTimeDays: 24, depositPercent: 30 },
    { id: 'supplier-platform', name: '平台供应商', quotedUnitPrice: 51, taxMode: 'tax-inclusive', vatRatePercent: 13, minimumOrderQuantity: 300, defectAllowancePercent: 2.5, fixedFee: 0, domesticFreight: 300, leadTimeDays: 7, depositPercent: 100 },
  ],
}

function requireFinite(value: number, label: string, min: number, max: number) {
  if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
  return value
}

function requireInteger(value: number, label: string, min: number, max: number) {
  requireFinite(value, label, min, max)
  if (!Number.isInteger(value)) throw new Error(`${label}必须是整数`)
  return value
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function rankBy(rows: SupplierQuoteResult[], value: (row: SupplierQuoteResult) => number) {
  return [...rows].sort((a, b) => value(a) - value(b) || a.name.localeCompare(b.name, 'zh-CN')).map((row) => row.id)
}

export function compareSupplierQuotes(inputs: SupplierQuoteComparisonInputs): SupplierQuoteComparisonResult {
  if (!SUPPLIER_QUOTE_CURRENCY_OPTIONS.some((option) => option.value === inputs.currency)) throw new Error('请选择有效的核算币种')
  const requiredGoodUnits = requireInteger(inputs.requiredGoodUnits, '计划合格品数量', 1, 1_000_000_000)
  if (inputs.suppliers.length < MIN_SUPPLIER_QUOTES || inputs.suppliers.length > MAX_SUPPLIER_QUOTES) throw new Error(`供应商报价必须为 ${MIN_SUPPLIER_QUOTES} 到 ${MAX_SUPPLIER_QUOTES} 个`)
  if (new Set(inputs.suppliers.map((supplier) => supplier.id)).size !== inputs.suppliers.length) throw new Error('供应商报价 ID 不能重复')

  const calculated = inputs.suppliers.map((supplier, index): SupplierQuoteResult => {
    const name = supplier.name.trim()
    if (!name) throw new Error(`供应商 ${index + 1} 名称不能为空`)
    if (supplier.taxMode !== 'tax-inclusive' && supplier.taxMode !== 'tax-exclusive') throw new Error(`${name}请选择有效的报价含税口径`)
    const quotedUnitPrice = requireFinite(supplier.quotedUnitPrice, `${name}报价单价`, 0.000001, 1_000_000_000)
    const vatRatePercent = requireFinite(supplier.vatRatePercent, `${name}增值税率`, 0, 100)
    const minimumOrderQuantity = requireInteger(supplier.minimumOrderQuantity, `${name}起订量`, 1, 1_000_000_000)
    const defectAllowancePercent = requireFinite(supplier.defectAllowancePercent, `${name}次品预留率`, 0, 99.99)
    const fixedFee = requireFinite(supplier.fixedFee, `${name}固定费用`, 0, 1_000_000_000_000)
    const domesticFreight = requireFinite(supplier.domesticFreight, `${name}国内运费`, 0, 1_000_000_000_000)
    const leadTimeDays = requireInteger(supplier.leadTimeDays, `${name}交期`, 1, 3650)
    const depositPercent = requireFinite(supplier.depositPercent, `${name}首付比例`, 0, 100)
    const goodRate = 1 - defectAllowancePercent / 100
    const requiredPurchaseQuantity = Math.ceil(requiredGoodUnits / goodRate)
    const purchaseQuantity = Math.max(requiredPurchaseQuantity, minimumOrderQuantity)
    const moqConstrained = minimumOrderQuantity > requiredPurchaseQuantity
    const vatRate = vatRatePercent / 100
    const preTaxUnitPrice = supplier.taxMode === 'tax-inclusive' ? quotedUnitPrice / (1 + vatRate) : quotedUnitPrice
    const cashUnitPrice = supplier.taxMode === 'tax-inclusive' ? quotedUnitPrice : quotedUnitPrice * (1 + vatRate)
    const preTaxGoodsAmount = preTaxUnitPrice * purchaseQuantity
    const goodsCashAmount = cashUnitPrice * purchaseQuantity
    const vatAmount = goodsCashAmount - preTaxGoodsAmount
    const expectedGoodUnits = purchaseQuantity * goodRate
    const totalAcquisitionCost = goodsCashAmount + fixedFee + domesticFreight
    const depositAmount = goodsCashAmount * depositPercent / 100
    return {
      ...supplier,
      name,
      quotedUnitPrice: round(quotedUnitPrice, 6),
      vatRatePercent,
      minimumOrderQuantity,
      defectAllowancePercent,
      fixedFee: round(fixedFee),
      domesticFreight: round(domesticFreight),
      leadTimeDays,
      depositPercent,
      requiredPurchaseQuantity,
      purchaseQuantity,
      moqConstrained,
      expectedGoodUnits: round(expectedGoodUnits, 4),
      surplusGoodUnits: round(Math.max(0, expectedGoodUnits - requiredGoodUnits), 4),
      preTaxUnitPrice: round(preTaxUnitPrice, 6),
      cashUnitPrice: round(cashUnitPrice, 6),
      preTaxGoodsAmount: round(preTaxGoodsAmount),
      vatAmount: round(vatAmount),
      goodsCashAmount: round(goodsCashAmount),
      totalAcquisitionCost: round(totalAcquisitionCost),
      costPerRequiredUnit: round(totalAcquisitionCost / requiredGoodUnits, 4),
      costPerExpectedGoodUnit: round(totalAcquisitionCost / expectedGoodUnits, 4),
      depositAmount: round(depositAmount),
      goodsBalanceAmount: round(goodsCashAmount - depositAmount),
      costDifferenceFromBest: 0,
      costRank: 0,
      speedRank: 0,
      depositRank: 0,
    }
  })
  const costOrder = rankBy(calculated, (row) => row.totalAcquisitionCost)
  const speedOrder = rankBy(calculated, (row) => row.leadTimeDays)
  const depositOrder = rankBy(calculated, (row) => row.depositAmount)
  const bestCost = calculated.find((row) => row.id === costOrder[0]) ?? calculated[0]
  const suppliers = calculated.map((row) => ({
    ...row,
    costDifferenceFromBest: round(row.totalAcquisitionCost - bestCost.totalAcquisitionCost),
    costRank: costOrder.indexOf(row.id) + 1,
    speedRank: speedOrder.indexOf(row.id) + 1,
    depositRank: depositOrder.indexOf(row.id) + 1,
  }))
  const highestCost = Math.max(...calculated.map((row) => row.totalAcquisitionCost))
  const costSpread = highestCost - bestCost.totalAcquisitionCost

  return {
    currency: inputs.currency,
    requiredGoodUnits,
    bestCostSupplierId: costOrder[0],
    fastestSupplierId: speedOrder[0],
    lowestDepositSupplierId: depositOrder[0],
    costSpread: round(costSpread),
    costSpreadPercent: round(costSpread / bestCost.totalAcquisitionCost * 100, 6),
    moqConstrainedCount: suppliers.filter((supplier) => supplier.moqConstrained).length,
    suppliers,
  }
}
