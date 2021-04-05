/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Row, Col, Badge } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { unsubscribeRecordList } from '@/services/system/unsubscribe';
import { CANCELLATION_STATUS, CANCELLATION_BONE_STATUS, REFUND_METHOD } from '@/constants';
import ModalAudit from '@/pages/Customer/Modals/ModalAudit';
import { EditOutlined } from '@ant-design/icons';
import ModalBrokerage from '@/pages/Modals/ModalBrokerage';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const REFUND_METHOD_Filter = REFUND_METHOD.filter(_ => _.key !== 'NONE');

const CANCELLATION_BONE_STATUS_Filter = CANCELLATION_BONE_STATUS.filter(_ => _.key !== 'NONE');

const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, accountListAll } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, intro, avatarUrl, categoryName, authName, businessLicense, returnType } = r;
    return [
      {
        key: '1',
        authority: '',
        btnname: '审核',
        condition: {
          dataindex: 'status',
          val: ['AUTHING'],
        },
        handleClick: () => {
          handleAdd('CANCELL_AUDIT', r);
        },
      },
      returnType === 'ASSIGN' && {
        key: '2',
        authority: '',
        btnname: '确认退还',
        condition: {
          dataindex: 'returnStatus',
          val: ['WAIT_RETURN'],
        },
        handleClick: () => {
          Modal.confirm({
            title: `保证金退还后，用户账户会完成注销，请核实保证金是否已退还，再进行该操作`,
            okText: '确定已退还',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'cancellation/unsubscribeRecordConfirm',
                payload: {
                  params: {
                    id,
                  },
                  reload,
                },
              });
            },
          });
        },
      },
    ];
  };
  const handlebrokerage = r => {
    handleAdd('MODAL_BROKERAGE', { ...r });
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
      dataIndex: 'companyName',
    },
    {
      title: '注销原因',
      width: 200,
      dataIndex: 'reason',
      valueType: 'tip',
    },

    {
      title: '保证金（元）',
      dataIndex: 'refundFee',
      width: 120,
      render: (t, r) => {
        return r.status === 'AUTH_SUCCESS' && r.returnStatus === 'WAIT_CONFIRM' ? (
          <Row gutter={12} justify={'center'}>
            <Col>{t}</Col>
            {
              <Col
                onClick={() => {
                  handlebrokerage(r);
                }}
              >
                <EditOutlined style={{ cursor: 'pointer' }} />
              </Col>
            }
          </Row>
        ) : r.returnStatus !== 'NONE' ? (
          t
        ) : (
          '--'
        );
      },
    },
    {
      title: '退还方式',
      dataIndex: 'returnType',
      valueType: 'statusdata',
      valueEnum: REFUND_METHOD_Filter,
      styleType: 'none',
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: CANCELLATION_STATUS,
      refuseCause: 'refusalReason',
    },
    {
      title: '保证金退还状态',
      dataIndex: 'returnStatus',
      render: (t, r) => {
        const obj = CANCELLATION_BONE_STATUS_Filter.filter((item, index) => {
          return item.key === t;
        })[0];
        return obj && r.status !== 'REVOCATION' ? (
          <Badge color={obj.color ? obj.color : '#d9d9d9'} text={obj.value}></Badge>
        ) : (
          '--'
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
      name: '提交账号',
      dataname: 'nickName',
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
    {
      name: '申请状态',
      dataname: 'status',
      type: 'status',
      status: CANCELLATION_STATUS,
    },
    {
      name: '保证金退还状态',
      dataname: 'status',
      type: 'status',
      status: CANCELLATION_BONE_STATUS_Filter,
    },
    {
      name: '审核账号',
      dataname: 'auditer',
      type: 'status',
      status: accountListAll,
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

  const handleAduit = val => {
    dispatch({
      type: 'cancellation/unsubscribeRecordAudit',
      payload: {
        params: val,
        reload,
      },
    });
  };

  const callback = val => {
    dispatch({
      type: 'cancellation/unsubscribeUpdateMoney',
      payload: {
        params: val,
        reload,
      },
    });
  };
  return (
    <>
      {/* 修改保证金 */}
      <ModalBrokerage dataModal={dataModal} callback={callback} />
      <ModalAudit
        handleAduit={handleAduit}
        successKey="AUTH_SUCCESS"
        failKey="AUTH_FAIL"
        reasonKey="refusalReason"
      />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => unsubscribeRecordList({ ...params })}
        attribute={{ scroll: { x: 1500 } }}
      />
    </>
  );
};
const mapStateToProps = ({ global, common }) => {
  return {
    dataModal: global.dataModal,
    accountListAll: common.accountListAll,
  };
};
export default connect(mapStateToProps)(List);
