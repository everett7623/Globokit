export function numberToChinese(num: number): string {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const units = ['', '拾', '佰', '仟'];
  const bigUnits = ['', '万', '亿', '兆'];
  
  if (num === 0) return '人民币零元整';
  if (num < 0) return '请输入正数';
  if (num > 999999999999999) return '数字太大，无法转换';
  
  let result = '';
  let numStr = Math.floor(num).toString();
  let decimal = Math.round((num - Math.floor(num)) * 100);
  
  // 按万位分组处理
  let groups = [];
  let tempStr = numStr;
  while (tempStr.length > 0) {
    if (tempStr.length > 4) {
      groups.unshift(tempStr.slice(-4));
      tempStr = tempStr.slice(0, -4);
    } else {
      groups.unshift(tempStr);
      tempStr = '';
    }
  }
  
  // 处理每组
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    let groupResult = '';
    let hasNonZero = false;
    
    for (let j = 0; j < group.length; j++) {
      let digit = parseInt(group[j]);
      if (digit !== 0) {
        if (j > 0 && group[j-1] === '0' && groupResult !== '') {
          groupResult += '零';
        }
        groupResult += digits[digit] + units[group.length - 1 - j];
        hasNonZero = true;
      }
    }
    
    if (hasNonZero) {
      // 添加大单位
      let bigUnitIndex = groups.length - 1 - i;
      if (bigUnitIndex > 0) {
        groupResult += bigUnits[bigUnitIndex];
      }
      
      // 处理连接
      if (result !== '' && !groupResult.startsWith('零')) {
        // 检查是否需要加零
        let lastGroup = groups[i-1];
        if (lastGroup && lastGroup[lastGroup.length-1] === '0') {
          result += '零';
        }
      }
      
      result += groupResult;
    } else if (i < groups.length - 1 && result !== '') {
      // 如果当前组全是0，但不是最后一组，可能需要加零
      let nextGroupHasNonZero = false;
      for (let k = i + 1; k < groups.length; k++) {
        if (parseInt(groups[k]) > 0) {
          nextGroupHasNonZero = true;
          break;
        }
      }
      if (nextGroupHasNonZero && !result.endsWith('零')) {
        result += '零';
      }
    }
  }
  
  // 清理多余的零
  result = result.replace(/零+/g, '零');
  result = result.replace(/零$/, '');
  
  // 添加"元"
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
  
  // 添加"人民币"前缀
  return '人民币' + result;
}

// 测试用例
export function testRMBConverter() {
  const testCases = [
    { input: 0, expected: '人民币零元整' },
    { input: 1, expected: '人民币壹元整' },
    { input: 10, expected: '人民币壹拾元整' },
    { input: 100, expected: '人民币壹佰元整' },
    { input: 1000, expected: '人民币壹仟元整' },
    { input: 10000, expected: '人民币壹万元整' },
    { input: 100000, expected: '人民币壹拾万元整' },
    { input: 1000000, expected: '人民币壹佰万元整' },
    { input: 10000000, expected: '人民币壹仟万元整' },
    { input: 100000000, expected: '人民币壹亿元整' },
    { input: 1234, expected: '人民币壹仟贰佰叁拾肆元整' },
    { input: 10001, expected: '人民币壹万零壹元整' },
    { input: 10010, expected: '人民币壹万零壹拾元整' },
    { input: 10100, expected: '人民币壹万零壹佰元整' },
    { input: 11000, expected: '人民币壹万壹仟元整' },
    { input: 100001, expected: '人民币壹拾万零壹元整' },
    { input: 1000001, expected: '人民币壹佰万零壹元整' },
    { input: 10.5, expected: '人民币壹拾元伍角' },
    { input: 10.05, expected: '人民币壹拾元零伍分' },
    { input: 10.55, expected: '人民币壹拾元伍角伍分' },
  ];
  
  testCases.forEach(({ input, expected }) => {
    const result = numberToChinese(input);
    console.log(`${input} => ${result} ${result === expected ? '✓' : '✗ (期望: ' + expected + ')'}`);
  });
}
