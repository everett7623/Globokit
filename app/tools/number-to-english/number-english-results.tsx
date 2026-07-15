// 名称: 数字转英文结果
// 描述: 展示基数词、序数词和最近五次转换记录
// 路径: Globokit/app/tools/number-to-english/number-english-results.tsx
// 作者: wwj
// 更新时间: 2026-07-15

import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatNumber, type NumberEnglishHistoryItem } from './number-english-data'

interface NumberEnglishResultsProps {
  number: string
  cardinal: string
  ordinal: string
  copiedText: string | null
  onCopy: (text: string, type: string) => void
}

export function NumberEnglishResults(props: NumberEnglishResultsProps) {
  if (!props.cardinal && !props.ordinal) return null
  return (
    <Tabs defaultValue="cardinal" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cardinal">基数词 (Cardinal)</TabsTrigger>
        <TabsTrigger value="ordinal">序数词 (Ordinal)</TabsTrigger>
      </TabsList>
      <ResultTab value="cardinal" title="基数词结果" description="表示数量，如：one, two, three..." result={props.cardinal} number={props.number} copied={props.copiedText === 'cardinal'} onCopy={() => props.onCopy(props.cardinal, 'cardinal')} />
      <ResultTab value="ordinal" title="序数词结果" description="表示顺序，如：first, second, third..." result={props.ordinal} number={props.number} copied={props.copiedText === 'ordinal'} onCopy={() => props.onCopy(props.ordinal, 'ordinal')} />
    </Tabs>
  )
}

interface ResultTabProps {
  value: string
  title: string
  description: string
  result: string
  number: string
  copied: boolean
  onCopy: () => void
}

function ResultTab({ value, title, description, result, number, copied, onCopy }: ResultTabProps) {
  return (
    <TabsContent value={value} className="space-y-2">
      <Card className="border-2 border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            {title}
            <Button variant="ghost" size="sm" onClick={onCopy}>
              {copied ? <><Check className="h-4 w-4 mr-1" />已复制</> : <><Copy className="h-4 w-4 mr-1" />复制</>}
            </Button>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-primary">{result}</p>
          <p className="text-sm text-muted-foreground mt-2">数字形式：{formatNumber(number)}</p>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

interface NumberEnglishHistoryProps {
  history: NumberEnglishHistoryItem[]
  copiedText: string | null
  onCopy: (text: string, type: string) => void
}

export function NumberEnglishHistory({ history, copiedText, onCopy }: NumberEnglishHistoryProps) {
  if (history.length === 0) return null
  return (
    <div className="space-y-2">
      <Label>最近转换记录</Label>
      <div className="space-y-2">
        {history.map((item, index) => (
          <Card key={index} className="bg-muted/50">
            <CardContent className="pt-3 pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-semibold">{formatNumber(item.number)}</span>
                  <div className="flex gap-1">
                    <HistoryCopy label="基数" copied={copiedText === `history-cardinal-${index}`} onClick={() => onCopy(item.cardinal, `history-cardinal-${index}`)} />
                    <HistoryCopy label="序数" copied={copiedText === `history-ordinal-${index}`} onClick={() => onCopy(item.ordinal, `history-ordinal-${index}`)} />
                  </div>
                </div>
                <div className="grid gap-1 text-sm">
                  <div><span className="text-muted-foreground">基数：</span><span className="ml-2">{item.cardinal}</span></div>
                  <div><span className="text-muted-foreground">序数：</span><span className="ml-2">{item.ordinal}</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function HistoryCopy({ label, copied, onClick }: { label: string; copied: boolean; onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="h-8 px-2">
      {copied ? <Check className="h-3 w-3" /> : <><Copy className="h-3 w-3 mr-1" /><span className="text-xs">{label}</span></>}
    </Button>
  )
}
