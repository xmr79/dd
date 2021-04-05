/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, message } from 'antd';
import BraftEditor from 'braft-editor';
import EditorFormItem from '@/components/FormItems/EditorFormItem';
import ShareSets from '@/components/FormItems/ShareSets';
import InputFormItem from '@/components/FormItems/InputFormItem';
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 12 } };

export const getdetailFormParams = ({ value, draft }) => {
  return new Promise((resolve, reject) => {
    const {
      brandStory,
      characterIntroduction,
      experienceProcess,
      experienceStore,
      activityDescription,
      commonProblems,
      traffic,
      tips,
      contact,
      shareTitle,
      shareDes,
      shareImgUrl,
    } = value;
    function getEditorHTNL(obj) {
      return obj.toHTML();
    }

    function EditorTS(arr) {
      let is = true;
      let msg = '';
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (!element.val || getEditorHTNL(element.val) === '<p></p>') {
          //   message.error(`${element.name}不能为空`);
          msg = `${element.name}不能为空`;
          is = false;
          break;
        }
      }
      return {
        is,
        msg,
      };
    }
    const objj = EditorTS([
      {
        name: '活动介绍',
        val: activityDescription,
      },
      {
        name: '体验点简介',
        val: experienceStore,
      },

      {
        name: '流程安排',
        val: experienceProcess,
      },
    ]);
    if (!draft && !objj.is) {
      message.error(objj.msg);
      return false;
    }
    const payload = {
      activityDetailVO: {
        brandStory: brandStory ? brandStory.toHTML() : undefined,
        experienceProcess: experienceProcess ? experienceProcess.toHTML() : undefined,
        experienceStore: experienceStore ? experienceStore.toHTML() : undefined,
        activityDescription: activityDescription ? activityDescription.toHTML() : undefined,
        characterIntroduction: characterIntroduction ? characterIntroduction.toHTML() : undefined,
        commonProblems,
        traffic,
        tips,
        contact,
      },
      sharingSettings: JSON.stringify({
        shareTitle,
        shareDes,
        shareImgUrl: shareImgUrl ? shareImgUrl.map(_ => _.url).join(',') : undefined,
      }),
    };
    resolve(payload);
  });
};
const DetailForm = props => {
  const { form, dispatch, isHuiXian, mobile, activityDetail } = props;
  useEffect(() => {
    dispatch({ type: 'personalCenter/getMobile' });
  }, []);
  useEffect(() => {
    if (!isHuiXian && mobile) {
      form.setFieldsValue({
        contact: mobile,
      });
    }
  }, [mobile]);

  useEffect(() => {
    if (isHuiXian && JSON.stringify(activityDetail) !== '{}') {
      const {
        activityDetailVO,

        sharingSettings = '{}',
      } = activityDetail;
      const sharingSettingsObj = JSON.parse(sharingSettings);
      const { shareTitle, shareDes, shareImgUrl } = sharingSettingsObj;

      const {
        brandStory,
        characterIntroduction,
        experienceProcess,
        experienceStore,
        activityDescription,
        commonProblems,
        traffic,
        tips,
        contact,
      } = activityDetailVO;
      const initialValues = {
        shareTitle,
        shareDes,
        // shareImgUrl: shareImgUrl ? [shareImgUrl] : [],
        shareImgUrl: shareImgUrl
          ? shareImgUrl.split(',').map(_ => {
              return { url: _ };
            })
          : [],

        brandStory: BraftEditor.createEditorState(brandStory),
        experienceStore: BraftEditor.createEditorState(experienceStore),
        activityDescription: BraftEditor.createEditorState(activityDescription),
        experienceProcess: BraftEditor.createEditorState(experienceProcess),
        characterIntroduction: BraftEditor.createEditorState(characterIntroduction),
        commonProblems,
        traffic,
        tips,

        contact,
      };
      form.setFieldsValue(initialValues);
    }
  }, [activityDetail]);
  return (
    <>
      <Form {...formItemLayout} form={form} name="detailForm">
        <EditorFormItem
          label="活动介绍"
          name="activityDescription"
          required
          dispatch={dispatch}
          isMedia={false}
        />
        <EditorFormItem
          label="体验点简介"
          name="experienceStore"
          required
          dispatch={dispatch}
          isMedia={false}
        />
        <EditorFormItem
          label="体验故事"
          name="brandStory"
          required={false}
          dispatch={dispatch}
          isMedia={false}
        />
        <EditorFormItem
          label="体验导师"
          name="characterIntroduction"
          required={false}
          dispatch={dispatch}
          isMedia={false}
        />
        <EditorFormItem
          label="流程安排"
          name="experienceProcess"
          required
          dispatch={dispatch}
          isMedia={false}
        />
        <InputFormItem label="交通方式" name="traffic" type="textArea" max={100} required={false} />
        <InputFormItem label="Tips" name="tips" type="textArea" max={200} required={false} />
        <InputFormItem
          label="常见问题"
          name="commonProblems"
          type="textArea"
          max={200}
          required={false}
        />
        {/* <h1>联系电话</h1> */}
        <InputFormItem
          name="contact"
          label="联系电话"
          required={true}
          placeholder={`例如13766668888`}
          max={30}
          rules={[{ required: true, message: '请填写联系电话' }]}
        />
        <ShareSets isMaterial={true} />
      </Form>
    </>
  );
};
export default connect(({ personalCenter, activityManage }) => {
  return { mobile: personalCenter.mobile, activityDetail: activityManage.activityDetail };
})(DetailForm);
