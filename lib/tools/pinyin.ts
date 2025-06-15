import { pinyin } from 'pinyin-pro';

export interface PinyinOptions {
  toneType?: 'symbol' | 'num' | 'none'; // 声调类型
  pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first'; // 输出模式
  multiple?: boolean; // 是否返回多音字的所有拼音
  separator?: string; // 拼音之间的分隔符
  nonZh?: 'spaced' | 'consecutive' | 'removed'; // 非中文字符处理
}

export function convertToPinyin(text: string, options: PinyinOptions = {}): string {
  const defaultOptions: PinyinOptions = {
    toneType: 'symbol',
    pattern: 'pinyin',
    multiple: false,
    separator: ' ',
    nonZh: 'spaced',
    ...options
  };

  return pinyin(text, defaultOptions);
}

// 获取带声调的拼音
export function getPinyinWithTone(text: string): string {
  return convertToPinyin(text, {
    toneType: 'symbol',
    separator: ' '
  });
}

// 获取不带声调的拼音
export function getPinyinWithoutTone(text: string): string {
  return convertToPinyin(text, {
    toneType: 'none',
    separator: ' '
  });
}

// 获取拼音首字母
export function getPinyinInitials(text: string): string {
  return convertToPinyin(text, {
    pattern: 'first',
    separator: ''
  });
}

// 获取数字声调拼音
export function getPinyinWithNumTone(text: string): string {
  return convertToPinyin(text, {
    toneType: 'num',
    separator: ' '
  });
}

// 分析文本中的中文字符
export function analyzeText(text: string) {
  const totalChars = text.length;
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const nonChineseChars = totalChars - chineseChars;
  const conversionRate = totalChars > 0 ? (chineseChars / totalChars * 100).toFixed(2) : '0';

  return {
    totalChars,
    chineseChars,
    nonChineseChars,
    conversionRate: `${conversionRate}%`
  };
}

// 示例数据
export const examples = {
  basic: '你好世界',
  greeting: '早上好，祝您工作顺利！',
  classic: '春眠不觉晓，处处闻啼鸟。',
  daily: '今天天气真好，我们去公园散步吧。',
  names: '张三李四王五赵六',
  address: '北京市朝阳区建国门外大街1号'
};
