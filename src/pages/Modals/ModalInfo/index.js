import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import EnterpriseInfoFormItems from '@/pages/User/EnterpriseInfo/FormItems';
import ExpertInfoFormItems from '@/pages/User/ExpertInfo/FormItems';
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 16 } };
const ModalInfo = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dispatch,
    userType,
    handleUpdate,
    basicInfo,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (modalShow && modalType === 'MODAL_INFO' && JSON.stringify(basicInfo) !== '{}') {
      const { avatarUrl, businessLicense, category = [], cardFrontUrl, cardReverseUrl } = basicInfo;
      const initialValues = {
        ...basicInfo,
        avatarUrl: avatarUrl ? [avatarUrl] : [],
        categoryId: category.map(_ => _.id),
        files: {
          cardFrontUrl,
          cardReverseUrl,
        },
      };
      if (userType === 'COMPANY') {
        initialValues['businessLicense'] = businessLicense ? [businessLicense] : [];
      }
      form.setFieldsValue(initialValues);
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
        const { avatarUrl, businessLicense, files } = values;
        const val = {
          ...values,
          ...files,
          avatarUrl: avatarUrl[0],
        };
        if (businessLicense) {
          val.businessLicense = businessLicense[0];
        }
        handleUpdate(val);
      })
      .catch(errorInfo => {});
  };
  return (
    <Modal
      width="800px"
      title="修改认证信息"
      maskClosable={false}
      visible={modalType === 'MODAL_INFO' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form} {...formItemLayout}>
        {userType === 'COMPANY' && <EnterpriseInfoFormItems isEdit={true} form={form} />}
        {userType === 'EXPERT' && <ExpertInfoFormItems form={form} />}
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalInfo);
