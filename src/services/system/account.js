import request from '@/utils/request';
// 获取账号列表
export async function accountList(data) {
  return request('admin/list', { data });
}
// 删除管理员
export async function accountDelete(data) {
  return request('admin/delete', { data });
}
// 检查账号是否存在
export async function checkAccount(data) {
  return request('admin/checkUsername', { data });
}
// 查看账号详情
export async function getAdmin(data) {
  return request('admin/get', { data });
}
// 更改管理员状态
export async function updateStatus(data) {
  return request('admin/updateStatus', { data });
}
// 修改管理员密码
export async function updatePassword(data) {
  return request('admin/updatePassword', { data });
}
// 重置管理员密码
export async function resetPassword(data) {
  return request('admin/resetPassword', { data });
}
// 新增或编辑管理员
export async function accountSave(data) {
  if (data.id) {
    return request('admin/update', { data });
  } else {
    return request('admin/add', { data });
  }
}
// 获取角色列表
export async function rolesList(data) {
  return request('role/list', { data });
}
// 获取所有角色-未分页
export async function allRolesList(data) {
  return request('role/listAll', { data });
}
// 删除角色
export async function roleDelete(data) {
  return request('role/delete', { data });
}
// 修改或新增角色
export async function roleSave(data) {
  return request('role/save', { data });
}
// 获取角色详情 不传id时为新增时获取所有权限列表
export async function roleGetRole(data) {
  if (data.id) {
    return request('role/get', { data });
  } else {
    return request('role/listAllPermission', { data, method: 'get' });
  }
}

// 检查账号是否存在
export async function checkRoleName(data) {
  return request('role/checkRoleName', { data });
}

//获取主管列表
export async function getParentAccount(data) {
  return request('siteDetail/assignable/username/list', { params: { type: 'MANAGER' } });
}
