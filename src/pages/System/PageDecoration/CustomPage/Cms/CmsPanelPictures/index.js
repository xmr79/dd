/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Form, Input, Radio, Switch } from 'antd';

import {
  staticLayouts,
  mapCmsComponents,
} from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import { arrayToObj, objToArray, getUniqueId } from '@/utils/utils';
import CmsListItem from '@/pages/System/PageDecoration/CustomPage/Cms/CmsListItem';
// import UploadImg from '@/components/UploadImg';
import CmsUpdateImg from '@/pages/System/PageDecoration/CustomPage/Cms/CmsUpdateImg';
import { enumLinkType } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import CmsLink from '../CmsLink';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const mapPicsLen = {
  1: {
    len: 2,
    img: 'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/cms-pic1.png',
  },
  2: {
    len: 4,
    img: 'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/cms-pic2.png',
  },
  3: {
    len: 4,
    img: 'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/cms-pic3.png',
  },
  4: {
    len: 2,
    img: 'https://pphz-prod.oss-cn-hangzhou.aliyuncs.com/bos/cms-pic4.png',
  },
};

const CmsTemplate = props => {
  const { cIds, handleChange, pIndex, list = [], mode, showHeading } = props;
  const { list: listModel } = mapCmsComponents.PICTURES.dataModel;

  const getTargetModel = mode => {
    const cId = getUniqueId(cIds);
    cIds.push(cId);
    list.push({
      cId,
      ...listModel[0],
    });
    if (list.length < mapPicsLen[mode].len) {
      getTargetModel(mode);
    }
  };
  const onChangeMode = mode => {
    if (list.length < mapPicsLen[mode].len) {
      getTargetModel(mode);
    } else if (list.length > mapPicsLen[mode].len) {
      list.splice(0, list.length - mapPicsLen[mode].len);
    }

    handleChange('UPDATE', pIndex, { field: 'mode', data: mode });
    handleChange('UPDATE', pIndex, { field: 'list', data: list });
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
          <Radio value={3}>样式3</Radio>
          <Radio value={4}>样式4</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="示例" {...staticLayouts}>
        <div className="pics-demo">
          <img src={mapPicsLen[mode].img} />
        </div>
      </FormItem>
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
      <div className="cms-panel-list">
        {list.map((item, index) => {
          const { cId, imgUrl, bannelTitle } = item;
          return (
            <FormItem
              label={`图${index + 1}`}
              key={cId}
              {...staticLayouts}
              style={{ marginBottom: 0 }}
            >
              <CmsListItem index={index} {...props}>
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
                  <CmsLink
                    pIndex={pIndex}
                    index={index}
                    {...props}
                    enble={
                      mode === 1
                        ? enumLinkType.map(item => item.key)
                        : [
                            'ACTIVITY_DETAIL',
                            'ARTICLE_DETAIL',
                            'ORGAN_DETAIL',
                            'EXPERT_DETAIL',
                            'CMS',
                          ]
                    }
                  />
                </div>
              </CmsListItem>
            </FormItem>
          );
        })}
      </div>
    </>
  );
};

export default connect(({ customPage }) => {
  return {
    cIds: customPage.cIds,
  };
})(CmsTemplate);
