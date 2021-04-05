import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';
import RadioFormItem from '@/components/FormItems/RadioFormItem';
import moment from 'moment';
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
// 生效时间
export const efficientType = [
  {
    value: 'PUBLISH',
    name: '立即发布',
  },
  {
    value: 'TIME_PUBLISH',
    name: '指定时间',
  },
];
const ModalPublishTime = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: { status, pushTime },
    },
    dispatch,
    handleSet,
  } = props;

  const [form] = Form.useForm();
  const [isZhiDing, setIsZhiDing] = useState(false);
  const fun = value => {
    if (value === 'TIME_PUBLISH') {
      setIsZhiDing(true);
    } else {
      setIsZhiDing(false);
    }
  };
  const normalize = (value, prevValue, prevValues) => {
    fun(value);
    return value;
  };
  useEffect(() => {
    if (modalShow && modalType === 'MODAL_PUBLISH_TIME') {
      if (status || pushTime) {
        form.setFieldsValue({
          status,
          pushTime: moment(pushTime),
        });
        fun(status);
      }
    }
  }, [status, pushTime, modalShow]);
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
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const { status, pushTime } = values;
        let payload = {
          ...values,
          pushTime: pushTime ? pushTime.valueOf() : pushTime,
        };

        if (handleSet) {
          handleSet(payload);
        }
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };

  const validator = (rule, value = []) => {
    const time = value.valueOf();
    console.log(time);
    console.log(moment().valueOf());
    if (time <= moment().valueOf()) {
      return Promise.reject('指定时间应大于当前时间');
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="设置发布时间"
      maskClosable={false}
      visible={modalType === 'MODAL_PUBLISH_TIME' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form form={form} {...formItemLayout} initialValues={{ status: 'PUBLISH' }}>
        <RadioFormItem
          label="发布时间"
          name="status"
          list={efficientType}
          rules={[{ required: true, message: '请设置生效时间' }]}
          normalize={normalize}
        />
        {isZhiDing && (
          <Form.Item
            name="pushTime"
            label="指定时间"
            rules={[
              { required: true, message: '请选择指定时间' },
              {
                validator,
              },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalPublishTime);
