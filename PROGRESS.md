# 开发进度记录

## 2026-07-13

### 已完成

- 阅读 `README.md`、上一轮 `PROGRESS.md`、工具注册表与近期提交，确认当前代码已同步至 `origin/main`，且没有明确遗留的代码 TODO。
- 同步 `README.md` 与当前实现：
  - 补充出口退税计算器、快递渠道价格对比和报关费用估算器的功能说明。
  - 补充托盘装载、出口退税、快递比价和报关费用工具的页面与算法目录。

### 验证结果

- `git diff --check` 通过。
- README 页面目录与 `app/tools` 中的实际工具页面一致。
- README 算法目录与 `lib/tools` 中的核心工具文件一致。

## 2026-07-12

### 已完成

- 新增托盘装载计算器：
  - 计算逻辑：`lib/tools/pallet-load-calculator.ts`
  - 工具页面：`app/tools/pallet-load-calculator/page.tsx`
  - 支持中国标准、欧标和北美标准托盘。
  - 按纸箱旋转方向、托盘限高和含托限重计算单层箱数、码放层数、单托箱数与所需托盘数。
  - 输出含托高度、单托毛重、空间利用率及尺寸/载重限制提示。
- 接入工具注册表、首页配色、导航、相关工具和 sitemap 自动生成链路。

### 验证结果

- `npm run lint` 通过，且无 warnings/errors。
- `npx tsc --noEmit` 通过。

## 2026-07-11

### 已完成

- 新增出口退税计算器：支持含税/未税采购口径、进项税拆分、退税额、征退税差、FOB 收入和退税后利润测算。

- 完成全站工具代码审计并修复边界问题：
  - 修复人民币大写转换在金额跨元进位及亿元以上单位错误。
  - 修复 JSON 空输入显示 `NaN%`、JSON 转 CSV 丢失后续字段、CSV 多行引号字段解析错误。
  - 修复超尺寸纸箱仍被判定可装柜的问题。
  - 修复即将到来节假日跨年遗漏及日期受 UTC 时区偏移的问题。
  - 收紧数字转英文与人民币金额的非法输入校验，并修复 `nine` 的序数词。
- 新增快递渠道价格对比工具，支持三渠道实际报价、附加费、每公斤/每件成本及成本与时效双排名。

- 新增报关费用估算器：
  - 计算逻辑：`lib/tools/customs-cost-calculator.ts`
  - 工具页面：`app/tools/customs-cost-calculator/page.tsx`
  - 支持出口报关与进口清关两种预算口径。
  - 支持基础报关费、品名超项费、单证费、代理费、查验、港区操作、仓储、国内运输和其他费用。
  - 按查验概率计算期望成本，并输出费用合计、每票成本、每件摊费和货值占比。
- 接入工具注册表、首页图标样式、相关工具和 sitemap 自动生成链路。

### 验证结果

- `npm run lint` 通过，且无 warnings/errors。
- `npx tsc --noEmit` 通过。
- `npm run build` 通过，新路由 `/tools/customs-cost-calculator` 已进入静态页面列表。

## 2026-07-08

### 已完成

- 拉取远程 `origin/main`，当前代码已是最新。
- 阅读 `README.md` 与上一轮 `PROGRESS.md`，确认本轮继续处理非交互 lint 配置。
- 新增 `.eslintrc.json`，启用 Next.js 官方 `next/core-web-vitals` ESLint 规则集。
- 修复现有页面中的 JSX 未转义引号 lint 错误。
- 清理 hook 依赖、导航筛选数组引用和 VPSKnow 外部图片相关 lint 警告。
- 修复空运/快递计费重计算器与装柜/箱规计算器数字输入中断问题：
  - 将页面内部定义的 `NumberField` 提升为稳定组件，避免每次输入触发组件重挂载。
  - 使用浏览器实测连续输入，多位数字可以完整输入且焦点保持在当前输入框。
- 调整空运/快递计费重计算器默认值：
  - 默认箱规改为 `43 x 33 x 22 cm`。
  - 默认单箱毛重改为 `13 kg`，并新增单箱净重字段，默认 `12 kg`。
