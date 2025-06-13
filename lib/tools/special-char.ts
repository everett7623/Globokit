export interface SpecialCharResult {
  hasSpecialChars: boolean;
  specialChars: string[];
  cleanedText: string;
  replacedText: string;
}

export function checkSpecialChars(text: string): SpecialCharResult {
  // 定义特殊字符映射
  const charMap: { [key: string]: string } = {
    '"': '"',
    '"': '"',
    ''': "'",
    ''': "'",
    '–': '-',
    '—': '-',
    '…': '...',
    '™': 'TM',
    '®': '(R)',
    '©': '(C)',
    '°': ' degrees',
    '±': '+/-',
    '×': 'x',
    '÷': '/',
    '≈': '~',
    '≠': '!=',
    '≤': '<=',
    '≥': '>=',
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
