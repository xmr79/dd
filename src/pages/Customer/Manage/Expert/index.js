/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Button, Divider, Modal } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { listAuthUser } from '@/services/customer';
import { userType } from '@/constants';
import UserInfo from '@/components/UserInfo';
import { InfoCircleOutlined, PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, categoryLists } = props;
  useEffect(() => {
    dispatch({
      type: 'common/getcategoryList',
      payload: {
        type: 'TERRITORY',
      },
    });
  }, []);
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, archive } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '查看详情',
        handleClick: () => {
          history.push({
            pathname: '/customer/manage/expert/detail',
            query: {
              userId: id,
            },
          });
        },
      },
      {
        key: '2',
        authority: 'CUSTOMER_MANAGE_EXPERT_BLACKLIST',
        btnname: archive === 'N' ? '账号禁用' : '账号解禁',
        handleClick: () => {
          Modal.confirm({
            title: `${
              archive === 'N'
                ? '账号禁用后，小程序端将不能搜索到该账号，确定要禁用吗？'
                : '账号解禁后，用户账号将恢复正常使用，确定要解禁吗？'
            }`,
            okText: archive === 'N' ? '禁用' : '解禁',
            cancelText: '取消',
            icon:
              archive === 'N' ? (
                <CloseCircleOutlined style={{ color: 'red' }} />
              ) : (
                <InfoCircleOutlined />
              ),
            onOk() {
              dispatch({
                type: 'customerManage/authBlacklist',
                payload: {
                  params: {
                    id,
                    archive: archive === 'N' ? 'S' : 'N',
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
      title: '账号信息',
      dataIndex: 'mobile',
      render: (t, r) => {
        return (
          <>
            <div>{r.username}</div>
            <div>{r.mobile}</div>
          </>
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'authName',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      valueType: 'imglists',
    },
    {
      title: '所属领域',
      dataIndex: 'category',
      render: (t, r) => {
        return t ? t.map(_ => _.name).join(';') : '--';
      },
    },
    {
      title: '管理员',
      dataIndex: 'adminNickName',
      render: (t, r) => {
        return t ? (
          <UserInfo
            cinfo={{
              name: t,
              url: r.adminAvatarUrl,
            }}
          />
        ) : (
          '--'
        );
      },
    },
    {
      title: '粉丝数',
      dataIndex: 'fansNum',
      sorter: true,
    },

    {
      title: '发布文章数',
      dataIndex: 'contentNum',
      sorter: true,
    },
    {
      title: '认证时间',
      dataIndex: 'authTime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: '使用状态',
      dataIndex: 'archive',
      valueType: 'statusdata',
      valueEnum: userType,
    },
    {
      title: '操作',
      valueType: 'action',
      width: 200,
      rowSpan: 2,
      btns: btns,
    },
  ];
  const searchColums = [
    {
      name: '账号信息',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入账号信息',
    },
    {
      name: '姓名',
      dataname: 'authName',
      type: 'normal',
      placeholder: '请输入姓名',
    },
    // {
    //   name: '管理员昵称',
    //   dataname: 'adminNickname',
    //   type: 'normal',
    //   placeholder: '请输入管理员昵称',
    // },

    {
      name: '认证领域',
      dataname: 'categoryId',
      type: 'status',
      placeholder: '全部',
      status: categoryLists.map(_ => {
        return {
          key: _.id,
          value: _.name,
        };
      }),
    },
    {
      name: '认证时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '使用状态',
      dataname: 'archive',
      type: 'status',
      placeholder: '全部',
      status: userType.filter(_ => _.key !== 'Y'),
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
      case 'authTime':
        param = {
          asc: orderSort(order),
        };
        break;
    }
    return orderSort(order) !== undefined ? param : { asc: undefined, orderBy: undefined };
  };
  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => listAuthUser({ ...params, userType: 'EXPERT' })}
        handleSort={handleSort}
      />
    </>
  );
};
const mapStateToProps = ({ global, common }) => {
  return {
    dataModal: global.dataModal,
    categoryLists: common.categoryLists,
  };
};
export default connect(mapStateToProps)(List);
