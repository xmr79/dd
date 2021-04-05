/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect, history } from 'umi';
import { Button, Divider, Modal } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { contentRecordList } from '@/services/experience/content';
import { contentStatus, CONTENT_AUDIT_REASON } from '@/constants';
import ModalAudit from '@/pages/Modals/ModalAudit';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, currentUser, accountListAll } = props;
  const { userType } = currentUser;

  useEffect(() => {
    dispatch({
      type: 'common/getListAll',
      payload: {
        tags: undefined,
      },
    });
    return () => {
      dispatch({
        type: 'common/getListAll',
        payload: {
          tags: ['DEFAULT', 'NORMAL'],
        },
      });
    };
  }, []);

  const cadminId = currentUser.id;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { contentId, id, title, category, tag, adminId } = r;

    let isShowEdit = false;

    if (userType === 'SYSTEM' && adminId === 1) {
      isShowEdit = true;
    } else if (userType !== 'SYSTEM' && cadminId === adminId) {
      isShowEdit = true;
    }
    return [
      {
        key: '1',
        authority: 'EXPERIENCE_CONTENT_AUDIT_BTN',
        condition: {
          dataindex: 'status',
          val: ['AUTHING'],
        },
        btnname: '审核',
        handleClick: () => {
          const lists = [
            { label: '文章标题', children: title },
            {
              label: '文章分类',
              children: category ? category.map(_ => _.name).join('；') : '--',
            },
            {
              label: '文章标签',
              children: tag ? tag.map(_ => _.name).join('；') : '--',
            },
          ];
          handleAdd('AUDIT', { id, lists, title });
        },
      },
      isShowEdit && {
        key: '2',
        authority: 'EXPERIENCE_CONTENT_MANAGE_SAVE',
        condition: {
          dataindex: 'status',
          val: ['AUTH_FAIL', 'WAIT_SUBMIT'],
        },
        btnname: '编辑',
        handleClick: () => {
          history.push({
            pathname: '/experience/content/manage/createContent',
            query: {
              contentId,
              id,
            },
          });
        },
      },
      {
        key: '3',
        authority: '',
        condition: {
          dataindex: 'status',
          val: ['AUTHING', 'AUTH_SUCCESS', 'WAIT_SUBMIT'],
        },
        btnname: '查看',
        handleClick: () => {
          history.push({
            pathname: '/experience/content/manage/createContent',
            query: {
              isLook: '1',
              contentId,
              id,
            },
          });
        },
      },
      isShowEdit && {
        key: '4',
        authority: 'EXPERIENCE_CONTENT_AUDIT_DELETE',
        condition: {
          dataindex: 'status',
          val: ['AUTH_FAIL', 'WAIT_SUBMIT'],
        },
        btnname: '删除',
        handleClick: () => {
          Modal.confirm({
            title: '是否删除当前文章？',
            okText: '确定',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'contentAudit/contentRecordDelete',
                payload: {
                  id,
                  reload,
                },
              });
            },
          });
        },
      },
    ];
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
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: contentStatus,
      // refuseCause: 'refusalReason',
      customRefuseCause: r => {
        const { refusalReason, changeProposal } = r;
        return (
          <div>
            <div>拒绝原因：{refusalReason}</div>
            {changeProposal && <div>修改建议：{changeProposal}</div>}
          </div>
        );
      },
    },
    {
      title: '编辑时间',
      dataIndex: 'updateTime',
      valueType: 'verifyTime',
      verifyUser: 'creater',
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      valueType: 'verifyTime',
      verifyUser: 'auditer',
    },
    {
      title: '操作',
      dataIndex: 'action',
      valueType: 'action',
      btns: btns,
    },
  ];
  const searchColums = [
    {
      name: '文章标题',
      dataname: 'title',
      type: 'normal',
      placeholder: '请输入文章标题',
    },
    {
      name: '编辑时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '审核时间',
      dataname: {
        time: 'auditTime',
        bTime: 'auditStartTime',
        eTime: 'auditendTime',
      },
      type: 'times',
    },
    {
      name: '编辑账号',
      dataname: 'creater',
      type: 'status',
      placeholder: '全部',
      status: accountListAll,
      isHidden: userType !== 'SYSTEM',
    },
    // {
    //   name: '状态',
    //   dataname: 'status',
    //   type: 'status',
    //   placeholder: '全部',
    //   status: contentStatus,
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

  const handleAduit = val => {
    dispatch({
      type: 'contentAudit/contentRecordAudit',
      payload: {
        params: { ...val },
        reload,
      },
    });
  };
  return (
    <>
      <ModalAudit handleAduit={handleAduit} title="文章" reasons={CONTENT_AUDIT_REASON} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => contentRecordList(params)}
        searchColums={searchColums}
        tabSetting={{
          isTabShow: true,
          tabList: contentStatus,
          isTabAll: true,
          keyname: 'status',
          defaultActiveKey: 'AUTHING',
          allIdx: contentStatus.length,
        }}
        extraParams={{
          status: 'AUTHING',
        }}
      />
    </>
  );
};
const mapStateToProps = ({ global, user, common }) => {
  return {
    dataModal: global.dataModal,
    currentUser: user.currentUser,
    accountListAll: common.accountListAll,
  };
};
export default connect(mapStateToProps)(List);
