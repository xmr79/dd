/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Row, Col } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { tutorList } from '@/services/system/tutor';
import {} from '@/constants';
import ModalTutor from '@/pages/System/Modals/ModalTutor';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
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
          handleAdd('MODAL_TUTOR', { r });
        },
      },
      {
        key: '1',
        authority: '',
        btnname: '查看',
        handleClick: () => {
          handleAdd('MODAL_TUTOR', { r, isChakan: true });
        },
      },
      {
        key: '2',
        authority: '',
        btnname: '删除',
        handleClick: () => {
          if (num > 0) {
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
                  type: 'tutor/tutorDelete',
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
      title: '导师姓名',
      dataIndex: 'name',
    },
    {
      title: '领域介绍',
      dataIndex: 'domainIntroduction',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'imglists',
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
      name: '导师姓名',
      dataname: 'name',
      type: 'normal',
      placeholder: '请输入导师姓名',
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
    handleAdd('MODAL_TUTOR');
  };

  const handleTutor = val => {
    dispatch({
      type: 'tutor/tutorSave',
      payload: {
        params: val,
        reload,
      },
    });
  };
  return (
    <>
      <ModalTutor dataModal={dataModal} callback={handleTutor} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => tutorList(params)}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> 新增导师
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
