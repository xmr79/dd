/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, Input, DatePicker } from 'antd';
import { numLimit } from '@/utils/utils';
import moment from 'moment';
const formItemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 12 } };
const Setting = props => {
  const { dispatch, loading, bondConfig } = props;
  const [form] = Form.useForm();
  const { id, earnestMoney, effectiveTime } = bondConfig;
  useEffect(() => {
    dispatch({ type: 'bond/getConfig' });
  }, []);

  useEffect(() => {
    if (JSON.stringify(bondConfig) !== '{}') {
      form.setFieldsValue({
        earnestMoney,
        effectiveTime: moment(effectiveTime),
      });
    }
  }, [bondConfig]);
  const validator = (rule, value) => {
    if (value && numLimit(value, 0, 10000, 'decimal', 2)) {
      return Promise.reject('请输入0~10000元之间的整数');
    } else {
      return Promise.resolve();
    }
  };
  const handleSubmit = val => {
    const { effectiveTime } = val;
    const payload = {
      id,
      ...val,
      effectiveTime: effectiveTime.valueOf(),
    };
    dispatch({ type: 'bond/updateConfig', payload });
  };
  return (
    <>
      <Form form={form} onFinish={handleSubmit} {...formItemLayout}>
        <Form.Item
          name="earnestMoney"
          label="保证金金额"
          rules={[
            {
              required: true,
              message: '请输入0~10000元之间的整数',
            },
            { validator },
          ]}
        >
          <Input suffix="元" placeholder="请输入0~10000元之间的整数" />
        </Form.Item>
        <Form.Item
          name="effectiveTime"
          label="生效时间"
          rules={[
            {
              required: true,
              message: '请设置生效时间',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button className="ml-10" type="primary" loading={loading} htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default connect(({ loading, bond }) => {
  return { loading: loading.effects['bond/updateConfig'], bondConfig: bond.bondConfig };
})(Setting);
