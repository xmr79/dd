/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Form, Row, Col } from 'antd';
import SortFormItem from '@/components/FormItems/SortFormItem';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import UploadImg from '@/components/UploadImg';
const SFUploadFile = forwardRef((props, ref) => {
  const { value = {}, onChange, disabled } = props;

  const { cardFrontUrl, cardReverseUrl } = value;

  const onsfzChange = (val, type) => {
    let obj = {
      ...value,
    };
    switch (type) {
      case 'cardFrontUrl':
        obj = {
          ...obj,
          cardFrontUrl: val,
        };
        break;

      default:
        obj = {
          ...obj,
          cardReverseUrl: val,
        };
        break;
    }
    onChange(obj);
  };
  return (
    <Row>
      <Col>
        <UploadImg
          disabled={disabled}
          text="上传身份证人像页照片"
          value={cardFrontUrl}
          onChange={val => {
            onsfzChange(val, 'cardFrontUrl');
          }}
        />
      </Col>
      <Col>
        <UploadImg
          disabled={disabled}
          text="上传身份证国徽页照片"
          value={cardReverseUrl}
          onChange={val => {
            onsfzChange(val, 'cardReverseUrl');
          }}
        />
      </Col>
    </Row>
  );
});
const FormItems = props => {
  const {} = props;
  const filesValidator = (rule, value = {}) => {
    const { cardFrontUrl, cardReverseUrl } = value;
    if (!cardFrontUrl && !cardReverseUrl) {
      return Promise.reject('请上传身份证照片!');
    } else if (cardFrontUrl === 'uploading' || cardReverseUrl === 'uploading') {
      return Promise.reject('上传中');
    } else if (!cardFrontUrl) {
      return Promise.reject('请上传身份证人像页照片!');
    } else if (!cardReverseUrl) {
      return Promise.reject('请上传身份证国徽页照片!');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <>
      <InputFormItem label="姓名" name="name" max={25} required isTestSpace={true} />
      <InputFormItem label="简介" name="intro" type="textArea" max={30} required />
      <SortFormItem
        required
        label="选择领域"
        name="categoryId"
        type="TERRITORY"
        mtype="customer"
        maxTag={3}
      />

      <UploadImgsFormItem
        required
        label="头像"
        name="avatarUrl"
        extra="支持jpg/png格式，大小不能超过400K，建议尺寸120PX*120PX"
        max={1}
      />
      <Form.Item
        label="上传身份证"
        name="files"
        extra="支持jpg、png格式，图片大小不能超过2M，请保持图片文字清晰。"
        required={false}
        rules={[
          {
            validator: filesValidator,
          },
        ]}
      >
        <SFUploadFile />
      </Form.Item>
    </>
  );
};
export default connect(({}) => {
  return {};
})(FormItems);
