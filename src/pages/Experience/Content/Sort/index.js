/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect } from 'umi';
import { Divider, Button, Modal, Row, Card, message } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { contentCategoryList } from '@/services/experience/content.js';
import {} from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalSort from '@/pages/Modals/ModalSort';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, accountListAll } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, count } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '编辑',
        handleClick: () => {
          handleAdd('MODAL_SORT', r);
        },
      },
      {
        key: '2',
        authority: '',
        btnname: '删除',
        handleClick: () => {
          if (count > 0) {
            Modal.warning({
              title: '删除分类',
              icon: <InfoCircleOutlined />,
              content: '文章数大于0的分类不能删除',
              okText: '我知道了',
            });
          } else {
            Modal.confirm({
              title: '提示',
              content: '确定要删除当前分类吗？',
              icon: <InfoCircleOutlined />,
              okText: '确定',
              cancelText: '取消',
              onOk() {
                dispatch({
                  type: 'contentCategory/contentCategoryDelete',
                  payload: { id, reload },
                });
              },
            });
          }
        },
      },
    ];
  };
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '文章数',
      dataIndex: 'count',
      sorter: true,
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'creater',
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'action',
      btns: btns,
    },
  ];
  const searchColums = [
    {
      name: '分类名称',
      dataname: 'name',
      type: 'normal',
      placeholder: '请输入分类名称',
    },
    {
      name: '编辑时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '编辑账号',
      dataname: 'creater',
      type: 'status',
      placeholder: '全部',
      isSearch: true,
      status: accountListAll,
    },
  ];
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const [total, setTotal] = useState(0);
  const handleCreate = () => {
    if (total > 20) {
      message.error('文章分类最多20个');
      return false;
    }
    handleAdd('MODAL_SORT');
  };

  const callback = res => {
    const { data, totalItem } = res.data;

    setTotal(totalItem);
    return res.data;
  };
  const handleSort = val => {
    dispatch({
      type: 'contentCategory/contentCategoryAdd',
      payload: {
        params: { ...val },
        reload,
      },
    });
  };
  // 处理排序
  const handleSort1 = sorter => {
    let param = {};
    const { field, order } = sorter;
    const orderSort = order => {
      let is = undefined;
      switch (order) {
        case 'descend':
          is = false;
          break;
        case 'ascend':
          is = true;
          break;
        default:
          break;
      }
      return is;
    };
    switch (field) {
      case 'count':
        param = {
          asc: orderSort(order),
        };
        break;
    }
    return orderSort(order) !== undefined ? param : { asc: undefined, orderBy: undefined };
  };
  return (
    <>
      <ModalSort dataModal={dataModal} type="文章分类" callback={handleSort} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => contentCategoryList(params)}
        cb={callback}
        handleSort={handleSort1}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> 新增分类
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ global, common }) => {
  return {
    dataModal: global.dataModal,
    accountListAll: common.accountListAll,
  };
};
export default connect(mapStateToProps)(List);
