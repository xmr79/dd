/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Select, Form, Switch } from 'antd';

import { staticLayouts } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import CmsUpdateImg from '@/pages/System/PageDecoration/CustomPage/Cms/CmsUpdateImg';

const { Option } = Select;
const FormItem = Form.Item;

const CmsTemplate = props => {
  const { pIndex, handleChange, mode, imgUrl } = props;

  return (
    <>
      <FormItem {...staticLayouts} label="是否开启">
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={mode}
          onChange={checked => {
            handleChange('UPDATE', pIndex, { field: 'mode', data: checked });
          }}
        />
      </FormItem>
      <FormItem {...staticLayouts} label="背景图">
        <CmsUpdateImg
          imgUrl={imgUrl}
          {...props}
          onChange={url => {
            handleChange('UPDATE', pIndex, {
              field: 'imgUrl',
              data: url && url.length > 0 ? url[0].url : '',
            });
          }}
        />
      </FormItem>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
