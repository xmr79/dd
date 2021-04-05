/**
 * 搜索条件加表格公共页面组件
 * @param {*列描述数据对象} columns
 * @param {*搜索条件数据对象} searchColums
 * @param {*请求接口} request
 * @param {*表格行 key 的取值} rowKey
 * @param {*其它自定义属性} attribute
 * @param {*插槽} children
 * @param {*额外参数} extraParams
 * @param {*表格行是否可选择及配置} rowSelection
 * @param {*展开功能的配置} expandable
 */

import React, {
  useState,
  useEffect,
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Table, Button, Card, Divider, Popover, Row, Col, Tabs } from 'antd';
import { paginations } from '@/constants';
import Qsearch from './Qsearch';
// import { customLoadingParams } from '@/components/Loading';
import getColumns from './columnsMap';
import { getSearchVal } from '@/components/ComTable/utils';
const { TabPane } = Tabs;
const ComTable = forwardRef((props, parentRef) => {
  const {
    columns,
    searchColums = [],
    request = val => {
      return {
        status: 1,
        data: {
          page: 1,
          size: 10,
          totalItem: 10,
          data: [
            { id: 2, userName: '111111' },
            { id: 4, userName: '222' },
          ],
        },
      };
    },
    setPaginations = true,
    rowKey,
    attribute,
    children,
    extraParams,
    rowSelection,
    expandable,
    handleSort,
    extraBtns,
    cb,
    dispatch,
    tabSetting = {},
    tableSize = 'default',
  } = props;
  const {
    isTabShow = false,
    tabList = [],
    isTabAll = true,
    keyname = 'status',
    defaultActiveKey = '',
    allIdx = 0,
  } = tabSetting;

  const sRef = useRef(null);

  // 默认参数
  const defaultparams = {
    page: 1,
    size: 10,
    ...extraParams,
  };

  const [params, setParams] = useState(defaultparams);
  const [firstLoad, setfirstLoad] = useState(true);
  const [data, setData] = useState({
    page: 1,
    size: 10,
    totalItem: 0,
  });
  const [loading, setloading] = useState(false);

  //监听
  useEffect(() => {
    async function fetchData() {
      setloading(true);
      setfirstLoad(false);
      let searchVal = getSearchVal(searchColums);
      const res = await request({ ...searchVal, ...params, page: params.page });
      if (res && res.status === 1) {
        let d = res.data;
        if (cb) {
          d = cb(res);
        }
        setData(d);
        setloading(false);
      }
    }
    if (request) fetchData();
  }, [params]);
  const handlesetParams = obj => {
    let nparams = {
      ...params,
      ...obj,
    };
    setParams(nparams);
  };
  useEffect(() => {
    if (extraParams && !firstLoad) {
      handlesetParams({ ...extraParams });
    }
  }, [extraParams]);
  //换页
  const onpageChange = (pageNumber, filters, sorter) => {
    const { current, pageSize } = pageNumber;
    const { column, order } = sorter;
    let sortObj = {};
    if (column && !handleSort) {
      const { searchParam } = column;
      if (searchParam) {
        sortObj[column.searchParam] = order;
      }
    } else {
      if (handleSort) {
        sortObj = handleSort(sorter);
      }
    }

    handlesetParams({ page: current, size: pageSize, ...sortObj });
  };

  //分页配置
  const pagination = {
    ...paginations,
    setPaginations,
    showQuickJumper: data.totalItem > 20,
    showSizeChanger: data.totalItem > 20,
    current: params.page,
    total: data.totalItem,
    showTotal: (total, range) => {
      return setPaginations ? `总共 ${total} 条数据` : '';
    },
  };
  //重置
  const reset = () => {
    handlesetParams(defaultparams);
  };
  //刷新
  const reload = () => {
    handlesetParams({});
  };

  let tparams = {
    rowKey: rowKey ? rowKey : 'id',
    pagination: data.totalItem ? pagination : false,
    dataSource: data.data,
    ...attribute,
    onChange: onpageChange,
    loading: {
      spinning: loading,
      // ...customLoadingParams,
    },
    rowSelection,
    expandable,
    size: tableSize,
  };
  const onSearch = val => {
    handlesetParams({ ...val, page: 1 });
  };
  useImperativeHandle(parentRef, () => ({
    reset,
    reload,
    params,
    data,
    handlesetParams,
    sRef,
    onSearch,
  }));

  const tabCallback = async key => {
    let obj = {};
    obj[keyname] = key ? key : undefined;
    await handlesetParams({ ...obj, page: 1 });
  };

  const getTabs = () => {
    const all = isTabAll && <TabPane tab="全部" key=""></TabPane>;
    const arr = tabList.map((_, idx) => {
      return <TabPane tab={_.value} key={_.key}></TabPane>;
    });
    arr.splice(allIdx, 0, all);
    return <>{arr}</>;
  };

  return (
    <div ref={parentRef}>
      {searchColums.length > 0 && (
        <Qsearch ref={sRef} searchColums={searchColums} extraBtns={extraBtns} onSearch={onSearch} />
      )}
      {children}
      {isTabShow && (
        <Tabs
          style={{ padding: '0 24px' }}
          // defaultActiveKey={defaultActiveKey}
          activeKey={params[keyname]}
          onChange={tabCallback}
        >
          {getTabs()}
        </Tabs>
      )}

      <Table className="mt-15" columns={getColumns(columns, dispatch)} {...tparams} />
    </div>
  );
});

export default ComTable;
