// 名称: 人民币大写转换工具函数
// 描述: 提供人民币大写转换工具函数
// 路径: seedtool/lib/tools/rmb-converter.ts
// 作者: Jensfrank
// 更新时间: 2025-09-25

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
    
    // 转换当前组内的数字
    for (let j = 0; j < group.length; j++) {
      let digit = parseInt(group[j]);
      if (digit !== 0) {
        // 如果前面有0且当前组结果不为空，需要加零
        if (j > 0 && parseInt(group[j-1]) === 0 && groupResult !== '') {
          groupResult += '零';
        }
        groupResult += digits[digit] + units[group.length - 1 - j];
        hasNonZero = true;
      }
    }
    
    if (hasNonZero) {
      // 检查是否需要在组之间添加零
      if (result !== '') {
        // 如果当前组的最高位是0（即组内数字小于相应的单位），需要添加零
        let groupNum = parseInt(group);
        let bigUnitIndex = groups.length - 1 - i;
        
        // 检查当前组是否需要前置零
        if (bigUnitIndex === 1) { // 万位组
          if (groupNum < 1000) { // 万位组小于1000，说明千位是0
            result += '零';
          }
        } else if (bigUnitIndex === 2) { // 亿位组
          if (groupNum < 1000) { // 亿位组小于1000，说明千万位是0
            result += '零';
          }
        }
      }
      
      // 添加当前组的转换结果
      result += groupResult;
      
      // 添加大单位
      let bigUnitIndex = groups.length - 1 - i;
      if (bigUnitIndex > 0) {
        result += bigUnits[bigUnitIndex];
      }
    }
  }
  
  // 清理多余的零
  result = result.replace(/零+/g, '零');
  result = result.replace(/零([万亿兆])/g, '$1'); // 去除单位前的零
  
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

// 改进的测试用例
export function testRMBConverter() {
  const testCases = [
    { input: 0, expected: '人民币零元整' },
    { input: 1, expected: '人民币壹元整' },
    { input: 10, expected: '人民币壹拾元整' },
    { input: 100, expected: '人民币壹佰元整' },
    { input: 1000, expected: '人民币壹仟元整' },
    { input: 10000, expected: '人民币壹万元整' },
    { input: 10001, expected: '人民币壹万零壹元整' },
    { input: 10010, expected: '人民币壹万零壹拾元整' },
    { input: 10100, expected: '人民币壹万零壹佰元整' },
    { input: 10509, expected: '人民币壹万零伍佰零玖元整' }, // 关键测试用例
    { input: 11000, expected: '人民币壹万壹仟元整' },
    { input: 20304, expected: '人民币贰万零叁佰零肆元整' },
    { input: 100001, expected: '人民币壹拾万零壹元整' },
    { input: 105009, expected: '人民币壹拾万伍仟零玖元整' },
    { input: 1000001, expected: '人民币壹佰万零壹元整' },
    { input: 1050009, expected: '人民币壹佰零伍万零玖元整' },
    { input: 10.5, expected: '人民币壹拾元伍角' },
    { input: 10.05, expected: '人民币壹拾元零伍分' },
    { input: 10.55, expected: '人民币壹拾元伍角伍分' },
  ];
  
  console.log('人民币大写转换测试结果：');
  testCases.forEach(({ input, expected }) => {
    const result = numberToChinese(input);
    const isCorrect = result === expected;
    console.log(`${input.toString().padEnd(8)} => ${result.padEnd(30)} ${isCorrect ? '✓' : '✗ (期望: ' + expected + ')'}`);
  });
}
