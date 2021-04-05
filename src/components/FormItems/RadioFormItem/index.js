/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, Radio, Row, Col } from 'antd';

const Com = forwardRef((props, ref) => {
  const { value, onChange, list, extraButton, disabled } = props;
  const handle = e => {
    onChange(e.target.value);
  };
  return (
    <Row align="middle">
      <Col>
        <Radio.Group onChange={handle} value={value} disabled={disabled}>
          {list.map((item, index) => {
            return (
              <Radio key={index} value={item.value} disabled={item.isdis ? item.isdis : false}>
                {item.name}
              </Radio>
            );
          })}
        </Radio.Group>
      </Col>
      <Col>{extraButton}</Col>
    </Row>
  );
});

const RadioFormItem = props => {
  const { name, label, list = [], normalize, extraButton } = props;

  return (
    <div>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: true, message: '请选择' }]}
        normalize={normalize}
      >
        <Com {...props} />
      </Form.Item>
    </div>
  );
};
export default RadioFormItem;
