/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Input, Popover, Form } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
const hasLength = value => {
  return value.length >= 6 && value.length <= 16;
};
const hasletter = value => {
  for (var i in value) {
    var asc = value.charCodeAt(i);
    if ((asc >= 65 && asc <= 90) || (asc >= 97 && asc <= 122)) {
      return true;
    }
  }
  return false;
};
const hasnum = value => {
  var str = value;
  var reg = new RegExp(/\d+/gi);
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
};
const PasswordFormItem = forwardRef((props, ref) => {
  const {
    value = '',
    onChange,
    placeholder = '6 - 16位密码，包含字母和数字',
    form,
    visible,
    prefix,
  } = props;

  const onIptChange = ({ target: { value } }) => {
    onChange(value);
  };
  const [isObj, setIsObj] = useState({
    count: false,
    letter: false,
    num: false,
  });

  useEffect(() => {
    const nobj = {
      count: hasLength(value),
      letter: hasletter(value),
      num: hasnum(value),
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
  const styles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  };
  const Content = props => {
    return (
      <div>
        <div style={styles}>
          {isTure(isObj.count)}输入6 - 16 位字符，特殊字符包括下划线，@，#等等
        </div>
        <div style={styles}>{isTure(isObj.letter)}包含字母</div>
        <div style={styles}>{isTure(isObj.num)}包含数字</div>
      </div>
    );
  };
  return (
    <Popover placement="right" content={<Content />} visible={visible}>
      <Input.Password
        prefix={prefix}
        autoComplete="new-password"
        placeholder={placeholder}
        value={value}
        onChange={onIptChange}
        visibilityToggle={false}
      />
    </Popover>
  );
});
const FormItem = props => {
  const { prefix, label } = props;
  const [visible, setvisible] = useState(false);
  const checkpassword = (rule, value) => {
    if (!value || !(hasLength(value) && hasletter(value) && hasnum(value))) {
      setvisible(true);
      return Promise.reject('');
    } else {
      setvisible(false);
      return Promise.resolve();
    }
  };
  return (
    <Form.Item required label={label} name="password" rules={[{ validator: checkpassword }]}>
      <PasswordFormItem prefix={prefix} visible={visible} />
    </Form.Item>
  );
};
export default FormItem;
