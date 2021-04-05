/**
 * Author: wjw
 * Date:
 * Description:
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Card, Button, Table, Typography } from 'antd';
const { Paragraph } = Typography;
export const documentTypeList = {
	0: {key: 0, value: '身份证'},
	1: {key: 1, value: '护照'},
	2: {key: 2, value: '港澳居民来往内地通行证'},
	3: {key: 3, value: '台湾居民来往内地通行证'},
}
const SubOrderExpress = props => {
  const { dataLogisticDetail = [] } = props;
  const columns = [
    {
      title: '体验者姓名',
      dataIndex: 'realName',
      align: 'center',
      render(t, r) {
        return t ? t : '--';
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
      render(t, r) {
        return t ? t : '--';
      },
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      align: 'center',
      ellipsis: true,
      render(t, r) {
        return r.idNumber ? documentTypeList[t].value : '--';
      },
    },
    {
      title: '证件号',
      dataIndex: 'idNumber',
      align: 'center',
      render(t, r) {
        return t ? t : '--';
      },
    },
  ];
  return (
    <>
      <Table
        size="middle"
        rowKey="id"
        scroll={{ y: 320 }}
        columns={columns}
        locale={{ emptyText: '暂无数据' }}
        dataSource={dataLogisticDetail}
        pagination={false}
        title={() => (
          <div className="sub-order-info flex-between">
            <h3 style={{ fontWeight: 600 }}>体验者信息</h3>
          </div>
        )}
      />
    </>
  );
};
export default connect(({ queryList }) => {
  return {};
})(SubOrderExpress);
