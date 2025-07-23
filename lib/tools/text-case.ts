// 名称: 英文大小写转换函数
// 描述: 快速转换英文文本的大小写格式，支持多种转换模式
// 路径: seedtool/lib/tools/text-case.ts
// 作者: Jensfrank
// 更新时间: 2025-07-23

export type TextCase = 'upper' | 'lower' | 'sentence' | 'title' | 'toggle' | 'capitalize' | 'alternating' | 'inverse';

export function convertCase(text: string, textCase: TextCase): string {
  switch (textCase) {
    case 'upper':
      // 全部大写
      return text.toUpperCase();
    
    case 'lower':
      // 全部小写
      return text.toLowerCase();
    
    case 'sentence':
      // 句子格式：每个句子的首字母大写
      return text.replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
    
    case 'title':
      // 标题格式：每个单词首字母大写（改进版，排除小词）
      const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
      return text.replace(/\w\S*/g, (word, index) => {
        // 第一个词或不是小词的都要大写
        if (index === 0 || !smallWords.includes(word.toLowerCase())) {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        }
        return word.toLowerCase();
      });
    
    case 'toggle':
      // 大小写反转
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
    
    case 'capitalize':
      // 每个单词首字母大写
      return text.replace(/\b\w/g, char => char.toUpperCase());
    
    case 'alternating':
      // 交替大小写（忽略空格和标点）
      let isUpper = true;
      return text.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
          const result = isUpper ? char.toUpperCase() : char.toLowerCase();
          isUpper = !isUpper;
          return result;
        }
        return char;
      }).join('');
    
    case 'inverse':
      // 反向句子格式：首字母小写，其余大写
      return text.charAt(0).toLowerCase() + text.slice(1).toUpperCase();
    
    default:
      return text;
  }
}
