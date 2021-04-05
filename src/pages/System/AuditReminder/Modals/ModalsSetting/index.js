import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Switch, Checkbox, message } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import { AUDIT_REMINDER_TYPE } from '@/constants';
import { phoneReg } from '@/constants/reg';
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
const ModalsSetting = props => {
  const {
    dataModal: { modalType, modalShow, modalData },
    dispatch,
    reload,
  } = props;
  const { id } = modalData;
  const [isAtFlag, setIsAtFlag] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (modalShow && modalType === 'MODAL_AUDIT_REMINDER') {
      if (JSON.stringify(modalData) !== '{}') {
        const { atFlag, atAll } = modalData;
        setIsAtFlag(atFlag);
        form.setFieldsValue({
          ...modalData,
          atFlag: !!atFlag,
          atAll: !!atAll,
        });
      } else {
        form.resetFields();
      }
    }
  }, [modalShow]);
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
        const { atFlag, atAll, mobileList } = values;
        if (atFlag) {
          if (!mobileList && !atAll) {
            message.error('请填写要@的群成员');
            return false;
          }
        }
        const payload = {
          params: {
            id,
            ...values,
            atFlag: atFlag ? 1 : 0,
            atAll: atFlag ? (atAll ? 1 : 0) : undefined,
          },
          reload,
        };
        dispatch({ type: 'auditReminder/wxRobotConfigSaveInfo', payload });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };
  const normalize = val => {
    setIsAtFlag(val);
    return val;
  };
  const mnormalize = val => {
    return val ? val.replace('，', ',') : val;
  };
  function checkphone(array) {
    let is = true;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (!phoneReg.test(element)) {
        is = false;
      }
    }
    return is;
  }
  const validator = (rule, value = '') => {
    const arr = value.split(',');
    console.log(arr);
    if (isAtFlag && !checkphone(arr)) {
      return Promise.reject('请填写正确手机格式!');
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      title={`${id ? '编辑' : '添加'}配置`}
      maskClosable={false}
      visible={modalType === 'MODAL_AUDIT_REMINDER' && modalShow}
      onCancel={() => handleCancel()}
      onOk={() => handleOk()}
    >
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{
          atAll: false,
          atFlag: false,
          content: '你有一条新的#提醒类型#待处理，点击#页面地址#立即处理',
        }}
      >
        <InputFormItem
          label="机器人名称"
          name="name"
          placeholder="从企业微信群聊中已添加的机器人查看"
          max={30}
          required
          rules={[{ required: true, message: '请填写机器人名称!' }]}
        />

        <Form.Item
          name="webhook"
          label="Webhook地址"
          required
          rules={[{ required: true, message: '请填写Webhook地址!' }]}
        >
          <TextArea placeholder="每个机器人对应一个Webhook地址" />
        </Form.Item>
        <Form.Item
          name="type"
          label="提醒类型"
          rules={[{ required: true, message: '请选择提醒类型!' }]}
        >
          <Select placeholder="请选择提醒类型">
            {AUDIT_REMINDER_TYPE.map((_, idx) => {
              return (
                <Option key={idx} value={_.key}>
                  {_.value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <InputFormItem label="提醒内容" name="content" max={200} required type="textArea" />
        <Form.Item name="atFlag" label="是否@群成员" valuePropName="checked" normalize={normalize}>
          <Switch />
        </Form.Item>
        <Form.Item
          hidden={!isAtFlag}
          name="mobileList"
          label="手机号"
          rules={[{ validator }]}
          normalize={mnormalize}
        >
          <TextArea placeholder="多个手机号之间以逗号隔开" />
        </Form.Item>
        <Form.Item
          hidden={!isAtFlag}
          name="atAll"
          wrapperCol={{ offset: 6, span: 18 }}
          valuePropName="checked"
        >
          <Checkbox>@全体成员</Checkbox>
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
export default connect(mapStateToProps)(ModalsSetting);
