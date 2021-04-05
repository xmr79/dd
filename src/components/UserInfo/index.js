/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Avatar } from 'antd';
import { UserOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import styles from './index.less';
const UserInfo = props => {
  const { info = {}, cinfo = {} } = props;

  const [obj, setObj] = useState({});

  useEffect(() => {
    if (JSON.stringify(info) !== '{}') {
      const { aliAvatarUrl, aliNickName, aliGender, wxAvatarUrl, wxGender, wxNickName } = info;
      let a = {};
      if (wxAvatarUrl) {
        a = {
          name: wxNickName,
          url: wxAvatarUrl,
          sex: wxGender,
        };
      } else {
        a = {
          name: aliNickName,
          url: aliAvatarUrl,
          sex: aliGender,
        };
      }
      setObj(a);
    }
  }, [info]);

  useEffect(() => {
    if (JSON.stringify(cinfo) !== '{}') {
      const { url, name, sex } = cinfo;
      let a = {};
      a = {
        name,
        url,
        sex,
      };
      setObj(a);
    }
  }, [cinfo]);

  const { name, sex, url } = obj;

  return (
    <>
      <Row align="middle" justify="center">
        {url && <Avatar size="small" src={url} />}
        {name && <div className={styles.name}> {name}</div>}
        {sex === 1 && <ManOutlined style={{ color: '#1890ff' }} />}
        {sex === 2 && <WomanOutlined style={{ color: '#eb2f96' }} />}
      </Row>
    </>
  );
};
export default connect(({}) => {
  return {};
})(UserInfo);
