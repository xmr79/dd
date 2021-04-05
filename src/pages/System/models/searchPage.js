import {
  submitWords,
  updateHotWordIsOpen,
  updateAutomatic,
  getHot,
  hotOpen,
  hotWordIsAutoUpdate,
} from '@/services/system/searchPage';
import { message } from 'antd';
import { findLastKey } from 'lodash';
export default {
  namespace: 'searchPage',
  state: {
    hotWordFlag: false, // 热词开启状态
    ordinaryHot: false, // 普通热词模式
    hotType: "ACTIVITY", // 热词类型
    hotDataList: {
      "ACTIVITY_SPECIAL": [], // 精选
      "CONTENT_SPECIAL": [],
      "EXPERT_SPECIAL": [],
      "ENTERPRISE_SPECIAL": [],
      "ACTIVITY_ORDINARY": [], // 普通
      "CONTENT_ORDINARY": [],
      "EXPERT_ORDINARY": [],
      "ENTERPRISE_ORDINARY": [],
    }, // 热词数据
  },
  effects: {
    // 保存热词
    *submitWords({ payload }, { select, call, put }) {
      const { hotDataList, ordinaryHot } = yield select(state => state.searchPage);
      let newData = {};
      for(let key in payload) {
        if (typeof payload[key] == 'object') {
          newData[key] = payload[key];
        }
      }
      newData = Object.assign(hotDataList, newData);
      let hotWordData = [];
      const dataMaps = {
        ACTIVITY_SPECIAL: {
          normal:false,
          type: "ACTIVITY"
        },
        CONTENT_SPECIAL: {
          normal:false,
          type: "CONTENT"
        },
        EXPERT_SPECIAL: {
          normal:false,
          type: "EXPERT"
        },
        ENTERPRISE_SPECIAL: {
          normal:false,
          type: "ENTERPRISE"
        },
        ACTIVITY_ORDINARY: {
          normal:true,
          type: "ACTIVITY"
        },
        CONTENT_ORDINARY: {
          normal:true,
          type: "CONTENT"
        },
        EXPERT_ORDINARY: {
          normal:true,
          type: "EXPERT"
        },
        ENTERPRISE_ORDINARY: {
          normal:true,
          type: "ENTERPRISE"
        },
      }
      for(let key in newData) {
        for(let i = 0; i < newData[key].length; i++){
          newData[key][i] = {...newData[key][i], ...dataMaps[key]};
        }
        hotWordData = [...hotWordData, ...newData[key]];
      }
      if (ordinaryHot) {
        for(let i = 0; i < hotWordData.length; i++){
          if (hotWordData[i].normal) {
            hotWordData.splice(i, 1);
            i--;
          }
        }
      }
      try {
        const res = yield call(submitWords, hotWordData);
        if (res.status === 1) {
          message.success("保存成功");
        }
      } catch (error) {
        message.error("保存失败");
      }
    },
    // 更改热词是否显示
    *updateHotWordIsOpen({ payload }, { select, call, put }) {
      const hotWordFlag = yield select(state => state.searchPage.hotWordFlag)
      try {
        yield call(updateHotWordIsOpen, { isOpen: hotWordFlag });
      } catch (error) {
        message.error("热词状态更新失败");
      }
    },
    // 更改普通热词模式
    *updateAutomatic({ payload }, { select, call, put }) {
      const ordinaryHot = yield select(state => state.searchPage.ordinaryHot)
      try {
        yield call(updateAutomatic, { isAuto: ordinaryHot });
      } catch (err) {
        message.error("普通热词模式保存失败");
      }
    },
    // 获取热词
    *getHotlist({ payload }, { select, call, put }) {
      try {
        const res = yield call(getHot);
        if (res.status === 1) {
          let newData= {
            "ACTIVITY_SPECIAL": [], // 精选
            "CONTENT_SPECIAL": [],
            "EXPERT_SPECIAL": [],
            "ENTERPRISE_SPECIAL": [],
            "ACTIVITY_ORDINARY": [], // 普通
            "CONTENT_ORDINARY": [],
            "EXPERT_ORDINARY": [],
            "ENTERPRISE_ORDINARY": [],
          };
          res.data.forEach(item => {
            item.normal
              ? newData[item.type+"_ORDINARY"].push(item)
              : newData[item.type+"_SPECIAL"].push(item)
          });
          yield put({ type: 'changeState', payload: { hotDataList: newData} });
        }
      } catch (err) {}
    },
    // 获取热词开启状态
    *hotOpen({ payload }, { call, put }) {
      try {
        const res = yield call(hotOpen);
        if (res.status === 1) {
          yield put({ type: 'changeState', payload: { hotWordFlag: res.data } });
        }
      } catch (err) {}
    },
    // 获取普通热词模式
    *hotWordIsAutoUpdate({ payload }, { call, put }) {
      try {
        const res = yield call(hotWordIsAutoUpdate);
        if (res.status === 1) {
          yield put({ type: 'changeState', payload: { ordinaryHot: res.data } });
        }
      } catch (err) {}
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
