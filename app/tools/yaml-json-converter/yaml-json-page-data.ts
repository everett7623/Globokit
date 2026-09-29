// 名称: YAML 与 JSON 互转页面数据
// 描述: 维护表单状态、示例样例、选项文案与结果摘要生成
// 路径: Globokit/app/tools/yaml-json-converter/yaml-json-page-data.ts
// 作者: everettlabs
// 更新时间: 2026-09-18

import type { ConvertResult, JsonIndent, ScalarStyle, YamlJsonMode } from '@/lib/tools/yaml-json-converter'

export interface YamlJsonFormState {
  mode: YamlJsonMode
  source: string
  indent: '2' | '4'
  jsonIndent: '2' | '4' | '0'
  quoteStyle: ScalarStyle
  sortKeys: boolean
}

export const YAML_SAMPLE = [
  'service: globokit',
  'enabled: true',
  'port: 8080',
  'endpoints:',
  '  - path: /api/quote',
  '    method: GET',
  '    cache: true',
  '  - path: /api/order',
  '    method: POST',
  '    cache: false',
  'owners:',
  '  - name: everett',
  '    role: maintainer',
  '# 部署说明',
  'deploy:',
  '  region: ap-east-1',
  '  replicas: 2',
  '  notes: |-',
  '    先灰度发布，再切换流量。',
  '    回滚脚本保留在 scripts/rollback.sh。',
].join('\n')

export const JSON_SAMPLE = [
  '{',
  '  "order": {',
  '    "id": "SO-1001",',
  '    "amount": 12500.5,',
  '    "incoterm": "FOB Shenzhen",',
  '    "contact": "sales@example.com"',
  '  },',
  '  "items": [',
  '    { "sku": "A1", "qty": 200 },',
  '    { "sku": "B2", "qty": 50 }',
  '  ],',
  '  "flags": ["urgent", "repeat"]',
  '}',
].join('\n')

export const DEFAULT_YAML_JSON_FORM: YamlJsonFormState = {
  mode: 'yaml-to-json',
  source: YAML_SAMPLE,
  indent: '2',
  jsonIndent: '2',
  quoteStyle: 'auto',
  sortKeys: false,
}

export interface YamlJsonPreset {
  label: string
  description: string
  values: Partial<YamlJsonFormState>
}

export const YAML_JSON_PRESETS: readonly YamlJsonPreset[] = [
  {
    label: 'K8s 配置',
    description: '读取缩进式 YAML 并输出紧凑 JSON，便于接口调试',
    values: { mode: 'yaml-to-json', source: YAML_SAMPLE, jsonIndent: '2' },
  },
  {
    label: '接口返回',
    description: '把 JSON 响应体转成 YAML，键按字典序排列',
    values: { mode: 'json-to-yaml', source: JSON_SAMPLE, indent: '2', sortKeys: true },
  },
  {
    label: '强引号输出',
    description: '输出时字符串统一加双引号，便于人工核对类型',
    values: { mode: 'json-to-yaml', source: JSON_SAMPLE, quoteStyle: 'double' },
  },
  {
    label: '紧凑 JSON',
    description: '去掉所有缩进，生成适合嵌入环境变量的单行 JSON',
    values: { mode: 'yaml-to-json', source: YAML_SAMPLE, jsonIndent: '0' },
  },
]

export const toNumber = (value: string): number => {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : 0
}

export function buildYamlJsonSummary(result: ConvertResult, form: YamlJsonFormState): string {
  const modeLabel = form.mode === 'yaml-to-json' ? 'YAML → JSON' : 'JSON → YAML'
  return [
    'YAML / JSON 转换结果',
    `转换方向：${modeLabel}`,
    `顶层节点：${result.stats.topLevelCount} 个`,
    `标量节点：${result.stats.scalarCount} 个`,
    `最大层级：第 ${result.stats.maxDepth} 层`,
    `输出行数：${result.stats.outputLines} 行`,
    `往返校验：${result.roundTripOk ? '通过' : '未通过（请核对特殊语法）'}`,
    '注：转换在本机浏览器完成，内容不会上传到服务器。',
  ].join('\n')
}

export function getIndentValue(value: YamlJsonFormState['indent']): 2 | 4 {
  return value === '4' ? 4 : 2
}

export function getJsonIndentValue(value: YamlJsonFormState['jsonIndent']): JsonIndent {
  if (value === '0') return 0
  return value === '4' ? 4 : 2
}
