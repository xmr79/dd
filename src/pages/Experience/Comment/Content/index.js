/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Divider, Button, Modal, Row, Card } from 'antd';
import ComTable from '@/components/ComTable';
import { contentEvaluatiolist } from '@/services/experience/content.js';
import { PLATFORM } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import UserInfo from '@/components/UserInfo';
import AddBlack from '@/pages/Customer/Manage/Ordinary/Modals/AddBlack';
const List = props => {
  const {
    dataModal,
    dispatch,
    location: {
      query: { title },
    },
  } = props;
  const tableRef = useRef(null);
  useEffect(() => {
    if (!title) {
      tableRef.current.sRef.current.form.resetFields();
      tableRef.current.onSearch();
    }
  }, [title]);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, userId, isTop, userImg, userNick } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: isTop === 1 ? '取消置顶' : '置顶评价',
        handleClick: () => {
          Modal.confirm({
            title: isTop === 1 ? '确定要取消置顶评价？' : '优质评价可置顶展示，要继续吗？',
            okText: isTop === 1 ? '确定' : '置顶评价',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'commentContent/contentEvaluationTop',
                payload: {
                  params: { id, type: isTop === 1 ? 0 : 1 },
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
                type: 'commentContent/contentEvaluationDelete',
                payload: {
                  params: { id, userId, userImg, userNick },
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
  const columns = [
    {
      title: '评论时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '用户信息',
      dataIndex: 'userNick',
      render: (t, r) => {
        return t ? (
          <UserInfo
            cinfo={{
              name: t,
              url: r.userImg,
            }}
          />
        ) : (
          '--'
        );
      },
    },
    {
      title: '评论内容',
      width: 200,
      dataIndex: 'content',
      valueType: 'tip',
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
    },

    {
      title: '文章标题',
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
      name: '用户信息',
      dataname: 'userNick',
      type: 'normal',
      placeholder: '请输入用户信息',
    },

    {
      name: '评论内容',
      dataname: 'content',
      type: 'normal',
      placeholder: '请输入评论内容',
    },

    {
      name: '评论时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '文章标题',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入文章标题',
      initval: title,
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
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => contentEvaluatiolist(params)}
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
