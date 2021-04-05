/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button } from 'antd';
import Operate from '@/pages/System/PersonalCenter/Operate';
const PersonSet = props => {
  const {} = props;
  return (
    <>
      <Operate />
    </>
  );
};
export default connect(({}) => {
  return {};
})(PersonSet);
