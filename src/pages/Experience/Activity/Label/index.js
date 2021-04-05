/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Divider, Button, Modal, Row, Card, message } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { activityTagList } from '@/services/experience/activity.js';
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
              title: '删除标签',
              icon: <InfoCircleOutlined />,
              content: '活动数大于0的标签不能删除',
              okText: '我知道了',
            });
          } else {
            Modal.confirm({
              title: '提示',
              content: '确定要删除当前标签吗？',
              icon: <InfoCircleOutlined />,
              okText: '确定',
              cancelText: '取消',
              onOk() {
                dispatch({
                  type: 'label/activityTagDelete',
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
      title: '标签名称',
      dataIndex: 'name',
    },
    {
      title: '活动数',
      dataIndex: 'count',
      sorter: true,
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
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
      name: '标签名称',
      dataname: 'name',
      type: 'normal',
      placeholder: '请输入标签名称',
    },
    {
      name: '编辑时间',
      dataname: {
        time: 'time',
        bTime: 'updateTimeBegin',
        eTime: 'updateTimeEnd',
      },
      type: 'times',
    },
    {
      name: '编辑账号',
      dataname: 'editUsername',
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
    if (total > 500) {
      message.error('活动标签最多500个');
      return false;
    }
    handleAdd('MODAL_SORT');
  };
  const handleSort = val => {
    dispatch({
      type: 'label/activityTagAdd',
      payload: {
        params: { ...val },
        reload,
      },
    });
  };

  const callback = res => {
    const { data, totalItem } = res.data;
    setTotal(totalItem);
    return res.data;
  };

  // 处理排序
  const handleSort1 = sorter => {
    let param = {};
    const { field, order } = sorter;
    const orderSort = order => {
      let is = undefined;
      switch (order) {
        case 'descend':
          is = 'DESC';
          break;
        case 'ascend':
          is = 'ASC';
          break;
        default:
          break;
      }
      return is;
    };
    param = {
      orderSort: orderSort(order),
      sortField: field,
    };
    return orderSort(order) !== undefined ? param : { orderSort: undefined, sortField: undefined };
  };
  return (
    <>
      <ModalSort dataModal={dataModal} type="活动标签" callback={handleSort} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => activityTagList(params)}
        cb={callback}
        handleSort={handleSort1}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> 新增标签
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
