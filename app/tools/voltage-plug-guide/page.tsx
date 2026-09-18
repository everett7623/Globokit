// 名称: 目标市场电压与插头速查
// 描述: 查询主要贸易国家的市电电压、频率与插头类型，辅助电子产品出货适配
// 路径: Globokit/app/tools/voltage-plug-guide/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-16

'use client'

import { useMemo, useState } from 'react'
import { Info, Search } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { PLUG_TYPE_NOTES, VOLTAGE_PLUG_ENTRIES, filterEntries } from './voltage-plug-data'

export default function VoltagePlugGuidePage() {
  const [keyword, setKeyword] = useState('')
  const entries = useMemo(() => filterEntries(VOLTAGE_PLUG_ENTRIES, keyword), [keyword])
  const usedPlugs = useMemo(() => {
    const plugs = new Set<string>()
    VOLTAGE_PLUG_ENTRIES.forEach((entry) => entry.plugs.forEach((plug) => plugs.add(plug)))
    return Array.from(plugs).sort()
  }, [])

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">目标市场电压与插头速查</h1>
        <p className="text-muted-foreground">查询主要贸易国家的市电电压、频率与插头类型，确认电器产品适配与随机插头出货方案</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>国家速查</CardTitle>
          <CardDescription>支持按国家、区域、电压或插头类型（如 110V / Type G）筛选</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="如：日本 / 欧洲 / 110V / G"
              className="h-11 pl-10"
            />
          </div>
          <EnhancedCopyButton
            text={entries
              .map((entry) => `${entry.country}：${entry.voltage} ${entry.frequency}，插头 ${entry.plugs.join('/')}`)
              .join('\n')}
            disabled={entries.length === 0}
          >
            复制当前筛选结果
          </EnhancedCopyButton>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-muted-foreground">
                <tr>
                  <th className="w-32 px-3 py-2 font-medium">国家/地区</th>
                  <th className="w-24 px-3 py-2 font-medium">区域</th>
                  <th className="w-24 px-3 py-2 font-medium">电压</th>
                  <th className="w-24 px-3 py-2 font-medium">频率</th>
                  <th className="px-3 py-2 font-medium">插头类型</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.country} className="border-t">
                    <td className="px-3 py-2 font-medium">{entry.country}</td>
                    <td className="px-3 py-2 text-muted-foreground">{entry.region}</td>
                    <td className="px-3 py-2 tabular-nums">{entry.voltage}</td>
                    <td className="px-3 py-2 tabular-nums">{entry.frequency}</td>
                    <td className="px-3 py-2">{entry.plugs.join(' / ')}</td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr className="border-t">
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      没有匹配“{keyword}”的国家，试试其他关键词
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-semibold">插头类型图例</h2>
            <div className="grid gap-1 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              {usedPlugs.map((plug) => (
                <p key={plug}><span className="font-medium text-foreground">Type {plug}</span>：{PLUG_TYPE_NOTES[plug] ?? '详见 IEC 60083'}</p>
              ))}
            </div>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              以上为民用市电的通用口径，个别国家存在区域差异或历史标准并存；正式出货前请以客户所在地实测或当地官方信息为准。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </MobileFriendlyWrapper>
  )
}
