/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card, message } from 'antd';
import ComTable from '@/components/ComTable';
import { activityList } from '@/services/experience/activity.js';
import { activityStatus, sponsorType, ACTIVITY_AUDIT_REASON } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAudit from '@/pages/Modals/ModalAudit';
import BondAlert, { getIsBond } from '@/components/BondAlert';
import ModalExtension from '@/pages/Modals/ModalExtension';
import moment from 'moment';
const List = props => {
  useEffect(() => {}, []);
  const {
    dataModal,
    dispatch,
    currentUser: { userType, username },
    basicInfo,
  } = props;
  const { companyType, earnestFlag } = basicInfo;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  function getIsShow(r) {
    const { editUsername, sponsor } = r;
    let isShow = false;
    if (sponsor === 'PLATFORM' && userType === 'SYSTEM') {
      isShow = true;
    } else if (sponsor !== 'PLATFORM' && editUsername === username) {
      isShow = true;
    }
    return isShow;
  }

  const btns = r => {
    const { id, appointmentCount, title } = r;
    const isShow = getIsShow(r);
    return [
      isShow && {
        key: '1',
        authority: '',
        condition: {
          dataindex: 'status',
          val: ['WAIT_BEGIN', 'PROCESSING', 'OVER'],
        },
        btnname: '复制活动',
        handleClick: () => {
          Modal.confirm({
            title: '确定复制活动？',
            okText: '确定',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'activityManage/activityCopy',
                payload: {
                  id,
                  reload,
                },
              });
            },
          });
        },
      },

      isShow && {
        key: '2',
        authority: 'EXPERIENCE_ACTIVITY_MANAGE_SAVE',
        condition: {
          dataindex: 'status',
          val: ['WAIT_BEGIN', 'PROCESSING'],
        },
        btnname: '编辑',
        handleClick: () => {
          history.push({
            pathname: '/experience/activity/manage/createActivity',
            query: {
              id,
            },
          });
        },
      },
      isShow && {
        key: '5',
        btnname: '推广',
        handleClick: () => {
          const payload = {
            page: 'pages/Content/activity/activityDetail',
            scene: `id=${r.id}`,
            width: 200,
          };
          dispatch({ type: 'global/getExtensionQrcode', payload }).then(res => {
            handleAdd('EXTENSION', {
              ...r,
              pageurl: `pages/Content/activity/activityDetail?id=${r.id}`,
              pageimg: res.data,
            });
          });
        },
      },
      {
        key: '3',
        authority: '',
        btnname: '查看',
        condition: {
          dataindex: 'status',
          val: ['WAIT_BEGIN', 'PROCESSING', 'OVER'],
        },
        handleClick: () => {
          history.push({
            pathname: '/experience/activity/manage/createActivity',
            query: {
              isLook: '1',
              id,
            },
          });
        },
      },
      isShow && {
        key: '4',
        authority: 'EXPERIENCE_ACTIVITY_MANAGE_DELETE',
        btnname: '结束',
        condition: {
          dataindex: 'status',
          val: ['WAIT_BEGIN', 'PROCESSING'],
        },
        handleClick: () => {
          appointmentCount <= 0
            ? Modal.confirm({
                title: '提示',
                content: `确定要结束当前活动吗？`,
                okText: '结束',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  dispatch({
                    type: 'activityManage/activityFinish',
                    payload: {
                      id,
                      title,
                      reload,
                    },
                  });
                },
              })
            : Modal.warning({
                title: '提示',
                icon: <InfoCircleOutlined />,
                content: `当前活动已有${appointmentCount}人预约，不能结束`,
                okText: '我知道了',
              });
        },
      },
    ];
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
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
      title: '场次数',
      dataIndex: 'sessionCount',
    },
    {
      title: '活动名额/已报名/已核销',
      dataIndex: 'appointmentCount',
      render: (t, r) => {
        return `${r.maxQuota}/${t}/${r.usedCount}`;
      },
    },
    {
      title: '活动主办方',
      dataIndex: 'sponsor',
      valueType: 'statusdata',
      valueEnum: sponsorType,
      styleType: 'none',
    },
    {
      title: '活动时间',
      dataIndex: 'minStartDate',
      width: 200,
      render: (t, r) => {
        return `${moment(t).format('YYYY-MM-DD')}~${moment(r.maxStartDate).format('YYYY-MM-DD')}`;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'verifyTime',
      verifyUser: 'createUsername',
    },
    {
      title: '编辑时间',
      dataIndex: 'editTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
    },
    {
      title: '活动状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: activityStatus,
      refuseCause: 'refuseCause',
    },
    {
      title: '佣金',
      dataIndex: 'commissionRate',
      render: (t, r) => {
        return r.sponsor === 'PLATFORM' ? '--' : `${t * 100}%`;
      },
    },

    {
      title: '操作',
      valueType: 'action',
      btns: btns,
      btnAlign: 'column',
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
      name: '活动主办方',
      dataname: 'sponsor',
      type: 'status',
      status: sponsorType,
      isHidden: userType !== 'SYSTEM',
    },

    {
      name: '创建时间',
      dataname: {
        time: 'time',
        bTime: 'createTimeBegin',
        eTime: 'createTimeEnd',
      },
      type: 'times',
    },
    {
      name: '编辑时间',
      dataname: {
        time: 'editTime',
        bTime: 'editStartTime',
        eTime: 'editEndTime',
      },
      type: 'times',
    },
    {
      name: '活动状态',
      dataname: 'status',
      type: 'status',
      status: activityStatus,
    },
    {
      name: '活动时间',
      dataname: {
        time: 'aTime',
        bTime: 'activityStartTime',
        eTime: 'activityEndTime',
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

  const handleCreate = () => {
    if (getIsBond(userType, companyType, earnestFlag)) {
      message.warning('当前账号尚未缴纳保证金，为了不影响您的使用，请尽快缴纳平台入驻保证金');
      return false;
    }
    history.push('/experience/activity/manage/createActivity');
  };

  const handleAduit = val => {};
  return (
    <>
      <BondAlert />
      <ModalExtension dataModal={dataModal} />
      <ModalAudit handleAduit={handleAduit} title="活动" reasons={ACTIVITY_AUDIT_REASON} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => activityList({ activityType: 'NORMAL', ...params })}
        attribute={{ scroll: { x: 1500 } }}
      >
        <Row type="flex" justify="end">
          <AuthBlock auth="EXPERIENCE_ACTIVITY_MANAGE_SAVE">
            <Button className="mt-20" type="primary" onClick={handleCreate}>
              <PlusOutlined /> 新建活动
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ global, personalCenter, user }) => {
  return {
    dataModal: global.dataModal,
    basicInfo: personalCenter.basicInfo,
    currentUser: user.currentUser,
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
