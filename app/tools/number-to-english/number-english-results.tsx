// 名称: 数字转英文结果
// 描述: 展示基数词、序数词和最近五次转换记录
// 路径: Globokit/app/tools/number-to-english/number-english-results.tsx
// 作者: everettlabs
// 更新时间: 2026-07-15

import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatNumber, type NumberEnglishHistoryItem } from './number-english-data'

interface NumberEnglishResultsProps {
  number: string
  cardinal: string
  ordinal: string
}

export function NumberEnglishResults(props: NumberEnglishResultsProps) {
  if (!props.cardinal && !props.ordinal) return null
  return (
    <Tabs defaultValue="cardinal" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cardinal">基数词 (Cardinal)</TabsTrigger>
        <TabsTrigger value="ordinal">序数词 (Ordinal)</TabsTrigger>
      </TabsList>
      <ResultTab value="cardinal" title="基数词结果" description="表示数量，如：one, two, three..." result={props.cardinal} number={props.number} />
      <ResultTab value="ordinal" title="序数词结果" description="表示顺序，如：first, second, third..." result={props.ordinal} number={props.number} />
    </Tabs>
  )
}

interface ResultTabProps {
  value: string
  title: string
  description: string
  result: string
  number: string
}

function ResultTab({ value, title, description, result, number }: ResultTabProps) {
  return (
    <TabsContent value={value} className="space-y-2">
      <Card className="border-2 border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            {title}
            <EnhancedCopyButton text={result} variant="ghost" size="sm">复制</EnhancedCopyButton>
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
}

export function NumberEnglishHistory({ history }: NumberEnglishHistoryProps) {
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
                    <HistoryCopy label="基数" text={item.cardinal} />
                    <HistoryCopy label="序数" text={item.ordinal} />
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

function HistoryCopy({ label, text }: { label: string; text: string }) {
  return <EnhancedCopyButton text={text} variant="ghost" size="sm" className="h-8 px-2">{label}</EnhancedCopyButton>
}
