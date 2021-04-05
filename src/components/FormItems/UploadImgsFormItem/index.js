/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form } from 'antd';
import Item from './Item';
const UploadImgsFormItem = props => {
  const { name, label, extra, children, disabled, required, max, placeholder, dispatch } = props;

  const validator = (rule, value = []) => {
    if (required && value.length <= 0) {
      return Promise.reject(placeholder ? placeholder : `请上传${label}!`);
    } else {
      return Promise.resolve();
    }
  };
  return (
    <>
      <Form.Item
        required={required}
        label={label}
        extra={extra}
        name={name}
        disabled={disabled}
        rules={[
          {
            validator,
          },
        ]}
      >
        <Item {...props} dispatch={dispatch}>
          {children}
        </Item>
      </Form.Item>
    </>
  );
};
export default connect(({}) => {
  return {};
})(UploadImgsFormItem);
