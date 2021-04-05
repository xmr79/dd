import request from '@/utils/request';
// 团体活动列表
export async function payoffList(data) {
  return request('activityOrder/payOfflineList', { data });
}
// 确认线下收款
export async function configPay(data) {
  return request('activityOrder/confirmPayOffline', { data });
}
// 未收到打款
export async function notPay(data) {
  return request('activityOrder/confirmUnCollectionPay', { data });
}
// 发票管理列表
export async function invoiceList(data) {
  return request('invoice/list', { data });
}
// 审核拒绝
export async function invoiceRefuse(data) {
  return request('invoice/refuse', { data });
}
// 确认已开票
export async function invoiceDraw(data) {
  return request(`invoice/draw`, { data });
}
// 退款申请列表
export async function refundList(data) {
  return request('activityRefund/refundApplyList', { data });
}
// 确认退款
export async function refundApply(data) {
  const { refundApplyId } = data;
  return request(`activityRefund/confirmRefundApply?refundApplyId=${refundApplyId}`, { data, method: 'GET' });
}