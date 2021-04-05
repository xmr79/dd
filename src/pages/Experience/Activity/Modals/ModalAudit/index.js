import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Steps } from 'antd';
import InfoShow from '@/components/InfoShow';
import InputFormItem from '@/components/FormItems/InputFormItem';
import { numLimit } from '@/utils/utils';
const { Step } = Steps;
const { Option } = Select;
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
    reasons = [],
  } = props;

  const {
    modalType,
    modalShow,
    modalData: { id, activityId, lists = [], title: activityTitle },
    modalData,
  } = dataModal;

  const [form] = Form.useForm();
  const [isFail, setIsFail] = useState(false);
  const [current, setCurrent] = useState(1);
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
        modalData,
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const footer = !isFail
    ? current === 1
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
              activityId ? handleAduit({ id, status: successKey, title: activityTitle }) : setCurrent(2);
            }}
            type="primary"
          >
            通过
          </Button>,
        ]
      : [
          <Button
            key="1"
            onClick={() => {
              setCurrent(1);
            }}
          >
            上一步
          </Button>,
          <Button
            key="2"
            onClick={() => {
              form
                .validateFields()
                .then(values => {
                  const { commissionRate } = values;
                  handleAduit({
                    id,
                    status: successKey,
                    title: activityTitle,
                    commissionRate: (commissionRate / 100).toFixed(3),
                  });
                })
                .catch(errorInfo => {});
            }}
            type="primary"
          >
            确定
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
                handleAduit({ id, title: activityTitle, status: failKey, ...values });
              })
              .catch(errorInfo => {});
          }}
          type="primary"
        >
          确定
        </Button>,
      ];
  const validator = (rule, value) => {
    if (value && numLimit(value, 0, 50, 'decimal')) {
      return Promise.reject('请输入0~50之间的数字，小数点后保留一位');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <>
      <Modal
        title={`${title}审核`}
        maskClosable={false}
        visible={modalType === 'AUDIT' && modalShow}
        onCancel={() => handleCancel()}
        footer={footer}
      >
        {!activityId && (
          <Steps current={current} size="small" style={{ marginBottom: '30px' }}>
            <Step title="活动审核" />
            <Step title="设置佣金" />
          </Steps>
        )}
        {current === 1 ? (
          <div style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
            <InfoShow lists={lists} column={1} dispatch={dispatch} />
          </div>
        ) : (
          <Form form={form} {...layout} initialValues={{ commissionRate: 10 }}>
            <Form.Item
              name="commissionRate"
              label="佣金"
              rules={[
                {
                  required: true,
                  message: '请输入0~50之间的数字，小数点后保留一位',
                },
                { validator },
              ]}
            >
              <Input suffix="%" />
            </Form.Item>
          </Form>
        )}

        {isFail && (
          <Form form={form} {...layout}>
            <Form.Item
              name={reasonKey}
              label="原因"
              hasFeedback
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
