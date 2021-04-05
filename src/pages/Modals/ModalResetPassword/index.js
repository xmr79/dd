/**
 * Author: wjw
 * Date: 2020.4.23
 * Description: '修改账号密码'
 */
import React, { PureComponent, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };

const ModalEditPassWord = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {
        record = {
          id: '',
        },
      },
    },
    dispatch,
  } = props;
  const { id, username } = record;
  const [form] = Form.useForm();
  const { getFieldValue, getFieldDecorat, validateFields, submit } = form;
  useEffect(() => {
    if (modalShow && modalType === 'EDITOR_RESET_PWD') {
      form.resetFields();
    }
  }, [modalShow]);
  const handleOk = () => {
    validateFields()
      .then(fieldsValue => {
        dispatch({
          type: 'user/resetPassword',
          payload: {
            username,
            ...fieldsValue,
          },
        });
      })
      .catch(errorInfo => {});
  };

  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: '',
        modalShow: false,
        modalData: {},
      },
    };

    dispatch({ type: 'global/changeState', payload });
  };
  // 密码确认
  const compareToFirstPassword = (rule, value) => {
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('您输入的两次密码不同!');
    } else {
      return Promise.resolve();
    }
  };

  return (
    <Modal
      forceRender
      title={'重置密码'}
      width={700}
      visible={modalType === 'EDITOR_RESET_PWD' && modalShow}
      onCancel={handleCancel}
      onOk={handleOk}
      destroyOnClose
      okText="确认"
      cancelText="取消"
    >
      <Form form={form} layout="horizontal">
        {/* <FormItem
          {...formItemLayout}
          label="原密码:"
          name="oldPassword"
          rules={[{ required: true, message: '请输入原密码' }]}
        >
          <Input.Password placeholder="请输入原密码" />
        </FormItem> */}
        <FormItem
          {...formItemLayout}
          label="新密码:"
          name="password"
          rules={[
            { required: true, message: '新密码' },
            {
              pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&@*]{6,16}$/,
              message: '密码至少包含字母、数字、特殊符号的两种组合,限制6~16个字符~',
            },
          ]}
        >
          <Input.Password placeholder="新密码" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认新密码："
          name="comfirmPassword"
          rules={[
            { required: true, message: '请确认密码' },
            {
              validator: compareToFirstPassword,
            },
          ]}
        >
          <Input.Password placeholder="请确认密码" />
        </FormItem>
      </Form>
    </Modal>
  );
};
export default connect()(ModalEditPassWord);
