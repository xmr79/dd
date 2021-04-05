import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
const ModalInvoice = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { id },
    },
    dispatch,
    handleRemark,
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (modalShow && modalType === 'NO_PAYMENT') {
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
        handleRemark({ invoiceId: id, ...values });
      })
      .catch(errorInfo => {});
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  return (
    <Modal
      forceRender
      title="审核拒绝"
      maskClosable={false}
      visible={modalType === 'NO_PAYMENT' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
      okText="确认"
      cancelText="取消"
    >
      <Form form={form} {...layout}>
        <Form.Item label="拒绝原因" name="refuseRemark" rules={[{ required: true, message: '请填写拒绝原因' }]}>
          <InputFormItem max={50} type="textArea" placeholder="请填写拒绝原因" />
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
export default connect(mapStateToProps)(ModalInvoice);
