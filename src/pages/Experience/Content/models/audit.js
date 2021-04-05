import { contentRecordAudit, contentRecordDelete } from '@/services/experience/content';
import { message } from 'antd';
export default {
  namespace: 'contentAudit',
  state: {},
  effects: {
    // 文章审核
    *contentRecordAudit({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(contentRecordAudit, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },

    //文章删除
    *contentRecordDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(contentRecordDelete, { id });
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
