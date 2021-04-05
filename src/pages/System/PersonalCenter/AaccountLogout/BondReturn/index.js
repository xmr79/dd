/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history, Link } from 'umi';
import { Card, Button, Form, Col, Row, Modal } from 'antd';
import styles from '../index.less';
import RadioFormItem from '@/components/FormItems/RadioFormItem';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import InputFormItem from '@/components/FormItems/InputFormItem';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const BondReturn = props => {
  const {
    dispatch,
    basicInfo: { earnestMoney },
    unsubscribeInfo,
  } = props;
  const { id, payType, refundFee } = unsubscribeInfo;
  const [type, setType] = useState(false);
  const [form] = Form.useForm();
  const handle = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        dispatch({
          type: 'unsubscribe/unsubscribeRecordConfirmReturn',
          payload: {
            id,
            ...values,
          },
        });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };
  const anormalize = (value, prevValue, prevValues) => {
    setType(value);
    return value;
  };

  const handleChexiao = () => {
    Modal.confirm({
      title: '撤销申请后不影响账号正常使用，要继续吗？',
      okText: '撤销',
      cancelText: '取消',
      icon: <InfoCircleOutlined />,
      onOk() {
        dispatch({
          type: 'unsubscribe/unsubscribeRecordRevocation',
          payload: { id },
        });
      },
    });
  };
  const list = [
    { value: 'ORIGINAL', name: '原路退回' },
    { value: 'ASSIGN', name: '打款至指定账户' },
  ];

  const reslist = payType === 'OFFLINE' ? list.filter(_ => _.value !== 'ORIGINAL') : list;
  useEffect(() => {
    if (payType === 'OFFLINE') {
      setType('ASSIGN');
    }
  }, [payType]);
  return (
    <>
      <div className={styles.con}>
        <div className={styles.tscon}>
          保证金金额为￥{refundFee}，请确认金额并同意协议
          {/* <a target="_blank" href={`/other/cms?code=AGREEMENT_BOND`}>
            《保证金协议》
          </a> */}
          <Form
            form={form}
            {...formItemLayout}
            initialValues={{
              returnType: reslist[0].value,
            }}
          >
            {!!refundFee && (
              <>
                <RadioFormItem
                  label="保证金退还方式"
                  name="returnType"
                  list={reslist}
                  normalize={anormalize}
                />
                {type === 'ASSIGN' && (
                  <>
                    <InputFormItem label="银行名称" name="bankName" min={2} max={30} required />
                    <InputFormItem
                      label="银行卡号"
                      name="accountNumber"
                      min={6}
                      max={30}
                      required
                    />
                    <InputFormItem label="姓名" name="accountName" min={2} max={25} required />
                  </>
                )}
              </>
            )}
          </Form>
          <div>
            <div style={{ textAlign: 'center' }}>账号注销协议</div>
            尊敬的用户，若您经过慎重考虑后仍决定注销本账号的，请您务必先行仔细阅读和充分理解本《账号注销协议》（“本协议”），并同意本协议全部内容，本协议由您与服务提供方（以下称“一品杭”）共同缔结，本协议具有合同效力。您按照我们的注销操作流程开始注销流程的视为您已经同意和遵守本协议全部内容。
            在您的账号注销后，将（可能）产生包括但不限于如下后果，并需要您自行承担：
            <p> 1.您将无法登录、使用该账号；</p>
            <p>
              2.除法律法规或本协议另有规定外，您该账号下的个人信息将会被删除或匿名化处理。您无法再找回您的个人信息，也无权要求我们找回，前述个人信息包括但不限于：活动发布记录、订单记录等内容。
            </p>
            <p>
              3.本账号一旦注销，将无法恢复。因此，我们善意地提醒您在申请注销前对需要备份的内容提前做好备份；
            </p>
            <p>
              4.本账号注销后并不影响账号注销前您使用本服务应当承担的相关责任，您仍需要对账号注销前使用本服务的行为承担相应责任，包括但不限于可能产生的违约责任、损害赔偿责任及履约义务等。
            </p>
            <p> 5. 其他因账号注销（可能）产生的后果。</p>
          </div>
        </div>
        <Button style={{ width: '150px' }} type="primary" onClick={handle}>
          同意协议
        </Button>
        <Button className="mt-10" style={{ width: '150px' }} type="link" onClick={handleChexiao}>
          撤销申请
        </Button>
      </div>
    </>
  );
};
export default connect(({ personalCenter, unsubscribe }) => {
  return { basicInfo: personalCenter.basicInfo, unsubscribeInfo: unsubscribe.unsubscribeInfo };
})(BondReturn);
