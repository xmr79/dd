import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Alert } from 'antd';
import UserFlag from '@/components/UserFlag';
import { userTag } from '@/constants';
const { Option } = Select;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
const ModalBindAdd = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dispatch,
    handleAddFlag,
    currentUser: { userType },
  } = props;
  const [form] = Form.useForm();

  function getList(userType) {
    let list = [];
    if (userType === 'SYSTEM') {
      list = userTag.filter(_ => _.key !== 'ADMIN');
    } else if (userType === 'EXPERT') {
      list = userTag.filter(_ => _.key !== 'VERIFIER');
    } else {
      list = userTag;
    }
    return list;
  }

  useEffect(() => {
    if (modalShow && modalType === 'MODAL_BIND_ADD') {
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
    dispatch({ type: 'global/changeState', payload });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        handleAddFlag(values);
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };

  const validator = (rule, value) => {
    if (!value) {
      return Promise.reject('请添加有效的用户标识!');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      title="添加绑定"
      maskClosable={false}
      visible={modalType === 'MODAL_BIND_ADD' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form} {...formItemLayout}>
        <Form.Item
          label="用户标识"
          name="flag"
          required
          rules={[
            {
              validator,
            },
          ]}
        >
          <UserFlag />
        </Form.Item>
        <Form.Item
          label="用户角色"
          name="tag"
          rules={[{ required: true, message: '请选择要分配的角色' }]}
        >
          <Select placeholder="请选择要分配的角色" style={{ width: '100%' }}>
            {getList(userType).map((item, index) => {
              return (
                <Option value={item.key} key={item.key}>
                  {item.value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global, user }) => {
  return {
    dataModal: global.dataModal,
    currentUser: user.currentUser,
  };
};
export default connect(mapStateToProps)(ModalBindAdd);
