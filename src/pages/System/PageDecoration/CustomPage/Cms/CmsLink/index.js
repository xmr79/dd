/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Select, Form, Input } from 'antd';
import { enumLinkType } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';

import { getDataType } from '@/utils/utils';
const { Option } = Select;

const CmsTemplate = props => {
  const {
    pIndex,
    handleChange,
    index,
    list,
    enble = enumLinkType.map(item => item.key),
    dispatch,
    placeHolderInput = '',
  } = props;

  const temp = getDataType(list) === 'Array';
  const linkId = temp ? list[index].linkId : props.linkId;
  const linkType = temp ? list[index].linkType : props.linkType;
  const linkShow = temp ? list[index].linkShow : props.linkShow;
  const onChange = linkType => {
    switch (linkType) {
      case 'ACTIVITY': {
        handleChange('UPDATE', pIndex, { index, field: ['list', 'linkShow'], data: '活动列表' });
        break;
      }
      case 'ACTIVITY_DETAIL': {
        handleAdd('MODAL_CMS_SELECT_LINK', { ...props, linkId, linkType });
        break;
      }
      case 'ARTICLE': {
        handleChange('UPDATE', pIndex, { index, field: ['list', 'linkShow'], data: '内容列表' });
        break;
      }
      case 'ARTICLE_DETAIL': {
        handleAdd('MODAL_CMS_SELECT_LINK', { ...props, linkId, linkType });
        break;
      }
      case 'TOPIC': {
        handleChange('UPDATE', pIndex, { index, field: ['list', 'linkShow'], data: '话题列表' });
        break;
      }
      case 'TOPIC_DETAIL': {
        handleAdd('MODAL_CMS_SELECT_LINK', { ...props, linkId, linkType });
        break;
      }
      case 'ORGAN': {
        handleChange('UPDATE', pIndex, { index, field: ['list', 'linkShow'], data: '企业列表' });
        break;
      }
      case 'ORGAN_DETAIL': {
        handleAdd('MODAL_CMS_SELECT_LINK', { ...props, linkId, linkType });
        break;
      }
      case 'EXPERT': {
        handleChange('UPDATE', pIndex, { index, field: ['list', 'linkShow'], data: '专家列表' });
        break;
      }
      case 'EXPERT_DETAIL': {
        handleAdd('MODAL_CMS_SELECT_LINK', { ...props, linkId, linkType });
        break;
      }
      case 'CMS': {
        handleAdd('MODAL_CMS_SELECT_LINK', { ...props, linkId, linkType });
        break;
      }
      case 'COLLECTION': {
        handleChange('UPDATE', pIndex, {
          index,
          field: ['list', 'linkShow'],
          data: '意见征集页面',
        });
        break;
      }
      case 'TUTOR': {
        handleAdd('MODAL_CMS_SELECT_LINK', { ...props, linkType });
        break;
      }
    }
    handleChange('UPDATE', pIndex, { index, field: ['list', 'linkType'], data: linkType });
  };
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  return (
    <>
      <Input.Group compact>
        <Select
          placeholder="请选择"
          style={{ width: 120 }}
          value={linkType}
          onChange={value => {
            onChange(value);
          }}
        >
          {enumLinkType.map((item, index) => {
            const { key, value, disabled } = item;
            if (!disabled && enble.includes(key)) {
              return (
                <Option key={key} value={key}>
                  <span
                    onClick={() => {
                      if (linkType === key) onChange(key);
                    }}
                  >
                    {value}
                  </span>
                </Option>
              );
            }
          })}
        </Select>
        <Input
          style={{ width: 200 }}
          placeholder={placeHolderInput}
          value={linkShow}
          disabled={true}
        />
      </Input.Group>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
