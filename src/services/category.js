import request from '@/utils/request';

// 分类删除
export async function categoryDelete(data) {
  return request('category/delete', { data });
}

// 分类列表
export async function categoryList(data) {
  return request('category/list', { data });
}

// 分类保存编辑
export async function categorySave(data) {
  return request('category/save', { data });
}
