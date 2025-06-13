export interface SpecialCharResult {
  hasSpecialChars: boolean;
  specialChars: string[];
  cleanedText: string;
  replacedText: string;
}

export function checkSpecialChars(text: string): SpecialCharResult {
  // 使用 Unicode 转义序列定义特殊字符映射
  const charMap: { [key: string]: string } = {
    '\u201C': '"',  // " - 左双引号
    '\u201D': '"',  // " - 右双引号
    '\u2018': "'",  // ' - 左单引号
    '\u2019': "'",  // ' - 右单引号
    '\u2013': '-',  // – - 短破折号
    '\u2014': '-',  // — - 长破折号
    '\u2026': '...', // … - 省略号
    '\u2122': 'TM',  // ™ - 商标符号
    '\u00AE': '(R)', // ® - 注册商标
    '\u00A9': '(C)', // © - 版权符号
    '\u00B0': ' degrees', // ° - 度数符号
    '\u00B1': '+/-', // ± - 正负号
    '\u00D7': 'x',   // × - 乘号
    '\u00F7': '/',   // ÷ - 除号
    '\u2248': '~',   // ≈ - 约等于
    '\u2260': '!=',  // ≠ - 不等于
    '\u2264': '<=',  // ≤ - 小于等于
    '\u2265': '>=',  // ≥ - 大于等于
  };
  
  const specialChars: string[] = [];
  let cleanedText = text;
  let replacedText = text;
  
  // 检查特殊字符
  for (const [special, replacement] of Object.entries(charMap)) {
    if (text.includes(special)) {
      specialChars.push(special);
      cleanedText = cleanedText.replace(new RegExp(special, 'g'), '');
      replacedText = replacedText.replace(new RegExp(special, 'g'), replacement);
    }
  }
  
  // 检查其他非ASCII字符
  const nonAsciiRegex = /[^\x00-\x7F]/g;
  const matches = text.match(nonAsciiRegex);
  if (matches) {
    matches.forEach(char => {
      if (!specialChars.includes(char) && !charMap[char]) {
        specialChars.push(char);
      }
    });
  }
  
  return {
    hasSpecialChars: specialChars.length > 0,
    specialChars: [...new Set(specialChars)],
    cleanedText: cleanedText.replace(nonAsciiRegex, ''),
    replacedText
  };
}
