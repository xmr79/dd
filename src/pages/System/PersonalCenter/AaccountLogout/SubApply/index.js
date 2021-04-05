/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Form, Col, Row } from 'antd';
import styles from '../index.less';
import InputFormItem from '@/components/FormItems/InputFormItem';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
const SubApply = props => {
  const { dispatch, companyStat } = props;
  const { unFinishActivityCount, unSettlementOrderCount } = companyStat;

  const [form] = Form.useForm();
  useEffect(() => {
    dispatch({
      type: 'unsubscribe/unsubscribeGetCompanyStat',
    });
  }, []);
  const handle = () => {
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: 'unsubscribe/unsubscribeRecordSave',
          payload: {
            params: {
              ...values,
            },
          },
        });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };
  return (
    <>
      <div className={styles.con}>
        <div className={styles.tscon}>
          <div className={styles.title}>须达成以下注销条件</div>
          <div>
            <Row gutter={12}>
              <Col>
                <div className={styles.stitle}>所有活动场次均为已结束状态</div>
              </Col>
              <Col>
                {unFinishActivityCount <= 0 ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
              </Col>
            </Row>
            {unFinishActivityCount > 0 && <p>有{unFinishActivityCount}个活动场次未结束</p>}
          </div>
          <div>
            <Row gutter={12}>
              <Col>
                <div className={styles.stitle}>所有订单都已结算完成</div>
              </Col>
              <Col>
                {unSettlementOrderCount <= 0 ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
              </Col>
            </Row>
            {unSettlementOrderCount > 0 && <p>有{unSettlementOrderCount}笔订单待结算</p>}
          </div>
          <Form form={form} {...formItemLayout}>
            <InputFormItem label="注销原因" name="reason" max={50} type="textArea" required />
          </Form>
        </div>
        <Button
          style={{ width: '150px' }}
          disabled={unFinishActivityCount > 0 || unSettlementOrderCount > 0}
          type="primary"
          onClick={handle}
        >
          提交申请
        </Button>
        <Button
          className="mt-10"
          style={{ width: '150px' }}
          type="link"
          onClick={() => {
            history.go(-1);
          }}
        >
          取消
        </Button>
      </div>
    </>
  );
};
export default connect(({ unsubscribe }) => {
  return { companyStat: unsubscribe.companyStat };
})(SubApply);
