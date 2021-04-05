/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col } from 'antd';
import CmsMenu from './CmsMenu';
import CmsPage from './CmsPage';
const Cms = props => {
  const {} = props;
  return (
    <div className="cms-container">
      <CmsMenu />
      <CmsPage />
    </div>
  );
};
export default connect(({}) => {
  return {};
})(Cms);
