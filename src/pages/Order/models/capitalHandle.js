import { invoiceRefuse, invoiceDraw, refundApply, configPay , notPay} from '@/services/order/invoice';
import { message } from 'antd';
export default {
  namespace: 'capitalHandle',
  state: {},
  effects: {
    // 审核拒绝
    *confirmRefuse({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status } = yield call(invoiceRefuse, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
        yield put({ type: 'global/closeModal' });
      }
    },
    // 确认退款
    *configRefund({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status } = yield call(refundApply, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
        yield put({ type: 'global/closeModal' });
      }
    },
    // 确认已打款
    *confirmPayent({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status } = yield call(configPay, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
        yield put({ type: 'global/closeModal' });
      }
    },
    // 未收到打款
    *notReceived({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status } = yield call(notPay, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
        yield put({ type: 'global/closeModal' });
      }
    },
    // 确认已开票
    *confirmHandle({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status } = yield call(invoiceDraw, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
        yield put({ type: 'global/closeModal' });
      }
    },
  },
  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
