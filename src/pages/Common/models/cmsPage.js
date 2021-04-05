import { getCmsPageDetail } from '@/services/system/pageDecoration';
import { message } from 'antd';
export default {
  namespace: 'cmsPage',
  state: {
    detail: [],
  },
  effects: {
    // 获取页面详情
    *getCmsPageDetail({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(getCmsPageDetail, payload);
      if (status === 1) {
        const { id, code, status, json = '[]' } = data;
        yield put({
          type: 'changeState',
          payload: {
            detail: JSON.parse(json),
          },
        });
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
