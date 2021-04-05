import request from '@/utils/request';
// 装修页面
export async function savePage(data) {
  return request('customPage/savePage', { data });
}

// 新增页面/编辑信息
export async function saveInfo(data) {
  return request('customPage/saveInfo', { data });
}

// 自定义页面列表
export async function customPageList(data) {
  return request('customPage/list', { data });
}

// 自定义页面详情
export async function getCmsPageDetail(data) {
  return request('customPage/get', { data });
}

// 自定义页面删除
export async function getCmsPageDelete(data) {
  return request('customPage/delete', { data });
}
