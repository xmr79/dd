import { contentCategoryDelete, contentCategoryAdd } from '@/services/experience/content';
import { message } from 'antd';
export default {
  namespace: 'contentCategory',
  state: {},
  effects: {
    // fen保存/修改
    *contentCategoryAdd({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(contentCategoryAdd, { ...params });
      if (status === 1) {
        message.success(`${id ? '修改成功' : '新增成功'}`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },

    //删除
    *contentCategoryDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(contentCategoryDelete, { id });
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
