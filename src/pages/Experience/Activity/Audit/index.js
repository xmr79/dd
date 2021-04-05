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
import { activityReviewList } from '@/services/experience/activity.js';
import { activityAuditStatus, sponsorType, ACTIVITY_AUDIT_REASON } from '@/constants';
import ModalAudit from '@/pages/Experience/Activity/Modals/ModalAudit';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
const List = props => {
  useEffect(() => {}, []);
  const {
    dataModal,
    dispatch,
    currentUser,
    accountListAll,
    location: {
      query: { status = 'WAIT_REVIEW' },
    },
  } = props;

  const { username, userType } = currentUser;

  useEffect(() => {
    dispatch({
      type: 'common/getListAll',
      payload: {
        tags: ['DEFAULT', 'COMPANY', 'NORMAL'],
      },
    });
    return () => {
      dispatch({
        type: 'common/getListAll',
        payload: {
          tags: ['DEFAULT', 'NORMAL'],
        },
      });
    };
  }, []);

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
    const {
      id,
      title,
      categoryDTOS,
      activityTime,
      sponsor,
      activityId,
      editUsername,
      minStartDate,
      maxStartDate,
      status,
      type,
    } = r;
    const isShow = getIsShow(r);
    const path =
      type === 'TEAM'
        ? '/experience/activity/team/createTeam'
        : '/experience/activity/manage/createActivity';
    return [
      {
        key: '1',
        authority: 'EXPERIENCE_ACTIVITY_AUDIT_BTN',
        condition: {
          dataindex: 'status',
          val: ['WAIT_REVIEW'],
        },
        btnname: '审核',
        handleClick: () => {
          const lists = [
            { label: '活动标题', children: title },
            {
              label: '活动分类',
              children: categoryDTOS ? categoryDTOS.map(_ => _.name).join('；') : '--',
            },
            {
              label: '活动时间',
              children: `${moment(minStartDate).format('YYYY-MM-DD')}~${moment(maxStartDate).format(
                'YYYY-MM-DD',
              )}`,
            },
            {
              label: '主办方',
              children: sponsor,
              type: 'statusdata',
              valueEnum: sponsorType,
              styleType: 'none',
            },
          ];
          handleAdd('AUDIT', { ...r, lists });
        },
      },

      isShow && {
        key: '2',
        authority: 'EXPERIENCE_ACTIVITY_MANAGE_SAVE',
        condition: {
          dataindex: 'status',
          val: ['WAIT_SUBMIT', 'FAILED'],
        },
        btnname: '编辑',
        handleClick: () => {
          const query = { aduitId: id, auditStatus: status };
          if (activityId) {
            query['id'] = activityId;
          }
          history.push({
            pathname: path,
            query,
          });
        },
      },
      {
        key: '3',
        authority: '',

        btnname: '查看',
        handleClick: () => {
          const query = { aduitId: id, isLook: '1', auditStatus: status };
          if (activityId) {
            query['id'] = activityId;
          }
          history.push({
            pathname: path,
            query,
          });
        },
      },
      isShow && {
        key: '4',
        authority: 'EXPERIENCE_ACTIVITY_AUDIT_DELETE',
        condition: {
          dataindex: 'status',
          val: ['WAIT_SUBMIT', 'FAILED'],
        },
        btnname: '删除',
        handleClick: () => {
          Modal.confirm({
            title: '是否删除当前活动？',
            okText: '确定',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'activityAudit/activityReviewDelete',
                payload: {
                  id,
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
      title: '活动标题',
      width: 150,
      dataIndex: 'title',
      valueType: 'tip',
    },
    {
      title: '活动分类',
      dataIndex: 'categoryDTOS',
      width: 150,
      render(t, r) {
        return t ? t.map(_ => _.name).join('；') : '--';
      },
    },
    {
      title: '活动标签',
      dataIndex: 'activityTagDTOS',
      width: 150,
      render(t, r) {
        return t ? t.map(_ => _.name).join('；') : '--';
      },
    },
    {
      title: '场次数',
      dataIndex: 'sessionCount',
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
      render: (t, r) => {
        return `${moment(t).format('YYYY-MM-DD')}~${moment(r.maxStartDate).format('YYYY-MM-DD')}`;
      },
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      valueType: 'verifyTime',
      verifyUser: 'auditer',
    },
    {
      title: '活动状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: activityAuditStatus,
      customRefuseCause: r => {
        const { reason, changeProposal } = r;
        return (
          <div>
            <div>拒绝原因：{reason}</div>
            {changeProposal && <div>修改建议：{changeProposal}</div>}
          </div>
        );
      },
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
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
      styleType: 'none',
      isHidden: userType !== 'SYSTEM',
    },

    // {
    //   name: '活动状态',
    //   dataname: 'status',
    //   type: 'status',
    //   status: activityAuditStatus,
    // },
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
      name: '审核时间',
      dataname: {
        time: 'auditTime',
        bTime: 'auditStartTime',
        eTime: 'auditendTime',
      },
      type: 'times',
    },
    {
      name: '编辑账号',
      dataname: 'editUsername',
      type: 'status',
      placeholder: '全部',
      status: accountListAll,
      isHidden: userType !== 'SYSTEM',
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
  const handleAduit = val => {
    dispatch({
      type: 'activityAudit/activityAudit',
      payload: {
        params: { ...val },
        reload,
      },
    });
  };
  return (
    <>
      <ModalAudit
        handleAduit={handleAduit}
        title="活动"
        successKey="SUCCEED"
        failKey="FAILED"
        reasonKey="reason"
        reasons={ACTIVITY_AUDIT_REASON}
      />
      <ComTable
        ref={tableRef}
        columns={columns}
        request={params => activityReviewList(params)}
        searchColums={searchColums}
        tabSetting={{
          isTabShow: true,
          tabList: activityAuditStatus,
          isTabAll: true,
          keyname: 'status',
          defaultActiveKey: status,
          allIdx: activityAuditStatus.length,
        }}
        extraParams={{
          status,
        }}
      />
    </>
  );
};
const mapStateToProps = ({ global, user, common }) => {
  return {
    dataModal: global.dataModal,
    currentUser: user.currentUser,
    accountListAll: common.accountListAll,
  };
};
export default connect(mapStateToProps)(List);
