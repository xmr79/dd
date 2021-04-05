/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Steps } from 'antd';
import styles from './index.less';
import AlertLogout from './AlertLogout';
import BondReturn from './BondReturn';
import LogoutSuccess from './LogoutSuccess';
import SubApply from './SubApply';
const { Step } = Steps;

const AccountLogout = props => {
  const {
    location: {
      query: { step = '0', isSq },
    },
    dispatch,
    unsubscribeInfo,
  } = props;
  const { id, returnStatus, returnType, status } = unsubscribeInfo;
  useEffect(() => {
    dispatch({
      type: 'unsubscribe/unsubscribeRecordGetLast',
    });
  }, []);
  useEffect(() => {
    if (id) {
      if (status !== 'REVOCATION') {
        if (returnType === 'NONE' && returnStatus !== 'NONE') {
          history.replace('/system/personalCenter/accountLogout?step=2');
        } else if (returnType !== 'NONE' && returnStatus === 'WAIT_RETURN') {
          history.replace(`/system/personalCenter/accountLogout?step=2`);
        } else {
          history.replace(
            `/system/personalCenter/accountLogout?step=${status === 'AUTH_SUCCESS' ? '3' : '1'}`,
          );
        }
      }
    }
  }, [unsubscribeInfo]);
  const lists = [
    {
      key: 0,
      name: '注销提醒',
    },
    {
      key: 1,
      name: '达成注销条件',
    },

    {
      key: 3,
      name: '注销成功',
    },
  ];
  if (returnStatus && returnStatus !== 'NONE') {
    lists.splice(2, 0, {
      key: 2,
      name: '保证金退还',
    });
  }
  return (
    <>
      <Steps current={step - 0}>
        {lists.map((_, idx) => {
          return <Step key={idx} title={_.name} />;
        })}
      </Steps>
      <div className={styles.con}>
        {step === '0' && <AlertLogout />}

        {step === '1' && isSq === '1' && <SubApply />}

        {step === '1' && (status === 'AUTHING' || status === 'AUTH_FAIL') && !isSq && (
          <LogoutSuccess />
        )}

        {returnStatus !== 'NONE' &&
          returnType === 'NONE' &&
          status === 'AUTH_SUCCESS' &&
          step === '2' && <BondReturn />}

        {returnStatus !== 'NONE' && status !== 'AUTH_SUCCESS' && step === '2' && <LogoutSuccess />}
        
        {returnType !== 'NONE' &&
          returnStatus === 'WAIT_RETURN' &&
          status === 'AUTH_SUCCESS' &&
          step === '2' && <LogoutSuccess />}

        {step === '3' && <LogoutSuccess />}
      </div>
    </>
  );
};
export default connect(({ personalCenter, unsubscribe }) => {
  return { unsubscribeInfo: unsubscribe.unsubscribeInfo };
})(AccountLogout);
