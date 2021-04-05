/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Avatar, Badge, Popover, Row, Col } from 'antd';
import styles from './index.less';
import InfoShow from '@/components/InfoShow';
import ModalInfo from '@/pages/Modals/ModalInfo';
import { QuestionCircleOutlined } from '@ant-design/icons';
import CompanyInfo from './CompanyInfo';
import { COMPANYTYPE } from '@/constants';
const BasicInfo = props => {
  const {
    dispatch,
    basicInfo,
    currentUser: { userType },
    dataModal,
  } = props;
  useEffect(() => {
    dispatch({ type: 'personalCenter/getAuthInfo' });
  }, []);

  // 新增操作
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
  const {
    avatarUrl,
    category = [],
    intro,
    mobile,
    name,
    businessLicense,
    status = 'AUTHING',
    refusalReason,
    companyType,
    cardFrontUrl,
    cardReverseUrl,
  } = basicInfo;

  const lists =
    userType === 'COMPANY'
      ? [
          {
            label: '企业名称',
            children: name,
          },
          {
            label: '简介',
            children: intro,
          },
          {
            label: '注册手机号',
            children: mobile,
          },
          {
            label: '类型',
            children: companyType,
            type: 'statusdata',
            valueEnum: COMPANYTYPE,
            styleType: 'none',
          },
          {
            label: '亮点标签',
            children: category.map(_ => _.name).join(';'),
          },
          {
            label: '营业执照',
            children: [businessLicense],
            type: 'imgs',
          },
        ]
      : [
          {
            label: '姓名',
            children: name,
          },
          {
            label: '简介',
            children: intro,
          },
          {
            label: '所属领域',
            children: category.map(_ => _.name).join(';'),
          },
          {
            label: '注册手机号',
            children: mobile,
          },
          cardFrontUrl && {
            label: '身份证',
            children: [cardFrontUrl, cardReverseUrl],
            type: 'imgs',
          },
        ];

  const handleUpdate = val => {
    dispatch({ type: 'personalCenter/updateBaseAuthInfo', payload: val });
  };

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <ModalInfo
        dataModal={dataModal}
        userType={userType}
        handleUpdate={handleUpdate}
        basicInfo={basicInfo}
      />
      <div>
        <h1>基本信息</h1>
        <Row type="flex" className="mb-10" gutter={12} align="middle">
          <Col span={layout.labelCol.span} style={{ textAlign: 'right' }}>
            <Avatar size={64} src={avatarUrl} className="mb-20" />
          </Col>
          <Col span={layout.wrapperCol.span}>
            {status === 'AUTHING' && (
              <>
                <Badge status="warning" text="审核中" />
              </>
            )}
            {status === 'AUTH_FAIL' && (
              <>
                <Badge status="error" text="审核失败" />
                <Popover content={<div style={{ maxWidth: '200px' }}>{refusalReason}</div>}>
                  <QuestionCircleOutlined className="ml-5" />
                </Popover>
              </>
            )}
            {status !== 'AUTHING' && (
              <div>
                <Button
                  type="link"
                  onClick={() => {
                    handleAdd('MODAL_INFO');
                  }}
                >
                  {status === 'AUTH_FAIL' && '重新'}修改认证信息
                </Button>
              </div>
            )}
          </Col>
        </Row>
        <InfoShow layout={layout} lists={lists} column={1} dispatch={dispatch} />

        {userType === 'COMPANY' && <CompanyInfo basicInfo={basicInfo} />}
      </div>
    </>
  );
};
export default connect(({ personalCenter, user }) => {
  return {
    basicInfo: personalCenter.basicInfo,
    currentUser: user.currentUser,
    dataModal: global.dataModal,
  };
})(BasicInfo);
