import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Alert, Radio } from 'antd';
import { BLACK_TYPE } from '@/constants';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const AddBlack = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { selectedRowKeys, users },
    },
    dispatch,
    handleRes,
  } = props;
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
        if (handleRes) {
          handleRes({ values, selectedRowKeys, users });
        }
      })
      .catch(errorInfo => {});
  };
  return (
    <Modal
      title="加入黑名单"
      maskClosable={false}
      visible={modalType === 'ADD_BLACK' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Alert
        message="提示：加入黑名单后，用户将无法在禁用期内发布文章评论、活动评价，无法预约活动。"
        type="warning"
        showIcon
      />
      <Form className="mt-10" form={form} {...layout} initialValues={{ blackType: 'ONE' }}>
        <Form.Item name="blackType" label="禁用时长">
          <Radio.Group>
            {BLACK_TYPE.map((_, idx) => {
              return (
                <Radio key={idx} value={_.key}>
                  {_.value}
                </Radio>
              );
            })}
          </Radio.Group>
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
export default connect(mapStateToProps)(AddBlack);
