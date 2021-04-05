import { contentEvaluationDelete, contentEvaluationTop } from '@/services/experience/content';
import { message } from 'antd';
export default {
  namespace: 'commentContent',
  state: {},
  effects: {
    //删除评论
    *contentEvaluationDelete({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(contentEvaluationDelete, { ...params });
      if (status === 1) {
        message.success(`删除成功`);
        reload();
      }
    },
    //置顶评论
    *contentEvaluationTop({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(contentEvaluationTop, { ...params });
      if (status === 1) {
        message.success(`置顶成功`);
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
