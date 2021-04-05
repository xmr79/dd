/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Tabs, Dropdown, Menu, Badge, Spin } from 'antd';
import styles from './index.less';
import classnames from 'classnames';
import { msgStatus, msgType } from '@/components/NoticeIcon';
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const List = props => {
  const {
    data: { data = [], totalItem = 0 },
    emptyText = '',
    showClear = true,
    onClear,
    clearText,
    title,
    onStatusChange,
    onRead,
    tabKey,
    handleMore,
    loading = false,
  } = props;
  const NeedHandleContect = props => {
    const { item } = props;
    const handleClick = e => {
      onStatusChange(item, e.key);
    };
    const menu = (
      <Menu onClick={handleClick}>
        {msgStatus
          .filter(_ => _.key !== 'WAIT_PROCESS' && _.key !== 'PROCESSED')
          .map((itm, idx) => {
            return <Menu.Item key={itm.key}>标记为{itm.value}</Menu.Item>;
          })}
      </Menu>
    );
    const status = msgStatus.filter(_ => _.key === item.status)[0];
    const typearr = msgType.filter(_ => _.key === item.type);
    const type = typearr.length === 1 ? typearr[0].value : '--';
    const link = typearr.length === 1 ? typearr[0].link : '--';
    return (
      <div className={classnames(styles.contect)}>
        <div className={styles.title}>{type}</div>
        {item.status && (
          <div>
            {item.status === 'WAIT_PROCESS' ? (
              <Dropdown overlay={menu}>
                <div style={{ position: 'relative', paddingRight: '20px' }}>
                  <Badge color={status.color} text={status.value} />
                  <DownOutlined className={styles.statusdown} />
                </div>
              </Dropdown>
            ) : (
              <div>
                <div className="mr-20">
                  {status && <Badge color={status.color} text={status.value} />}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className={styles.notFound}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="not found"
        />
        <div>{emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.lists}>
        {data.map((_, idx) => {
          return (
            <div
              key={idx}
              className={classnames(styles.listitem, _.status === 'HAVE_READ' ? styles.read : '')}
              onClick={() => {
                if (_.status === 'UNREAD' && tabKey === 'NOTIFY') {
                  onRead && onRead(_);
                } else if (tabKey === 'WAIT_PROCESS') {
                  //待办消息跳转页面
                  const typearr = msgType.filter(item => item.key === _.type);
                  const link = typearr.length === 1 ? typearr[0].link : null;
                  if (link) {
                    history.push(link);
                  }
                }
              }}
            >
              <div className={styles.itemcon}>
                <NeedHandleContect item={_} idx={idx} />

                <div className={styles.time}>{_.content}</div>
                <div className={styles.time}>
                  {moment(_.createTime).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
            </div>
          );
        })}
        {totalItem > data.length && (
          <div className={styles.more}>
            {loading ? (
              <Spin />
            ) : (
              <Button type="link" onClick={handleMore}>
                查看更多
              </Button>
            )}
          </div>
        )}
      </div>
      <div onClick={onClear} className={styles.clearbtn}>
        {showClear ? (
          <div>
            {clearText}
            {title}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default List;
