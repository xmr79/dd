/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button } from 'antd';
import SortFormItem from '@/components/FormItems/SortFormItem';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import RadioFormItem from '@/components/FormItems/RadioFormItem';
import { COMPANYTYPE } from '@/constants';
const FormItems = props => {
  const { isEdit = false } = props;
  return (
    <>
      <InputFormItem label="企业名称" name="name" max={25} required isTestSpace={true} />
      <InputFormItem label="简介" name="intro" type="textArea" max={30} required />
      <SortFormItem
        required
        label="亮点标签"
        name="categoryId"
        type="CATEGORY"
        mtype="customer"
        maxTag={3}
      />
      <RadioFormItem
        disabled={isEdit}
        label="类型"
        name="companyType"
        list={COMPANYTYPE.map(_ => {
          return {
            value: _.key,
            name: _.value,
          };
        })}
      />
      <UploadImgsFormItem
        required
        label="logo"
        name="avatarUrl"
        extra="支持jpg/png格式，大小不能超过400K，建议尺寸120PX*120PX"
        max={1}
      />
      <UploadImgsFormItem
        required
        label="营业执照"
        name="businessLicense"
        extra="支持jpg/png格式，大小不能超过400K"
        max={1}
      />
    </>
  );
};
export default connect(({}) => {
  return {};
})(FormItems);
