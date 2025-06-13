export interface SpecialCharResult {
  hasSpecialChars: boolean;
  specialChars: string[];
  cleanedText: string;
  replacedText: string;
}

export function checkSpecialChars(text: string): SpecialCharResult {
  // 简化版本 - 避免特殊字符编译问题
  const specialChars: string[] = [];
  let cleanedText = text;
  let replacedText = text;
  
  // 使用正则表达式替换常见的特殊字符
  const replacements = [
    { pattern: /[""]/g, replacement: '"' },
    { pattern: /['']/g, replacement: "'" },
    { pattern: /[–—]/g, replacement: '-' },
    { pattern: /…/g, replacement: '...' },
    { pattern: /™/g, replacement: 'TM' },
    { pattern: /®/g, replacement: '(R)' },
    { pattern: /©/g, replacement: '(C)' },
    { pattern: /°/g, replacement: ' degrees' },
    { pattern: /±/g, replacement: '+/-' },
    { pattern: /×/g, replacement: 'x' },
    { pattern: /÷/g, replacement: '/' },
    { pattern: /≈/g, replacement: '~' },
    { pattern: /≠/g, replacement: '!=' },
    { pattern: /≤/g, replacement: '<=' },
    { pattern: /≥/g, replacement: '>=' },
  ];
  
  // 应用替换
  replacements.forEach(({ pattern, replacement }) => {
    if (pattern.test(text)) {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          if (!specialChars.includes(match)) {
            specialChars.push(match);
          }
        });
      }
      replacedText = replacedText.replace(pattern, replacement);
    }
  });
  
  // 检查其他非ASCII字符
  const nonAsciiRegex = /[^\x00-\x7F]/g;
  const nonAsciiMatches = text.match(nonAsciiRegex);
  if (nonAsciiMatches) {
    nonAsciiMatches.forEach(char => {
      if (!specialChars.includes(char)) {
        specialChars.push(char);
      }
    });
  }
  
  // 清理文本 - 只保留ASCII字符
  cleanedText = text.replace(nonAsciiRegex, '');
  
  return {
    hasSpecialChars: specialChars.length > 0,
    specialChars: Array.from(new Set(specialChars)),
    cleanedText,
    replacedText
  };
}
