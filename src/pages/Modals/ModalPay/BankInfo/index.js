/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button } from 'antd';
import InfoShow from '@/components/InfoShow';
const BankInfo = props => {
  const {} = props;
  const lists = [
    {
      label: '收款单位',
      children: '杭州共享品牌管理有限公司',
    },
    {
      label: '银行账号',
      children: '571910623210801',
    },
    {
      label: '开户银行',
      children: '招商银行解放支行',
    },
    {
      label: '公司地址',
      children: '杭州市上城区白云路16号102室-1',
    },
    {
      label: '公司电话',
      children: '0571-85100197',
    },
  ];
  return (
    <>
      <InfoShow lists={lists} />
    </>
  );
};
export default connect(({}) => {
  return {};
})(BankInfo);
