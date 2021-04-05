/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, Link } from 'umi';
import { Card, Button, Tag, Row, Col } from 'antd';
import InfoShow from '@/components/InfoShow';
import { BONDSTATUS } from '@/constants';
import ModalPay from '@/pages/Modals/ModalPay';
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};
const CompanyInfo = props => {
  const { dispatch, basicInfo } = props;
  const { earnestFlag, earnestMoney, brokerage, companyType } = basicInfo;
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
  return (
    <>
      <ModalPay />
      {companyType === 'ENTERPRISE' && (
        <>
          <h1>保证金</h1>

          <Row>
            <Col span={16} offset={2}>
              ￥{earnestMoney}{' '}
              <Tag
                onClick={() => {
                  earnestFlag === 'N' ? handleAdd('MODAL_PAY') : null;
                }}
              >
                {BONDSTATUS.filter(_ => _.key === earnestFlag)[0].value}
              </Tag>
            </Col>
          </Row>
        </>
      )}

      {/* <h1>佣金</h1>
      <Row>
        <Col span={16} offset={2}>
          {brokerage}%
        </Col>
      </Row> */}
      <Link to={'/system/personalCenter/accountLogout'}>
        <Button style={{ marginTop: '100px', color: 'rgba(0, 0, 0, 0.65)' }} type="link">
          账号注销>
        </Button>
      </Link>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CompanyInfo);
