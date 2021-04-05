/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Tabs } from 'antd';
import Setting from './Setting';
import Record from './Record';
const { TabPane } = Tabs;
const Bond = props => {
  const {
    location: {
      query: { key = '1' },
    },
  } = props;
  const callback = e => {
    history.push(`/system/bond?key=${e}`);
  };
  return (
    <>
      <Tabs activeKey={key} onChange={callback}>
        <TabPane tab="规则设置" key="1">
          <Setting />
        </TabPane>
        <TabPane tab="支付记录" key="2">
          <Record />
        </TabPane>
      </Tabs>
    </>
  );
};
export default connect(({}) => {
  return {};
})(Bond);
