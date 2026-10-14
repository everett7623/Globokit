// 名称: 图片压缩工具专项测试
// 描述: 覆盖尺寸等比缩放、大小格式化、节省比例与输出命名
// 路径: Globokit/scripts/assert-image-compressor.cjs
// 作者: everettlabs
// 更新时间: 2026-10-12

const assert = require('node:assert/strict')
const { loadTypescriptModule } = require('./load-typescript-module.cjs')

const {
  SUPPORTED_INPUT_TYPES,
  OUTPUT_TYPES,
  calculateTargetDimensions,
  formatFileSize,
  savingsPercent,
  buildOutputFileName,
  needsWhiteBackdrop,
} = loadTypescriptModule('lib/tools/image-compressor.ts')

let assertionCount = 0
const check = (condition, message) => {
  assertionCount += 1
  assert.ok(condition, message)
}
const equal = (actual, expected, message) => {
  assertionCount += 1
  assert.equal(actual, expected, message)
}
const throws = (callback, pattern, message) => {
  assertionCount += 1
  assert.throws(callback, pattern, message)
}

// 尺寸缩放：4000x3000 限 2000 → 2000x1500
const scaled = calculateTargetDimensions(4000, 3000, 2000)
equal(scaled.width, 2000, '宽应缩放到 2000')
equal(scaled.height, 1500, '高应等比缩放到 1500')
equal(scaled.scaled, true, '应标记为已缩放')

// 竖图：1500x4000 限 2000 → 750x2000
const portrait = calculateTargetDimensions(1500, 4000, 2000)
equal(portrait.width, 750, '竖图宽应等比缩放')
equal(portrait.height, 2000, '竖图长边应缩到 2000')

// 不需缩放
const original = calculateTargetDimensions(1200, 900, 2000)
equal(original.scaled, false, '小于限值不应缩放')
equal(original.width, 1200, '原宽保留')
equal(original.height, 900, '原高保留')

// 极端长边恰好等于限值
const exact = calculateTargetDimensions(2000, 2000, 2000)
equal(exact.scaled, false, '等于限值不缩放')

// 非法输入
throws(() => calculateTargetDimensions(0, 100, 1000), /尺寸无效/, '宽为 0 应报错')
throws(() => calculateTargetDimensions(100, -5, 1000), /尺寸无效/, '高为负应报错')
throws(() => calculateTargetDimensions(100, 100, 0), /最大边长/, '限值为 0 应报错')

// 大小格式化
equal(formatFileSize(512), '512 B', '字节级显示 B')
equal(formatFileSize(2048), '2.0 KB', 'KB 一位小数')
equal(formatFileSize(3 * 1024 * 1024), '3.00 MB', 'MB 两位小数')
equal(formatFileSize(-1), '--', '负数显示占位')
equal(formatFileSize(Number.NaN), '--', 'NaN 显示占位')

// 节省比例
equal(savingsPercent(1000000, 300000), 70, '1MB 压到 300KB 应节省 70%')
equal(savingsPercent(1000, 2000), 0, '压缩后变大不应为负')
equal(savingsPercent(0, 100), 0, '原大小为 0 返回 0')

// 输出命名
equal(buildOutputFileName('report.jpg', 'image/jpeg'), 'report-compressed.jpg', 'jpg 输出命名')
equal(buildOutputFileName('photo.PNG', 'image/webp'), 'photo-compressed.webp', 'webp 输出命名')
equal(buildOutputFileName('无扩展名', 'image/png'), '无扩展名-compressed.png', '无扩展名命名')

// 透明底检测
equal(needsWhiteBackdrop('image/png', 'image/jpeg'), true, 'PNG 转 JPEG 需铺白底')
equal(needsWhiteBackdrop('image/png', 'image/webp'), false, 'PNG 转 WebP 保留透明')
equal(needsWhiteBackdrop('image/jpeg', 'image/jpeg'), false, 'JPEG 无透明问题')

// 常量
check(SUPPORTED_INPUT_TYPES.includes('image/jpeg'), '应支持 JPEG 输入')
equal(OUTPUT_TYPES.length, 3, '应提供三种输出格式')

console.log(`image-compressor: ${assertionCount} 条断言全部通过`)
