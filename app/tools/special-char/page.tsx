// 名称: 特殊字符检查与转换
// 描述: 检查文本中的特殊字符，并提供清理或替换选项
// 路径: seedtool/app/tools/special-char/page.tsx
// 作者: Jensfrank
// 更新时间: 2025-07-21

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CopyButton } from '@/components/tools/copy-button'
import { checkSpecialChars } from '@/lib/tools/special-char'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function SpecialCharPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ReturnType<typeof checkSpecialChars> | null>(null)

  const handleCheck = () => {
    if (input) {
      setResult(checkSpecialChars(input))
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>特殊字符检查与转换</CardTitle>
            <CardDescription>
              检查文本中的特殊字符，并提供清理或替换选项，避免在邮件或文档中出现乱码
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">输入文本</Label>
              <Textarea
                id="input"
                placeholder="粘贴需要检查的文本..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
              />
            </div>

            <Button onClick={handleCheck} className="w-full">
              检查特殊字符
            </Button>

            {result && (
              <div className="space-y-4">
                <Alert variant={result.hasSpecialChars ? "destructive" : "default"}>
                  {result.hasSpecialChars ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>
                    {result.hasSpecialChars
                      ? `发现 ${result.specialChars.length} 个特殊字符`
                      : '未发现特殊字符'}
                  </AlertDescription>
                </Alert>

                {result.hasSpecialChars && (
                  <>
                    <div className="space-y-2">
                      <Label>发现的特殊字符</Label>
                      <div className="rounded-md border bg-muted p-4">
                        <p className="font-mono text-lg space-x-2">
                          {result.specialChars.map((char, index) => (
                            <span key={index} className="inline-block bg-destructive/20 px-2 py-1 rounded">
                              {char}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>智能替换结果</Label>
                        <CopyButton text={result.replacedText} />
                      </div>
                      <Textarea
                        value={result.replacedText}
                        readOnly
                        rows={6}
                        className="bg-muted"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>完全清理结果（仅保留ASCII字符）</Label>
                        <CopyButton text={result.cleanedText} />
                      </div>
                      <Textarea
                        value={result.cleanedText}
                        readOnly
                        rows={6}
                        className="bg-muted"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">功能说明：</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>自动检测中英文标点、特殊符号等</li>
                <li>智能替换：将特殊字符替换为相近的标准字符</li>
                <li>完全清理：只保留标准ASCII字符，适合纯英文环境</li>
                <li>常见场景：邮件发送、文档编辑、系统录入等</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
