/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Tabs, Avatar } from 'antd';
import ExpertComment from '@/pages/Customer/Manage/Enterprise/Detail/ExpertComment';
import Experience from '@/pages/Customer/Manage/Enterprise/Detail/Experience';
import Release from '@/pages/Customer/Manage/Enterprise/Detail/Release';
import styles from '@/pages/Customer/Manage/Enterprise/Detail/index.less';
import { arrayToObj } from '@/utils/utils';
import ModalExtension from '@/pages/Modals/ModalExtension'
import moment from 'moment';
import { COMPANYTYPE } from '@/constants';
const mapCOMPANYTYPE = arrayToObj(COMPANYTYPE, 'key');
const { TabPane } = Tabs;
const Detail = props => {
  const {
    dispatch,
    location: {
      query: { userId },
    },
    dataModal,
    usergetAuthDetails,
  } = props;
  const {
    details,
    brandCreater,
    brandStory,
    person,
    companySlogan,
    name,
    companyType,
    avatarUrl,
    category = [],
    intro,
  } = usergetAuthDetails;
  useEffect(() => {
    dispatch({
      type: 'customerManage/getUsergetAuthDetails',
      payload: {
        userId,
      },
    });
  }, []);

  const extensionClick = () => {
    const payload = {
      page: "pages/Tabber/platform/expert/index",
      scene: `id=${usergetAuthDetails.id}`,
      width: 200
    }
    dispatch({ type: 'global/getExtensionQrcode', payload }).then(res => {
      handleAdd('EXTENSION', { ...usergetAuthDetails, pageurl: `pages/Tabber/platform/expert/index?id=${usergetAuthDetails.id}` , pageimg: res.data });
    })
  }

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
      <div className={styles.con}>
        <Avatar size={64} src={avatarUrl} />
        <div className={styles.name}>{name}<Button type="primary" onClick={extensionClick} className={styles.extensionBtn}>推广</Button></div>
        <div className={styles.des}>{companySlogan}</div>
        <div className={styles.tags}>
          {category.map((_, idx) => {
            return (
              <div key={idx} className={styles.tag}>
                {_.name}
              </div>
            );
          })}
        </div>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="简介" key="1">
          <div dangerouslySetInnerHTML={{ __html: intro }}></div>
        </TabPane>

        <TabPane tab="点评" key="3">
          <ExpertComment id={userId} />
        </TabPane>

        {/* <TabPane tab="体验导师" key="6"></TabPane> */}
        <TabPane tab="创作" key="7">
          <Release id={userId} />
        </TabPane>
      </Tabs>
    </>
  );
};
const mapStateToProps = ({ global, user, personalCenter, common, contentManage }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(({ customerManage }) => {
  return {
    ...customerManage,
  };
})(Detail);
