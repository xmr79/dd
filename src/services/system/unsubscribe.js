import request from '@/utils/request';
//
export async function unsubscribeRecordAudit(data) {
  return request('unsubscribeRecord/audit', { data });
}

//
export async function unsubscribeRecordConfirm(data) {
  return request('unsubscribeRecord/confirm', { data });
}

//确认退还
export async function unsubscribeRecordConfirmReturn(data) {
  return request('unsubscribeRecord/confirmReturn', { data });
}

//
export async function unsubscribeRecordGetLast(data) {
  return request('unsubscribeRecord/getLast', { data });
}

//获取注销申请列表
export async function unsubscribeRecordList(data) {
  return request('unsubscribeRecord/list', { data });
}

//撤销
export async function unsubscribeRecordRevocation(data) {
  return request('unsubscribeRecord/revocation', { data });
}

//申请注销
export async function unsubscribeRecordSave(data) {
  return request('unsubscribeRecord/save', { data });
}

//
export async function unsubscribeUpdateMoney(data) {
  return request('unsubscribeRecord/updateMoney', { data });
}

//
export async function unsubscribeGetCompanyStat(data) {
  return request('unsubscribeRecord/getCompanyStat', { data });
}
