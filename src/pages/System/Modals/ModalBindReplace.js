import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Alert } from 'antd';
import UserFlag from '@/components/UserFlag';
import { userTag } from '@/constants';
const { Option } = Select;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
const ModalBindAdd = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dispatch,
    handleAddFlag,
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (modalShow && modalType === 'MODAL_BIND_REOLACE') {
      form.resetFields();
    }
  }, [modalShow]);
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
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        handleAddFlag(values);
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };

  const validator = (rule, value) => {
    if (!value) {
      return Promise.reject('请添加有效的用户标识!');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      title="更换管理员"
      maskClosable={false}
      visible={modalType === 'MODAL_BIND_REOLACE' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form} {...formItemLayout}>
        <Form.Item
          label="用户标识"
          name="flag"
          required
          rules={[
            {
              validator,
            },
          ]}
        >
          <UserFlag />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalBindAdd);
