/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Col, Row } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { commissionDetailSelectDetail } from '@/services/order';
import { tradeType, payType } from '@/constants';
import UserInfo from '@/components/UserInfo';
import AuthBlock from '@/components/Auth/AuthBlock';
const List = props => {
  useEffect(() => {}, []);
  const {
    dataModal,
    dispatch,
    location: {
      query: { statDate },
    },
  } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const columns = [
    {
      title: '账号信息',
      dataIndex: 'username',
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
      title: '订单数',
      dataIndex: 'orderCount',
    },
    {
      title: '活动场次数',
      dataIndex: 'activitySessionCount',
    },
    {
      title: '佣金（元）',
      dataIndex: 'commission',
    },
  ];

  const searchColums = [
    {
      name: '账号信息',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入用户名/手机号',
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

  const handleDown = () => {
    dispatch({ type: 'capitalList/handledown' });
  };

  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => commissionDetailSelectDetail({ ...params, statDate })}
      ></ComTable>
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
