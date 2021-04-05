import React, { useState, useEffect } from 'react';
import { connect, Link } from 'umi';
import { Modal, Button, Form, Input, Select, Checkbox, message } from 'antd';
import RadioFormItem from '@/components/FormItems/RadioFormItem';
import WX from '@/pages/Modals/ModalPay/WX';
import { BOSPayType } from '@/constants';
import { emailReg } from '@/constants/reg';
import BankInfo from '@/pages/Modals/ModalPay/BankInfo';
const ModalPay = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dataModal,
    dispatch,
    basicInfo: { earnestMoney },
  } = props;

  useEffect(() => {
    dispatch({ type: 'personalCenter/getAuthInfo' });
  }, []);

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
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  return (
    <>
      <Modal
        title="保证金缴纳"
        maskClosable={false}
        visible={modalType === 'MODAL_BOND_ALERT' && modalShow}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="pass" onClick={() => handleCancel()} type="primary">
            知道了
          </Button>,
        ]}
      >
        请及时完成线下打款,若已完成，请耐心等待财务确认
        <Form form={form} {...layout}>
          <Form.Item label="保证金金额">￥{earnestMoney}</Form.Item>
          <BankInfo />
        </Form>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ global, personalCenter }) => {
  return {
    dataModal: global.dataModal,
    basicInfo: personalCenter.basicInfo,
  };
};
export default connect(mapStateToProps)(ModalPay);
