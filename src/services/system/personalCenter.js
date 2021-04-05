import request from '@/utils/request';
// 获取绑定的账户列表
export async function AuthUserSubVO(data) {
  return request('person/AuthUserSubVO', { data });
}

// 绑定账户
export async function personbind(data) {
  return request('person/bind', { data });
}

// 换绑管理员
export async function changeBind(data) {
  return request('person/changeBind', { data });
}

// 获取基本信息
export async function getAuthInfo(data) {
  return request('person/getAuthInfo', { data });
}

// 通过标识获取用户
export async function getByFlag(data) {
  return request('person/getByFlag', { data });
}

// 获取故事
export async function getDetails(data) {
  return request('person/getDetails', { data });
}

// 获取联系电话
export async function getMobile(data) {
  return request('person/getMobile', { data });
}

// 解绑账户
export async function personunbind(data) {
  return request('person/unbind', { data });
}

// 修改联系电话或者故事
export async function updateperson(data) {
  return request('person/update', { data });
}

// 修改基础信息--需要审核的
export async function updateBaseAuthInfo(data) {
  return request('person/updateBaseAuthInfo', { data });
}