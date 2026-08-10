# 新增外贸订单保本销量计算器

- 日期：2026-08-11
- 状态：功能完成，待浏览器补测

## TODO

- [x] 核对远程、本地任务与现有报价工具，确认已知售价下的保本销量属于独立决策问题。
- [x] 确定单件贡献毛利、保本销量、目标利润销量、计划利润和安全余量口径。
- [x] 实现纯函数计算、三种计划状态、金额与费率边界校验。
- [x] 实现响应式表单、场景预设、结果明细、复制摘要、异常提示和重置操作。
- [x] 接入财务注册表、首页客户报价工作流、UI 配置、README、CHANGELOG、PROGRESS 与 sitemap 自动链路。
- [ ] 完成定向断言、数据校验、Lint、TypeScript、生产构建、HTTP 和浏览器桌面/390px 验收（仅浏览器交互与移动视口待补测）。

## 计算边界

- 单件贡献毛利为销售单价扣除佣金、收款费、售后损耗预留和单件变动成本后的余额。
- 保本销量和目标利润销量均按完整件数向上取整；计划订单利润使用用户输入的实际计划销量计算。
- 所有金额必须使用同一币种，切换币种只改变显示单位，不自动换汇或改写金额。
- 结果不自动计入税费、汇率波动、资金占用成本或未录入的物流费用，不替代正式财务预算。

## 当前验证

- `npm run test:order-break-even`：19 条定向断言通过，覆盖默认贡献毛利、保本/盈利/达标状态、零固定成本、费率边界和无贡献毛利订单。
- `npm run test:tiered-quote`、`npm run test:packaging-plans`、`npm run test:demurrage-detention`、`npm run test:fx-sensitivity`、`npm run test:payment-terms`、`npm run validate:data`、`npm run lint`、`npx tsc --noEmit` 和 `git diff --check` 均通过。
- `npm run build` 通过，生产构建生成 38 个静态页面，新路由 `/tools/order-break-even-calculator` 已进入页面列表。
- 本地 HTTP 烟测返回 200，页面包含标题、默认保本销量 `185 件`、结果区和复制入口；首页与 sitemap 均包含新工具。
- 应用内浏览器因 `failed to write kernel assets: 系统找不到指定的路径。 (os error 3)` 无法初始化，真实点击和 390px 视口待环境恢复后补测。
