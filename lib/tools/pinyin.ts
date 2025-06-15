// lib/tools/pinyin.ts
// 最小化修改版本 - 保持现有接口，使用 pinyin-pro 提供功能

import { pinyin } from 'pinyin-pro';

/**
 * 中文转拼音 - 保持原有函数签名
 * @param text 中文文本
 * @param separator 分隔符，默认空格
 * @param tone 是否显示音调，默认不显示
 * @returns 拼音字符串
 */
export function chineseToPinyin(
  text: string, 
  separator: string = ' ',
  tone: boolean = false
): string {
  return pinyin(text, {
    toneType: tone ? 'symbol' : 'none',
    type: 'string',
    separator: separator
  });
}

/**
 * 获取拼音首字母
 * @param text 中文文本
 * @returns 首字母字符串（大写）
 */
export function getFirstLetter(text: string): string {
  return pinyin(text, {
    pattern: 'first',
    type: 'string'
  }).toUpperCase().replace(/\s/g, '');
}

/**
 * 判断是否包含中文
 * @param text 文本
 * @returns 是否包含中文
 */
export function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

/**
 * 获取转换统计
 * @param text 文本
 * @returns 统计信息
 */
export function getConversionStats(text: string) {
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalChars = text.length;
  const conversionRate = totalChars > 0 ? (chineseChars / totalChars * 100).toFixed(2) : '0';
  
  return {
    totalChars,
    chineseChars,
    nonChineseChars: totalChars - chineseChars,
    conversionRate: `${conversionRate}%`,
    // pinyin-pro 支持的字符数
    supportedChars: '20000+',
    // 原有字库大小
    originalDictSize: 1158,
    // 扩展后的提升
    improvement: '17x'
  };
}

// 导出默认对象，保持向后兼容
export default {
  convert: chineseToPinyin,
  getFirstLetter,
  containsChinese,
  getStats: getConversionStats
};

// 为了兼容可能的直接函数调用
export { chineseToPinyin as convert };

// ===== 使用示例 =====
// 以下是如何在您现有的页面中使用

/*
// app/tools/pinyin/page.tsx
import pinyin from '@/lib/tools/pinyin';
// 或者
import { convert } from '@/lib/tools/pinyin';

// 使用方式完全不变
const result = pinyin.convert('中国人'); // 'zhong guo ren'
const withTone = pinyin.convert('中国人', ' ', true); // 'zhōng guó rén'
const firstLetters = pinyin.getFirstLetter('中国人'); // 'ZGR'
const stats = pinyin.getStats('中国人 123'); // 获取统计信息

// 现在自动支持 20000+ 汉字！
const complexText = pinyin.convert('豗喆堃垚淼焱'); // 能正确转换生僻字
*/
