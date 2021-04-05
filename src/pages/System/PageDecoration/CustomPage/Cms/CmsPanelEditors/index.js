/**
 * Author: APIS
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Select, Form, Switch } from 'antd';
import BraftEditor from 'braft-editor';

import { staticLayouts } from '@/pages/System/PageDecoration/CustomPage/Cms/constants';
import Editor from '@/components/FormItems/EditorFormItem/Editor';

const { Option } = Select;
const FormItem = Form.Item;

const onChange = data => {};

const CmsTemplate = props => {
  const { pIndex, handleChange, component = '<p></p>', dispatch } = props;

  return (
    <>
      <FormItem {...staticLayouts} label="内容">
        <Editor
          value={BraftEditor.createEditorState(component)}
          onChange={val => {
            handleChange('UPDATE', pIndex, { field: 'component', data: val });
          }}
          contentStyle={{ height: 400 }}
          dispatch={dispatch}
          isMedia={false}
        />
      </FormItem>
    </>
  );
};
export default connect(({}) => {
  return {};
})(CmsTemplate);
