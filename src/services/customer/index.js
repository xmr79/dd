import request from '@/utils/request';
// 审核
export async function audit(data) {
  return request('user/audit', { data });
}
//认证审核列表
export async function listAudit(data) {
  return request('user/listAudit', { data });
}
//用户列表
export async function list(data) {
  return request('user/list', { data });
}
//认证用户列表
export async function listAuthUser(data) {
  return request('user/listAuthUser', { data });
}

//企业修改佣金 只有企业单位可以修改
export async function updateBrokerage(data) {
  return request('user/updateBrokerage', { data });
}

//获取认证用户的主页信息
export async function getAuthDetails(data) {
  return request('user/getAuthDetails', { data });
}

//用户推荐列表
export async function userRecommendList(data) {
  return request('userRecommend/list', { data });
}

//用户推荐审核
export async function userRecommendAudit(data) {
  return request('userRecommend/audit', { data });
}

//获取认证用户的主页信息
export async function usergetAuthDetails(data) {
  return request('user/getAuthDetails', { data });
}

//查询认证用户的文章
export async function listAuthContent(data) {
  return request('user/listAuthContent', { data });
}

//专家/企业活动列表
export async function userAdminList(data) {
  return request('user/adminList ', { data });
}

//企业里面的专家评论列表
export async function userCompanyList(data) {
  return request('user/companyList', { data });
}

//批量添加/移除黑名单
export async function userBlacklist(data) {
  return request('user/blacklist', { data });
}

//认证用户 启用/禁用
export async function authBlacklist(data) {
  return request('user/authBlacklist', { data });
}
