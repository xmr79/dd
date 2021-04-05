/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, message, Tooltip } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import AreaFormItem from '@/components/FormItems/AreaFormItem';
import BraftEditor from 'braft-editor';
import EditorFormItem from '@/components/FormItems/EditorFormItem';
import styles from './index.less';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const formItemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 12 } };
const CDetail = props => {
  const { dispatch, loading, storyInfo } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({ type: 'personalCenter/getDetails' });
  }, []);

  useEffect(() => {
    const {
      details,
      brandStory,
      experienceImg,
      brandCreater,
      province,
      city,
      district,
      address,
      traffic,
      tips,
      commonProblems,
      person,
      circleImg,
      companySlogan,
    } = storyInfo;

    if (details) {
      form.setFieldsValue({
        companySlogan,
        details: BraftEditor.createEditorState(details),
        brandStory: BraftEditor.createEditorState(brandStory),
        brandCreater: BraftEditor.createEditorState(brandCreater),
        person: BraftEditor.createEditorState(person),
        circleImg: circleImg ? circleImg.split(',') : [],
        experienceImg: experienceImg ? experienceImg.split(',') : [],
        ssq: {
          province,
          city,
          district,
        },
        address,
        traffic,
        tips,
        commonProblems,
      });
    }
  }, [storyInfo]);

  const handleSubmit = values => {
    const {
      ssq,
      details,
      brandStory,
      experienceImg = [],
      brandCreater,
      person,
      circleImg,
    } = values;
    if (!details || details.toHTML() === '<p></p>') {
      message.error('简介不能为空');
      return false;
    }
    if (!brandStory || brandStory.toHTML() === '<p></p>') {
      message.error('品牌故事不能为空');
      return false;
    }
    if (!brandCreater || brandCreater.toHTML() === '<p></p>') {
      message.error('品牌创始人不能为空');
      return false;
    }
    // if (!person || person.toHTML() === '<p></p>') {
    //   message.error('人物不能为空');
    //   return false;
    // }
    const payload = {
      ...values,
      details: details.toHTML(),
      brandStory: brandStory.toHTML(),
      brandCreater: brandCreater.toHTML(),
      person: person.toHTML(),

      circleImg: circleImg.join(','),
      experienceImg: experienceImg.join(','),
      ...ssq,
    };

    dispatch({
      type: 'personalCenter/updateperson',
      payload,
    });
  };
  return (
    <>
      <Form className={styles.FormLayout} form={form} onFinish={handleSubmit} {...formItemLayout}>
        <h1>
          企业主页
          <Tooltip title={<div>将用于小程序端企业主页展示，请合理填写相关内容</div>}>
            <InfoCircleOutlined className="ml-10" />
          </Tooltip>
        </h1>
        {/* <AreaFormItem
          label="地址"
          name="ssq"
          aname="address"
          required
          aplaceholder="请输入详情地址"
          wrapperCol={{ offset: 3, span: 12 }}
        /> */}
        <UploadImgsFormItem
          required
          label="体验点图片"
          name="experienceImg"
          extra="支持jpg/png格式，大小不能超过400K，建议尺寸120PX*120PX"
          max={10}
        />
        <InputFormItem label="企业标语" name="companySlogan" max={30} />
        <EditorFormItem label="简介" name="details" required />
        <EditorFormItem label="品牌创始人" name="brandCreater" required />
        <EditorFormItem label="品牌故事" name="brandStory" required />
        <EditorFormItem label="人物" name="person" required={false} />
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

        <InputFormItem
          label={
            <div>
              常见问题
              <Tooltip title={<div>不会在企业主页展示，可在此处编辑后用在活动详情页中</div>}>
                <InfoCircleOutlined className="ml-10" />
              </Tooltip>
            </div>
          }
          name="commonProblems"
          type="textArea"
          max={200}
          required={false}
          placeholder="请输入常见问题"
        />
        <div className={styles.FormSavebtn}>
          <Button type="primary" loading={loading} htmlType="submit">
            保存
          </Button>
        </div>
      </Form>
    </>
  );
};
export default connect(({ loading, personalCenter }) => {
  return {
    loading: loading.effects['personalCenter/updateperson'],
    storyInfo: personalCenter.storyInfo,
  };
})(CDetail);
