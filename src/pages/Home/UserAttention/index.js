/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Button, Card, Checkbox } from 'antd';
import { connect, history } from 'umi';
import moment from 'moment';
import BondAlert from '@/components/BondAlert';
import TabTime from '@/components/TabTime';
import { getImgUrl } from '@/utils/utils';
import QCard from '@/components/QCard';
import HomeItemCard from '@/components/HomeItemCard';
import DateLine from '@/components/Chart/DateLine/index.js';
import PlatformCheckbox from '@/pages/Home/components/PlatformCheckbox';
const UserAttention = props => {
  const {
    userAttentionData,
    dispatch,
    currentUser: { userType },
  } = props;

  const [params, setParams] = useState({ platform: ['ZFB', 'WX'] });

  useEffect(() => {
    const { platform } = params;
    const payload = {
      ...params,
      platform: platform.length === 2 ? undefined : platform.join(','),
    };
    dispatch({ type: 'home/indexUserAttentionStat', payload });
  }, [params]);

  const handleChange = val => {
    setParams({
      ...params,
      startTime: val[0].startOf('day').valueOf(),
      endTime: val[1].endOf('day').valueOf(),
    });
  };
  const onChange1 = val => {
    setParams({
      ...params,
      platform: val,
    });
  };
  const text = userType === 'EXPERT' ? '关注' : '收藏';
  return (
    <>
      <QCard
        className="mt-20"
        icon={getImgUrl('gzqs.png')}
        title={`用户${text}趋势`}
        extra={<TabTime handleChange={handleChange} />}
      >
        <div style={{ padding: '35px 0 0 35px' }}>
          <PlatformCheckbox value={params.platform} handle={onChange1} />
        </div>
        <DateLine
          dataCost={userAttentionData}
          x={{ key: 'statTime', text: '日期' }}
          y={[
            { key: 'newNum', text: `新增${text}数` },
            { key: 'totalNum', text: `累计${text}数` },
          ]}
          startTime={params.startTime}
          endTime={params.endTime}
        />
      </QCard>
    </>
  );
};
export default connect(({ home, user }) => {
  return { ...home, currentUser: user.currentUser };
})(UserAttention);
