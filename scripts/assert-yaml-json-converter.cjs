const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  convertYamlJson,
  parseYaml,
  stringifyYaml,
  DEFAULT_CONVERT_OPTIONS,
} = loadTypescriptModule('lib/tools/yaml-json-converter.ts')

let assertionCount = 0
const equal = (actual, expected, message) => { assertionCount += 1; assert.equal(actual, expected, message) }
const ok = (value, message) => { assertionCount += 1; assert.ok(value, message) }

// YAML → JSON 的默认口径
const toJson = (source, extra = {}) =>
  convertYamlJson(source, { ...DEFAULT_CONVERT_OPTIONS, mode: 'yaml-to-json', ...extra })
const toYaml = (source, extra = {}) =>
  convertYamlJson(source, { ...DEFAULT_CONVERT_OPTIONS, mode: 'json-to-yaml', ...extra })

// 1. 基础映射与标量类型
const basic = toJson('name: quote\ncount: 12\nratio: 0.85\nactive: true\ndisabled: false\nremark: null\nnote: ~')
ok(basic.ok, '基础映射应转换成功')
equal(basic.output, [
  '{',
  '  "name": "quote",',
  '  "count": 12,',
  '  "ratio": 0.85,',
  '  "active": true,',
  '  "disabled": false,',
  '  "remark": null,',
  '  "note": null',
  '}',
  '',
].join('\n'), '基础标量应按 JSON 类型输出')
equal(basic.stats.topLevelCount, 7, '顶层键数量应为 7')
equal(basic.stats.scalarCount, 7, '标量数量应为 7')
equal(basic.stats.maxDepth, 1, '最大深度应为 1')
equal(basic.roundTripOk, true, 'JSON 往返校验应通过')

// 2. 嵌套映射、序列与混合嵌套
const nested = toJson([
  'order:',
  '  id: SO-1001',
  '  buyer:',
  '    name: ACME',
  '    country: US',
  '  items:',
  '    - sku: A1',
  '      qty: 200',
  '      price: 1.5',
  '    - sku: B2',
  '      qty: 50',
  '      price: 12',
  '  tags:',
  '    - urgent',
  '    - repeat',
].join('\n'))
ok(nested.ok, '嵌套结构应转换成功')
const nestedValue = JSON.parse(nested.output)
equal(nestedValue.order.buyer.name, 'ACME', '二级嵌套映射应正确')
equal(nestedValue.order.items[0].sku, 'A1', '序列中的映射应正确')
equal(nestedValue.order.items[1].price, 12, '序列映射中的数字应为 number')
equal(nestedValue.order.tags.length, 2, '标量序列长度应为 2')
equal(nested.stats.maxDepth, 4, '最大嵌套深度应为 4')

// 3. 顶层序列
const topSeq = toJson('- a\n- b\n- c')
ok(topSeq.ok, '顶层序列应转换成功')
equal(topSeq.output, '[\n  "a",\n  "b",\n  "c"\n]\n', '顶层序列应输出 JSON 数组')
equal(topSeq.stats.topLevelCount, 3, '顶层序列元素数应为 3')

// 4. 引号、注释与保留字符
const quoted = toJson([
  'title: "it\'s a \\"test\\""',
  "label: 'it''s ok'",
  'price: "12"',
  'version: 1.20',
  'code: 007',
  'hash: "#tag"',
  'path: C:\\\\temp\\\\file.csv',
  'inline: value # 行尾注释被去掉',
  '\'#comment\': kept',
].join('\n'))
ok(quoted.ok, '引号与注释用例应解析成功')
const quotedValue = JSON.parse(quoted.output)
equal(quotedValue.title, 'it\'s a "test"', '双引号转义应还原')
equal(quotedValue.label, "it's ok", '单引号双写应还原为单引号')
equal(quotedValue.price, '12', '带引号的数字应保持字符串')
equal(quotedValue.version, 1.2, '小数应解析为 number')
equal(quotedValue.code, '007', '前导零应保持字符串')
equal(quotedValue.hash, '#tag', '引号内的 # 不应被当作注释')
equal(quotedValue.path, 'C:\\\\temp\\\\file.csv', 'Windows 路径不应被当作转义')
equal(quotedValue.inline, 'value', '行尾注释应被剥离')
equal(quotedValue['#comment'], 'kept', '以 # 开头的键加引号后应可用')

