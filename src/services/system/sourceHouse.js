import request from '@/utils/request';
// 删除素材
export async function materialDelete(data) {
  return request('material/delete', { data });
}

// 查询素材
export async function getMaterialList(data) {
  return request('material/list', { data });
}

// 保存素材
export async function materialSave(data) {
  return request('material/save', { data });
}

// 更新素材
export async function materialUpdate(data) {
  return request('material/update', { data });
}
