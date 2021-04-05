import { batchRefund } from '@/services/order';
import { message } from 'antd';
import { history } from 'umi';
const SettingModel = {
  namespace: 'handle',
  state: {
    orderDetail: {},
    dataDrawer: {
      modalShow: false,
      modalData: {},
    },
  },
  effects: {
    *batchRefund({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(batchRefund, { ...params });
      if (status === 1) {
        message.success('操作成功');
        yield put({ type: 'global/closeModal' });
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
export default SettingModel;
