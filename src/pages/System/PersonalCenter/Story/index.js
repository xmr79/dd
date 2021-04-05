/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, message, Tooltip } from 'antd';
import BraftEditor from 'braft-editor';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import EditorFormItem from '@/components/FormItems/EditorFormItem';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const formItemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 12 } };
const Story = props => {
  const { dispatch, loading, storyInfo } = props;
  const handleSubmit = values => {
    const { details, circleImg, commonProblems } = values;
    if (details.toHTML() === '<p></p>') {
      message.error('故事简介不能为空');
      return false;
    }
    dispatch({
      type: 'personalCenter/updateperson',
      payload: {
        details: details.toHTML(),
        circleImg: circleImg.join(','),
        commonProblems,
      },
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({ type: 'personalCenter/getDetails' });
  }, []);

  useEffect(() => {
    if (storyInfo) {
      const { details, commonProblems, circleImg } = storyInfo;
      form.setFieldsValue({
        details: BraftEditor.createEditorState(details),
        circleImg: circleImg ? circleImg.split(',') : [],
        commonProblems,
      });
    }
  }, [storyInfo]);
  return (
    <>
      <Form className="FormLayout" form={form} onFinish={handleSubmit} {...formItemLayout}>
        <h1>
          专家主页
          <Tooltip title={<div>将用于小程序端专家主页展示，请合理填写相关内容</div>}>
            <InfoCircleOutlined className="ml-10" />
          </Tooltip>
        </h1>
        <EditorFormItem label="故事简介" name="details" required />
        <UploadImgsFormItem
          required={false}
          label={
            <div>
              加入圈子
              <Tooltip
                title={<div>微信群聊二维码7天有效，建议添加微信个人号二维码，与用户交流互动</div>}
              >
                <InfoCircleOutlined className="ml-10" />
              </Tooltip>
            </div>
          }
          name="circleImg"
          extra="支持jpg/png格式，大小不能超过400K，建议尺寸320PX*320PX"
          max={1}
          placeholder="请上传图片"
        />

        <div className="FormSavebtn">
          <Button type="primary" loading={loading} htmlType="submit">
            保存
          </Button>
        </div>
      </Form>
    </>
  );
};
export default connect(({ personalCenter }) => {
  return {
    storyInfo: personalCenter.storyInfo,
  };
})(Story);
