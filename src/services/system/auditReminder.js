import request from '@/utils/request';
// 审核提醒列表
export async function wxRobotConfigList(data) {
  return request('wxRobotConfig/list', { data });
}

// 删除
export async function wxRobotConfigDelete(data) {
  return request('wxRobotConfig/delete', { data });
}

// 新增页面/编辑信息
export async function wxRobotConfigSaveInfo(data) {
  return request('wxRobotConfig/save', { data });
}
