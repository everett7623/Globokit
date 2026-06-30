'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Check, Copy, Search, Ship, Truck } from 'lucide-react'
import {
  INCOTERMS_2020,
  type IncotermTransportMode,
  searchIncoterms,
} from '@/lib/tools/incoterms'

export default function IncotermsTool() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<IncotermTransportMode>('any')
  const [copied, setCopied] = useState<string | null>(null)

  const results = useMemo(() => searchIncoterms(query, mode), [query, mode])

  const copyTerm = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">术语总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{INCOTERMS_2020.length}</div>
            <p className="text-xs text-muted-foreground">Incoterms 2020</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">当前匹配</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground">已按筛选条件过滤</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">适用范围</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11 条</div>
            <p className="text-xs text-muted-foreground">全运输 + 海运专属</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>检索条件</CardTitle>
          <CardDescription>支持按术语缩写、英文名、中文名或摘要关键词搜索</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="incoterm-query">关键词</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="incoterm-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例如：FOB / 海运 / 完税"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>运输方式</Label>
            <Select value={mode} onValueChange={(value: IncotermTransportMode) => setMode(value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择运输方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">全部运输方式</SelectItem>
                <SelectItem value="sea">仅海运/内河运输术语</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {results.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              未找到匹配术语，请更换关键词或筛选条件。
            </CardContent>
          </Card>
        )}

        {results.map((item) => {
          const isSeaOnly = item.mode === 'sea'
          const copyText = `${item.code} - ${item.nameEn} (${item.nameCn})`

          return (
            <Card key={item.code} className="border-l-4 border-l-emerald-500">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{item.code}</CardTitle>
                    <Badge variant="outline">{item.nameEn}</Badge>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      {item.nameCn}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {isSeaOnly ? <Ship className="h-3 w-3" /> : <Truck className="h-3 w-3" />}
                      {isSeaOnly ? '仅海运' : '全运输方式'}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => copyTerm(copyText)}>
                      {copied === copyText ? (
                        <>
                          <Check className="mr-1 h-4 w-4" />已复制
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1 h-4 w-4" />复制
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">{item.summary}</p>
                <div className="grid gap-2 md:grid-cols-2">
                  <p><span className="font-medium">风险转移：</span>{item.riskTransfer}</p>
                  <p><span className="font-medium">常见场景：</span>{item.typicalUse}</p>
                  <p><span className="font-medium">卖方费用责任：</span>{item.sellerCost}</p>
                  <p><span className="font-medium">买方费用责任：</span>{item.buyerCost}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
