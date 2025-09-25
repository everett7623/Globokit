// 名称: 人民币大写转换工具函数（简化修复版）
// 描述: 修复万位零的问题的简单方案
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
      // 修复：检查组间是否需要添加零
      if (result !== '') {
        let currentGroupNum = parseInt(group);
        let bigUnitIndex = groups.length - 1 - i;
        
        // 关键修复：如果是万位组且小于1000，说明千位为0，需要加零
        if (bigUnitIndex === 1 && currentGroupNum < 1000) {
          result += '零';
        }
        // 亿位组同理
        else if (bigUnitIndex === 2 && currentGroupNum < 1000) {
          result += '零';
        }
      }
      
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
  result = result.replace(/零([万亿兆])/g, '$1');
  
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
    
    // 关键测试：万位零的情况
    { input: 10509, expected: '人民币壹万零伍佰零玖元整' },
    { input: 10001, expected: '人民币壹万零壹元整' },
    { input: 10010, expected: '人民币壹万零壹拾元整' },
    { input: 10100, expected: '人民币壹万零壹佰元整' },
    { input: 20304, expected: '人民币贰万零叁佰零肆元整' },
    { input: 50008, expected: '人民币伍万零捌元整' },
    
    // 正常万位（不需要零）
    { input: 11000, expected: '人民币壹万壹仟元整' },
    { input: 12345, expected: '人民币壹万贰仟叁佰肆拾伍元整' },
    
    // 十万位测试
    { input: 100001, expected: '人民币壹拾万零壹元整' },
    { input: 105009, expected: '人民币壹拾万伍仟零玖元整' },
    
    // 百万位测试
    { input: 1000001, expected: '人民币壹佰万零壹元整' },
    { input: 1050009, expected: '人民币壹佰零伍万零玖元整' },
    
    // 小数测试
    { input: 10.5, expected: '人民币壹拾元伍角' },
    { input: 10.05, expected: '人民币壹拾元零伍分' },
    { input: 10.55, expected: '人民币壹拾元伍角伍分' },
  ];
  
  console.log('人民币大写转换测试结果：');
  console.log('='.repeat(100));
  
  let passCount = 0;
  
  testCases.forEach(({ input, expected }) => {
    const result = numberToChinese(input);
    const isCorrect = result === expected;
    const status = isCorrect ? '✅' : '❌';
    
    if (isCorrect) {
      passCount++;
    }
    
    console.log(`${status} ${input.toString().padEnd(10)} => ${result}`);
    if (!isCorrect) {
      console.log(`   期望: ${expected}`);
    }
  });
  
  console.log('='.repeat(100));
  console.log(`测试完成: ${passCount}/${testCases.length} 个通过 (${(passCount/testCases.length*100).toFixed(1)}%)`);
  
  // 专门测试你提到的问题
  console.log('\n🔍 专门测试 10509:');
  const result10509 = numberToChinese(10509);
  console.log(`输入: 10509`);
  console.log(`输出: ${result10509}`);
  console.log(`预期: 人民币壹万零伍佰零玖元整`);
  console.log(`状态: ${result10509 === '人民币壹万零伍佰零玖元整' ? '✅ 修复成功' : '❌ 仍有问题'}`);
}
