# 新增供应商报价对比工具

- 日期：2026-08-11
- 状态：功能完成，待浏览器补测

## TODO

- [x] 核对远程、本地任务和现有报价工具，确认采购端多供应商报价尚无统一比较入口。
- [x] 确定含税未税、VAT、MOQ、次品预留、固定费用、国内运费、首付与交期口径。
- [x] 实现 2–5 家供应商的纯函数计算、三类排名和输入校验。
- [x] 实现可增删供应商的响应式表单、场景预设、结果明细、复制摘要、异常提示和重置操作。
- [x] 接入财务注册表、首页客户报价工作流、UI 配置、README、CHANGELOG、PROGRESS 与 sitemap 自动链路。
- [ ] 完成定向断言、数据校验、Lint、TypeScript、生产构建、HTTP 和浏览器桌面/390px 验收（仅浏览器交互与移动视口待补测）。

## 计算边界

- 实际采购数量先按次品预留率反推满足计划合格品需求所需数量，再与 MOQ 取较大值。
- 含税报价拆分未税货款和 VAT；未税报价加计 VAT，成本排名使用含税货款、固定费用和国内运费的现金合计。
- 首付金额只按含税货款乘以首付比例计算，不自动包含固定费用和国内运费。
- VAT 只拆分展示，不自动抵扣或计入出口退税；成本排名不代表质量、交期和供应风险的综合结论。

## 当前验证

- `npm run test:supplier-quotes`：20 条定向断言通过，覆盖含税未税等价报价、MOQ 抬量、次品预留、税额、首付与非法输入。
- `npm run test:order-break-even`、`npm run test:tiered-quote`、`npm run test:packaging-plans`、`npm run test:demurrage-detention`、`npm run test:fx-sensitivity`、`npm run test:payment-terms`、`npm run validate:data`、`npm run lint`、`npx tsc --noEmit` 和 `git diff --check` 均通过。
- `npm run build` 通过，生产构建生成 39 个静态页面，新路由 `/tools/supplier-quote-comparison` 已进入页面列表。
- 本地 HTTP 烟测返回 200，页面包含标题、默认最低现金成本 `¥50,068.00`、结果区和复制入口；首页与 sitemap 均包含新工具。
- 应用内浏览器因 `failed to write kernel assets: 系统找不到指定的路径。 (os error 3)` 无法初始化，真实点击和 390px 视口待环境恢复后补测。
