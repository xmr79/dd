/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Checkbox } from 'antd';
const PLATFORM = [
  { label: '支付宝', value: 'ZFB' },
  { label: '微信', value: 'WX' },
];
const PlatformCheckbos = props => {
  const { value, handle } = props;
  const onChange1 = val => {
    const { checked, value } = val.target;

    let arr = props.value;
    if (checked) {
      arr.push(value);
    } else {
      if (arr.length > 1) {
        arr = arr.filter(_ => value !== _);
      } else {
        const sy = PLATFORM.filter(_ => _.value !== value);

        arr = sy.map(_ => _.value);
      }
    }
    handle(arr);
  };
  return (
    <>
      {PLATFORM.map((_, idx) => {
        return (
          <Checkbox
            key={idx}
            checked={value.includes(_.value)}
            value={_.value}
            onChange={onChange1}
          >
            {_.label}
          </Checkbox>
        );
      })}
    </>
  );
};
export default connect(({}) => {
  return {};
})(PlatformCheckbos);
