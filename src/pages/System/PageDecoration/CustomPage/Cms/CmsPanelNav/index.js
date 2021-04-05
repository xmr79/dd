/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Radio } from 'antd';

import { staticLayouts } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import CmsListItem from '@/pages/System/PageDecoration/CustomPage/Cms/CmsListItem';
// import UploadImg from '@/components/UploadImg';
import CmsUpdateImg from '@/pages/System/PageDecoration/CustomPage/Cms/CmsUpdateImg';
import CmsLink from '../CmsLink';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CmsTemplate = props => {
  const { handleChange, pIndex, list = [], mode } = props;

  return (
    <>
      <FormItem label="模式" {...staticLayouts}>
        <RadioGroup
          onChange={e => {
            handleChange('UPDATE', pIndex, { field: 'mode', data: e.target.value });
          }}
          value={mode}
        >
          <Radio value={1}>均分</Radio>
          <Radio value={2}>固定宽度,超出则横向滚动</Radio>
          <Radio value={3}>九宫格</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="导航列表" {...staticLayouts}>
        <div className="cms-panel-list">
          {list.map((item, index) => {
            const { cId, imgUrl, linkName, bannelTitle } = item;
            return (
              <CmsListItem key={cId} index={index} {...props}>
                {/* <UploadImg
                  value={imgUrl}
                  text="上传"
                  onChange={url => {
                    handleChange('UPDATE', pIndex, { index, field: ['list', 'imgUrl'], data: url });
                  }}
                /> */}
                <CmsUpdateImg
                  imgUrl={imgUrl}
                  {...props}
                  onChange={url => {
                    handleChange('UPDATE', pIndex, {
                      index,
                      field: ['list', 'imgUrl'],
                      data: url && url.length > 0 ? url[0].url : '',
                    });
                  }}
                />
                <div>
                  <Input
                    placeholder="请输入导航标题"
                    style={{ width: 319 }}
                    value={linkName}
                    onChange={e => {
                      handleChange('UPDATE', pIndex, {
                        index,
                        field: ['list', 'linkName'],
                        data: e.target.value,
                      });
                    }}
                  />
                  <CmsLink pIndex={pIndex} index={index} {...props} />
                </div>
              </CmsListItem>
            );
          })}
        </div>
      </FormItem>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
