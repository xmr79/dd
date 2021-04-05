import {
  activitySortDelete,
  activityCategoryAdd,
  activitySortList,
  activityCategoryUpdateSort,
} from '@/services/experience/activity';
import { message } from 'antd';
export default {
  namespace: 'sort',
  state: {
    sortList: {
      page: 1,
      size: 10,
      totalItem: 0,
      data: [],
    },
  },
  effects: {
    //
    *activitySortList({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(activitySortList, { page: 1, size: 20 });
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            sortList: {
              ...data,
              data: data.data.map((_, idx) => {
                _.index = +idx;
                _.key = idx + 1;
                return _;
              }),
            },
          },
        });
      }
    },
    // fen保存/修改
    *activityCategoryAdd({ payload }, { call, put, select }) {
      const { id } = payload;
      const { status, data } = yield call(activityCategoryAdd, payload);
      if (status === 1) {
        message.success(`${id ? '修改成功' : '新增成功'}`);
        yield put({ type: 'global/closeModal' });
        yield put({ type: 'activitySortList' });
      }
    },

    //删除
    *activitySortDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(activitySortDelete, { id });
      if (status === 1) {
        message.success(`删除成功`);
        reload();
      }
    },
    *activityCategoryUpdateSort({ payload }, { call, put, select }) {
      const { status, data } = yield call(activityCategoryUpdateSort, payload);
      if (status === 1) {
        message.success(`排序成功`);
        // yield put({ type: 'activitySortList' });
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
