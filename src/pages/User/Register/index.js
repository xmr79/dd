/**
 * Author: LLW
 * Date: 2020.4.14
 * Description: [注册页面]
 */
import React, { useState } from 'react';
import { connect } from 'umi';
import { Form, Button, Input, Tabs, Checkbox } from 'antd';

import SendCode from '@/components/SendCode';
import PasswordFormItem from '@/components/FormItems/PasswordFormItem';
import PhoneFormItem from '@/components/FormItems/PhoneFormItem';
import UserNameFormItem from '@/components/FormItems/UserNameFormItem';
import loginless from '@/pages/User/Login/index.less';
import rstyles from '@/pages/User/Register/index.less';
import styles from '@/pages/User/userglobal.less';
import { Link } from 'umi';
import classNames from 'classnames';
import { IconFontConfig } from '@/common';
const userType = [
  {
    text: '企业注册',
    key: 'COMPANY',
  },
  {
    text: '专家注册',
    key: 'EXPERT',
  },
];
const Register = props => {
  const { dispatch, loading } = props;
  const [form] = Form.useForm();
  const { getFieldValue, validateFields, isFieldValidating } = form;
  const [current, setCurrent] = useState('COMPANY');
  const [isXy, setisXy] = useState(false);
  const compareToFirstPassword = (rule, value) => {
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('您输入的两次密码不同!');
    } else {
      return Promise.resolve();
    }
  };
  const handleSubmit = val => {
    let payload = {
      ...val,
      type: current,
      stepNumber: 1,
      confirmFlag: isXy ? 'Y' : 'N',
    };
    dispatch({
      type: 'user/register',
      payload,
    });
  };
  return (
    <>
      <div className={styles.main}>
        <div className={rstyles.tabs}>
          {userType.map((_, idx) => {
            return (
              <div
                className={classNames(rstyles.item, _.key === current ? rstyles.active : '')}
                key={idx}
                onClick={() => {
                  setCurrent(_.key);
                }}
              >
                {_.text}
              </div>
            );
          })}
        </div>
        <Form
          form={form}
          initialValues={{
            prefix: '86',
          }}
          onFinish={handleSubmit}
        >
          <PhoneFormItem name="mobile" prefix={<IconFontConfig type="icon-shouji" />} />
          <Form.Item name="code" rules={[{ required: true, message: '输入验证码' }]}>
            <div className={rstyles.sendcon}>
              <Input
                prefix={<IconFontConfig type="icon-yanzhengma" />}
                className="mr-10"
                placeholder="输入验证码"
              />
              <SendCode form={form} phoneName="mobile" type={0} />
            </div>
          </Form.Item>

          <UserNameFormItem name="username" prefix={<IconFontConfig type="icon-zhanghao" />} />
          <PasswordFormItem prefix={<IconFontConfig type="icon-mima" />} />
          <Form.Item
            // hasFeedback
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
          <Checkbox
            onChange={e => {
              setisXy(e.target.checked);
            }}
          >
            <span>
              我已阅读并同意
              <a
                target="_blank"
                href={`/other/cms?code=${
                  current === 'COMPANY' ? 'AGREEMENT_ORGAN' : 'AGREEMENT_EXPERT'
                }`}
              >
                《入驻协议》
              </a>
            </span>
          </Checkbox>
          <div className={styles.loginbtn}>
            <Button disabled={!isXy} loading={loading} type="primary" htmlType="submit" block>
              注册
            </Button>
          </div>
          <div>
            <Link to="/user/login">
              <Button type="link" block>
                已有账号？前往登录
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['user/register'],
}))(Register);
