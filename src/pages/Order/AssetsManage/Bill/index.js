/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Col, Row, Popover } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { commissionDetailStatList } from '@/services/order';
import { tradeType, payType, enumRecentRechargeTime } from '@/constants';
import UserInfo from '@/components/UserInfo';
import AuthBlock from '@/components/Auth/AuthBlock';
import { arrayToObj, accSub } from '@/utils/utils';
import moment from 'moment';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const mapRecentRechargeTime = arrayToObj(enumRecentRechargeTime, 'key');
const List = props => {
  useEffect(() => {}, []);
  const {
    dataModal,
    dispatch,
    currentUser: { userType },
  } = props;
  const [params, setParams] = useState({
    beginDate: null,
    endDate: null,
  });
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, username } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '下载数据',
        handleClick: () => {
          dispatch({
            type: 'bill/handledown',
            payload: {
              ...params,
              username,
            },
          });
        },
      },
    ];
  };
  const columns = [
    {
      title: '账号信息',
      dataIndex: 'username',
    },
    {
      title: '支付（元）',
      dataIndex: 'payment',
    },
    {
      title: '退款（元）',
      dataIndex: 'refundAmount',
    },

    {
      title: '收入（元）',
      dataIndex: 'income',
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [
    {
      name: '时间',
      dataname: {
        time: 'time',
        bTime: 'beginDate',
        eTime: 'endDate',
        rules: [
          {
            validator: (rule, value) => {
              if (!value) {
                return Promise.resolve();
              } else if (
                value &&
                value.length &&
                value[1].valueOf() - value[0].valueOf() > 86400000 * 90
              ) {
                return Promise.reject('发送时间跨度范围不能超过90天');
              } else {
                return Promise.resolve();
              }
            },
          },
        ],
        setDisabledDate: current => {
          return current >= moment().startOf('day');
        },
      },
      type: 'times',
      initval: {
        tabtype: '30d',
        time: [
          moment(mapRecentRechargeTime['30d'].value[0]),
          moment(mapRecentRechargeTime['30d'].value[1]),
        ],
        beginDate: mapRecentRechargeTime['30d'].value[0],
        endDate: mapRecentRechargeTime['30d'].value[1],
      },
    },
    {
      name: '账号信息',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入用户名',
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

  const handleDown = () => {
    dispatch({ type: 'commission/handledown' });
  };
  const extra = (
    <Popover
      content={
        <div>
          <p>对账单统计待评价+已完成+已过期+已退款状态的订单；</p>
          <p>支付=支付金额之和；</p>
          <p>退款=退款金额之和；</p>
          <p>收入=∑[（订单支付金额-订单退款金额）*（1-佣金比例）]；</p>
        </div>
      }
      title="计算规则"
    >
      <InfoCircleOutlined className="ml-10" />
    </Popover>
  );

  return (
    <QCard title="对账单" des="按照账号维度生成账单" extra={extra}>
      <ComTable
        ref={tableRef}
        rowKey="username"
        columns={columns}
        searchColums={searchColums}
        request={params => {
          setParams(params);
          return commissionDetailStatList(params);
        }}
      >
        <div className="mt-15">
          统计日期：
          {`${moment(params.beginDate).format('YYYY-MM-DD')}~${moment(params.endDate).format(
            'YYYY-MM-DD',
          )}`}
        </div>
      </ComTable>
    </QCard>
  );
};
const mapStateToProps = ({ global, user }) => {
  return {
    dataModal: global.dataModal,
    currentUser: user.currentUser,
  };
};
export default connect(mapStateToProps)(List);
