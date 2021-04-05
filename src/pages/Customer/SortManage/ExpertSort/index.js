/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Divider, Button, Modal, Row, Card } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import {} from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalSort from '@/pages/Modals/ModalSort';
import { categoryList } from '@/services/category';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, accountListAll } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, num } = r;
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
          if (num > 0) {
            Modal.warning({
              title: '删除领域',
              icon: <InfoCircleOutlined />,
              content: '认证专家数大于0的领域不能删除',
              okText: '我知道了',
            });
          } else {
            Modal.confirm({
              title: '提示',
              content: '确定要删除当前领域吗？',
              icon: <InfoCircleOutlined />,
              okText: '确定',
              cancelText: '取消',
              onOk() {
                dispatch({
                  type: 'customerCategory/categoryDelete',
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
      title: '领域',
      dataIndex: 'name',
    },
    {
      title: '认证专家数',
      dataIndex: 'num',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
      name: '领域名称',
      dataname: 'name',
      type: 'normal',
      placeholder: '请输入领域名称',
    },
    {
      name: '创建时间',
      dataname: {
        time: 'time',
        bTime: 'startDate',
        eTime: 'endDate',
      },
      type: 'times',
    },
    {
      name: '创建账号',
      dataname: 'creater',
      type: 'status',
      placeholder: '全部',
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
  const handleCreate = () => {
    handleAdd('MODAL_SORT');
  };
  const handleSort = val => {
    dispatch({
      type: 'customerCategory/categorySave',
      payload: {
        params: { ...val, type: 'TERRITORY' },
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
      case 'num':
        param = {
          asc: orderSort(order),
        };
        break;
    }
    return orderSort(order) !== undefined ? param : { asc: undefined, orderBy: undefined };
  };
  return (
    <>
      <ModalSort dataModal={dataModal} type="领域" callback={handleSort} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        handleSort={handleSort1}
        request={params => categoryList({ ...params, type: 'TERRITORY' })}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> 新增领域
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
