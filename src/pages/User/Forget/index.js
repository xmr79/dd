/**
 * Author: LLW
 * Date: 2020.4.14
 * Description: [注册页面]
 */
import React, { useState } from 'react';
import { connect, Link } from 'umi';
import { Form, Button, Input, Tabs, Checkbox } from 'antd';

import SendCode from '@/components/SendCode';
import PasswordFormItem from '@/components/FormItems/PasswordFormItem';
import PhoneFormItem from '@/components/FormItems/PhoneFormItem';
import UserNameFormItem from '@/components/FormItems/UserNameFormItem';
import loginless from '@/pages/User/Login/index.less';
import rstyles from '@/pages/User/Register/index.less';
import styles from '@/pages/User/userglobal.less';
import classNames from 'classnames';
import { IconFontConfig } from '@/common';
const Register = props => {
  const { dispatch, loading } = props;
  const [form] = Form.useForm();
  const { getFieldValue, validateFields, isFieldValidating } = form;

  const compareToFirstPassword = (rule, value) => {
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('您输入的两次密码不同!');
    } else {
      return Promise.resolve();
    }
  };
  const handleSubmit = val => {
    let payload = val;
    dispatch({
      type: 'user/forgetPass',
      payload,
    });
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>忘记密码</div>
        <Form form={form} onFinish={handleSubmit}>
          <PhoneFormItem name="mobile" prefix={<IconFontConfig type="icon-shouji" />} />
          <Form.Item name="code" rules={[{ required: true, message: '输入验证码' }]}>
            <div className={rstyles.sendcon}>
              <Input
                prefix={<IconFontConfig type="icon-yanzhengma" />}
                className="mr-10"
                placeholder="输入验证码"
              />
              <SendCode form={form} phoneName="mobile" type={1} />
            </div>
          </Form.Item>
          <PasswordFormItem prefix={<IconFontConfig type="icon-mima" />} />
          <Form.Item
            hasFeedback
            name="comfirmPassword"
            rules={[
              { required: true, message: '确认密码' },
              {
                validator: compareToFirstPassword,
              },
            ]}
          >
            <Input.Password
              prefix={<IconFontConfig type="icon-mima" />}
              autoComplete="off"
              visibilityToggle={false}
              placeholder="确认密码"
            />
          </Form.Item>
          <div className={styles.des}>
            <span>*</span>此页面仅供入驻企业及认证专家找回密码
          </div>
          <div className={styles.loginbtn}>
            <Button loading={loading} type="primary" htmlType="submit" block>
              确定
            </Button>
          </div>
          <Link to="/user/login">
            <Button type="link" block>
              前往登录
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['login/forgetPass'],
}))(Register);
