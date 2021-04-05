/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Row, Col } from 'antd';
import styles from '../index.less';
const AlertLogout = props => {
  const { dispatch, basicInfo } = props;

  const handle = () => {
    history.push('/system/personalCenter/accountLogout?step=1&isSq=1');
  };
  return (
    <div className={styles.con}>
      <div className={styles.tscon}>
        注销提醒
        <p>尊敬的用户，您好：</p>
        <p>当您进入这个页面，意味着您正在申请注销一品杭账号，请注意以下提示信息。</p>
        <p>提示：</p>
        <p>1.请确保所有活动均已结束；</p>
        <p>2.请确保所有订单均已结算完成</p>
        <p>3.注销账号后，将不能再登录并使用一品杭平台，请提前做好历史数据备份；</p>
      </div>

      <Button style={{ width: '150px' }} type="primary" onClick={handle}>
        申请注销
      </Button>
    </div>
  );
};
export default connect(({ personalCenter, global }) => {
  return {
    dataModal: global.dataModal,
  };
})(AlertLogout);
