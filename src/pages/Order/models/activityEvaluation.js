import {
  activityEvaluationTop,
  activityEvaluationCancelTop,
  activityEvaluationDelete,
} from '@/services/order/evaluationManage/activityEvaluation';
import { message } from 'antd';
import { history } from 'umi';
const SettingModel = {
  namespace: 'activityEvaluation',
  state: {},
  effects: {
    *activityEvaluationTop({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id, isCancel } = params;
      const { status, data } = yield call(
        isCancel === 1 ? activityEvaluationCancelTop : activityEvaluationTop,
        { id },
      );
      if (status === 1) {
        message.success(`操作成功`);
        reload();
      }
    },
    *activityEvaluationDelete({ payload }, { call, put, select }) {
      const { id, reload, avatar, nickName } = payload;
      const { status, data } = yield call(activityEvaluationDelete, { id, avatar, nickName });
      if (status === 1) {
        message.success(`操作成功`);
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
