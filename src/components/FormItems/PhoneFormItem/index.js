/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Icon, Row, Col, Input, Popover, Form, Select } from 'antd';
import { isPhone } from '@/utils/utils';
const { Option } = Select;
const FormItem = props => {
  const { label = null, name, isPrefixSelector = false, cd, hasFeedback = true, prefix } = props;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );
  const validateTocheckMobile = (rule, value) => {
    if (value) {
      if (!isPhone(value)) {
        return Promise.reject('请输入正确手机格式');
        return;
      } else {
        if (cd) {
          cd();
        } else {
          return Promise.resolve();
        }
      }
    } else {
      return Promise.resolve();
    }
  };

  return (
    <Form.Item
      label={label}
      // hasFeedback={hasFeedback}
      name={name}
      rules={[
        {
          required: true,
          message: '输入手机号',
        },
        {
          validator: validateTocheckMobile,
        },
      ]}
      validateTrigger="onBlur"
    >
      <Input
        prefix={prefix}
        addonBefore={isPrefixSelector ? prefixSelector : null}
        style={{ width: '100%' }}
        placeholder="11位手机号"
      />
    </Form.Item>
  );
};
export default FormItem;
