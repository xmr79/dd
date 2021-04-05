import request from '@/utils/request';
// 日志列表
export async function journalList(data) {
  return request('system/log/list', { data });
}
