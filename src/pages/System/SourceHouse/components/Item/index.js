/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Tabs, Checkbox, Tooltip, Typography, Popover, Modal } from 'antd';
import styles from '../../index.less';
import {
  EditOutlined,
  LinkOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  PlayCircleFilled,
} from '@ant-design/icons';
import CopyToClipboard from '@/components/CopyToClipboard.js';
import moment from 'moment';
import { formatSeconds } from '@/utils/utils';
const { Paragraph } = Typography;
const Item = props => {
  const videoRef = useRef(null);
  const { info, handleCheck, value = [], handleDelete, dispatch } = props;
  const { id, type, url, materialName, coverUrl, format, duration } = info;
  const text = `${materialName}.${format}`;
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
  const onEdit = () => {
    handleAdd('MODAL_EDIT_IMGVEDIO', { id, type, materialName, oldCoverUrl: coverUrl });
  };

  const onPreview = file => {
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
    <div className={styles.card}>
      <Card
        style={{ width: 250, margin: '20px auto', cursor: 'pointer' }}
        cover={
          <div onClick={onPreview}>
            {type === 1 ? (
              <div className={styles.img}>
                <img src={url} />
              </div>
            ) : (
              <div className={styles.img}>
                <img src={coverUrl} />
                <div className={styles.duration}>
                  <PlayCircleFilled className="mr-5" />
                  {formatSeconds(duration)}
                </div>
              </div>

              // <video ref={videoRef} className={styles.img} src={url} poster={coverUrl}></video>
            )}
          </div>
        }
        actions={[
          <Checkbox
            checked={value.includes(id)}
            onChange={e => {
              handleCheck(e.target.checked, info);
            }}
          />,
          <Tooltip key="copy" title="复制链接">
            <CopyToClipboard text={url}>
              <LinkOutlined />
            </CopyToClipboard>
          </Tooltip>,
          <Tooltip key="edit" title="编辑">
            <EditOutlined onClick={onEdit} />
          </Tooltip>,
          <Tooltip key="del" title="删除">
            <DeleteOutlined
              onClick={() => {
                Modal.confirm({
                  title: '确定要删除吗？',
                  okText: '确定',
                  cancelText: '取消',
                  icon: <InfoCircleOutlined />,
                  onOk() {
                    handleDelete([id]);
                  },
                });
              }}
            />
          </Tooltip>,
        ]}
      >
        <div className={styles.name}>
          <Popover
            content={<div style={{ maxWidth: '300px', wordBreak: 'break-all' }}>{text}</div>}
          >
            <Paragraph
              style={{ width: '100%', margin: '0 auto', cursor: 'pointer' }}
              ellipsis={{ rows: 1 }}
            >
              {text}
            </Paragraph>
          </Popover>
        </div>
      </Card>
    </div>
  );
};
export default connect(({}) => {
  return {};
})(Item);
