# 用户体验增强组件应用指南

本文档说明如何在现有工具页面中应用新的用户体验增强组件。

## 📦 可用组件

| 组件 | 路径 | 用途 |
|------|------|------|
| **EnhancedCopyButton** | `@/components/tools/enhanced-copy-button` | 替换普通复制按钮 |
| **FormattedInput** | `@/components/ui/formatted-input` | 替换数字输入框 |
| **MobileFriendlyWrapper** | `@/components/tools/mobile-friendly-wrapper` | 包裹工具页面内容 |
| **LoadingIndicator** | `@/components/ui/loading-indicator` | 显示加载状态 |
| **EnhancedAlert** | `@/components/ui/enhanced-alert` | 替换普通 Alert |

## 🎯 应用步骤

### 1. 替换复制按钮

**之前:**
```tsx
const [copied, setCopied] = useState(false)

const handleCopy = async () => {
  await navigator.clipboard.writeText(text)
  setCopied(true)
  setTimeout(() => setCopied(false), 1800)
}

<Button onClick={handleCopy}>
  {copied ? <Check /> : <ClipboardCopy />}
  {copied ? '已复制' : '复制结果'}
</Button>
```

**之后:**
```tsx
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'

<EnhancedCopyButton 
  text={summaryText}
  onCopy={() => console.log('复制成功')}
>
  复制结果
</EnhancedCopyButton>
```

**优点:**
- ✅ 自动处理复制逻辑和状态管理
- ✅ 内置错误处理
- ✅ 视觉反馈更清晰
- ✅ 减少代码量

### 2. 升级数字输入框

**之前:**
```tsx
<Input
  type="text"
  inputMode="decimal"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**之后:**
```tsx
import { FormattedInput } from '@/components/ui/formatted-input'

<FormattedInput
  value={value}
  onChange={setValue}
  onEnter={handleSubmit}  // Enter键提交
  format="decimal"         // 自动格式化
  autoFocusFirst          // 首个输入框自动聚焦
  placeholder="请输入数字"
/>
```

**优点:**
- ✅ 千分位分隔符（失焦时显示）
- ✅ 移动端自动数字键盘
- ✅ Enter 键快速提交
- ✅ 实时输入验证
- ✅ 首个输入框自动聚焦

### 3. 添加移动端优化

**之前:**
```tsx
<div className="space-y-6">
  <div className="flex gap-2">
    <Button>按钮1</Button>
    <Button>按钮2</Button>
  </div>
  {/* 表单内容 */}
