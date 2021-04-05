import { usergetAuthDetails, userBlacklist, authBlacklist } from '@/services/customer';
import { message } from 'antd';
import md5 from 'blueimp-md5';
import defaultSettings from '../../../../config/defaultSettings';
export default {
  namespace: 'customerManage',
  state: {
    usergetAuthDetails: {},
  },
  effects: {
    //修改佣金
    *updateBrokerage({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(updateBrokerage, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },
    *getUsergetAuthDetails({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(usergetAuthDetails, { ...payload });
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            usergetAuthDetails: data,
          },
        });
      }
    },
    // 批量添加/移除黑名单
    *userBlacklist({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(userBlacklist, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },
    // 认证用户 启用/禁用
    *authBlacklist({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(authBlacklist, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
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
