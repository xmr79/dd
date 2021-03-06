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
        btnname: '??????',
        handleClick: () => {
          const lists = [
            { label: '????????????', children: title },
            {
              label: '????????????',
              children: categoryDTOS ? categoryDTOS.map(_ => _.name).join('???') : '--',
            },
            {
              label: '????????????',
              children: `${moment(minStartDate).format('YYYY-MM-DD')}~${moment(maxStartDate).format(
                'YYYY-MM-DD',
              )}`,
            },
            {
              label: '?????????',
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
        btnname: '??????',
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

        btnname: '??????',
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
        btnname: '??????',
        handleClick: () => {
          Modal.confirm({
            title: '???????????????????????????',
            okText: '??????',
            cancelText: '??????',
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
      title: '????????????',
      width: 150,
      dataIndex: 'title',
      valueType: 'tip',
    },
    {
      title: '????????????',
      dataIndex: 'categoryDTOS',
      width: 150,
      render(t, r) {
        return t ? t.map(_ => _.name).join('???') : '--';
      },
    },
    {
      title: '????????????',
      dataIndex: 'activityTagDTOS',
      width: 150,
      render(t, r) {
        return t ? t.map(_ => _.name).join('???') : '--';
      },
    },
    {
      title: '?????????',
      dataIndex: 'sessionCount',
    },
    {
      title: '???????????????',
      dataIndex: 'sponsor',
      valueType: 'statusdata',
      valueEnum: sponsorType,
      styleType: 'none',
    },
    {
      title: '????????????',
      dataIndex: 'minStartDate',
      render: (t, r) => {
        return `${moment(t).format('YYYY-MM-DD')}~${moment(r.maxStartDate).format('YYYY-MM-DD')}`;
      },
    },
    {
      title: '????????????',
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'editUsername',
    },
    {
      title: '????????????',
      dataIndex: 'auditTime',
      valueType: 'verifyTime',
      verifyUser: 'auditer',
    },
    {
      title: '????????????',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: activityAuditStatus,
      customRefuseCause: r => {
        const { reason, changeProposal } = r;
        return (
          <div>
            <div>???????????????{reason}</div>
            {changeProposal && <div>???????????????{changeProposal}</div>}
          </div>
        );
      },
    },
    {
      title: '??????',
      valueType: 'action',
      btns: btns,
    },
  ];
  const searchColums = [
    {
      name: '????????????',
      dataname: 'title',
      type: 'normal',
      placeholder: '?????????????????????',
    },
    {
      name: '????????????',
      dataname: 'categoryId',
      type: 'sort',
    },
    {
      name: '???????????????',
      dataname: 'sponsor',
      type: 'status',
      status: sponsorType,
      styleType: 'none',
      isHidden: userType !== 'SYSTEM',
    },

    // {
    //   name: '????????????',
    //   dataname: 'status',
    //   type: 'status',
    //   status: activityAuditStatus,
    // },
    {
      name: '????????????',
      dataname: {
        time: 'time',
        bTime: 'updateTimeBegin',
        eTime: 'updateTimeEnd',
      },
      type: 'times',
    },
    {
      name: '????????????',
      dataname: {
        time: 'auditTime',
        bTime: 'auditStartTime',
        eTime: 'auditendTime',
      },
      type: 'times',
    },
    {
      name: '????????????',
      dataname: 'editUsername',
      type: 'status',
      placeholder: '??????',
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
        title="??????"
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
