/**
 * 带有长度统计formItem组件
 * @param {*标签的文本} label
 * @param {*字段名} name
 * @param {*占位符} placeholder
 * @param {*最小长度} min
 * @param {*最大长度} max
 * @param {*input框类型input、textArea} type
 * @param {*规则} rules
 * @param {*是否必填} required
 * @param {*必填提示} message
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Input, Popover, Form, Cascader, Upload } from 'antd';
import InputCom from './InputCom';
const FormItem = props => {
  const {
    label,
    name,
    placeholder,
    max,
    type,
    rules,
    required = true,
    min = 0,
    message,
    extra,
    wrapperCol,
    isTestSpace = false,
    extraBtn,
    form,
  } = props;
  const placeholderText = placeholder ? placeholder : `请输入${label}`;
  const rlueMessage = message ? message : placeholderText;

  const validator = (rule, value) => {
    const reg = /(^\s+)|(\s+$)|\s+/g;
    if (value && reg.test(value)) {
      return Promise.reject('不能含有空格');
    } else {
      return Promise.resolve();
    }
  };

  const testSpace = isTestSpace && {
    validator,
  };

  const nrules = rules
    ? rules
    : [
        { required: required, message: rlueMessage },
        { min, message: `最少${min}个字符` },
        { max, message: `最大${max}个字符` },
      ];
  return (
    <Form.Item
      form={form}
      label={label}
      name={name}
      extra={extra}
      rules={[...nrules, testSpace]}
      wrapperCol={wrapperCol}
    >
      <InputCom {...props} placeholder={placeholderText} />
    </Form.Item>
  );
};
export default FormItem;
