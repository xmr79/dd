/**
 * Author: wjw
 * Date:2020
 * Description:
 */
import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'umi';
import { Button, Divider, Modal, Row, Col } from 'antd';
import QCard from '@/components/QCard';
import ComTable from '@/components/ComTable';
import { batchRefundList } from '@/services/order';
import { refundStatus } from '@/constants';
import AuthBlock from '@/components/Auth/AuthBlock';
import ModalBatchRefund from '@/pages/Order/Modal/ModalBatchRefund';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  let columns = [
    {
      title: '退款时间',
      dataIndex: 'refundTime',
      valueType: 'dateTime',
    },
    {
      title: '活动名称',
      dataIndex: 'title',
    },
    {
      title: '活动场次',
      dataIndex: 'name',
    },
    {
      title: '支付订单数',
      dataIndex: 'payOrderCount',
    },
    {
      title: '预约人数',
      dataIndex: 'appointmentCount',
    },
    {
      title: '支付金额',
      dataIndex: 'payAmount',
    },
    {
      title: '退款状态',
      dataIndex: 'status',
      valueType: 'statusdata',
      valueEnum: refundStatus,
    },
  ];
  const searchColums = [
    {
      name: '退款时间',
      dataname: {
        time: 'time',
        bTime: 'refundTimeBegin',
        eTime: 'refundTimeEnd',
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
      name: '退款状态',
      dataname: 'status',
      type: 'status',
      status: refundStatus,
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
      <ModalBatchRefund dataModal={dataModal} reload={reload} />
      <ComTable
        ref={tableRef}
        columns={columns}
        searchColums={searchColums}
        request={params => batchRefundList(params)}
      >
        <Row type="flex" justify="end">
          <AuthBlock>
            <Button
              className="mt-20"
              type="primary"
              onClick={() => {
                handleAdd('MODAL_BATCHREFUND');
              }}
            >
              批量退款
            </Button>
          </AuthBlock>
        </Row>
      </ComTable>
    </>
  );
};
const mapStateToProps = ({ global }) => {
  return {
    dataModal: global.dataModal,
  };
};
export default connect(mapStateToProps)(List);
