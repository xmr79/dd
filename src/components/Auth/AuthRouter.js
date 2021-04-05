/**
 * Auther: APIS
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import NoFoundPage from '@/pages/404';

/**
 * 路由权限控制
 * 路由权限控制需要在路由配置里面对应的路由设置'auths'字段即可，支持字符串和数组，不需要加权限的路由不设置即可。
 * 原则上一个页面允许存在多个权限code，但是不允许一个code对应多个页面
 * @param {*} props
 */
const AuthRouter = props => {
  const { userAuths, routeMaps, path, children } = props;
  const currentAuths = routeMaps[path];

  let hasAuth = true;
  if (currentAuths) {
    if (Array.isArray(currentAuths)) {
      hasAuth = currentAuths.some(item => userAuths.includes(item));
    } else {
      hasAuth = userAuths.includes(currentAuths);
    }
  }

  return <>{hasAuth ? children : <NoFoundPage />}</>;
};
export default connect(({ user, settings }) => {
  return {
    userAuths: user.userAuths,
    routeMaps: settings.routeMaps,
  };
})(AuthRouter);
