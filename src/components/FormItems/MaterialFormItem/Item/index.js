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
import styles from './index.less';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
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
  const {
    value = [],
    onChange,
    multiple,
    disabled = false,
    max = 2,
    dispatch,
    type = 1,
    style = { width: '104px', height: '104px' },
    isModalMaternalImg,
  } = props;
  const [fileList, setfileList] = useState([]);
  const [loading, setLoading] = useState(false);

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
  // 新增操作
  const handleAdd1 = (modalType, r) => {
    const payload = {
      imgdataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'sourceHouse/changeState', payload });
  };

  const handleSave = val => {
    onChange(val);
  };

  const onRemove = file => {
    const list = value.filter((_, idx) => _.url !== file.url);
    onChange(list);
  };
  const onPreview = file => {
    const { url } = file;
    if (url) {
      handleImgAdd('PREVIEWIMG', { imgUrl: url, type: type === 1 ? 'imgurl' : 'videourl' });
    }
  };

  const handleImgAdd = (modalType, r) => {
    const payload = {
      preImgDataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    if (dispatch) {
      dispatch({ type: 'global/changeState', payload });
    }
  };
  return (
    <div className={styles.con}>
      {value.map((_, idx) => {
        return (
          <div className={styles.item} style={style} key={idx}>
            {type === 1 ? (
              <img src={_.url} alt="" />
            ) : (
              <video src={_.url} poster={_.coverUrl}></video>
            )}
            <div className={styles.mark}>
              <div className={styles.icons}>
                <EyeOutlined
                  onClick={() => {
                    onPreview(_);
                  }}
                  style={{ color: '#fff', marginRight: '10px', cursor: 'pointer' }}
                />
                <DeleteOutlined
                  onClick={() => {
                    onRemove(_);
                  }}
                  style={{ color: '#fff', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        );
      })}
      {value.length < max && (
        <div
          className={styles.add}
          style={style}
          onClick={() => {
            if (isModalMaternalImg) {
              handleAdd1('MODAL_MATERIAL_IMG', {
                type,
                handleSave,
                value,
                max,
              });
            } else {
              handleAdd('MODAL_MATERIAL', {
                type,
                handleSave,
                value,
                max,
              });
            }
          }}
        >
          <UploadButton loading={loading} />
        </div>
      )}
    </div>
  );
});
export default Item;
