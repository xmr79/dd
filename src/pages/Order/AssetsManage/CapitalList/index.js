/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Col, Row } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { payLogList } from '@/services/order';
import {
  tradeType,
  ORDER_PAYTYPE,
  IncomeExpenditureType,
  enumRecentRechargeTime,
  ACTIVITY_TYPE,
} from '@/constants';
import UserInfo from '@/components/UserInfo';
import AuthBlock from '@/components/Auth/AuthBlock';
import { arrayToObj } from '@/utils/utils';
import moment from 'moment';
const mapRecentRechargeTime = arrayToObj(enumRecentRechargeTime, 'key');
const mapACTIVITY_TYPE = arrayToObj(ACTIVITY_TYPE, 'key');

const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const columns = [
    {
      title: '交易时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '交易单号',
      dataIndex: 'orderId',
    },
    {
      title: '支付流水号',
      dataIndex: 'tradeNo',
    },

    {
      title: '交易类型',
      dataIndex: 'tradeType',
      valueType: 'statusdata',
      valueEnum: tradeType,
      styleType: 'none',
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'statusdata',
      valueEnum: ORDER_PAYTYPE,
      styleType: 'none',
    },

    {
      title: '收支类型',
      dataIndex: 'payLogType',
      valueType: 'statusdata',
      valueEnum: IncomeExpenditureType,
      styleType: 'none',
    },
    {
      title: '金额（元）',
      dataIndex: 'amount',
    },
    {
      title: '付款人',
      dataIndex: 'payUserNick',
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
      title: '备注',
      dataIndex: 'remark',
      render: (t, r) => {
        return `${mapACTIVITY_TYPE[r.activityType].value}:${t}`;
      },
    },
  ];

  const searchColums = [
    {
      name: '交易时间',
      dataname: {
        time: 'time',
        bTime: 'createTimeBegin',
        eTime: 'createTimeEnd',
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
      },
      type: 'times',
      initval: {
        tabtype: '30d',
        time: [moment(new Date()).add(-6, 'days'), moment(new Date()).add(0, 'days')],
        createTimeBegin: moment(new Date())
          .add(-6, 'days')
          .startOf('day')
          .valueOf(),
        createTimeEnd: moment(new Date())
          .add(0, 'days')
          .endOf('day')
          .valueOf(),
      },
    },
    {
      name: '交易单号',
      dataname: 'orderId',
      type: 'normal',
      placeholder: '请输入交易单号',
    },
    {
      name: '支付流水号',
      dataname: 'tradeNo',
      type: 'normal',
      placeholder: '请输入支付流水号',
    },

    {
      name: '交易类型',
      dataname: 'tradeType',
      type: 'status',
      status: tradeType,
    },

    {
      name: '支付方式',
      dataname: 'payType',
      type: 'status',
      status: ORDER_PAYTYPE,
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
  const [params, setParams] = useState({});
  const handleDown = () => {
    dispatch({
      type: 'capitalList/handledown',
      payload: {
        ...params,
        // page: undefined,
        // size: undefined,
      },
    });
  };

  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => {
          setParams(params);
          return payLogList(params);
        }}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button
              className="mt-20"
              type="primary"
              onClick={() => {
                handleDown();
              }}
            >
              下载数据
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
