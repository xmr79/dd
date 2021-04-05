/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Select, Form } from 'antd';
import { staticLayouts, modeCmsPanelSearch } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';



const { Option } = Select;
const FormItem = Form.Item;

const CmsTemplate = props => {
  const { pIndex, handleChange, mode } = props;

  return (
    <>
      <FormItem {...staticLayouts} label="搜索类型">
        <Select value={mode} style={{width: 200}} onChange={value=> {handleChange('UPDATE', pIndex, { field: 'mode', data: value })}}> 
          {
            modeCmsPanelSearch.map((item, index)=> {
              const { key, value } = item;
              return <Option key={key} value={key}>{value}</Option>
            })
          }
        </Select>
      </FormItem>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
