/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { userRecommendList } from '@/services/customer';
import { RECOMMEND_STATUS, RECOMMEND_TYPE, PLATFORM } from '@/constants';
import UserInfo from '@/components/UserInfo';
import ModalRemark from '@/pages/Modals/ModalRemark.js';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const handleAudit = params => {
    dispatch({
      type: 'recommend/userRecommendAudit',
      payload: {
        params,
        reload,
      },
    });
  };
  const btns = r => {
    const { id, avatarUrl, nickName } = r;
    return [
      {
        key: '1',
        authority: '',
        condition: {
          dataindex: 'status',
          val: ['WAIT'],
        },
        ref: (
          <div
            onClick={() => {
              Modal.confirm({
                title: '标记为有效推荐后，记得及时上架相关内容哦',
                okText: '确定',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  handleAudit({
                    id,
                    avatarUrl,
                    nickName,
                    status: 'SUCCESS',
                  });
                },
              });
            }}
          >
            <a>标为有效推荐</a>
          </div>
        ),
      },
      {
        key: '2',
        authority: '',
        condition: {
          dataindex: 'status',
          val: ['WAIT'],
        },
        ref: (
          <div>
            <a
              onClick={() => {
                handleAdd('ADD_REMARK', r);
              }}
            >
              标为无效推荐
            </a>
          </div>
        ),
      },
      {
        key: '1',
        authority: '',
        condition: {
          dataindex: 'status',
          val: ['SUCCESS', 'FAIL'],
        },
        ref: <div>已确认</div>,
      },
    ];
  };
  const columns = [
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      render: (t, r) => {
        return t ? (
          <UserInfo
            cinfo={{
              name: t,
              url: r.avatarUrl,
            }}
          />
        ) : (
          '--'
        );
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 150,
    },
    {
      title: '推荐内容类型',
      dataIndex: 'type',
      valueType: 'statusdata',
      valueEnum: RECOMMEND_TYPE,
      styleType: 'none',
    },
    {
      title: '推荐原因',
      dataIndex: 'details',
      width: 150,
      valueType: 'tip',
    },
    {
      title: '上传图片',
      dataIndex: 'imgUrl',
      width: 250,
      valueType: 'imglists',
    },
    {
      title: '来源',
      dataIndex: 'platform',
      valueType: 'statusdata',
      valueEnum: PLATFORM,
      styleType: 'none',
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: RECOMMEND_STATUS,
      refuseCause: 'refusalReason',
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];
  const searchColums = [
    {
      name: '用户昵称',
      dataname: 'nickName',
      type: 'normal',
      placeholder: '请输入用户昵称',
    },
    {
      name: '推荐类型',
      dataname: 'type',
      type: 'status',
      placeholder: '全部',
      status: RECOMMEND_TYPE,
    },
    {
      name: '提交时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '来源',
      dataname: 'platform',
      type: 'status',
      placeholder: '全部',
      status: PLATFORM,
    },
    // {
    //   name: '处理状态',
    //   dataname: 'status',
    //   type: 'status',
    //   placeholder: '全部',
    //   status: RECOMMEND_STATUS,
    // },
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
  const handleRemark = val => {
    const { id, remark } = val;
    handleAudit({
      id,
      status: 'FAIL',
      refusalReason: remark,
    });
  };
  return (
    <>
      <ModalRemark dataModal={dataModal} handleRemark={handleRemark} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => userRecommendList({ ...params })}
        dispatch={dispatch}
        tabSetting={{
          isTabShow: true,
          tabList: RECOMMEND_STATUS,
          isTabAll: true,
          keyname: 'status',
        }}
      />
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
