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
  | 'dot'       // hello.world
  | 'path';     // hello/world

/**
 * 辅助函数：将文本拆分为单词数组
 * 处理空格、下划线、短横线、驼峰等情况
 */
function toWords(text: string): string[] {
  return text
    // 在大写字母前添加空格（处理驼峰）
    .replace(/([A-Z])/g, ' $1')
    // 将非字母数字字符替换为空格
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    // 去除首尾空格并分割
    .trim()
    .split(/\s+/);
}

/**
 * 转换文本大小写
 * @param text 输入文本
 * @param textCase 转换类型
 * @returns 转换后的文本
 */
export function convertCase(text: string, textCase: TextCase): string {
  // 如果文本为空，直接返回
  if (!text) return text;

  switch (textCase) {
    // --- 基础文本格式 ---
    case 'upper':
      return text.toUpperCase();
    
    case 'lower':
      return text.toLowerCase();
    
    case 'sentence':
      // 句子格式：首字母大写，其余小写
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
    
    case 'title':
      // 标题格式：排除虚词
      const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
      return text.toLowerCase().replace(/\w\S*/g, (word, index) => {
        if (index === 0 || !smallWords.includes(word.toLowerCase())) {
          return word.charAt(0).toUpperCase() + word.substr(1);
        }
        return word;
      });
    
    case 'toggle':
      // 大小写反转
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
    
    case 'capitalize':
      // 单词首字母大写
      return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

    case 'alternating':
      // 交替大小写
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
      // 反向首字母小写
      return text.charAt(0).toLowerCase() + text.slice(1).toUpperCase();

    // --- 编程常用格式 (基于单词拆分重组) ---
    case 'camel':
      // 驼峰: helloWorld
      return toWords(text)
        .map((word, index) => {
          const lower = word.toLowerCase();
          return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');

    case 'pascal':
      // 帕斯卡: HelloWorld
      return toWords(text)
        .map(word => {
          const lower = word.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');

    case 'snake':
      // 下划线: hello_world
      return toWords(text)
        .map(word => word.toLowerCase())
        .join('_');

    case 'kebab':
      // 短横线: hello-world
      return toWords(text)
        .map(word => word.toLowerCase())
        .join('-');

    case 'constant':
      // 常量: HELLO_WORLD
      return toWords(text)
        .map(word => word.toUpperCase())
        .join('_');

    case 'dot':
      // 点连接: hello.world
      return toWords(text)
        .map(word => word.toLowerCase())
        .join('.');

    case 'path':
      // 路径: hello/world
      return toWords(text)
        .map(word => word.toLowerCase())
        .join('/');

    default:
      return text;
  }
}
