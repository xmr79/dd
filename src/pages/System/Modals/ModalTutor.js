import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import BraftEditor from 'braft-editor';
import EditorFormItem from '@/components/FormItems/EditorFormItem';
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
const ModalTutor = props => {
  const {
    dataModal: { modalType, modalShow, modalData },
    dispatch,
    callback,
  } = props;

  const { r = {}, isChakan = false } = modalData;
  const { id, avatar, introduction, name, domainIntroduction } = r;
  useEffect(() => {
    if (modalShow && modalType === 'MODAL_TUTOR') {
      form.resetFields();
      if (id) {
        form.setFieldsValue({
          avatar: avatar ? [avatar] : [],
          name,
          introduction: BraftEditor.createEditorState(introduction),
          domainIntroduction,
        });
      }
    }
  }, [modalData, modalShow]);

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
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const { introduction, avatar } = values;
        if (introduction.toHTML() === '<p></p>') {
          message.error('简介不能为空');
          return false;
        }
        const payload = {
          id,
          ...values,
          avatar: avatar.join(','),
          introduction: introduction.toHTML(),
        };
        callback(payload);
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };
  const footer = isChakan
    ? []
    : [
        <Button
          key="nopass"
          onClick={() => {
            handleCancel();
          }}
        >
          取消
        </Button>,
        <Button
          key="pass"
          onClick={() => {
            handleOk();
          }}
          type="primary"
        >
          确定
        </Button>,
      ];
  return (
    <Modal
      width="900px"
      title={`${isChakan ? '查看' : id ? '编辑' : '新增'}导师`}
      maskClosable={false}
      visible={modalType === 'MODAL_TUTOR' && modalShow}
      onCancel={() => handleCancel()}
      footer={footer}
    >
      <Form form={form} {...formItemLayout}>
        <InputFormItem disabled={isChakan} label="导师姓名" name="name" max={8} required />
        <InputFormItem
          disabled={isChakan}
          label="领域介绍"
          name="domainIntroduction"
          max={8}
          required
        />
        {isChakan ? (
          <Form.Item label="简介">
            <div
              style={{ marginTop: '0.5em' }}
              dangerouslySetInnerHTML={{ __html: introduction }}
            ></div>
          </Form.Item>
        ) : (
          <EditorFormItem
            disabled={isChakan}
            label="简介"
            name="introduction"
            required
            contentStyle={{ height: 300 }}
          />
        )}

        <UploadImgsFormItem
          disabled={isChakan}
          required
          label="头像"
          name="avatar"
          extra="支持jpg/png格式，大小不能超过400K，建议尺寸100PX*100PX"
          max={1}
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
export default connect(mapStateToProps)(ModalTutor);
