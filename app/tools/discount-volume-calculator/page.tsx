// 名称: 降价保利销量计算器
// 描述: 评估客户压价后的利润损失与保利增量
// 路径: Globokit/app/tools/discount-volume-calculator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-25
'use client'

import { useState } from 'react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { CopyButton } from '@/components/tools/copy-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateDiscountVolume, type DiscountVolumeInput } from '@/lib/tools/discount-volume-calculator'

const initial = { price: '100', unitCost: '70', quantity: '1000', discountPercent: '5', feePercent: '2', fixedCost: '5000' }
const fields: { key: keyof DiscountVolumeInput; label: string; hint: string }[] = [
  { key: 'price', label: '原销售单价', hint: '所有金额使用同一币种' },
  { key: 'unitCost', label: '单位变动成本', hint: '采购、包装及随数量增加的费用' },
  { key: 'quantity', label: '原订单数量', hint: '按整数件计算' },
  { key: 'discountPercent', label: '降价幅度（%）', hint: '5 表示降价 5%，不是打五折' },
  { key: 'feePercent', label: '成交费率（%）', hint: '佣金、收款费等按销售额计提的总费率' },
  { key: 'fixedCost', label: '订单固定成本', hint: '不随销量变化的费用' },
]
const money = (value: number) => value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function DiscountVolumePage() {
  const [form, setForm] = useState(initial)
  let result: ReturnType<typeof calculateDiscountVolume> | null = null
  let error = ''
  try {
    if (Object.values(form).some((value) => !value.trim())) throw new Error('请完整填写所有参数')
    result = calculateDiscountVolume(Object.fromEntries(Object.entries(form).map(([key, value]) => [key, Number(value)])) as unknown as DiscountVolumeInput)
  } catch (reason) { error = reason instanceof Error ? reason.message : '请检查输入' }
  const summary = result ? `降价保利测算（金额均为同一币种）\n降价 ${form.discountPercent}%，新单价 ${money(result.discountedPrice)}\n原订单利润 ${money(result.originalProfit)}；同数量降价后利润 ${money(result.sameQuantityProfit)}\n${result.requiredQuantity === null ? '新单价无法覆盖单位变动成本，无法靠增加销量保利' : `维持原利润需 ${result.requiredQuantity} 件，增加 ${result.extraQuantity} 件（${result.growthPercent!.toFixed(2)}%）`}\n假设：单位成本、费率和固定成本不变。` : ''

  return <MobileFriendlyWrapper>
    <div className="mb-8"><h1 className="mb-2 text-3xl font-bold">降价保利销量计算器</h1><p className="text-muted-foreground">客户要求降价时，快速计算需要增加多少销量才能维持原订单利润。</p></div>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><CardHeader><CardTitle>报价与成本</CardTitle></CardHeader><CardContent className="space-y-5">
        {fields.map(({ key, label, hint }) => <div key={key} className="space-y-2"><Label htmlFor={key}>{label}</Label><Input id={key} type="number" min="0" step={key === 'quantity' ? '1' : 'any'} value={form[key]} onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} aria-describedby={`${key}-hint`} /><p id={`${key}-hint`} className="text-xs text-muted-foreground">{hint}</p></div>)}
        <Button variant="outline" onClick={() => setForm(initial)}>重置示例</Button>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>保利测算结果</CardTitle></CardHeader><CardContent className="space-y-5" aria-live="polite">
        {error && <p role="alert" className="text-destructive">{error}</p>}
        {result && <>
          <dl className="space-y-3">{[
            ['降价后单价', money(result.discountedPrice)], ['原订单利润', money(result.originalProfit)],
            ['同数量降价后利润', money(result.sameQuantityProfit)], ['同数量利润减少', money(result.profitLoss)],
            ['保利所需总销量', result.requiredQuantity === null ? '无法通过增量保利' : `${result.requiredQuantity.toLocaleString('zh-CN')} 件`],
            ['需增加销量', result.extraQuantity === null ? '—' : `${result.extraQuantity.toLocaleString('zh-CN')} 件（${result.growthPercent!.toFixed(2)}%）`],
          ].map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-2 border-b pb-3"><dt className="text-muted-foreground">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
          {result.requiredQuantity === null && <p className="text-destructive">降价后单件贡献利润不大于 0，增加销量无法维持原利润。</p>}
          {result.originalProfit < 0 && <p className="text-amber-600">原订单已经亏损；“保利”仅表示维持原亏损水平，不代表实现盈利。</p>}
          <CopyButton text={summary} />
        </>}
        <div className="space-y-2 rounded-md bg-muted p-4 text-sm text-muted-foreground"><p>计算口径：单件贡献利润 = 单价 ×（1 − 成交费率）− 单位变动成本。</p><p>保利销量 = 原销量 × 原单件贡献利润 ÷ 降价后单件贡献利润，向上取整。</p><p>假设单位成本、成交费率及订单固定成本不变；未考虑新增产能、阶梯运费、税费或汇率变动。金额统一使用输入币种，单价按完整精度测算，显示保留两位小数。</p></div>
      </CardContent></Card>
    </div>
  </MobileFriendlyWrapper>
}
