// 名称: 纸箱包装方案对比
// 描述: 比较不同纸箱方案的箱数、CBM、计费重与预估物流成本
// 路径: Globokit/app/tools/packaging-plan-comparison/page.tsx
// 作者: everettlabs
// 更新时间: 2026-08-11

'use client'

import { useMemo, useState } from 'react'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { comparePackagingPlans, MAX_PACKAGING_PLANS, MIN_PACKAGING_PLANS, type PackagingShippingMode } from '@/lib/tools/packaging-plan-comparison'
import { PackagingPlanForm } from './packaging-plan-form'
import { buildPackagingSummary, createAdditionalPlan, createInitialForm, toInputs, type PackagingCommonField, type PackagingComparisonFormState, type PackagingPlanNumericField } from './packaging-page-data'
import { PackagingPlanResults, PackagingPlanStats } from './packaging-plan-results'

export default function PackagingPlanComparisonPage() {
  const [form, setForm] = useState<PackagingComparisonFormState>(createInitialForm)
  const calculation = useMemo(() => {
    try {
      return { result: comparePackagingPlans(toInputs(form)), error: '' }
    } catch (error) {
      return { result: null, error: error instanceof Error ? error.message : '包装参数无法比较，请检查输入' }
    }
  }, [form])
  const summaryText = calculation.result ? buildPackagingSummary(calculation.result) : ''
  const reset = () => setForm(createInitialForm())
  const updateCommonField = (field: PackagingCommonField, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const updateMode = (shippingMode: PackagingShippingMode) => setForm((current) => ({ ...current, shippingMode }))
  const updatePlan = (id: string, values: Record<string, string>) => setForm((current) => ({ ...current, plans: current.plans.map((plan) => plan.id === id ? { ...plan, ...values } : plan) }))
  const applyPreset = (values: Partial<PackagingComparisonFormState>) => setForm((current) => ({ ...current, ...values, plans: values.plans ? values.plans.map((plan) => ({ ...plan })) : current.plans }))
  const addPlan = () => setForm((current) => current.plans.length >= MAX_PACKAGING_PLANS ? current : { ...current, plans: [...current.plans, createAdditionalPlan(current.plans)] })
  const removePlan = (id: string) => setForm((current) => current.plans.length <= MIN_PACKAGING_PLANS ? current : { ...current, plans: current.plans.filter((plan) => plan.id !== id) })

  return <MobileFriendlyWrapper><div className="mb-8"><h1 className="mb-2 text-3xl font-bold">纸箱包装方案对比</h1><p className="text-muted-foreground">比较不同箱规的箱数、总体积、计费重和包装加运输成本，选择更适合当前订单的包装方案。</p></div>{calculation.error && <EnhancedAlert type="error" title="比较错误" message={calculation.error} action={{ label: '重置', onClick: reset }} className="mb-6" />}{calculation.result && <PackagingPlanStats result={calculation.result} />}<div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]"><PackagingPlanForm form={form} summaryText={summaryText} onCommonFieldChange={updateCommonField} onModeChange={updateMode} onPlanNameChange={(id, value) => updatePlan(id, { name: value })} onPlanFieldChange={(id, field: PackagingPlanNumericField, value) => updatePlan(id, { [field]: value })} onPreset={applyPreset} onAddPlan={addPlan} onRemovePlan={removePlan} onReset={reset} />{calculation.result ? <PackagingPlanResults result={calculation.result} /> : <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正参数后查看包装方案排名</div>}</div></MobileFriendlyWrapper>
}
