/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { uploadVideo } from '@/services/common.js';
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
  const { value, onChange, disabled = false, max = 1, dispatch } = props;
  const [fileList, setfileList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      setfileList(value);
    }
  }, [value]);

  const handleChange = info => {
    console.log(info);
    const { name, type, size } = info;
    const isLt2M = size / 1024 / 1024 < 50;
    if (!isLt2M) {
      message.error('视频大小不能超过50M!');
      return false;
    }
    if (type !== 'video/mp4') {
      message.error('文件格式仅支持mp4');
      return false;
    }

    setLoading(true);
    uploadVideo(info).then(res => {
      if (res.status === 1) {
        let lists = [];
        lists = [res.data];
        onChange(lists);
        setLoading(false);
      } else {
        message.error(res.msg);
        setLoading(false);
      }
    });
  };
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
    // if (url) {
    //   handleAdd('PREVIEWIMG', { imgUrl: url });
    // }
  };

  return (
    <>
      <Upload
        customRequest={() => {}}
        disabled={disabled || loading}
        listType="picture-card"
        // fileList={fileList}
        showUploadList={false}
        beforeUpload={handleChange}
        multiple={false}
      >
        {fileList.length >= max ? (
          fileList.map((_, idx) => {
            return <video style={{ width: '100px' }} key={idx} src={_}></video>;
          })
        ) : (
          <UploadButton loading={loading} />
        )}
      </Upload>
    </>
  );
});
export default Item;
