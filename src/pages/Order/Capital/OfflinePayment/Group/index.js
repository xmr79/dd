/**
 * Author: xh
 * Date: 2020/12/16
 * Description: 线下打款/团体活动
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import ComTable from '@/components/ComTable';
import UserInfo from '@/components/UserInfo';
import { payoffList } from '@/services/order/invoice';
import { InfoCircleOutlined } from '@ant-design/icons';

const Journal = props => {
  const { dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  // 已收到打款
  const handleAudit = params => {
    dispatch({
      type: 'capitalHandle/confirmPayent',
      payload: {
        params,
        reload,
      },
    });
  };
  // 未收到打款
  const handleNot = params => {
    dispatch({
      type: 'capitalHandle/notReceived',
      payload: {
        params,
        reload,
      },
    });
  };

  const btns = r => {
    const { orderNo, activityStartTime } = r;
    const timestamp = new Date().getTime();
    return [
      {
        key: '1',
        authority: '',
        condition: {
          dataindex: 'payStatus',
          val: [0],
        },
        ref: (
          <div
            onClick={() => {
              Modal.confirm({
                title: '确认前请先核实打款信息，要继续吗？',
                okText: '确认已打款',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  handleAudit({
                    orderNo,
                  });
                },
              });
            }}
          >
            <a>确认已打款</a>
          </div>
        ),
      },
      timestamp > activityStartTime && {
        key: '2',
        authority: '',
        condition: {
          dataindex: 'payStatus',
          val: [0],
        },
        ref: (
          <div
            onClick={() => {
              Modal.confirm({
                title: '确认前请先核实打款信息，要继续吗？',
                okText: '未收到打款',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  handleNot({
                    orderNo,
                  });
                },
              });
            }}
          >
            <a>未收到打款</a>
          </div>
        ),
      },
      {
        key: '3',
        authority: '',
        condition: {
          dataindex: 'payStatus',
          val: [1],
        },
        ref: <div>已收到打款</div>,
      },
      {
        key: '4',
        authority: '',
        condition: {
          dataindex: 'payStatus',
          val: [2],
        },
        ref: <div>未收到打款</div>,
      },
    ];
  };
  let columns = [
    {
      title: '下单时间',
      dataIndex: 'orderCreateTime',
      valueType: 'dateTime',
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
    },
    {
      title: '活动标题',
      dataIndex: 'activityName',
      width: 200,
    },
    {
      title: '费用(元)',
      dataIndex: 'orderAmount',
      render: (t) => {
        return t ? t.toFixed(2) : 0
      }
    },
    {
      title: '下单用户',
      dataIndex: 'username',
      render: (t, r) => {
        return (<UserInfo
          cinfo={{
            name: t,
            url: r.merAvatar,
          }}
        />)
      }
    },
    {
      title: '确认时间',
      dataIndex: 'reviewTime',
      valueType: 'verifyTime',
      verifyUser: 'reviewer',
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [  
    {
      name: '下单时间',
      dataname: {
        time: 'payTime',
        bTime: 'createOrderTimeStart',
        eTime: 'createOrderTimeEnd',
      },
      type: 'times',
    },
    {
      name: '订单编号',
      dataname: 'orderNo',
      type: 'normal',
      placeholder: '请输入订单编号',
    },
    {
      name: '活动标题',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入活动标题',
    },
    {
      name: '用户昵称',
      dataname: 'merUsername',
      type: 'normal',
      placeholder: '用户昵称',
    },
  ];

  return (
    <>
      <ComTable
        ref={tableRef}
        rowKey="id"
        request={params => payoffList(params)}
        columns={columns}
        searchColums={searchColums}
      >
      </ComTable>
    </>
  )
};
export default connect(({ operationLog }) => {
  return { ...operationLog };
})(Journal);
