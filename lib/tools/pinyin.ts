// 注意：这是一个临时实现，请安装 pinyin-pro 包以获得完整功能
// npm install pinyin-pro

export interface PinyinOptions {
  toneType?: 'symbol' | 'num' | 'none'; // 声调类型
  pattern?: 'pinyin' | 'initial' | 'final' | 'num' | 'first'; // 输出模式
  multiple?: boolean; // 是否返回多音字的所有拼音
  separator?: string; // 拼音之间的分隔符
  nonZh?: 'spaced' | 'consecutive' | 'removed'; // 非中文字符处理
}

// 临时的 pinyin 函数实现（在安装 pinyin-pro 之前使用）
// 安装 pinyin-pro 后，请取消下面的注释并删除临时实现
/*
import { pinyin } from 'pinyin-pro';

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
*/

// 临时实现 - 请在安装 pinyin-pro 后替换
export function convertToPinyin(text: string, options: PinyinOptions = {}): string {
  // 简单的汉字拼音映射（仅用于演示）
  const pinyinMap: { [key: string]: { symbol: string; num: string; none: string } } = {
    '你': { symbol: 'nǐ', num: 'ni3', none: 'ni' },
    '好': { symbol: 'hǎo', num: 'hao3', none: 'hao' },
    '世': { symbol: 'shì', num: 'shi4', none: 'shi' },
    '界': { symbol: 'jiè', num: 'jie4', none: 'jie' },
    '中': { symbol: 'zhōng', num: 'zhong1', none: 'zhong' },
    '国': { symbol: 'guó', num: 'guo2', none: 'guo' },
    '人': { symbol: 'rén', num: 'ren2', none: 'ren' },
    '我': { symbol: 'wǒ', num: 'wo3', none: 'wo' },
    '爱': { symbol: 'ài', num: 'ai4', none: 'ai' },
    '北': { symbol: 'běi', num: 'bei3', none: 'bei' },
    '京': { symbol: 'jīng', num: 'jing1', none: 'jing' },
    '天': { symbol: 'tiān', num: 'tian1', none: 'tian' },
    '安': { symbol: 'ān', num: 'an1', none: 'an' },
    '门': { symbol: 'mén', num: 'men2', none: 'men' },
    '早': { symbol: 'zǎo', num: 'zao3', none: 'zao' },
    '上': { symbol: 'shàng', num: 'shang4', none: 'shang' },
    '祝': { symbol: 'zhù', num: 'zhu4', none: 'zhu' },
    '您': { symbol: 'nín', num: 'nin2', none: 'nin' },
    '工': { symbol: 'gōng', num: 'gong1', none: 'gong' },
    '作': { symbol: 'zuò', num: 'zuo4', none: 'zuo' },
    '顺': { symbol: 'shùn', num: 'shun4', none: 'shun' },
    '利': { symbol: 'lì', num: 'li4', none: 'li' },
    '春': { symbol: 'chūn', num: 'chun1', none: 'chun' },
    '眠': { symbol: 'mián', num: 'mian2', none: 'mian' },
    '不': { symbol: 'bù', num: 'bu4', none: 'bu' },
    '觉': { symbol: 'jué', num: 'jue2', none: 'jue' },
    '晓': { symbol: 'xiǎo', num: 'xiao3', none: 'xiao' },
    '处': { symbol: 'chù', num: 'chu4', none: 'chu' },
    '闻': { symbol: 'wén', num: 'wen2', none: 'wen' },
    '啼': { symbol: 'tí', num: 'ti2', none: 'ti' },
    '鸟': { symbol: 'niǎo', num: 'niao3', none: 'niao' },
    '今': { symbol: 'jīn', num: 'jin1', none: 'jin' },
    '气': { symbol: 'qì', num: 'qi4', none: 'qi' },
    '真': { symbol: 'zhēn', num: 'zhen1', none: 'zhen' },
    '们': { symbol: 'men', num: 'men', none: 'men' },
    '去': { symbol: 'qù', num: 'qu4', none: 'qu' },
    '公': { symbol: 'gōng', num: 'gong1', none: 'gong' },
    '园': { symbol: 'yuán', num: 'yuan2', none: 'yuan' },
    '散': { symbol: 'sàn', num: 'san4', none: 'san' },
    '步': { symbol: 'bù', num: 'bu4', none: 'bu' },
    '吧': { symbol: 'ba', num: 'ba', none: 'ba' },
    '张': { symbol: 'zhāng', num: 'zhang1', none: 'zhang' },
    '三': { symbol: 'sān', num: 'san1', none: 'san' },
    '李': { symbol: 'lǐ', num: 'li3', none: 'li' },
    '四': { symbol: 'sì', num: 'si4', none: 'si' },
    '王': { symbol: 'wáng', num: 'wang2', none: 'wang' },
    '五': { symbol: 'wǔ', num: 'wu3', none: 'wu' },
    '赵': { symbol: 'zhào', num: 'zhao4', none: 'zhao' },
    '六': { symbol: 'liù', num: 'liu4', none: 'liu' },
    '市': { symbol: 'shì', num: 'shi4', none: 'shi' },
    '朝': { symbol: 'cháo', num: 'chao2', none: 'chao' },
    '阳': { symbol: 'yáng', num: 'yang2', none: 'yang' },
    '区': { symbol: 'qū', num: 'qu1', none: 'qu' },
    '建': { symbol: 'jiàn', num: 'jian4', none: 'jian' },
    '外': { symbol: 'wài', num: 'wai4', none: 'wai' },
    '大': { symbol: 'dà', num: 'da4', none: 'da' },
    '街': { symbol: 'jiē', num: 'jie1', none: 'jie' },
    '号': { symbol: 'hào', num: 'hao4', none: 'hao' },
  };

  const toneType = options.toneType || 'symbol';
  const separator = options.separator || ' ';
  const nonZh = options.nonZh || 'spaced';
  
  const chars = text.split('');
  const result: string[] = [];
  
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const mapping = pinyinMap[char];
    
    if (mapping) {
      // 是中文字符
      result.push(mapping[toneType]);
    } else if (/[\u4e00-\u9fa5]/.test(char)) {
      // 是中文字符但没有映射
      result.push(`[${char}]`);
    } else {
      // 非中文字符
      if (nonZh === 'spaced') {
        result.push(char);
      } else if (nonZh === 'removed') {
        // 不添加到结果中
        continue;
      } else {
        // consecutive
        result.push(char);
      }
    }
  }
  
  // 处理分隔符
  if (nonZh === 'spaced') {
    return result.join(separator);
  } else {
    // 对于非中文字符，不使用分隔符
    let output = '';
    for (let i = 0; i < result.length; i++) {
      if (i > 0 && pinyinMap[chars[i]]) {
        output += separator;
      }
      output += result[i];
    }
    return output;
  }
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
