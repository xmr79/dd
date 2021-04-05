import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import UploadVideoFormItem from '@/components/FormItems/UploadVideoFormItem';
import MaterialFormItem from '@/components/FormItems/MaterialFormItem';
import ModalMaternalImg from '@/pages/Modals/ModalMaternalImg';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const ModalUploadVideo = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dispatch,
    handleSave,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (modalShow && modalType === 'MODAL_UPLOAD_VIDEO') {
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
    dispatch({ type: 'sourceHouse/changeState', payload });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const { url, coverUrl } = values;

        const audioElement = new Audio(url);
        audioElement.addEventListener('loadedmetadata', _event => {
          const aaa = {
            ...values,
            url: url ? url[0] : url,
            coverUrl: coverUrl ? coverUrl[0].url : coverUrl,
            type: '2',
            duration: audioElement.duration,
          };
          handleSave(aaa);
        });
      })
      .catch(errorInfo => {});
  };
  return (
    <Modal
      title="上传视频"
      maskClosable={false}
      visible={modalType === 'MODAL_UPLOAD_VIDEO' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <ModalMaternalImg />
      <Form form={form} {...layout}>
        <UploadVideoFormItem
          required
          label="上传视频"
          name="url"
          extra="视频格式支持mp4，大小不得超过50MB"
          max={1}
        />
        <InputFormItem label="标题" name="materialName" max={30} required isTestSpace={true} />
        {/* <UploadImgsFormItem
          required={false}
          label="视频封面"
          name="coverUrl"
          extra="建议尺寸：400PX*400PX，支持jpg 、png格式，大小不超过3 MB。如果不添加封面，系统会默认截取视频的第一个画面作为封面。"
          max={1}
        /> */}
        <MaterialFormItem
          required={false}
          label="视频封面"
          name="coverUrl"
          extra="建议尺寸：400PX*400PX，支持jpg 、png格式，大小不超过3 MB。如果不添加封面，系统会默认截取视频的第一个画面作为封面。"
          max={1}
          type={1}
          isModalMaternalImg={true}
        />
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ sourceHouse }) => {
  return {
    dataModal: sourceHouse.dataModal,
  };
};
export default connect(mapStateToProps)(ModalUploadVideo);
