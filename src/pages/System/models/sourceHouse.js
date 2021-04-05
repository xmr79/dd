import {
  materialDelete,
  getMaterialList,
  materialSave,
  materialUpdate,
} from '@/services/system/sourceHouse';
import { message } from 'antd';
export default {
  namespace: 'sourceHouse',
  state: {
    imgMaterialList: {
      page: 1,
      size: 10,
      totalItem: 10,
      data: [],
    },
    vedioMaterialList: {
      page: 1,
      size: 10,
      totalItem: 10,
      data: [],
    },
    dataModal: {
      modalType: '',
      modalShow: false,
      modalData: {},
    },
    imgdataModal: {
      modalType: '',
      modalShow: false,
      modalData: {},
    },
  },
  effects: {
    //
    *getMaterialList({ payload }, { call, put, select }) {
      const { type } = payload;
      const { status, data } = yield call(getMaterialList, payload);
      if (status === 1) {
        yield put({
          type: 'changeState',
          payload:
            type === 1
              ? {
                  imgMaterialList: data,
                }
              : {
                  vedioMaterialList: data,
                },
        });
      }
    },

    *materialSave({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(materialSave, { ...params });
      if (status === 1) {
        message.success(`新增成功`);
        reload();
      }
    },
    *materialDelete({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(materialDelete, { ...params });
      if (status === 1) {
        message.success(`删除成功`);
        reload();
      }
    },
    *materialUpdate({ payload }, { call, put, select }) {
      const { params, reload } = payload;
      const { status, data } = yield call(materialUpdate, { ...params });
      if (status === 1) {
        message.success(`编辑成功`);
        reload();
        yield put({
          type: 'global/closeModal',
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
    imgcloseModal(state, { payload }) {
      return {
        ...state,
        imgdataModal: {
          modalType: '',
          modalShow: false,
          modalData: {},
        },
      };
    },
  },
};
