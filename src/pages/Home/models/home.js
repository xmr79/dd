import {
  indexUserStat,
  indexUserAttentionStat,
  indexPending,
  indexContentInteractStat,
  activityOrderIndexStat,
} from '@/services/home';
import { message } from 'antd';
import { history } from 'umi';
const Home = {
  namespace: 'home',
  state: {
    indexPendingInfo: {},
    orderInfo: {},
    userStatData: [],
    interactionData: [],
    userAttentionData: [],
  },
  effects: {
    *getIndexPending({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(indexPending, payload);
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            indexPendingInfo: data,
          },
        });
      }
    },
    // 实时数据
    *activityOrderIndexStat({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(activityOrderIndexStat, payload);
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            orderInfo: data,
          },
        });
      }
    },
    // 用户关注/收藏趋势
    *indexUserAttentionStat({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(indexUserAttentionStat, payload);
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            userAttentionData: data,
          },
        });
      }
    },
    // 用户增长趋势
    *getIndexUserStat({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(indexUserStat, payload);
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            userStatData: data,
          },
        });
      }
    },

    // 互动趋势
    *indexContentInteractStat({ payload }, { call, put, select }) {
      const { status, data = {} } = yield call(indexContentInteractStat, payload);
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload: {
            interactionData: data,
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
  },
};
export default Home;
