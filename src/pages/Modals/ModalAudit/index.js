import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InfoShow from '@/components/InfoShow';
import InputFormItem from '@/components/FormItems/InputFormItem';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;
const ModalAudit = props => {
  const {
    dispatch,
    handleAduit,
    dataModal,
    showList = [],
    title,
    successKey = 'AUTH_SUCCESS',
    failKey = 'AUTH_FAIL',
    reasonKey = 'refusalReason',
    reasons = [],
  } = props;
  const {
    modalType,
    modalShow,
    modalData: { id, lists = [], title: contentName },
  } = dataModal;

  const [form] = Form.useForm();
  const [isFail, setIsFail] = useState(false);
  useEffect(() => {
    if (modalShow && modalType === 'AUDIT') {
      // form.resetFields();
      setIsFail(false);
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
  const footer = !isFail
    ? [
        <Button
          key="nopass"
          onClick={() => {
            form.resetFields();
            setIsFail(true);
          }}
        >
          拒绝
        </Button>,
        <Button
          key="pass"
          onClick={() => {
            handleAduit({ id, status: successKey, contentName });
          }}
          type="primary"
        >
          通过
        </Button>,
      ]
    : [
        <Button
          key="quxiao"
          onClick={() => {
            setIsFail(false);
          }}
        >
          取消
        </Button>,
        <Button
          key="tg"
          onClick={() => {
            form
              .validateFields()
              .then(values => {
                handleAduit({ id, status: failKey, ...values, contentName });
              })
              .catch(errorInfo => {});
          }}
          type="primary"
        >
          确定
        </Button>,
      ];

  return (
    <>
      <Modal
        title={`${title}审核`}
        maskClosable={false}
        visible={modalType === 'AUDIT' && modalShow}
        onCancel={() => handleCancel()}
        footer={footer}
      >
        <div style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
          <InfoShow lists={lists} column={1} dispatch={dispatch} />
        </div>
        {isFail && (
          <Form form={form} {...layout}>
            {reasons && reasons.length > 0 ? (
              <>
                <Form.Item
                  name={reasonKey}
                  label="原因"
                  rules={[{ required: true, message: '请选择拒绝原因' }]}
                >
                  <Select placeholder="请选择拒绝原因">
                    {reasons.map((_, idx) => {
                      return (
                        <Option key={idx} value={_.value}>
                          {_.value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="修改建议"
                  name="changeProposal"
                  rules={[{ required: false, message: '请输入修改建议，字符长度限制0-50' }]}
                >
                  <InputFormItem
                    max={50}
                    placeholder="请输入修改建议，字符长度限制0-50"
                    type="textArea"
                  />
                </Form.Item>
              </>
            ) : (
              <Form.Item
                label="拒绝原因"
                name={reasonKey}
                rules={[{ required: true, message: '请输入拒绝原因，字符长度限制2-50' }]}
              >
                <InputFormItem
                  max={50}
                  placeholder="请输入拒绝原因，字符长度限制2-50"
                  type="textArea"
                />
              </Form.Item>
            )}
          </Form>
        )}
      </Modal>
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalAudit);
