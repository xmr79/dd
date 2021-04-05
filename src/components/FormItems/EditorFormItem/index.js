/**
 * 编辑器formItem组件
 * @param {*标签的文本} label

 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Input, Popover, Form, Cascader, Upload } from 'antd';
import Editor from './Editor';
const FormItem = props => {
  const {
    label,
    name,
    placeholder,
    extra,
    rules,
    form,
    required,
    contentStyle,
    dispatch,
    isMedia,
  } = props;

  return (
    <>
      <Form.Item
        label={label}
        name={name}
        extra={extra}
        rules={rules}
        validateTrigger={'onBlur'}
        required={required}
      >
        <Editor contentStyle={contentStyle} dispatch={dispatch} isMedia={isMedia} />
      </Form.Item>
    </>
  );
};
export default FormItem;
