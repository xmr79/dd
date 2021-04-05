/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Radio, Row, Col, DatePicker, message } from 'antd';
import { enumRecentRechargeTime } from '@/constants';
import moment from 'moment';
import { arrayToObj, getTimeType, getDaysBetween } from '@/utils/utils';
import styles from './index.less';
const { RangePicker } = DatePicker;
const mapRecentRechargeTime = arrayToObj(enumRecentRechargeTime, 'key');

const TabTime = props => {
  const { timeTypes = ['7d', '15d', '30d'], handleChange } = props;

  const Times = enumRecentRechargeTime.filter(_ => timeTypes.includes(_.key));
  const def = [
    moment(mapRecentRechargeTime['7d'].value[0]),
    moment(mapRecentRechargeTime['7d'].value[1]),
  ];

  const [value, setValue] = useState(def);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (value.length >= 2) {
      handleChange(value);
      const tab = value ? getTimeType(value, enumRecentRechargeTime, 'day') : null;
      setCurrent(tab);
    }
  }, [value]);

  const handleChangeTime = e => {
    const times = [
      moment(mapRecentRechargeTime[e.target.value].value[0]),
      moment(mapRecentRechargeTime[e.target.value].value[1]),
    ];
    setValue(times);
  };

  const onChange = val => {
    if (val[1].valueOf() - val[0].valueOf() > 86400000 * 60) {
      message.error('时间跨度范围不能超过60天');
      return false;
    }
    setValue(val);
  };

  return (
    <div className={styles.tabcon}>
      <Radio.Group value={current} onChange={handleChangeTime}>
        {Times.map((_, idx) => {
          return (
            <Radio.Button key={idx} value={_.key}>
              {_.name}
            </Radio.Button>
          );
        })}
      </Radio.Group>

      <RangePicker value={value} style={{ width: 280 }} onChange={onChange} allowClear={false} />
    </div>
  );
};
export default connect(({}) => {
  return {};
})(TabTime);