</div>
```

**之后:**
```tsx
import { MobileFriendlyWrapper, MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'

<MobileFriendlyWrapper>
  <MobileButtonGroup>
    <Button>按钮1</Button>
    <Button>按钮2</Button>
  </MobileButtonGroup>
  {/* 表单内容 */}
</MobileFriendlyWrapper>
```

**优点:**
- ✅ 触摸区域最小 44x44px
- ✅ 按钮间距增加防误触
- ✅ 自动换行支持
- ✅ 禁用双击缩放

### 4. 改进错误提示

**之前:**
```tsx
{error && (
  <Alert variant="destructive">
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

**之后:**
```tsx
import { EnhancedAlert } from '@/components/ui/enhanced-alert'

{error && (
  <EnhancedAlert
    type="error"
    title="计算错误"
    message={error}
    action={{ 
      label: '重置', 
      onClick: handleReset 
    }}
  />
)}
```

**优点:**
- ✅ 清晰的图标辅助识别
- ✅ 可操作的恢复建议
- ✅ ARIA 可访问性支持
- ✅ 4种类型：error, warning, info, success

### 5. 添加加载状态

**之前:**
```tsx
{loading && <p>加载中...</p>}
```

**之后:**
```tsx
import { LoadingIndicator } from '@/components/ui/loading-indicator'

{loading && <LoadingIndicator size="md" text="计算中..." />}
```

**优点:**
- ✅ 统一的视觉风格
- ✅ 3种尺寸可选
- ✅ 动画效果流畅

## 📝 完整示例：改造现有工具页面

### 示例：改造单位换算器

**改造前:**
```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ToolPage() {
  const [value, setValue] = useState('100')
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  
  return (
    <div className="space-y-6">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleCopy}>
        {copied ? '已复制' : '复制结果'}
      </Button>
    </div>
  )
}
```

**改造后:**
```tsx
'use client'

import { useState } from 'react'
import { EnhancedCopyButton } from '@/components/tools/enhanced-copy-button'
import { FormattedInput } from '@/components/ui/formatted-input'
import { MobileFriendlyWrapper, MobileButtonGroup } from '@/components/tools/mobile-friendly-wrapper'

export default function ToolPage() {
  const [value, setValue] = useState('100')
  
  const handleSubmit = () => {
    // Enter键提交逻辑
    console.log('提交:', value)
  }
  
  return (
    <MobileFriendlyWrapper>
      <FormattedInput
        value={value}
        onChange={setValue}
        onEnter={handleSubmit}
        format="decimal"
        autoFocusFirst
        placeholder="请输入数字"
      />
      <MobileButtonGroup>
        <EnhancedCopyButton text={value}>
          复制结果
        </EnhancedCopyButton>
      </MobileButtonGroup>
    </MobileFriendlyWrapper>
  )
}
```

**改进点:**
- ✅ 减少 30+ 行代码
- ✅ 自动聚焦首个输入框
- ✅ Enter 键快速提交
- ✅ 千分位格式化
- ✅ 移动端优化
- ✅ 复制状态自动管理

## 🔄 迁移检查清单

在应用新组件时，请检查以下项目：

### 复制按钮迁移
- [ ] 导入 `EnhancedCopyButton`
- [ ] 删除 `copied` 状态
- [ ] 删除 `handleCopy` 函数
- [ ] 替换 Button 为 EnhancedCopyButton
- [ ] 测试复制功能

### 数字输入迁移
- [ ] 导入 `FormattedInput`
- [ ] 替换 Input 为 FormattedInput
- [ ] 添加 `format` 属性
- [ ] 添加 `onEnter` 处理（可选）
- [ ] 首个输入框添加 `autoFocusFirst`
- [ ] 测试输入和格式化

### 移动端优化
- [ ] 导入 `MobileFriendlyWrapper` 和 `MobileButtonGroup`
- [ ] 用 MobileFriendlyWrapper 包裹页面内容
- [ ] 按钮组使用 MobileButtonGroup
- [ ] 移动端设备测试

### 错误提示迁移
- [ ] 导入 `EnhancedAlert`
- [ ] 替换 Alert 为 EnhancedAlert
- [ ] 添加 `type` 属性
- [ ] 添加恢复 `action`（可选）
- [ ] 测试不同类型的提示

## 🎯 优先级建议

### 高优先级（立即应用）
1. **报价计算器** - 使用频率最高
2. **装柜计算器** - 用户反馈最多
3. **单位换算器** - 输入最频繁

### 中优先级（本周完成）
4. **空运计费重计算器**
5. **进口成本计算器**
6. **海运费用计算器**

### 低优先级（逐步迁移）
7. 其他 20+ 个工具页面

## ⚠️ 注意事项

1. **保持向后兼容** - 不要破坏现有功能
2. **逐步迁移** - 一次迁移一个工具，充分测试
3. **保留旧代码** - 迁移前先备份
4. **测试移动端** - 确保触摸体验良好
5. **检查可访问性** - 确保键盘导航正常

## 📚 参考资源

- [WCAG 2.1 AA 标准](https://www.w3.org/WAI/WCAG21/quickref/)
- [移动端触摸目标尺寸](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [键盘可访问性](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)

---

**维护者**: everettlabs  
**最后更新**: 2026-07-30
