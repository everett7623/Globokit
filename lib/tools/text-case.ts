/**
 * 名称: 英文大小写转换函数
 * 描述: 快速转换英文文本的大小写格式，支持多种转换模式
 * 路径: Globokit/lib/tools/text-case.ts
 * 作者: Jensfrank
 * 更新时间: 2026-01-08
 */

export type TextCase = 
  | 'upper' 
  | 'lower' 
  | 'sentence' 
  | 'title' 
  | 'toggle' 
  | 'capitalize' 
  | 'alternating' 
  | 'inverse'
  | 'camel'     // helloWorld
  | 'pascal'    // HelloWorld
  | 'snake'     // hello_world
  | 'kebab'     // hello-world
  | 'constant'  // HELLO_WORLD
  | 'dot'       // Hello.World (修改为保留原大小写，适应文件名场景)
  | 'path';     // hello/world

/**
 * 辅助函数：将文本拆分为单词数组
 * 改进版：智能处理驼峰、缩写词和数字，不破坏连续的大写字母 (如 HDTV)
 */
function toWords(text: string): string[] {
  if (!text) return [];
  
  return text
    // 1. 处理驼峰 (camelCase): 小写字母后跟大写字母 -> 插入空格
    // 例如: helloWorld -> hello World
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    
    // 2. 处理连续大写后的分界 (Acronyms): 连续大写后跟小写 -> 在最后一个大写前插空格
    // 例如: XMLHttp -> XML Http (保留 XML 作为一个词)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    
    // 3. 将非字母数字字符替换为空格，并按空格拆分
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * 转换文本大小写
 * @param text 输入文本
 * @param textCase 转换类型
 * @returns 转换后的文本
 */
export function convertCase(text: string, textCase: TextCase): string {
  if (!text) return text;

  switch (textCase) {
    // --- 基础文本格式 ---
    case 'upper':
      return text.toUpperCase();
    
    case 'lower':
      return text.toLowerCase();
    
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
    
    case 'title':
      const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
      return text.toLowerCase().replace(/\w\S*/g, (word, index) => {
        if (index === 0 || !smallWords.includes(word.toLowerCase())) {
          return word.charAt(0).toUpperCase() + word.substr(1);
        }
        return word;
      });
    
    case 'toggle':
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
    
    case 'capitalize':
      return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

    case 'alternating':
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
      return text.charAt(0).toLowerCase() + text.slice(1).toUpperCase();

    // --- 编程与文件命名格式 ---
    
    case 'camel': // helloWorld
      return toWords(text)
        .map((word, index) => {
          const lower = word.toLowerCase();
          return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');

    case 'pascal': // HelloWorld
      return toWords(text)
        .map(word => {
          const lower = word.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');

    case 'snake': // hello_world
      return toWords(text)
        .map(word => word.toLowerCase())
        .join('_');

    case 'kebab': // hello-world
      return toWords(text)
        .map(word => word.toLowerCase())
        .join('-');

    case 'constant': // HELLO_WORLD
      return toWords(text)
        .map(word => word.toUpperCase())
        .join('_');

    case 'dot': 
      // 修改：保留单词原大小写，仅用点连接
      // 适应场景：Yi.Wen.Si...S01.HDTV
      return toWords(text).join('.');

    case 'path': // hello/world
      return toWords(text)
        .map(word => word.toLowerCase())
        .join('/');

    default:
      return text;
  }
}
