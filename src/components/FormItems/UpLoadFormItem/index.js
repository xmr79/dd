/**
 * 上传图片组件
 * @param {*标签的文本} label
 * @param {*标签的字段名} name
 * @param {*额外的提示信息} extra
 * @param {*插槽} children
 * @param {*value是否含有上传文件的当前状态{status:'done',url:'',response:''}} isError
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Icon, Row, Col, Input, Popover, Form, Cascader, Upload } from 'antd';
import UploadItem from './UploadItem';
const FormItem = props => {
  const { name, label, extra, children, isError } = props;
  const validator = (rule, value) => {
    if (value && value.some(i => i.status === 'error')) {
      return Promise.reject('您有文件不符合要求，请删除!');
    } else if (value && value.some(i => i.status === 'uploading' || i === 'uploading')) {
      return Promise.reject('您有文件正在上传!');
    } else {
      return Promise.resolve();
    }
  };

  let rules = [
    { required: true, message: '请上传文件' },
    {
      validator: validator,
    },
  ];

  return (
    <Form.Item label={label} extra={extra} name={name} rules={rules}>
      <UploadItem {...props}>{children}</UploadItem>
    </Form.Item>
  );
};
export default FormItem;
