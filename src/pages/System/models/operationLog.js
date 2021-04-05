import { getListAll } from '@/services/common';
import { message } from 'antd';
export default {
  namespace: 'operationLog',
  state: {
    createByList: [],
  },
  effects: {
    // 获取账号列表
    *getOperationLog({ payload }, { select, call, put }) {
      const data = {
        tags: ["DEFAULT", "NORMAL"]
      }
      try {
        const res = yield call(getListAll, data);
        if (res.status === 1) {
          yield put({ type: 'changeState', payload: { createByList: res.data } });
        }
      } catch (err) {}
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
