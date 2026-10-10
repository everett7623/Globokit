// 名称: 邮件签名生成器
// 描述: 实时生成邮件客户端兼容的 HTML 签名与纯文本签名
// 路径: Globokit/app/tools/email-signature-generator/page.tsx
// 作者: everettlabs
// 更新时间: 2026-10-10

'use client'

import { useMemo, useState } from 'react'
import { Code2, Copy, Type } from 'lucide-react'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { generateEmailSignature } from '@/lib/tools/email-signature-generator'
import { EmailSignatureForm, type SignatureFormState } from './email-signature-form'

function createInitialForm(): SignatureFormState {
  return {
    name: 'Everett Zhang',
    title: 'Sales Manager',
    company: 'Globokit Trading Co., Ltd.',
    phone: '+86 574 8888 6666',
    mobile: '+86 138 0000 0000',
    email: 'everett@globokit.com',
    website: 'www.globokit.com',
    address: 'No. 88 Zhongshan East Road, Ningbo, Zhejiang, China',
    whatsapp: '+86 138 0000 0000',
    logoUrl: '',
  }
}

export default function EmailSignatureGeneratorPage() {
  const [form, setForm] = useState<SignatureFormState>(createInitialForm)

  const computation = useMemo<{ html: string; text: string; error: string }>(() => {
    try {
      const signature = generateEmailSignature(form)
      return { html: signature.html, text: signature.text, error: '' }
    } catch (error) {
      return { html: '', text: '', error: error instanceof Error ? error.message : '签名无法生成，请检查输入' }
    }
  }, [form])

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">外贸邮件签名生成器</h1>
        <p className="text-muted-foreground">生成 Outlook、Foxmail、Gmail 兼容的 table 内联样式签名，输入自动转义防注入，复制 HTML 源码粘贴到邮件客户端签名设置即可。</p>
      </div>

      {computation.error && <EnhancedAlert type="error" title="生成失败" message={computation.error} action={{ label: '重置', onClick: () => setForm(createInitialForm()) }} className="mb-6" />}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,1.05fr)]">
        <EmailSignatureForm
          form={form}
          onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
          onReset={() => setForm(createInitialForm())}
        />

        <div className="space-y-6">
          {computation.error ? (
            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">修正表单后查看签名预览</div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Type className="h-5 w-5" />签名预览</CardTitle>
                  <CardDescription>邮件客户端中的实际显示效果（白底模拟）</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border bg-white p-5 dark:bg-white">
                    <div dangerouslySetInnerHTML={{ __html: computation.html }} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <EnhancedCopyButton text={computation.html} variant="outline" size="sm"><Copy className="mr-2 h-4 w-4" />复制 HTML 源码</EnhancedCopyButton>
                    <EnhancedCopyButton text={computation.text} variant="ghost" size="sm">复制纯文本版</EnhancedCopyButton>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base"><Code2 className="h-4 w-4" />HTML 源码</CardTitle>
                  <CardDescription>粘贴到邮件客户端的签名编辑器（源码模式）</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-64 overflow-auto rounded-md border bg-white p-3 font-mono text-xs leading-5 text-slate-700 dark:bg-slate-950 dark:text-slate-300">{computation.html}</pre>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </MobileFriendlyWrapper>
  )
}
