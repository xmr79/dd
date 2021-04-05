/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Badge, Row, Tabs, Spin, Switch } from 'antd';
import classNames from 'classnames';
import NoticeList from './NoticeList';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { BellOutlined } from '@ant-design/icons';
export const msgStatus = [
  {
    key: 'WAIT_PROCESS',
    value: '待处理',
    color: 'red',
  },
  {
    key: 'PROCESSING',
    value: '处理中',
    color: 'yellow',
  },
  {
    key: 'PROCESSED',
    value: '已处理',
    color: 'green',
  },
];
// 消息中心 消息类型
export const msgType = [
  {
    key: 'AUTH_COMPANY',
    value: '入驻企业',
    link: '/customer/audit/enterpriseAudit',
    auth: 'CUSTOMER_AUDIT_EXTERPRISEAUDIT',
  },
  {
    key: 'AUTH_EXPERT',
    value: '认证专家',
    link: '/customer/audit/expertAudit',
    auth: 'CUSTOMER_AUDIT_EXPERTAUDIT',
  },
  {
    key: 'UNSUBSCRIBE',
    value: '注销申请',
    link: '/customer/cancellation',
    auth: 'CUSTOMER_CANCELLATION',
  },
  {
    key: 'USER_RECOMMEND',
    value: '用户推荐',
    link: '/customer/recommend',
    auth: 'CUSTOMER_RECOMMEND',
  },
  {
    key: 'ACTIVITY_AUDIT',
    value: '活动审核',
    link: '/experience/activity/audit',
    auth: 'EXPERIENCE_ACTIVITY_AUDIT',
  },
  {
    key: 'CONTENT_AUDIT',
    value: '文章审核',
    link: '/experience/content/audit',
    auth: 'EXPERIENCE_CONTENT_AUDIT',
  },
  {
    key: 'EARNEST_MONEY',
    value: '保证金',
    link: '/system/bond?key=2',
    auth: 'SYSTEM_BOND',
  },
];
function fitType(userAuths, userType) {
  let arr = [];
  msgType.forEach(element => {
    if (userAuths.includes(element.auth) || !element.auth) {
      arr.push(element.key);
    }
  });
  if (userType !== 'SYSTEM') {
    arr.push('EARNEST_MONEY');
  }
  return arr.length > 0 ? arr : undefined;
}
const { TabPane } = Tabs;
const NoticeIcon = props => {
  const {
    className,
    count = 10,
    bell,
    children,
    clearText,
    onClear,
    pwaitProcessCount,
    nunreadCount,
    handleMore,
    NoticeChecked = true,
    onSwitchChange,
  } = props;

  const [visible, setVisible] = useState(false);
  const onTabChange = () => {};
  const notificationBox = () => {
    const { children } = props;
    if (!children) {
      return null;
    }
    const panes = [];
    React.Children.forEach(children, child => {
      const { tabKey, title, data, isHidden } = child.props;
      let count = 0;
      if (tabKey === 'WAIT_PROCESS') {
        count = pwaitProcessCount;
      } else {
        count = nunreadCount;
      }
      if (!isHidden) {
        panes.push(
          <TabPane tab={`${title}${count > 0 ? `(${count})` : ''}`} key={tabKey}>
            <NoticeList
              {...child.props}
              clearText={clearText}
              onClear={() => onClear && onClear(title, tabKey)}
              handleMore={() => handleMore && handleMore(tabKey)}
            />
          </TabPane>,
        );
      }
    });
    return (
      <>
        <Tabs className={styles.tabs} onChange={onTabChange}>
          {panes}
        </Tabs>
      </>
    );
  };

  const noticeButtonClass = classNames(className, styles.noticeButton);
  const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
  const trigger = (
    <span
      className={classNames(noticeButtonClass, {
        opened: visible,
      })}
    >
      <Badge
        count={pwaitProcessCount - 0 + nunreadCount - 0}
        style={{
          boxShadow: 'none',
        }}
        className={styles.badge}
      >
        {NoticeBellIcon}
      </Badge>
    </span>
  );
  const onSwChange = checked => {
    onSwitchChange(checked);
  };
  return (
    <Row align="middle">
      <HeaderDropdown
        placement="bottomRight"
        overlay={notificationBox()}
        overlayClassName={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={() => {
          setVisible(!visible);
        }}
      >
        {trigger}
      </HeaderDropdown>
      {/* <Switch
        checked={NoticeChecked}
        checkedChildren="消息提醒已开"
        unCheckedChildren="消息提醒已关"
        onChange={onSwChange}
      /> */}
    </Row>
  );
};

NoticeIcon.Tab = NoticeList;
NoticeIcon.fitType = fitType;
export default NoticeIcon;
