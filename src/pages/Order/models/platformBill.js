import { platformStatExport } from '@/services/order';
import { message } from 'antd';
import { history } from 'umi';
const platformBill = {
  namespace: 'platformBill',
  state: {
    orderDetail: {},
    dataDrawer: {
      modalShow: false,
      modalData: {},
    },
  },
  effects: {
    *handledown({ payload }, { call, put, select }) {
      const { status, data } = yield call(platformStatExport, payload);
      if (status === 1) {
        yield put({ type: 'global/changeState', payload: { urlFileExport: data } });
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
export default platformBill;
