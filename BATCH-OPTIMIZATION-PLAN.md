# 批量优化工具列表

## 原待优化工具 (13个，已完成)

### 高优先级 (财务/物流类 - 5个)
1. ✅ 进口成本计算器 (import-landed-cost-calculator)
2. ✅ 海运费用计算器 (ocean-freight-calculator)  
3. ✅ 报关费用估算器 (customs-cost-calculator)
4. ✅ 出口退税计算器 (export-tax-rebate-calculator)
5. ✅ 托盘装载计算器 (pallet-load-calculator)

### 中优先级 (查询/对比类 - 4个)
6. ✅ 快递渠道对比 (express-channel-comparison)
7. ✅ 货代报价核对 (freight-charge-audit)
8. ✅ 国家资料查询 (global-country-info)
9. ✅ 节假日查询 (holiday-query)

### 低优先级 (文本/其他 - 4个)
10. ✅ 文本大小写转换 (text-case)
11. ✅ 特殊字符检查 (special-char)
12. ✅ 拼音转换 (pinyin)
13. ✅ 数字转英文 (number-to-english)

## 优化策略

### 简单工具 (无复制功能)
- 货币符号查询 (currency-symbols)
- 条码生成器 (barcode-generator)
- 交期计算器 (delivery-date-calculator)
- Incoterms查询 (incoterms)
- JSON格式化 (json-formatter)
- 人民币大写 (rmb-converter)
- 世界时间 (world-time)
- VPS计算器 (vps-calculator)

**这些工具只需添加 MobileFriendlyWrapper 包装器即可**

## 优化步骤

### 1. 有复制功能的工具 (13个)
```tsx
// 移除
const [copied, setCopied] = useState(false)
const copySummary = async () => { /* ... */ }

// 替换为
<EnhancedCopyButton text={summaryText}>复制</EnhancedCopyButton>
```

### 2. 所有工具添加移动端优化
```tsx
<MobileFriendlyWrapper>
  {/* 页面内容 */}
</MobileFriendlyWrapper>
```

### 3. 错误提示增强
```tsx
<EnhancedAlert
  type="error"
  message={error}
  action={{ label: '重置', onClick: reset }}
/>
```

## 预计时间

- **简单工具** (8个): 2分钟/个 = 16分钟
- **复杂工具** (13个): 5分钟/个 = 65分钟

**总计**: ~80分钟 (1.3小时)

## 批量优化顺序

1. 先优化高频、复杂的财务/物流工具 (5个)
2. 再优化查询/对比类工具 (4个)
3. 最后优化文本处理工具 (4个)
4. 简单工具快速添加包装器 (8个)

---

**目标**: 完成所有工具的用户体验优化
**当前进度**: 28/28 (100%)
**剩余**: 0 个工具

## 2026-08-11 核对结果

- 代码扫描确认 `app/tools` 下 28 个工具页面均包含 `MobileFriendlyWrapper`。
- 所有工具页的剪贴板写入已收敛到 `EnhancedCopyButton`，国家资料查询的旧 `CopyButton` 仅保留兼容调用接口并委托给增强组件。
- 复制组件支持现代 Clipboard API、权限受限时的文本框降级、复制失败反馈以及紧凑的 `iconOnly` 模式。
