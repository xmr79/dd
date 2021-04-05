// 手机号正则
export const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
// url校验
export const urlReg = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/;
// 字母校验
export const letterReg = /[A-Za-z]/;
// 是否包含数字
export const numReg = /\d+/;
//金额
export const moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/;

//固话
export const telReg = /^0\d{2,3}-?\d{7,8}$/;

// 邮箱
export const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
