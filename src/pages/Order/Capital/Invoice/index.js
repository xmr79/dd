/**
 * Author: xh
 * Date: 2020/12/16
 * Description: 发票管理
 */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Button, Popover, Modal } from 'antd';
import ComTable from '@/components/ComTable';
import UserInfo from '@/components/UserInfo';
import { invoiceList } from '@/services/order/invoice';
import { invoiceState, invoiceType } from '@/constants';
import ModalInvoice from '@/pages/Order/Modal/ModalInvoice';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
const Invoice = props => {
  useEffect(() => {}, []);
  const { dispatch, dataModal } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  // 拒绝
  const handleAudit = params => {
    dispatch({
      type: 'capitalHandle/confirmRefuse',
      payload: {
        params,
        reload,
      },
    });
  };
  // 确认开票
  const invoiceDrawHandle = params => {
    dispatch({
      type: 'capitalHandle/confirmHandle',
      payload: {
        params,
        reload,
      },
    });
  };
  // 操作按钮
  const btns = r => {
    const { id } = r;
    return [
      {
        key: '1',
        authority: '',
        condition: {
          dataindex: 'invoiceStatus',
          val: ['BILLING'],
        },
        ref: (
          <div
            onClick={() => {
              Modal.confirm({
                title: '确认前请先完成开票并发送邮件给用户，要继续吗？',
                okText: '确认已开票',
                cancelText: '取消',
                icon: <InfoCircleOutlined />,
                onOk() {
                  invoiceDrawHandle({
                    invoiceId: id,
                  });
                },
              });
            }}
          >
            <a>确认已开票</a>
          </div>
        ),
      },
      {
        key: '2',
        authority: '',
        condition: {
          dataindex: 'invoiceStatus',
          val: ['BILLING'],
        },
        ref: (
          <div>
            <a
              onClick={() => {
                handleAdd('NO_PAYMENT', r);
              }}
            >
              审核拒绝
            </a>
          </div>
        ),
      },
      {
        key: '3',
        authority: '',
        condition: {
          dataindex: 'invoiceStatus',
          val: ['INVOICED'],
        },
        ref: <div>已开票</div>,
      },
      {
        key: '4',
        authority: '',
        condition: {
          dataindex: 'invoiceStatus',
          val: ['REFUSED'],
        },
        ref: <div>已拒绝</div>,
      },
    ];
  };
  let columns = [
    {
      title: '申请时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '发票类型',
      dataIndex: 'type',
      valueType: 'statusdata',
      valueEnum: invoiceType,
      styleType: 'none',
    },
    {
      title: '申请人',
      dataIndex: 'username',
      render: (t, r) => {
        return (
          <UserInfo
            cinfo={{
              name: r.username,
              url: r.merAvatar,
            }}
          />
        );
      },
    },
    {
      title: '申请金额(元)',
      dataIndex: 'money',
      render: t => {
        return t ? t.toFixed(2) : '0';
      },
    },
    {
      title: '接收邮箱',
      dataIndex: 'email',
    },
    {
      title: '开票信息',
      dataIndex: 'title',
      render: (t, r) => {
        const content = (
          <div>
            {r.title ? <p>发票抬头：{r.title}</p> : null}
            {r.taxpayerIdNum ? <p>纳税人识别号：{r.taxpayerIdNum}</p> : null}
            {r.depositBank ? <p>开户银行：{r.depositBank}</p> : null}
            {r.bankAccount ? <p>银行账号：{r.bankAccount}</p> : null}
            {r.address ? <p>企业地址：{r.address}</p> : null}
            {r.mobile ? <p>企业电话：{r.mobile}</p> : null}
            {r.remark ? <p>备注：{r.remark}</p> : null}
          </div>
        );
        return (
          <div>
            <Popover content={content} title="开票信息" trigger="hover">
              <a>查看详情</a>
            </Popover>
          </div>
        );
      },
    },
    {
      title: '开票状态',
      dataIndex: 'invoiceStatus',
      valueType: 'statusdata',
      valueEnum: invoiceState,
      customRefuseCause: r => {
        const { refuseRemark } = r;
        return (
          <div>
            <div>拒绝原因：{refuseRemark}</div>
          </div>
        );
      },
    },
    {
      title: '确认时间',
      dataIndex: 'invoiceTime',
      render(t, r, idx) {
        const time = r[r.invoiceStatus === 'REFUSED' ? 'updateTime' : 'invoiceTime'];
        return (
          <div>
            <div>{r['drawer']}</div>
            <div>{time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : '--'}</div>
          </div>
        );
      },
    },
    {
      title: '操作',
      valueType: 'action',
      btns: btns,
    },
  ];

  const searchColums = [
    {
      name: '申请时间',
      dataname: {
        time: 'time',
        bTime: 'applyTimeStart',
        eTime: 'applyTimeEnd',
      },
      type: 'times',
    },
    {
      name: '发票类型',
      dataname: 'type',
      type: 'status',
      placeholder: '全部',
      status: invoiceType.map(_ => {
        return {
          key: _.key,
          value: _.value,
        };
      }),
    },
    {
      name: '用户昵称',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入用户昵称',
    },
    {
      name: '开票状态',
      dataname: 'status',
      type: 'status',
      placeholder: '待开票',
      initval: 'BILLING',
      status: invoiceState.map(_ => {
        return {
          key: _.key,
          value: _.value,
        };
      }),
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

  const handleRemark = val => {
    const { invoiceId, refuseRemark } = val;
    handleAudit({
      invoiceId,
      refuseRemark,
    });
  };

  return (
    <>
      <ModalInvoice handleRemark={handleRemark} dataModal={dataModal} />
      <ComTable
        ref={tableRef}
        rowKey="id"
        request={params => invoiceList(params)}
        columns={columns}
        searchColums={searchColums}
      ></ComTable>
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(Invoice);
