import { contentCategoryList, contentTagList } from '@/services/experience/content';
import {
  activityTagList,
  activitySortList,
  activitylistAll,
  activityGetByTitle,
  activityList,
} from '@/services/experience/activity';
import { categoryList } from '@/services/category';
import { tutorListAll } from '@/services/system/tutor';
import { findBaseProvinceList, getListAll, getSystemMobile } from '@/services/common';
import { getByFlag } from '@/services/system/personalCenter';
import { message } from 'antd';
import { invest, getByOrderNo } from '@/services/system/bond';
import city from '@/constants/city.js';
const getAreaList = data => {
  return data.map(item => {
    const { children } = item;
    if (children.length) {
      item.children = getAreaList(children);
    }
    return {
      ...item,
      children: children.length ? children : undefined,
    };
  });
};
const CommonModal = {
  namespace: 'common',
  state: {
    activityAllTagList: [],
    activityAllSortList: [],
    categoryLists: [],
    //省市区
    BaseProvinceList: [],
    //导师
    tutorAllLists: [],
    flagInfo: {},
    accountListAll: [],
    systemMobile: undefined,
  },
  effects: {
    *getSystemMobile({ payload }, { call, put, select }) {
      try {
        const res = yield call(getSystemMobile);
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: { systemMobile: res.data },
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    *getOrderStatus({ payload }, { call, put, select }) {
      const { payType, orderNo } = payload;

      const { status, data } = yield call(getByOrderNo, { orderNo });
      if (status === 1) {
        if (payType === 'WX') {
          if (data) {
            message.success('支付完成');
            yield put({
              type: 'personalCenter/getAuthInfo',
            });
            yield put({
              type: 'global/changeState',
              payload: {
                dataModal: {
                  modalType: '',
                  modalShow: false,
                  modalData: {},
                },
              },
            });
          } else {
            message.error('支付未完成');
          }
        }
      }
    },
    *invest({ payload }, { call, put, select }) {
      const { payType } = payload;

      const { status, data = {} } = yield call(invest, payload);
      if (status === 1) {
        if (payType === 'WX') {
          yield put({
            type: 'global/changeState',
            payload: {
              dataModal: {
                modalType: 'MODAL_WX',
                modalShow: true,
                modalData: data,
              },
            },
          });
        } else if (payType === 'OFFLINE') {
          if (data && data.status === 'true') {
            message.success('操作成功');
            yield put({
              type: 'personalCenter/getAuthInfo',
            });
            yield put({
              type: 'global/changeState',
              payload: {
                dataModal: {
                  modalType: '',
                  modalShow: false,
                  modalData: {},
                },
              },
            });
          }
        }
      }
    },
    //通过标识获取用户
    *getByFlag({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(getByFlag, payload);
      if (status === 1) {
        const { id } = data;
        if (id) {
          yield put({ type: 'changeState', payload: { flagInfo: data } });
          return data;
        } else {
          yield put({ type: 'changeState', payload: { flagInfo: {} } });
          message.error(data.message);
          return {};
        }
      }
    },
    //获取所有的省市区
    *findBaseProvinceList({ payload }, { call, put, select }) {
      // const { status, data } = yield call(findBaseProvinceList, payload);
      // if (status === 1) {

      // }
      yield put({ type: 'changeState', payload: { BaseProvinceList: getAreaList(city) } });
    },
    *getcategoryList({ payload }, { call, put, select }) {
      try {
        const res = yield call(categoryList, { page: 0, size: 1000000, ...payload });
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: { categoryLists: res.data.data },
          });
          return res.data.data;
        } else {
          return [];
        }
      } catch (err) {
        console.error(err);
      }
    },

    *getListAll({ payload }, { call, put, select }) {
      /**
       * 默认账号 DEFAULT,
       */

      /**
       * 普通账号 NORMAL,
       */

      /**
       * 专家账号  EXPERT,
       */

      /**
       * 企业账号 COMPANY,
       */
      try {
        const res = yield call(getListAll, payload);
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: {
              accountListAll: res.data.map(_ => {
                return {
                  key: _.username,
                  value: _.username,
                };
              }),
            },
          });
          return res.data;
        } else {
          return [];
        }
      } catch (err) {
        console.error(err);
      }
    },

    *getAllTutorList({ payload }, { call, put, select }) {
      try {
        const res = yield call(tutorListAll, { page: 1, size: 1000000, ...payload });
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: { tutorAllLists: res.data.data },
          });
          return res.data.data;
        } else {
          return [];
        }
      } catch (err) {
        console.error(err);
      }
    },
    *getactivityAllTagList({ payload }, { call, put, select }) {
      try {
        const res = yield call(activityTagList, { page: 1, size: 1000000, ...payload });
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: { activityAllTagList: res.data.data },
          });
          return res.data.data;
        } else {
          return [];
        }
      } catch (err) {
        console.error(err);
      }
    },

    *getactivityAllSortList({ payload }, { call, put, select }) {
      try {
        const res = yield call(activitySortList, { page: 1, size: 1000000, ...payload });
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: { activityAllSortList: res.data.data },
          });
          return res.data.data;
        } else {
          return [];
        }
      } catch (err) {
        console.error(err);
      }
    },

    *activityGetByTitle({ payload }, { call, put, select }) {
      try {
        const res = yield call(activityGetByTitle, {
          ...payload,
        });
        if (res.status === 1 && res.data) {
          return res.data ? res.data : {};
        } else {
          return {};
        }
      } catch (err) {
        console.error(err);
      }
    },
    *activitylistAll({ payload }, { call, put, select }) {
      try {
        const { isAll = true } = payload;
        const currentUser = yield select(state => state.user.currentUser);
        const res = yield call(!isAll ? activityList : activitylistAll, {
          page: 1,
          size: 1000000,
          // editUsername: currentUser.username,
          ...payload,
        });
        if (res.status === 1 && res.data) {
          return res.data.data
            ? res.data.data.map(_ => {
                return {
                  id: _.id,
                  name: _.title,
                  minStartDate: _.minStartDate,
                  maxStartDate: _.maxStartDate,
                  type: _.type,
                };
              })
            : [];
        } else {
          return [];
        }
      } catch (err) {
        console.error(err);
      }
    },
    *contentList({ payload }, { call, put, select }) {
      const { type } = payload;
      try {
        const res = yield call(type === 'tag' ? contentTagList : contentCategoryList, {
          page: 1,
          size: 1000000,
        });
        if (res.status === 1 && res.data) {
          return res.data.data;
        } else {
          return [];
        }
      } catch (err) {
        console.error(err);
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
export default CommonModal;
