// 名称: 商业发票表单
// 描述: 采集买卖双方信息、发票参数与动态明细行
// 路径: Globokit/app/tools/invoice-generator/invoice-form.tsx
// 作者: everettlabs
// 更新时间: 2026-09-30

import { FileText, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormattedInput } from '@/components/ui/formatted-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { InvoiceType } from '@/lib/tools/invoice-generator'
import { CURRENCY_OPTIONS, INCOTERM_OPTIONS, INVOICE_TYPE_OPTIONS, PAYMENT_TERM_OPTIONS, SAMPLE_INVOICE } from './invoice-data'

export interface InvoiceLineFormState {
  id: string
  description: string
  quantity: string
  unit: string
  unitPrice: string
}

export interface InvoiceFormState {
  invoiceNo: string
  invoiceDate: string
  invoiceType: InvoiceType
  currency: string
  sellerName: string
  sellerAddress: string
  sellerTel: string
  sellerEmail: string
  buyerName: string
  buyerAddress: string
  buyerTel: string
  buyerEmail: string
  paymentTerms: string
  incoterm: string
  portOfLoading: string
  portOfDischarge: string
  bankDetails: string
  notesText: string
  taxPercent: string
  lines: InvoiceLineFormState[]
}

export interface InvoiceFormProps {
  form: InvoiceFormState
  onChange: (patch: Partial<InvoiceFormState>) => void
  onLineChange: (lineId: string, field: keyof Omit<InvoiceLineFormState, 'id'>, value: string) => void
  onAddLine: () => void
  onRemoveLine: (lineId: string) => void
  onReset: () => void
}

export function createInvoiceFormState(): InvoiceFormState {
  return { ...SAMPLE_INVOICE, taxPercent: '0' }
}

