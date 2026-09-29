// 名称: 服务器成本对比计算逻辑
// 描述: 比较多台服务器的套餐价、续费价、附加成本与折扣，输出月均成本、三年持有成本与单位算力成本
// 路径: Globokit/lib/tools/server-cost-comparison.ts
// 作者: everettlabs
// 更新时间: 2026-09-18

export interface ServerPlan {
  id: string
  name: string
  /** 套餐促销价（每计费周期，以 priceCurrency 计价） */
  promoPrice: number
  /** 续费价（每计费周期）；等于促销价说明无幻价 */
  renewalPrice: number
  /** 计费周期月数：1 / 3 / 6 / 12 / 24 / 36 */
  cycleMonths: number
  /** 首期额外优惠金额（一次性，以 priceCurrency 计价） */
  firstCycleDiscount: number
  /** 每月带宽或流量附加费（以 priceCurrency 计价） */
  monthlyAddon: number
  /** 一次性开通费（以 priceCurrency 计价） */
  setupFee: number
  /** 是否含控制面板授权 */
  hasPanel: boolean
  /** 是否含每日备份 */
  hasBackup: boolean
  /** 内存 GB，用于单位算力成本 */
  memoryGb: number
  /** CPU 核数，用于单位算力成本 */
  vcpu: number
  /** 磁盘 GB，用于单位算力成本 */
  diskGb: number
}

export interface ServerCostInputs {
  /** 价格币种 */
  priceCurrency: string
  /** 结算币种 */
  settlementCurrency: string
  /** 1 价格币种 = N 结算币种 */
  exchangeRate: number
  /** 计划持有月数，用于长期成本测算 */
  holdingMonths: number
  plans: ServerPlan[]
}

export interface ServerPlanCost {
  id: string
  name: string
  rank: number
  /** 首期实付（结算币种） */
  firstCyclePaymentSettlement: number
  /** 首个计费周期月均（结算币种，含首期优惠） */
  firstCycleMonthlySettlement: number
  /** 续费期月均（结算币种，无优惠） */
  renewalMonthlySettlement: number
  /** 首期优惠带来的月均差额 */
  discountMonthlyGapSettlement: number
  /** 三年（36 个月）总持有成本（结算币种） */
  holdingCostSettlement: number
  /** 计划持有期内的总成本（结算币种） */
  holdingPlannedSettlement: number
  /** 每 GB 内存月成本（结算币种） */
  monthlyPerMemoryGbSettlement: number
  /** 每 vCPU 月成本（结算币种） */
  monthlyPerVcpuSettlement: number
  /** 单位算力综合月成本（结算币种，按 1 vCPU + 2GB 内存折算） */
  monthlyPerComputeUnitSettlement: number
  /** 与最低成本方案的差额（结算币种，按计划持有期） */
  extraCostSettlement: number
  /** 附加说明 */
  notes: string[]
}

export interface ServerCostResult {
  plans: ServerPlanCost[]
  cheapestByMonthlyId: string
  cheapestByHoldingId: string
  bestValuePerComputeId: string
  /** 计划持有期内最高与最低成本差额 */
  maxSavingSettlement: number
  /** 是否存在续费价高于促销价的方案 */
  hasPromoPricing: boolean
  settlementCurrency: string
  holdingMonths: number
}

const MAX_PRICE = 10_000_000
const MAX_MONTHS = 600

export const DEFAULT_SERVER_COST_INPUTS: ServerCostInputs = {
  priceCurrency: 'USD',
  settlementCurrency: 'CNY',
  exchangeRate: 7.15,
  holdingMonths: 24,
  plans: [
    {
      id: 'plan-a',
      name: '方案 A · 年付小钢炮',
      promoPrice: 46,
      renewalPrice: 96,
      cycleMonths: 12,
      firstCycleDiscount: 0,
      monthlyAddon: 2,
      setupFee: 0,
      hasPanel: true,
      hasBackup: false,
      memoryGb: 2,
      vcpu: 2,
      diskGb: 40,
    },
    {
      id: 'plan-b',
      name: '方案 B · 月付灵活',
      promoPrice: 10,
      renewalPrice: 10,
      cycleMonths: 1,
      firstCycleDiscount: 0,
      monthlyAddon: 0,
      setupFee: 0,
      hasPanel: false,
      hasBackup: true,
      memoryGb: 4,
      vcpu: 2,
      diskGb: 60,
    },
    {
      id: 'plan-c',
      name: '方案 C · 三年特惠',
      promoPrice: 180,
      renewalPrice: 240,
      cycleMonths: 36,
      firstCycleDiscount: 20,
      monthlyAddon: 0,
      setupFee: 5,
      hasPanel: true,
      hasBackup: true,
      memoryGb: 8,
      vcpu: 4,
      diskGb: 160,
    },
  ],
}

