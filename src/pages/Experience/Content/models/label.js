import { contentTagDelete, contentTagAdd } from '@/services/experience/content';
import { message } from 'antd';
export default {
  namespace: 'contentTag',
  state: {},
  effects: {
    // fen保存/修改
    *contentTagAdd({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(contentTagAdd, { ...params });
      if (status === 1) {
        message.success(`${id ? '修改成功' : '新增成功'}`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },

    //删除
    *contentTagDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(contentTagDelete, { id });
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
