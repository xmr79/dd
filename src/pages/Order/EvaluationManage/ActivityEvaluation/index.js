/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef, useState } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card, Rate, Tabs } from 'antd';
import ComTable from '@/components/ComTable';
import { activityEvaluationList } from '@/services/order/evaluationManage/activityEvaluation';
import { PLATFORM, SCORE } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { arrayToObj } from '@/utils/utils';
import UserInfo from '@/components/UserInfo';
import AddBlack from '@/pages/Customer/Manage/Ordinary/Modals/AddBlack';
const mapSCORE = arrayToObj(SCORE, 'key');

const { TabPane } = Tabs;
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const reset = () => {
    tableRef.current.reset();
  };
  const btns = r => {
    const { id, top = 0, userId, avatar, userNick } = r;
    const text = top > 0 ? '取消置顶' : '置顶评价';
    return [
      {
        key: '1',
        authority: '',
        btnname: text,
        handleClick: () => {
          Modal.confirm({
            title: top > 0 ? '是否取消置顶' : '优质评价可置顶展示，要继续吗？',
            okText: text,
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'activityEvaluation/activityEvaluationTop',
                payload: {
                  params: { id, isCancel: top > 0 ? 1 : 0 },
                  reload,
                },
              });
            },
          });
        },
      },

      {
        key: '2',
        authority: '',
        btnname: '删除评价',
        handleClick: () => {
          Modal.confirm({
            title: '删除后，小程序端不会再展示该评价，要继续吗？',
            okText: '删除评价',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'activityEvaluation/activityEvaluationDelete',
                payload: {
                  id,
                  avatar,
                  nickName: userNick,
                  reload,
                },
              });
            },
          });
        },
      },
      {
        key: '3',
        btnname: '加入黑名单',
        authority: 'CUSTOMER_MANAGE_ORDINARY_BLACKLIST',
        handleClick: () => {
          handleAdd('ADD_BLACK', { selectedRowKeys: [userId] });
        },
      },
    ];
  };
  const [current, setCurrent] = useState('1');
  const callback = async val => {
    await setCurrent();
    await setCurrent(val);
    reset();
  };

  const title = current === '1' ? '用户信息' : '专家信息';
  const dataIndex = current === '1' ? 'userNick' : 'expertName';
  const avatar = current === '1' ? 'avatar' : 'expertAvatar';

  const columns = [
    {
      title: '评价时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: title,
      dataIndex: dataIndex,
      render: (t, r) => {
        return (
          <UserInfo
            cinfo={{
              name: t,
              url: r[avatar],
            }}
          />
        );
      },
    },
    {
      title: '评价等级',
      dataIndex: 'score',
      render: t => {
        return <Rate disabled value={mapSCORE[t].num} />;
      },
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      valueType: 'imglists',
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
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
      rowSpan: 1,
    },
  ];

  const searchColums = [
    {
      name: title,
      dataname: dataIndex,
      type: 'normal',
      placeholder: `请输入${title}`,
    },
    {
      name: '评价等级',
      dataname: 'score',
      type: 'status',
      placeholder: '全部',
      status: SCORE,
    },
    {
      name: '评价内容',
      dataname: 'content',
      type: 'normal',
      placeholder: '请输入评价内容',
    },
    {
      name: '评价时间',
      dataname: {
        time: 'time',
        bTime: 'createTimeBegin',
        eTime: 'createTimeEnd',
      },
      type: 'times',
    },
    {
      name: '活动名称',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入活动名称',
    },
    {
      name: '来源',
      dataname: 'platform',
      type: 'status',
      placeholder: '全部',
      status: PLATFORM,
    },
  ];
  const handleAdd = (modalType, r) => {
    const payload = {
      dataModal: {
        modalType,
        modalShow: true,
        modalData: r ? r : {},
      },
    };
    dispatch({ type: 'global/changeState', payload });
  };
  const handleRes = obj => {
    const { values, selectedRowKeys = [] } = obj;
    dispatch({
      type: 'customerManage/userBlacklist',
      payload: {
        params: {
          ...values,
          ids: selectedRowKeys,
          status: 'STOP',
        },
        reload,
      },
    });
  };
  return (
    <>
      <AddBlack handleRes={handleRes} />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="用户评价" key="1"></TabPane>
        <TabPane tab="专家点评" key="2"></TabPane>
      </Tabs>
      {current && (
        <ComTable
          dispatch={dispatch}
          ref={tableRef}
          columns={columns}
          searchColums={searchColums}
          request={params =>
            activityEvaluationList({
              ...params,
              userType: current === '1' ? ['NORMAL', 'SYSTEM', 'COMPANY'] : ['EXPERT'],
            })
          }
        ></ComTable>
      )}
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
