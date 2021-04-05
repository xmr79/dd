/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal } from 'antd';
import QCard from '@/components/QCard';
import InfoShow from '@/components/InfoShow';
import ComTable from '@/components/ComTable';
import { selectActivityOrderVisitorList } from '@/services/experience/activity';
import { CERTIFICATES_TYPE, ORDER_PAYTYPE, orderStatus } from '@/constants';
const List = props => {
  const {
    dataModal,
    dispatch,
    location: {
      query: { id },
    },
    orderDetail,
  } = props;
  useEffect(() => {
    dispatch({
      type: 'activityManage/getTeamActivityOrder',
      payload: {
        teamActivityId: id,
      },
    });
    return () => {
      dispatch({
        type: 'activityManage/changeState',
        payload: {
          orderDetail: {},
        },
      });
    };
  }, []);
  const {
    id: orderId,
    userNick,
    payTime,
    createTime,
    platform,
    status,
    totalAmount,
    payType = null,
  } = orderDetail;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const columns = [
    {
      title: '体验者姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      render: (t, r) => {
        const obj = CERTIFICATES_TYPE.filter((item, index) => {
          return item.key === t;
        })[0];
        if (obj) {
          const { value } = obj;
          return r.idNumber ? (value ? value : '--') : '--';
        } else {
          return '--';
        }
      },
    },
    {
      title: '证件号码',
      dataIndex: 'idNumber',
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
  return (
    <>
      <QCard title="订单信息">
        <InfoShow
          column={3}
          lists={[
            {
              label: '订单编号',
              children: orderId,
            },
            {
              label: '下单时间',
              children: createTime,
              type: 'time',
            },
            {
              label: '支付时间',
              children: payTime,
              type: 'time',
            },
            {
              label: '支付金额',
              children: `￥${totalAmount}`,
            },
            {
              label: '支付方式',
              children: payType,
              type: 'statusdata',
              valueEnum: ORDER_PAYTYPE,
              styleType: 'none',
            },
            {
              label: '下单人',
              children: userNick,
            },
            {
              label: '订单状态',
              children: status,
              type: 'statusdata',
              valueEnum: orderStatus,
              styleType: 'none',
            },
          ]}
        />
      </QCard>
      {orderId && (
        <QCard title="体验者信息">
          <ComTable
            ref={tableRef}
            columns={columns}
            request={params => selectActivityOrderVisitorList({ orderId, ...params })}
          />
        </QCard>
      )}
    </>
  );
};
const mapStateToProps = ({ global, activityManage }) => {
  return {
    dataModal: global.dataModal,
    orderDetail: activityManage.orderDetail,
  };
};
export default connect(mapStateToProps)(List);
