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
import { activitySortList } from '@/services/experience/activity.js';
import {} from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalSort from '@/pages/Modals/ModalSort';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
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
              content: '活动数大于0的分类不能删除',
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
                  type: 'sort/activitySortDelete',
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
      title: '活动数',
      dataIndex: 'count',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
      name: '分类名称',
      dataname: 'name',
      type: 'normal',
      placeholder: '请输入分类名称',
    },
    {
      name: '创建时间',
      dataname: {
        time: 'time',
        bTime: 'updateTimeBegin',
        eTime: 'updateTimeEnd',
      },
      type: 'times',
    },
    {
      name: '创建账号',
      dataname: 'editUsername',
      type: 'status',
      placeholder: '全部',
      isSearch: true,
      status: [].map(_ => {
        return {
          key: _.id,
          value: _.name,
        };
      }),
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
      type: 'sort/activityCategoryAdd',
      payload: {
        params: { ...val },
        reload,
      },
    });
  };
  return (
    <>
      <ModalSort dataModal={dataModal} type="活动分类" callback={handleSort} />
      <ComTable
        ref={tableRef}
        columns={columns}
        // searchColums={searchColums}
        request={params => activitySortList(params)}
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
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
