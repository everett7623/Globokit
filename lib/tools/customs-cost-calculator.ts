// 名称: 报关费用估算逻辑
// 描述: 汇总报关、单证、查验和本地操作费用，并计算多种摊销口径

export type CustomsDirection = 'export' | 'import'

export interface CustomsCostInputs {
  direction: CustomsDirection
  shipmentCount: number
  itemQuantity: number
  cargoValueCny: number
  declarationFeeCny: number
  declarationItemCount: number
  includedItemCount: number
  extraItemFeeCny: number
  documentFeeCny: number
  agencyFeeCny: number
  inspectionProbabilityPercent: number
  inspectionFeeCny: number
  portOperationFeeCny: number
  storageFeeCny: number
  domesticTransportFeeCny: number
  otherFeeCny: number
}

export interface CustomsCostRow {
  key: string
  label: string
  value: number
  sharePercent: number
}

export interface CustomsCostResult {
  directionLabel: string
  shipmentCount: number
  itemQuantity: number
  extraItemCount: number
  declarationSubtotalCny: number
  expectedInspectionCostCny: number
  fixedServiceCostCny: number
  localOperationCostCny: number
  totalExpectedCostCny: number
  perShipmentCny: number
  perItemCny: number
  cargoValueRatioPercent: number
  costBreakdown: CustomsCostRow[]
}

export const DEFAULT_CUSTOMS_COST_INPUTS: CustomsCostInputs = {
  direction: 'export',
  shipmentCount: 1,
  itemQuantity: 500,
  cargoValueCny: 80000,
  declarationFeeCny: 350,
  declarationItemCount: 8,
  includedItemCount: 5,
  extraItemFeeCny: 35,
  documentFeeCny: 180,
  agencyFeeCny: 200,
  inspectionProbabilityPercent: 10,
  inspectionFeeCny: 800,
  portOperationFeeCny: 300,
  storageFeeCny: 0,
  domesticTransportFeeCny: 600,
  otherFeeCny: 0,
}

function nonNegative(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

function positiveInteger(value: number) {
  return Math.max(1, Math.floor(nonNegative(value) || 1))
}

function round(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function calculateCustomsCost(inputs: CustomsCostInputs): CustomsCostResult {
  const shipmentCount = positiveInteger(inputs.shipmentCount)
  const itemQuantity = positiveInteger(inputs.itemQuantity)
  const declarationItemCount = positiveInteger(inputs.declarationItemCount)
  const includedItemCount = positiveInteger(inputs.includedItemCount)
  const extraItemCount = Math.max(0, declarationItemCount - includedItemCount)
  const declarationSubtotalCny = shipmentCount * (
    nonNegative(inputs.declarationFeeCny) + extraItemCount * nonNegative(inputs.extraItemFeeCny)
  )
  const expectedInspectionCostCny = shipmentCount
    * nonNegative(inputs.inspectionFeeCny)
    * Math.min(100, nonNegative(inputs.inspectionProbabilityPercent)) / 100
  const fixedServiceCostCny = shipmentCount
    * (nonNegative(inputs.documentFeeCny) + nonNegative(inputs.agencyFeeCny))
  const localOperationCostCny = nonNegative(inputs.portOperationFeeCny)
    + nonNegative(inputs.storageFeeCny)
    + nonNegative(inputs.domesticTransportFeeCny)
    + nonNegative(inputs.otherFeeCny)
  const totalExpectedCostCny = declarationSubtotalCny + expectedInspectionCostCny
    + fixedServiceCostCny + localOperationCostCny
  const cargoValueCny = nonNegative(inputs.cargoValueCny)

  const source = [
    { key: 'declaration', label: '报关与品名附加', value: declarationSubtotalCny },
    { key: 'documents', label: '单证与代理服务', value: fixedServiceCostCny },
    { key: 'inspection', label: '查验期望成本', value: expectedInspectionCostCny },
    { key: 'port', label: '港区/场站操作', value: nonNegative(inputs.portOperationFeeCny) },
    { key: 'storage', label: '仓储费用', value: nonNegative(inputs.storageFeeCny) },
    { key: 'transport', label: '国内运输', value: nonNegative(inputs.domesticTransportFeeCny) },
    { key: 'other', label: '其他费用', value: nonNegative(inputs.otherFeeCny) },
  ]

  return {
    directionLabel: inputs.direction === 'import' ? '进口清关' : '出口报关',
    shipmentCount,
    itemQuantity,
    extraItemCount,
    declarationSubtotalCny: round(declarationSubtotalCny),
    expectedInspectionCostCny: round(expectedInspectionCostCny),
    fixedServiceCostCny: round(fixedServiceCostCny),
    localOperationCostCny: round(localOperationCostCny),
    totalExpectedCostCny: round(totalExpectedCostCny),
    perShipmentCny: round(totalExpectedCostCny / shipmentCount),
    perItemCny: round(totalExpectedCostCny / itemQuantity),
    cargoValueRatioPercent: cargoValueCny > 0 ? totalExpectedCostCny / cargoValueCny * 100 : 0,
    costBreakdown: source.map((row) => ({
      ...row,
      value: round(row.value),
      sharePercent: totalExpectedCostCny > 0 ? row.value / totalExpectedCostCny * 100 : 0,
    })),
  }
}
