import request from '@/utils/request';
///查询账号详情
export async function adminDetails(value) {
  return request('admin/adminInfo', { data: value, method: 'get' });
}

//发送短信验证码
export async function codesend(value) {
  return request('sms/verificationCode', { data: { ...value } });
}

//注册
export async function register(value) {
  return request('admin/registry', { data: { ...value } });
}

//忘记密码
export async function forgetPass(value) {
  return request('admin/returnPassword', { data: { ...value } });
}

//重新审核保存基本信息
export async function updateVerifyDetail(value) {
  return request('admin/updateVerifyDetail', { data: { ...value } });
}

//重新审核获取回显信息
export async function getVerifyEchoDetail(value) {
  return request('admin/getVerifyEchoDetail', { data: { ...value } });
}

//获取认证审核状态
export async function getAuthStatus(value) {
  return request('admin/getAuthStatus', { data: { ...value } });
}

//获取推广二维码
export async function getExtensionQrcode(value) {
  return request('extension/getExtensionQrcode', { data: {...value} });
}
