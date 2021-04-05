import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
const ModalSort = props => {
  const { dataModal, dispatch, type, callback } = props;
  const { modalType, modalShow, modalData } = dataModal;
  const { id, name } = modalData;
  const [form] = Form.useForm();
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
  useEffect(() => {
    if (modalShow && modalType === 'MODAL_SORT') {
      form.resetFields();

      if (name) {
        form.setFieldsValue({
          name,
        });
      }
    }
  }, [modalShow]);
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        callback({ ...values, id });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };
  return (
    <Modal
      title={`${id ? '编辑' : '新增'}${type}`}
      maskClosable={false}
      visible={modalType === 'MODAL_SORT' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form}>
        <InputFormItem
          name="name"
          label={type}
          required={true}
          placeholder={`请输入${type}`}
          max={8}
        />
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalSort);
