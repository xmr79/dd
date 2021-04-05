import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Upload, message } from 'antd';
import { urlConfig } from '@/common';
import styles from '../index.less';
import { getFileName, getFileType } from '@/utils/utils';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import defaultSettings from '../../../../../config/defaultSettings.js';
const { tokenKey } = defaultSettings;
// 上传图片的配置
const token = window.localStorage.getItem(tokenKey) || '';

const settings = {
  name: 'file',
  withCredentials: true,
  headers: {
    token,
  },
};
const IMGUploadButton = ({ text }) => {
  return (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{text}</div>
    </div>
  );
};

const UploadButton = ({ text }) => {
  return (
    <Button className={styles.textbtn}>
      <DownloadOutlined />
      {text}
    </Button>
  );
};

const UploadItem = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    listType = 'text',
    length = 1,
    defaultFileList = [],
    accept = 'image/jpg,image/jpeg,image/png',
    maxSize = 2,
    filemaxSize = 25,
    dispatch,
    style,
    className,
    text = '上传文件',
    disabled,
    children,
    isError = false,
    action = 'upload/uploadImg',
  } = props;

  const serverURL = `${urlConfig.URL_API}${action}`;
  const [fileList, setfileList] = useState(defaultFileList);
  const [len, setlen] = useState(-1);
  const [isupload, setIsupload] = useState(false);

  useEffect(() => {
    if (Array.isArray(value) && !isupload) {
      let files = value.map((item, index) => {
        let name = getFileName(item);
        return {
          uid: index,
          name,
          url: item,
          thumbUrl: item,
          status: 'done',
          response: { status: 1, data: item },
          percent: 100,
          size: 0,
        };
      });
      setfileList(files);
    }
  }, [value]);

  useEffect(() => {
    if (fileList.length >= len && len !== -1) {
      let values = fileList.filter(item => item.url).map(i => i.url);
      if (isError) {
        values = fileList.map(i => {
          const { status, response, url } = i;
          return {
            status,
            url,
            response,
          };
        });
      }

      if (onChange) {
        onChange(values);
      }
    }
  }, [fileList]);
  const getisLtM = file => {
    const { name, size } = file;
    const type = getFileType(name);
    const is = !!(type === '.pdf' || type === '.rar');
    const MAX_SIZE = is ? filemaxSize : maxSize;
    return {
      MAX_SIZE,
      isLtM: size / 1024 / 1024 < MAX_SIZE,
    };
  };
  const getStatus = item => {
    const { name, size, status, response, type } = item;
    const MAX_SIZE = getisLtM(item).MAX_SIZE;
    const isLtM = getisLtM(item).isLtM;

    if (!isLtM) {
      return {
        ...item,
        status: status === 'removed' ? 'removed' : 'error',
        response: `上传的文件大小不能超过${MAX_SIZE}M`,
        url: item.url,
      };
    }
    if (status === 'done') {
      if (response && response.status !== 1) {
        return {
          ...item,
          status: 'error',
          response: response.msg ? response.msg : response.data,
          url: item.url,
        };
      }
    }
    return {
      ...item,
      status: status,
      response: response,
      url:
        item.status === 'done'
          ? item.response.data
          : item.status === 'uploading'
          ? 'uploading'
          : item.url,
    };
  };

  const onFilechange = info => {
    setIsupload(true);
    let fileone = info.file;
    let fileList = info.fileList;
    fileone = getStatus(fileone);
    if (fileone.status === 'done' && fileone.response) {
      message.success('上传成功');
      // onChange();
    } else if (fileone.status === 'error' && fileone.response) {
      message.error(`${fileone.response}`);
      //不符合的文件删除
      fileList = fileList.filter(_ => _.uid !== fileone.uid);
    }
    //长度限制
    fileList = fileList
      .filter((i, idx) => idx < length)
      .map(item => {
        return getStatus(item);
      });

    setfileList(fileList);
    setlen(fileList.length);
  };

  const onRemove = file => {
    setlen(fileList.length - 1);
  };
  const onPreview = file => {
    const img = file.url;
    if (img) {
      handleAdd('PREVIEWIMG', { imgUrl: img });
    }
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

  //上传前判断文件大小是否符合
  const imgupload = (file, fileList) => {
    const isLtM = getisLtM(file).isLtM;
    if (!isLtM) {
      return false;
    }
    return isLtM;
  };
  return (
    <Upload
      action={serverURL}
      // accept={accept}
      multiple={!!(length > 1)}
      onChange={onFilechange}
      fileList={fileList}
      {...settings}
      beforeUpload={imgupload}
      listType={listType}
      onRemove={onRemove}
      onPreview={listType === 'picture-card' ? onPreview : null}
      style={style}
      className={className}
      disabled={disabled}
    >
      {!disabled && fileList.length < length && (
        <div>
          {listType === 'picture-card' ? (
            <IMGUploadButton text={text} />
          ) : children ? (
            children
          ) : (
            <UploadButton text={text} />
          )}
        </div>
      )}
    </Upload>
  );
});
const mapStateToProps = ({ global }) => {
  return {
    preImgDataModal: global.preImgDataModal,
  };
};
export default connect(mapStateToProps)(UploadItem);
