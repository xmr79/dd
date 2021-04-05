import {
  adminDetails,
  register,
  forgetPass,
  codesend,
  updateVerifyDetail,
  getVerifyEchoDetail,
  getAuthStatus,
} from '@/services/user';
import defaultSettings from '../../config/defaultSettings';
import { getDataMenus } from '@/utils/menu';
import { history } from 'umi';
import { updatePassword, resetPassword } from '@/services/system/account';
import { message } from 'antd';
const { tokenKey, md5Key } = defaultSettings;
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {
      dataMenus: [],
    },
    userAuths: [], // 权限
    resgisterVal: {},
    authRes: {},
    verifyEchoDetail: {},
  },
  effects: {
    *fetchCurrent({ payload = {} }, { call, put, select }) {
      const { isUpdate = false } = payload;
      const currentUser = yield select(state => state.user.currentUser);
      if (!currentUser || currentUser.dataMenus.length <= 0 || isUpdate) {
        const { data } = yield call(adminDetails);
        const { permissionList } = data;
        const obj = getDataMenus(permissionList);
        const payload = {
          currentUser: {
            ...data,
            dataMenus: obj.menus,
            mapsRedirects: obj.mapsRedirects,
          },
          userAuths: obj.codes,
        };
        if (data.userType === 'COMPANY' && data.firstLogin) {
          yield put({
            type: 'global/changeState',
            payload: {
              isGuide: true,
            },
          });
        }
        yield put({
          type: 'changeState',
          payload,
        });
        return payload;
      }
    },
    //注册
    *register({ payload }, { call, put }) {
      const { type, stepNumber, comfirmPassword, password, mobile } = payload;
      payload.password = md5(password, md5Key);
      payload.comfirmPassword = md5(comfirmPassword, md5Key);

      const res = yield call(register, payload);
      if (res.status === 1) {
        if (stepNumber === 1) {
          // message.success('注册成功');
          yield put({
            type: 'changeState',
            payload: {
              resgisterVal: payload,
            },
          });
          const path = type === 'EXPERT' ? '/other/expertInfo' : '/other/enterpriseInfo';
          history.push(path);
        } else {
          const pathname = type === 'EXPERT' ? '/other/expertResult' : '/other/enterpriseResult';
          const path = {
            pathname,
            query: { role: type, mobile: mobile },
          };
          history.push(path);
        }
      }
    },
    //忘记密码
    *forgetPass({ payload }, { call, put }) {
      const { comfirmPassword, password } = payload;
      payload.password = md5(password, md5Key);
      payload.comfirmPassword = md5(comfirmPassword, md5Key);
      const res = yield call(forgetPass, payload);
      if (res.status === 1) {
        message.success('修改成功');
        history.replace('/user/login');
      }
    },
    //发送短信验证码
    *codesend({ payload }, { call, put }) {
      const res = yield call(codesend, payload);
      if (res.status === 1) {
        message.success('发送成功');
      }
      return res;
    },
    // 更改管理员密码
    *updatePassword({ payload }, { call, put, select }) {
      const { oldPassword, newPassword, confirmPassword } = payload;
      payload.oldPassword = oldPassword ? md5(oldPassword, md5Key) : undefined;
      payload.newPassword = newPassword ? md5(newPassword, md5Key) : undefined;
      payload.confirmPassword = confirmPassword ? md5(confirmPassword, md5Key) : undefined;
      const { status, data } = yield call(updatePassword, { ...payload });
      if (status === 1) {
        message.success(`修改成功`);
        yield put({ type: 'global/closeModal' });
        yield put({ type: 'logout' });
      }
    },
    // 更改管理员密码
    *resetPassword({ payload }, { call, put, select }) {
      const { password, comfirmPassword } = payload;

      payload.password = password ? md5(password, md5Key) : undefined;
      payload.comfirmPassword = comfirmPassword ? md5(comfirmPassword, md5Key) : undefined;
      const { status, data } = yield call(resetPassword, { ...payload });
      if (status === 1) {
        message.success(`重置成功`);
        yield put({ type: 'global/closeModal' });
        // yield put({ type: 'logout' });
      }
    },
    //获取认证审核状态
    *getAuthStatus({ payload }, { call, put }) {
      const res = yield call(getAuthStatus, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            authRes: res.data,
          },
        });
      }
    },
    *getVerifyEchoDetail({ payload }, { call, put }) {
      const res = yield call(getVerifyEchoDetail, payload);
      if (res.status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            verifyEchoDetail: res.data,
          },
        });
      }
    },
    *updateVerifyDetail({ payload }, { call, put }) {
      const res = yield call(updateVerifyDetail, payload);
      const { type, mobile } = payload;
      if (res.status === 1) {
        const pathname = type === 'EXPERT' ? '/other/expertResult' : '/other/enterpriseResult';
        const path = {
          pathname,
          query: { role: type, mobile: mobile },
        };
        history.push(path);
      }
    },
  },
  reducers: {
    changeState(state, { payload }) {
      const { currentUser } = payload;
      if (currentUser) {
        const { userType, id } = currentUser;
        localStorage.setItem('noticeCode', userType === 'SYSTEM' ? 'PPHZ' : id);
      }
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default UserModel;
