import * as services from '@/services/system/account';
const { allRolesList, roleDelete, roleSave, roleGetRole } = services;
import { message } from 'antd';
import md5 from 'blueimp-md5';
import { history } from 'umi';
import defaultSettings from '../../../../config/defaultSettings';
const { tokenKey, md5Key } = defaultSettings;

const getdata = (data, arr = [], arr2 = []) => {
  if (data.length && data.every(i => i.type === 'API')) {
    arr.push(data[0].id.toString());
  }
  data.forEach((item, index) => {
    if (item.type !== 'API') {
      arr.push(item.id.toString());
      if (item.subPermissionList.length) {
        getdata(item.subPermissionList, arr, arr2);
      }
    }
    arr2.push(item.id.toString());
    if (item.subPermissionList) {
      getdata(item.subPermissionList, arr, arr2);
    }
  });
  return {
    arr,
    arr2,
  };
};
const findParentId = (data, id) => {
  let res = [];
  const findids = (arr, temp = []) => {
    for (const node of arr) {
      if (node.id === id) {
        // temp.push(id);
        res = temp;
        return;
      } else if (node.subPermissionList.length > 0) {
        findids(node.subPermissionList, temp.concat(node.id.toString()));
      }
    }
  };
  findids(data, []);
  return res;
};

//传入参数：需要遍历的json，需要匹配的id
const getsuperior = (data, id) => {
  let res;
  const findids = arr => {
    for (const node of arr) {
      if (node.subPermissionList.length > 0) {
        for (const i of node.subPermissionList) {
          if (id === i.id) {
            res = node.id.toString();
            return res;
          } else if (i.subPermissionList.length > 0) {
            res = findids(node.subPermissionList);
            if (res) {
              return res;
            }
          }
        }
      }
    }
    return res;
  };
  findids(data);
  return res;
};
// 权限树数据处理
const getDataFuncs = (data, arr) => {
  const sibling = data.map(_ => _.id.toString());

  data = data.map((item, index, array) => {
    const getparent = (key, array) => {};
    return {
      id: item.id,
      title: `${item.name}`,
      label: item.name,
      key: item.id.toString(),
      value: item.id.toString(),
      type: item.type,
      sibling,
      superior: getsuperior(arr, item.id),
      parent: findParentId(arr, item.id),
      childs: item.subPermissionList.length ? getdata(item.subPermissionList).arr : [],
      arrChilds: item.subPermissionList.length ? getdata(item.subPermissionList).arr2 : [],
      children: item.subPermissionList.length ? getDataFuncs(item.subPermissionList, arr) : [],
    };
  });
  return data;
};
// 权限树数据处理
const getRoleIds = data => {
  let ids = [];
  let list = [];
  let maps = {};
  const getItemIds = (dataItem, pIds) => {
    dataItem.map((item, index) => {
      item.pIds = pIds + `,${item.id}`;
      maps[item.id] = item;
      list.push(item);
      // item.flag && ids.push({ value: item.id.toString() });
      item.selected && ids.push(item.id.toString());
      if (item.subPermissionList.length) {
        getItemIds(item.subPermissionList, item.pIds);
      }
      return item;
    });
  };
  getItemIds(data, '');
  return { ids, maps, list };
};
const getIds = data => {
  let ids = [];
  const getItemIds = dataItem => {
    dataItem.map((item, index) => {
      item.selected && ids.push(item.id.toString());
      if (item.subPermissionList.length) {
        getItemIds(item.subPermissionList);
      }
      return item;
    });
  };
  getItemIds(data);
  return ids;
};
export default {
  namespace: 'rolesList',
  state: { dataRoleList: [], roleDetail: {}, permissList: [] },
  effects: {
    // 获取权限
    *getSaveRoleEchoPermissList({ payload }, { call, put, select }) {
      try {
        const { data, status } = yield call(roleGetRole, {});
        if (status === 1) {
          yield put({
            type: 'changeState',
            payload: {
              permissList: getDataFuncs(data, data),
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    *roleDetailsGet({ payload }, { call, put, select }) {
      try {
        const { id } = payload;
        const { data = {}, status } = yield call(roleGetRole, { id });
        const { permissionList, name, desc, tag } = data;
        if (status === 1) {
          yield put({
            type: 'changeState',
            payload: {
              roleDetail: {
                name,
                desc,
                permissionList: getIds(permissionList),
              },
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取角色列表
    *getRoleList({ payload }, { call, put, select }) {
      try {
        const res = yield call(allRolesList);
        if (res.status === 1) {
          yield put({ type: 'changeState', payload: { dataRoleList: res.data } });
        }
      } catch (err) {}
    },
    //新增/修改角色
    *saveOrUpdateRole({ payload }, { call, put, select }) {
      const { id } = payload;
      const { status, data } = yield call(roleSave, payload);
      if (status === 1) {
        message.success(`${id ? '修改' : '添加'}成功`);
        history.go(-1);
      }
    },
    //删除角色
    *accountRoleDelete({ payload }, { call, put, select }) {
      const { id, reload } = payload;
      const { status, data } = yield call(roleDelete, { id });
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
