import request from '@/utils/request';
// 列表
export async function contentCategoryList(data) {
  return request('contentCategory/list', { data });
}
// 删除
export async function contentCategoryDelete(data) {
  return request('contentCategory/delete', { data });
}
// 新增/修改
export async function contentCategoryAdd(data) {
  return request('contentCategory/add', { data });
}

// 标签列表
export async function contentTagList(data) {
  return request('contentTag/list', { data });
}
// 删除
export async function contentTagDelete(data) {
  return request('contentTag/delete', { data });
}
// 新增/修改
export async function contentTagAdd(data) {
  return request('contentTag/add', { data });
}

// 文章保存和修改
export async function contentRecordSave(data) {
  return request('contentRecord/save', { data });
}

// 文章审核列表
export async function contentRecordList(data) {
  return request('contentRecord/list', { data });
}

// 查询文章审核内容
export async function contentRecordGet(data) {
  return request('contentRecord/get', { data });
}

// 删除审核
export async function contentRecordDelete(data) {
  return request('contentRecord/delete', { data });
}

// 审核
export async function contentRecordAudit(data) {
  return request('contentRecord/audit', { data });
}

// 文章列表
export async function contentList(data) {
  return request('content/list', { data });
}

// 查询文章
export async function contentGet(data) {
  return request('content/get', { data });
}

// 查询认证用户的文章
export async function contentListAuth(data) {
  return request('content/listAuth', { data });
}

// 文章评论删除
export async function contentEvaluationDelete(data) {
  return request('contentEvaluation/delete', { data });
}

// 文章评论列表
export async function contentEvaluatiolist(data) {
  return request('contentEvaluation/list', { data });
}

// 文章评论置顶
export async function contentEvaluationTop(data) {
  return request('contentEvaluation/top', { data });
}

// 文章评论置顶
export async function contentDelete(data) {
  return request('content/delete', { data });
}

// 预览
export async function contentPreview(data) {
  return request(`contentRecord/preview`, { data });
}
