/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Select, Form, Input } from 'antd';
import { enumLinkType } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import UploadImg from '@/components/FormItems/MaterialFormItem/Item';

const CmsTemplate = props => {
  const { pIndex, onChange, index, dispatch, imgUrl } = props;
  return (
    <>
      <UploadImg
        style={{ width: '80px', height: '80px' }}
        value={imgUrl ? [{ url: imgUrl }] : []}
        text="上传"
        dispatch={dispatch}
        onChange={onChange}
        max={1}
      />
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
