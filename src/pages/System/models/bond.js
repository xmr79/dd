import {
  getConfig,
  updateConfig,
  payInvest,
  comfirmSend,
  comfirmPayment,
} from '@/services/system/bond';
import { message } from 'antd';
export default {
  namespace: 'bond',
  state: {
    bondConfig: {},
  },
  effects: {
    //
    *updateConfig({ payload }, { call, put, select }) {
      const { status, data } = yield call(updateConfig, payload);
      if (status === 1) {
        message.success(`保存成功`);
      }
    },
    //
    *comfirmSend({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(comfirmSend, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
      }
    },
    //
    *comfirmPayment({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(comfirmPayment, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
      }
    },
    *getConfig({ payload }, { call, put }) {
      const res = yield call(getConfig, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            bondConfig: res.data ? res.data : {},
          },
        });
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
