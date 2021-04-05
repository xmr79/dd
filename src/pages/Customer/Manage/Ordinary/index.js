/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Tabs } from 'antd';
import Manage from './Manage';
import Blacklist from './Blacklist';
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
        <TabPane tab="用户管理" key="1"></TabPane>
        <TabPane tab="黑名单管理" key="2"></TabPane>
      </Tabs>
      {key === '1' ? <Manage /> : <Blacklist />}
    </>
  );
};
export default connect(({}) => {
  return {};
})(Ordinary);