function requireFinite(value: number, label: string, min: number, max: number): number {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(label + '必须在 ' + min + ' 到 ' + max + ' 之间')
  }
  return value
}

/** 计算单个方案的月均、持有成本与单位算力成本（均以结算币种输出） */
export function calculatePlanCost(
  plan: ServerPlan,
  inputs: ServerCostInputs
): ServerPlanCost {
  const cycleMonths = requireFinite(plan.cycleMonths, '计费周期', 1, 60)
  if (!Number.isInteger(cycleMonths)) throw new Error('计费周期必须是整数月')

  const promoPrice = requireFinite(plan.promoPrice, '套餐价', 0, MAX_PRICE)
  const renewalPrice = requireFinite(plan.renewalPrice, '续费价', 0, MAX_PRICE)
  const monthlyAddon = requireFinite(plan.monthlyAddon, '每月附加费', 0, MAX_PRICE)
  const setupFee = requireFinite(plan.setupFee, '开通费', 0, MAX_PRICE)
  const firstCycleDiscount = requireFinite(plan.firstCycleDiscount, '首期优惠', 0, promoPrice)
  const memoryGb = requireFinite(plan.memoryGb, '内存', 0.1, 100_000)
  const vcpu = requireFinite(plan.vcpu, 'vCPU', 0.1, 10_000)

  const rate = inputs.exchangeRate
  const firstCycleMonths = Math.min(cycleMonths, inputs.holdingMonths)
  const remainingMonths = Math.max(inputs.holdingMonths - cycleMonths, 0)

  const firstCyclePayment = Math.max(promoPrice - firstCycleDiscount, 0) + setupFee + monthlyAddon * firstCycleMonths
  const firstCyclePaymentSettlement = firstCyclePayment * rate
  const firstCycleMonthlySettlement = firstCyclePaymentSettlement / firstCycleMonths

  const renewalPerCycle = renewalPrice + monthlyAddon * cycleMonths
  const renewalMonthlySettlement = (renewalPerCycle / cycleMonths) * rate

  const fullCycles = Math.floor(remainingMonths / cycleMonths)
  const leftoverMonths = remainingMonths - fullCycles * cycleMonths
  const renewalTotal = fullCycles * renewalPerCycle * rate + leftoverMonths * renewalMonthlySettlement
  const holdingPlannedSettlement = firstCyclePaymentSettlement + renewalTotal

  const months36 = 36
  const fullCycles36 = Math.floor(Math.max(months36 - cycleMonths, 0) / cycleMonths)
  const leftover36 = Math.max(months36 - cycleMonths, 0) - fullCycles36 * cycleMonths
  const holdingCostSettlement =
    firstCyclePaymentSettlement + fullCycles36 * renewalPerCycle * rate + leftover36 * renewalMonthlySettlement

  const computeUnits = vcpu + memoryGb / 2
  const notes: string[] = []
  if (renewalPrice > promoPrice * 1.5 && cycleMonths > 1) {
    notes.push('续费价约为套餐价的 ' + Math.round((renewalPrice / Math.max(promoPrice, 0.01)) * 100) + '%，长期成本明显高于首期')
  }
  if (!plan.hasPanel) notes.push('未含控制面板授权，自建面板需额外投入运维时间')
  if (!plan.hasBackup) notes.push('未含自动备份，建议自行配置快照或异地备份')
  if (leftoverMonths > 0) notes.push('持有期不是计费周期整数倍，尾部 ' + leftoverMonths + ' 个月按续费月均折算')

  return {
    id: plan.id,
    name: plan.name,
    rank: 0,
    firstCyclePaymentSettlement,
    firstCycleMonthlySettlement,
    renewalMonthlySettlement,
    discountMonthlyGapSettlement: renewalMonthlySettlement - firstCycleMonthlySettlement,
    holdingCostSettlement,
    holdingPlannedSettlement,
    monthlyPerMemoryGbSettlement: renewalMonthlySettlement / memoryGb,
    monthlyPerVcpuSettlement: renewalMonthlySettlement / vcpu,
    monthlyPerComputeUnitSettlement: renewalMonthlySettlement / Math.max(computeUnits, 0.1),
    extraCostSettlement: 0,
    notes,
  }
}

