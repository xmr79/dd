import {
  unsubscribeRecordAudit,
  unsubscribeRecordConfirm,
  unsubscribeUpdateMoney,
} from '@/services/system/unsubscribe';
import { message } from 'antd';
export default {
  namespace: 'cancellation',
  state: {},
  effects: {
    //用户推荐审核
    *unsubscribeRecordAudit({ payload }, { call, put, select }) {
      const { params, reload } = payload;

      const { status, data } = yield call(unsubscribeRecordAudit, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },
    //用户推荐审核
    *unsubscribeRecordConfirm({ payload }, { call, put, select }) {
      const { params, reload } = payload;

      const { status, data } = yield call(unsubscribeRecordConfirm, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },
    //修改保证金
    *unsubscribeUpdateMoney({ payload }, { call, put, select }) {
      const { params, reload } = payload;

      const { status, data } = yield call(unsubscribeUpdateMoney, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        yield put({ type: 'global/closeModal' });
        reload();
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
