/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, Link } from 'umi';
import { Card, Button, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import ModalPay from '@/pages/Modals/ModalPay';
import ModalBondAlert from '@/pages/Modals/ModalBondAlert';
export function getIsBond(userType, companyType, earnestFlag) {
  return userType !== 'SYSTEM' && companyType === 'ENTERPRISE' && earnestFlag === 'N';
}
const BondAlert = props => {
  const {
    basicInfo,
    dispatch,
    currentUser: { userType },
  } = props;
  useEffect(() => {
    if (userType !== 'SYSTEM') {
      dispatch({ type: 'personalCenter/getAuthInfo' });
    }
  }, []);
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const { companyType, earnestFlag, payType } = basicInfo;
  return (
    getIsBond(userType, companyType, earnestFlag) && (
      <>
        <Alert
          message="平台提醒"
          description={
            <>
              <span className="mr-5">
                当前账号尚未缴纳保证金，为了不影响您的使用，请尽快缴纳平台入驻保证金
              </span>
              <Button
                type="link"
                onClick={() => {
                  payType === 'OFFLINE' ? handleAdd('MODAL_BOND_ALERT') : handleAdd('MODAL_PAY');
                }}
              >
                前往缴纳
              </Button>
            </>
          }
          type="warning"
          showIcon
          className="mb-20"
          banner
        />
        <ModalPay />
        <ModalBondAlert />
      </>
    )
  );
};
export default connect(({ personalCenter, user, global }) => {
  return {
    basicInfo: personalCenter.basicInfo,
    currentUser: user.currentUser,
    dataModal: global.dataModal,
  };
})(BondAlert);
