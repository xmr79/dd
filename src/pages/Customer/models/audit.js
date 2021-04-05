import { audit } from '@/services/customer';
import { message } from 'antd';
import md5 from 'blueimp-md5';
import defaultSettings from '../../../../config/defaultSettings';
export default {
  namespace: 'customerAudit',
  state: {},
  effects: {
    //审核
    *audit({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(audit, { ...params });
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
