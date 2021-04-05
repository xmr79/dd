import { userRecommendAudit } from '@/services/customer';
import { message } from 'antd';
export default {
  namespace: 'recommend',
  state: {},
  effects: {
    //用户推荐审核
    *userRecommendAudit({ payload }, { call, put, select }) {
      const { params, reload } = payload;

      const { status, data } = yield call(userRecommendAudit, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        if (params.status === 'FAIL') {
          yield put({ type: 'global/closeModal' });
        }
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
