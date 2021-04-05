import {
  activityReviewDelete,
  activityAudit,
  getactivityDetail,
  
} from '@/services/experience/activity';
import { message } from 'antd';
export default {
  namespace: 'activityAudit',
  state: {
   
  },
  effects: {
 
    // 活动审核
    *activityAudit({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(activityAudit, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },

    
    //活动删除
    *activityReviewDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(activityReviewDelete, { id });
      if (status === 1) {
        message.success(`删除成功`);
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
