import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Image, Row, Col, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.less'
const Extension = props => {
  const { dataModal, dispatch, type, callback } = props;
  const { modalType, modalShow, modalData } = dataModal;
  const { id, name } = modalData;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
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
  useEffect(() => {
    if (modalShow && modalType === 'MODAL_SORT') {
      form.resetFields();

      if (name) {
        form.setFieldsValue({
          name,
        });
      }
    }
  }, [modalShow]);

  const download = () => {
    location.href = modalData.pageimg
  }

  const onCopy = (test, result)=> {
    if (result) {
      message.success('已复制到剪切板~');
    } else {
      message.error('复制失败，请手动进行复制~');
    }
  }

  return (
    <Modal
      title={`微信小程序推广码`}
      maskClosable={false}
      visible={modalType === 'EXTENSION' && modalShow}
      onCancel={() => handleCancel()}
      width={600}
      footer={null}
    >
      <Form
        {...layout}
        name="basic"
      >
        <Form.Item
          label="页面路径"
          name="页面路径"
        >
          <Row>
            <Col span={20}>
              <Input
                disabled
                value={modalData.pageurl}
              />
            </Col>
            <Col span={4}><CopyToClipboard onCopy={onCopy} text={modalData.pageurl}><Button type="primary" size="middle">复制</Button></CopyToClipboard></Col>
          </Row>
          
        </Form.Item>

        <Form.Item
          label="推广二维码"
          name="推广二维码"
        >
           
          <div className={styles.box}>
            <img
              width={180}
              height={180}
              src={modalData.pageimg}
              className="mb-10"
            />
            <Button type="link" block onClick={download}>
              下载二维码
            </Button>
            {/* <div className="mt-10"><Button type="link" onClick={download} className="mt-10"></Button></div> */}
          </div>
        </Form.Item>
        <Row>
          <Col span={5}></Col>
          <Col span={18}></Col>
        </Row>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global, globaldata }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(Extension);
