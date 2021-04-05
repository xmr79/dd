/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card, message } from 'antd';
import ComTable from '@/components/ComTable';
import { userAdminList } from '@/services/customer';
import { activityStatus, sponsorType } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import BondAlert, { getIsBond } from '@/components/BondAlert';
import moment from 'moment';
const List = props => {
  useEffect(() => {}, []);
  const {
    dataModal,
    dispatch,
    currentUser: { userType, username },
    basicInfo,
    id,
  } = props;
  const { companyType, earnestFlag } = basicInfo;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  const columns = [
    {
      title: '活动标题',
      width: 150,
      dataIndex: 'title',
      valueType: 'tip',
      isCopy: true,
    },
    // {
    //   title: '活动分类',
    //   dataIndex: 'categoryVOS',
    //   render: t => {
    //     return t.map(_ => _.name).join(';');
    //   },
    // },
    // {
    //   title: '活动标签',
    //   dataIndex: 'activityTagVOS',
    //   render: t => {
    //     return t.map(_ => _.name).join(';');
    //   },
    // },
    {
      title: '场次数',
      dataIndex: 'sessionCount',
    },
    // {
    //   title: '活动名额/已报名/已核销',
    //   dataIndex: 'appointmentCount',
    //   render: (t, r) => {
    //     return `${r.maxQuota}/${t}/${r.usedCount}`;
    //   },
    // },
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
      verifyUser: 'editUsername',
    },
    {
      title: '活动状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: activityStatus,
      refuseCause: 'refuseCause',
    },
  ];

  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        request={params => userAdminList({ id, ...params })}
      ></ComTable>
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
