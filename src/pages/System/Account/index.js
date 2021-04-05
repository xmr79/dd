import React, { useEffect, useRef, Fragment } from 'react';
import { connect } from 'umi';
import { Divider, Button, Modal, Row, Card } from 'antd';

import ComTable from '@/components/ComTable';
import AuthBlock from '@/components/Auth/AuthBlock';
import ModalAccount from '@/pages/System/Modals/ModalAccount';
import { accountStatus } from '@/constants';
import { accountList } from '@/services/system/account';
import { arrayToObj } from '@/utils/utils';
import moment from 'moment';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalResetPassword from '@/pages/Modals/ModalResetPassword';
const Account = props => {
  const { dispatch, dataModal, dataRoleList = [], parentAccountList = [] } = props;
  const tableRef = useRef(null);

  const reload = () => {
    tableRef.current.reload();
  };
  useEffect(() => {
    // 获取角色列表
    dispatch({ type: 'account/getRoleList' });
    return () => {};
  }, []);
  const handleUpdate = (r, type) => {
    const { id, username, status } = r;

    switch (type) {
      case 'EDIT': {
        // 编辑
        handleAdd('SYS_ACCOUNT', {
          id,
          type: 'EDIT',
        });
        return;
      }
      case 'EDIT_PASSWORD': {
        // 修改密码
        handleAdd('EDITOR_RESET_PWD', {
          record: {
            ...r,
          },
        });
        return;
      }
      case 'EDIT_STATUS': {
        // 状态修改
        Modal.confirm({
          title: `${status === 'NORMAL' ? '是否禁用当前账号？' : '是否将当前账号设为可用？'}`,
          okText: '确定',
          cancelText: '取消',
          icon: <InfoCircleOutlined />,
          onOk() {
            dispatch({
              type: 'account/updateStatus',
              payload: {
                params: {
                  username,
                  status: status === 'NORMAL' ? 'STOP' : 'NORMAL',
                },
                reload,
              },
            });
          },
        });
        return;
      }
      case 'DELETE': {
        // 删除
        Modal.confirm({
          title: '是否删除当前账号？',
          okText: '确定',
          cancelText: '取消',
          icon: <InfoCircleOutlined />,
          onOk() {
            dispatch({
              type: 'account/accountDelete',
              payload: {
                username,
                reload,
              },
            });
          },
        });
        return;
      }
      default:
    }
  };

  const btns = r => {
    const { status, isDefault, id, tag, userType } = r;
    return [
      tag === 'NORMAL' && {
        key: '4',
        authority: 'SYSTEM_MANAGE_ACCOUNT_RESET',
        btnname: '重置密码',
        handleClick: () => handleUpdate(r, 'EDIT_PASSWORD'),
      },
      tag === 'NORMAL' && {
        key: '1',
        // authority: 'SYSTEM_ADMIN_UPDATE',
        btnname: '编辑',
        handleClick: () => handleUpdate(r, 'EDIT'),
      },

      tag !== 'DEFAULT' && {
        key: '2',
        // authority: 'SYSTEM_ADMIN_UPDATE_STATUS',
        btnname: status === 'NORMAL' ? '禁用' : '解禁',
        handleClick: () => handleUpdate(r, 'EDIT_STATUS'),
      },
      tag === 'NORMAL' && {
        key: '3',
        authority: 'SYSTEM_MANAGE_ACCOUNT_DELETE',
        btnname: '删除',
        handleClick: () => handleUpdate(r, 'DELETE'),
      },
    ];
  };
  let columns = [
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },

    {
      title: '角色',
      dataIndex: 'roleList',
      render: (t = []) => {
        return t.map(_ => _.name).join('；');
      },
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: accountStatus,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '创建账号',
      dataIndex: 'createAccount',
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [
    {
      name: '账号',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入账号名称',
    },
    {
      name: '角色',
      dataname: 'roleId',
      type: 'status',
      placeholder: '全部',
      status: dataRoleList.map(_ => {
        return {
          key: _.id,
          value: _.name,
        };
      }),
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
      name: '账号状态',
      dataname: 'status',
      type: 'status',
      status: accountStatus,
    },
  ];

  // 新增操作
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

  return (
    <>
      <ModalAccount dataModal={dataModal} reload={reload} parentAccountList={parentAccountList} />
      <ModalResetPassword dataModal={dataModal} />
      <ComTable
        ref={tableRef}
        rowKey="id"
        request={params => accountList(params)}
        columns={columns}
        searchColums={searchColums}
      >
        <Row type="flex" justify="end">
          <AuthBlock auth="SYSTEM_MANAGE_ACCOUNT_SAVE">
            <Button
              className="mt-20"
              type="primary"
              onClick={() => {
                handleAdd('SYS_ACCOUNT');
              }}
            >
              <PlusOutlined /> 新增账号
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};

const mapStateToProps = ({ global, account }) => {
  return {
    ...account,
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(Account);
