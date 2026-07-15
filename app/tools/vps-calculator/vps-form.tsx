// 名称: VPS 计算参数表单
// 描述: 展示购买信息、周期、日期和定价策略控件
// 路径: Globokit/app/tools/vps-calculator/vps-form.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { AlertTriangle, Calendar, Calculator, Clock, Info, RotateCcw, Tag, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RENEWAL_PERIODS, SUPPORTED_CURRENCIES, type PriceMode } from '@/lib/tools/vps-calculator'

const QUICK_DISCOUNTS = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6, 0.5]

interface VpsFormProps {
  purchaseDate: string
  tradeDate: string
  renewalPeriod: string
  purchasePrice: string
  currency: string
  currencySymbol?: string
  priceMode: PriceMode
  modeInput: string
  today: string
  remainingValue?: number
  onPurchaseDate: (value: string) => void
  onTradeDate: (value: string) => void
  onRenewalPeriod: (value: string) => void
  onPurchasePrice: (value: string) => void
  onCurrency: (value: string) => void
  onPriceMode: (value: PriceMode) => void
  onModeInput: (value: string) => void
  onReset: () => void
}

export function VpsForm(props: VpsFormProps) {
  return <Card className="border-gray-200 shadow-sm">
    <CardHeader className="border-b border-gray-100"><CardTitle className="flex items-center gap-2 text-lg"><Calculator className="h-5 w-5 text-violet-600" />参数配置</CardTitle><CardDescription>填写购买信息与定价策略，结果会自动刷新</CardDescription></CardHeader>
    <CardContent className="space-y-6 pt-6">
      <div className="space-y-3"><Label className="flex items-center gap-2 text-sm font-medium text-gray-700"><Wallet className="h-4 w-4 text-violet-600" />购买价格与币种</Label><div className="flex gap-3"><div className="flex flex-1 overflow-hidden rounded-md border border-input bg-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"><span className="flex items-center border-r border-gray-100 bg-gray-50 px-3 text-sm font-semibold text-gray-500">{props.currencySymbol}</span><Input type="number" value={props.purchasePrice} onChange={(event) => props.onPurchasePrice(event.target.value)} className="border-0 font-mono shadow-none focus-visible:ring-0" placeholder="0.00" /></div><Select value={props.currency} onValueChange={props.onCurrency}><SelectTrigger className="w-[112px]"><SelectValue /></SelectTrigger><SelectContent>{SUPPORTED_CURRENCIES.map((item) => <SelectItem key={item.code} value={item.code}><span className="mr-1">{item.symbol}</span>{item.code}</SelectItem>)}</SelectContent></Select></div></div>
      <div className="space-y-3"><Label className="flex items-center gap-2 text-sm font-medium text-gray-700"><Calendar className="h-4 w-4 text-violet-600" />续费周期</Label><div className="grid grid-cols-4 gap-2">{RENEWAL_PERIODS.map((period) => <Button key={period.value} variant={Number.parseInt(props.renewalPeriod) === period.value ? 'default' : 'outline'} size="sm" onClick={() => props.onRenewalPeriod(period.value.toString())} className="text-xs">{period.label}</Button>)}</div></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <DateField icon={Calendar} label="购买日期"><Input type="date" max={props.today} value={props.purchaseDate} onChange={(event) => props.onPurchaseDate(event.target.value)} className="font-mono" /></DateField>
        <DateField icon={Clock} label="交易日期"><Input type="date" max="9999-12-31" value={props.tradeDate} onChange={(event) => props.onTradeDate(event.target.value)} className="font-mono" /></DateField>
      </div>
      <div className="space-y-4 border-t border-gray-100 pt-6">
        <Label className="flex items-center gap-2 text-sm font-medium text-gray-700"><Tag className="h-4 w-4 text-violet-600" />定价策略</Label>
        <Tabs value={props.priceMode} onValueChange={(value) => props.onPriceMode(value as PriceMode)}><TabsList className="grid w-full grid-cols-3"><TabsTrigger value="total" className="text-xs">一口价</TabsTrigger><TabsTrigger value="premium" className="text-xs">溢价模式</TabsTrigger><TabsTrigger value="discount" className="text-xs">折扣模式</TabsTrigger></TabsList></Tabs>
        {props.priceMode === 'discount' ? <DiscountFields value={props.modeInput} onChange={props.onModeInput} /> : <div className="flex overflow-hidden rounded-md border border-input bg-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"><span className="flex items-center border-r border-gray-100 bg-gray-50 px-3 text-sm font-semibold text-gray-500">¥</span><Input type="number" value={props.modeInput} onChange={(event) => props.onModeInput(event.target.value)} className="border-0 font-mono shadow-none focus-visible:ring-0" placeholder={props.priceMode === 'total' ? (props.remainingValue !== undefined ? Math.round(props.remainingValue).toString() : '期望卖多少钱？') : '输入溢价金额'} /></div>}
      </div>
      <Button variant="outline" className="w-full" onClick={props.onReset}><RotateCcw className="mr-2 h-4 w-4" />重置所有选项</Button>
      <div className="flex gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><p>剩余价值 = 剩余天数 ÷ 总天数 × 购买价格。所有外币均按实时汇率折算为人民币进行评估。</p></div>
    </CardContent>
  </Card>
}

function DateField({ icon: Icon, label, children }: { icon: typeof Calendar; label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label className="flex items-center gap-2 text-sm font-medium text-gray-700"><Icon className="h-4 w-4 text-violet-600" />{label}</Label>{children}</div>
}

function DiscountFields({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="space-y-4"><div className="grid grid-cols-4 gap-2">{QUICK_DISCOUNTS.map((discount) => <Button key={discount} type="button" variant={Math.abs(Number.parseFloat(value) - discount) < 0.01 ? 'default' : 'outline'} size="sm" onClick={() => onChange(discount.toString())} className="h-9 text-xs">{discount * 10}折</Button>)}</div><div className="relative"><Input type="number" value={value} onChange={(event) => onChange(event.target.value)} placeholder="输入折扣，例如 0.8" className="pr-24 font-mono" /><span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">x 剩余价值</span></div>{Number.parseFloat(value) === 0 && value !== '' && <p className="flex items-center gap-1 text-xs text-amber-600"><AlertTriangle className="h-3.5 w-3.5" />折扣为 0 表示免费赠送，请确认是否正确</p>}</div>
}
