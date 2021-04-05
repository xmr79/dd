import { tutorDelete, tutorSave } from '@/services/system/tutor';
import { message } from 'antd';
export default {
  namespace: 'tutor',
  state: {},
  effects: {
    // fen保存/修改
    *tutorSave({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(tutorSave, { ...params });
      if (status === 1) {
        message.success(`${id ? '修改成功' : '新增成功'}`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },

    //删除
    *tutorDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(tutorDelete, { id });
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
