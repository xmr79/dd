/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, Link } from 'umi';
import { Card, Button } from 'antd';
import styles from './index.less';
import AvatarDropdown from '@/components/GlobalHeader/AvatarDropdown.jsx';
const Header = props => {
  const {
    currentUser,
    location: { pathname },
    logo,
  } = props;
  const list = ['/user/login', '/user/register', '/user/forget'];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerl}>
          <Link to={'/'}>
            <div className={styles.logotitle}>
              <img src={logo} alt="logo" />
              <div className={styles.title}> 一品杭管理后台</div>
            </div>
          </Link>
          {!list.includes(pathname) && currentUser.id && <AvatarDropdown />}
        </div>
      </div>
    </>
  );
};
export default connect(({ user, settings }) => {
  return {
    currentUser: user.currentUser,
    logo: settings.logo,
  };
})(Header);
