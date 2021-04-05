/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import {
  Card,
  Button,
  Form,
  DatePicker,
  TimePicker,
  Select,
  Row,
  Col,
  message,
  Space,
  Checkbox,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
const { RangePicker } = DatePicker;
const { Option } = Select;
const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 12 } };
const weeks = [
  { key: '1', name: '一' },
  { key: '2', name: '二' },
  { key: '3', name: '三' },
  { key: '4', name: '四' },
  { key: '5', name: '五' },
  { key: '6', name: '六' },
  { key: '7', name: '日' },
];

const months = [
  { name: '1', key: '01' },
  { name: '2', key: '02' },
  { name: '3', key: '03' },
  { name: '4', key: '04' },
  { name: '5', key: '05' },
  { name: '6', key: '06' },
  { name: '7', key: '07' },
  { name: '8', key: '08' },
  { name: '9', key: '09' },
  { name: '10', key: '10' },
  { name: '11', key: '11' },
  { name: '12', key: '12' },
  { name: '13', key: '13' },
  { name: '14', key: '14' },
  { name: '15', key: '15' },
  { name: '16', key: '16' },
  { name: '17', key: '17' },
  { name: '18', key: '18' },
  { name: '19', key: '19' },
  { name: '20', key: '20' },
  { name: '21', key: '21' },
  { name: '22', key: '22' },
  { name: '23', key: '23' },
  { name: '24', key: '24' },
  { name: '25', key: '25' },
  { name: '26', key: '26' },
  { name: '27', key: '27' },
  { name: '28', key: '28' },
  { name: '29', key: '29' },
  { name: '30', key: '30' },
  { name: '31', key: '31' },
];

const Cycle = forwardRef((props, ref) => {
  const { isEdit, activityDetail } = props;
  const [currentpl, setCurrentPl] = useState('1');
  useEffect(() => {
    const { periodicJson = '{}' } = activityDetail;
    const periodicInfo = JSON.parse(periodicJson);
    const { fw, pl, weeks, hdtimes, months } = periodicInfo;
    setCurrentPl(pl ? pl : '1');
  }, [activityDetail]);
  const normalize = (value, prevValue, prevValues) => {
    setCurrentPl(value);
    return value;
  };

  const fwvalidator = (rule, value) => {
    if (value && value.length && value[1].valueOf() - value[0].valueOf() > 86400000 * 90) {
      return Promise.reject('时间跨度范围不能超过3个月');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <>
      <Form.Item
        name="fw"
        label="活动时间范围"
        rules={[
          { required: true },
          {
            validator: fwvalidator,
          },
        ]}
      >
        <RangePicker disabled={isEdit} />
      </Form.Item>
      <Form.Item name="pl" label="重复频率" normalize={normalize}>
        <Select disabled={isEdit} style={{ width: 150 }} placeholder="请选择">
          {[
            { label: '每天', key: '1' },
            { label: '每周', key: '2' },
            { label: '每月', key: '3' },
          ].map(item => (
            <Option key={item.key}>{item.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="weeks" label="重复时间" hidden={currentpl !== '2'}>
        <Checkbox.Group disabled={isEdit} style={{ width: '100%' }}>
          <Row>
            {weeks.map((_, idx) => {
              return (
                <Col key={idx} span={3}>
                  <Checkbox value={_.key}>{_.name}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item name="months" label="重复时间" hidden={currentpl !== '3'}>
        <Checkbox.Group disabled={isEdit}>
          <Row>
            {months.map((_, idx) => {
              return (
                <Col key={idx} span={3}>
                  <Checkbox value={_.key}>{_.name}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.List name="hdtimes">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  wrapperCol={index !== 0 ? { offset: 4, span: 12 } : { offset: 0, span: 12 }}
                  label={index === 0 ? '活动时间' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    noStyle
                    {...field}
                    name={[field.name, 'time']}
                    fieldKey={[field.fieldKey, 'time']}
                    rules={[{ required: true, message: '请选择活动时间' }]}
                  >
                    <TimePicker.RangePicker disabled={isEdit} format={'HH:mm'} />
                  </Form.Item>
                  {!isEdit && fields.length > 1 && (
                    <MinusCircleOutlined
                      className="ml-10"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  )}
                </Form.Item>
              ))}
              {!isEdit && (
                <Form.Item wrapperCol={{ offset: 4, span: 6 }}>
                  <Button
                    type="link"
                    onClick={() => {
                      if (fields.length >= 4) {
                        message.error('一天最多添加4场活动');
                        return false;
                      }
                      add();
                    }}
                  >
                    <PlusOutlined /> 添加活动时间
                  </Button>
                </Form.Item>
              )}
            </div>
          );
        }}
      </Form.List>
    </>
  );
});
export default Cycle;
