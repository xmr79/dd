import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import { phoneReg, telReg } from '@/constants/reg';
const ModalEditMobile = props => {
  const { dataModal, dispatch, mobile, loading } = props;
  const { modalType, modalShow, modalData } = dataModal;
  const {} = modalData;
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
    if (modalShow && modalType === 'MODAL_EDIT_MOBILE') {
      form.resetFields();

      if (mobile) {
        form.setFieldsValue({
          contactWx: mobile,
        });
      }
    }
  }, [modalShow]);
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: 'personalCenter/updateperson',
          payload: {
            ...values,
          },
        });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };
  const validator = (rule, value) => {
    if (value && !(phoneReg.test(value) || telReg.test(value))) {
      return Promise.reject('请输入正确的联系方式!');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      title={`修改客服`}
      confirmLoading={loading}
      maskClosable={false}
      visible={modalType === 'MODAL_EDIT_MOBILE' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form}>
        <InputFormItem
          name="contactWx"
          label="联系电话"
          placeholder={`例如13766668888`}
          rules={[
            { required: true, message: '请输入联系电话' },
            {
              validator,
            },
          ]}
          max={30}
        />
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global, personalCenter, loading }) => {
  return {
    dataModal: global.dataModal,
    mobile: personalCenter.mobile,
    loading: loading.effects['personalCenter/updateperson'],
  };
};
export default connect(mapStateToProps)(ModalEditMobile);
