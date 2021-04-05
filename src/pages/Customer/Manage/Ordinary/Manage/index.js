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
import { sexStatus } from '@/constants';
import UserInfo from '@/components/UserInfo';
import AuthBlock from '@/components/Auth/AuthBlock';
import AddBlack from '@/pages/Customer/Manage/Ordinary/Modals/AddBlack';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const removeBlack = selectedRowKeys => {
    Modal.confirm({
      title: '是否移除黑名单？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        const avartUrl = selectedRowKeys.wxAvatarUrl ? selectedRowKeys.wxAvatarUrl : selectedRowKeys.aliAvatarUrl;
        const username = selectedRowKeys.wxNickName ? selectedRowKeys.wxNickName : selectedRowKeys.aliNickName;
        dispatch({
          type: 'customerManage/userBlacklist',
          payload: {
            params: {
              // ids: [selectedRowKeys.id],
              users: [{ id: selectedRowKeys.id, username, avartUrl }],
              status: 'NORMAL',
            },
            reload,
          },
        });
        // dispatch({
        //   type: 'customerManage/userBlacklist',
        //   payload: {
        //     params: {
        //       ids: selectedRowKeys,
        //       status: 'NORMAL',
        //     },
        //     reload,
        //   },
        // });
      },
    });
  };

  const btns = r => {
    const { id } = r;
    return [
      {
        key: '1',
        btnname: '加入黑名单',
        authority: 'CUSTOMER_MANAGE_ORDINARY_BLACKLIST',
        condition: {
          dataindex: 'status',
          val: ['NORMAL'],
        },
        handleClick: () => {
          const avartUrl = r.wxAvatarUrl ? r.wxAvatarUrl : r.aliAvatarUrl;
          const username = r.wxNickName ? r.wxNickName : r.aliNickName;
          const users = [{ id: r.id, avartUrl, username }]
          handleAdd('ADD_BLACK', { selectedRowKeys: [id], users });
        },
      },
      {
        key: '2',
        btnname: '移除黑名单',
        condition: {
          dataindex: 'status',
          val: ['STOP'],
        },
        authority: 'CUSTOMER_MANAGE_ORDINARY_BLACKLIST',
        handleClick: () => {
          removeBlack(r);
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
      title: '预约活动数',
      dataIndex: 'activityNum',
    },
    {
      title: '累计消费金额（元）',
      dataIndex: 'totalBalance',
    },
    {
      title: '首次授权时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
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
    {
      name: '首次授权时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
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
  // 处理排序
  const handleSort = sorter => {
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
      case 'createTime':
        param = {
          asc: orderSort(order),
        };
        break;
    }
    return orderSort(order) !== undefined ? param : { asc: undefined, orderBy: undefined };
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const users = [];
      selectedRows.map(item => {
        const avartUrl = item.wxAvatarUrl ? item.wxAvatarUrl : item.aliAvatarUrl;
        const username = item.wxNickName ? item.wxNickName : item.aliNickName;
        users.push({ id: item.id, avartUrl, username })
      })
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(users)
    },
  };
  const handleRes = obj => {
    const { values, selectedRowKeys = [], users } = obj;
    dispatch({
      type: 'customerManage/userBlacklist',
      payload: {
        params: {
          ...values,
          // ids: selectedRowKeys,
          users,
          status: 'STOP',
        },
        reload,
      },
    });
  };
  return (
    <>
      <AddBlack handleRes={handleRes} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        handleSort={handleSort}
        request={params => list({ ...params })}
        rowSelection={rowSelection}
      >
        <Row type="flex" justify="end">
          <AuthBlock auth="CUSTOMER_MANAGE_ORDINARY_BLACKLIST">
            <Tooltip title={!selectedRowKeys.length ? '先选择才可批量加入' : null}>
              <Button
                className="mt-20"
                type="primary"
                disabled={selectedRowKeys.length <= 0}
                onClick={() => {
                  handleAdd('ADD_BLACK', { selectedRowKeys, users: selectedRows });
                }}
              >
                加入黑名单
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
