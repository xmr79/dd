import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import ComTable from '@/components/ComTable';
import { activityList2 } from '@/services/experience/activity.js';

const ModalSelectActive = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { value = [] },
    },
    dispatch,
    accountListAll,
    handlOk,
    MAX,
  } = props;
  const [selectLists, setSelectLists] = useState([]);

  useEffect(() => {
    if (modalShow && modalType === 'MODAL_SELECT_ACTIVE') {
      setSelectLists(value);
      dispatch({
        type: 'common/getListAll',
        payload: {
          tags: ['DEFAULT', 'COMPANY', 'NORMAL'],
        },
      });
    } else if (!modalShow && modalType === 'MODAL_SELECT_ACTIVE') {
      setSelectLists([]);
      dispatch({
        type: 'common/getListAll',
        payload: {
          tags: ['DEFAULT', 'NORMAL'],
        },
      });
    }
  }, [modalShow]);

  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: 'MODAL_SELECT_ACTIVE',
        modalShow: false,
        modalData: {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handleOk = () => {
    if (selectLists.length <= 0) {
      message.error('请选择关联活动');
      return false;
    }

    handlOk(selectLists);
    handleCancel();
  };
  const btns = r => {
    const { id } = r;
    const is = selectLists.map(_ => _.id).includes(id);
    return [
      !is && {
        key: '1',
        btnname: '选择',
        handleClick: () => {
          if (selectLists.length >= MAX) {
            message.error(`最多选择${MAX}个活动`);
            return false;
          }
          const arr = [...selectLists, r];
          setSelectLists(arr);
        },
      },
      is && {
        key: '2',
        ref: (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const arr = selectLists.filter(_ => _.id !== id);
              setSelectLists(arr);
            }}
          >
            已选择
          </div>
        ),
      },
    ];
  };
  const columns = [
    {
      title: '活动标题',
      width: 150,
      dataIndex: 'title',
      valueType: 'tip',
      isCopy: true,
    },
    {
      title: '活动分类',
      dataIndex: 'categoryVOS',
      render: t => {
        return t.map(_ => _.name).join(';');
      },
    },
    {
      title: '活动标签',
      dataIndex: 'activityTagVOS',
      render: t => {
        return t.map(_ => _.name).join(';');
      },
    },
    {
      title: '体验导师',
      dataIndex: 'tutorVOS',
      render: t => {
        return t.length > 0 ? t.map(_ => _.name).join(';') : '--';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
    },
    {
      title: '操作',
      valueType: 'action',
      width: 100,
      btns,
    },
  ];
  const searchColums = [
    {
      name: '活动标题',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入活动标题',
    },
    {
      name: '活动分类',
      dataname: 'categoryId',
      type: 'sort',
    },
    {
      name: '活动标签',
      dataname: 'tagId',
      type: 'sort',
      mtype: 'activeity',
      sortType: 'LABEL',
    },
    {
      name: '体验导师',
      dataname: 'tutorId',
      type: 'sort',
      sortType: 'TUTOR',
    },
    {
      name: '创建账号',
      dataname: 'editUsername',
      type: 'status',
      placeholder: '全部',
      status: accountListAll,
      isSearch: true,
    },
  ];
  return (
    <Modal
      width={'900px'}
      title="选择关联活动"
      maskClosable={false}
      visible={modalType === 'MODAL_SELECT_ACTIVE' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
      destroyOnClose
    >
      <ComTable
        rowKey="id"
        request={params => activityList2(params)}
        columns={columns}
        searchColums={searchColums}
      ></ComTable>
    </Modal>
  );
};
const mapStateToProps = ({ global, common }) => {
  return {
    dataModal: global.dataModal,
    accountListAll: common.accountListAll,
  };
};
export default connect(mapStateToProps)(ModalSelectActive);
