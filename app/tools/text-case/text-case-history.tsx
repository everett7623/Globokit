// 名称: 文本转换结果与历史
// 描述: 展示当前转换结果及最近五次记录
// 路径: Globokit/app/tools/text-case/text-case-history.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { Check, Copy, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { TextCaseHistoryItem } from './text-case-data'

interface TextCaseResultProps {
  output: string
  copiedText: string | null
  onUseAsInput: () => void
  onCopy: (text: string, type: string) => void
}

export function TextCaseResult({ output, copiedText, onUseAsInput, onCopy }: TextCaseResultProps) {
  if (!output) return null
  return (
    <Card className="border-2 border-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          转换结果
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onUseAsInput} title="将结果作为输入"><RefreshCw className="h-4 w-4 mr-1" />作为输入</Button>
            <Button variant="ghost" size="sm" onClick={() => onCopy(output, 'output')}>
              {copiedText === 'output' ? <><Check className="h-4 w-4 mr-1" />已复制</> : <><Copy className="h-4 w-4 mr-1" />复制</>}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent><Textarea value={output} readOnly rows={6} className="bg-background font-mono" /></CardContent>
    </Card>
  )
}

interface TextCaseHistoryProps {
  history: TextCaseHistoryItem[]
  copiedText: string | null
  onCopy: (text: string, type: string) => void
}

export function TextCaseHistory({ history, copiedText, onCopy }: TextCaseHistoryProps) {
  if (history.length === 0) return null
  return (
    <div className="space-y-2">
      <Label>最近转换记录</Label>
      <div className="space-y-2">
        {history.map((item, index) => (
          <Card key={index} className="bg-muted/50">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{item.type}</Badge>
                    <span className="text-xs text-muted-foreground">{item.input.length > 30 ? `${item.input.slice(0, 30)}...` : item.input}</span>
                  </div>
                  <p className="font-mono text-sm">{item.output.length > 50 ? `${item.output.slice(0, 50)}...` : item.output}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onCopy(item.output, `history-${index}`)} className="h-8 w-8 p-0">
                  {copiedText === `history-${index}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
