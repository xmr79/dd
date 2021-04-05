import {
  saveActivity,
  saveDraftActivity,
  activityFinish,
  activityCopy,
  getactivityDetail,
  activityReviewDetail,
  activityPreview,
  manualImportVisitors,
  deleteVisitor,
  importVisitors,
  getTeamActivityOrder,
  selectActivityOrderVisitorList,
} from '@/services/experience/activity';

import { message } from 'antd';
import { history } from 'umi';
const SettingModel = {
  namespace: 'activityManage',
  state: {
    activityDetail: {},
    orderDetail: {},
    dataModal: {
      modalType: '',
      modalShow: false,
      modalData: {},
    },
  },
  effects: {
    // 活动详情
    *getactivityDetail({ payload }, { call, put, select }) {
      const { id, aduitId } = payload;
      const { status, data = {} } = yield call(aduitId ? activityReviewDetail : getactivityDetail, {
        id: aduitId ? aduitId : id,
      });
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            activityDetail: data,
          },
        });
      }
    },
    //活动保存
    *saveActivity({ payload }, { call, put, select }) {
      const userType = yield select(state => state.user.currentUser.userType);
      const { id, aduitId, activityVO } = payload;
      const { type } = activityVO;
      const res = yield call(saveActivity, { ...payload, id: aduitId });
      if (res.status === 1) {
        message.success('提交成功');
        const path = `/experience/activity${type === 'TEAM' ? '/team' : '/manage'}`;
        if (userType === 'SYSTEM') {
          history.replace(path);
        } else {
          history.replace('/experience/activity/audit');
        }
      }
    },
    *saveDraftActivity({ payload }, { call, put }) {
      const { isyulan, id, aduitId, activityVO } = payload;
      const { type } = activityVO;
      const res = yield call(saveDraftActivity, { ...payload, id: aduitId });
      if (res.status === 1) {
        message.success('保存成功');
        const { data } = res;
        const path = `/experience/activity${
          type === 'TEAM' ? '/team/createTeam' : '/manage/createActivity'
        }`;
        if (!id) {
          history.replace(`${path}?aduitId=${data}&auditStatus=WAIT_SUBMIT`);
        } else {
          history.replace(`${path}?aduitId=${data}&auditStatus=WAIT_SUBMIT&id=${id}`);
        }

        // if (!isyulan) {
        //   history.replace('/experience/activity/audit');
        // }
      }
      return res;
    },
    *activityPreview({ payload }, { call, put }) {
      const res = yield call(activityPreview, payload);
      return res;
    },

    //活动复制
    *activityCopy({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(activityCopy, { id });
      if (status === 1) {
        message.success(`复制成功`);
        history.push('/experience/activity/audit?status=WAIT_SUBMIT');
        reload();
      }
    },
    //活动结束
    *activityFinish({ payload }, { call, put, select }) {
      const { id, reload, title } = payload;
      const { status, data } = yield call(activityFinish, { id, title });
      if (status === 1) {
        message.success(`操作成功`);
        reload();
      }
    },
    //手动导入
    *manualImportVisitors({ payload }, { call, put, select }) {
      const { params, cb, reload } = payload;
      const { activityId, reviewId } = params;
      const {
        status,
        data: { visitorKey },
      } = yield call(manualImportVisitors, { ...params });
      if (status === 1) {
        message.success(`操作成功`);
        if (!activityId && !reviewId) {
          history.replace(`/experience/activity/team/createTeam?visitorKey=${visitorKey}`);
        }
        reload();
      }
    },
    //删除体验者
    *deleteVisitor({ payload }, { call, put, select }) {
      const { params, cb, reload } = payload;
      const { status, data } = yield call(deleteVisitor, { ...params });
      if (status === 1) {
        message.success(`操作成功`);

        reload();
      }
    },
    *importVisitors({ payload }, { call, put, select }) {
      const { obj, reload } = payload;
      const { params } = obj;
      const { activityId, reviewId } = params;
      const { status, data } = yield call(importVisitors, { ...obj });
      if (status === 1) {
        const { visitorKey } = data;
        message.success(`操作成功`);
        if (!activityId && !reviewId) {
          history.replace(`/experience/activity/team/createTeam?visitorKey=${visitorKey}`);
        }
        yield put({ type: 'closeModal' });
        reload();
      }
    },
    *getTeamActivityOrder({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(getTeamActivityOrder, payload);
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            orderDetail: data,
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
    closeModal(state, { payload }) {
      return {
        ...state,
        dataModal: {
          modalType: '',
          modalShow: false,
          modalData: {},
        },
      };
    },
  },
};
export default SettingModel;
