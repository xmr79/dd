import request from '@/utils/request';
// 获取系统配置
export async function getConfig(data) {
  return request('systemConfig/getConfig', { data });
}

// 修改系统配置
export async function updateConfig(data) {
  return request('systemConfig/updateConfig', { data });
}

// 支付记录列表
export async function earnestMoneyPayLogList(data) {
  return request('earnestMoneyPayLog/list', { data });
}

// 支付保证金
export async function payInvest(data) {
  return request('pay/invest', { data });
}

// 确认支付是否完成
export async function getByOrderNo(data) {
  return request('earnestMoneyPayLog/getByOrderNo', { data });
}

// 保证金充值
export async function invest(data) {
  return request('pay/invest', { data });
}

// 确认邮件发送
export async function comfirmSend(data) {
  return request('earnestMoneyPayLog/comfirmSend', { data });
}

// 确认打款
export async function comfirmPayment(data) {
  return request('earnestMoneyPayLog/comfirmPayment', { data });
}