/** 汇总多方案对比，输出月均、持有成本与单位算力三个维度的最优方案 */
export function calculateServerCosts(inputs: ServerCostInputs): ServerCostResult {
  if (!Array.isArray(inputs.plans) || inputs.plans.length < 2) {
    throw new Error('请至少配置 2 个服务器方案进行对比')
  }
  if (inputs.plans.length > 5) {
    throw new Error('最多同时比较 5 个服务器方案')
  }

  const exchangeRate = requireFinite(inputs.exchangeRate, '汇率', 0.0001, 100_000)
  const holdingMonths = requireFinite(inputs.holdingMonths, '计划持有月数', 1, MAX_MONTHS)
  if (!Number.isInteger(holdingMonths)) throw new Error('计划持有月数必须是整数')

  const normalized: ServerCostInputs = { ...inputs, exchangeRate, holdingMonths }
  const costs = inputs.plans.map((plan) => calculatePlanCost(plan, normalized))

  const cheapestByMonthly = [...costs].sort(
    (left, right) => left.renewalMonthlySettlement - right.renewalMonthlySettlement
  )[0]
  const cheapestByHolding = [...costs].sort(
    (left, right) => left.holdingPlannedSettlement - right.holdingPlannedSettlement
  )[0]
  const bestValue = [...costs].sort(
    (left, right) => left.monthlyPerComputeUnitSettlement - right.monthlyPerComputeUnitSettlement
  )[0]

  const ranked = [...costs]
    .sort((left, right) => left.holdingPlannedSettlement - right.holdingPlannedSettlement)
    .map((cost, position) => ({ ...cost, rank: position + 1 }))

  const mostExpensive = ranked[ranked.length - 1]
  const cheapest = ranked[0]

  return {
    plans: ranked.map((cost) => ({
      ...cost,
      extraCostSettlement: cost.holdingPlannedSettlement - cheapest.holdingPlannedSettlement,
    })),
    cheapestByMonthlyId: cheapestByMonthly.id,
    cheapestByHoldingId: cheapestByHolding.id,
    bestValuePerComputeId: bestValue.id,
    maxSavingSettlement: mostExpensive.holdingPlannedSettlement - cheapest.holdingPlannedSettlement,
    hasPromoPricing: inputs.plans.some((plan) => plan.cycleMonths > 1 && plan.renewalPrice > plan.promoPrice),
    settlementCurrency: inputs.settlementCurrency,
    holdingMonths,
  }
}

/** 生成可粘贴给同事或客户的中文对比摘要 */
export function buildServerCostNote(result: ServerCostResult): string {
  const lines = [
    '服务器成本对比（结算币种：' + result.settlementCurrency + '，计划持有 ' + result.holdingMonths + ' 个月）',
  ]
  result.plans.forEach((plan) => {
    lines.push(
      plan.rank + '. ' + plan.name +
        '：首期月均 ' + plan.firstCycleMonthlySettlement.toFixed(2) +
        '，续费月均 ' + plan.renewalMonthlySettlement.toFixed(2) +
        '，持有期总成本 ' + plan.holdingPlannedSettlement.toFixed(2) +
        '，单位算力月成本 ' + plan.monthlyPerComputeUnitSettlement.toFixed(2)
    )
  })
  lines.push('差额：最高与最低方案在持有期内相差 ' + result.maxSavingSettlement.toFixed(2) + ' ' + result.settlementCurrency)
  if (result.hasPromoPricing) lines.push('提示：存在续费价高于套餐价的方案，请按续费价评估长期成本')
  return lines.join(String.fromCharCode(10))
}

