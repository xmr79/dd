/**
 * Author: wjw
 * Date:2020.4.16
 * Description:上传图片组件
 * @param {*图片url} value
 * @param {*上传图片文件变化时的回调} onChange
 * @param {*按钮text} text
 */
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { connect } from 'umi';
import { Card, Button, Upload, message, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { urlConfig } from '@/common';
import defaultSettings from '../../../config/defaultSettings';

const { tokenKey } = defaultSettings;
const action = 'upload/uploadImg';
const serverURL = `${urlConfig.URL_API}${action}`;
// 上传图片的配置
const token = window.localStorage.getItem(tokenKey) || '';
const setting = {
  withCredentials: true,
  headers: {
    token,
  },
};
const UploadImg = forwardRef((props, ref) => {
  const { value, onChange, text = '上传文件', disabled, dispatch, upImgloading } = props;
  const [loading, setloading] = useState(false);
  const [imageUrl, setimageUrl] = useState(value);
  useEffect(() => {
    if (value) {
      setimageUrl(value);
    }
  }, [value]);
  useEffect(() => {
    if (imageUrl && value !== imageUrl && imageUrl !== 'uploading') {
      onChange(imageUrl);
    }
  }, [imageUrl]);
  useEffect(() => {
    dispatch({
      type: 'common/changeState',
      payload: { upImgloading: loading },
    });
  }, [loading]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{text}</div>
    </div>
  );
  // 图片校验
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('支持jpg、png格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M!');
    }
    return isJpgOrPng && isLt2M;
  };
  // 上传图片
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setloading(true);
      setimageUrl('uploading');
      return;
    }
    if (info.file.status === 'done') {
      const res = info.file.response;
      if (res.status === 1) {
        message.success('图片上传成功!');
        setimageUrl(res.data);
      } else if (res.status === 401) {
        window.location.href = '/user/login';
      } else {
        message.error('图片上传失败!');
      }
      setloading(false);
    }
  };

  return (
    <>
      <Upload
        disabled={disabled}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={serverURL}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        {...setting}
      >
        <Spin spinning={loading}>
          {imageUrl && imageUrl !== 'uploading' ? (
            <img src={imageUrl} alt="上传图片" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Spin>
      </Upload>
    </>
  );
});
export default connect(({ common }) => ({
  upImgloading: common.upImgloading,
}))(UploadImg);
