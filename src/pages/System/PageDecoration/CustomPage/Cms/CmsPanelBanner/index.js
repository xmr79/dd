/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Radio, Switch } from 'antd';

import { staticLayouts } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import CmsListItem from '@/pages/System/PageDecoration/CustomPage/Cms/CmsListItem';
import CmsListItemSortable from '@/pages/System/PageDecoration/CustomPage/Cms/CmsListItemSortable';
// import UploadImg from '@/components/UploadImg';
import CmsUpdateImg from '@/pages/System/PageDecoration/CustomPage/Cms/CmsUpdateImg';

import CmsLink from '../CmsLink';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const mapPicsLen = {
  1: {
    img: 'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/ys1.png',
  },
  2: {
    img: 'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/ys2.png',
  },
};
const CmsTemplate = props => {
  const {
    handleChange,
    pIndex,
    list = [],
    height,
    mode = 1,
    shadow,
    dispatch,
    showHeading,
  } = props;
  const [defaultHeight, setDefaultHeight] = useState(height);
  const onChangeMode = mode => {
    handleChange('UPDATE', pIndex, { field: 'mode', data: mode });
  };
  return (
    <>
      <FormItem label="模式" {...staticLayouts}>
        <RadioGroup
          onChange={e => {
            onChangeMode(e.target.value);
          }}
          value={mode}
        >
          <Radio value={1}>样式1</Radio>
          <Radio value={2}>样式2</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="示例" {...staticLayouts}>
        <div className="pics-demo">
          <img src={mapPicsLen[mode].img} />
        </div>
      </FormItem>
      {mode === 1 && (
        <>
          <FormItem label="高度" {...staticLayouts}>
            <Input
              placeholder={`轮播图默认高度${defaultHeight}px,可自定义`}
              style={{ width: 300 }}
              value={height}
              onChange={e => {
                handleChange('UPDATE', pIndex, { field: 'height', data: e.target.value });
              }}
            />
          </FormItem>
          <FormItem {...staticLayouts} label="是否添加阴影">
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={shadow}
              onChange={checked => {
                handleChange('UPDATE', pIndex, { field: 'shadow', data: checked });
              }}
            />
          </FormItem>
        </>
      )}
      <FormItem {...staticLayouts} label="是否显示标题">
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={showHeading}
          onChange={checked => {
            handleChange('UPDATE', pIndex, { field: 'showHeading', data: checked });
          }}
        />
      </FormItem>
      <FormItem label="轮播图" {...staticLayouts}>
        <CmsListItemSortable pIndex={pIndex}>
          {list.map((item, index) => {
            const { imgUrl, cId, bannelTitle } = item;
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
                    placeholder="请输入标题"
                    style={{ width: 319 }}
                    value={bannelTitle}
                    onChange={e => {
                      handleChange('UPDATE', pIndex, {
                        index,
                        field: ['list', 'bannelTitle'],
                        data: e.target.value,
                      });
                    }}
                  />
                  <CmsLink pIndex={pIndex} index={index} {...props} />
                </div>
              </CmsListItem>
            );
          })}
        </CmsListItemSortable>
      </FormItem>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
