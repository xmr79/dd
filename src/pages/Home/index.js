import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Button, Card, Checkbox } from 'antd';
import { connect, history, Link } from 'umi';
import moment from 'moment';
import BondAlert from '@/components/BondAlert';
import TabTime from '@/components/TabTime';
import { getImgUrl } from '@/utils/utils';
import QCard from '@/components/QCard';
import HomeItemCard from '@/components/HomeItemCard';
import styles from './index.less';
import DateLine from '@/components/Chart/DateLine/index.js';
import UserStat from './UserStat';
import Interaction from './Interaction';
import UserAttention from './UserAttention';

const Home = props => {
  const { dispatch, indexPendingInfo, orderInfo, currentUser } = props;
  const { userType } = currentUser;
  const handleChange = val => {
    // console.log(val);
  };
  // getImgUrl('daichuli.png')
  useEffect(() => {
    dispatch({ type: 'home/getIndexPending' });
    dispatch({ type: 'home/activityOrderIndexStat' });
  }, []);
  const {
    activityNum = 0,
    companyNum = 0,
    contentNum = 0,
    expertNum = 0,
    recommendNum = 0,
  } = indexPendingInfo;
  const {
    activityCount = 0,
    yesterdayActivityCount = 0,
    orderCount = 0,
    yesterdayOrderCount = 0,
    orderUserCount = 0,
    yesterdayOrderUserCount = 0,
    payment = 0,
    yesterdayPayment = 0,
    usedUserCount = 0,
    yesterdayUsedUserCount = 0,
  } = orderInfo;
  const waitList = [
    {
      name: '活动',
      count: activityNum,
      icon: getImgUrl('hd.png'),
      bgcolor: 'rgba(63, 186, 171, 0.03)',
      url: '/experience/activity/audit',
    },
    {
      name: '文章',
      count: contentNum,
      icon: getImgUrl('content.png'),
      bgcolor: 'rgba(63, 186, 171, 0.03)',
      url: '/experience/content/audit',
    },
    {
      name: '入驻企业',
      count: companyNum,
      icon: getImgUrl('qiye.png'),
      bgcolor: 'rgba(222, 186, 77, 0.06)',
      url: '/customer/audit/enterpriseAudit',
    },
    {
      name: '认证专家',
      count: expertNum,
      icon: getImgUrl('zhuanjia.png'),
      bgcolor: 'rgba(222, 186, 77, 0.06)',
      url: '/customer/audit/expertAudit',
    },
    {
      name: '用户推荐',
      count: recommendNum,
      icon: getImgUrl('tujian.png'),
      bgcolor: 'rgba(98, 148, 253, 0.04)',
      url: '/customer/recommend',
    },
  ];

  const dataList = [
    {
      name: '支付金额',
      count: payment,
      icon: getImgUrl('zfje.png'),
      des: `昨日 ${yesterdayPayment}元`,
      url: '/order/query/list?day=0',
    },
    userType === 'SYSTEM' && {
      name: '活动预约数',
      count: activityCount,
      icon: getImgUrl('hdyy.png'),
      des: `昨日 ${yesterdayActivityCount}`,
      url: '/order/query/list?day=0',
    },
    {
      name: '订单总数',
      count: orderCount,
      icon: getImgUrl('ordernum.png'),
      des: `昨日 ${yesterdayOrderCount}`,
      url: '/order/query/list?day=0',
    },
    {
      name: '下单人数',
      count: orderUserCount,
      icon: getImgUrl('xdnum.png'),
      des: `昨日 ${yesterdayOrderUserCount}`,
      url: '/order/query/list?day=0',
    },
    {
      name: '核销人数',
      count: usedUserCount,
      icon: getImgUrl('hxnum.png'),
      des: `昨日 ${yesterdayUsedUserCount}`,
    },
  ];

  const arr = [
    { label: '支付宝', value: 'ZFB' },
    { label: '微信', value: 'WX' },
  ];
  const onChange1 = () => {};
  return (
    <>
      <BondAlert />
      <div>
        {/* <TabTime handleChange={handleChange} /> */}
        {userType === 'SYSTEM' && (
          <QCard icon={getImgUrl('daichuli.png')} title="待处理">
            <div className={styles.row}>
              {waitList.map((_, idx) => {
                return _ && <HomeItemCard key={idx} {..._} />;
              })}
            </div>
          </QCard>
        )}
        {userType !== 'EXPERT' && (
          <QCard className="mt-20" icon={getImgUrl('ssshuju.png')} title="实时数据">
            <div className={styles.row}>
              {dataList.map((_, idx) => {
                return _ && <HomeItemCard key={idx} {..._} />;
              })}
            </div>
          </QCard>
        )}

        {userType === 'SYSTEM' ? <UserStat /> : <UserAttention />}

        <Interaction />

        {/* <QCard
          className="mt-20"
          icon={getImgUrl('hdqs.png')}
          title="互动趋势"
          extra={<TabTime handleChange={handleChange} />}
        >
          <Checkbox.Group style={{ padding: '35px 0 0 35px' }} options={arr} onChange={onChange1} />
          <DateLine
            dataCost={[
              { statDate: 1596729600000, a: 22, b: 100, c: 120 },
              { statDate: 1597248000000, a: 222, b: 150, c: 39 },
            ]}
            x={{ key: 'statDate', text: '日期11' }}
            y={[
              { key: 'a', text: '交易金额' },
              { key: 'b', text: '交易金额1' },
              { key: 'c', text: '交易金额2' },
            ]}
            color={['#3D7FFF', '#52CCA3', '#DEBA4D']}
          />
        </QCard> */}
      </div>
    </>
  );
};
const mapStateToProps = ({ home, user }) => {
  return {
    ...home,
    currentUser: user.currentUser,
  };
};
export default connect(mapStateToProps)(Home);
