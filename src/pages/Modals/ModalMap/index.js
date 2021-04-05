import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import { Map, Marker, InfoWindow } from 'react-amap';
import { GAODE_CONFIG } from '@/common';
import { EnvironmentFilled } from '@ant-design/icons';
const ModalMap = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { position, address },
      modalData,
    },
    dispatch,
  } = props;
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
  const windowHtml = <div>111</div>;
  return (
    <Modal
      title="查看地图"
      maskClosable={false}
      visible={modalType === 'MODAL_MAP' && modalShow}
      onCancel={() => handleCancel()}
      footer={null}
    >
      {position && (
        <div style={{ width: '100%', height: '400px' }}>
          <Map amapkey={GAODE_CONFIG.key} zoom={15} center={position}>
            <Marker position={position} />
            <InfoWindow position={position} visible={true} isCustom={false} content={address} />
          </Map>
        </div>
      )}
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalMap);
