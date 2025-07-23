// 名称: 英文大小写转换ts
// 描述: 快速转换英文文本的大小写格式，支持多种转换模式
// 路径: seedtool/lib/tools/text-case.ts
// 作者: Jensfrank
// 更新时间: 2025-07-23

export type TextCase = 'upper' | 'lower' | 'sentence' | 'title' | 'toggle';

export function convertCase(text: string, textCase: TextCase): string {
  switch (textCase) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'sentence':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    case 'toggle':
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
    default:
      return text;
  }
}
