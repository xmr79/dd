import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, Input, Select, Spin } from 'antd';
import html2canvas from 'html2canvas';
import styles from './index.less';
import { urlConfig } from '@/common';
const ModalShare = props => {
  const {
    dataModal: { modalType, modalShow, modalData },
    dispatch,
  } = props;
  const [isloading, setIsloading] = useState(true);
  const [isloading2, setIsloading2] = useState(true);
  const { pageimg, imgUrl, title, sponsor, createUsername, subtitle } = modalData;
  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: '',
        modalShow: false,
        modalData: {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const downloadIamge = (url, name) => {
    var a = document.createElement('a');
    var event = new MouseEvent('click');

    a.download = name || '图片';
    a.href = url;

    a.dispatchEvent(event);
  };
  // 生成海报
  const handleposter = () => {
    setTimeout(() => {
      let canvas = document.createElement('canvas');
      canvas.width = 312;
      canvas.height = 556;
      canvas.getContext('2d');
      html2canvas(document.getElementById('Poster'), {
        useCORS: true, // 【重要】开启跨域配置
        allowTaint: false, //允许跨域图片
        taintTest: false, //是否在渲染前测试图片
        scale: 1,
        canvas: canvas,
        logging: false,
        width: 312,
        height: 556,
      }).then(canvas => {
        let image = canvas.toDataURL('image/png');
        // 下载图片
        downloadIamge(image);
      });
    }, 1000);
  };

  const handleerweima = () => {
    downloadIamge(pageimg, '二维码');
  };
  return (
    <Modal
      title="分享活动"
      maskClosable={false}
      visible={modalType === 'MODAL_SHARE' && modalShow}
      onCancel={() => handleCancel()}
      footer={null}
    >
      <Spin spinning={isloading && isloading2}>
        <div className={styles.postercon}>
          <div id="Poster" className={styles.poster}>
            <div className={styles.top}>
              <div className={styles.zb}>
                {/* 主办单位：{sponsor === 'PLATFORM' ? '一品行' : createUsername} */}
                主办单位：一品杭
              </div>
              <img
                src={imgUrl}
                onLoad={() => {
                  setIsloading(false);
                }}
              />
            </div>
            <div className={styles.bottom}>
              <div className={styles.title}>{title}</div>
              <div className={styles.ftitle}>{subtitle}</div>
              <div className={styles.wxqrcode}>
                <img
                  id="wxQrCode"
                  src={pageimg}
                  onLoad={() => {
                    setIsloading2(false);
                  }}
                />
                <span>微信扫一扫，预约活动</span>
              </div>
            </div>
          </div>
          <div className={styles.btn}>
            <a onClick={handleposter}>下载海报</a>
            <a onClick={handleerweima}>下载二维码</a>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalShare);
