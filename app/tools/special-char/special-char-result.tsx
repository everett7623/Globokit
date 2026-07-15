// 名称: 特殊字符检查结果
// 描述: 展示字符详情、分类统计和两种清理结果
// 路径: Globokit/app/tools/special-char/special-char-result.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { AlertCircle, Check, CheckCircle, Copy } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import type { SpecialCharResult } from '@/lib/tools/special-char'
import type { SpecialCharStats } from './special-char-data'

interface SpecialCharResultProps {
  result: SpecialCharResult
  stats: SpecialCharStats
  copiedText: string | null
  onCopy: (text: string, type: string) => void
}

const STAT_LABELS: Array<[keyof SpecialCharStats, string]> = [
  ['chinese', '中文字符'],
  ['currency', '货币符号'],
  ['punctuation', '标点符号'],
  ['symbols', '特殊符号'],
  ['other', '其他字符'],
]

export function SpecialCharCheckResult({ result, stats, copiedText, onCopy }: SpecialCharResultProps) {
  return (
    <>
      <Alert variant={result.hasSpecialChars ? 'destructive' : 'default'}>
        {result.hasSpecialChars ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
        <AlertDescription className="font-medium">
          {result.hasSpecialChars ? `发现 ${result.specialChars.length} 个特殊字符，可能在某些系统中显示异常` : '未发现特殊字符，文本可以安全使用'}
        </AlertDescription>
      </Alert>

      {result.hasSpecialChars && (
        <>
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">发现的特殊字符</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {result.specialChars.map((char, index) => <Badge key={index} variant="destructive" className="text-lg px-3 py-1 font-mono">{char}</Badge>)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-3 border-t">
                  {STAT_LABELS.map(([key, label]) => stats[key] > 0 && (
                    <div key={key} className="text-center">
                      <p className="text-2xl font-bold">{stats[key]}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="smart" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="smart">智能替换</TabsTrigger>
              <TabsTrigger value="clean">完全清理</TabsTrigger>
            </TabsList>
            <ResultTab value="smart" title="智能替换结果" description="将特殊字符替换为相近的标准字符，保留原意" text={result.replacedText} copied={copiedText === 'replaced'} onCopy={() => onCopy(result.replacedText, 'replaced')} />
            <ResultTab value="clean" title="完全清理结果" description="仅保留ASCII字符，适合纯英文环境" text={result.cleanedText} copied={copiedText === 'cleaned'} onCopy={() => onCopy(result.cleanedText, 'cleaned')} />
          </Tabs>
        </>
      )}
    </>
  )
}

interface ResultTabProps {
  value: string
  title: string
  description: string
  text: string
  copied: boolean
  onCopy: () => void
}

function ResultTab({ value, title, description, text, copied, onCopy }: ResultTabProps) {
  return (
    <TabsContent value={value} className="space-y-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            {title}
            <Button variant="ghost" size="sm" onClick={onCopy}>
              {copied ? <><Check className="h-4 w-4 mr-1" />已复制</> : <><Copy className="h-4 w-4 mr-1" />复制</>}
            </Button>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent><Textarea value={text} readOnly rows={6} className="bg-muted font-mono" /></CardContent>
      </Card>
    </TabsContent>
  )
}
