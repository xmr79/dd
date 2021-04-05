import React, { useState, useEffect } from 'react';
import { connect, Link } from 'umi';
import { Modal, Button, Form, Input, Select, Checkbox, message } from 'antd';
import RadioFormItem from '@/components/FormItems/RadioFormItem';
import WX from '@/pages/Modals/ModalPay/WX';
import { BOSPayType } from '@/constants';
import { emailReg } from '@/constants/reg';
import BankInfo from '@/pages/Modals/ModalPay/BankInfo';
const ModalPay = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dataModal,
    dispatch,
    basicInfo: { earnestMoney },
  } = props;

  const [payType, setPayType] = useState('WX');
  const [receiptFlag, setReceiptFlag] = useState('N');
  const normalize = value => {
    setPayType(value);
    return value;
  };

  const rnormalize = value => {
    setReceiptFlag(value);
    return value;
  };

  useEffect(() => {
    dispatch({ type: 'personalCenter/getAuthInfo' });
  }, []);

  const [isXy, setisXy] = useState(false);
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
        if (!isXy) {
          message.error('请先阅读保证金协议，点击在新窗口打开保证金协议');
          return false;
        }
        dispatch({
          type: 'common/invest',
          payload: {
            ...values,
          },
        });
      })
      .catch(errorInfo => {});
  };
  return (
    <>
      <WX dataModal={dataModal} />
      <Modal
        title="保证金缴纳"
        maskClosable={false}
        visible={modalType === 'MODAL_PAY' && modalShow}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="pass" onClick={handleOk} type="primary">
            {payType === 'OFFLINE' ? '确定' : '去支付'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={{
            payType: 'WX',
            receiptFlag: 'N',
          }}
        >
          <Form.Item label="保证金金额">￥{earnestMoney}</Form.Item>
          <RadioFormItem
            label="类型"
            name="payType"
            list={BOSPayType.map(_ => {
              return {
                value: _.key,
                name: _.value,
              };
            })}
            normalize={normalize}
          />
          {payType === 'OFFLINE' && (
            <>
              <BankInfo />
            </>
          )}
          <RadioFormItem
            label="是否需要收据"
            name="receiptFlag"
            list={[
              { value: 'N', name: '否' },
              { value: 'Y', name: '是' },
            ]}
            normalize={rnormalize}
          />
          {receiptFlag === 'Y' && (
            <Form.Item
              label="邮箱地址"
              name="email"
              rules={[
                { required: true, message: '请输入接收邮箱' },
                {
                  pattern: emailReg,
                  message: '请输入正确的邮箱',
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
        <Checkbox
          onChange={e => {
            setisXy(e.target.checked);
          }}
        >
          <span>
            我已阅读并同意
            <a target="_blank" href={`/other/cms?code=AGREEMENT_BOND`}>
              《保证金协议》
            </a>
          </span>
        </Checkbox>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ global, personalCenter }) => {
  return {
    dataModal: global.dataModal,
    basicInfo: personalCenter.basicInfo,
  };
};
export default connect(mapStateToProps)(ModalPay);
