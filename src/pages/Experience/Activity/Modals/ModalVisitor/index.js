import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, Input, Select } from 'antd';
import ExperiencerInfoForm from '@/pages/Experience/Activity/Team/Create/ExperiencerInfoForm';
const formItemLayout = { labelCol: { span: 2 }, wrapperCol: { span: 22 } };
const ModalVistor = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { id },
    },
    dispatch,
  } = props;
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
  const handleOk = () => {};
  return (
    <Modal
      destroyOnClose={true}
      title="编辑体验者"
      width="1100px"
      maskClosable={false}
      visible={modalType === 'MODAL_VISTOR' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
      footer={null}
    >
      {id && <ExperiencerInfoForm id={id} formItemLayout={formItemLayout} />}
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalVistor);
