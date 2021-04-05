/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Tooltip, Divider } from 'antd';
import InputFormItem from '@/components/FormItems/InputFormItem';
import UploadImgsFormItem from '@/components/FormItems/UploadImgsFormItem';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import MaterialFormItem from '@/components/FormItems/MaterialFormItem';
const ShareSets = props => {
  const { isTitle = true, required = false, isMaterial = false } = props;
  return (
    <>
      {isTitle && (
        <Divider orientation="left">
          分享设置
          <Tooltip title={<div>小程序端分享给好友时的样式显示</div>}>
            <InfoCircleOutlined className="ml-10" />
          </Tooltip>
        </Divider>
      )}
      <InputFormItem label="标题" name="shareTitle" max={20} required={required} />
      <InputFormItem label="描述" name="shareDes" max={20} required={required} />
      {isMaterial ? (
        <MaterialFormItem
          required={required}
          label="图片"
          name="shareImgUrl"
          extra="支持jpg/png格式，大小不能超过400K，建议尺寸120PX*90PX"
          max={1}
          type={1}
        />
      ) : (
        <UploadImgsFormItem
          required={required}
          label="图片"
          name="shareImgUrl"
          extra="支持jpg/png格式，大小不能超过400K，建议尺寸120PX*90PX"
          max={1}
        />
      )}
    </>
  );
};
export default connect(({}) => {
  return {};
})(ShareSets);
