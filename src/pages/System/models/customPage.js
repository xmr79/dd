import {
  saveInfo,
  savePage,
  getCmsPageDetail,
  getCmsPageDelete,
} from '@/services/system/pageDecoration';
import { activityList } from '@/services/experience/activity';
import { tutorListAll } from '@/services/system/tutor';
import { contentList } from '@/services/experience/content';
import { customPageList } from '@/services/system/pageDecoration';
import { listAuthUser } from '@/services/customer';

import { message } from 'antd';
import { history } from 'umi';

const dataTransform = data => {
  let cIds = [];
  let folds = false;
  data.forEach(pItem => {
    const { cId, list, fold } = pItem;
    cIds.push(cId);
    folds = folds || fold;
    if (list) {
      list.forEach(item => {
        cIds.push(item.cId);
      });
    }
  });
  return {
    cIds,
    folds,
  };
};

export default {
  namespace: 'customPage',
  state: {
    dataCms: [],
    cIds: [],
    name: '',
    selectLinkDatas: {
      page: 1,
      size: 10,
      totalItem: 10,
      data: [],
    },
    folds: false,
    dataModal: {
      modalType: '',
      modalShow: false,
      modalData: {},
    },
  },
  effects: {
    // 获取页面详情
    *getCmsPageDetail({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(getCmsPageDetail, payload);
      if (status === 1) {
        const { id, code, status, name } = data;
        const json = data.status === 'PUBLISH' ? data.json : data.jsonDraft;
        const dataCms = json ? JSON.parse(json) : [];
        const params = {
          id,
          code,
          status,
          dataCms,
          name,
          ...dataTransform(dataCms),
        };

        yield put({ type: 'changeState', payload: params });
      }
    },
    // 基本信息保存
    *saveInfo({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { id } = params;
      const { status, data } = yield call(saveInfo, { ...params });
      if (status === 1) {
        message.success(`${id ? '修改' : '新增'}成功`);
        yield put({
          type: 'closeModal',
        });
        reload();
      }
    },
    *savePage({ payload }, { call, put, select }) {
      const { id, status, notSkip } = payload;
      const { name } = yield select(state => state.customPage);
      const res = yield call(savePage, { ...payload, name });
      if (res.status === 1) {
        message.success(`${status === 'WAIT_PUBLISH' ? '保存' : '发布'}成功`);
        if (!notSkip && status !== 'WAIT_PUBLISH') {
          history.replace('/system/pageDecoration/customPage');
        }
      }
    },
    // 删除
    *getCmsPageDelete({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(getCmsPageDelete, { ...params });
      if (status === 1) {
        message.success(`删除成功`);
        reload();
      }
    },
    //
    *getSelectLinkDatas({ payload }, { call, put, select }) {
      const { linkType } = payload;
      let obj = {};
      switch (linkType) {
        case 'ACTIVITY_DETAIL':
          obj = {
            url: activityList,
            params: {
              statusList: ['PROCESSING', 'WAIT_BEGIN'],
            },
          };
          break;
        case 'ARTICLE_DETAIL':
          obj = { url: contentList };
          break;
        case 'ORGAN_DETAIL':
          obj = {
            url: listAuthUser,

            params: {
              userType: 'COMPANY',
            },
          };
          break;
        case 'EXPERT_DETAIL':
          obj = {
            url: listAuthUser,

            params: {
              userType: 'EXPERT',
            },
          };
          break;
        case 'CMS':
          obj = { url: customPageList };
          break;
        case 'TUTOR':
          obj = { url: tutorListAll };
          break;
      }

      const { url, params } = obj;
      if (url) {
        const { status, data = {} } = yield call(url, { ...params, ...payload });
        if (status === 1) {
          yield put({
            type: 'changeState',
            payload: {
              selectLinkDatas: data,
            },
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
