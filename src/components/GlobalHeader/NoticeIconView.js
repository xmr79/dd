/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, memo } from 'react';
import { connect, history } from 'umi';
import { Card, Button, message, notification, Row, Col } from 'antd';
import NoticeIcon from '@/components/NoticeIcon';
import styles from './index.less';
import { noticeVoiceBroadcast } from '@/utils/utils';
import { msgStatus, msgType } from '@/components/NoticeIcon';
import { urlConfig } from '@/common';
const { wsUrl } = urlConfig;
let websocket;
import socket from '@/components/NoticeIcon/websocket.js';
const { fitType, Tab } = NoticeIcon;
let timer = null;
const NoticeIconView = props => {
  const {
    dispatch,
    needData,
    nocticeData,
    pwaitProcessCount,
    nunreadCount,
    currentUser: { username, id, userType },
    needPage,
    nocticePage,
    needloading,
    nocticeloading,
    userAuths,
    NoticeChecked,
  } = props;
  const getCount = () => {
    dispatch({ type: 'notice/msgCount' });
  };
  const getlistNotifyList = () => {
    dispatch({ type: 'notice/listNotifyList' });
  };
  const getlistWpList = () => {
    dispatch({ type: 'notice/listWpList' });
  };
  const update = () => {
    getCount();
    getlistNotifyList();
    getlistWpList();
  };

  useEffect(() => {
    if (!websocket && username && userAuths.length > 0) {
      const code = userType === 'SYSTEM' ? 'PPHZ' : id;
      const account = username;
      websocket = socket(wsUrl, onMessage, code, account);
      update();
    }

    return () => {};
  }, [username, userAuths]);

  //待处理消息跳转
  const handleWait = data => {
    const typearr = msgType.filter(item => item.key === data.type);
    const link = typearr.length === 1 ? typearr[0].link : null;
    if (link) {
      history.push(link);
    }
  };
  const onMessage = evt => {
    const res = JSON.parse(evt.data);
    const noticeStorage = localStorage.getItem('NoticeChecked');
    const noticeChecked = noticeStorage ? !!(noticeStorage - 0) : true;
    if (res.status === 200) {
      const { data = {} } = res;
      const { type, content, msgLogType, status, pushCount } = data;
      const typeList = fitType(userAuths);
      const ispush = typeList ? typeList.includes(type) : false;
      // 更新消息数,列表
      if (pushCount === 1) getCount();
      if (msgLogType === 'NOTIFY' && ispush) {
        if (pushCount === 1) {
          getlistNotifyList();
        }

        if (noticeChecked) {
          // 通知消息弹窗
          // notification.info({
          //   key: 'NOTIFY',
          //   description: content,
          //   message: '新消息通知',
          // });
          // html5文字转语音
          //语音播报
          // noticeVoiceBroadcast('您有新的消息通知');
        }
      } else if (msgLogType === 'WAIT_PROCESS' && ispush) {
        const message = `${msgStatus.filter(_ => _.key === status)[0].value}通知`;
        if (pushCount === 1) {
          getlistWpList();
        }
        if (noticeChecked) {
          // 待办消息弹窗
          // notification.info({
          //   key: 'WAIT_PROCESS',
          //   description: (
          //     <div className={styles.waitNotification}>
          //       <p>{content}</p>
          //       <Button
          //         type="primary"
          //         onClick={() => {
          //           handleWait(data);
          //         }}
          //       >
          //         立即处理
          //       </Button>
          //     </div>
          //   ),
          //   message,
          // });
          //语音播报
          // noticeVoiceBroadcast(`您有${message}`);
        }
      } else if (msgLogType === 'REFRESH') {
        update();
      }
    }
  };

  const handleNoticeClear = (title, key) => {
    message.success(`${'清空了'}${title}`);

    if (dispatch) {
      dispatch({
        type: 'notice/clearMsg',
        payload: {
          msgLogType: key,
        },
      });
    }
  };
  // 待办信息修改状态
  const onStatusChange = (item, status) => {
    const { id } = item;
    dispatch({
      type: 'notice/updateMsg',
      payload: {
        msgLogType: 'WAIT_PROCESS',
        account: username,
        id,
        status,
      },
    });
  };

  const onRead = async item => {
    const { id } = item;

    dispatch({
      type: 'notice/updateMsg',
      payload: {
        msgLogType: 'NOTIFY',
        account: username,
        id,
        status: 'HAVE_READ',
      },
    });
  };

  const handleMore = async key => {
    await dispatch({
      type: 'notice/changePage',
      payload: key === 'NOTIFY' ? { nocticePage: nocticePage + 1 } : { needPage: needPage + 1 },
    });
  };
  const onSwitchChange = checked => {
    dispatch({
      type: 'notice/changeNoticeCheckedState',
      payload: checked,
    });
  };
  return (
    <>
      <NoticeIcon
        className={styles.action}
        clearText="清空"
        onClear={handleNoticeClear}
        pwaitProcessCount={pwaitProcessCount}
        nunreadCount={nunreadCount}
        handleMore={handleMore}
        onSwitchChange={onSwitchChange}
        NoticeChecked={NoticeChecked}
      >
        <Tab
          tabKey="WAIT_PROCESS"
          title="待办"
          emptyText="你已完成所有待办"
          data={needData}
          onStatusChange={onStatusChange}
          loading={needloading}
          isHidden={userType !== 'SYSTEM'}
        />

        <Tab
          tabKey="NOTIFY"
          title="通知"
          emptyText="你已查看所有通知"
          data={nocticeData}
          onRead={onRead}
          loading={nocticeloading}
          isHidden={userType === 'SYSTEM'}
        />
      </NoticeIcon>
    </>
  );
};
export default connect(({ notice, user, loading }) => {
  return {
    NoticeChecked: notice.NoticeChecked,
    needData: notice.needData,
    nocticeData: notice.nocticeData,
    pwaitProcessCount: notice.pwaitProcessCount,
    nunreadCount: notice.nunreadCount,
    currentUser: user.currentUser,
    needPage: notice.needPage,
    nocticePage: notice.nocticePage,
    needloading: loading.effects['notice/listWpList'],
    nocticeloading: loading.effects['notice/listNotifyList'],
    userAuths: user.userAuths,
  };
})(NoticeIconView);
