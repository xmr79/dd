import request from '@/utils/request';
import { urlConfig } from '@/common';
const { msg_Api, msg_code } = urlConfig;

function getObj(data, method) {
  const code = localStorage.getItem('noticeCode');
  return method === 'get'
    ? {
        params: {
          code: code,
          ...data,
        },
        prefix: msg_Api,
        method,
      }
    : {
        data: {
          code: code,
          ...data,
        },
        prefix: msg_Api,
      };
}
// 通知消息列表查询
export function listNotifyList(data) {
  return request('msgLog/listNotifyList', { ...getObj(data) });
}

// 清空消息
export function clearMsg(data) {
  return request('msgLog/clearMsg', { ...getObj(data) });
}

// 待办消息列表查询
export function listWpList(data) {
  return request('msgLog/listWpList', { ...getObj(data) });
}

// 消息数量
export function msgCount(data) {
  return request('msgLog/msgCount', { ...getObj(data) });
}

// 修改消息状态
export function updateMsg(data) {
  return request('msgLog/updateMsg', { ...getObj(data) });
}
