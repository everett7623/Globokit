// 名称: 信用证交单自查清单专项测试
// 描述: 覆盖风险分级边界、加权得分、未知项过滤与英文改证片段生成
// 路径: Globokit/scripts/assert-lc-checklist.cjs
// 作者: everettlabs
// 更新时间: 2026-09-30

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  LC_CHECKLIST_ITEMS,
  SEVERITY_WEIGHTS,
  evaluateLcChecklist,
  generateLcAmendmentRequests,
  getLcGroupItems,
  getLcStats,
} = loadTypescriptModule('lib/tools/lc-discrepancy-checklist.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}

const allIds = LC_CHECKLIST_ITEMS.map((item) => item.id)
const idsOfSeverity = (severity) => LC_CHECKLIST_ITEMS.filter((item) => item.severity === severity).map((item) => item.id)
const criticalIds = idsOfSeverity('critical')
const majorIds = idsOfSeverity('major')
const minorIds = idsOfSeverity('minor')

// 清单结构：27 项、致命 10、重要 13、次要 4，权重合计 173
equal(allIds.length, 27, '清单应有 27 项')
equal(criticalIds.length, 10, '致命项应为 10 条')
equal(majorIds.length, 13, '重要项应为 13 条')
equal(minorIds.length, 4, '次要项应为 4 条')
const stats = getLcStats()
equal(stats.total, 27, '统计口径总数应为 27')
equal(stats.critical, 10, '统计口径致命项应为 10')
equal(
  LC_CHECKLIST_ITEMS.reduce((sum, item) => sum + SEVERITY_WEIGHTS[item.severity], 0),
  173,
  '权重合计应为 173 分'
)
equal(SEVERITY_WEIGHTS.critical, 10, '致命项权重应为 10')
check(allIds.every((id, index) => allIds.indexOf(id) === index), '清单 id 不应重复')

// 空清单：0 分高风险
const emptyEvaluation = evaluateLcChecklist([])
equal(emptyEvaluation.checkedCount, 0, '空清单已核对数应为 0')
equal(emptyEvaluation.score, 0, '空清单得分应为 0')
equal(emptyEvaluation.riskLevel, 'high', '空清单应为高风险')
equal(emptyEvaluation.uncheckedCritical.length, criticalIds.length, '空清单未勾致命项应等于全部致命项')

// 全选：100 分低风险，无改证片段
const fullEvaluation = evaluateLcChecklist(allIds)
equal(fullEvaluation.completionPercent, 100, '全选完成度应为 100%')
equal(fullEvaluation.score, 100, '全选得分应为 100')
equal(fullEvaluation.riskLevel, 'low', '全选应为低风险')
check(fullEvaluation.riskLabel.includes('可以交单'), '低风险标签应提示可以交单')
equal(generateLcAmendmentRequests(fullEvaluation.uncheckedCritical).length, 0, '全选时不应生成改证片段')

// 漏 1 项致命：得分 94 但仍高风险
const missOneCritical = evaluateLcChecklist(allIds.filter((id) => id !== criticalIds[0]))
equal(missOneCritical.score, 94, '漏 1 项致命得分应为 94')
equal(missOneCritical.riskLevel, 'high', '存在未勾致命项应为高风险')

// 只漏次要项：得分 95 低风险
const onlyMinorMissed = evaluateLcChecklist(allIds.filter((id) => !minorIds.includes(id)))
equal(onlyMinorMissed.score, 95, '漏全部次要项得分应为 95')
equal(onlyMinorMissed.riskLevel, 'low', '95 分且无致命缺失应为低风险')
equal(onlyMinorMissed.completionPercent, 85, '完成度应为 85%')

// 中风险区间：漏 6 项重要（得分 83）
const mediumEvaluation = evaluateLcChecklist(allIds.filter((id) => !majorIds.slice(0, 6).includes(id)))
equal(mediumEvaluation.score, 83, '漏 6 项重要得分应为 83')
equal(mediumEvaluation.riskLevel, 'medium', '83 分且无致命缺失应为中风险')

// 高风险下限：漏 11 项重要（得分 68）
const belowThreshold = evaluateLcChecklist(allIds.filter((id) => !majorIds.slice(0, 11).includes(id)))
equal(belowThreshold.score, 68, '漏 11 项重要得分应为 68')
equal(belowThreshold.riskLevel, 'high', '低于 70 分应为高风险')

// 未知 id 被忽略
const filteredEvaluation = evaluateLcChecklist(['not-exist', allIds[0]])
equal(filteredEvaluation.checkedCount, 1, '未知 id 不应计入已核对数')

// 改证片段：全部致命项未勾时生成 10 句英文，带信用证号前缀
const requests = generateLcAmendmentRequests(evaluateLcChecklist([]).uncheckedCritical, 'LC-8888')
equal(requests.length, criticalIds.length, '改证片段数应等于未勾致命项数')
check(requests.every((sentence) => sentence.startsWith('Re L/C No. LC-8888: ')), '片段应带信用证号前缀')
check(requests.every((sentence) => /^[\x20-\x7E]+$/.test(sentence)), '片段应为纯英文可粘贴文本')
const noNumberRequests = generateLcAmendmentRequests(evaluateLcChecklist([]).uncheckedCritical)
check(noNumberRequests.every((sentence) => !sentence.includes('Re L/C No.')), '未填信用证号时不应输出前缀')

// 分组取数
check(getLcGroupItems('credit-terms').length > 0, '信用证条款组应返回条目')
check(getLcGroupItems('consistency').every((item) => item.group === 'consistency'), '分组取数应只包含本组条目')

console.log(`lc-discrepancy-checklist: ${assertionCount} 条断言全部通过`)
