/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Row, Col, Upload, message } from 'antd';
import styles from './index.less';
import BraftEditor from 'braft-editor';
import { uploadImg } from '@/services/common.js';
import { ContentUtils } from 'braft-utils';
import { PictureOutlined, PlayCircleOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css';
const InputCom = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    controls = [
      'undo',
      'redo',
      // 'separator',
      'font-size',
      'line-height',
      'letter-spacing',
      // 'separator',
      'text-color',
      'bold',
      'italic',
      'underline',
      'strike-through',
      // 'separator',
      // 'superscript',
      // 'subscript',
      // 'remove-styles',
      // 'separator',
      'text-indent',
      'text-align',
      // 'separator',
      'headings',
      // 'list-ul',
      // 'list-ol',
      'blockquote',
      // 'code',
      // 'separator',
      'link',
      // 'separator',
      'hr',
      // 'separator',
      // 'separator',
      'clear',
      // 'media',
    ],
    style,
    extendControls = [],
    isAddImg = true,
    contentStyle,
    dispatch,
    isMedia = true,
  } = props;
  const ncontrols = isMedia ? [...controls, 'media'] : controls;
  // 新增操作
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

  const handleSave = val => {
    const arr = val.map((_, idx) => {
      return {
        type: 'VIDEO',
        url: _.url,
        meta: {
          poster: _.coverUrl, // 指定视频播放器的封面
        },
      };
    });

    const imgval = ContentUtils.insertMedias(
      value ? value : BraftEditor.createEditorState(null),
      arr,
    );
    onChange(imgval);
  };

  const handleSaveImg = val => {
    const arr = val.map((_, idx) => {
      return {
        type: 'IMAGE',
        url: _.url,
      };
    });

    const imgval = ContentUtils.insertMedias(
      value ? value : BraftEditor.createEditorState(null),
      arr,
    );
    onChange(imgval);
  };

  const addVideo = () => {
    handleAdd('MODAL_MATERIAL', { type: 2, handleSave, value: [] });
  };
  const addImage = () => {
    handleAdd('MODAL_MATERIAL', { type: 1, handleSave: handleSaveImg, value: [] });
  };
  const onEChange = val => {
    //  const val1 = value ? value : BraftEditor.createEditorState(null);
    // if (val && val1 && val.toHTML() !== val1.toHTML()) {
    //   let html = val.toHTML();
    //   console.log(html);
    //   const reg = /\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/g;
    //   const aa = html.replace(
    //     reg,
    //     'src="https://mmbiz.qpic.cn/mmbiz_jpg/zuia0LKgoyVuLWADzfKFyeqHQA2R30CybJkHk7LSRulOdxfZFIpHyLl8RicIUhzy7fUnichtomuosadvL6ag9n4NA/640"',
    //   );
    //   console.log(aa);
    //   const val11 = BraftEditor.createEditorState(aa);
    //   onChange(val11);
    // }
    onChange(val);
  };
  const uploadHandler = info => {
    const isLt2M = info.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('图片大小不能超过2M!');
      return false;
    }
    uploadImg(info).then(res => {
      if (res.status === 1) {
        const imgval = ContentUtils.insertMedias(value, [
          {
            type: 'IMAGE',
            url: res.data,
          },
        ]);
        onChange(imgval);
        message.success('上传成功~');
      } else {
        message.error('上传失败~');
      }
    });
  };
  const imgextendControls = dispatch
    ? [
        {
          key: 'antd-uploader',
          type: 'component',
          component: (
            <button
              onClick={addVideo}
              type="button"
              className="control-item button upload-button"
              data-title="插入视频"
            >
              <PlayCircleOutlined />
            </button>
          ),
        },
        {
          key: 'antd-uploader1',
          type: 'component',
          component: (
            <button
              onClick={addImage}
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <PictureOutlined />
            </button>
          ),
        },
      ]
    : [];
  const myextendControls = [...extendControls, ...imgextendControls];
  const uploadFn = param => {
    uploadImg(param.file).then(res => {
      if (res.status === 1) {
        param.success({
          url: res.data,
        });
      } else {
        message.error(`${param.file.name}上传失败~`);
      }
    });
  };
  const myValidateFn = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(`${file.name}的图片大小不能超过2M!`);
    }
    return isLt2M;
  };
  return (
    <div className={styles.con}>
      <BraftEditor
        ref={ref}
        value={value}
        onChange={onEChange}
        controls={ncontrols}
        extendControls={myextendControls}
        placeholder={placeholder}
        media={{
          uploadFn: uploadFn,
          validateFn: myValidateFn,
        }}
        contentStyle={{
          height: 400,
          fontSize: '14px',
          ...contentStyle,
        }}
      />
    </div>
  );
});

export default InputCom;
