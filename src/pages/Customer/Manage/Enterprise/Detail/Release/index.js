/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card, message } from 'antd';
import ComTable from '@/components/ComTable';
import { listAuthContent } from '@/services/customer';
import { aduitStatus } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import BondAlert, { getIsBond } from '@/components/BondAlert';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, currentUser, basicInfo, id } = props;
  const { userType } = currentUser;
  const cadminId = currentUser.id;

  const { companyType, earnestFlag } = basicInfo;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
    },
    {
      title: '文章分类',
      dataIndex: 'category',
      render: (t, r) => {
        return t ? t.map(_ => _.name).join('；') : '--';
      },
    },
    {
      title: '文章标签',
      dataIndex: 'tag',
      render: (t, r) => {
        return t ? t.map(_ => _.name).join('；') : '--';
      },
    },
    // {
    //   title: '阅读人数/次数',
    //   dataIndex: 'pv',
    // },
    // {
    //   title: '点赞数',
    //   dataIndex: 'likesNum',
    // },
    // {
    //   title: '收藏数',
    //   dataIndex: 'collectNum',
    // },
    // {
    //   title: '评论数',
    //   dataIndex: 'evaluateNum',
    // },
    // {
    //   title: '分享数',
    //   dataIndex: 'shareNum',
    // },

    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'creater',
    },
  ];

  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        request={params => listAuthContent({ id, ...params })}
      ></ComTable>
    </>
  );
};
const mapStateToProps = ({ global, user, personalCenter }) => {
  return {
    dataModal: global.dataModal,
    basicInfo: personalCenter.basicInfo,
    currentUser: user.currentUser,
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
