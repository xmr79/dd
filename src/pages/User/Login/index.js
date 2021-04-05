/**
 * Author: wjw
 * Date:2020.2.18
 * Description:login
 */
import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Checkbox, Row } from 'antd';
import loginless from './index.less';
import { Link, connect, history } from 'umi';
import { getImgUrl } from '@/utils/utils';
import styles from '@/pages/User/userglobal.less';
import { IconFontConfig } from '@/common';
const pwd = getImgUrl('pwd.png');
const user = getImgUrl('user.png');
const Loginform = props => {
  const { loading, dispatch } = props;
  const [autoLogin, setAutoLogin] = useState(true);
  const handleSubmit = values => {
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}>登录</div>
      <Form onFinish={handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入手机号/账号!' }]}>
          <Input prefix={<IconFontConfig type="icon-shouji" />} placeholder="请输入手机号/账号" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password
            prefix={<IconFontConfig type="icon-mima" />}
            visibilityToggle={false}
            placeholder="请输入密码"
          />
        </Form.Item>

        <div className={styles.loginbtn}>
          <Button loading={loading} type="primary" htmlType="submit" block>
            登录
          </Button>
        </div>
        <Row justify="space-between" align="middle">
          <div
            className={styles.des}
            onClick={() => {
              history.push('/user/forget');
            }}
            style={{ cursor: 'pointer' }}
          >
            忘记密码？
          </div>
          <div >
            <Link to="/user/register">
              <Button type="link" style={{paddingRight: 0}}>前往注册</Button>
            </Link>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  login,
  loading: loading.effects['login/login'],
}))(Loginform);
