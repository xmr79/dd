/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Tabs, Row, Col } from 'antd';
import BasicInfo from './BasicInfo';
import Story from './Story';
import Operate from './Operate';
import CDetail from './CDetail';
import ModalExtension from '@/pages/Modals/ModalExtension'

const { TabPane } = Tabs;

const PersonalCenter = props => {
  const { currentUser, dataModal, dispatch } = props;
  const { userType } = currentUser;
  function callback(key) {}

  const extensionClick = () => {
    console.log(currentUser)
    const page = currentUser.userType === 'EXPERT' ? "pages/Tabber/platform/expert/index" : "pages/Tabber/platform/company/index";
    const payload = {
      page,
      scene: `id=${currentUser.id}`,
      width: 200
    }
    dispatch({ type: 'global/getExtensionQrcode', payload }).then(res => {
      console.log(res)
      handleAdd('EXTENSION', { ...currentUser, pageurl: `${page}?id=${currentUser.id}` , pageimg: res.data });
    })
  }

  const Btn = <Button type="primary" onClick={extensionClick}>推广</Button>

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
    <ModalExtension dataModal={dataModal} />
      <ModalExtension dataModal={dataModal} />
      <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={Btn}>
        <TabPane tab="基本信息" key="1">
          <BasicInfo />
        </TabPane>
        <TabPane tab={userType === 'COMPANY' ? '企业主页' : '专家主页'} key="2">
          {userType === 'COMPANY' ? <CDetail /> : <Story />}
        </TabPane>
        <TabPane tab="运营管理" key="3">
          <Operate />
        </TabPane>
      </Tabs>
    </>
  );
};
export default connect(({ user }) => {
  return { currentUser: user.currentUser };
})(PersonalCenter);
