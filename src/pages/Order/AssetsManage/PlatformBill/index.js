/**
 * Author: wjw
 * Date:2020
 * Description:营收统计
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Tabs, Popover } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import Month from './Month';
import Date from './Date';
import AuthBlock from '@/components/Auth/AuthBlock';
import { sponsorType } from '@/constants';
import { InfoCircleOutlined } from '@ant-design/icons';
// import { getCategoryNvqList } from '@/services/companyInfo';
const { TabPane } = Tabs;

const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;

  const [activeKey, setActiveKey] = useState('date');
  const handleActiveChange = key => {
    setActiveKey(key);
  };
  const handleDownFile = (fileName, r, type) => {
    const { statTime } = r;
    dispatch({
      type: 'revenue/mainExport',
      payload: {
        fileName,
        date: statTime,
        type,
      },
    });
  };
  const btns = (r, type, params) => {
    const { statDate } = r;
    return [
      {
        key: '2',
        authority: '',
        btnname: '下载数据',
        handleClick: () => {
          const { activitySponsor } = r;
          dispatch({
            type: 'platformBill/handledown',
            payload: {
              isMonth: type === 1 ? true : false,
              activitySponsor,
              statDate,
            },
          });
        },
      },
    ];
  };

  const getcolumns = (type, params) => {
    return [
      {
        title: '时间',
        dataIndex: 'statDate',
        valueType: 'dateTime',
        format: type === 1 ? 'YYYY-MM' : 'YYYY-MM-DD',
      },
      {
        title: '活动发起方',
        dataIndex: 'activitySponsor',
        valueType: 'statusdata',
        valueEnum: sponsorType,
        styleType: 'none',
      },
      {
        title: '支付（元）',
        dataIndex: 'payAmount',
      },
      {
        title: '退款（元）',
        dataIndex: 'refundAmount',
      },
      {
        title: '收入（元）',
        dataIndex: 'incomeAmount',
      },
      {
        title: '操作',
        valueType: 'action',
        btns: r => {
          return btns(r, type, params);
        },
      },
    ];
  };
  const extra = (
    <Popover
      content={
        <div>
          <p>平台账单统计待评价+已完成+已过期+已退款状态的订单；</p>
          <p>（1）平台</p>
          <p>支付=平台账号创建活动支付金额之和；</p>
          <p>退款=平台账号创建活动退款金额之和；</p>
          <p>收入=支付金额-退款金额；</p>
          <p>（2）入驻企业</p>
          <p>支付=支付金额之和；</p>
          <p>退款=退款金额之和；</p>
          <p>收入=∑[（订单支付金额-订单退款金额）*（1-佣金比例）]；</p>
          {/* <p>（3）认证专家</p>
          <p>支付=支付金额之和；</p>
          <p>退款=退款金额之和；</p>
          <p>收入=支付金额-退款金额；</p> */}
        </div>
      }
      title="计算规则"
    >
      <InfoCircleOutlined className="ml-10" />
    </Popover>
  );
  return (
    <QCard title="平台账单" des="按照活动发起方角色生成账单" extra={extra}>
      <Tabs activeKey={activeKey} onChange={handleActiveChange}>
        <TabPane tab="日账单" key="date">
          <Date
            getcolumns={params => {
              return getcolumns(0, params);
            }}
          />
        </TabPane>
        <TabPane tab="月账单" key="month">
          <Month
            getcolumns={() => {
              return getcolumns(1);
            }}
          />
        </TabPane>
      </Tabs>
    </QCard>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