- 排查报价、人民币大写、数字转英文、VPS 等数字输入型工具，未发现同类重挂载问题。
- 新增海运费用拆分计算器：
  - 计算逻辑：`lib/tools/ocean-freight-calculator.ts`
  - 工具页面：`app/tools/ocean-freight-calculator/page.tsx`
  - 支持整柜 FCL 与拼箱 LCL，按海运费、港杂、拖车、报关、文件、保险和目的港费用测算每件、每公斤、每 CBM 与每柜成本。
- 新增进口到岸成本计算器：
  - 计算逻辑：`lib/tools/import-landed-cost-calculator.ts`
  - 工具页面：`app/tools/import-landed-cost-calculator/page.tsx`
  - 支持按货值、国际运费、保险、关税、进口增值税、清关与本地费用测算到岸总成本、每件成本和销售毛利率。
- 升级外贸报价利润计算器：
  - 新增 EXW、FCA、FAS、FOB、CFR、CIF、CPT、CIP、DAP、DPU、DDP 条款选择。
  - 按条款自动判断卖方计入成本，并拆分展示未计入报价的买方/后续费用。
  - 对 CFR/CIF/CPT/CIP/DAP/DPU/DDP 等含运输或到门条款提示补充国际运输费、保险费、目的地费用或进口清关税费。
- 接入工具注册表、首页图标映射、相关工具、UI 配色和 sitemap 自动生成链路。
- 更新 `README.md`，补充海运费用拆分工具介绍及目录结构。
- 更新 `README.md`，补充进口到岸成本工具介绍及目录结构。
- 更新首页 Hero 昼夜视觉：
  - 新增 `public/hero-trade-day.png` 与 `public/hero-trade-night.png` 两张 bitmap 背景图。
  - 首页 Hero 根据主题在日间/夜间背景之间切换，并调整日间文字、按钮和高频入口面板对比度。
  - 主题切换按钮移除可见中文文案，改为纯图标按钮，仅保留英文 `aria-label`。

### 验证结果

- 浏览器实测空运和装柜工具连续输入数字不再中断。
- 浏览器实测海运费用拆分计算器连续输入数字不丢焦点，切换拼箱口径后结果区域正常显示。
- 浏览器脚本实测进口到岸成本计算器页面渲染正常，连续输入 `12345` 后值完整保留且焦点停留在当前输入框。
- 浏览器脚本实测报价利润计算器条款切换正常：CIF 缺少运费/保险时会提示，补充后提示消失，卖方计入成本与未计入费用区域正常显示。
- 本地 Chrome 实测首页日夜切换后 Hero 背景图层 opacity 正确切换，主题按钮可见文本为空且无中文。
- `npm run lint` 通过，且无 warnings/errors。
- `npx tsc --noEmit` 通过。
- `npm run build` 通过，报价利润计算器、`/tools/ocean-freight-calculator` 与 `/tools/import-landed-cost-calculator` 均已进入静态页面列表，当前共 24 个静态路由。

## 2026-07-07

### 已完成

- 阅读并同步 `README.md` 中的项目开发说明与目录结构。
- 新增空运/快递计费重计算工具：
  - 计算逻辑：`lib/tools/air-freight-calculator.ts`
  - 工具页面：`app/tools/air-freight-calculator/page.tsx`
- 工具支持箱规、实重、箱数、泡重系数、每公斤运价、最低收费、燃油附加和操作/杂费输入。
- 支持快递 5000、空运 6000、经济 7000 与自定义泡重口径。
- 接入工具注册表、首页高频入口、导航精选入口、相关工具、UI 配色和 sitemap 自动生成链路。
- 更新 `README.md`，补充物流与出货工具介绍及当前目录结构。

### 验证结果

- `npm run build` 通过，新路由 `/tools/air-freight-calculator` 已进入静态页面列表。
- `npx tsc --noEmit` 通过。
- 浏览器实测页面渲染正常，修改箱数后计费重量和费用可即时重算。
- `npm run lint` 当前会触发 Next.js 首次 ESLint 配置向导，尚未进入实际 lint 检查。

### Git 状态

- 已提交并推送到 `origin/main`。
- 提交记录：`806e1ef Add air freight calculator`

### 后续建议

- 增加 ESLint 配置，让 `npm run lint` 可在非交互环境中运行。
- 后续新增工具时优先维护 `lib/tools/registry.ts`，让导航、首页、相关工具和 sitemap 自动同步。
- 可继续补充更多物流工具，例如海运费用拆分、快递渠道价格对比或报关费用估算。
