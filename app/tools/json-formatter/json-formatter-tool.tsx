// 名称: JSON 格式化工具
// 描述: 管理 JSON 格式化、压缩及 CSV 双向转换状态
// 路径: Globokit/app/tools/json-formatter/json-formatter-tool.tsx
// 作者: wwj
// 更新时间: 2026-07-15

'use client'

import { useMemo, useState } from 'react'
import { JsonConversionPanels, type ConversionResult } from './json-conversion-panels'
import { JsonFormatPanel, JsonFormatterStats } from './json-format-panel'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { csvToJSON, formatJSON, jsonToCSV, minifyJSON, validateJSON } from '@/lib/tools/json-formatter'

const EMPTY_RESULT: ConversionResult = { success: false, data: '', error: '' }

export default function JSONFormatterTool() {
  const [input, setInput] = useState('')
  const [indent, setIndent] = useState(2)
  const [sortKeys, setSortKeys] = useState(false)
  const [removeNull, setRemoveNull] = useState(false)
  const [activeTab, setActiveTab] = useState('format')
  const [copied, setCopied] = useState(false)
  const [csvInput, setCsvInput] = useState('')

  const validation = useMemo(() => validateJSON(input), [input])
  const formatted = useMemo(() => {
    if (!validation.valid || !input.trim()) return ''
    try {
      return formatJSON(input, { indent, sortKeys, removeNull })
    } catch {
      return ''
    }
  }, [input, validation.valid, indent, sortKeys, removeNull])
  const minified = useMemo(() => {
    if (!validation.valid || !input.trim()) return ''
    try {
      return minifyJSON(input)
    } catch {
      return ''
    }
  }, [input, validation.valid])
  const jsonToCsvResult = useMemo<ConversionResult>(() => {
    if (!input.trim()) return EMPTY_RESULT
    try {
      return { success: true, data: jsonToCSV(input), error: '' }
    } catch (error) {
      return { success: false, data: '', error: String(error) }
    }
  }, [input])
  const csvToJsonResult = useMemo<ConversionResult>(() => {
    if (!csvInput.trim()) return EMPTY_RESULT
    try {
      return { success: true, data: csvToJSON(csvInput), error: '' }
    } catch (error) {
      return { success: false, data: '', error: String(error) }
    }
  }, [csvInput])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  const stats = {
    size: input.length,
    lines: input ? input.split('\n').length : 0,
    minifiedSize: minified.length,
    saved: input.length > 0 ? Math.round(((input.length - minified.length) / input.length) * 100) : 0,
  }

  return (
    <div className="space-y-6">
      <JsonFormatterStats {...stats} isValid={validation.valid} />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="format">格式化</TabsTrigger>
          <TabsTrigger value="convert">转换</TabsTrigger>
          <TabsTrigger value="csv">CSV</TabsTrigger>
        </TabsList>
        <JsonFormatPanel
          input={input}
          indent={indent}
          sortKeys={sortKeys}
          removeNull={removeNull}
          validation={validation}
          formatted={formatted}
          minified={minified}
          copied={copied}
          onInputChange={setInput}
          onIndentChange={setIndent}
          onToggleSortKeys={() => setSortKeys((value) => !value)}
          onToggleRemoveNull={() => setRemoveNull((value) => !value)}
          onCopy={copyToClipboard}
        />
        <JsonConversionPanels
          input={input}
          csvInput={csvInput}
          jsonToCsvResult={jsonToCsvResult}
          csvToJsonResult={csvToJsonResult}
          copied={copied}
          onInputChange={setInput}
          onCsvInputChange={setCsvInput}
          onCopy={copyToClipboard}
        />
      </Tabs>
    </div>
  )
}
