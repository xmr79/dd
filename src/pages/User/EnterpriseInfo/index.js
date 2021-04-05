/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form } from 'antd';
import FormItems from '@/pages/User/EnterpriseInfo/FormItems';
const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 7 } };
const EnterpriseInfo = props => {
  const {
    loading,
    rloading,
    location: {
      pathname,
      query: { isEdit, mobile, islogin },
    },
    resgisterVal,
    dispatch,
    verifyEchoDetail,
  } = props;
  useEffect(() => {
    if (islogin === '1') {
      dispatch({ type: 'user/fetchCurrent' });
    }
    if (isEdit === '1') {
      dispatch({
        type: 'user/getVerifyEchoDetail',
        payload: { mobile },
      });
    }
  }, []);
  useEffect(() => {
    if (verifyEchoDetail) {
      const { avatarUrl, businessLicense, category = [] } = verifyEchoDetail;
      const initialValues = {
        ...verifyEchoDetail,
        avatarUrl: avatarUrl ? [avatarUrl] : [],
        businessLicense: businessLicense ? [businessLicense] : [],
        categoryId: category.map(_ => _.id),
      };
      form.setFieldsValue(initialValues);
    }
  }, [verifyEchoDetail]);
  const [form] = Form.useForm();
  const handleSubmit = values => {
    const { avatarUrl, businessLicense } = values;
    const val = {
      ...resgisterVal,
      ...values,
      businessLicense: businessLicense[0],
      avatarUrl: avatarUrl[0],
      type: 'COMPANY',
    };
    if (isEdit === '1') {
      dispatch({
        type: 'user/updateVerifyDetail',
        payload: {
          ...val,
          mobile,
        },
      });
    } else {
      dispatch({
        type: 'user/register',
        payload: {
          ...val,
          stepNumber: 2,
        },
      });
    }
  };

  return (
    <>
      <Form
        form={form}
        {...formItemLayout}
        onFinish={handleSubmit}
        initialValues={{ companyType: 'ENTERPRISE' }}
      >
        <FormItems />
        <Form.Item wrapperCol={{ offset: 7, span: 7 }}>
          <Button
            style={{ width: '100%', margin: '20px 0' }}
            loading={isEdit === '1' ? rloading : loading}
            type="primary"
            htmlType="submit"
            block
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default connect(({ loading, user }) => {
  return {
    resgisterVal: user.resgisterVal,
    verifyEchoDetail: user.verifyEchoDetail,
    loading: loading.effects['user/register'],
    rloading: loading.effects['user/updateVerifyDetail'],
  };
})(EnterpriseInfo);
