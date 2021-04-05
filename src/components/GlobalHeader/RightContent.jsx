import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import { HELP_CENTER } from '@/common';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = props => {
  const {
    theme,
    layout,
    currentUser: { userType },
  } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <NoticeIconView />
      <Tooltip title="帮助中心">
        <a
          target="_blank"
          href={HELP_CENTER[userType]}
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined style={{ fontSize: '16px' }} />
        </a>
      </Tooltip>
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
    </div>
  );
};

export default connect(({ settings, user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  currentUser: user.currentUser,
}))(GlobalHeaderRight);
