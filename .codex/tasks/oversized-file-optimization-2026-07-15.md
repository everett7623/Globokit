# 超限文件结构优化

- 日期：2026-07-15
- 状态：已完成
- 基线：扫描 85 个代码文件，24 个文件超过项目有效行数限制

## 目标

- 将可维护的 TSX/TS 业务文件拆分到项目限制以内。
- 保持页面字段、显示顺序、交互状态、导出接口与 URL 不变。
- 生成数据和大型静态资料单独分类，避免用机械拆分掩盖数据资产属性。

## TODO

- [x] 用户确认继续后续优化任务。
- [x] 读取体量、重构、字段映射与前端安全规范。
- [x] 完整读取并分类 24 个超限文件，记录治理策略与依赖边界。
- [x] 第一批：公共入口（工具注册表、导航、首页）低风险拆分。
- [x] 第二批：自包含工具页面按 UI、状态与纯函数职责拆分。
- [x] 第三批：国家/节假日大型数据文件按生成物或数据模块治理。
- [x] 逐批执行字段/枚举/条件分支对比与关键页面回归。
- [x] 执行全量行数扫描、Lint、类型检查和生产构建。
- [x] 更新 `README.md`、`PROGRESS.md` 与本任务状态。

## 基线超限清单

### 生成数据与大型资料

- `lib/tools/holiday-query-generated.ts`
- `lib/tools/global-country-info.ts`
- `lib/tools/holiday-query.ts`

### 公共入口

- `components/layout/navigation.tsx`
- `app/page.tsx`
- `lib/tools/registry.ts`

### 工具与资源页面

- `app/tools/global-country-info/page.tsx`
- `app/tools/holiday-query/page.tsx`
- `app/tools/quote-calculator/page.tsx`
- `app/tools/vps-calculator/page.tsx`
- `app/tools/air-freight-calculator/page.tsx`
- `app/tools/import-landed-cost-calculator/page.tsx`
- `app/tools/special-char/page.tsx`
- `app/tools/number-to-english/page.tsx`
- `app/tools/world-time/page.tsx`
- `app/tools/ocean-freight-calculator/page.tsx`
- `app/tools/text-case/page.tsx`
- `app/tools/pinyin/page.tsx`
- `app/tools/currency-symbols/page.tsx`
- `app/tools/container-load-calculator/page.tsx`
- `app/tools/json-formatter/json-formatter-tool.tsx`
- `app/resources/page.tsx`
- `app/tools/rmb-converter/page.tsx`
- `lib/tools/world-time.ts`

## 安全边界

- 不更改业务计算公式、静态数据内容、工具 slug、分类或相关工具关系。
- 不因拆分而新增全局忽略、跳过类型检查或关闭 ESLint 规则。
- 每个原始文件在拆分前完整读取；涉及字段、枚举和条件渲染时制作对比清单。
- 新模块保持单向依赖，禁止子模块反向导入页面入口形成循环引用。

## 第一批对比结果

- 工具注册表：原有 21 项元数据经 AST 逐字段对比完全一致，条码工具仍作为第 22 项追加；分类顺序和数量不变。
- 首页：Hero 5 项、业务流程 4 项、分类 8 项、精选资源 8 项及各区块顺序不变。
- 导航：4 个状态仍由根组件持有；桌面 8 个分类、5 个新工具、3 个精选入口及移动端完整分类列表不变。
- 入口有效行数：`registry.ts` 411 → 28，`app/page.tsx` 442 → 16，`navigation.tsx` 495 → 62。
- 浏览器回归：首页、桌面工具菜单、分类切换和“条码”搜索正常，无错误覆盖层。

## 第二批进度

- 资源页：分类顺序、图标样式、锚点、统计口径、资源卡字段及主机/域名宽栏条件不变；入口有效行数 `289 → 115`。
- 人民币转换页：金额校验、转换、复制与最近 5 条历史逻辑留在入口，仅提取统计和静态示例；入口有效行数 `268 → 180`。
- 第二批已完成部分通过 TypeScript 与定向 ESLint 检查。
- JSON 格式化、币种符号、特殊字符、文本大小写、数字英文、拼音、世界时间、集装箱装载、海运、空运、进口落地成本、VPS、报价、全球国家资料和节假日查询页均已按状态容器、表单、结果、静态说明等职责拆分。
- `lib/tools/world-time.ts` 的时区计算纯函数已独立到计算模块，原有城市数据、夏令时判断与格式化入口不变。
- 21 个页面/公共组件超限项已全部清零；TypeScript 与各目录定向 ESLint 检查通过。
- 当前全量扫描仅剩 3 个数据/规则类超限文件：`holiday-query-generated.ts`、`global-country-info.ts`、`holiday-query.ts`。

## 第三批与最终结果

- 使用 TypeScript AST 识别并完整提取大型静态声明；迁移前后 6 份数据的规范化 SHA-256 哈希一致。
- 国家资料、国家覆盖、国际/宗教节日、2025 年数据、2026 年人工修订和 2026/2027 生成数据已迁移到 `lib/tools/data`，原导出名与查询入口不变。
- `global-country-info.ts` 有效行数 `6610 → 80`，`holiday-query-generated.ts` `22426 → 6`，`holiday-query.ts` `2093 → 191`。
- 新增 `npm run validate:data`：171 个国家、109 个重点国家覆盖，以及 2025–2027 共 4720 条年度节假日记录校验通过。
- 最终扫描 158 个 TS/TSX/JS/JSX/CJS/MJS 文件，超限文件 `24 → 0`。
- `npm run lint` 无警告或错误，`npx tsc --noEmit` 通过，`npm run build` 成功生成 29/29 个静态页面。
