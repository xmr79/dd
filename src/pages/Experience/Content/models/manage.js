import {
  contentRecordSave,
  contentRecordGet,
  contentGet,
  contentDelete,
  contentPreview,
} from '@/services/experience/content';
import { message } from 'antd';
import { history } from 'umi';
const SettingModel = {
  namespace: 'contentManage',
  state: { contentDetail: {}, isAlert: true },
  effects: {
    // 文章详情
    *getDetail({ payload }, { call, put, select }) {
      const { id, contentId } = payload;
      const { status, data = {} } = yield call(id ? contentRecordGet : contentGet, {
        id: id ? id : contentId,
      });
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            contentDetail: data,
          },
        });
      }
    },
    //文章保存
    *contentRecordSave({ payload }, { call, put, select }) {
      const { isyulan, draft, id, contentId } = payload;
      const userType = yield select(state => state.user.currentUser.userType);
      const res = yield call(contentRecordSave, payload);
      if (res.status === 1) {
        message.success('保存成功');
        if (!isyulan) {
          if (draft) {
            if (!(id || contentId)) {
              console.log('new');
              const { data } = res;
              history.replace(`/experience/content/manage/createContent?id=${data}`);
            }
          } else {
            if (userType === 'SYSTEM' && !draft) {
              history.replace('/experience/content/manage');
            } else {
              history.replace('/experience/content/audit');
            }
          }
        }
      }

      return res;
    },
    *contentPreview({ payload }, { call, put }) {
      const res = yield call(contentPreview, payload);
      return res;
    },
    //文章删除
    *contentDelete({ payload }, { call, put, select }) {
      const { id, contentName, reload } = payload;
      const { status, data } = yield call(contentDelete, { id, contentName });
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
export default SettingModel;
