/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Input } from 'antd';
import styles from './index.less';
const { TextArea } = Input;
const InputCom = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    max,
    type = 'input',
    style,
    disabled,
    defaultLen = 0,
    prefix,
    extraBtn,
  } = props;
  const cvalue = value ? value.substring(0, max) : value;

  const onIptChange = ({ target: { value } }) => {
    if (onChange) {
      onChange(value);
    }
  };
  const suffix = (
    <span style={{ lineHeight: '20px' }}>
      {cvalue ? cvalue.length + defaultLen : !cvalue && defaultLen ? defaultLen : 0}/
      {!defaultLen ? max : 500}
    </span>
  );
  const params = {
    autoComplete: 'off',
    maxLength: max,
    placeholder,
    value,
    style,
    onChange: onIptChange,
    disabled,
  };
  return (
    <Row>
      <Col span={extraBtn ? 20 : 24}>
        {type === 'input' && <Input prefix={prefix} {...params} value={cvalue} suffix={suffix} />}
        {type === 'textArea' && (
          <div style={{ position: 'relative' }}>
            <TextArea {...params} rows={4} />
            <div className={styles.suffixttextarea}>{suffix}</div>
          </div>
        )}
      </Col>
      <Col span={extraBtn ? 4 : 0}>{extraBtn}</Col>
    </Row>
  );
});

export default InputCom;
