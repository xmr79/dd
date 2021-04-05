/**
 * Auther: APIS
 */
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
export const customLoadingParams = {
  indicator: (
    <img
      className="loading-img"
      src="https://youxuan-prod.oss-cn-zhangjiakou.aliyuncs.com/qintaoyouxuan/loading.gif"
    />
  ),
  delay: 50,
};
const Loading = props => {
  const { loading } = props;

  return <Spin spinning={loading} className="wrap-loading"></Spin>;
};
export default Loading;
