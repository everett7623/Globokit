# 工具数据资产

本目录保存体量较大、以读取为主的国家资料和节假日数据。业务代码通过 `lib/tools` 下的类型化门面读取这些 JSON，避免把静态资料与查询逻辑混在同一个超大 TypeScript 文件中。

## 文件职责

- `global-country-info.json`：全球国家基础、通讯、文化、地理和外贸资料。
- `holiday-country-overrides.json`：节假日工具对重点国家/地区的中文名称、地区等人工覆盖。
- `holiday-observances.json`：国际纪念日、2025 年宗教节日和影响说明。
- `holidays-2025.json`：2025 年人工维护的国家节假日。
- `holidays-curated-2026.json`：2026 年人工修订项，按国家代码覆盖同国的生成数据。
- `holiday-query-generated.json`：Nager.Date API 生成的 2026/2027 年公共节假日及来源元数据。

## 更新约束

1. 保持国家代码为 ISO 3166-1 alpha-2 大写格式，日期使用本地日历日期，不附加时区。
2. 节假日 `type` 仅使用 `public`、`regional`、`observance`、`international`；`impact` 仅使用 `high`、`medium`、`low`。
3. 2026 年人工修订数据按国家整体覆盖生成数据；修改时需确认该国家的完整年度清单仍然保留。
4. 数据修改后运行 `npm run validate:data`，再执行类型检查与生产构建。
