import request from '@/utils/request';
// 用户增长趋势
export async function indexUserStat(data) {
  return request('index/userStat', { data });
}

// 用户关注/收藏趋势
export async function indexUserAttentionStat(data) {
  return request('index/userAttentionStat', { data });
}

// 待处理数量
export async function indexPending(data) {
  return request('index/pending', { data });
}

// 用户文章趋势
export async function indexContentInteractStat(data) {
  return request('index/contentInteractStat', { data });
}

// 首页实时数据
export async function activityOrderIndexStat(data) {
  return request('activityOrder/indexStat', { data, method: 'get' });
}
