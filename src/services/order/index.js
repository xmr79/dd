import request from '@/utils/request';
// 后台订单列表
export async function activityOrderbosList(data) {
  return request('activityOrder/bosList', { data });
}
// 订单详情
export async function activityOrderDetail(data) {
  return request('activityOrder/get', { params: data, method: 'get' });
}
// 佣金明细
export async function commissionDetailList(data) {
  return request('commissionDetail/list', { data });
}

// 查看佣金详情
export async function commissionDetailSelectDetail(data) {
  return request('commissionDetail/selectDetail', { data });
}

// 对账单
export async function commissionDetailStatList(data) {
  return request('commissionDetail/statList', { data });
}

// 平台账单
export async function platformStatList(data) {
  return request('platformStat/list', { data });
}

// 资金流水
export async function payLogList(data) {
  return request('payLog/list', { data });
}

// 退款管理
export async function activityRefundList(data) {
  return request('activityRefund/list', { data });
}

// 发起批量退款 根据活动标题查询活动场次调用活动列表的接口 和获取详情活动
export async function batchRefund(data) {
  const { title } = data;
  return request('batchRefund/batchRefund', { params: { ...data, title: encodeURIComponent(title) } });
}

// 批量退款列表
export async function batchRefundList(data) {
  return request('batchRefund/list', { data });
}

// 资金流水导出
export async function payLogExport(data) {
  return request('payLog/export', { data });
}

// 平台账单导出
export async function platformStatExport(data) {
  return request('platformStat/export', { data });
}

// 佣金明细导出
export async function commissionDetailExport(data) {
  return request('commissionDetail/export', { data });
}

// 对账单导出
export async function commissionDetailExportStatement(data) {
  return request('commissionDetail/exportStatement', { data });
}

// 订单导出
export async function BillExport (data) {
  return request('/activityOrder/export', { data })
}
