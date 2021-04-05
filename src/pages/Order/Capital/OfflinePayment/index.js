/**
 * Author: xh
 * Date: 2020/12/16
 * Description: 线下打款
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Tabs } from 'antd';
import Group from './Group';
import Bond from '@/pages/System/Bond/Record'
const { TabPane } = Tabs;
const Ordinary = props => {
  const {} = props;
  const [key, setKey] = useState('1');
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        onChange={key => {
          setKey(key);
        }}
      >
        <TabPane tab="团体活动" key="1"></TabPane>
        <TabPane tab="保证金" key="2"></TabPane>
      </Tabs>
      {key === '1' ? <Group /> : <Bond operation="offline" />}
    </>
  );
};
export default connect(({}) => {
  return {};
})(Ordinary);
