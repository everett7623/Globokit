export function numberToChinese(num: number): string {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const units = ['', '拾', '佰', '仟'];
  const bigUnits = ['', '万', '亿', '兆'];
  
  if (num === 0) return '零元整';
  
  let result = '';
  let numStr = Math.floor(num).toString();
  let decimal = Math.round((num - Math.floor(num)) * 100);
  
  // 处理整数部分
  let unitIndex = 0;
  let zeroCount = 0;
  
  for (let i = numStr.length - 1; i >= 0; i--) {
    const digit = parseInt(numStr[i]);
    const unitPos = (numStr.length - 1 - i) % 4;
    const bigUnitPos = Math.floor((numStr.length - 1 - i) / 4);
    
    if (digit === 0) {
      zeroCount++;
    } else {
      if (zeroCount > 0 && unitPos !== 0) {
        result = '零' + result;
      }
      zeroCount = 0;
      result = digits[digit] + units[unitPos] + result;
    }
    
    if (unitPos === 0 && bigUnitPos > 0) {
      if (result.substring(0, 1) !== '零') {
        result = bigUnits[bigUnitPos] + result;
      }
    }
  }
  
  result += '元';
  
  // 处理小数部分
  if (decimal > 0) {
    const jiao = Math.floor(decimal / 10);
    const fen = decimal % 10;
    
    if (jiao > 0) {
      result += digits[jiao] + '角';
    }
    if (fen > 0) {
      result += digits[fen] + '分';
    }
  } else {
    result += '整';
  }
  
  return result;
}

export function parseChineseNumber(chinese: string): number | null {
  // 简化版本，实际实现需要更复杂的解析逻辑
  const digitMap: { [key: string]: number } = {
    '零': 0, '壹': 1, '贰': 2, '叁': 3, '肆': 4,
    '伍': 5, '陆': 6, '柒': 7, '捌': 8, '玖': 9
  };
  
  // 这里应该实现完整的中文转数字逻辑
  // 为了示例，返回null表示需要实现
  return null;
}
