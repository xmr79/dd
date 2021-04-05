/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { connect, history } from 'umi';
import {
  Card,
  Button,
  Tabs,
  Checkbox,
  Tooltip,
  Row,
  col,
  Upload,
  Pagination,
  Empty,
  Modal,
} from 'antd';
import styles from '../../index.less';
import {
  EditOutlined,
  LinkOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import CardItem from '@/pages/System/SourceHouse/components/Item';
import Qsearch from '@/components/ComTable/Qsearch';
const Layout = forwardRef((props, parentRef) => {
  const { type, list, dispatch, handleDelete } = props;

  const [params, setParams] = useState({ page: 1, size: 50 });
  useEffect(() => {
    dispatch({ type: 'sourceHouse/getMaterialList', payload: { ...params, type } });
  }, [params]);

  const [selects, setSelects] = useState([]);

  useEffect(() => {}, [selects]);

  const handleCheck = (checked, info) => {
    let arr = selects;
    if (checked) {
      arr = [...selects, info.id];
      setSelects(arr);
    } else {
      arr = selects.filter(_ => _ !== info.id);
      setSelects(arr);
    }
  };
  const onPageChange = (page, pageSize) => {
    setParams({
      page,
      size: pageSize,
    });
  };
  const handlesetParams = obj => {
    let nparams = {
      ...params,
      ...obj,
    };
    setParams(nparams);
  };
  //刷新
  const reload = () => {
    handlesetParams({});
  };
  useImperativeHandle(parentRef, () => ({
    reload,
  }));
    const searchColums = [
    {
      name: '标题',
      dataname: 'materialName',
      type: 'normal',
      placeholder: '请输入标题名称',
    },
  ];
    const onSearch = val => {
    setParams({
      ...params,
      ...val,
    });
  };
  return (
    <div ref={parentRef}>
      <Qsearch onSearch={onSearch} searchColums={searchColums} />
      <Row style={{ height: '50px' }} justify="end">
        {selects.length > 0 && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确定要删除吗？',
                okText: '确定',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  handleDelete(selects);
                  setSelects([]);
                },
              });
            }}
            type="primary"
          >
            选中删除
          </Button>
        )}
      </Row>
      {list.totalItem <= 0 ? (
        <Empty />
      ) : (
        <div className={styles.lists}>
          {list.data.map((_, idx) => {
            return (
              <CardItem
                dispatch={dispatch}
                key={idx}
                handleCheck={handleCheck}
                info={_}
                value={selects}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      )}

      {list.totalItem > 0 && (
        <Pagination
          current={list.page}
          total={list.totalItem}
          onChange={onPageChange}
          pageSize={list.size}
        />
      )}
    </div>
  );
});
export default Layout;
