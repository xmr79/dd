import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import { numLimit } from '@/utils/utils';
const ModalBrokerage = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { id, earnestMoney },
    },
    callback,
    dispatch,
  } = props;

  const [form] = Form.useForm();
  useEffect(() => {
    if (modalType === 'MODAL_BROKERAGE' && modalShow) {
      form.setFieldsValue({
        refundFee: earnestMoney,
      });
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
        callback({ ...values, id });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };
  const validator = (rule, value) => {
    if (value && numLimit(value, 0, earnestMoney, 'decimal', 2)) {
      return Promise.reject(
        `只能输入小于或等于已缴纳的数值${earnestMoney}元，小数点后最多输入2位数字`,
      );
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      title="修改退还保证金"
      maskClosable={false}
      visible={modalType === 'MODAL_BROKERAGE' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form}>
        <Form.Item
          name="refundFee"
          label="退还保证金"
          rules={[
            {
              required: true,
              message: '请输入要退还的保证金金额',
            },
            { validator },
          ]}
        >
          <Input suffix="元" />
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
export default connect(mapStateToProps)(ModalBrokerage);
