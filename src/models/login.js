import { queryLogin, loginOut } from '@/services/login';
import { adminDetails, getBosUserList } from '@/services/user';
import { message } from 'antd';
import { history } from 'umi';
import md5 from 'blueimp-md5';
import defaultSettings from '../../config/defaultSettings';
import { getDataMenus } from '@/utils/menu';
const { tokenKey, md5Key } = defaultSettings;
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    //退出登录
    *logout(_, { call, put, select }) {
      window.location.href = '/user/login';
      localStorage.removeItem(tokenKey);
      localStorage.removeItem('noticeCode');
      localStorage.removeItem('isGuide');
      // const userName = yield select(state => state.user.currentUser.userName);
      // try {
      //   const res = yield call(loginOut, { userName });
      //   if (res.status === 1 && res.data) {

      //   }
      // } catch (err) {
      //   console.error(err);
      // }
    },
    //登录
    *login({ payload }, { call, put }) {
      const { password } = payload;
      payload.password = md5(password, md5Key);
      const { status, data, msg } = yield call(queryLogin, payload);
      if (status === 1) {
        localStorage.setItem(tokenKey, data);
        const userinfo = yield call(adminDetails);

        const info = userinfo.data;
        const permissionVos = userinfo.data.permissionList;
        const obj = getDataMenus(permissionVos);
        const payload = {
          currentUser: {
            ...info,
            dataMenus: obj.menus,
            mapsRedirects: obj.mapsRedirects,
          },
          userAuths: obj.codes,
        };
        if (info.userType === 'COMPANY' && info.firstLogin) {
          yield put({
            type: 'global/changeState',
            payload: {
              isGuide: true,
            },
          });
        }
        yield put({
          type: 'user/changeState',
          payload,
        });
        history.replace({ pathname: obj.mapsRedirects['/'] });

        message.success('登录成功');
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
