// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str);
}

// 密码校验（6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种）
export function isvalidPassword(str) {
  const reg =/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/;
  return reg.test(str);
}

//   验证用户名  用户名要求 数字加英文，不包含特殊字符
export function isvalidUsername(str) {
  const reg = /^[a-zA-Z0-9]+$/;
  return reg.test(str);
}
