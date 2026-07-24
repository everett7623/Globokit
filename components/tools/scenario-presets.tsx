// 名称: 工具场景预设
// 描述: 为计算类工具提供一致的外贸常用场景入口
// 路径: Globokit/components/tools/scenario-presets.tsx
// 作者: everettlabs
// 更新时间: 2026-07-24

import { Button } from '@/components/ui/button'

export interface ScenarioPreset<TValues> {
  label: string
  description: string
  values: TValues
}

interface ScenarioPresetsProps<TValues> {
  presets: readonly ScenarioPreset<TValues>[]
  onSelect: (values: TValues) => void
}

export function ScenarioPresets<TValues>({ presets, onSelect }: ScenarioPresetsProps<TValues>) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">常用场景</p>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button key={preset.label} type="button" variant="outline" size="sm" title={preset.description} onClick={() => onSelect(preset.values)}>
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