// 5. 流式集合
const flow = toJson('ports: [80, 443, "8080"]\nmeta: {env: prod, retry: 3}\nnested: [{a: 1}, {b: [2, 3]}]')
ok(flow.ok, '流式集合应解析成功')
const flowValue = JSON.parse(flow.output)
equal(flowValue.ports.join(','), '80,443,8080', '流式序列应解析为数组')
equal(flowValue.meta.env, 'prod', '流式映射应解析为对象')
equal(flowValue.nested[1].b[1], 3, '流式集合应支持嵌套')

// 6. 块标量
const literal = toJson('desc: |-\n  line one\n  line two\nfolded: >-\n  part a\n  part b\nkeep: |\n  x\n')
ok(literal.ok, '块标量应解析成功')
const literalValue = JSON.parse(literal.output)
equal(literalValue.desc, 'line one\nline two', '|- 应保留换行并裁掉结尾换行')
equal(literalValue.folded, 'part a part b', '>- 应折叠换行为空格')
equal(literalValue.keep, 'x\n', '| 应保留结尾换行')

// 7. 空值与空容器
const empties = toJson('nothing:\nemptyList: []\nemptyMap: {}\nlist:\n  -\n  - a')
ok(empties.ok, '空值用例应解析成功')
const emptiesValue = JSON.parse(empties.output)
equal(emptiesValue.nothing, null, '无值键应为 null')
equal(Array.isArray(emptiesValue.emptyList) && emptiesValue.emptyList.length, 0, '空流式序列应为空数组')
equal(Object.keys(emptiesValue.emptyMap).length, 0, '空流式映射应为空对象')
equal(emptiesValue.list.length, 2, '空序列项应保留为 null 元素')
equal(emptiesValue.list[0], null, '裸 - 应解析为 null')
equal(emptiesValue.list[1], 'a', '序列项应正确取值')

// 8. 顶层文档标记的容忍
const doc = toJson('---\nfoo: bar\n...')
ok(doc.ok, '文档标记行应被忽略')
equal(JSON.parse(doc.output).foo, 'bar', '文档标记之间的内容应正常解析')

// 9. JSON → YAML 输出与引号策略
const yamlOut = toYaml(JSON.stringify({ on: 'on', num: '12', empty: '', list: [1, 2], child: { k: 'v' }, multi: 'a\nb' }))
ok(yamlOut.ok, 'JSON 转 YAML 应成功')
ok(yamlOut.output.includes("'on': 'on'"), '布尔字面量风格的字符串应加引号')
ok(yamlOut.output.includes("num: '12'"), '数字样式字符串应加引号')
ok(yamlOut.output.includes("empty: ''"), '空字符串应输出为单引号')
ok(yamlOut.output.includes('multi: |-'), '含换行的字符串应输出块标量')
ok(yamlOut.output.includes('child:\n  k: v'), '嵌套映射应缩进两级')
equal(yamlOut.roundTripOk, true, 'YAML 往返校验应通过')

const sorted = toYaml(JSON.stringify({ b: 1, a: 2, c: { z: 1, y: 2 } }), { sortKeys: true })
equal(sorted.output, 'a: 2\nb: 1\nc:\n  y: 2\n  z: 1\n', '开启排序后键应按字典序递归输出')

const fourSpace = toYaml(JSON.stringify({ a: { b: 1 } }), { indent: 4 })
equal(fourSpace.output, 'a:\n    b: 1\n', '缩进选项应生效')

