/**
 * Author: wjw
 * Date: 2019.05.13
 * Description: '图片预览'
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
const ModalPreImg = props => {
  const {
    preImgDataModal: {
      modalType,
      modalShow,
      modalData: { imgUrl, title, type = 'imgurl', width, cstyle },
    },
    dispatch,
  } = props;
  const params = {
    width,
  };
  //   const QRCode = require('qrcode.react');
  const handleCancel = () => {
    const payload = {
      preImgDataModal: {
        modalType: '',
        modalShow: false,
        modalData: {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  return (
    <Modal
      zIndex={10001}
      {...params}
      visible={modalType === 'PREVIEWIMG' && modalShow}
      footer={null}
      getContainer={() => document.body}
      onCancel={() => {
        handleCancel();
      }}
    >
      <div>
        <p>{title}</p>
        <div style={{ textAlign: 'center', ...cstyle }}>
          {type === 'imgurl' && imgUrl && (
            <img alt="example" style={{ width: '100%' }} src={imgUrl} />
          )}
          {type === 'videourl' && imgUrl && (
            <video style={{ width: '100%' }} src={imgUrl} controls />
          )}

          {/* {type === 'qrcode' && (
          <div style={{ textAlign: 'center' }}>
            {imgUrl ? <QRCode value={imgUrl} style={{ width: '250px', height: '250px' }} /> : ''}
          </div>
        )} */}
        </div>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    preImgDataModal: global.preImgDataModal,
  };
};
export default connect(mapStateToProps)(ModalPreImg);
