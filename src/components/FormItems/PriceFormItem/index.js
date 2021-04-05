/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, Input } from 'antd';
import { moneyReg } from '@/constants/reg';
const PriceFormItem = props => {
  const {
    label,
    name,
    min = 0,
    max = 10000,
    required = true,
    placeholder,
    width = '100%',
    noStyle = false,
  } = props;
  const validator = (rule, value) => {
    if (value && !moneyReg.test(value)) {
      return Promise.reject(`请输入正确的金额`);
    } else if (value - 0 < min || value - 0 > max) {
      return Promise.reject(`限制${min}-${max}元`);
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        { required: required, message: placeholder ? placeholder : `请输入${label}` },
        {
          validator,
        },
      ]}
      noStyle={noStyle}
    >
      <Input
        placeholder={placeholder ? placeholder : `请输入${label}，限制${min}-${max}元`}
        suffix="元"
        style={{ width }}
      />
    </Form.Item>
  );
};
export default connect(({}) => {
  return {};
})(PriceFormItem);
