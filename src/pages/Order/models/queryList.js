import { activityOrderDetail } from '@/services/order';
import { message } from 'antd';
import { history } from 'umi';
const SettingModel = {
  namespace: 'queryList',
  state: {
    orderDetail: {},
    dataDrawer: {
      modalShow: false,
      modalData: {},
    },
  },
  effects: {
    *activityOrderDetail({ payload }, { call, put, select }) {
      const { status, data } = yield call(activityOrderDetail, payload);
      if (status === 1) {
        yield put({ type: 'changeState', payload: { orderDetail: data } });
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
export default SettingModel;
