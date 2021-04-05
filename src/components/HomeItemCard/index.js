/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button } from 'antd';
import styles from './index.less';
const HomeItemCard = props => {
  const { name, icon, count, des, bgcolor,url } = props;
  return (
    <div
      className={styles.con}
      style={{ background: bgcolor ? bgcolor : '#fff' }}
      onClick={() => {
        if (url) {
          history.push(url);
        }
      }}
    >
      <div className={styles.left}>
        <img src={icon} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>{name}</div>
        <div className={styles.count}>{count}</div>
        {des && <div className={styles.des}>{des}</div>}
      </div>
    </div>
  );
};
export default connect(({}) => {
  return {};
})(HomeItemCard);
