import request from '@/utils/request';
// 导师列表
export async function tutorList(data) {
  return request('tutor/list', { data });
}

export async function tutorListAll(data) {
  return request('tutor/listAll', { data });
}

// 保存导师
export async function tutorSave(data) {
  return request('tutor/save', { data });
}

// 删除导师
export async function tutorDelete(data) {
  const { id } = data;
  return request(`tutor/delete?id=${id}`, {});
}
