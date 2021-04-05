import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import { Form, Button, Card, message } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import PermissionsTree from './PermissionsTree';
// import styles from './index.less';
// import { roleDetail } from '@/constants';
const AddRoles = props => {
  const {
    dataFuncs = [],
    dispatch,
    location: {
      query: { id },
    },
    roleDetail = {},
    permissList = [],
  } = props;
  const [isupdate, setIsupdate] = useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  const { isDefault } = roleDetail;
  useEffect(() => {
    dispatch({ type: 'rolesList/getSaveRoleEchoPermissList' });
    if (id) dispatch({ type: 'rolesList/roleDetailsGet', payload: { id } });
    return () => {
      dispatch({
        type: 'rolesList/changeState',
        payload: { roleDetail: {} },
      });
    };
  }, []);
  useEffect(() => {
    form.setFieldsValue(roleDetail);
  }, [roleDetail]);
  const handleSubmit = values => {
    if (!isupdate) {
      message.error('未修改任何信息');
      return false;
    }
    dispatch({
      type: 'rolesList/saveOrUpdateRole',
      payload: {
        ...values,
        id,
      },
    });
  };
  const handleBackPage = () => {
    history.go(-1);
  };
  return (
    <div>
      <Form
        {...layout}
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          permissionList: [],
        }}
        onValuesChange={changedValues => {
          setIsupdate(true);
        }}
      >
        <InputFormItem
          label="角色名称"
          name="name"
          disabled={isDefault === 1}
          placeholder="请输入10字以内的名称"
          max={10}
        />
        <InputFormItem
          label="角色描述"
          required={false}
          name="desc"
          placeholder="请输入50字以内的描述"
          max={50}
          type="textArea"
        />
        {permissList.length > 0 && (
          <PermissionsTree name="permissionList" id={id} dataFuncs={permissList} label="功能权限" />
        )}

        {id !== 1 && (
          <div className="FormSavebtn">
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = ({ global, rolesList }) => {
  return {
    roleDetail: rolesList.roleDetail,
    permissList: rolesList.permissList,
  };
};
export default connect(mapStateToProps)(AddRoles);
