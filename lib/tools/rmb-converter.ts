// 名称: 人民币大写转换函数
// 描述: 实现数字金额到中文大写金额的算法逻辑
// 路径: Globokit/lib/tools/rmb-converter.ts
// 作者: Jensfrank
// 更新时间: 2026-01-08

export function numberToChinese(num: number): string {
  if (!Number.isFinite(num)) return '请输入有效数字';
  if (num === 0) return '人民币零元整';
  if (num < 0) return '请输入正数';
  if (num > 999999999999999) return '数字太大，无法转换';
  
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const smallUnits = ['', '拾', '佰', '仟'];
  const groupUnits = ['', '万', '亿', '兆'];
  // 先将完整金额取整到分，避免 1.999 四舍五入后产生“10角”。
  const amountInFen = Math.round((num + Number.EPSILON) * 100);
  const intPart = Math.floor(amountInFen / 100);
  const decimal = amountInFen % 100;

  const convertGroup = (group: number) => {
    let text = '';
    let pendingZero = false;
    for (let position = 3; position >= 0; position--) {
      const divisor = 10 ** position;
      const digit = Math.floor(group / divisor) % 10;
      if (digit === 0) {
        if (text) pendingZero = true;
      } else {
        if (pendingZero) text += '零';
        text += digits[digit] + smallUnits[position];
        pendingZero = false;
      }
    }
    return text;
  };

  let result = '';
  if (intPart > 0) {
    const groups: number[] = [];
    let remaining = intPart;
    while (remaining > 0) {
      groups.push(remaining % 10000);
      remaining = Math.floor(remaining / 10000);
    }
    let pendingZero = false;
    for (let index = groups.length - 1; index >= 0; index--) {
      const group = groups[index];
      if (group === 0) {
        if (result) pendingZero = true;
        continue;
      }
      if (result && (pendingZero || group < 1000)) result += '零';
      result += convertGroup(group) + groupUnits[index];
      pendingZero = false;
    }
  } else {
    result = '零';
  }
  
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
      if (jiao === 0) result += '零';
      result += digits[fen] + '分';
    }
  } else {
    result += '整';
  }
  
  return '人民币' + result;
}

// 测试函数
export function testRMBConverter() {
  const testCases = [
    // 基础测试
    { input: 0, expected: '人民币零元整' },
    { input: 1, expected: '人民币壹元整' },
    { input: 10, expected: '人民币壹拾元整' },
    { input: 100, expected: '人民币壹佰元整' },
    { input: 1000, expected: '人民币壹仟元整' },
    { input: 10000, expected: '人民币壹万元整' },
    
    // 关键测试：10509及类似情况
    { input: 10509, expected: '人民币壹万零伍佰零玖元整' },
    { input: 10001, expected: '人民币壹万零壹元整' },
    { input: 10010, expected: '人民币壹万零壹拾元整' },
    { input: 10100, expected: '人民币壹万零壹佰元整' },
    { input: 10050, expected: '人民币壹万零伍拾元整' },
    { input: 10005, expected: '人民币壹万零伍元整' },
    
    // 更多万位零的测试
    { input: 20304, expected: '人民币贰万零叁佰零肆元整' },
    { input: 30405, expected: '人民币叁万零肆佰零伍元整' },
    { input: 40506, expected: '人民币肆万零伍佰零陆元整' },
    { input: 50607, expected: '人民币伍万零陆佰零柒元整' },
    { input: 60708, expected: '人民币陆万零柒佰零捌元整' },
    { input: 70809, expected: '人民币柒万零捌佰零玖元整' },
    { input: 80090, expected: '人民币捌万零玖拾元整' },
    { input: 90009, expected: '人民币玖万零玖元整' },
    
    // 正常万位（千位不为0）
    { input: 11000, expected: '人民币壹万壹仟元整' },
    { input: 12345, expected: '人民币壹万贰仟叁佰肆拾伍元整' },
    { input: 23456, expected: '人民币贰万叁仟肆佰伍拾陆元整' },
    
    // 十万位测试
    { input: 100001, expected: '人民币壹拾万零壹元整' },
    { input: 105009, expected: '人民币壹拾万伍仟零玖元整' },
    { input: 150000, expected: '人民币壹拾伍万元整' },
    
    // 百万位测试
    { input: 1000001, expected: '人民币壹佰万零壹元整' },
    { input: 1050009, expected: '人民币壹佰零伍万零玖元整' },
    
    // 小数测试
    { input: 10.5, expected: '人民币壹拾元伍角' },
    { input: 10.05, expected: '人民币壹拾元零伍分' },
    { input: 10.55, expected: '人民币壹拾元伍角伍分' },
    { input: 10509.99, expected: '人民币壹万零伍佰零玖元玖角玖分' },
  ];
  
  console.log('人民币大写转换测试');
  console.log('='.repeat(100));
  
  let passCount = 0;
  let failedCases: Array<{input: number, expected: string, result: string}> = [];
  
  testCases.forEach(({ input, expected }, index) => {
    const result = numberToChinese(input);
    const isCorrect = result === expected;
    
    if (isCorrect) {
      passCount++;
      console.log(`✅ ${(index + 1).toString().padStart(2)}: ${input.toString().padEnd(10)} => 正确`);
    } else {
      failedCases.push({ input, expected, result });
      console.log(`❌ ${(index + 1).toString().padStart(2)}: ${input.toString().padEnd(10)} => 错误`);
      console.log(`    期望: ${expected}`);
      console.log(`    实际: ${result}`);
    }
  });
  
  console.log('='.repeat(100));
  console.log(`测试结果: ${passCount}/${testCases.length} 通过 (${(passCount/testCases.length*100).toFixed(1)}%)`);
  
  if (failedCases.length === 0) {
    console.log('🎉 所有测试通过！');
  } else {
    console.log(`\n❌ 失败的测试用例: ${failedCases.length}个`);
    failedCases.forEach(({ input, expected, result }) => {
      console.log(`  ${input}: 期望[${expected}] 实际[${result}]`);
    });
  }
  
  // 专门验证10509
  console.log('\n🎯 验证核心问题 10509:');
  const result10509 = numberToChinese(10509);
  const expected10509 = '人民币壹万零伍佰零玖元整';
  console.log(`输入: 10509`);
  console.log(`输出: ${result10509}`);
  console.log(`预期: ${expected10509}`);
  console.log(`状态: ${result10509 === expected10509 ? '✅ 问题已解决！' : '❌ 问题仍存在'}`);
  
  return passCount === testCases.length;
}
