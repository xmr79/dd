import moment from 'moment';
import React, { useState, useEffect, forwardRef, Fragment, useImperativeHandle } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Table, Button, Card, Divider, Popover, Row, Col, Badge, Tag, Typography } from 'antd';
import AuthBlock from '@/components/Auth/AuthBlock';
const { Paragraph } = Typography;
/**
 * 处理Columns
 * @param {*列描述数据对象} columns
 */
export default function getColumns(columns, dispatch) {
  const handleAdd = (modalType, r) => {
    const payload = {
      preImgDataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    if (dispatch) {
      dispatch({ type: 'global/changeState', payload });
    }
  };
  return columns.map((_, index) => {
    let obj = {};
    switch (_.valueType) {
      //状态类型
      case 'statusdata':
        const {
          valueEnum = [],
          styleType = 'Badge',
          refuseCause,
          customRefuseCause,
          remark,
          valueEnumKey = 'value',
        } = _;

        if (valueEnum) {
          obj = {
            render(t, r, idx) {
              const obj = valueEnum.filter((item, index) => {
                return item.key === t;
              })[0];
              return obj ? (
                <>
                  {(() => {
                    switch (styleType) {
                      case 'Tag':
                        return <Tag color={obj.color}>{obj[valueEnumKey]}</Tag>;
                      case 'Badge':
                        return (
                          <Badge color={obj.color ? obj.color : '#d9d9d9'} text={obj[valueEnumKey]}></Badge>
                        );
                      case 'none':
                        return obj[valueEnumKey];
                    }
                  })()}

                  {obj.isrefuse ? (
                    <Popover
                      content={
                        <div className={styles.refuseCause}>
                          {customRefuseCause ? customRefuseCause(r) : r[refuseCause]}
                        </div>
                      }
                    >
                      <QuestionCircleOutlined className="ml-5" />
                    </Popover>
                  ) : (
                    ''
                  )}
                  {remark && <div>{remark(t, r)}</div>}
                </>
              ) : (
                '--'
              );
            },
          };
        }
        break;

      //日期类型
      case 'dateTime':
        const { format } = _;
        obj = {
          render(t, r, idx) {
            return t ? (
              format ? (
                moment(t).format(format)
              ) : (
                <span>
                  {moment(t).format('YYYY-MM-DD')}
                  <br />
                  {moment(t).format('HH:mm:ss')}
                </span>
              )
            ) : (
              '--'
            );
          },
        };
        break;
      //
      case 'tip':
        const { isCopy, trender } = _;
        obj = {
          render(t, r, idx) {
            const n = trender ? trender(t, r, idx) : t;
            return t ? (
              <Popover
                content={<div style={{ maxWidth: '300px', wordBreak: 'break-all' }}>{n}</div>}
              >
                <Paragraph
                  style={{ width: _.width - 30, margin: '0 auto', cursor: 'pointer' }}
                  copyable={isCopy ? { text: n } : false}
                  ellipsis={{ rows: 1 }}
                >
                  {n}
                </Paragraph>
              </Popover>
            ) : (
              '--'
            );
          },
        };
        break;
      //图片列表类型
      case 'imglists':
        const { crender } = _;
        obj = {
          render(t, r, idx) {
            const cimgs = crender ? crender(t, r) : null;
            const arr = cimgs ? cimgs : t ? (Array.isArray(arr) ? t : t.split(',')) : [];
            return (
              <div className={styles.itemul}>
                {arr.map((i, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        handleAdd('PREVIEWIMG', { imgUrl: i });
                      }}
                      className={styles.itemimg}
                    >
                      <img src={i} />
                    </div>
                  );
                })}
              </div>
            );
          },
        };
        break;
      //审核时间类型
      case 'verifyTime':
        const { verifyUser } = _;
        obj = {
          render(t, r, idx) {
            return (
              <div>
                <div>{r[verifyUser]}</div>
                <div>{t ? moment(t).format('YYYY-MM-DD HH:mm:ss') : '--'}</div>
              </div>
            );
          },
        };
        break;
      //操作类型
      case 'action':
        const { btns, rowSpan = 2 } = _;
        obj = {
          fixed: 'right',
          width: 150,
          render(t, r) {
            let lists = btns(r);
            lists = lists.filter(_ => {
              const { condition } = _;
              return (!condition || condition.val.includes(r[condition.dataindex])) && _;
            });
            return lists.length ? (
              <Row justify="center" className={styles.btnStyle}>
                {lists.map((item, idx) => {
                  const { btnname, handleClick, ref, authority, isDis = false } = item;
                  return (
                    <AuthBlock auth={authority} key={idx}>
                      {ref ? (
                        ref
                      ) : (
                        <>
                          <Col style={lists.length > 1 ? { flex: `0 0 ${100 / rowSpan}%` } : {}}>
                            <a style={isDis ? { color: '#ccc' } : {}} onClick={handleClick}>
                              {btnname}
                            </a>
                          </Col>
                          {/* <Col>
                            {rowSpan > 1 && !(idx % rowSpan) && <Divider type="vertical" />}
                          </Col> */}
                        </>
                      )}
                    </AuthBlock>
                  );
                })}
              </Row>
            ) : (
              <div>--</div>
            );
          },
        };
        break;
      default:
        obj = {
          render(t, r, idx) {
            return t === 0 || t ? t : '--';
          },
        };
    }
    return {
      align: 'center',
      ...obj,
      ..._,
    };
  });
}
