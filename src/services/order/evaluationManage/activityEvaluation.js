import request from '@/utils/request';
// 评价列表
export async function activityEvaluationList(data) {
  return request('activityEvaluation/list', { data });
}
// 置顶评价
export async function activityEvaluationTop(data) {
  const { id } = data;
  return request(`activityEvaluation/top?id=${id}`, { data });
}

// 取消置顶
export async function activityEvaluationCancelTop(data) {
  const { id } = data;
  return request(`activityEvaluation/cancelTop?id=${id}`, { data });
}

// 删除评价
export async function activityEvaluationDelete(data) {
  const { id } = data;
  return request(`activityEvaluation/delete?id=${id}`, { data });
}
