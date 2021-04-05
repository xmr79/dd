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
import CmsListItemSortable from '@/pages/System/PageDecoration/CustomPage/Cms/CmsListItemSortable';

import UploadImg from '@/components/UploadImg';
import CmsUpdateImg from '@/pages/System/PageDecoration/CustomPage/Cms/CmsUpdateImg';
import CmsLink from '../CmsLink';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CmsTemplate = props => {
  const { handleChange, pIndex, list = [], mode, imgUrl } = props;
  return (
    <>
      <FormItem label="模式" {...staticLayouts}>
        <RadioGroup
          onChange={e => {
            handleChange('UPDATE', pIndex, { field: 'mode', data: e.target.value });
          }}
          value={mode}
        >
          <Radio value={0}>普通卡片列表</Radio>
          <Radio value={1}>瀑布流</Radio>
          <Radio value={2}>列表</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="列表" {...staticLayouts}>
        <div className="cms-panel-list">
          <CmsListItemSortable pIndex={pIndex}>
            {list.map((item, index) => {
              return (
                <CmsListItem key={index} index={index} {...props}>
                  {/* <UploadImg
                  value={imgUrl}
                  text="上传"
                  listType="picture-card"
                  onChange={url => {
                    handleChange('UPDATE', pIndex, {
                      index,
                      field: ['list', 'imgUrl'],
                      data: url[0],
                    });
                  }}
                /> */}
                  <CmsUpdateImg
                    imgUrl={item.imgUrl}
                    {...props}
                    onChange={url => {
                      handleChange('UPDATE', pIndex, {
                        index,
                        field: ['list', 'imgUrl'],
                        data: url && url.length > 0 ? url[0].url : '',
                      });
                    }}
                  />
                  <CmsLink
                    pIndex={pIndex}
                    enble={['ACTIVITY_DETAIL', 'ARTICLE_DETAIL']}
                    index={index}
                    {...props}
                  />
                </CmsListItem>
              );
            })}
          </CmsListItemSortable>
        </div>
      </FormItem>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
