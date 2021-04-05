/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, BackTop, Breadcrumb } from 'antd';
import styles from './index.less';
import { useIntl } from 'umi';
const Content = props => {
  const { pathname, children, title, isTitle = false, isCard = true } = props;
  const contentRef = useRef(null);
  const BreadcrumbRender = props => {
    const intl = useIntl();
    const { formatMessage } = intl;
    const { pathname, title } = props;
    const list = [];
    const splitPaths = pathname.split('/').slice(1);
    const home = 'menu.home';
    let curPath = 'menu';

    for (let i = 0; i < splitPaths.length; i++) {
      if (splitPaths[i]) {
        curPath = `${curPath}.${splitPaths[i]}`;
        list.push(curPath);
      }
    }
    if (list.length > 0 && isTitle) {
      const pageTitle = formatMessage({ id: list[list.length - 1] });
      document.title = pageTitle + ' - ' + title;
    }

    return (
      <Breadcrumb>
        {list.map(item => (
          <Breadcrumb.Item key={item}>{formatMessage({ id: item })}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };
  return (
    <>
      <div className={styles.content} ref={contentRef}>
        <div className={styles.content_c}>
          {isCard ? <Card bordered={false}>{children}</Card> : children}
        </div>
      </div>
      <BackTop target={() => contentRef.current} visibilityHeight={200} duration={150} style={{ right: '28px' }} />
    </>
  );
};
export default Content;
