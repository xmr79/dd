import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Row, Col, message } from 'antd';
import { numLimit, isRealNum } from '@/utils/utils';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const Times = forwardRef((props, refs) => {
  const {
    value,
    value: { day, hour, min },
    onChange,
  } = props;
  const timechange = (val, key) => {
    const obj = {};
    obj[key] = val;
    onChange({ ...value, ...obj });
  };

  return (
    <>
      <Row gutter={12} align="middle">
        <Col>活动开始前</Col>
        <Col>
          <Input
            value={day}
            onChange={e => {
              e.persist();
              timechange(e.target.value, 'day');
            }}
            style={{ width: '100px' }}
            placeholder="请输入天数"
          />
        </Col>
        <Col>天</Col>
        <Col>
          <Input
            value={hour}
            onChange={e => {
              timechange(e.target.value, 'hour');
            }}
            style={{ width: '100px' }}
            placeholder="请输入小时"
          />
        </Col>
        <Col>小时</Col>
        <Col>
          <Input
            value={min}
            onChange={e => {
              timechange(e.target.value, 'min');
            }}
            style={{ width: '100px' }}
            placeholder="请输入分钟"
          />
        </Col>
        <Col>分钟</Col>
      </Row>
    </>
  );
});

const ModalYseTime = props => {
  const {
    dataModal: {
      modalType,
      modalShow,
      modalData: {},
    },
    dispatch,
    handleRes,
  } = props;
  const [form] = Form.useForm();
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

  const getmin = ({ day = 0, hour = 0, min = 0 }) => {
    return +day * 24 * 60 + +hour * 60 + +min;
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        const { ystartTime, yendTime } = values;
        const mystartTime = getmin(ystartTime);
        const mysendTime = getmin(yendTime);

        if (mystartTime <= mysendTime) {
          message.error('预约结束时间应大于预约开始时间');
          return false;
        }
        handleRes({ mystartTime, mysendTime });
      })
      .catch(errorInfo => {});
  };

  const validator = (rule, value) => {
    const { day, hour, min } = value;
    if (!day && !hour && !min) {
      return Promise.reject('请输入预约时间');
    } else if (day && numLimit(day, 0, 10000, 'integer')) {
      return Promise.reject('限制0~10000的整数');
    } else if (hour && numLimit(hour, 0, 10000, 'integer')) {
      return Promise.reject('限制0~10000的整数');
    } else if (min && numLimit(min, 0, 10000, 'integer')) {
      return Promise.reject('限制0~10000的整数');
    } else {
      return Promise.resolve();
    }
  };

  return (
    <Modal
      title="批量设置预约时间"
      width="800px"
      maskClosable={false}
      visible={modalType === 'MODAL_YSETIME' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form
        className="mt-10"
        form={form}
        {...layout}
        initialValues={{
          ystartTime: {},
          yendTime: {},
        }}
      >
        <Form.Item
          name="ystartTime"
          label="预约开始时间"
          rules={[
            {
              validator,
            },
          ]}
        >
          <Times />
        </Form.Item>
        <Form.Item
          name="yendTime"
          label="预约结束时间"
          rules={[
            {
              validator,
            },
          ]}
        >
          <Times />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(ModalYseTime);
