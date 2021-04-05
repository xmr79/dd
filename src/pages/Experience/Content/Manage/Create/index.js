/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import { Card, Button, Form, Tooltip, message, Modal } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import BraftEditor from 'braft-editor';
import EditorFormItem from '@/components/FormItems/EditorFormItem';
import SortFormItem from '@/components/FormItems/SortFormItem';
import ShareSets from '@/components/FormItems/ShareSets';
import RadioFormItem from '@/components/FormItems/RadioFormItem';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAudit from '@/pages/Modals/ModalAudit';
import { CONTENT_AUDIT_REASON } from '@/constants';
import RelationActive from '@/pages/Experience/Content/Manage/Create/RelationActive';
import ModalMaterial from '@/pages/Modals/ModalMaterial';
import { urlConfig } from '@/common';
import QRCode from 'qrcode.react';
import MaterialFormItem from '@/components/FormItems/MaterialFormItem';
const formItemLayout = { labelCol: { span: 3 }, wrapperCol: { span: 12 } };
const Create = props => {
  const {
    dispatch,
    loading,
    location: {
      query: { id, isLook, contentId },
    },
    contentDetail,
    currentUser: { userType },
  } = props;
  const { status } = contentDetail;
  const [form] = Form.useForm();
  useEffect(() => {
    if (contentId || id) {
      dispatch({ type: 'contentManage/getDetail', payload: { id, contentId } });
    }
    return () => {
      dispatch({ type: 'contentManage/changeState', payload: { contentDetail: {} } });
    };
  }, []);
  useEffect(() => {
    if ((contentId || id) && JSON.stringify(contentDetail) !== '{}') {
      const { details, shareImgUrl, imgUrl, category, tag, activity } = contentDetail;
      const initialValues = {
        ...contentDetail,
        categoryId: category.map(_ => _.id),
        tagId: tag.map(_ => _.id),
        activityId: activity,
        details: BraftEditor.createEditorState(details),
        // imgUrl: imgUrl ? [imgUrl] : [],
        // shareImgUrl: shareImgUrl ? [shareImgUrl] : [],
        imgUrl: imgUrl
          ? imgUrl.split(',').map(_ => {
              return { url: _ };
            })
          : [],
        shareImgUrl: shareImgUrl
          ? shareImgUrl.split(',').map(_ => {
              return { url: _ };
            })
          : [],
      };
      form.setFieldsValue(initialValues);
    }
  }, [contentDetail]);

  async function getFormValue(values, draft, isyulan) {
    const { details, shareImgUrl, imgUrl, activityId } = values;
    if (!draft && (!details || details.toHTML() === '<p></p>')) {
      message.error(`内容不能为空`);
      return false;
    }
    const payload = {
      id,
      contentId,
      ...values,
      details: details ? details.toHTML() : undefined,
      // imgUrl: imgUrl ? imgUrl.join(',') : '',
      imgUrl: imgUrl ? imgUrl.map(_ => _.url).join(',') : undefined,
      // shareImgUrl: shareImgUrl ? shareImgUrl.join(',') : '',
      shareImgUrl: shareImgUrl ? shareImgUrl.map(_ => _.url).join(',') : undefined,
      activityId: activityId ? activityId.map(_ => _.id) : undefined,
      draft,
    };
    if (isyulan) {
      const res = await dispatch({
        type: 'contentManage/contentPreview',
        payload,
      });
      return res;
    } else {
      const res = await dispatch({
        type: 'contentManage/contentRecordSave',
        payload,
      });
      return res;
    }
  }
  const handleSubmit = values => {
    getFormValue(values, false, false);
  };

  const onFinishFailed = (values, errorFields, outOfDate) => {
    console.log(values);
    message.error(values.errorFields[0].errors[0]);
  };

  const list = [
    {
      value: 'NORMAL',
      name: '普通文章',
    },
  ];
  if (userType === 'COMPANY') {
    list.push({
      value: 'PRESENTATION',
      name: (
        <span>
          发布会文章
          <Tooltip
            title={
              <div>
                入驻企业可创建发布会型文章，该类内容会在小程序端企业主页展示，促进用户产生品牌认知
              </div>
            }
          >
            <InfoCircleOutlined className="ml-10" />
          </Tooltip>
        </span>
      ),
    });
  }
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
  const handleShenHe = () => {
    const { status, title, category, tag, id } = contentDetail;
    const lists = [
      { label: '文章标题', children: title },
      {
        label: '文章分类',
        children: category ? category.map(_ => _.name).join('；') : '--',
      },
      {
        label: '文章标签',
        children: tag ? tag.map(_ => _.name).join('；') : '--',
      },
    ];
    handleAdd('AUDIT', { id, lists });
  };
  const handleAduit = val => {
    dispatch({
      type: 'contentAudit/contentRecordAudit',
      payload: {
        params: { ...val },
        reload: () => {
          history.go(-1);
        },
      },
    });
  };

  const handleSaveDraft = () => {
    const arr = form.getFieldsValue([
      'title',
      'shortTitle',
      'type',
      'categoryId',
      'tagId',
      'imgUrl',
      'details',
      'activityId',
      'shareTitle',
      'shareDes',
      'shareImgUrl',
    ]);
    if (!arr.title) {
      message.error('请填写标题');
      return false;
    }
    getFormValue(arr, true, false);
  };

  const handleYulan = async () => {
    form
      .validateFields()
      .then(async values => {
        const res = await getFormValue(values, true, true);
        const { data } = res;
        if (data) {
          const url = `${urlConfig.contentPreview}?status=WAIT_PUBLISH&id=${data}`;
          Modal.info({
            title: '打开微信小程序扫码预览',
            className: 'cms-code-preview',
            content: <QRCode value={url} />,
          });
        }
      })
      .catch(errorInfo => {
        message.error(errorInfo.errorFields[0].errors[0]);
      });
  };

  return (
    <>
      <ModalMaterial />
      {/* 文章审核弹窗 */}
      <ModalAudit handleAduit={handleAduit} title="文章" reasons={CONTENT_AUDIT_REASON} />
      <Form
        className="FormLayout"
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
        initialValues={{
          type: 'NORMAL',
        }}
      >
        <InputFormItem label="标题" name="title" max={50} required />
        <InputFormItem label="副标题" name="shortTitle" max={50} required={false} />
        <RadioFormItem label="文章类别" name="type" list={list} />
        <SortFormItem label="文章分类" name="categoryId" type="sort" mtype="content" required />
        <SortFormItem label="文章标签" name="tagId" type="tag" mtype="content" required />
        {/* <UploadImgsFormItem
          required
          label="封面图片"
          name="imgUrl"
          extra="支持jpg/png格式，大小不能超过400K，建议尺寸340PX*340PX"
          max={1}
        /> */}
        <MaterialFormItem
          required
          label="封面图片"
          name="imgUrl"
          extra="支持jpg/png格式，大小不能超过400K，建议尺寸340PX*340PX"
          max={1}
          type={1}
        />
        <EditorFormItem
          label="内容"
          name="details"
          required
          dispatch={dispatch}
          // required={false}
          isMedia={false}
        />
        <Form.Item label="关联活动" name="activityId" required={false}>
          <RelationActive />
        </Form.Item>

        {/* <SortFormItem
          label="关联活动"
          name="activityId"
          type="LIST"
          mtype="activeity"
          required={false}
          maxTag={4}
          open={false}
        /> */}
        <ShareSets isMaterial={true} />
        <div className="FormSavebtn">
          {isLook !== '1' && (
            <Button className="ml-10" onClick={handleSaveDraft}>
              保存为草稿
            </Button>
          )}

          {isLook !== '1' && (
            <Button className="ml-10" onClick={handleYulan}>
              预览
            </Button>
          )}

          {!isLook && (
            <Button type="primary" loading={loading} htmlType="submit">
              提交审核
            </Button>
          )}
          {status === 'AUTHING' && userType === 'SYSTEM' && (
            <Button className="ml-10" type="primary" onClick={handleShenHe}>
              审核
            </Button>
          )}
          <Button
            className="ml-10"
            onClick={() => {
              history.go(-1);
            }}
          >
            取消
          </Button>
        </div>
      </Form>
    </>
  );
};
export default connect(({ loading, contentManage, user }) => {
  return {
    loading: loading.effects['contentManage/contentRecordSave'],
    contentDetail: contentManage.contentDetail,
    currentUser: user.currentUser,
  };
})(Create);
