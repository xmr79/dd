/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { uploadImg } from '@/services/common.js';
const UploadButton = props => {
  const { loading = false } = props;
  return (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  );
};
const Item = forwardRef((props, ref) => {
  const { value, onChange, disabled = false, max = 2, dispatch } = props;
  const [fileList, setfileList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      const list = value.map((_, idx) => {
        return {
          uid: idx,
          name: idx,
          url: _,
          status: 'done',
        };
      });
      setfileList(list);
    }
  }, [value]);

  const handleChange = info => {
    const isLt2M = info.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M!');
      return false;
    }
    setLoading(true);
    uploadImg(info).then(res => {
      if (res.status === 1) {
        const lists = value ? [...value, res.data] : [res.data];
        onChange(lists);
        setLoading(false);
      } else {
        message.error(res.msg);
        setLoading(false);
      }
    });
  };
  const customRequest = a => {};
  const handleAdd = (modalType, r) => {
    const payload = {
      preImgDataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const onRemove = file => {
    const list = fileList.filter((_, idx) => _.uid !== file.uid).map(_ => _.url);
    onChange(list);
  };
  const onPreview = file => {
    const { url } = file;
    if (url) {
      handleAdd('PREVIEWIMG', { imgUrl: url });
    }
  };

  return (
    <>
      <Upload
        disabled={disabled || loading}
        listType="picture-card"
        fileList={fileList}
        beforeUpload={handleChange}
        multiple={false}
        customRequest={customRequest}
        onRemove={onRemove}
        onPreview={onPreview}
      >
        {fileList.length >= max ? null : <UploadButton loading={loading} />}
      </Upload>
    </>
  );
});
export default Item;
