/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card, Rate } from 'antd';
import ComTable from '@/components/ComTable';
import { userCompanyList } from '@/services/customer';
import { PLATFORM, SCORE } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import UserInfo from '@/components/UserInfo';
import { arrayToObj } from '@/utils/utils';
const mapSCORE = arrayToObj(SCORE, 'key');
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, id } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  const columns = [
    {
      title: '评价时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '用户信息',
      dataIndex: 'expertName',
      render: (t, r) => {
        return (
          <UserInfo
            cinfo={{
              name: t,
              url: r.avatar,
            }}
          />
        );
      },
    },
    {
      title: '评价',
      dataIndex: 'score',
      render: t => {
        return t ? <Rate disabled value={mapSCORE[t].num} /> : '--';
      },
    },
    {
      title: '评价内容',
      dataIndex: 'content',
      width: 200,
      valueType: 'tip',
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
    },

    {
      title: '活动名称',
      dataIndex: 'title',
    },

    {
      title: '来源',
      dataIndex: 'platform',
      valueType: 'statusdata',
      valueEnum: PLATFORM,
      styleType: 'none',
    },
  ];

  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        request={params => userCompanyList({ id, ...params })}
      ></ComTable>
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
