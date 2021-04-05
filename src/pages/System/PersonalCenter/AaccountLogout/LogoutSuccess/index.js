/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Result, Modal } from 'antd';
import styles from '../index.less';
import { CANCELLATION_STATUS, REFUND_METHOD } from '@/constants';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { arrayToObj } from '@/utils/utils';
import moment from 'moment';
const mapCANCELLATION_STATUS = arrayToObj(CANCELLATION_STATUS, 'key');
const mapREFUND_METHOD = arrayToObj(REFUND_METHOD, 'key');
const LogoutSuccess = props => {
  const { dispatch, unsubscribeInfo = {}, basicInfo } = props;
  const { companyType } = basicInfo;
  const {
    id,
    status,
    earnestMoney,
    returnType,
    refusalReason,
    returnStatus,
    refundFee,
  } = unsubscribeInfo;

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

  const [text, setText] = useState({
    status: 'success',
    title: '待审核',
    subTitle: '请耐心等待平台审核',
  });
  useEffect(() => {
    let obj = {};
    switch (status) {
      case 'AUTHING':
        obj = {
          status: 'success',
          title: '待审核',
          subTitle: '请耐心等待平台审核',
        };
        break;
      case 'AUTH_SUCCESS':
        if (returnStatus === 'WAIT_RETURN') {
          obj = {
            status: 'success',
            title: '保证金退还处理中',
            subTitle: `${moment().format('YYYY-MM-DD')}提交申请，将在5个工作日左右处理退还`,
          };
        } else {
          obj = {
            status: 'success',
            title: '注销成功',
            subTitle: '',
          };
        }

        break;
      case 'AUTH_FAIL':
        obj = {
          status: 'error',
          title: '审核失败',
          subTitle: `原因：${refusalReason}`,
        };
        break;
    }
    setText(obj);
  }, [unsubscribeInfo]);

  return (
    unsubscribeInfo && (
      <div className={styles.con}>
        <div className={styles.tscon}>
          <Result status={text.status} title={text.title} subTitle={text.subTitle} />
          {returnStatus === 'WAIT_RETURN' && (
            <>
              <div className={styles.des}>待退还金额：￥{refundFee}</div>
              <div className={styles.des}>保证金退还方式：{mapREFUND_METHOD[returnType].value}</div>
            </>
          )}
        </div>
        {status === 'AUTHING' && (
          <Button style={{ width: '150px' }} type="primary" onClick={handleChexiao}>
            撤销申请
          </Button>
        )}
        {status === 'AUTH_FAIL' && (
          <Button
            style={{ width: '150px' }}
            type="primary"
            onClick={() => {
              history.push('/system/personalCenter/accountLogout?step=0');
            }}
          >
            重新申请
          </Button>
        )}
      </div>
    )
  );
};
export default connect(({ unsubscribe, personalCenter }) => {
  return { unsubscribeInfo: unsubscribe.unsubscribeInfo, basicInfo: personalCenter.basicInfo };
})(LogoutSuccess);
