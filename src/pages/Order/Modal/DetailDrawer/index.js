/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Drawer, Table } from 'antd';
import InfoShow from '@/components/InfoShow';
import YoukeInfo from '@/pages/Order/Modal/DetailDrawer/YoukeInfo';
import { ORDER_PAYTYPE } from '@/constants';
import moment from 'moment';
import columnsMap from '@/components/ComTable/columnsMap.js';
const DetailDrawer = props => {
  const {
    dataDrawer: {
      modalShow,
      modalData: { id, status },
    },
    dispatch,
    orderDetail = {},
  } = props;
  const {
    payType,
    title,
    activityUnitPrice,
    totalAmount,
    visitorCount,
    activityTime,
    activitySessionName,
    startTime,
    endTime,
    activityOrderVisitorVOS = [],
  } = orderDetail;
  useEffect(() => {
    if (modalShow && id) {
      dispatch({
        type: 'queryList/activityOrderDetail',
        payload: {
          id,
        },
      });
    }
  }, [modalShow]);
  const onClose = () => {
    dispatch({
      type: 'queryList/changeState',
      payload: {
        dataDrawer: { modalShow: false, modalData: {} },
      },
    });
  };

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: 150,
      valueType: 'tip',
    },
    {
      title: '场次信息',
      dataIndex: 'activitySessionName',
    },
    {
      title: '活动时间',
      dataIndex: 'activityTime',

      width: 150,
      render: (t, r) => {
        return `${moment(r.startTime).format('YYYY-MM-DD HH:mm')}~${moment(r.endTime).format(
          'YYYY-MM-DD HH:mm',
        )}`;
      },
    },
    {
      title: '费用（元）',
      dataIndex: 'totalAmount',
    },
    {
      title: '数量',
      dataIndex: 'visitorCount',
    },
    {
      title: '实付(元)',
      dataIndex: 'totalAmount',

      render: t => {
        if (status === 'WAIT_PAY' || status === 'CLOSED') {
          return 0;
        } else {
          return t;
        }
      },
    },
  ];
  return (
    <>
      <Drawer
        width="700"
        title="订单详情"
        placement="right"
        onClose={onClose}
        visible={modalShow}
        destroyOnClose
      >
        <InfoShow
          lists={[
            { label: '订单编号', children: id },
            {
              label: '订单来源',
              children: payType,
              type: 'statusdata',
              valueEnum: ORDER_PAYTYPE,
              styleType: 'none',
            },
          ]}
          column={2}
        />
        <Table
          size="middle"
          rowKey="id"
          columns={columnsMap(columns)}
          dataSource={
            id
              ? [
                  {
                    id,
                    title,
                    activitySessionName,
                    totalAmount,
                    visitorCount,
                    startTime,
                    endTime,
                  },
                ]
              : []
          }
          pagination={false}
          locale={{ emptyText: '暂无数据' }}
          title={() => (
            <div className="sub-order-info flex-between">
              <h3 style={{ fontWeight: 600 }}>活动信息</h3>
            </div>
          )}
        />
        {id && <YoukeInfo dataLogisticDetail={activityOrderVisitorVOS} orderId={id} />}
      </Drawer>
    </>
  );
};
export default connect(({ queryList }) => {
  return { orderDetail: queryList.orderDetail };
})(DetailDrawer);
