/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Modal, Divider, Alert } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import InfoShow from '@/components/InfoShow';
import { AuthUserSubVO } from '@/services/system/personalCenter';
import UserInfo from '@/components/UserInfo';
import ModalEditMobile from '@/pages/System/Modals/ModalEditMobile.js';
import ModalBindAdd from '@/pages/System/Modals/ModalBindAdd.js';
import ModalBindReplace from '@/pages/System/Modals/ModalBindReplace.js';

import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { userTag } from '@/constants';
const Operate = props => {
  const tableRef = useRef(null);

  const reload = () => {
    tableRef.current.reload();
  };
  const {
    dispatch,
    mobile,
    dataModal,
    currentUser: { userType },
  } = props;

  useEffect(() => {
    dispatch({ type: 'personalCenter/getMobile' });
  }, []);
  const editMobile = () => {
    handleAdd('MODAL_EDIT_MOBILE');
  };
  const add = () => {
    handleAdd('MODAL_BIND_ADD');
  };
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
  const btns = r => {
    const { flag, userTag } = r;
    return [
      {
        key: '1',
        // authority: 'SYSTEM_ADMIN_UPDATE',
        btnname: '更换',
        condition: {
          dataindex: 'tag',
          val: ['ADMIN'],
        },
        handleClick: () => {
          handleAdd('MODAL_BIND_REOLACE');
        },
      },
      {
        key: '2',
        // authority: 'SYSTEM_ADMIN_UPDATE',
        btnname: '解绑',
        condition: {
          dataindex: 'tag',
          val: ['VERIFIER'],
        },
        handleClick: () => {
          Modal.confirm({
            title: '解绑后，该用户无法在小程序端完成活动核销等操作，确定要继续吗？',
            okText: '解绑',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'personalCenter/personunbind',
                payload: {
                  params: {
                    flag,
                  },
                  reload,
                },
              });
            },
          });
        },
      },
    ];
  };
  const columns = [
    {
      title: '用户标识',
      dataIndex: 'flag',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '用户昵称',
      dataIndex: 'aliNickName',
      render: (t, r) => {
        return <UserInfo info={r} />;
      },
    },
    {
      title: '用户角色',
      dataIndex: 'tag',
      valueType: 'statusdata',
      valueEnum: userTag,
      styleType: 'none',
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];
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
  const handleAddFlag = val => {
    dispatch({
      type: 'personalCenter/personbind',
      payload: {
        params: val,
        reload,
      },
    });
  };
  const handleReplace = val => {
    dispatch({
      type: 'personalCenter/changeBind',
      payload: {
        params: val,
        reload,
      },
    });
  };

  const getText = () => {
    switch (userType) {
      case 'EXPERT':
        return `只能绑定1个小程序账号作为管理员;`;
        break;
      case 'SYSTEM':
        return `1个账号最多绑定50个小程序账号`;
        break;
      default:
        return `1个账号最多绑定10个小程序账号,其中只能绑定1个小程序账号作为管理员;`;
        break;
    }
  };
  return (
    <>
      <ModalEditMobile dataModal={dataModal} />
      <ModalBindAdd dataModal={dataModal} handleAddFlag={handleAddFlag} />
      <ModalBindReplace dataModal={dataModal} handleAddFlag={handleReplace} />
      {userType !== 'EXPERT' && (
        <>
          <QCard
            justify="inherit"
            title="联系电话"
            des="将用于活动详情页"
            extra={
              <Button type="link" onClick={editMobile}>
                {mobile ? '修改' : '添加'}
              </Button>
            }
          >
            <InfoShow
              layout={{
                labelCol: { span: 3 },
                wrapperCol: { span: 16 },
              }}
              lists={[
                {
                  label: '联系电话',
                  children: mobile,
                },
              ]}
              column={1}
            />
          </QCard>
          <Divider />
        </>
      )}

      <QCard
        justify="inherit"
        title="账号绑定"
        extra={
          <Button type="link" onClick={add}>
            添加绑定
          </Button>
        }
      >
        <Alert
          message={
            <div>
              <p>
                1.
                {getText()}
              </p>
              <p>2. 已绑定的小程序账号，可在小程序端完成角色对应权限的相关操作; </p>
              <p>
                3. 绑定流程：1)小程序用户提供用户标识(我的 - 个人信息 - 用户标识);
                2)在该页面完成绑定。
              </p>
            </div>
          }
          type="info"
          showIcon
          className="mb-20"
        />
        <ComTable
          ref={tableRef}
          rowKey="id"
          request={params => AuthUserSubVO(params)}
          columns={columns}
          cb={cb}
        ></ComTable>
      </QCard>
    </>
  );
};
export default connect(({ personalCenter, global, user }) => {
  return {
    mobile: personalCenter.mobile,
    dataModal: global.dataModal,
    currentUser: user.currentUser,
  };
})(Operate);
