import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import ShareSets from '@/components/FormItems/ShareSets';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const ModalPageInfo = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { id },
      modalData,
    },
    dispatch,
    handleInfo,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (modalShow) {
      form.resetFields();
    }
    if (modalShow && id) {
      const { name, details, shareTitle, shareImgUrl, shareDes, code } = modalData;
      form.setFieldsValue({
        name,
        details,
        shareTitle,
        // shareImgUrl: shareImgUrl ? shareImgUrl.split(',') : [],
        shareImgUrl: shareImgUrl
          ? shareImgUrl.split(',').map(_ => {
              return { url: _ };
            })
          : [],
        shareDes,
        code,
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
    dispatch({ type: 'customPage/changeState', payload });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const { shareImgUrl } = values;
        const payload = {
          ...values,
          // shareImgUrl: shareImgUrl ? shareImgUrl.join(',') : undefined,
          shareImgUrl: shareImgUrl ? shareImgUrl.map(_ => _.url).join(',') : undefined,
        };
        handleInfo({ id, ...payload });
      })
      .catch(errorInfo => {});
  };
  return (
    <Modal
      title="页面信息"
      width={700}
      maskClosable={false}
      visible={modalType === 'MODAL_PAGE_INFO' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form} {...layout}>
        <InputFormItem label="页面名称" name="name" max={20} required />
        <InputFormItem
          label="页面标识"
          name="code"
          max={20}
          required
          disabled={!!id}
          extra="页面标识唯一，不可修改，可以使用与页面相关的大写字母"
        />
        <InputFormItem label="使用场景" name="details" max={20} required={false} />
        <ShareSets isTitle={false} required={false} isMaterial={true} />
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ customPage }) => {
  return {
    dataModal: customPage.dataModal,
  };
};
export default connect(mapStateToProps)(ModalPageInfo);
