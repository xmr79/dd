/**
 * Author: APIS
 * Date: 2020.4.23
 * Description: '新增账号'
 */

import React, { PureComponent, Suspense, Fragment, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { phoneReg } from '@/constants/reg';
import PasswordFormItem from '@/components/FormItems/PasswordFormItem';
import { objDiff } from '@/utils/utils';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };

const ModalAccount = props => {
  const {
    reload,
    childUserName = '',
    dataRoleList = [],
    dataModal: {
      modalType,
      modalShow,
      modalData: { id, type = 'ADD' },
      modalData,
    },
    dispatch,
    accountDetail,
  } = props;
  const [isupdate, setIsupdate] = useState(false);

  const [form] = Form.useForm();
  const { getFieldValue, getFieldDecorat, validateFields, submit } = form;

  useEffect(() => {
    if (JSON.stringify(accountDetail) !== '{}') {
      form.setFieldsValue({
        ...accountDetail,
        roleIdList: accountDetail.roleList.map(_ => _.id),
      });
    }
  }, [accountDetail]);
  useEffect(() => {
    if (modalShow && id) {
      dispatch({ type: 'account/getAdmin', payload: { id } });
    }
    return () => {
      dispatch({ type: 'account/changeState', payload: { accountDetail: {} } });
      form.resetFields();
    };
  }, [modalShow]);
  const isRoot = id === 1;
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const payload = {
          params: {
            id,
            ...values,
          },
          reload,
        };

        if (!isupdate) {
          message.error('未修改任何信息');
          return false;
        }
        dispatch({ type: 'account/accountSave', payload });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };

  const handleCancel = () => {
    const payload = {
      dataModal: {
        modalType: '',
        modalShow: false,
        modalData: { id, type },
      },
    };

    dispatch({ type: 'global/changeState', payload });
  };

  const compareToFirstPassword = (rule, value) => {
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('您输入的两次密码不同!');
    } else {
      return Promise.resolve();
    }
  };
  const footer = [
    <Button key="nopass" onClick={() => handleCancel()}>
      取消
    </Button>,
    <Button
      key="pass"
      onClick={() => {
        handleOk();
      }}
      type="primary"
    >
      确定
    </Button>,
  ];

  const checkaccount = async (rule, value) => {
    const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]{4,10}$/;
    if (!value) {
      return Promise.reject('请输入账号名称, 由4~10位字母、数字、符号组成不包括空格');
    } else if (!reg.test(value)) {
      return Promise.reject('账号名称由4~10位字母、数字、符号组成不包括空格~');
    } else if (value && type === 'type') {
      const res = await dispatch({ type: 'account/checkAccount', payload: { account: value } });
      if (res) {
        return Promise.reject('该账号已存在');
      } else {
        return Promise.resolve();
      }
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      forceRender
      title={id ? '账号编辑' : '账号新增'}
      width="700px"
      maskClosable={false}
      visible={modalType === 'SYS_ACCOUNT' && modalShow}
      footer={footer}
      onCancel={() => handleCancel()}
    >
      <Form
        form={form}
        {...formItemLayout}
        initialValues={modalData}
        onValuesChange={changedValues => {
          setIsupdate(true);
        }}
      >
        <>
          <FormItem
            label="账号"
            name="username"
            validateTrigger="onBlur"
            required
            rules={[
              { required: true, message: `请输入账号名称` },
              { min: 1, message: `限制1-10个字符` },
              { max: 10, message: `限制1-10个字符` },
            ]}
          >
            <Input disabled={!!id} placeholder="请输入账号名称" />
          </FormItem>
          <FormItem
            label="姓名"
            name="realName"
            rules={[
              { required: true, message: '请输入姓名、由2-10位非空格字符组成' },
              { min: 2, message: `请输入姓名、由2-10位非空格字符组成` },
              { max: 10, message: `请输入姓名、由2-10位非空格字符组成` },
            ]}
          >
            <Input disabled={isRoot} placeholder="请输入姓名、由2-10位非空格字符组成" />
          </FormItem>
          {/* <FormItem
            label="工号"
            name="jobNumber"
            rules={[
              { required: false, message: '请输入工号, 1~6位数字' },
              { pattern: /^[0-9]{1,6}$/, message: '工号由1~6位数字组成~' },
            ]}
          >
            <Input disabled={isRoot} placeholder="请输入工号1-6位数字" />
          </FormItem> */}
          <FormItem
            label="手机号"
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: phoneReg, message: '请输入正确的11位手机号码~' },
            ]}
          >
            <Input disabled={!!id} placeholder="请输入手机号" />
          </FormItem>
        </>

        {type !== 'EDIT' && (
          <>
            <FormItem
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                {
                  pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&@*]{6,16}$/,
                  message: '请输入密码,至少包含字母、数字、特殊符号的两种组合~',
                },
              ]}
            >
              <Input.Password
                autoComplete="new-password"
                disabled={isRoot}
                placeholder="请输入密码,至少包含字母、数字、特殊符号的两种组合~"
              />
            </FormItem>

            <FormItem
              label="确认密码"
              name="confirmPassword"
              rules={[
                { required: !id, message: '请确认密码' },
                {
                  validator: compareToFirstPassword,
                },
              ]}
            >
              <Input.Password disabled={isRoot} placeholder="请确认密码" />
            </FormItem>
          </>
        )}

        <FormItem
          label="角色"
          name="roleIdList"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select
            placeholder="请选择角色"
            disabled={isRoot}
            style={{ width: '100%' }}
            mode="multiple"
          >
            {dataRoleList.map((item, index) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ account, loading }) => {
  return {
    dataRoleList: account.dataRoleList,
    accountDetail: account.accountDetail,
    // childUserName='': account.childUserName='',
  };
};
export default connect(mapStateToProps)(ModalAccount);
