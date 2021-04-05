import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import UploadVideoFormItem from '@/components/FormItems/UploadVideoFormItem';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const ModalEdit = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { id, type, materialName, oldCoverUrl },
    },
    dispatch,
    handleSave,
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (modalShow && modalType === 'MODAL_EDIT_IMGVEDIO') {
      form.resetFields();
      form.setFieldsValue({
        materialName,
        coverUrl: [oldCoverUrl],
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
        const { coverUrl } = values;
        const aaa = {
          id,
          ...values,
          oldCoverUrl: oldCoverUrl ? oldCoverUrl : undefined,
          coverUrl: coverUrl ? coverUrl[0] : coverUrl,
          type,
        };
        handleSave(aaa);
      })
      .catch(errorInfo => {});
  };
  return (
    <Modal
      title={type === 1 ? `编辑图片` : '编辑视频'}
      maskClosable={false}
      visible={modalType === 'MODAL_EDIT_IMGVEDIO' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form} {...layout}>
        <InputFormItem label="标题" name="materialName" max={30} required isTestSpace={true} />
        {type === 2 && (
          <UploadImgsFormItem
            required={false}
            label="视频封面"
            name="coverUrl"
            extra="建议尺寸：400PX*400PX，支持jpg 、png格式，大小不超过3 MB。如果不添加封面，系统会默认截取视频的第一个画面作为封面。"
            max={1}
          />
        )}
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalEdit);
