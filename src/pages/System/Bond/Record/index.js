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
import { earnestMoneyPayLogList } from '@/services/system/bond';
import { BOSPayType } from '@/constants';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
const List = props => {
  const { dataModal, dispatch } = props;
  const { operation } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const btns = r => {
    const { id, status } = r;
    return [
      status === 0 && {
        key: '1',
        btnname: '确认已打款',
        handleClick: () => {
          Modal.confirm({
            title: `确认前请先核实打款信息，要继续吗？`,
            okText: '确认已打款',
            cancelText: '取消',
            icon: <InfoCircleOutlined />,
            onOk() {
              dispatch({
                type: 'bond/comfirmPayment',
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
  const handleComfirmSend = r => {
    const { id } = r;
    Modal.confirm({
      title: `是否确认发送？`,
      okText: '确认发送',
      cancelText: '取消',
      icon: <InfoCircleOutlined />,
      onOk() {
        dispatch({
          type: 'bond/comfirmSend',
          payload: {
            params: {
              id,
            },
            reload,
          },
        });
      },
    });
  };
  const columns = [
    {
      title: '账号信息',
      dataIndex: '1',
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
      title: '金额（元）',
      dataIndex: 'totalFee',
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueType: 'statusdata',
      valueEnum: BOSPayType,
      styleType: 'none',
    },
    {
      title: '收据接收邮箱',
      dataIndex: 'receiptFlag',
      render: (t, r) => {
        const { email, emailFlag, receiptFlag, payType } = r;
        if (receiptFlag === 'Y') {
          return (
            <>
              <div>{email}</div>
              {emailFlag === 'Y' ? (
                '已发送'
              ) : (
                <Button
                  type="link"
                  onClick={() => {
                    handleComfirmSend(r);
                  }}
                >
                  确认已发送
                </Button>
              )}
            </>
          );
        } else {
          return `无需收据`;
        }
      },
    },

    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateTime',
    },
    operation === "offline" && {
      title: '操作',
      valueType: 'action',
      btns,
    },
  ];

  const searchColums = [
    {
      name: '账号信息',
      dataname: 'username',
      type: 'normal',
      placeholder: '请输入账号信息',
    },
    {
      name: '支付时间',
      dataname: {
        time: 'time',
        bTime: 'startTime',
        eTime: 'endTime',
      },
      type: 'times',
    },
    {
      name: '支付方式',
      dataname: 'payType',
      type: 'status',
      status: BOSPayType,
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
  return (
    <>
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => earnestMoneyPayLogList(params)}
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
