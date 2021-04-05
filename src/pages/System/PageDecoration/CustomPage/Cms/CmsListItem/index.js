/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button } from 'antd';
import { DragOutlined, DeleteOutlined } from '@ant-design/icons';

const CmsTemplate = props => {
  const { children, handleChange, pIndex, index, showHandle, list } = props;
  return (
    <div className="cms-panel-list-item">
      {children}
      {
        showHandle && list.length > 1 ? 
        <>
          <DragOutlined />
          <DeleteOutlined onClick={()=> {handleChange('DELETE', pIndex, { field: 'list', index })}} />
        </>
        : null
      }
    </div>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
