/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Button, Divider, Modal, Row, Col } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { listAuthUser } from '@/services/customer';
import { userType, COMPANYTYPE } from '@/constants';
import { EditOutlined } from '@ant-design/icons';
import ModalBrokerage from '@/pages/Modals/ModalBrokerage';
import UserInfo from '@/components/UserInfo';
import { InfoCircleOutlined, PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, categoryLists } = props;
  useEffect(() => {
    dispatch({
      type: 'common/getcategoryList',
      payload: {
        type: 'CATEGORY',
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
            pathname: '/customer/manage/enterprise/detail',
            query: {
              userId: id,
            },
          });
        },
      },
      {
        key: '2',
        authority: 'CUSTOMER_MANAGE_EXTERPRISE_BLACKLIST',
        condition: {
          dataindex: 'archive',
          val: ['N', 'S'],
        },
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
  const handlebrokerage = id => {
    handleAdd('MODAL_BROKERAGE', { id });
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
      title: '企业名称',
      dataIndex: 'authName',
    },
    {
      title: '企业类型',
      dataIndex: 'companyType',
      valueType: 'statusdata',
      valueEnum: COMPANYTYPE,
      styleType: 'none',
    },
    {
      title: 'logo',
      dataIndex: 'avatarUrl',
      width: 100,
      valueType: 'imglists',
    },
    {
      title: '亮点标签',
      dataIndex: 'category',
      width: 150,
      render: (t, r) => {
        return t
          ? t.map((_, index) => (
              <p key={_.id}>
                {_.name}
                {index == t.length - 1 ? '' : ';'}
              </p>
            ))
          : '--';
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
      title: '收藏数',
      dataIndex: 'fansNum',
      sorter: true,
    },

    {
      title: '发布活动数',
      dataIndex: 'activityNum',
      sorter: true,
    },
    {
      title: '发布文章数',
      dataIndex: 'contentNum',
      sorter: true,
    },
    // {
    //   title: '佣金',
    //   dataIndex: 'brokerage',
    //   width: 100,
    //   render: (t, r) => {
    //     return r.companyType === 'ENTERPRISE' ? (
    //       <Row gutter={12}>
    //         <Col>{t}%</Col>
    //         <Col
    //           onClick={() => {
    //             handlebrokerage(r.id);
    //           }}
    //         >
    //           <EditOutlined style={{ cursor: 'pointer' }} />
    //         </Col>
    //       </Row>
    //     ) : (
    //       '--'
    //     );
    //   },
    // },
    {
      title: '入驻时间',
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
      name: '提交人',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入提交人昵称',
    },
    {
      name: '企业名称',
      dataname: 'authName',
      type: 'normal',
      placeholder: '请输入企业名称',
    },
    {
      name: '企业类型',
      dataname: 'companyType',
      type: 'status',
      placeholder: '全部',
      status: COMPANYTYPE,
    },
    // {
    //   name: '管理员昵称',
    //   dataname: 'adminNickname',
    //   type: 'normal',
    //   placeholder: '请输入管理员昵称',
    // },

    {
      name: '亮点标签',
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
      name: '入驻时间',
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
      status: userType,
    },
  ];
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
          orderBy: 3,
        };
        break;
      case 'contentNum':
        param = {
          asc: orderSort(order),
          orderBy: 2,
        };
        break;
      case 'activityNum':
        param = {
          asc: orderSort(order),
          orderBy: 1,
        };
        break;
      case 'fansNum':
        param = {
          asc: orderSort(order),
          orderBy: 0,
        };
        break;
    }
    return orderSort(order) !== undefined ? param : { asc: undefined, orderBy: undefined };
  };
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

  const callback = val => {
    dispatch({
      type: 'customerManage/updateBrokerage',
      payload: {
        params: val,
        reload,
      },
    });
  };
  return (
    <>
      <ModalBrokerage dataModal={dataModal} callback={callback} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => listAuthUser({ ...params, userType: 'COMPANY' })}
        handleSort={handleSort}
        attribute={{ scroll: { x: 1500 } }}
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
