// 名称: YAML 与 JSON 互转工具页面
// 描述: 在浏览器本地完成 YAML 与 JSON 双向转换，展示结构统计、往返校验与错误行号
// 路径: Globokit/app/tools/yaml-json-converter/page.tsx
// 作者: everettlabs
// 更新时间: 2026-09-18

'use client'

import { useMemo, useState } from 'react'
import { ArrowLeftRight, GitCompareArrows, RotateCcw, Shuffle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { EnhancedAlert } from '@/components/ui/enhanced-alert'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { MobileButtonGroup, MobileFriendlyWrapper } from '@/components/tools/mobile-friendly-wrapper'
import { ScenarioPresets } from '@/components/tools/scenario-presets'
import { convertYamlJson } from '@/lib/tools/yaml-json-converter'
import {
  DEFAULT_YAML_JSON_FORM,
  JSON_SAMPLE,
  YAML_JSON_PRESETS,
  YAML_SAMPLE,
  buildYamlJsonSummary,
  getIndentValue,
  getJsonIndentValue,
  type YamlJsonFormState,
} from './yaml-json-page-data'

export default function YamlJsonConverterPage() {
  const [form, setForm] = useState<YamlJsonFormState>(DEFAULT_YAML_JSON_FORM)

  const update = <Key extends keyof YamlJsonFormState>(key: Key, value: YamlJsonFormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const applyPreset = (values: Partial<YamlJsonFormState>) => {
    setForm((current) => ({ ...current, ...values }))
  }

  const conversion = useMemo(
    () =>
      convertYamlJson(form.source, {
        mode: form.mode,
        indent: getIndentValue(form.indent),
        jsonIndent: getJsonIndentValue(form.jsonIndent),
        quoteStyle: form.quoteStyle,
        sortKeys: form.sortKeys,
      }),
    [form]
  )

  const summaryText = useMemo(() => (conversion.ok ? buildYamlJsonSummary(conversion, form) : ''), [conversion, form])

  const stats = [
    { label: '顶层节点', value: conversion.stats.topLevelCount },
    { label: '标量节点', value: conversion.stats.scalarCount },
    { label: '最大层级', value: conversion.stats.maxDepth },
    { label: '输出行数', value: conversion.stats.outputLines },
  ]

  const isYamlInput = form.mode === 'yaml-to-json'

  return (
    <MobileFriendlyWrapper>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">YAML 与 JSON 互转</h1>
        <p className="text-muted-foreground">
          把缩进式 YAML 转成 JSON，或把 JSON 转成 YAML，支持缩进宽度、引号风格与键排序，并给出结构与往返校验结果。
        </p>
      </div>

      <ScenarioPresets presets={YAML_JSON_PRESETS} onSelect={applyPreset} />

      {conversion.error && (
        <EnhancedAlert
          type="error"
          title="转换失败"
          message={
            conversion.error + (conversion.errorLine ? '（第 ' + conversion.errorLine + ' 行）' : '')
          }
          action={{ label: '载入示例', onClick: () => applyPreset({ source: isYamlInput ? YAML_SAMPLE : JSON_SAMPLE }) }}
          className="mt-6"
        />
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ArrowLeftRight className="h-4 w-4" />
              待转换内容
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={isYamlInput ? 'default' : 'outline'}
                onClick={() => update('mode', 'yaml-to-json')}
              >
                YAML → JSON
              </Button>
              <Button
                type="button"
                size="sm"
                variant={isYamlInput ? 'outline' : 'default'}
                onClick={() => update('mode', 'json-to-yaml')}
              >
                JSON → YAML
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => update('source', isYamlInput ? JSON_SAMPLE : YAML_SAMPLE)}
              >
                <Shuffle className="mr-1 h-3.5 w-3.5" />
                切换示例
              </Button>
            </div>

            <Textarea
              id="yaml-json-source"
              aria-label={isYamlInput ? 'YAML 输入' : 'JSON 输入'}
              value={form.source}
              onChange={(event) => update('source', event.target.value)}
              spellCheck={false}
              className="min-h-[320px] font-mono text-xs leading-relaxed"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="yaml-json-indent">YAML 缩进</Label>
                <Select value={form.indent} onValueChange={(value) => update('indent', value as YamlJsonFormState['indent'])}>
                  <SelectTrigger id="yaml-json-indent" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 个空格</SelectItem>
                    <SelectItem value="4">4 个空格</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yaml-json-json-indent">JSON 缩进</Label>
                <Select value={form.jsonIndent} onValueChange={(value) => update('jsonIndent', value as YamlJsonFormState['jsonIndent'])}>
                  <SelectTrigger id="yaml-json-json-indent" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 个空格</SelectItem>
                    <SelectItem value="4">4 个空格</SelectItem>
                    <SelectItem value="0">紧凑（单行）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yaml-json-quote">YAML 字符串引号</Label>
                <Select value={form.quoteStyle} onValueChange={(value) => update('quoteStyle', value as YamlJsonFormState['quoteStyle'])}>
                  <SelectTrigger id="yaml-json-quote" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">自动判断</SelectItem>
                    <SelectItem value="single">全部单引号</SelectItem>
                    <SelectItem value="double">全部双引号</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yaml-json-sort">键排序</Label>
                <Select value={form.sortKeys ? 'on' : 'off'} onValueChange={(value) => update('sortKeys', value === 'on')}>
                  <SelectTrigger id="yaml-json-sort" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="off">保持原有顺序</SelectItem>
                    <SelectItem value="on">按字典序排列</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <MobileButtonGroup>
              <Button type="button" variant="outline" onClick={() => setForm(DEFAULT_YAML_JSON_FORM)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                重置为默认
              </Button>
            </MobileButtonGroup>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-lg">
                <span className="flex items-center gap-2">
                  <GitCompareArrows className="h-4 w-4" />
                  转换结果
                </span>
                {conversion.ok && (
                  <Badge variant={conversion.roundTripOk ? 'default' : 'outline'}>
                    {conversion.roundTripOk ? '往返校验通过' : '往返需复核'}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="font-mono text-xl font-semibold tabular-nums">{stat.value}</p>
                  </div>
                ))}
              </div>

              {conversion.ok ? (
                <>
                  <Textarea
                    aria-label="转换输出"
                    value={conversion.output}
                    readOnly
                    spellCheck={false}
                    className="min-h-[240px] font-mono text-xs leading-relaxed"
                  />
                  <MobileButtonGroup>
                    <EnhancedCopyButton text={conversion.output}>复制结果</EnhancedCopyButton>
                    <EnhancedCopyButton text={summaryText} variant="outline">复制摘要</EnhancedCopyButton>
                  </MobileButtonGroup>
                </>
              ) : (
                <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                  修正输入后查看转换结果
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-2 pt-6 text-xs text-muted-foreground">
              <p>转换完全在本机浏览器执行，内容不会上传到服务器。</p>
              <p>支持块映射、块序列、引号字符串、行尾注释、行内 [] 与 {'{}'} 集合，以及 | 与 &gt; 块标量。</p>
              <p>锚点取内联值、别名以 $ref 标注；自定义标签（!Tag）不在支持范围内。</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileFriendlyWrapper>
  )
}
