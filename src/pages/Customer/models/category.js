import { categoryDelete, categorySave } from '@/services/category';
import { message } from 'antd';
import md5 from 'blueimp-md5';
import defaultSettings from '../../../../config/defaultSettings';
export default {
  namespace: 'customerCategory',
  state: {},
  effects: {
    // fen保存/修改
    *categorySave({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(categorySave, { ...params });
      if (status === 1) {
        message.success(`${id ? '修改成功' : '新增成功'}`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },

    //删除
    *categoryDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(categoryDelete, { id });
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
