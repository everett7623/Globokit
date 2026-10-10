// 名称: 邮件签名表单
// 描述: 采集签名要素并实时生成
// 路径: Globokit/app/tools/email-signature-generator/email-signature-form.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

import { IdCard, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface SignatureFormState {
  name: string
  title: string
  company: string
  phone: string
  mobile: string
  email: string
  website: string
  address: string
  whatsapp: string
  logoUrl: string
}

export interface EmailSignatureFormProps {
  form: SignatureFormState
  onChange: (patch: Partial<SignatureFormState>) => void
  onReset: () => void
}

export function EmailSignatureForm({ form, onChange, onReset }: EmailSignatureFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><IdCard className="h-5 w-5" />签名信息</CardTitle>
            <CardDescription>除姓名、邮箱外均可留空，实时生成右侧预览</CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />重置
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="name" label="姓名 *" value={form.name} onChange={(value) => onChange({ name: value })} placeholder="Everett Zhang" autoFocus />
          <Field id="title" label="职位" value={form.title} onChange={(value) => onChange({ title: value })} placeholder="Sales Manager" />
          <Field id="company" label="公司" value={form.company} onChange={(value) => onChange({ company: value })} placeholder="Globokit Trading Co., Ltd." />
          <Field id="email" label="邮箱 *" value={form.email} onChange={(value) => onChange({ email: value })} placeholder="everett@globokit.com" />
          <Field id="phone" label="座机 / 传真" value={form.phone} onChange={(value) => onChange({ phone: value })} placeholder="+86 574 8888 6666" />
          <Field id="mobile" label="手机 / WhatsApp 号" value={form.mobile} onChange={(value) => onChange({ mobile: value })} placeholder="+86 138 0000 0000" />
          <Field id="whatsapp" label="WhatsApp 显示文本" value={form.whatsapp} onChange={(value) => onChange({ whatsapp: value })} placeholder="+86 138 0000 0000" />
          <Field id="website" label="网站" value={form.website} onChange={(value) => onChange({ website: value })} placeholder="www.globokit.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">公司地址</Label>
          <Input id="address" value={form.address} onChange={(event) => onChange({ address: event.target.value })} className="h-11 font-medium" maxLength={160} placeholder="No. 88 Zhongshan East Road, Ningbo, China" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logoUrl">Logo 图片地址（可选，建议 https 直链）</Label>
          <Input id="logoUrl" value={form.logoUrl} onChange={(event) => onChange({ logoUrl: event.target.value })} className="h-11 font-medium" maxLength={300} placeholder="https://example.com/logo.png" />
          <p className="text-xs text-muted-foreground">多数邮件客户端要求图片为可公开访问的 https 直链，收件人打开邮件时才会加载。</p>
        </div>
      </CardContent>
    </Card>
  )
}

function Field({ id, label, value, onChange, placeholder, autoFocus = false }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; autoFocus?: boolean }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-11 font-medium" maxLength={120} autoFocus={autoFocus} />
    </div>
  )
}
