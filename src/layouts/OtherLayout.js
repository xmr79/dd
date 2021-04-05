/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, useIntl } from 'umi';
import { Card, Button } from 'antd';
import styles from './OtherLayout.less';
import Header from '@/components/Header';
import { getMenuData } from '@ant-design/pro-layout';
const OtherLayout = props => {
  const {
    children,
    route,
    location: { pathname },
  } = props;
  const { routes = [] } = route;
  const intl = useIntl();
  const { formatMessage } = intl;
  const { breadcrumb } = getMenuData(routes);
  
  const list = ['/other/cms'];
  const ishidden = list.includes(pathname);

  function getTitle(obj) {
    let locale;
    const { pathname, breadcrumb } = obj;
    for (let key in breadcrumb) {
      if (key === pathname) {
        locale = breadcrumb[key].locale;
      }
    }
    return locale;
  }
  const ptitle = getTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
  });

  if (!ishidden) {
    document.title = ptitle ? formatMessage({ id: ptitle }) : '';
  }

  const isTitle = ishidden ? {} : { title: ptitle ? formatMessage({ id: ptitle }) : null };

  return (
    <div className={styles.container}>
      {!ishidden && <Header {...props} />}
      <div className={styles.content}>
        <Card className={styles.card} {...isTitle}>
          {children}
        </Card>
      </div>
    </div>
  );
};
export default connect(({}) => {
  return {};
})(OtherLayout);
