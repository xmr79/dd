import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
const ModalRemark = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { id, remark, avatarUrl, nickName },
    },
    dispatch,
    handleRemark,
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (modalShow && modalType === 'ADD_REMARK') {
      form.resetFields();
      if (remark) {
        form.setFieldsValue({
          remark,
        });
      }
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
        handleRemark({ id, nickName, avatarUrl, ...values });
      })
      .catch(errorInfo => {});
  };
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
  };
  return (
    <Modal
      forceRender
      title="备注"
      maskClosable={false}
      visible={modalType === 'ADD_REMARK' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
      okText="确认"
      cancelText="取消"
    >
      <Form form={form} {...layout}>
        <Form.Item label="备注" name="remark" rules={[{ required: true, message: '请填写备注' }]}>
          <InputFormItem max={50} type="textArea" placeholder="请填写备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global, globaldata }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalRemark);
