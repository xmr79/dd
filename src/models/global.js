import { queryNotices, getExtensionQrcode } from '@/services/user';
const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: localStorage.getItem('collapsed')
      ? localStorage.getItem('collapsed') === '1'
        ? true
        : false
      : false,
    loading: false,
    urlFileExport: '',
    dataModal: {
      modalType: '',
      modalShow: false,
      modalData: {},
    },
    preImgDataModal: {
      modalType: '',
      modalShow: false,
      modalData: {},
    },
    isGuide: false
  },
  effects: {
    *getExtensionQrcode({ payload }, { call, put }) {
      const res = yield call(getExtensionQrcode, payload);
      return res
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
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      localStorage.setItem('collapsed', payload ? '1' : '0');
      return { ...state, collapsed: payload };
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        // 路由发生变化的时候切换菜单
        const whiteList = [
          '/user/login',
          '/user/register',
          '/user/forget',
          '/other/enterpriseInfo',
          '/other/expertInfo',
          '/other/enterpriseResult',
          '/other/expertResult',
          '/other/cms',
        ];

        if (!whiteList.includes(pathname)) {
          // 获取用户信息
          dispatch({ type: 'user/fetchCurrent' });
        }
      });
    },
  },
};
export default GlobalModel;
