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
import { selectActivityOrderVisitorList } from '@/services/experience/activity';
import { CERTIFICATES_TYPE, ORDER_PAYTYPE, orderStatus } from '@/constants';
const List = props => {
  useEffect(() => {}, []);
  const { dataModal, dispatch, orderId } = props;
  const tableRef = useRef(null);
  const reload = () => {
    tableRef.current.reload();
  };
  const columns = [
    {
      title: '体验者姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
      render: (t, r) => {
        const obj = CERTIFICATES_TYPE.filter((item, index) => {
          return item.key === t;
        })[0];
        if (obj) {
          const { value } = obj;
          return r.idNumber ? (value ? value : '--') : '--';
        } else {
          return '--';
        }
      },
    },
    {
      title: '证件号码',
      dataIndex: 'idNumber',
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
      <div className="mt-20 sub-order-info flex-between">
        <h3 style={{ fontWeight: 600 }}>体验者信息</h3>
      </div>
      <ComTable
        tableSize="small"
        ref={tableRef}
        columns={columns}
        request={params => selectActivityOrderVisitorList({ orderId, ...params })}
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
