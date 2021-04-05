import moment from 'moment';
import React, { useState, useEffect, forwardRef, Fragment, useImperativeHandle } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Table, Button, Card, Divider, Popover, Row, Col, Badge } from 'antd';
import AuthBlock from '@/components/Auth/AuthBlock';
/**
 * 处理Columns
 * @param {*列描述数据对象} columns
 */
export default function getItem(item, dispatch) {
  const { children, type } = item;

  const handleAdd = (modalType, r) => {
    const payload = {
      preImgDataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  switch (type) {
    case 'time':
      return {
        ...item,
        children: children ? moment(children).format('YYYY-MM-DD HH:mm:ss') : '--',
      };
      break;
    case 'imgs':
      const lists = typeof children === 'string' ? children.split(',') : children ? children : [];
      return {
        ...item,
        children: (
          <div className={styles.itemul}>
            {lists.map((_, idx) => {
              return (
                _ && (
                  <div
                    key={idx}
                    onClick={() => {
                      handleAdd('PREVIEWIMG', { imgUrl: _ });
                    }}
                    className={styles.itemimg}
                  >
                    <img src={_} key={idx} />
                  </div>
                )
              );
            })}
          </div>
        ),
      };
      break;
    case 'statusdata':
      const { valueEnum = [], styleType = 'Badge' } = item;
      if (valueEnum) {
        const obj = valueEnum.filter((_, index) => {
          return _.key === item.children;
        })[0];
        return {
          ...item,
          children: (
            <>
              {item.children
                ? (() => {
                    switch (styleType) {
                      case 'Tag':
                        return <Tag color={obj.color}>{obj.value}</Tag>;
                      case 'Badge':
                        return (
                          <Badge color={obj.color ? obj.color : '#d9d9d9'} text={obj.value}></Badge>
                        );
                      case 'none':
                        return obj.value;
                    }
                  })()
                : '--'}
            </>
          ),
        };
      }
      break;
    default:
      return {
        ...item,
        children: children === 0 || children ? children : '--',
      };
      break;
  }
}
