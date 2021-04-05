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
import { listAudit } from '@/services/customer';
import { aduitStatus, applyWay, COMPANYTYPE, ENTERPRISE_AUDIT_REASON } from '@/constants';
import ModalAudit from '@/pages/Modals/ModalAudit';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, intro, avatarUrl = '', categoryName, authName, businessLicense, companyType } = r;

    return [
      {
        key: '1',
        authority: 'CUSTOMER_AUDIT_EXTERPRISEAUDIT_BTN',
        btnname: '审核',
        condition: {
          dataindex: 'status',
          val: ['AUTHING'],
        },
        handleClick: () => {
          console.log('businessLicense', typeof businessLicense);
          const lists = [
            { label: '企业名称', children: authName },
            { label: '简介', children: intro },
            { label: '亮点标签', children: categoryName.join(';') },
            { label: 'logo', children: avatarUrl, type: 'imgs' },
            {
              label: '企业类型',
              children: companyType,
              type: 'statusdata',
              valueEnum: COMPANYTYPE,
              styleType: 'none',
            },
            { label: '营业执照', children: businessLicense, type: 'imgs' },
          ];
          handleAdd('AUDIT', { id, lists });
        },
      },
      {
        key: '1',
        authority: '',
        condition: {
          dataindex: 'status',
          val: ['AUTH_SUCCESS', 'AUTH_FAIL'],
        },
        ref: '已审核',
      },
    ];
  };
  const columns = [
    {
      title: '提交时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '提交账号',
      dataIndex: 'mobile',
      render: (t, r) => {
        return r.username ? (
          <>
            <div>{r.username}</div>
            <div>{r.mobile}</div>
          </>
        ) : (
          '--'
        );
      },
    },
    {
      title: '企业名称',
      dataIndex: 'authName',
    },
    {
      title: '简介',
      dataIndex: 'intro',
      width: 150,
      valueType: 'tip',
    },
    {
      title: '亮点标签',
      dataIndex: 'categoryName',
      render: (t, r) => {
        return t
          ? t.map((_, index) => (
              <span key={index}>
                {_}
                {index == t.length - 1 ? '' : '；'}
              </span>
            ))
          : '--';
      },
    },
    {
      title: '营业执照',
      dataIndex: 'businessLicense',
      valueType: 'imglists',
    },
    {
      title: '申请方式',
      dataIndex: 'authFrom',
      valueType: 'statusdata',
      valueEnum: applyWay,
      styleType: 'none',
    },

    {
      title: '审核状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: aduitStatus,
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
      title: '审核时间',
      dataIndex: 'auditTime',
      valueType: 'verifyTime',
      verifyUser: 'auditer',
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [
    {
      name: '提交人',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入提交人昵称',
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
    // {
    //   name: '审核状态',
    //   dataname: 'status',
    //   type: 'status',
    //   status: aduitStatus,
    // },
    {
      name: '申请方式',
      dataname: 'authFrom',
      type: 'status',
      status: applyWay,
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
  const handleAduit = async val => {
    await dispatch({
      type: 'customerAudit/audit',
      payload: {
        params: { ...val },
        reload,
      },
    });
    dispatch({ type: 'global/closeModal' });
  };
  return (
    <>
      <ModalAudit handleAduit={handleAduit} title="入驻企业" reasons={ENTERPRISE_AUDIT_REASON} />
      <ComTable
        dispatch={dispatch}
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => listAudit({ ...params, userType: 'COMPANY' })}
        tabSetting={{
          isTabShow: true,
          tabList: aduitStatus,
          isTabAll: true,
          keyname: 'status',
          defaultActiveKey: 'AUTHING',
          allIdx: aduitStatus.length,
        }}
        extraParams={{
          status: 'AUTHING',
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
