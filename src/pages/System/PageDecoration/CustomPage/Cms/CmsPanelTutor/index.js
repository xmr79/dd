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
import CmsUpdateImg from '@/pages/System/PageDecoration/CustomPage/Cms/CmsUpdateImg';

import CmsLink from '../CmsLink';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CmsTemplate = props => {
  const { handleChange, pIndex, list = [], mode, len, imgUrl } = props;
  const [defaultLen, setDefaultLen] = useState(len);

  return (
    <>
      <FormItem label="模式" {...staticLayouts}>
        <RadioGroup
          onChange={e => {
            handleChange('UPDATE', pIndex, { field: 'mode', data: e.target.value });
          }}
          value={mode}
        >
          <Radio value="MANUAL">手动填充列表</Radio>
          <Radio value="AUTO">自动填充列表</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="显示个数上限" {...staticLayouts}>
        <Input
          placeholder={`导师列表默认显示上限${defaultLen}个,可自定义`}
          style={{ width: 300 }}
          value={len}
          onChange={e => {
            handleChange('UPDATE', pIndex, { field: 'len', data: e.target.value });
          }}
        />
      </FormItem>
      {mode === 'MANUAL' ? (
        <FormItem label="列表" {...staticLayouts}>
          <div className="cms-panel-list">
            {list.map((item, index) => {
              return (
                <CmsListItem key={index} index={index} {...props}>
                  {/* <UploadImg
                      value={imgUrl}
                      text="上传"
                      listType="picture-card"
                      onChange={url=> {handleChange('UPDATE', pIndex, { index, field: ['list', 'imgUrl'], data: url[0] })}}
                    /> */}
                  <div>
                    <CmsLink pIndex={pIndex} enble={['TUTOR']} index={index} {...item} {...props} />
                  </div>
                </CmsListItem>
              );
            })}
          </div>
        </FormItem>
      ) : null}
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
