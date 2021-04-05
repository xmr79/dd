import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, Input, Select, Upload, message, Row, Col } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { IMG_URL } from '@/common';
const ModalImport = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { visitorKey },
      modalData,
    },
    dispatch,
    handleConfirm,
  } = props;
  const [list, setList] = useState([]);
  const [form] = Form.useForm();
  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: '',
        modalShow: false,
        modalData: {},
      },
    };
    dispatch({ type: 'activityManage/changeState', payload });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const { file } = values;
        handleConfirm({ file: file[0].originFileObj, params: modalData });
      })
      .catch(errorInfo => {});
  };
  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    setList(e.fileList);
    return e && e.fileList;
  };
  const validator = (rule, value = []) => {
    if (value.length <= 0) {
      return Promise.reject('请上传导入文件');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      title="批量导入"
      maskClosable={false}
      visible={modalType === 'MODAL_IMPORT' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Row justify="end">
        <Col>
          <a
            href={`${IMG_URL}%E4%BD%93%E9%AA%8C%E8%80%85%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls`}
            type="link"
          >
            下载模板
          </a>
        </Col>
      </Row>
      <Form form={form} name="importForm">
        <Form.Item
          name="file"
          label="上传文件"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="支持.xls文件，不能超过1000条数据。"
          required
          rules={[
            {
              validator,
            },
          ]}
        >
          <Upload
            name="file"
            customRequest={options => {
              options.onSuccess({ status: 'done' }, options.file);
            }}
            // action={`${serverURL}?${convertObj(modalData)}`}
            // {...setting}
            // beforeUpload={file => {
            //   if (file.type !== 'image/png') {
            //     message.error(`仅支持.xls文件`);
            //   }
            //   return file.type === 'image/png';
            // }}
          >
            {list.length < 1 && <Button icon={<UploadOutlined />}>上传文件</Button>}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ activityManage }) => {
  return {
    dataModal: activityManage.dataModal,
  };
};
export default connect(mapStateToProps)(ModalImport);
