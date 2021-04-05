import request from '@/utils/request';
// 获取活动列表
export async function activityList(data) {
  return request('activity/list', { data });
}

// 查看所有活动 无数据隔离
export async function activitylistAll(data) {
  return request('activity/listAll', { data });
}

// 根据标题精准查询活动
export async function activityGetByTitle(data) {
  return request('activity/getAndVerify', { params: data, method: 'get' });
}

// 获取活动详情
export async function getactivityDetail(data) {
  return request('activity/get', { params: data, method: 'get' });
}

// 获取活动分类
export async function activitySortList(data) {
  return request('activityCategory/list', { data });
}

// 获取活动分类新增
export async function activityCategoryAdd(data) {
  const { id } = data;
  if (id) {
    return request('activityCategory/update', { data });
  } else {
    return request('activityCategory/add', { data });
  }
}

// 获取活动分类删除
export async function activitySortDelete(data) {
  const { id } = data;
  return request(`activityCategory/delete?id=${id}`, {});
}

// 获取活动标签
export async function activityTagList(data) {
  return request('activityTag/list', { data });
}

// 获取活动标签新增
export async function activityTagAdd(data) {
  const { id } = data;
  if (id) {
    return request('activityTag/update', { data });
  } else {
    return request('activityTag/add', { data });
  }
}
// 获取活动标签删除
export async function activityTagDelete(data) {
  const { id } = data;
  return request(`activityTag/delete?id=${id}`, {});
}
// 活动审核删除
export async function activityReviewDelete(data) {
  const { id } = data;
  return request(`activityReview/delete?id=${id}`, {});
}

// 审核列表
export async function activityReviewList(data) {
  return request('activityReview/list', { data });
}

// 审核活动
export async function activityAudit(data) {
  return request('activityReview/review', { data });
}

// 保存活动
export async function saveActivity(data) {
  return request('activityReview/save', { data });
}
// 保存活动为草稿箱
export async function saveDraftActivity(data) {
  return request('activityReview/saveDraft', { data });
}
// 查询审核活动详情
export async function activityReviewDetail(data) {
  return request('activityReview/get', { params: data, method: 'get' });
}

// 结束活动
export async function activityFinish(data) {
  const { id, title } = data;
  return request(`activity/end?id=${id}&title=${encodeURIComponent(title)}`, {});
}

// 复制活动
export async function activityCopy(data) {
  const { id } = data;
  return request(`activity/copy?id=${id}`, {});
}

// 修改排序
export async function activityCategoryUpdateSort(data) {
  return request(`activityCategory/updateSort`, { data });
}

// 修改排序
export async function activityList2(data) {
  return request(`activity/list2`, { data });
}

// 预览
export async function activityPreview(data) {
  return request(`activityReview/preview`, { data });
}

// 活动体验者列表
export async function activityVisitorList(data) {
  return request(`activityReview/visitorList`, { data });
}

// 手动导入体验者
export async function manualImportVisitors(data) {
  return request(`activityReview/manualImportVisitors`, { data });
}

// 移除体验者
export async function deleteVisitor(data) {
  return request(`activityReview/deleteVisitor`, { params: data, method: 'get' });
}

// 文件导入体验者
export async function importVisitors(data) {
  const { file, params } = data;
  const formData = new FormData();
  formData.append('file', file);
  return request(`activityReview/importVisitors`, { data: formData, params, requestType: 'form' });
}

// 根据团体活动ID获取订单详情
export async function getTeamActivityOrder(data) {
  return request(`activityOrder/getTeamActivityOrder`, { params: data, method: 'get' });
}

// 根据订单ID查询体验者
export async function selectActivityOrderVisitorList(data) {
  return request(`activityOrder/selectActivityOrderVisitorList`, { data });
}