export function InvoiceForm({ form, onChange, onLineChange, onAddLine, onRemoveLine, onReset }: InvoiceFormProps) {
  return (
    <Card className="print:hidden">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />发票信息</CardTitle>
            <CardDescription>填写后右侧实时生成 A4 版式发票</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />重置为示例
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="invoiceType">发票类型</Label>
            <Select value={form.invoiceType} onValueChange={(value) => onChange({ invoiceType: value as InvoiceType })}>
              <SelectTrigger id="invoiceType" className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {INVOICE_TYPE_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">币种</Label>
            <Input id="currency" list="invoice-currency-options" value={form.currency} onChange={(event) => onChange({ currency: event.target.value })} className="h-11 font-medium" maxLength={8} />
            <datalist id="invoice-currency-options">
              {CURRENCY_OPTIONS.map((code) => <option key={code} value={code} />)}
            </datalist>
          </div>
          <TextField id="invoiceNo" label="发票号" value={form.invoiceNo} onChange={(value) => onChange({ invoiceNo: value })} placeholder="INV-2026-0001" />
          <TextField id="invoiceDate" label="发票日期" value={form.invoiceDate} onChange={(value) => onChange({ invoiceDate: value })} placeholder="2026-09-30" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <PartyFields
            title="卖方 Seller"
            name={form.sellerName}
            address={form.sellerAddress}
            tel={form.sellerTel}
            email={form.sellerEmail}
            onChange={(patch) => onChange({
              sellerName: patch.name ?? form.sellerName,
              sellerAddress: patch.address ?? form.sellerAddress,
              sellerTel: patch.tel ?? form.sellerTel,
              sellerEmail: patch.email ?? form.sellerEmail,
            })}
          />
          <PartyFields
            title="买方 Buyer"
            name={form.buyerName}
            address={form.buyerAddress}
            tel={form.buyerTel}
            email={form.buyerEmail}
            onChange={(patch) => onChange({
              buyerName: patch.name ?? form.buyerName,
              buyerAddress: patch.address ?? form.buyerAddress,
              buyerTel: patch.tel ?? form.buyerTel,
              buyerEmail: patch.email ?? form.buyerEmail,
            })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="paymentTerms">付款条款</Label>
            <Input id="paymentTerms" list="invoice-payment-options" value={form.paymentTerms} onChange={(event) => onChange({ paymentTerms: event.target.value })} className="h-11 font-medium" maxLength={120} />
            <datalist id="invoice-payment-options">
              {PAYMENT_TERM_OPTIONS.map((term) => <option key={term} value={term} />)}
            </datalist>
          </div>
          <div className="space-y-2">
            <Label htmlFor="incoterm">贸易术语</Label>
            <Input id="incoterm" list="invoice-incoterm-options" value={form.incoterm} onChange={(event) => onChange({ incoterm: event.target.value })} className="h-11 font-medium" maxLength={60} />
            <datalist id="invoice-incoterm-options">
              {INCOTERM_OPTIONS.map((term) => <option key={term} value={term} />)}
            </datalist>
          </div>
          <TextField id="portOfLoading" label="装运港" value={form.portOfLoading} onChange={(value) => onChange({ portOfLoading: value })} />
          <TextField id="portOfDischarge" label="卸货港" value={form.portOfDischarge} onChange={(value) => onChange({ portOfDischarge: value })} />
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold">明细行（最多 20 行）</h3>
              <p className="mt-1 text-xs text-muted-foreground">品名建议包含材质、型号与规格，与报关要素一致</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={onAddLine} disabled={form.lines.length >= 20}>
              <Plus className="mr-2 h-4 w-4" />添加明细
            </Button>
          </div>
          {form.lines.map((line, index) => (
            <div key={line.id} className="grid gap-3 rounded-md border bg-muted/20 p-3 lg:grid-cols-[minmax(0,1fr)_130px_90px_140px_44px] lg:items-end">
              <div className="space-y-1.5">
                <Label htmlFor={`${line.id}-description`} className="text-xs text-muted-foreground">第 {index + 1} 行 品名描述</Label>
                <Input id={`${line.id}-description`} value={line.description} onChange={(event) => onLineChange(line.id, 'description', event.target.value)} maxLength={160} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`${line.id}-quantity`} className="text-xs text-muted-foreground">数量</Label>
                <FormattedInput id={`${line.id}-quantity`} value={line.quantity} onChange={(value) => onLineChange(line.id, 'quantity', value)} format="decimal" maxDecimals={2} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`${line.id}-unit`} className="text-xs text-muted-foreground">单位</Label>
                <Input id={`${line.id}-unit`} value={line.unit} onChange={(event) => onLineChange(line.id, 'unit', event.target.value)} maxLength={12} placeholder="PCS" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`${line.id}-unitPrice`} className="text-xs text-muted-foreground">单价 {form.currency}</Label>
                <FormattedInput id={`${line.id}-unitPrice`} value={line.unitPrice} onChange={(value) => onLineChange(line.id, 'unitPrice', value)} format="decimal" maxDecimals={4} />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="删除明细"
                aria-label={`删除第 ${index + 1} 行明细`}
                disabled={form.lines.length <= 1}
                onClick={() => onRemoveLine(line.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="taxPercent">税率 %（外贸常为 0）</Label>
            <FormattedInput id="taxPercent" value={form.taxPercent} onChange={(value) => onChange({ taxPercent: value })} format="decimal" maxDecimals={2} className="h-11 font-medium" />
          </div>
          <TextField id="bankDetails" label="银行信息（可选）" value={form.bankDetails} onChange={(value) => onChange({ bankDetails: value })} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notesText">备注（每行一条）</Label>
          <Textarea id="notesText" value={form.notesText} onChange={(event) => onChange({ notesText: event.target.value })} className="min-h-[72px]" />
        </div>
      </CardContent>
    </Card>
  )
}

interface PartyFieldsProps {
  title: string
  name: string
  address: string
  tel: string
  email: string
  onChange: (patch: { name?: string; address?: string; tel?: string; email?: string }) => void
}

function PartyFields({ title, name, address, tel, email, onChange }: PartyFieldsProps) {
  const field = title.toLowerCase().includes('seller') ? 'seller' : 'buyer'
  return (
    <fieldset className="space-y-3 rounded-md border p-3">
      <legend className="px-1 text-sm font-semibold">{title}</legend>
      <TextField id={`${field}-name`} label="公司名称" value={name} onChange={(value) => onChange({ name: value })} />
      <div className="space-y-2">
        <Label htmlFor={`${field}-address`}>地址</Label>
        <Textarea id={`${field}-address`} value={address} onChange={(event) => onChange({ address: event.target.value })} className="min-h-[64px]" maxLength={300} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <TextField id={`${field}-tel`} label="电话" value={tel} onChange={(value) => onChange({ tel: value })} />
        <TextField id={`${field}-email`} label="邮箱" value={email} onChange={(value) => onChange({ email: value })} />
      </div>
    </fieldset>
  )
}

function TextField({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="font-medium" maxLength={200} />
    </div>
  )
}
