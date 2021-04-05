import {
  unsubscribeRecordSave,
  unsubscribeRecordGetLast,
  unsubscribeRecordRevocation,
  unsubscribeGetCompanyStat,
  unsubscribeRecordConfirmReturn,
} from '@/services/system/unsubscribe';
import { message } from 'antd';
import { history } from 'umi';
export default {
  namespace: 'unsubscribe',
  state: {
    unsubscribeInfo: {},
    companyStat: {},
  },
  effects: {
    // 申请注销
    *unsubscribeRecordConfirmReturn({ payload }, { call, put, select }) {
      const { status, data } = yield call(unsubscribeRecordConfirmReturn, payload);
      if (status === 1) {
        message.success(`确认成功`);
        yield put({
          type: 'unsubscribeRecordGetLast',
        });
        // history.push('/system/personalCenter/accountLogout?step=3');
      }
    },
    // 申请注销
    *unsubscribeRecordSave({ payload }, { call, put, select }) {
      const { params, companyType } = payload;
      const { status, data } = yield call(unsubscribeRecordSave, { ...params });
      if (status === 1) {
        message.success(`申请成功`);
        yield put({
          type: 'unsubscribeRecordGetLast',
        });
        // history.push(
        //   `/system/personalCenter/accountLogout?step=${companyType === 'ENTERPRISE' ? '2' : '3'}`,
        // );
      }
    },
    *unsubscribeRecordRevocation({ payload }, { call, put, select }) {
      const { status, data } = yield call(unsubscribeRecordRevocation, payload);
      if (status === 1) {
        message.success(`撤销成功`);
        yield put({
          type: 'unsubscribeRecordGetLast',
        });
        history.push(`/system/personalCenter/accountLogout?step=0`);
      }
    },

    *unsubscribeRecordGetLast({ payload }, { call, put }) {
      const res = yield call(unsubscribeRecordGetLast, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            unsubscribeInfo: res.data ? res.data : {},
          },
        });
      }
    },

    *unsubscribeGetCompanyStat({ payload }, { call, put }) {
      const res = yield call(unsubscribeGetCompanyStat, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            companyStat: res.data ? res.data : {},
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
