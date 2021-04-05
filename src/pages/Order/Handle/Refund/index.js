/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Tooltip } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { activityRefundList } from '@/services/order';
import { payType, refundStatus } from '@/constants';
import UserInfo from '@/components/UserInfo';
import { isRealNum } from '@/utils/utils';
import { InfoCircleOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons';

const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  let columns = [
    {
      title: '退款时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '订单编号',
      dataIndex: 'orderId',
    },

    {
      title: '用户信息',
      dataIndex: 'userNick',
      render: (t, r) => {
        return (
          <UserInfo
            cinfo={{
              name: t,
              url: r.avatar,
            }}
          />
        );
      },
    },
    {
      title: '活动名称',
      dataIndex: 'activityTitle',
      width: 150,
      valueType: 'tip',
    },

    {
      title: '实付金额（元）',
      dataIndex: 'payment',
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'statusdata',
      valueEnum: payType,
      styleType: 'none',
    },
    {
      title: '退款金额（元）',
      dataIndex: 'refundAmount',
      render: (t, r) => {
        return (
          <div>
            {t}
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
      width: 200,
      dataIndex: 'reason',
      valueType: 'tip',
    },
    {
      title: '退款状态',
      dataIndex: 'refundStatus',
      valueType: 'statusdata',
      valueEnum: refundStatus,
    },
  ];

  const searchColums = [
    {
      name: '退款时间',
      dataname: {
        time: 'time',
        bTime: 'createTimeBegin',
        eTime: 'createTimeEnd',
      },
      type: 'times',
    },
    {
      name: '订单编号',
      dataname: 'orderId',
      type: 'normal',
      placeholder: '请输入订单编号',
      rules: [
        {
          validator: (rule, value) => {
            if (!value) {
              return Promise.resolve();
            } else if (!isRealNum(value)) {
              return Promise.reject('订单编号必须为数字');
            } else {
              return Promise.resolve();
            }
          },
        },
      ],
    },
    {
      name: '用户信息',
      dataname: 'userNick',
      type: 'normal',
      placeholder: '请输入用户信息',
    },
    {
      name: '活动名称',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入活动名称',
    },
    {
      name: '支付方式',
      dataname: 'platform',
      type: 'status',
      placeholder: '全部',
      status: payType,
    },
    {
      name: '退款原因',
      dataname: 'reason',
      placeholder: '请输入用户信息',
    },

    {
      name: '退款状态',
      dataname: 'refundStatus',
      type: 'status',
      status: refundStatus,
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
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => activityRefundList(params)}
      />
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
