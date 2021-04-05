import { wxRobotConfigDelete, wxRobotConfigSaveInfo } from '@/services/system/auditReminder';
import { message } from 'antd';
export default {
  namespace: 'auditReminder',
  state: {},
  effects: {
    // 账号保存/修改
    *wxRobotConfigSaveInfo({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(wxRobotConfigSaveInfo, { ...params });
      if (status === 1) {
        message.success(`${id ? '修改成功' : '新增成功'}`);
        yield put({ type: 'global/closeModal' });
        reload();
      }
    },
    //删除账号
    *wxRobotConfigDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(wxRobotConfigDelete, { id });
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
