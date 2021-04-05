/**
 * Author: xh
 * Date: 2020/12/16
 * Description: 退款申请
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Button, Tooltip, Modal } from 'antd';
import ComTable from '@/components/ComTable';
import UserInfo from '@/components/UserInfo';
import { refundList } from '@/services/order/invoice';
import { invoiceState, invoiceType } from '@/constants';
import { InfoCircleOutlined } from '@ant-design/icons';

const Journal = props => {
  const { dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const handleAudit = params => {
    dispatch({
      type: 'capitalHandle/configRefund',
      payload: {
        params,
        reload,
      },
    });
  };

  const btns = r => {
    const { id, reviewTime } = r;
    return [
      !reviewTime && {
        key: '1',
        authority: '',
        ref: (
          <div
            onClick={() => {
              Modal.confirm({
                title: '确认前请先给用户进行线下打款，要继续吗？',
                okText: '确认已退款',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  handleAudit({
                    refundApplyId: id,
                  });
                },
              });
            }}
          >
            <a>确认已退款</a>
          </div>
        ),
      },
      (Boolean(reviewTime)) && {
        key: '2',
        authority: '',
        ref: <div>已退款</div>,
      },
    ];
  };
  let columns = [
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      valueType: 'dateTime',
      width: 150,
    },
    {
      title: '订单编号',
      dataIndex: 'orderNo',
      width: 150,
    },
    {
      title: '用户信息',
      dataIndex: 'merUsername',
      render: (t, r) => {
        return (<UserInfo
          cinfo={{
            name: r.merUsername,
            url: r.merAvatar,
          }}
        />)
      }
    },
    {
      title: '活动名称',
      width: 180,
      dataIndex: 'activityName',
    },
    {
      title: '实付金额(元)',
      dataIndex: 'actualAmount',
      render: (t) => {
        return t ? t.toFixed(2) : t;
      }
    },
    {
      title: '退款金额(元)',
      dataIndex: 'refundAmount',
      render: (t, r) => {
        return (
          <div>
            {t ? t.toFixed(2) : t}
            {r.handingRate ? (
              <Tooltip title={`扣除${r.handingRate * 100}%手续费`}>
                <InfoCircleOutlined className="ml-10" />
              </Tooltip>
            ) : (
              ''
            )}
          </div>
        );
      },
    },
    {
      title: '退款原因',
      dataIndex: 'refundReason',
      width: 150,
      render: t => {
        return t ? t : '--'
      }
    },
    {
      title: '确认时间',
      dataIndex: 'reviewTime',
      valueType: 'verifyTime',
      verifyUser: 'reviewer',
      width: 150,
    },
    {
      title: '操作',
      valueType: 'action',
      width: 130,
      btns: btns,
    },
  ];

  const searchColums = [  
    {
      name: '申请时间',
      dataname: {
        time: 'time',
        bTime: 'applyTimeStart',
        eTime: 'applyTimeEnd',
      },
      type: 'times',
    },
    {
      name: '订单编号',
      dataname: 'orderNo',
      type: 'normal',
      placeholder: '请输入订单编号'
    },
    {
      name: '用户昵称',
      dataname: 'merUsername',
      type: 'normal',
      placeholder: '请输入用户昵称',
    },
    {
      name: '活动名称',
      dataname: 'activityName',
      type: 'normal',
      placeholder: '请输入活动名称',
    },
  ];

  return (
    <>
      <ComTable
        ref={tableRef}
        rowKey="id"
        request={params => refundList(params)}
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
