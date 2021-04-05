/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect, forwardRef } from 'react';
import { connect } from 'umi';
import { Card, Button, Input, message } from 'antd';
import InfoShow from '@/components/InfoShow';
const { Search } = Input;
const UserFlag = forwardRef((props, ref) => {
  const { value, onChange, dispatch, flagInfo } = props;
  const { id, wxAvatarUrl, wxNickName, mobile, aliNickName, aliAvatarUrl } = flagInfo;
  const onSearch = async val => {
    if (!val) {
      message.error('请输入用户标识');
      return false;
    }
    const info = await dispatch({
      type: 'common/getByFlag',
      payload: {
        flag: val,
      },
    });
    const { id } = info;
    if (id) {
      onChange(val);
    }
  };
  useEffect(() => {
    dispatch({
      type: 'common/changeState',
      payload: {
        flagInfo: {},
      },
    });
  }, []);

  return (
    <>
      <Search placeholder="请输入用户标识" onSearch={onSearch} />
      {id && (
        <div className="mt-10">
          <InfoShow
            layout={null}
            lists={[
              {
                label: '手机号',
                children: mobile,
              },
              {
                label: '头像',
                children: wxAvatarUrl ? wxAvatarUrl : aliAvatarUrl,
                type: 'imgs',
              },
              {
                label: `${wxNickName ? '微信' : '支付宝'}昵称`,
                children: wxNickName ? wxNickName : aliNickName,
              },
            ]}
          />
        </div>
      )}
    </>
  );
});
export default connect(({ common }) => {
  return {
    flagInfo: common.flagInfo,
  };
})(UserFlag);
