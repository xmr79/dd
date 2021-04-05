import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import InfoShow from '@/components/InfoShow';
import InputFormItem from '@/components/FormItems/InputFormItem';
import { numLimit } from '@/utils/utils';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
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
  } = props;

  const {
    modalType,
    modalShow,
    modalData: { id, username, earnestMoney, returnStatus = 'NONE' },
  } = dataModal;

  const [form] = Form.useForm();
  const [isFail, setIsFail] = useState(false);
  useEffect(() => {
    if (modalShow && modalType === 'CANCELL_AUDIT') {
      // form.resetFields();
      setIsFail(false);
      if (returnStatus !== 'NONE') {
        form.setFieldsValue({
          refundFee: earnestMoney,
        });
      }
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
            form
              .validateFields()
              .then(values => {
                handleAduit({ id, status: successKey, ...values });
              })
              .catch(errorInfo => {});
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
                handleAduit({ id, status: failKey, ...values });
              })
              .catch(errorInfo => {});
          }}
          type="primary"
        >
          确定
        </Button>,
      ];
  const validator = (rule, value) => {
    if (value && numLimit(value, 0, earnestMoney, 'decimal', 2)) {
      return Promise.reject('只能输入小于或等于默认值的数值，小数点后最多输入2位数字');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <>
      <Modal
        title={`注销申请`}
        maskClosable={false}
        visible={modalType === 'CANCELL_AUDIT' && modalShow}
        onCancel={() => handleCancel()}
        footer={footer}
      >
        {!isFail ? (
          <Form form={form} {...layout}>
            <Form.Item label="申请账号">{username}</Form.Item>
            {returnStatus !== 'NONE' && (
              <Form.Item
                label="退还保证金"
                name="refundFee"
                rules={[
                  {
                    required: true,
                    message: '只能输入小于或等于默认值的数值，小数点后最多输入2位数字',
                  },
                  { validator },
                ]}
              >
                <Input suffix="元" />
              </Form.Item>
            )}
          </Form>
        ) : (
          <Form form={form} {...layout}>
            <Form.Item
              label="不通过原因"
              name={reasonKey}
              rules={[{ required: true, message: '请输入100字以内的原因' }]}
            >
              <InputFormItem max={100} placeholder="请输入100字以内的原因" type="textArea" />
            </Form.Item>
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
