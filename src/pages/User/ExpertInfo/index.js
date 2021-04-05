/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form } from 'antd';
import FormItems from '@/pages/User/ExpertInfo/FormItems';
const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 7 } };
const ExpertInfo = props => {
  const {
    loading,
    location: {
      pathname,
      query: { isEdit, mobile, islogin },
    },
    resgisterVal,
    dispatch,
    verifyEchoDetail,
  } = props;

  const [form] = Form.useForm();
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
      const { avatarUrl, category = [], cardFrontUrl, cardReverseUrl } = verifyEchoDetail;
      const initialValues = {
        ...verifyEchoDetail,
        avatarUrl: avatarUrl ? [avatarUrl] : [],
        categoryId: category.map(_ => _.id),
        files: {
          cardFrontUrl,
          cardReverseUrl,
        },
      };
      form.setFieldsValue(initialValues);
    }
  }, [verifyEchoDetail]);
  const handleSubmit = values => {
    const { avatarUrl, files } = values;
    const val = {
      ...resgisterVal,
      ...values,
      ...files,
      avatarUrl: avatarUrl[0],
      type: 'EXPERT',
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
      <Form form={form} {...formItemLayout} onFinish={handleSubmit}>
        <FormItems form={form} />
        <Form.Item wrapperCol={{ offset: 7, span: 7 }}>
          <Button
            style={{ width: '100%', margin: '20px 0' }}
            loading={loading}
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
  };
})(ExpertInfo);
