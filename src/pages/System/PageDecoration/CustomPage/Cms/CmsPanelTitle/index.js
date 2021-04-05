/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Radio, Switch } from 'antd';

import { staticLayouts } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
// import UploadImg from '@/components/UploadImg';
import CmsUpdateImg from '@/pages/System/PageDecoration/CustomPage/Cms/CmsUpdateImg';

import CmsLink from '../CmsLink';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CmsTemplate = props => {
  const { handleChange, pIndex, mode, isMore, imgUrl, linkName } = props;

  return (
    <>
      <FormItem label="模式" {...staticLayouts}>
        <RadioGroup
          onChange={e => {
            handleChange('UPDATE', pIndex, { field: 'mode', data: e.target.value });
          }}
          value={mode}
        >
          <Radio value={0}>标题为文本</Radio>
          <Radio value={1}>标题为图片</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem {...staticLayouts} label="查看全部">
        <Switch
          checkedChildren="显示"
          unCheckedChildren="不显示"
          checked={isMore}
          onChange={checked => {
            handleChange('UPDATE', pIndex, { field: 'isMore', data: checked });
          }}
        />
      </FormItem>
      {mode ? (
        <FormItem {...staticLayouts} label="背景图片">
          {/* <UploadImg
            value={imgUrl}
            text="上传"
            onChange={url => {
              handleChange('UPDATE', pIndex, { field: 'imgUrl', data: url });
            }}
          /> */}
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
      ) : (
        <FormItem {...staticLayouts} label="标题文本">
          <Input
            placeholder="请输入标题文本"
            value={linkName}
            style={{ width: 319 }}
            onChange={e =>
              handleChange('UPDATE', pIndex, { field: 'linkName', data: e.target.value })
            }
          />
        </FormItem>
      )}
      {isMore ? (
        <FormItem {...staticLayouts} label="链接地址">
          <CmsLink pIndex={pIndex} {...props} placeHolderInput="标题文本" />
        </FormItem>
      ) : null}
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
