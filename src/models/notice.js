import {
  listNotifyList,
  msgCount,
  listWpList,
  clearMsg,
  updateMsg,
} from '@/components/NoticeIcon/service/msgLog.js';
import NoticeIcon from '@/components/NoticeIcon';
const { fitType } = NoticeIcon;
const noticeStorage = localStorage.getItem('NoticeChecked');
export default {
  namespace: 'notice',

  state: {
    needData: {
      data: [],
      empty: true,
      page: 1,
      size: 10,
      totalItem: 0,
      totalPage: 0,
    },
    needPage: 1,
    nocticeData: {
      data: [],
      empty: true,
      page: 1,
      size: 10,
      totalItem: 0,
      totalPage: 0,
    },
    nocticePage: 1,
    //未读通知消息数
    nunreadCount: 0,
    //待处理待办消息数
    pwaitProcessCount: 0,
    NoticeChecked: noticeStorage ? !!(noticeStorage - 0) : true,
  },

  effects: {
    // 通知消息列表查询
    *listNotifyList({ payload }, { call, put, select }) {
      const nocticePage = yield select(state => state.notice.nocticePage);
      const userAuths = yield select(state => state.user.userAuths);
      const userType = yield select(state => state.user.currentUser.userType);

      const typeList = fitType(userAuths, userType);
      if (typeList) {
        const res = yield call(listNotifyList, { page: 0, size: nocticePage * 20, typeList });
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: {
              nocticeData: res.data,
            },
          });
        }
      }
    },
    // 待办消息列表查询
    *listWpList({ payload }, { call, put, select }) {
      const needPage = yield select(state => state.notice.needPage);
      const userAuths = yield select(state => state.user.userAuths);
      const userType = yield select(state => state.user.currentUser.userType);

      const typeList = fitType(userAuths, userType);
      if (typeList) {
        const res = yield call(listWpList, { page: 0, size: needPage * 20, typeList });
        if (res.status === 1 && res.data) {
          yield put({
            type: 'changeState',
            payload: {
              needData: res.data,
            },
          });
        }
      }
    },
    *changePage({ payload }, { call, put, select }) {
      const { nocticePage, needPage } = payload;
      yield put({
        type: 'changeState',
        payload,
      });
      if (nocticePage) {
        yield put({
          type: 'listNotifyList',
        });
      } else {
        yield put({
          type: 'listWpList',
        });
      }
    },
    // 消息数
    *msgCount({ payload }, { call, put, select }) {
      const userAuths = yield select(state => state.user.userAuths);
      const userType = yield select(state => state.user.currentUser.userType);

      const typeList = fitType(userAuths, userType);
      if (typeList) {
        const res = yield call(msgCount, { ...payload, typeList });
        if (res.status === 1 && res.data) {
          const { pwaitProcessCount, nunreadCount, pprocessingCount } = res.data;
          yield put({
            type: 'changeState',
            payload: {
              pwaitProcessCount: pwaitProcessCount + pprocessingCount,
              nunreadCount,
            },
          });
        }
      }
    },
    // 消息数
    *clearMsg({ payload }, { call, put, select }) {
      const { msgLogType } = payload;

      const needData = yield select(state => state.notice.needData);
      const nocticeData = yield select(state => state.notice.nocticeData);
      const needDataids = needData.data.map(_ => _.id);
      const nocticeDataids = nocticeData.data.map(_ => _.id);

      const res = yield call(clearMsg, {
        ...payload,
        // idList: msgLogType === 'WAIT_PROCESS' ? needDataids : nocticeDataids,
      });
      // WAIT_PROCESS, NOTIFY
      if (res.status === 1 && res.data) {
        if (msgLogType === 'WAIT_PROCESS') {
          yield put({
            type: 'listWpList',
          });
        } else if (msgLogType === 'NOTIFY') {
          yield put({
            type: 'listNotifyList',
          });
        }
      }
      yield put({
        type: 'msgCount',
      });
    },

    *updateMsg({ payload }, { call, put, select }) {
      const { msgLogType, id, status } = payload;
      const res = yield call(updateMsg, payload);
      const needData = yield select(state => state.notice.needData);
      // WAIT_PROCESS, NOTIFY
      if (res.status === 1 && res.data) {
        if (msgLogType === 'WAIT_PROCESS') {
          yield put({
            type: 'listWpList',
          });
          // let newarr = needData.data.map(_ => {
          //   let notice = { ..._ };

          //   if (notice.id === id) {
          //     notice.status = status;
          //   }

          //   return notice;
          // });
          // yield put({
          //   type: 'changeState',
          //   payload: {
          //     needData: {
          //       ...needData,
          //       data: newarr,
          //     },
          //   },
          // });
        } else if (msgLogType === 'NOTIFY') {
          yield put({
            type: 'listNotifyList',
          });
        }
      }
      yield put({
        type: 'msgCount',
      });
    },
  },

  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeNoticeCheckedState(state, { payload }) {
      localStorage.setItem('NoticeChecked', payload ? '1' : '0');
      return {
        ...state,
        NoticeChecked: payload,
      };
    },
  },
};
