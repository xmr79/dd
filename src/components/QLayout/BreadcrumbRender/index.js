/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, BackTop, Breadcrumb } from 'antd';
import { useIntl } from 'umi';

const styles = {
  paddingLeft: '20px',
  lineHeight: '64px'
};

const BreadcrumbRender = props => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const { pathname, title, isTitle = true } = props;
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
    <Breadcrumb style={styles}>
      {list.map(item => (
        <Breadcrumb.Item key={item}>{formatMessage({ id: item })}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbRender;
