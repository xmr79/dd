import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Tag, Row, Card } from 'antd';
import moment from 'moment';
import ComTable from '@/components/ComTable';
import AuthBlock from '@/components/Auth/AuthBlock';
import { allRolesList } from '@/services/system/account';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const Roles = props => {
  const { dispatch, dataModal } = props;
  const tableRef = useRef(null);
  useEffect(() => {
    return () => {};
  }, []);
  const reload = () => {
    tableRef.current.reload();
  };
  const handleUpdate = (r, type) => {
    const { id, useCount } = r;
    switch (type) {
      case 'EDIT': {
        // 编辑
        return;
      }
      case 'DELETE': {
        // 删除
        useCount <= 0
          ? Modal.confirm({
              title: '删除角色',
              content: '删除角色后不可恢复，你还要继续吗？',
              icon: <InfoCircleOutlined />,
              okText: '确定',
              cancelText: '取消',
              onOk() {
                dispatch({
                  type: 'rolesList/accountRoleDelete',
                  payload: { id, reload },
                });
              },
            })
          : Modal.warning({
              title: '删除角色',
              icon: <InfoCircleOutlined />,
              content: '当前有用户正在使用该角色，请不要删除。',
              okText: '我知道了',
            });

        return;
      }
      default:
    }
  };
  const btns = r => {
    const { id, isDefault, allowModify, useCount, tag } = r;
    return [
      tag === 'DEFAULT' && {
        key: '1',
        btnname: '查看',
        // authority: 'SYSTEM_ROLE_SHOW',
        handleClick: () => toAdd(id, tag),
      },
      tag !== 'DEFAULT' && {
        key: '3',
        // authority: 'SYSTEM_ROLE_UPDATE',
        btnname: '编辑',
        handleClick: () => toAdd(id, tag),
      },

      tag !== 'DEFAULT' && {
        key: '2',
        authority: 'SYSTEM_MANAGE_ROLES_DELETE',
        btnname: '删除',
        isDis: useCount > 0,
        handleClick: () => handleUpdate(r, 'DELETE'),
      },
    ];
  };
  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
      width: 200,
      render(t, r) {
        return r.isDefault === 1 ? (
          <div>
            {t}
            <Tag className="ml-5" style={{ cursor: 'default' }}>
              系统
            </Tag>
          </div>
        ) : (
          t
        );
      },
    },

    {
      title: '角色描述',
      dataIndex: 'desc',
      valueType: 'tip',
      width: 300,
    },
    {
      title: '账号数量',
      dataIndex: 'useCount',
      width: 200,
    },

    {
      title: '操作',
      width: 80,
      valueType: 'action',
      btns: btns,
    },
  ];

  // 新增操作
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r,
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: '',
        modalShow: false,
        modalData: {},
      },
    };

    dispatch({ type: 'global/changeState', payload });
  };
  const handleSubmitRoles = () => {};
  const toAdd = (id, tag) => {
    const path = {
      pathname: '/system/manage/roles/roleCreate',
      query: {
        id: id ? id : undefined,
        tag: tag ? tag : undefined,
      },
    };
    history.push(path);
  };
  const cb = res => {
    if (res && res.status === 1) {
      return {
        page: 1,
        size: 10,
        totalItem: res.data.length,
        data: res.data,
      };
    } else {
      return {
        page: 1,
        size: 10,
        totalItem: 0,
        data: [],
      };
    }
  };
  return (
    <>
      <Row type="flex" justify="end">
        <AuthBlock auth="SYSTEM_MANAGE_ROLES_SAVE">
        <Button
          type="primary"
          onClick={() => {
            toAdd();
          }}
        >
          <PlusOutlined />
          添加角色
        </Button>
        </AuthBlock>
      </Row>

      <ComTable ref={tableRef} request={params => allRolesList(params)} columns={columns} cb={cb} />
    </>
  );
};

const mapStateToProps = ({ global, roles }) => {
  return {
    ...roles,
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(Roles);
