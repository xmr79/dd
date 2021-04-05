/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button } from 'antd';
import styles from './index.less';
import fail from '@/assets/login/fail.png';
import audit from '@/assets/login/audit.png';
import { aduitStatus } from '@/constants';
const Result = props => {
  const {
    location: {
      pathname,
      query: { mobile, role, islogin },
    },
    dispatch,
    authRes,
    currentUser,
  } = props;
  const { id, dataMenus } = currentUser;
  const { refusalReason, authStatus, changeProposal } = authRes;
  useEffect(() => {
    if (islogin === '1') {
      dispatch({ type: 'user/fetchCurrent' });
    }
    dispatch({
      type: 'user/getAuthStatus',
      payload: {
        mobile,
      },
    });
  }, []);
  const handleReload = () => {
    dispatch({
      type: 'user/getAuthStatus',
      payload: {
        mobile,
      },
    });
  };
  useEffect(() => {
    if (authStatus === 'AUTH_SUCCESS') {
      if (id) {
        dispatch({ type: 'user/fetchCurrent', payload: { isUpdate: true } });
        history.replace({ pathname: dataMenus[0].path });
      } else {
        history.replace('/user/login');
      }
    }
  }, [authStatus]);
  return (
    <>
      {authStatus === 'AUTH_FAIL' && (
        <div className={styles.con}>
          <img src={fail} alt="" />
          <div className={styles.status}>审核失败</div>
          <p>原因：{refusalReason}</p>
          {changeProposal && <p>修改建议：{changeProposal}</p>}
          <Button
            type="link"
            onClick={() => {
              const path =
                pathname === '/other/expertResult' ? '/other/expertInfo' : '/other/enterpriseInfo';
              history.push({
                pathname: path,
                query: {
                  mobile,
                  isEdit: '1',
                  islogin: id ? '1' : '0',
                },
              });
            }}
          >
            修改认证>
          </Button>
        </div>
      )}
      {authStatus === 'AUTHING' && (
        <div className={styles.con}>
          <img src={audit} alt="" />
          <div className={styles.status}>审核中</div>
          <p>你的认证资料正在审核中，请耐心等待</p>
          <div>
            点击
            <a className="abluecolor" onClick={handleReload}>
              刷新
            </a>
          </div>
        </div>
      )}
    </>
  );
};
export default connect(({ user }) => {
  return { authRes: user.authRes, currentUser: user.currentUser };
})(Result);
