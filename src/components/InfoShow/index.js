/**
 * Author: wjw
 * Date:2020.4.16
 * Description:描述列表
 * @param {*渲染数据 格式：{ label: string,children: string|ReactNode}} lists
 * @param {*描述列表的标题} title
 * @param {*一行的 DescriptionItems 数量} column
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Descriptions, Row, Col } from 'antd';
import styles from './index.less';
import getItem from './map';
const InfoShow = props => {
  const {
    lists = [],
    title,
    column = 1,
    dispatch,
    layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    },
  } = props;
  return (
    <>
      <div className={styles.infoShowcon}>
        <Row align="middle">
          {lists
            .filter(item => item)
            .map((_, idx) => {
              const { label, children, span } = getItem(_, dispatch);
              return (
                <Col key={idx} span={span ? 24 / span : 24 / column}>
                  <Row type="flex" className="mb-10" gutter={12} align="middle">
                    <Col span={layout ? layout.labelCol.span : null} className={styles.label}>
                      {label ? `${label}:` : ''}
                    </Col>
                    <Col span={layout ? layout.wrapperCol.span : null}> {children}</Col>
                  </Row>
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
};
export default InfoShow;
