/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect, history } from 'umi';
import { Button, Divider, Modal, Col, Row, Popover } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { commissionDetailList } from '@/services/order';
import { tradeType, payType, enumRecentRechargeTime } from '@/constants';
import UserInfo from '@/components/UserInfo';
import AuthBlock from '@/components/Auth/AuthBlock';
import { arrayToObj } from '@/utils/utils';
import moment from 'moment';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const mapRecentRechargeTime = arrayToObj(enumRecentRechargeTime, 'key');
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { statDate } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '查看详情',
        handleClick: () => {
          history.push(`/order/assetsManage/commission/detail?statDate=${statDate}`);
        },
      },
    ];
  };
  const columns = [
    {
      title: '时间',
      dataIndex: 'statDate',
      valueType: 'dateTime',
      format: 'YYYY-MM-DD',
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
      title: '佣金（元）',
      dataIndex: 'commission',
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
      type: 'commission/handledown',
      payload: {
        ...params,
      },
    });
  };
  const extra = (
    <Popover
      content={
        <div>
          <p>佣金明细统计待评价+已完成+已过期+已退款状态的订单；</p>
          <p>支付=佣金比例大于0的企业账号创建的活动支付金额之和；</p>
          <p>退款=佣金比例大于0企业账号创建的活动退款金额之和；</p>
          <p>佣金=∑（订单支付金额-订单退款金额）*佣金比例；</p>
        </div>
      }
      title="计算规则"
    >
      <InfoCircleOutlined className="ml-10" />
    </Popover>
  );
  return (
    <QCard title="佣金明细" des="平台按照比例从企业的交易订单中抽佣" extra={extra}>
      <ComTable
        rowKey="statDate"
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => {
          setParams(params);
          return commissionDetailList(params);
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
    </QCard>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
