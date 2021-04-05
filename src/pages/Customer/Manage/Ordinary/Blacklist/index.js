/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Row, Col, Tooltip } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { list } from '@/services/customer';
import { sexStatus, BLACK_TYPE } from '@/constants';
import UserInfo from '@/components/UserInfo';
import AuthBlock from '@/components/Auth/AuthBlock';

const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  const btns = r => {
    const { id } = r;
    return [
      {
        key: '1',
        btnname: '移除黑名单',
        authority: 'CUSTOMER_MANAGE_ORDINARY_BLACKLIST',
        handleClick: () => {
          removeBlack([id]);
        },
      },
    ];
  };
  let columns = [
    {
      title: '用户标识',
      dataIndex: 'flag',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 140,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 64,
      render: (t, r) => {
        const { wxGender, aliGender } = r;
        const sex = aliGender ? aliGender : wxGender;
        return sex === 1 ? '男' : '女';
      },
    },
    {
      title: '地区',
      dataIndex: 'province',
      render: (t, r) => {
        return r.province ? `${r.province}/${r.city}` : '--';
      },
    },
    {
      title: '微信昵称',
      width: 150,
      dataIndex: '3',
      render: (t, r) => {
        const { wxAvatarUrl, wxGender, wxNickName } = r;
        return wxNickName ? (
          <UserInfo
            info={{
              wxAvatarUrl,
              wxNickName,
            }}
          />
        ) : (
          '--'
        );
      },
    },
    {
      title: '支付宝昵称',
      dataIndex: 'aliNickName',
      width: 150,
      render: (t, r) => {
        const { aliNickName, aliAvatarUrl, aliGender } = r;
        return aliNickName ? (
          <UserInfo
            info={{
              aliNickName,
              aliAvatarUrl,
            }}
          />
        ) : (
          '--'
        );
      },
    },
    {
      title: '禁用时长',
      dataIndex: 'blackType',
      valueType: 'statusdata',
      valueEnum: BLACK_TYPE,
      styleType: 'none',
    },

    {
      title: '加入时间',
      dataIndex: 'blackStartTime',
      valueType: 'dateTime',
      // sorter: true,
      width: 150,
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [
    {
      name: '手机号',
      dataname: 'mobile',
      type: 'normal',
      placeholder: '请输入手机号',
    },
    {
      name: '性别',
      dataname: 'gender',
      type: 'status',
      placeholder: '全部',
      status: sexStatus,
    },
    {
      name: '用户昵称',
      dataname: 'name',
      type: 'normal',
      placeholder: '请输入用户昵称',
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const removeBlack = selectedRowKeys => {
    Modal.confirm({
      title: '是否移除黑名单？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'customerManage/userBlacklist',
          payload: {
            params: {
              ids: selectedRowKeys,
              status: 'NORMAL',
            },
            reload,
          },
        });
      },
    });
  };
  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => list({ status: 'STOP', ...params })}
        rowSelection={rowSelection}
      >
        <Row type="flex" justify="end">
          <AuthBlock auth="CUSTOMER_MANAGE_ORDINARY_BLACKLIST">
            <Tooltip title={!selectedRowKeys.length ? '先选择才可批量移除' : null}>
              <Button
                className="mt-20"
                type="primary"
                disabled={selectedRowKeys.length <= 0}
                onClick={() => {
                  // handleAdd('ADD_BLACK');
                  removeBlack(selectedRowKeys);
                }}
              >
                移除黑名单
              </Button>
            </Tooltip>
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
