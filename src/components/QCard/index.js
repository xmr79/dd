import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tooltip, Spin } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading';
import { getImgUrl } from '@/utils/utils';
const { Title } = Typography;

const QCard = props => {
  const {
    title,
    des,
    children,
    extra,
    loading = false,
    justify = 'space-between',
    icon,
    ...otherProps
  } = props;
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }} {...otherProps}>
      {/* <Loading loading={loading}  /> */}
      <Row className={styles.main} type="flex" justify={justify} align="middle">
        <Col>
          <Row type="flex" align="middle">
            {icon && (
              <Col>
                <img className={styles.imgicon} src={icon} alt="" />
              </Col>
            )}
            {title && (
              <Col>
                <div className={styles.title}>{title}</div>
              </Col>
            )}
            {des && (
              <Col>
                <Tooltip title={des}>
                  <ExclamationCircleOutlined style={{ color: '#666' }} />
                </Tooltip>
              </Col>
            )}
          </Row>
        </Col>
        {extra && <Col>{extra}</Col>}
      </Row>

      {children}
    </Card>
  );
};

export default QCard;
