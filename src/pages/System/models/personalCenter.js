import {
  getAuthInfo,
  getDetails,
  updateperson,
  getMobile,
  personbind,
  personunbind,
  changeBind,
  updateBaseAuthInfo,
} from '@/services/system/personalCenter';
import { message } from 'antd';
import { history } from 'umi';
const SettingModel = {
  namespace: 'personalCenter',
  state: {
    basicInfo: {},
    storyInfo: {},
    mobile: undefined,
  },
  effects: {
    // 添加绑定
    *updateBaseAuthInfo({ payload }, { call, put }) {
      const res = yield call(updateBaseAuthInfo, payload);
      if (res.status === 1) {
        message.success('你的认证资料正在审核中，请耐心等待');
        yield put({
          type: 'personalCenter/getAuthInfo',
        });
        yield put({
          type: 'global/closeModal',
        });
      }
    },
    // 添加绑定
    *personbind({ payload }, { call, put }) {
      const { params, reload } = payload;
      const res = yield call(personbind, { ...params });
      if (res.status === 1) {
        message.success('添加成功');
        yield put({
          type: 'global/closeModal',
        });
        reload();
      }
    },
    *changeBind({ payload }, { call, put }) {
      const { params, reload } = payload;
      const res = yield call(changeBind, { ...params });
      if (res.status === 1) {
        message.success('更换成功');
        yield put({
          type: 'global/closeModal',
        });
        reload();
      }
    },

    // 解绑
    *personunbind({ payload }, { call, put }) {
      const { params, reload } = payload;
      const res = yield call(personunbind, { ...params });
      if (res.status === 1) {
        message.success('解绑成功');
        reload();
      }
    },
    *getAuthInfo({ payload }, { call, put }) {
      const res = yield call(getAuthInfo, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            basicInfo: res.data ? res.data : {},
          },
        });
      }
    },
    *getDetails({ payload }, { call, put }) {
      const res = yield call(getDetails, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            storyInfo: res.data ? res.data : {},
          },
        });
      }
    },
    *getMobile({ payload }, { call, put }) {
      const res = yield call(getMobile, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            mobile: res.data ? res.data : undefined,
          },
        });
      }
    },
    *updateperson({ payload }, { call, put }) {
      const { contactWx } = payload;
      const res = yield call(updateperson, payload);
      if (res.status === 1) {
        message.success('保存成功');

        if (contactWx) {
          yield put({
            type: 'getMobile',
          });
          yield put({
            type: 'global/closeModal',
          });
        }
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