const doubleQuoted = toYaml(JSON.stringify({ k: 'plain' }), { quoteStyle: 'double' })
equal(doubleQuoted.output, 'k: "plain"\n', '强制双引号风格应生效')

const compact = toJson('a: 1\nb:\n  c: 2', { jsonIndent: 0 })
equal(compact.output, '{"a":1,"b":{"c":2}}\n', '紧凑 JSON 应无换行与空格')

const indent4 = toJson('a:\n  b: 1', { jsonIndent: 4 })
ok(indent4.output.includes('    "b": 1'), 'JSON 缩进 4 应生效')

// 10. 序列化为 YAML 的空容器
equal(stringifyYaml({ a: [], b: {}, c: [null] }), 'a: []\nb: {}\nc:\n  - null\n', '空容器与 null 元素应显式输出')

// 11. 错误处理
const looseIndent = toJson('a:\n    b: 1\n  c: 2')
equal(looseIndent.ok, true, '缩进深度作为层级依据，宽度不一致仍可解析')
equal(JSON.stringify(JSON.parse(looseIndent.output)), JSON.stringify({ a: { b: 1 }, c: 2 }), '缩进回退到浅层时应成为同级键')

const tabIndent = toJson('a:\n\tb: 1')
equal(tabIndent.ok, false, '制表符缩进应被拒绝')
equal(tabIndent.errorLine, 2, '制表符错误应指出第 2 行')

const dupKey = toJson('a: 1\na: 2')
equal(dupKey.ok, false, '重复键应被拒绝')
equal(dupKey.errorLine, 2, '重复键错误应指出第 2 行')

const noColon = toJson('a: 1\nplain text line')
equal(noColon.ok, false, '缺少冒号的行应被拒绝')

const seqInMap = toJson('a: 1\n  - b')
equal(seqInMap.ok, false, '映射中缩进的序列项应被拒绝')

const directive = toJson('%YAML 1.2\na: 1')
equal(directive.ok, false, 'YAML 指令应被拒绝')

const unknownAlias = parseYaml('a: &x 1' + String.fromCharCode(10) + 'b: *x')
equal(JSON.stringify(unknownAlias), '{"a":1,"b":{"$ref":"x"}}', '锚点取值按内联值处理，别名以 $ref 显式标注')
equal(JSON.stringify(unknownAlias), '{"a":1,"b":{"$ref":"x"}}', '锚点取值应内联，别名应显式标注 $ref')

const badJson = toYaml('{ "a": 1, }')
equal(badJson.ok, false, '非法 JSON 应被拒绝')
ok(/JSON 解析失败/.test(badJson.error), 'JSON 错误信息应带前缀')
ok(/第 \d+ 行/.test(badJson.error), 'JSON 错误应给出行列位置')

const emptyInput = toJson('   \n  ')
equal(emptyInput.ok, false, '空输入应被拒绝')
equal(emptyInput.error, '请输入需要转换的内容', '空输入应给出提示文案')

// 12. 往返一致性：YAML → JSON → YAML 语义不变
const source = [
  'order:',
  '  id: SO-1001',
  '  amount: 12500.5',
  '  incoterm: FOB Shenzhen',
  '  items:',
  '    - sku: A1',
  '      qty: 200',
  '    - sku: B2',
  '      qty: 50',
  '  flags: [urgent, repeat]',
].join('\n')
const jsonStage = toJson(source)
ok(jsonStage.ok, '往返第一段应成功')
const yamlStage = toYaml(jsonStage.output)
ok(yamlStage.ok, '往返第二段应成功')
equal(yamlStage.roundTripOk, true, 'YAML → JSON → YAML 的往返校验应通过')
equal(JSON.stringify(parseYaml(yamlStage.output)), JSON.stringify(JSON.parse(jsonStage.output)), '往返后数据结构应完全一致')

console.log(`YAML 与 JSON 互转：${assertionCount} 条定向断言通过`)
