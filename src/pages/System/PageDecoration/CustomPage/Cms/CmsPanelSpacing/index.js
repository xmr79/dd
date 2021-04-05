/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input } from 'antd';

import { staticLayouts } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import CmsListItem from '@/pages/System/PageDecoration/CustomPage/Cms/CmsListItem';
import UploadImg from '@/components/FormItems/UploadFormItem/UploadItem';

import CmsLink from '../CmsLink';

const FormItem = Form.Item;

const CmsTemplate = props => {
  const { handleChange, pIndex, height, color } = props;
  
  const [defaultHeight, setDefaultHeight] = useState(height);
  const [defaultColor, setDefaultColor] = useState(color);

  return (
    <>
      <FormItem label="间距高度" {...staticLayouts}>
        <Input
          placeholder={`间距高度默认${defaultHeight}px,可自定义`}
          style={{width: 300}} 
          value={height} 
          onChange={e=> {handleChange('UPDATE', pIndex, { field: 'height', data: e.target.value })}}
        />
      </FormItem>
      <FormItem label="间距色值" {...staticLayouts}>
        <Input
          placeholder={`间距背景色默认色值${defaultColor},可自定义`}
          style={{width: 300}} 
          value={color} 
          onChange={e=> {handleChange('UPDATE', pIndex, { field: 'color', data: e.target.value })}}
        />
      </FormItem>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
