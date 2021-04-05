/**
 * Author: wjw
 * Date:
 * Description: 用户名验证
 * @param {prefix} string|ReactNode (前缀图标)
 * @param {label} string (标签的文本)
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Input, Popover, Form } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { numReg, letterReg } from '@/constants/reg';

// 4-10个字符
const hasLength = value => {
  return value.length >= 4 && value.length <= 10;
};

// 字母和数字

const hasLN = value => {
  return numReg.test(value) && letterReg.test(value);
};

const styles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

// components
const UserNameFormItem = forwardRef((props, ref) => {
  const { value = '', onChange, placeholder = '设置用户名', form, visible, prefix } = props;

  const onIptChange = ({ target: { value } }) => {
    onChange(value.replace(/\s+/g, ''));
  };
  const [isObj, setIsObj] = useState({
    count: false,
    letterNum: false,
  });

  useEffect(() => {
    const nobj = {
      count: hasLength(value),
      letterNum: hasLN(value),
    };
    setIsObj(nobj);
  }, [value]);
  const isTure = bool => {
    return (
      <div className="mr-5">
        {bool ? (
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
        ) : (
          <div
            style={{
              width: '14px',
              height: '14px',
              border: '1px solid #ccc',
              borderRadius: '100%',
            }}
          ></div>
        )}
      </div>
    );
  };

  const Content = props => {
    return (
      <div>
        <div style={styles}>{isTure(isObj.count)}4-10个字符</div>
        <div style={styles}>{isTure(isObj.letterNum)}字母和数字</div>
      </div>
    );
  };
  return (
    <Popover placement="right" content={<Content />} visible={visible}>
      <Input prefix={prefix} placeholder={placeholder} value={value} onChange={onIptChange} />
    </Popover>
  );
});

// main
const FormItem = props => {
  const { prefix, label, name, placeholder = '设置用户名' } = props;
  const [visible, setvisible] = useState(false);
  const check = (rule, value) => {
    if (!value || !(hasLength(value) && hasLN(value))) {
      setvisible(true);
      return Promise.reject('');
    } else {
      setvisible(false);
      return Promise.resolve();
    }
  };
  const validator = (rule, value) => {
    const reg = /(^\s+)|(\s+$)|\s+/g;
    if (value && reg.test(value)) {
      return Promise.reject('用户名不能含有空格');
    } else {
      return Promise.resolve();
    }
  };
  return (
    // <Form.Item required label={label} name={name} rules={[{ validator: check }]}>
    //   <UserNameFormItem prefix={prefix} visible={visible} />
    // </Form.Item>
    <Form.Item
      required
      label={label}
      name={name}
      rules={[
        { required: true, message: `${placeholder}` },
        { min: 1, message: `用户名限制1-10个字符` },
        { max: 10, message: `用户名限制1-10个字符` },
        {
          validator,
        },
      ]}
    >
      <Input placeholder={placeholder} prefix={prefix} />
    </Form.Item>
  );
};
export default FormItem;
