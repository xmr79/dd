import {
  accountSave,
  allRolesList,
  updateStatus,
  updatePassword,
  getAdmin,
  accountDelete,
  checkAccount,
  getParentAccount,
} from '@/services/system/account';
import { message } from 'antd';
import md5 from 'blueimp-md5';
import defaultSettings from '../../../../config/defaultSettings';
const { md5Key } = defaultSettings;
export default {
  namespace: 'account',
  state: { dataRoleList: [], accountDetail: {}, parentAccountList: [] },
  effects: {
    // 检查账号是否存在
    *checkAccount({ payload }, { call, put, select }) {
      const { username } = payload;
      try {
        const res = yield call(checkAccount, { username });
        if (res.status === 1) {
          return res.data;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取角色列表
    *getRoleList({ payload }, { call, put, select }) {
      try {
        const res = yield call(allRolesList);
        if (res.status === 1) {
          yield put({ type: 'changeState', payload: { dataRoleList: res.data } });
        }
      } catch (err) {}
    },
    // 获取主管列表
    *getParentAccount({ payload }, { call, put, select }) {
      try {
        const res = yield call(getParentAccount);
        if (res.status === 1) {
          yield put({ type: 'changeState', payload: { parentAccountList: res.data } });
        }
      } catch (err) {}
    },

    // 查询账号详情
    *getAdmin({ payload }, { call, put, select }) {
      const { id } = payload;
      try {
        const res = yield call(getAdmin, { id });
        if (res.status === 1) {
          yield put({ type: 'changeState', payload: { accountDetail: res.data } });
        }
      } catch (err) {}
    },
    // 账号保存/修改
    *accountSave({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id, password, confirmPassword } = params;
      params.password = password ? md5(password, md5Key) : undefined;
      params.confirmPassword = confirmPassword ? md5(confirmPassword, md5Key) : undefined;

      const { status, data } = yield call(accountSave, { ...params });
      if (status === 1) {
        message.success(`${id ? '修改成功' : '新增成功'}`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },
    // 更改管理员状态
    *updateStatus({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(updateStatus, { ...params });
      if (status === 1) {
        message.success(`修改成功`);
        reload();
      }
    },

    //删除账号
    *accountDelete({ payload }, { call, put, select }) {
      const { username, reload } = payload;
      const { status, data } = yield call(accountDelete, { username });
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
