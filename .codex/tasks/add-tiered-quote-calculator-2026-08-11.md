# 新增外贸阶梯报价计算器

- 日期：2026-08-11
- 状态：功能完成，待浏览器补测

## TODO

- [x] 核对远程、本地任务和现有报价工具，确认阶梯报价属于客户询盘中的独立定价环节。
- [x] 确定采购数量折扣、固定费用摊薄、佣金、收款费、目标利润率和外币报价取整口径。
- [x] 实现 2–5 个数量档位的纯函数计算、单价与降幅排名和输入校验。
- [x] 实现可增删档位的响应式表单、场景预设、结果明细、复制摘要、异常提示和重置操作。
- [x] 接入财务注册表、首页客户报价工作流、UI 配置、README、CHANGELOG、PROGRESS 与 sitemap 自动链路。
- [ ] 完成定向断言、数据校验、Lint、TypeScript、生产构建、HTTP 和浏览器桌面/390px 验收（仅浏览器交互与移动视口待补测）。

## 计算边界

- 建议单价先覆盖各档采购成本和每单固定费用，再预留佣金、收款费和目标销售利润率。
- 每个档位可以录入不同的采购单价，用于反映供应商数量折扣；工具不自动推断采购折扣。
- 外币单价按用户设置的步长向上取整，实际利润率可能略高于目标利润率；步长为 0 时保留未取整建议价。
- 结果不自动计入运费、保险、税费、目的地费用或汇率波动，确定档位后仍需使用报价利润工具完成条款成本核算。

## 当前验证

- `npm run test:tiered-quote`：18 条定向断言通过，覆盖默认四档报价、固定费用摊薄、向上取整、CNY 报价和非法输入。
- `npm run test:packaging-plans`、`npm run test:demurrage-detention`、`npm run test:fx-sensitivity`、`npm run test:payment-terms`、`npm run validate:data`、`npm run lint`、`npx tsc --noEmit` 和 `git diff --check` 均通过。
- `npm run build` 通过，生产构建生成 37 个静态页面，新路由 `/tools/tiered-quote-calculator` 已进入页面列表。
- 本地 HTTP 烟测返回 200，页面包含标题、默认阶梯报价、结果区和复制入口；首页与 sitemap 均包含新工具。
- 应用内浏览器因 `failed to write kernel assets: 系统找不到指定的路径。 (os error 3)` 无法初始化，真实点击和 390px 视口待环境恢复后补测。
