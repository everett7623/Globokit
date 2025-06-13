// lib/tools/pinyin.ts
import pinyin from 'pinyin';

/**
 * 中文转拼音工具函数（根目录版本）
 * @param text 输入的中文文本
 * @param options 转换选项（如是否保留声调）
 * @returns 拼音字符串（空格分隔）
 */
export function chineseToPinyin(text: string, options: { tone?: boolean } = {}): string {
  const { tone = false } = options;
  if (!text) return '';
  
  try {
    // 配置拼音转换参数
    const result = pinyin(text, {
      style: tone ? pinyin.STYLE_TONE : pinyin.STYLE_NORMAL,
      heteronym: true,       // 处理多音字（可选）
      segment: true,         // 启用分词提高准确性
      format: 'array',       // 输出数组格式
    });
    
    // 扁平化数组并拼接（带空格分隔）
    return result.flat().join(' ');
  } catch (error) {
    console.error('拼音转换错误:', error);
    return text; // 错误时返回原文
  }
}
